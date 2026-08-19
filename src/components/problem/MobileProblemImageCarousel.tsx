import { useState, useRef } from 'react'

// Offset exatos para dividir a imagem em 3 partes perfeitas
const OFFSETS = [0, 33.333, 66.666]

export function MobileProblemImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const slideWidth = container.offsetWidth
    const newIndex = Math.round(container.scrollLeft / slideWidth)
    setActiveIndex(Math.min(Math.max(newIndex, 0), OFFSETS.length - 1))
  }

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* ── Horizontal Snap Slider ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {OFFSETS.map((offset, index) => (
          <div
            key={index}
            className="w-full shrink-0 snap-center"
          >
            {/* Image Frame: displays exact third of the original image */}
            <div className="relative w-full overflow-hidden flex items-center" style={{ aspectRatio: '1.15 / 1' }}>
              <img
                src="/images/novaimagem_v2.png"
                alt={`Etapa ${index + 1} de 3`}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="absolute top-0 bottom-0 h-full w-[300%] max-w-none object-cover select-none pointer-events-none transition-transform duration-300"
                style={{
                  left: '0%',
                  transform: `translateX(-${index * 33.333}%)`,
                  imageRendering: 'auto',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Minimal dots indicator ── */}
      <div className="flex items-center gap-1.5">
        {OFFSETS.map((_, i) => (
          <span
            key={i}
            className={`
              rounded-full transition-all duration-300
              ${activeIndex === i ? 'w-5 h-1.5 bg-blue-600' : 'w-1.5 h-1.5 bg-neutral-300'}
            `}
          />
        ))}
      </div>
    </div>
  )
}
