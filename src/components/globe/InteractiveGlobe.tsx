import { useEffect, useRef } from 'react'
// Vendored fork, not the npm package — see src/vendor/cobe/index.js for why.
import createGlobe, { type Globe, type Marker as CobeMarker } from '@/vendor/cobe'

type Color = [number, number, number]
type Vec3 = [number, number, number]

export interface Marker {
  id: string
  location: [number, number]
  label: string
}

export interface Arc {
  id: string
  from: [number, number]
  to: [number, number]
  label?: string
}

export interface InteractiveGlobeProps {
  markers: Marker[]
  arcs: Arc[]
  markerColor?: Color
  baseColor?: Color
  arcColor?: Color
  glowColor?: Color
  dark?: number
  mapBrightness?: number
  markerSize?: number
  markerElevation?: number
  arcWidth?: number
  arcHeight?: number
  speed?: number
  theta?: number
  diffuse?: number
  mapSamples?: number
  className?: string
}

const MAX_THETA = 0.4
const MIN_THETA = -0.4
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// Must match the `scale` passed to createGlobe below — the label projection
// math needs the exact same value cobe uses internally to stay in sync with
// the WebGL render.
const GLOBE_SCALE = 0.94
// cobe's internal sphere radius constant (referenced as "ee" in its source).
const GLOBE_SPHERE_RADIUS = 0.8
const LABEL_GAP_PX = 6
const DEFAULT_LABEL_BOX = { width: 90, height: 24 }
const HOVER_RADIUS_PX = 18
const PULSE_DURATION_SECONDS = 3.2
const PULSE_STAGGER_SECONDS = 0.5
const PULSE_EDGE_FADE_FRACTION = 0.1

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value))
}

function toCssColor(color: Color, alpha: number) {
  const channels = color.map((channel) => Math.round(channel * 255)).join(' ')
  return `rgb(${channels} / ${alpha})`
}

// ─── Screen projection (mirrors cobe's internal projection math) ──────────────
// cobe positions marker/arc labels via a CSS-anchor-positioning hack tied to
// hidden DOM nodes it creates itself, which gives us no way to detect or
// resolve overlaps between labels. Projecting points ourselves, using the same
// math cobe uses to place those hidden anchors, lets us compute real pixel
// coordinates up front and suppress labels that would collide.

function latLngToUnitVector([lat, lng]: [number, number]): Vec3 {
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180 - Math.PI
  const cosLat = Math.cos(latRad)
  return [-cosLat * Math.cos(lngRad), Math.sin(latRad), cosLat * Math.sin(lngRad)]
}

function projectToScreen(point: Vec3, phi: number, theta: number, aspect: number) {
  const cosTheta = Math.cos(theta)
  const cosPhi = Math.cos(phi)
  const sinTheta = Math.sin(theta)
  const sinPhi = Math.sin(phi)
  const [x, y, z] = point

  const c = cosPhi * x + sinPhi * z
  const s = sinPhi * sinTheta * x + cosTheta * y - cosPhi * sinTheta * z

  return {
    x: (c / aspect * GLOBE_SCALE + 1) / 2,
    y: (-s * GLOBE_SCALE + 1) / 2,
    visible: -sinPhi * cosTheta * x + sinTheta * y + cosPhi * cosTheta * z >= 0 || c * c + s * s >= 0.64,
  }
}

function projectMarker(location: [number, number], phi: number, theta: number, aspect: number, markerElevation: number) {
  const unit = latLngToUnitVector(location)
  const radius = GLOBE_SPHERE_RADIUS + markerElevation
  return projectToScreen([unit[0] * radius, unit[1] * radius, unit[2] * radius], phi, theta, aspect)
}

// Same quadratic-bezier curve cobe's own arc mesh follows (endpoints at
// sphere radius, control point bulging outward by arcHeight) — sampling it
// at an arbitrary t lets us both find the label midpoint (t=0.5) and animate
// a pulse traveling the full path (t: 0..1).
function evaluateArcPoint(
  from: [number, number],
  to: [number, number],
  t: number,
  arcHeight: number,
  markerElevation: number,
): Vec3 {
  const a = latLngToUnitVector(from)
  const b = latLngToUnitVector(to)
  const endpointRadius = GLOBE_SPHERE_RADIUS + markerElevation
  const p0: Vec3 = [a[0] * endpointRadius, a[1] * endpointRadius, a[2] * endpointRadius]
  const p2: Vec3 = [b[0] * endpointRadius, b[1] * endpointRadius, b[2] * endpointRadius]

  const sum: Vec3 = [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
  const norm = Math.sqrt(sum[0] ** 2 + sum[1] ** 2 + sum[2] ** 2)
  const mid: Vec3 = norm > 0.001 ? [sum[0] / norm, sum[1] / norm, sum[2] / norm] : [0, 1, 0]
  const controlRadius = GLOBE_SPHERE_RADIUS + arcHeight + markerElevation
  const p1: Vec3 = [mid[0] * controlRadius, mid[1] * controlRadius, mid[2] * controlRadius]

  const oneMinusT = 1 - t
  const w0 = oneMinusT * oneMinusT
  const w1 = 2 * oneMinusT * t
  const w2 = t * t

  return [
    w0 * p0[0] + w1 * p1[0] + w2 * p2[0],
    w0 * p0[1] + w1 * p1[1] + w2 * p2[1],
    w0 * p0[2] + w1 * p1[2] + w2 * p2[2],
  ]
}

function projectArcPoint(
  from: [number, number],
  to: [number, number],
  t: number,
  phi: number,
  theta: number,
  aspect: number,
  arcHeight: number,
  markerElevation: number,
) {
  return projectToScreen(evaluateArcPoint(from, to, t, arcHeight, markerElevation), phi, theta, aspect)
}

function projectArcMidpoint(
  from: [number, number],
  to: [number, number],
  phi: number,
  theta: number,
  aspect: number,
  arcHeight: number,
  markerElevation: number,
) {
  return projectArcPoint(from, to, 0.5, phi, theta, aspect, arcHeight, markerElevation)
}

// ─── Label collision resolution ────────────────────────────────────────────
// Runs every frame: projects every label to its pixel position, then walks
// them in priority order (cities before routes) and hides any label whose box
// would overlap one already placed. Cheap for the handful of labels here —
// no need to throttle below 60fps.

interface LabelTarget {
  key: string
  el: HTMLDivElement | null
  x: number
  y: number
  visible: boolean
}

function resolveLabelCollisions(
  targets: LabelTarget[],
  labelSizes: Map<string, { width: number; height: number }>,
) {
  const placed: Array<{ x1: number; y1: number; x2: number; y2: number }> = []

  for (const target of targets) {
    if (!target.el) continue

    if (!target.visible) {
      target.el.style.opacity = '0'
      target.el.style.filter = 'blur(5px)'
      continue
    }

    const { width, height } = labelSizes.get(target.key) ?? DEFAULT_LABEL_BOX
    const boxBottom = target.y - 8
    const boxTop = boxBottom - height
    const boxLeft = target.x - width / 2
    const boxRight = target.x + width / 2

    const collides = placed.some(
      (box) =>
        boxLeft < box.x2 + LABEL_GAP_PX &&
        boxRight > box.x1 - LABEL_GAP_PX &&
        boxTop < box.y2 + LABEL_GAP_PX &&
        boxBottom > box.y1 - LABEL_GAP_PX,
    )

    if (collides) {
      target.el.style.opacity = '0'
      target.el.style.filter = 'blur(5px)'
      continue
    }

    placed.push({ x1: boxLeft, y1: boxTop, x2: boxRight, y2: boxBottom })
    target.el.style.transform = `translate(${target.x}px, ${target.y}px) translate(-50%, -100%) translateY(-8px)`
    target.el.style.opacity = '1'
    target.el.style.filter = 'blur(0px)'
  }
}

export function InteractiveGlobe({
  markers,
  arcs,
  markerColor = [0.36, 0.23, 1],
  baseColor = [0.95, 0.97, 1],
  arcColor = [0.24, 0.48, 1],
  glowColor = [1, 0.985, 0.96],
  dark = 0,
  mapBrightness = 6,
  markerSize = 0.025,
  markerElevation = 0.01,
  arcWidth = 0.5,
  arcHeight = 0.15,
  speed = 0.0025,
  theta = 0.12,
  diffuse = 3,
  mapSamples = 30000,
  className = '',
}: InteractiveGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<Globe | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const releaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const phiRef = useRef(0)
  const thetaRef = useRef(clamp(theta, MIN_THETA, MAX_THETA))
  const velocityPhiRef = useRef(0)
  const velocityThetaRef = useRef(0)
  const draggingRef = useRef(false)
  const autoRotationPausedRef = useRef(false)
  const pointerIdRef = useRef<number | null>(null)
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 })
  const speedRef = useRef(speed)
  const reducedMotionRef = useRef(false)
  const containerSizeRef = useRef({ width: 0, height: 0 })
  const labelElsRef = useRef<Map<string, HTMLDivElement>>(new Map())
  const labelSizesRef = useRef<Map<string, { width: number; height: number }>>(new Map())
  const pulseElsRef = useRef<Map<string, HTMLDivElement>>(new Map())
  const pulseClockRef = useRef(0)
  const pointerContainerPosRef = useRef<{ x: number; y: number } | null>(null)
  const hoverRingElRef = useRef<HTMLDivElement>(null)
  // Read by the render loop's label projection so it always reflects the
  // latest props, even though that loop lives inside a mount-only effect.
  const markersRef = useRef(markers)
  const arcsRef = useRef(arcs)
  const markerElevationRef = useRef(markerElevation)
  const arcHeightRef = useRef(arcHeight)
  const initialConfigurationRef = useRef({
    markers,
    arcs,
    markerColor,
    baseColor,
    arcColor,
    glowColor,
    dark,
    mapBrightness,
    markerSize,
    markerElevation,
    arcWidth,
    arcHeight,
    diffuse,
    mapSamples,
  })

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  useEffect(() => {
    thetaRef.current = clamp(theta, MIN_THETA, MAX_THETA)
  }, [theta])

  useEffect(() => {
    markersRef.current = markers
    arcsRef.current = arcs
    markerElevationRef.current = markerElevation
    arcHeightRef.current = arcHeight
  }, [markers, arcs, markerElevation, arcHeight])

  useEffect(() => {
    const invalidId = [...markers, ...arcs].find(({ id }) => !ID_PATTERN.test(id))
    if (invalidId) {
      throw new Error(`Invalid globe ID: ${invalidId.id}`)
    }
  }, [arcs, markers])

  useEffect(() => {
    globeRef.current?.update({
      markers: markers.map<CobeMarker>((marker) => ({
        id: marker.id,
        location: marker.location,
        size: markerSize,
      })),
      arcs: [],
      markerColor,
      baseColor,
      arcColor,
      glowColor,
      dark,
      mapBrightness,
      markerElevation,
      arcWidth,
      arcHeight,
      diffuse,
      mapSamples,
    })
  }, [arcColor, arcHeight, arcWidth, arcs, baseColor, dark, diffuse, glowColor, mapBrightness, mapSamples, markerColor, markerElevation, markerSize, markers])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const initialConfiguration = initialConfigurationRef.current

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => {
      reducedMotionRef.current = mediaQuery.matches
    }
    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    const cobeMarkers = initialConfiguration.markers.map<CobeMarker>((marker) => ({
      id: marker.id,
      location: marker.location,
      size: initialConfiguration.markerSize,
    }))
    const initialRect = container.getBoundingClientRect()
    const initialSize = Math.max(1, Math.round(initialRect.width))
    const initialDpr = Math.min(window.devicePixelRatio || 1, 2)
    containerSizeRef.current = { width: initialRect.width, height: initialRect.height }

    // Measure every label's real rendered box once up front so the very
    // first collision pass uses accurate sizes instead of a rough guess.
    for (const [key, el] of labelElsRef.current) {
      labelSizesRef.current.set(key, { width: el.offsetWidth, height: el.offsetHeight })
    }

    globeRef.current = createGlobe(canvas, {
      width: Math.round(initialSize * initialDpr),
      height: Math.round(initialSize * initialDpr),
      devicePixelRatio: initialDpr,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: initialConfiguration.dark,
      diffuse: initialConfiguration.diffuse,
      mapSamples: initialConfiguration.mapSamples,
      mapBrightness: initialConfiguration.mapBrightness,
      baseColor: initialConfiguration.baseColor,
      markerColor: initialConfiguration.markerColor,
      glowColor: initialConfiguration.glowColor,
      markers: cobeMarkers,
      // No arcs handed to cobe: we draw only our own traveling pulse dots
      // (below), not the static connecting line cobe would otherwise render.
      arcs: [],
      arcColor: initialConfiguration.arcColor,
      arcWidth: initialConfiguration.arcWidth,
      arcHeight: initialConfiguration.arcHeight,
      markerElevation: initialConfiguration.markerElevation,
      scale: GLOBE_SCALE,
    })

    let lastRenderedSize = initialSize
    let lastRenderedDpr = initialDpr
    resizeObserverRef.current = new ResizeObserver(([entry]) => {
      const size = Math.max(1, Math.round(entry.contentRect.width))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      containerSizeRef.current = { width: entry.contentRect.width, height: entry.contentRect.height }
      if (size === lastRenderedSize && dpr === lastRenderedDpr) return

      lastRenderedSize = size
      lastRenderedDpr = dpr
      globeRef.current?.update({
        width: Math.round(size * dpr),
        height: Math.round(size * dpr),
        devicePixelRatio: dpr,
      })
    })
    resizeObserverRef.current.observe(container)

    let previousFrameTime = performance.now()
    const render = (time: number) => {
      const frameRatio = Math.min((time - previousFrameTime) / (1000 / 60), 2)
      previousFrameTime = time

      if (!autoRotationPausedRef.current) {
        const motionMultiplier = reducedMotionRef.current ? 0 : 1
        phiRef.current += speedRef.current * frameRatio * motionMultiplier
      }

      if (!draggingRef.current) {
        phiRef.current += velocityPhiRef.current * frameRatio
        thetaRef.current = clamp(
          thetaRef.current + velocityThetaRef.current * frameRatio,
          MIN_THETA,
          MAX_THETA,
        )
        velocityPhiRef.current *= Math.pow(0.93, frameRatio)
        velocityThetaRef.current *= Math.pow(0.88, frameRatio)
        if (thetaRef.current === MIN_THETA || thetaRef.current === MAX_THETA) {
          velocityThetaRef.current = 0
        }
      }

      globeRef.current?.update({ phi: phiRef.current, theta: thetaRef.current })
      pulseClockRef.current += frameRatio / 60

      const { width, height } = containerSizeRef.current
      if (width > 0 && height > 0) {
        const aspect = width / height
        const currentMarkerElevation = markerElevationRef.current
        const currentArcHeight = arcHeightRef.current

        const markerTargets: LabelTarget[] = []
        for (const marker of markersRef.current) {
          const key = `marker:${marker.id}`
          const proj = projectMarker(marker.location, phiRef.current, thetaRef.current, aspect, currentMarkerElevation)
          markerTargets.push({ key, el: labelElsRef.current.get(key) ?? null, x: proj.x * width, y: proj.y * height, visible: proj.visible })
        }

        // Hover: find the nearest camera-facing marker under the pointer so
        // its label and a highlight ring can be forced to the front.
        const pointer = pointerContainerPosRef.current
        let hoveredTarget: LabelTarget | null = null
        if (pointer && !draggingRef.current) {
          let nearestDist = HOVER_RADIUS_PX
          for (const target of markerTargets) {
            if (!target.visible) continue
            const dist = Math.hypot(target.x - pointer.x, target.y - pointer.y)
            if (dist <= nearestDist) {
              nearestDist = dist
              hoveredTarget = target
            }
          }
        }
        canvas.style.cursor = hoveredTarget ? 'pointer' : draggingRef.current ? 'grabbing' : 'grab'

        const hoverRingEl = hoverRingElRef.current
        if (hoverRingEl) {
          if (hoveredTarget) {
            hoverRingEl.style.transform = `translate(${hoveredTarget.x}px, ${hoveredTarget.y}px) translate(-50%, -50%)`
            hoverRingEl.style.opacity = '1'
          } else {
            hoverRingEl.style.opacity = '0'
          }
        }

        const targets: LabelTarget[] = hoveredTarget
          ? [hoveredTarget, ...markerTargets.filter((target) => target.key !== hoveredTarget.key)]
          : markerTargets

        for (const arc of arcsRef.current) {
          if (!arc.label) continue
          const key = `arc:${arc.id}`
          const proj = projectArcMidpoint(arc.from, arc.to, phiRef.current, thetaRef.current, aspect, currentArcHeight, currentMarkerElevation)
          targets.push({ key, el: labelElsRef.current.get(key) ?? null, x: proj.x * width, y: proj.y * height, visible: proj.visible })
        }

        resolveLabelCollisions(targets, labelSizesRef.current)

        // Data pulse traveling along each arc, staggered per route so they
        // don't all animate in lockstep.
        let arcIndex = 0
        for (const arc of arcsRef.current) {
          const pulseEl = pulseElsRef.current.get(`pulse:${arc.id}`)
          if (pulseEl) {
            const cycleSeconds = pulseClockRef.current + arcIndex * PULSE_STAGGER_SECONDS
            const t = (cycleSeconds % PULSE_DURATION_SECONDS) / PULSE_DURATION_SECONDS
            const proj = projectArcPoint(arc.from, arc.to, t, phiRef.current, thetaRef.current, aspect, currentArcHeight, currentMarkerElevation)
            const edgeFade = Math.max(0, Math.min(t / PULSE_EDGE_FADE_FRACTION, (1 - t) / PULSE_EDGE_FADE_FRACTION, 1))
            pulseEl.style.transform = `translate(${proj.x * width}px, ${proj.y * height}px) translate(-50%, -50%)`
            pulseEl.style.opacity = proj.visible ? String(edgeFade) : '0'
          }
          arcIndex++
        }
      }

      animationFrameRef.current = requestAnimationFrame(render)
    }
    animationFrameRef.current = requestAnimationFrame(render)

    const handlePointerDown = (event: PointerEvent) => {
      if (pointerIdRef.current !== null) return
      pointerIdRef.current = event.pointerId
      draggingRef.current = true
      autoRotationPausedRef.current = true
      velocityPhiRef.current = 0
      velocityThetaRef.current = 0
      lastPointerRef.current = { x: event.clientX, y: event.clientY, time: performance.now() }
      canvas.setPointerCapture(event.pointerId)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const containerRect = container.getBoundingClientRect()
      pointerContainerPosRef.current = {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top,
      }

      if (!draggingRef.current || pointerIdRef.current !== event.pointerId) return

      const now = performance.now()
      const elapsed = Math.max(8, now - lastPointerRef.current.time)
      const deltaX = event.clientX - lastPointerRef.current.x
      const deltaY = event.clientY - lastPointerRef.current.y
      const phiDelta = -deltaX * 0.005
      const thetaDelta = deltaY * 0.003

      phiRef.current += phiDelta
      thetaRef.current = clamp(thetaRef.current + thetaDelta, MIN_THETA, MAX_THETA)
      velocityPhiRef.current = (phiDelta / elapsed) * (1000 / 60)
      velocityThetaRef.current = (thetaDelta / elapsed) * (1000 / 60)
      lastPointerRef.current = { x: event.clientX, y: event.clientY, time: now }
    }

    const finishPointerInteraction = (event: PointerEvent) => {
      if (pointerIdRef.current !== event.pointerId) return
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId)

      pointerIdRef.current = null
      draggingRef.current = false
      if (releaseTimerRef.current) clearTimeout(releaseTimerRef.current)
      releaseTimerRef.current = setTimeout(() => {
        autoRotationPausedRef.current = false
        releaseTimerRef.current = null
      }, 180)
    }

    const handlePointerLeave = () => {
      pointerContainerPosRef.current = null
    }

    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerup', finishPointerInteraction)
    canvas.addEventListener('pointercancel', finishPointerInteraction)
    canvas.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerup', finishPointerInteraction)
      canvas.removeEventListener('pointercancel', finishPointerInteraction)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
      mediaQuery.removeEventListener('change', updateMotionPreference)
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current)
      if (releaseTimerRef.current) clearTimeout(releaseTimerRef.current)
      resizeObserverRef.current?.disconnect()
      globeRef.current?.destroy()
      globeRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square w-full max-w-[680px] ${className}`}
      aria-label="Globo interativo com conexões entre cidades ao redor do mundo"
      role="img"
    >
      {/* SVG filter: maps black dots → purple/violet, white → white */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="globe-dot-colorize" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="
                0.45 0    0    0 0.55
                0    0.75 0    0 0.25
                0    0    0.12 0 0.88
                0    0    0    1 0
              "
            />
          </filter>
        </defs>
      </svg>
      <canvas
        ref={canvasRef}
        className="relative z-10 h-full w-full cursor-grab touch-none select-none active:cursor-grabbing"
        style={{ filter: 'url(#globe-dot-colorize)' }}
        aria-hidden="true"
      />

      {arcs.map((arc) => (
        <div
          key={arc.id}
          ref={(el) => {
            const key = `pulse:${arc.id}`
            if (el) pulseElsRef.current.set(key, el)
            else pulseElsRef.current.delete(key)
          }}
          className="pointer-events-none absolute left-0 top-0 z-20 h-[7px] w-[7px] rounded-full opacity-0"
          style={{
            background: toCssColor(arcColor, 1),
            boxShadow: `0 0 8px 1px ${toCssColor(arcColor, 0.7)}`,
            willChange: 'transform',
          }}
        />
      ))}

      <div
        ref={hoverRingElRef}
        className="pointer-events-none absolute left-0 top-0 z-20 h-6 w-6 rounded-full border-2 opacity-0 transition-opacity duration-150"
        style={{
          borderColor: toCssColor(markerColor, 0.9),
          boxShadow: `0 0 12px 2px ${toCssColor(markerColor, 0.45)}`,
          willChange: 'transform',
        }}
      />

      {markers.map((marker) => (
        <div
          key={marker.id}
          ref={(el) => {
            const key = `marker:${marker.id}`
            if (el) labelElsRef.current.set(key, el)
            else labelElsRef.current.delete(key)
          }}
          className="pointer-events-none absolute left-0 top-0 z-20 whitespace-nowrap rounded-md bg-slate-950 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 shadow-sm transition-[opacity,filter] duration-300"
          style={{ willChange: 'transform' }}
        >
          {marker.label}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-x-[4px] border-t-[5px] border-x-transparent border-t-slate-950" />
        </div>
      ))}

      {arcs.filter((arc) => arc.label).map((arc) => (
        <div
          key={arc.id}
          ref={(el) => {
            const key = `arc:${arc.id}`
            if (el) labelElsRef.current.set(key, el)
            else labelElsRef.current.delete(key)
          }}
          className="pointer-events-none absolute left-0 top-0 z-20 whitespace-nowrap rounded-full border border-slate-200/80 bg-white/95 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-700 opacity-0 shadow-sm transition-[opacity,filter] duration-300"
          style={{ willChange: 'transform' }}
        >
          {arc.label}
        </div>
      ))}
    </div>
  )
}
