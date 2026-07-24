import { useLayoutEffect, useRef, useState, useCallback } from 'react'
import type { ShowcaseExample } from './showcaseData'
import { categoryTheme, CATEGORY_THEME_FALLBACK } from './showcaseData'

// ─── Shape constants ──────────────────────────────────────────────────────────

const CARD_R = 16   // card border-radius (px)
const TAB_R = 8     // tab bottom corner radius
const NOTCH_R = 6   // concave junction radius
const TAB_H = 28    // tab height

// ─── SVG path generator for tab fill ──────────────────────────────────────────

function buildTabPath(
  cardW: number,
  cardH: number,
  tabW: number,
): string {
  const totalH = cardH + TAB_H
  const tabL = (cardW - tabW) / 2
  const tabRE = tabL + tabW

  return [
    `M ${tabL - NOTCH_R} ${cardH}`,
    `A ${NOTCH_R} ${NOTCH_R} 0 0 0 ${tabL} ${cardH + NOTCH_R}`,
    `V ${totalH - TAB_R}`,
    `A ${TAB_R} ${TAB_R} 0 0 1 ${tabL + TAB_R} ${totalH}`,
    `H ${tabRE - TAB_R}`,
    `A ${TAB_R} ${TAB_R} 0 0 1 ${tabRE} ${totalH - TAB_R}`,
    `V ${cardH + NOTCH_R}`,
    `A ${NOTCH_R} ${NOTCH_R} 0 0 0 ${tabRE + NOTCH_R} ${cardH}`,
    'Z',
  ].join(' ')
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface CreationPreviewItemProps {
  example: ShowcaseExample
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CreationPreviewItem({ example }: CreationPreviewItemProps) {
  const fallbackTheme = categoryTheme[example.category] ?? CATEGORY_THEME_FALLBACK
  const tabBgColor = example.accentColor ?? fallbackTheme.bg
  const textColor = fallbackTheme.text

  const wrapperRef = useRef<HTMLDivElement>(null)
  const tabRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<{ tabPath: string; w: number; h: number } | null>(null)

  const measure = useCallback(() => {
    const wrapper = wrapperRef.current
    const tab = tabRef.current
    if (!wrapper || !tab) return

    const w = wrapper.offsetWidth
    const totalH = wrapper.offsetHeight
    const cardH = totalH - TAB_H
    const tabW = tab.offsetWidth

    setSvg({
      tabPath: buildTabPath(w, cardH, tabW),
      w,
      h: totalH,
    })
  }, [])

  useLayoutEffect(() => {
    requestAnimationFrame(measure)
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  return (
    <div
      ref={wrapperRef}
      className="showcase-item group relative flex-shrink-0 w-[220px] sm:w-[240px] md:w-[260px]"
      aria-label={`Exemplo de design: ${example.category} — ${example.subcategory}`}
    >
      {/* ── Main Card (Image area with subtle matching border) ── */}
      <div
        className="relative overflow-hidden bg-black"
        style={{
          aspectRatio: '9 / 19',
          borderRadius: `${CARD_R}px`,
          border: `1px solid ${tabBgColor}70`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <img
          src={example.image}
          alt={`${example.title} — ${example.category}`}
          className="w-full h-full object-cover object-top"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* ── Tab spacer (in flow — adds tab height) ── */}
      <div aria-hidden="true" style={{ height: TAB_H }} />

      {/* ── Borderless Tab SVG Fill ── */}
      {svg && (
        <svg
          className="absolute top-0 left-0 pointer-events-none z-10"
          width={svg.w}
          height={svg.h}
          viewBox={`0 0 ${svg.w} ${svg.h}`}
          aria-hidden="true"
        >
          <path
            d={svg.tabPath}
            fill={tabBgColor}
            stroke="none"
          />
        </svg>
      )}

      {/* ── Tab content (text & indicator dot) ── */}
      <div
        ref={tabRef}
        className="
          absolute bottom-0 left-1/2 -translate-x-1/2 z-20
          inline-flex items-center justify-center gap-1.5
          pointer-events-none max-w-[calc(100%-24px)]
        "
        style={{
          height: TAB_H,
          padding: '0 18px',
        }}
      >
        {/* White indicator dot */}
        <span
          aria-hidden="true"
          className="block w-[5px] h-[5px] rounded-full bg-white shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.8)]"
        />

        {/* Category text */}
        <span
          className="text-[10px] sm:text-[11px] font-semibold leading-none whitespace-nowrap tracking-wide truncate"
          style={{ color: textColor }}
        >
          {example.category}
        </span>
      </div>
    </div>
  )
}
