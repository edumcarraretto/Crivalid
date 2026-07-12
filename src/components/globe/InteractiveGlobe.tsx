import { useEffect, useRef } from 'react'
import createGlobe, { type Globe } from '@/vendor/cobe'

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
  color?: Color
}

export interface InteractiveGlobeProps {
  markers: Marker[]
  arcs: Arc[]
  markerColor?: Color
  baseColor?: Color
  mapColor?: Color
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

const GLOBE_SCALE = 0.94
const GLOBE_SPHERE_RADIUS = 0.8
const LABEL_GAP_PX = 6
const DEFAULT_LABEL_BOX = { width: 90, height: 24 }

const MAX_ACTIVE_ROUTES = 6
const LINE_SAMPLE_COUNT = 48

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value))
}

function toCssColor(color: Color, alpha: number) {
  const channels = color.map((channel) => Math.round(channel * 255)).join(' ')
  return `rgb(${channels} / ${alpha})`
}

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
  const point = evaluateArcPoint(from, to, t, arcHeight, markerElevation)
  return projectToScreen(point, phi, theta, aspect)
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

function buildArcPathD(
  from: [number, number],
  to: [number, number],
  progress: number,
  phi: number,
  theta: number,
  aspect: number,
  arcHeight: number,
  markerElevation: number,
  width: number,
  height: number,
) {
  if (progress <= 0) return ''
  let d = ''
  let drawing = false
  const maxI = Math.ceil(progress * LINE_SAMPLE_COUNT)
  
  for (let i = 0; i <= maxI; i++) {
    const t = Math.min(i / LINE_SAMPLE_COUNT, progress)
    const proj = projectArcPoint(from, to, t, phi, theta, aspect, arcHeight, markerElevation)
    if (!proj.visible) {
      drawing = false
      continue
    }
    const x = (proj.x * width).toFixed(1)
    const y = (proj.y * height).toFixed(1)
    d += drawing ? ` L${x},${y}` : `M${x},${y}`
    drawing = true
  }
  return d
}

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

type RouteStatus = 'entering' | 'drawing' | 'holding' | 'exiting' | 'finished'

interface ActiveRouteState {
  arc: Arc
  status: RouteStatus
  progress: number
  startTime: number
  duration: number
  holdDuration: number
  exitDuration: number
}

export function InteractiveGlobe({
  markers,
  arcs,
  markerColor = [0.36, 0.23, 1],
  baseColor = [0.95, 0.97, 1],
  mapColor,
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
  const svgRef = useRef<SVGSVGElement>(null)
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
  const containerSizeRef = useRef({ width: 0, height: 0 })

  const labelElsRef = useRef<Map<string, HTMLDivElement>>(new Map())
  const labelSizesRef = useRef<Map<string, { width: number; height: number }>>(new Map())
  const pulseElsRef = useRef<Map<string, HTMLDivElement>>(new Map())
  const lineElsRef = useRef<Map<string, SVGPathElement>>(new Map())

  // Queue state
  const activeRoutesRef = useRef<Map<string, ActiveRouteState>>(new Map())
  const pendingRoutesRef = useRef<Arc[]>([])
  const nextSpawnTimeRef = useRef<number>(0)

  const markersRef = useRef(markers)
  const arcsRef = useRef(arcs)
  const markerElevationRef = useRef(markerElevation)
  const arcHeightRef = useRef(arcHeight)
  const initialConfigurationRef = useRef({
    markers: markers.map((m) => ({ location: m.location, size: markerSize })),
    arcs: [], // WebGL draws no arcs; we use SVG overlay to draw progressive lines
    markerColor,
    baseColor,
    mapColor: mapColor || baseColor,
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
    
    // Refresh pending routes with new arcs that aren't active
    const activeIds = new Set(activeRoutesRef.current.keys())
    const newPending = arcs.filter(a => !activeIds.has(a.id))
    
    // Shuffle the pending routes for organic spawning
    pendingRoutesRef.current = newPending.sort(() => 0.5 - Math.random())
  }, [markers, arcs, markerElevation, arcHeight])

  useEffect(() => {
    const invalidId = [...markers, ...arcs].find(({ id }) => !ID_PATTERN.test(id))
    if (invalidId) {
      console.warn(`[InteractiveGlobe] Invalid ID: "${invalidId.id}". Must match ${ID_PATTERN}`)
    }
  }, [markers, arcs])

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    let currentWidth = 0
    let currentHeight = 0

    const initGlobe = (width: number, height: number) => {
      if (globeRef.current) {
        globeRef.current.destroy()
        globeRef.current = null
      }

      currentWidth = width
      currentHeight = height
      containerSizeRef.current = { width, height }
      
      const initialDpr = window.devicePixelRatio || 1
      canvasRef.current!.width = Math.round(width * initialDpr)
      canvasRef.current!.height = Math.round(height * initialDpr)

      if (svgRef.current) {
        svgRef.current.setAttribute('viewBox', `0 0 ${width} ${height}`)
      }

      globeRef.current = createGlobe(canvasRef.current!, {
        ...initialConfigurationRef.current,
        width: Math.round(width * initialDpr),
        height: Math.round(height * initialDpr),
        devicePixelRatio: initialDpr,
        phi: phiRef.current,
        theta: thetaRef.current,
      })
    }

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width === 0 || height === 0) continue
        
        // Cobe doesn't handle resize natively, we recreate
        if (Math.abs(width - currentWidth) > 1 || Math.abs(height - currentHeight) > 1) {
          initGlobe(width, height)
        }
      }
    })

    ro.observe(containerRef.current)
    resizeObserverRef.current = ro
    
    const rect = containerRef.current.getBoundingClientRect()
    if (rect.width > 0 && rect.height > 0) {
      initGlobe(rect.width, rect.height)
    }

    return () => {
      ro.disconnect()
      if (globeRef.current) {
        globeRef.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    const render = (now: number) => {
      // Interaction physics
      if (!draggingRef.current && !autoRotationPausedRef.current) {
        phiRef.current += speedRef.current
      } else if (!draggingRef.current) {
        velocityPhiRef.current *= 0.92
        velocityThetaRef.current *= 0.92
        if (Math.abs(velocityPhiRef.current) > 0.0001) phiRef.current += velocityPhiRef.current
        if (Math.abs(velocityThetaRef.current) > 0.0001) thetaRef.current += velocityThetaRef.current
      }
      thetaRef.current = clamp(thetaRef.current, MIN_THETA, MAX_THETA)

      const width = containerSizeRef.current.width
      const height = containerSizeRef.current.height
      const aspect = width / height
      const currentArcHeight = arcHeightRef.current
      const currentMarkerElevation = markerElevationRef.current

      // Lifecycle update
      if (now > nextSpawnTimeRef.current && activeRoutesRef.current.size < MAX_ACTIVE_ROUTES && pendingRoutesRef.current.length > 0) {
        const nextArc = pendingRoutesRef.current.shift()!
        activeRoutesRef.current.set(nextArc.id, {
          arc: nextArc,
          status: 'entering',
          progress: 0,
          startTime: now,
          duration: 1800 + Math.random() * 1200, // 1800ms - 3000ms
          holdDuration: 1000 + Math.random() * 1000, // 1000ms - 2000ms
          exitDuration: 400 + Math.random() * 400, // 400ms - 800ms
        })
        // Wait between 300ms and 900ms before spawning the next one
        nextSpawnTimeRef.current = now + 300 + Math.random() * 600
      }

      // Update active routes
      for (const [id, state] of activeRoutesRef.current.entries()) {
        const lineEl = lineElsRef.current.get(`line:${id}`)
        const pulseEl = pulseElsRef.current.get(`pulse:${id}`)
        const labelEl = labelElsRef.current.get(`arc:${id}`)
        
        let opacity = 0
        let progress = state.progress

        const enteringDuration = 300
        const elapsed = now - state.startTime

        if (state.status === 'entering') {
          opacity = Math.min(elapsed / enteringDuration, 1)
          if (elapsed >= enteringDuration) {
            state.status = 'drawing'
            state.startTime = now
          }
        } else if (state.status === 'drawing') {
          opacity = 1
          progress = Math.min(elapsed / state.duration, 1)
          state.progress = progress
          if (elapsed >= state.duration) {
            state.status = 'holding'
            state.startTime = now
          }
        } else if (state.status === 'holding') {
          opacity = 1
          progress = 1
          if (elapsed >= state.holdDuration) {
            state.status = 'exiting'
            state.startTime = now
          }
        } else if (state.status === 'exiting') {
          opacity = Math.max(1 - (elapsed / state.exitDuration), 0)
          progress = 1
          if (elapsed >= state.exitDuration) {
            state.status = 'finished'
          }
        }

        if (state.status === 'finished') {
          activeRoutesRef.current.delete(id)
          pendingRoutesRef.current.push(state.arc)
          if (lineEl) lineEl.style.opacity = '0'
          if (pulseEl) pulseEl.style.opacity = '0'
          if (labelEl) labelEl.style.opacity = '0'
          continue
        }

        // Draw Line up to progress
        if (lineEl && width > 0 && height > 0) {
          const d = buildArcPathD(state.arc.from, state.arc.to, progress, phiRef.current, thetaRef.current, aspect, currentArcHeight, currentMarkerElevation, width, height)
          lineEl.setAttribute('d', d)
          lineEl.style.opacity = String(opacity)
        }

        // Move Pulse to the end of the line
        if (pulseEl && width > 0 && height > 0) {
          if (progress > 0) {
            const proj = projectArcPoint(state.arc.from, state.arc.to, progress, phiRef.current, thetaRef.current, aspect, currentArcHeight, currentMarkerElevation)
            if (proj.visible) {
              pulseEl.style.transform = `translate(${proj.x * width}px, ${proj.y * height}px) translate(-50%, -50%)`
              pulseEl.style.opacity = String(opacity)
            } else {
              pulseEl.style.opacity = '0'
            }
          } else {
            pulseEl.style.opacity = '0'
          }
        }
      }

      if (globeRef.current && width > 0 && height > 0) {
        globeRef.current.update({ phi: phiRef.current, theta: thetaRef.current })

        // Labels
        const markerTargets: LabelTarget[] = []
        for (const marker of markersRef.current) {
          const key = `marker:${marker.id}`
          const proj = projectMarker(marker.location, phiRef.current, thetaRef.current, aspect, currentMarkerElevation)
          markerTargets.push({ key, el: labelElsRef.current.get(key) ?? null, x: proj.x * width, y: proj.y * height, visible: proj.visible })
        }

        const targets: LabelTarget[] = [...markerTargets]

        for (const arc of arcsRef.current) {
          if (!arc.label) continue
          const key = `arc:${arc.id}`
          const state = activeRoutesRef.current.get(arc.id)
          const el = labelElsRef.current.get(key) ?? null
          
          if (!state) {
            if (el) {
              el.style.opacity = '0'
              el.style.pointerEvents = 'none'
            }
            continue
          }
          
          const proj = projectArcMidpoint(arc.from, arc.to, phiRef.current, thetaRef.current, aspect, currentArcHeight, currentMarkerElevation)
          
          let opacity = 0
          if (state.status === 'entering') opacity = (now - state.startTime) / 300
          else if (state.status === 'exiting') opacity = 1 - (now - state.startTime) / state.exitDuration
          else opacity = 1

          targets.push({ key, el, x: proj.x * width, y: proj.y * height, visible: proj.visible })
          if (el) {
            el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none'
            el.dataset.targetOpacity = String(Math.max(0, Math.min(1, opacity)))
          }
        }

        resolveLabelCollisions(targets, labelSizesRef.current)
        
        // Apply opacity properly to labels based on route state
        for (const target of targets) {
          if (target.el && target.el.dataset.targetOpacity) {
            if (target.el.style.opacity !== '0' || target.el.dataset.targetOpacity !== '0') {
              target.el.style.opacity = target.el.dataset.targetOpacity
            }
          }
        }
        
        // Hide unused pulse/lines that are in the DOM but not active
        for (const arc of arcsRef.current) {
          if (!activeRoutesRef.current.has(arc.id)) {
            const line = lineElsRef.current.get(`line:${arc.id}`)
            if (line && line.style.opacity !== '0') line.style.opacity = '0'
            const pulse = pulseElsRef.current.get(`pulse:${arc.id}`)
            if (pulse && pulse.style.opacity !== '0') pulse.style.opacity = '0'
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render)
    }
    animationFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== null) return
    pointerIdRef.current = e.pointerId
    draggingRef.current = true
    autoRotationPausedRef.current = true
    lastPointerRef.current = { x: e.clientX, y: e.clientY, time: performance.now() }
    
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId)
      containerRef.current.style.cursor = 'grabbing'
    }
    if (releaseTimerRef.current) clearTimeout(releaseTimerRef.current)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId || !draggingRef.current) return
    
    const now = performance.now()
    const dt = now - lastPointerRef.current.time
    const dx = e.clientX - lastPointerRef.current.x
    const dy = e.clientY - lastPointerRef.current.y
    
    phiRef.current += dx * 0.005
    thetaRef.current -= dy * 0.005
    thetaRef.current = clamp(thetaRef.current, MIN_THETA, MAX_THETA)
    
    if (dt > 0) {
      velocityPhiRef.current = (dx * 0.005) / (dt / 16.66)
      velocityThetaRef.current = (-dy * 0.005) / (dt / 16.66)
    }
    
    lastPointerRef.current = { x: e.clientX, y: e.clientY, time: now }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId) return
    
    pointerIdRef.current = null
    draggingRef.current = false
    
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId)
      containerRef.current.style.cursor = 'grab'
    }
    
    releaseTimerRef.current = setTimeout(() => {
      autoRotationPausedRef.current = false
    }, 2500)
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full aspect-square ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ cursor: 'grab' }}
    >
      <canvas
        ref={canvasRef}
        className="relative z-10 h-full w-full touch-none select-none"
        aria-hidden="true"
      />

      <svg
        ref={svgRef}
        className="pointer-events-none absolute inset-0 z-[15] h-full w-full overflow-visible"
        aria-hidden="true"
      >
        {arcs.map((arc) => (
          <path
            key={arc.id}
            ref={(el) => {
              const key = `line:${arc.id}`
              if (el) lineElsRef.current.set(key, el)
              else lineElsRef.current.delete(key)
            }}
            fill="none"
            stroke={arc.color ? toCssColor(arc.color, 1) : toCssColor(arcColor, 1)}
            strokeOpacity={0.65}
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0, transition: 'none' }}
          />
        ))}
      </svg>

      {arcs.map((arc) => (
        <div
          key={arc.id}
          ref={(el) => {
            const key = `pulse:${arc.id}`
            if (el) pulseElsRef.current.set(key, el)
            else pulseElsRef.current.delete(key)
          }}
          className="pointer-events-none absolute left-0 top-0 z-20 h-2 w-2 rounded-full"
          style={{
            backgroundColor: arc.color ? toCssColor(arc.color, 1) : toCssColor(glowColor, 1),
            boxShadow: `0 0 8px 2px ${arc.color ? toCssColor(arc.color, 0.8) : toCssColor(arcColor, 0.8)}`,
            opacity: 0,
            transition: 'none',
          }}
          aria-hidden="true"
        />
      ))}

      {markers.map((marker) => (
        <div
          key={marker.id}
          ref={(el) => {
            const key = `marker:${marker.id}`
            if (el) {
              labelElsRef.current.set(key, el)
              if (!labelSizesRef.current.has(key)) {
                const rect = el.getBoundingClientRect()
                labelSizesRef.current.set(key, { width: rect.width || DEFAULT_LABEL_BOX.width, height: rect.height || DEFAULT_LABEL_BOX.height })
              }
            } else {
              labelElsRef.current.delete(key)
            }
          }}
          className="pointer-events-none absolute left-0 top-0 z-30 flex flex-col items-center gap-1 transition-opacity duration-200"
          style={{ opacity: 0 }}
        >
          <div className="text-[10px] font-bold tracking-wider text-slate-800 backdrop-blur-sm bg-white/40 px-1.5 py-0.5 rounded-sm ring-1 ring-white/30 shadow-sm uppercase whitespace-nowrap">
            {marker.label}
          </div>
          <div 
            className="h-1.5 w-1.5 rounded-full ring-2 ring-white shadow-sm"
            style={{ backgroundColor: toCssColor(markerColor, 1) }}
          />
        </div>
      ))}

      {arcs.map((arc) => arc.label && (
        <div
          key={arc.id}
          ref={(el) => {
            const key = `arc:${arc.id}`
            if (el) {
              labelElsRef.current.set(key, el)
              if (!labelSizesRef.current.has(key)) {
                const rect = el.getBoundingClientRect()
                labelSizesRef.current.set(key, { width: rect.width || DEFAULT_LABEL_BOX.width, height: rect.height || DEFAULT_LABEL_BOX.height })
              }
            } else {
              labelElsRef.current.delete(key)
            }
          }}
          className="pointer-events-none absolute left-0 top-0 z-40 transition-all duration-200"
          style={{ opacity: 0 }}
        >
          <div className="relative group pointer-events-auto cursor-pointer flex items-center justify-center">
            <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-full shadow-sm ring-1 ring-slate-200/50 scale-100 group-hover:scale-110 transition-transform duration-200" />
            <div className="relative text-[10px] font-bold tracking-wider text-slate-700 px-2.5 py-1 uppercase whitespace-nowrap">
              {arc.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
