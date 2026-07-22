import { useLayoutEffect, useRef } from 'react'
import { showcaseExamples } from './showcaseData'
import { CreationPreviewItem } from './CreationPreviewItem'

// ─── Constants ────────────────────────────────────────────────────────────────

const GAP_PX = 16
const DURATION_S = 45

// ─── Component ────────────────────────────────────────────────────────────────

export function CreationShowcaseTrack() {
  const copyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const copy = copyRef.current
    const track = trackRef.current
    if (!copy || !track) return

    const measure = () => {
      const w = copy.scrollWidth
      if (w === 0) return
      track.style.setProperty('--showcase-distance', `${w + GAP_PX}px`)
      track.style.animation = `showcase-marquee ${DURATION_S}s linear infinite`
      track.style.visibility = 'visible'
    }

    // Defer to ensure layout is settled
    requestAnimationFrame(() => {
      requestAnimationFrame(measure)
    })

    const ro = new ResizeObserver(measure)
    ro.observe(copy)
    return () => ro.disconnect()
  }, [])

  const renderCopy = (index: number) => (
    <div
      key={index}
      ref={index === 0 ? copyRef : undefined}
      className="flex shrink-0 items-stretch"
      style={{ gap: GAP_PX }}
      aria-hidden={index > 0 ? 'true' : undefined}
    >
      {showcaseExamples.map(example => (
        <CreationPreviewItem key={example.id} example={example} />
      ))}
    </div>
  )

  return (
    <div
      className="relative w-full overflow-hidden"
      role="marquee"
      aria-label="Exemplos de interfaces criadas na plataforma"
    >
      {/* Track */}
      <div
        ref={trackRef}
        className="showcase-marquee-track flex w-max items-stretch will-change-transform"
        style={{
          gap: GAP_PX,
          visibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      >
        {renderCopy(0)}
        {renderCopy(1)}
      </div>

      {/* Left fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 md:w-40"
        style={{
          background: 'linear-gradient(to right, #000 0%, transparent 100%)',
        }}
      />
      {/* Right fade */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 md:w-40"
        style={{
          background: 'linear-gradient(to left, #000 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
