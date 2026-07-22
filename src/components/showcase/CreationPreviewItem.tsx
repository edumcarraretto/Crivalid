import type { ShowcaseExample } from './showcaseData'
import { categoryColors, CATEGORY_COLOR_FALLBACK } from './showcaseData'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CreationPreviewItemProps {
  example: ShowcaseExample
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CreationPreviewItem({ example }: CreationPreviewItemProps) {
  const dotColor = categoryColors[example.category] ?? CATEGORY_COLOR_FALLBACK

  return (
    <div
      className="showcase-item group relative flex-shrink-0 w-[220px] sm:w-[240px] md:w-[260px] rounded-2xl overflow-hidden"
      style={{
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
        aspectRatio: '9 / 19',
      }}
      aria-label={`Exemplo de design: ${example.category} — ${example.subcategory}`}
    >
      <img
        src={example.image}
        alt={`${example.title} — ${example.category}`}
        className="w-full h-full object-cover object-top"
        loading="lazy"
        draggable={false}
      />

      {/* Bottom gradient for readability */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0
          h-28
          bg-gradient-to-t from-black/65 via-black/15 to-transparent
        "
      />

      {/* Category pill */}
      <div
        className="
          absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20
          inline-flex items-center gap-1.5
          rounded-full
          border border-white/[0.15]
          bg-black/55
          px-2.5 py-1 sm:px-3 sm:py-1.5
          backdrop-blur-md
          shadow-sm
          pointer-events-none
          showcase-pill
        "
      >
        {/* Colour dot */}
        <span
          aria-hidden="true"
          className={`block w-[5px] h-[5px] rounded-full ${dotColor} shrink-0`}
          style={{ boxShadow: `0 0 4px currentColor` }}
        />

        {/* Category text */}
        <span className="text-[10px] sm:text-[11px] font-medium text-white/90 leading-none whitespace-nowrap">
          {example.category}
        </span>

        {/* Subcategory — visible on hover (desktop only) */}
        <span
          aria-hidden="true"
          className="
            showcase-subcategory
            hidden sm:inline
            max-w-0 overflow-hidden opacity-0
            text-[10px] font-normal text-white/55 leading-none whitespace-nowrap
            transition-all duration-300 ease-out
          "
        >
          <span className="text-white/25 mx-1">·</span>
          {example.subcategory}
        </span>
      </div>
    </div>
  )
}
