import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { openEarlyAccess } from '@/lib/earlyAccess'
import { HighlightText } from '@/components/text/HighlightText'
import { tools, type Tool } from '@/components/tools/toolsData'
import { ProjectsMockup, DocumentsMockup, AIMockup, ChatMockup } from '@/components/tools/FeaturedMockups'

// ────────────────────────────────────────────────────────────
// Grid placement types & algorithms
// ────────────────────────────────────────────────────────────
type Placement = { tool: Tool; col: number; row: number }

// ── 1. Desktop placement (10 columns, 8 rows) ──
const DESKTOP_COLS = 10
const DESKTOP_TOTAL_ROWS = 8
const DESKTOP_ROW_HEIGHT = 96

function buildDesktopPlacements(allTools: Tool[]): Placement[] {
  const occupied = new Set<string>()
  const featured = allTools.filter((t) => t.featured)

  for (const ft of featured) {
    for (let r = ft.rowStart! + 1; r < ft.rowStart! + 1 + ft.rowSpan; r++) {
      for (let c = ft.colStart!; c < ft.colStart! + ft.colSpan; c++) {
        occupied.add(`${r}-${c}`)
      }
    }
  }

  const placements: Placement[] = featured.map((ft) => ({
    tool: ft,
    col: ft.colStart!,
    row: ft.rowStart! + 1,
  }))

  const small = allTools.filter((t) => !t.featured)
  let idx = 0

  for (let r = 2; r <= DESKTOP_TOTAL_ROWS - 1 && idx < small.length; r++) {
    for (let c = 1; c <= DESKTOP_COLS && idx < small.length; c++) {
      if (occupied.has(`${r}-${c}`)) continue
      placements.push({ tool: small[idx], col: c, row: r })
      idx++
    }
  }

  return placements
}

// ── 2. 8-Column placement for Tablet & Mobile (8 columns, 8 rows) ──
const EIGHT_COLS = 8
const EIGHT_TOTAL_ROWS = 8
const TABLET_ROW_HEIGHT = 88
const MOBILE_ROW_HEIGHT = 80

function buildEightColumnPlacements(allTools: Tool[]): Placement[] {
  const occupied = new Set<string>()

  // In 8 columns:
  // Center cards occupy cols 3-4 and cols 5-6 (leaving 2 columns on left and 2 on right)
  const featuredMap: Record<string, { col: number; row: number }> = {
    projetos: { col: 3, row: 3 },
    documentos: { col: 5, row: 3 },
    'assistente-ia': { col: 3, row: 5 },
    conversas: { col: 5, row: 5 },
  }

  const featured = allTools.filter((t) => t.featured)
  const placements: Placement[] = []

  for (const ft of featured) {
    const pos = featuredMap[ft.id]
    if (pos) {
      for (let r = pos.row; r < pos.row + 2; r++) {
        for (let c = pos.col; c < pos.col + 2; c++) {
          occupied.add(`${r}-${c}`)
        }
      }
      placements.push({
        tool: { ...ft, colSpan: 2, rowSpan: 2 },
        col: pos.col,
        row: pos.row,
      })
    }
  }

  const small = allTools.filter((t) => !t.featured)
  let idx = 0

  for (let r = 2; r <= EIGHT_TOTAL_ROWS - 1 && idx < small.length; r++) {
    for (let c = 1; c <= EIGHT_COLS && idx < small.length; c++) {
      if (occupied.has(`${r}-${c}`)) continue
      placements.push({ tool: small[idx], col: c, row: r })
      idx++
    }
  }

  return placements
}

const desktopPlacements = buildDesktopPlacements(tools)
const eightColPlacements = buildEightColumnPlacements(tools)

// ────────────────────────────────────────────────────────────
// Mockup registry
// ────────────────────────────────────────────────────────────
const featuredMockups: Record<string, React.ReactNode> = {
  projetos: <ProjectsMockup />,
  documentos: <DocumentsMockup />,
  'assistente-ia': <AIMockup />,
  conversas: <ChatMockup />,
}

// ────────────────────────────────────────────────────────────
// Edge-fade mask — applied to the grid container via CSS
// mask-image so ALL four sides fade uniformly.
// ────────────────────────────────────────────────────────────
const GRID_MASK_STYLE: React.CSSProperties = {
  WebkitMaskImage: [
    'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
    'linear-gradient(to bottom, transparent 0%, black 12.5%, black 87.5%, transparent 100%)',
  ].join(', '),
  maskImage: [
    'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
    'linear-gradient(to bottom, transparent 0%, black 12.5%, black 87.5%, transparent 100%)',
  ].join(', '),
  WebkitMaskComposite: 'source-in',
  maskComposite: 'intersect' as const,
}

// ────────────────────────────────────────────────────────────
// Small tool cell component
// ────────────────────────────────────────────────────────────
interface SmallToolCellProps {
  tool: Tool
  col: number
  row: number
  isSelected: boolean
  onSelect: (id: string) => void
  isMobileOrTablet?: boolean
}

function SmallToolCell({
  tool,
  col,
  row,
  isSelected,
  onSelect,
  isMobileOrTablet = false,
}: SmallToolCellProps) {
  const Icon = tool.icon
  const isAvailable = tool.status === 'available'
  const isComingSoon = tool.status === 'coming_soon'

  return (
    <motion.button
      type="button"
      disabled={!isAvailable}
      aria-pressed={isAvailable ? isSelected : undefined}
      aria-label={isComingSoon ? `${tool.title} — em breve` : tool.title}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: (row * 4 + col) * 0.015 }}
      style={{
        gridColumn: `${col} / span 1`,
        gridRow: `${row} / span 1`,
      }}
      className="relative group"
      title={isComingSoon ? 'Em breve' : tool.title}
      onClick={() => onSelect(tool.id)}
    >
      <div
        className={[
          'flex flex-col items-center justify-center gap-1 h-full w-full select-none p-1',
          'border-r border-b border-gray-200/60',
          'transition-all duration-200 ease-out',
          isAvailable ? 'cursor-pointer' : 'cursor-default',
          !isAvailable ? 'opacity-45' : '',
          // ── Selected state ──
          isSelected
            ? 'scale-[1.04] -translate-y-1 shadow-2xl z-20 ring-2 ring-gray-900/10 bg-white rounded-lg'
            : 'scale-100 translate-y-0 z-0',
          // ── Hover (only when NOT selected) ──
          isAvailable && !isSelected ? 'hover:bg-gray-50 hover:scale-[1.02] hover:z-10 hover:ring-1 hover:ring-black/50' : '',
        ].join(' ')}
      >
        <Icon
          className={[
            isMobileOrTablet ? 'w-4 h-4' : 'w-5 h-5',
            'transition-colors duration-200 shrink-0',
            isSelected ? 'text-gray-700' : 'text-gray-400',
            isAvailable && !isSelected ? 'group-hover:text-gray-600' : '',
          ].join(' ')}
          strokeWidth={1.5}
        />
        <span
          className={[
            isMobileOrTablet ? 'text-[8.5px] leading-tight' : 'text-[10px] leading-tight',
            'text-center px-0.5 max-w-full truncate transition-colors duration-200',
            isSelected ? 'text-gray-800 font-medium' : 'text-gray-500',
            isAvailable && !isSelected ? 'group-hover:text-gray-700' : '',
          ].join(' ')}
        >
          {tool.title}
        </span>

        {/* "Em breve" tooltip */}
        {isComingSoon && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-gray-900 text-white text-[9px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-md">
            Em breve
          </span>
        )}
      </div>
    </motion.button>
  )
}

// ────────────────────────────────────────────────────────────
// Featured tool card (2×2 cells)
// ────────────────────────────────────────────────────────────
interface FeaturedToolCardProps {
  tool: Tool
  col: number
  row: number
  isSelected: boolean
  onSelect: (id: string) => void
  isMobileOrTablet?: boolean
}

function FeaturedToolCard({
  tool,
  col,
  row,
  isSelected,
  onSelect,
  isMobileOrTablet = false,
}: FeaturedToolCardProps) {
  const Icon = tool.icon
  const mockup = featuredMockups[tool.id]

  // Rounded corner ONLY on the inner vertex facing the center (creates the 4-point star cutout in the center)
  const centerCornerRounding =
    tool.id === 'projetos'
      ? 'rounded-br-[20px] sm:rounded-br-[24px]'
      : tool.id === 'documentos'
      ? 'rounded-bl-[20px] sm:rounded-bl-[24px]'
      : tool.id === 'assistente-ia'
      ? 'rounded-tr-[20px] sm:rounded-tr-[24px]'
      : tool.id === 'conversas'
      ? 'rounded-tl-[20px] sm:rounded-tl-[24px]'
      : ''

  return (
    <motion.button
      type="button"
      aria-pressed={isSelected}
      aria-label={tool.title}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        gridColumn: `${col} / span ${tool.colSpan}`,
        gridRow: `${row} / span ${tool.rowSpan}`,
      }}
      className="relative group cursor-pointer"
      onClick={() => onSelect(tool.id)}
    >
      <div
        className={[
          'h-full w-full flex flex-col overflow-hidden',
          'border-r border-b border-gray-200/60',
          centerCornerRounding,
          tool.bgColor ?? 'bg-white',
          'transition-all duration-200 ease-out',
          // ── Selected state ──
          isSelected
            ? 'scale-[1.02] -translate-y-1 shadow-2xl z-20 ring-2 ring-gray-900/10'
            : 'scale-100 translate-y-0 z-0',
          // ── Hover (only when NOT selected) ──
          !isSelected ? 'hover:scale-[1.01] hover:shadow-md hover:z-10 hover:ring-1 hover:ring-black/50' : '',
        ].join(' ')}
      >
        {/* Mockup preview area */}
        <div className="flex-1 min-h-0 overflow-hidden m-1.5 md:m-2 mb-0 rounded-sm bg-white/70 border border-gray-100/80">
          {mockup}
        </div>

        {/* Card label */}
        <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 md:py-2.5 shrink-0">
          <Icon
            className={`${isMobileOrTablet ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${tool.accentColor ?? 'text-gray-500'} shrink-0`}
            strokeWidth={2}
          />
          <span className={`${isMobileOrTablet ? 'text-xs' : 'text-xs md:text-sm'} font-bold text-gray-800 tracking-tight truncate`}>
            {tool.title}
          </span>
        </div>
      </div>
    </motion.button>
  )
}

// ────────────────────────────────────────────────────────────
// Main section export with responsive device configurations
// ────────────────────────────────────────────────────────────
export function ToolsSection() {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelectedToolId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="ferramentas"
      className="py-20 md:py-28 bg-white w-full flex flex-col items-center overflow-x-clip"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
        className="max-w-2xl w-full text-center mb-12 md:mb-16 px-4"
      >
        <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
          Ferramentas diferentes.
          <br />
          <HighlightText variant="yellow">Um projeto só.</HighlightText>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-md mx-auto leading-relaxed">
          Documentos, tarefas, IA, dados e automações compartilham objetivos, decisões e histórico.
        </p>
      </motion.div>

      {/* ── 1. Desktop grid (>= 1024px: 10 columns, full width) ──── */}
      <div className="hidden lg:block w-full max-w-7xl mx-auto px-4">
        <div className="overflow-visible pb-6" style={GRID_MASK_STYLE}>
          <div
            className="border-t border-l border-gray-200/60"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${DESKTOP_COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${DESKTOP_TOTAL_ROWS}, ${DESKTOP_ROW_HEIGHT}px)`,
            }}
          >
            {/* Linha 1: células vazias para formar a borda fantasma superior */}
            {Array.from({ length: DESKTOP_COLS }).map((_, i) => (
              <div
                key={`desktop-empty-top-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{ gridColumn: i + 1, gridRow: 1 }}
              />
            ))}

            {/* Linha Final: células vazias para formar a borda fantasma inferior */}
            {Array.from({ length: DESKTOP_COLS }).map((_, i) => (
              <div
                key={`desktop-empty-bottom-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{ gridColumn: i + 1, gridRow: DESKTOP_TOTAL_ROWS }}
              />
            ))}

            {desktopPlacements.map(({ tool, col, row }) =>
              tool.featured ? (
                <FeaturedToolCard
                  key={`desktop-${tool.id}`}
                  tool={tool}
                  col={col}
                  row={row}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                />
              ) : (
                <SmallToolCell
                  key={`desktop-${tool.id}`}
                  tool={tool}
                  col={col}
                  row={row}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* ── 2. Tablet grid (768px - 1023px: 8 columns, 8 rows) ──── */}
      <div className="hidden md:block lg:hidden w-full max-w-4xl mx-auto px-4">
        <div className="overflow-visible pb-6" style={GRID_MASK_STYLE}>
          <div
            className="border-t border-l border-gray-200/60"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${EIGHT_COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${EIGHT_TOTAL_ROWS}, ${TABLET_ROW_HEIGHT}px)`,
            }}
          >
            {/* Top ghost row */}
            {Array.from({ length: EIGHT_COLS }).map((_, i) => (
              <div
                key={`tablet-empty-top-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{ gridColumn: i + 1, gridRow: 1 }}
              />
            ))}

            {/* Bottom ghost row */}
            {Array.from({ length: EIGHT_COLS }).map((_, i) => (
              <div
                key={`tablet-empty-bottom-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{ gridColumn: i + 1, gridRow: EIGHT_TOTAL_ROWS }}
              />
            ))}

            {eightColPlacements.map(({ tool, col, row }) =>
              tool.featured ? (
                <FeaturedToolCard
                  key={`tablet-${tool.id}`}
                  tool={tool}
                  col={col}
                  row={row}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                  isMobileOrTablet
                />
              ) : (
                <SmallToolCell
                  key={`tablet-${tool.id}`}
                  tool={tool}
                  col={col}
                  row={row}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                  isMobileOrTablet
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* ── 3. Mobile grid (< 768px: 8 columns, static centered matrix with fade, no side scrolling) ──── */}
      <div
        className="block md:hidden w-full overflow-hidden py-2"
        style={GRID_MASK_STYLE}
      >
        <div className="flex justify-center w-full mx-auto">
          <div
            className="border-t border-l border-gray-200/60 shrink-0 select-none"
            style={{
              display: 'grid',
              width: '640px',
              gridTemplateColumns: `repeat(${EIGHT_COLS}, 80px)`,
              gridTemplateRows: `repeat(${EIGHT_TOTAL_ROWS}, ${MOBILE_ROW_HEIGHT}px)`,
            }}
          >
            {/* Top ghost row */}
            {Array.from({ length: EIGHT_COLS }).map((_, i) => (
              <div
                key={`mobile-empty-top-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{ gridColumn: i + 1, gridRow: 1 }}
              />
            ))}

            {/* Bottom ghost row */}
            {Array.from({ length: EIGHT_COLS }).map((_, i) => (
              <div
                key={`mobile-empty-bottom-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{ gridColumn: i + 1, gridRow: EIGHT_TOTAL_ROWS }}
              />
            ))}

            {eightColPlacements.map(({ tool, col, row }) =>
              tool.featured ? (
                <FeaturedToolCard
                  key={`mobile-${tool.id}`}
                  tool={tool}
                  col={col}
                  row={row}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                  isMobileOrTablet
                />
              ) : (
                <SmallToolCell
                  key={`mobile-${tool.id}`}
                  tool={tool}
                  col={col}
                  row={row}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                  isMobileOrTablet
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* ── Call to action below grid ──── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex justify-center mt-10 md:mt-14 px-4"
      >
        <button
          type="button"
          onClick={() => openEarlyAccess('tools')}
          className="
            group inline-flex items-center gap-2
            px-7 py-3.5 sm:px-8 sm:py-4
            bg-neutral-900 text-white text-sm sm:text-[15px] font-bold
            rounded-full
            hover:bg-neutral-800
            active:scale-[0.97]
            transition-all duration-200
            shadow-md hover:shadow-lg
            cursor-pointer
          "
        >
          Explorar ferramentas integradas
          <ArrowRight
            size={16}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      </motion.div>
    </section>
  )
}
