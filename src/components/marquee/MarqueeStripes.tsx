import { useLayoutEffect, useRef } from 'react'
import { stripes } from './marqueeData'
import type { Chevron, Stripe } from './marqueeData'

// ─── Constants ───────────────────────────────────────────────────────────────

const ARROW_W = 36
const STROKE = 3
/** Number of times the chevron sequence repeats inside one copy of the track */
const SEQUENCE_REPEATS = 4

// ─── ChevronItem ─────────────────────────────────────────────────────────────
// All SVG sizing is done via direct DOM mutation in useLayoutEffect — no React
// state, no re-renders. The SVG starts hidden and is revealed synchronously
// before the first paint, eliminating any flash.

interface ChevronItemProps {
  chevron: Chevron
  arrow: Stripe['arrow']
  marginLeft: number
  zIndex: number
}

function ChevronItem({ chevron, arrow, marginLeft, zIndex }: ChevronItemProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    const svg = svgRef.current
    const pathEl = pathRef.current
    if (!container || !svg || !pathEl) return

    const update = () => {
      const { width, height } = container.getBoundingClientRect()
      const w = Math.round(width)
      const h = Math.round(height)
      if (w === 0 || h === 0) return

      svg.setAttribute('width', String(w))
      svg.setAttribute('height', String(h))

      const d =
        arrow === 'right'
          ? `M0,0 L${w - ARROW_W},0 L${w},${h / 2} L${w - ARROW_W},${h} L0,${h} L${ARROW_W},${h / 2} Z`
          : `M${ARROW_W},0 L${w},0 L${w - ARROW_W},${h / 2} L${w},${h} L${ARROW_W},${h} L0,${h / 2} Z`

      pathEl.setAttribute('d', d)
      svg.style.visibility = 'visible'
    }

    update()

    const ro = new ResizeObserver(update)
    ro.observe(container)
    return () => ro.disconnect()
  }, [arrow])

  return (
    <div
      ref={containerRef}
      className="relative flex h-full shrink-0 items-center"
      style={{
        marginLeft,
        paddingLeft: ARROW_W + 24,
        paddingRight: ARROW_W + 24,
        zIndex,
        contain: 'layout style',
      }}
    >
      <svg
        ref={svgRef}
        className="pointer-events-none absolute inset-0"
        style={{ visibility: 'hidden' }}
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          fill={chevron.color}
          stroke="#000000"
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
      </svg>

      <span className="relative whitespace-nowrap text-lg font-extrabold uppercase tracking-tight text-black sm:text-xl md:text-3xl lg:text-4xl">
        {chevron.text}
      </span>
    </div>
  )
}

// ─── MarqueeTrack ────────────────────────────────────────────────────────────
// Measures the real pixel width of one sequence copy (including negative
// margins from overlapping chevrons) and drives the animation via a CSS
// custom property so the loop is pixel-perfect regardless of content length.
// All measurement is done via direct DOM manipulation — no React state.

interface MarqueeTrackProps {
  stripe: Stripe
}

function MarqueeTrack({ stripe }: MarqueeTrackProps) {
  const copyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const copy = copyRef.current
    const track = trackRef.current
    if (!copy || !track) return

    const update = () => {
      const w = copy.scrollWidth
      if (w === 0) return
      track.style.setProperty('--marquee-distance', `${w}px`)
      track.style.animation = `makeploy-marquee-${stripe.direction} ${stripe.duration}s linear infinite`
      track.style.visibility = 'visible'
    }

    // Defer measurement slightly to ensure all ChevronItem SVGs
    // have been measured and laid out first.
    requestAnimationFrame(() => {
      requestAnimationFrame(update)
    })

    const ro = new ResizeObserver(update)
    ro.observe(copy)
    return () => ro.disconnect()
  }, [stripe.direction, stripe.duration])

  const sequence = Array.from({ length: SEQUENCE_REPEATS }).flatMap(
    () => stripe.chevrons,
  )
  const total = sequence.length

  const renderSequence = (duplicateIndex: number) => (
    <div
      key={duplicateIndex}
      ref={duplicateIndex === 0 ? copyRef : undefined}
      className="flex shrink-0 items-stretch"
      aria-hidden={duplicateIndex === 1 ? 'true' : undefined}
    >
      {sequence.map((chevron, itemIndex) => (
        <ChevronItem
          key={`${duplicateIndex}-${itemIndex}`}
          chevron={chevron}
          arrow={stripe.arrow}
          marginLeft={
            itemIndex === 0 && duplicateIndex === 0 ? 0 : -ARROW_W
          }
          zIndex={
            stripe.arrow === 'right'
              ? itemIndex + 1
              : total - itemIndex
          }
        />
      ))}
    </div>
  )

  return (
    <div
      className="relative h-16 overflow-hidden sm:h-20 md:h-28"
      style={{ contain: 'content' }}
    >
      <div
        ref={trackRef}
        className="makeploy-marquee-track flex h-full w-max items-stretch will-change-transform"
        style={{
          visibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      >
        {renderSequence(0)}
        {renderSequence(1)}
      </div>
    </div>
  )
}

// ─── MarqueeStripes (exported section) ───────────────────────────────────────

export function MarqueeStripes() {
  return (
    <section
      aria-label="MAKEPLOY em movimento"
      className="w-full overflow-hidden bg-black"
    >
      {/* Scoped keyframes — uses measured --marquee-distance so the loop
          is pixel-perfect even with overlapping negative margins.
          translate3d forces GPU compositing for maximum smoothness. */}
      <style>{`
        @keyframes makeploy-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(calc(-1 * var(--marquee-distance)), 0, 0); }
        }
        @keyframes makeploy-marquee-right {
          from { transform: translate3d(calc(-1 * var(--marquee-distance)), 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .makeploy-marquee-track {
            animation: none !important;
          }
        }

        @media (hover: hover) {
          .makeploy-marquee-track {
            transition: animation-play-state 0.3s;
          }
          .makeploy-marquee-track:hover {
            animation-play-state: paused;
          }
        }
      `}</style>

      {stripes.map((stripe, i) => (
        <MarqueeTrack key={i} stripe={stripe} />
      ))}
    </section>
  )
}

export default MarqueeStripes
