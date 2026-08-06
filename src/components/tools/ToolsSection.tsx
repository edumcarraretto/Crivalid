import { useState } from 'react'
import { motion } from 'motion/react'
import { HighlightText } from '../text/HighlightText'
import { tools, type Tool } from './toolsData'
import { ProjectsMockup, DocumentsMockup, AIMockup, ChatMockup } from './FeaturedMockups'

// ────────────────────────────────────────────────────────────
// Grid constants
// ────────────────────────────────────────────────────────────
const COLS = 10
const TOTAL_ROWS = 8
const GRID_ROW_HEIGHT = 96

// ────────────────────────────────────────────────────────────
// Grid placement algorithm
// Fills small tools into free cells (row-major), respecting
// cells already occupied by featured cards.
// ────────────────────────────────────────────────────────────
type Placement = { tool: Tool; col: number; row: number }

function buildGridPlacements(allTools: Tool[]): Placement[] {
  // 1. Mark all cells occupied by featured cards (shifted by 1)
  const occupied = new Set<string>()
  const featured = allTools.filter((t) => t.featured)

  for (const ft of featured) {
    for (let r = ft.rowStart! + 1; r < ft.rowStart! + 1 + ft.rowSpan; r++) {
      for (let c = ft.colStart!; c < ft.colStart! + ft.colSpan; c++) {
        occupied.add(`${r}-${c}`)
      }
    }
  }

  // 2. Collect placements for featured cards (shifted by 1)
  const placements: Placement[] = featured.map((ft) => ({
    tool: ft,
    col: ft.colStart!,
    row: ft.rowStart! + 1,
  }))

  // 3. Place small tools into free cells (row-major) starting from row 2
  const small = allTools.filter((t) => !t.featured)
  let idx = 0

  for (let r = 2; r <= TOTAL_ROWS - 1 && idx < small.length; r++) {
    for (let c = 1; c <= COLS && idx < small.length; c++) {
      if (occupied.has(`${r}-${c}`)) continue
      placements.push({ tool: small[idx], col: c, row: r })
      idx++
    }
  }

  return placements
}

const placements = buildGridPlacements(tools)

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
// Small tool cell
// ────────────────────────────────────────────────────────────
interface SmallToolCellProps {
  tool: Tool
  col: number
  row: number
  isSelected: boolean
  onSelect: (id: string) => void
}

function SmallToolCell({ tool, col, row, isSelected, onSelect }: SmallToolCellProps) {
  const Icon = tool.icon
  const isAvailable = tool.status === 'available'
  const isComingSoon = tool.status === 'coming_soon'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: Math.random() * 0.25 }}
      style={{
        gridColumn: `${col} / span 1`,
        gridRow: `${row} / span 1`,
      }}
      className="relative group"
      title={isComingSoon ? 'Em breve' : tool.title}
      onClick={() => isAvailable && onSelect(tool.id)}
    >
      <div
        className={[
          'flex flex-col items-center justify-center gap-1.5 h-full w-full select-none',
          'border-r border-b border-gray-200/60',
          'transition-all duration-200 ease-out',
          isAvailable ? 'cursor-pointer' : 'cursor-default',
          !isAvailable ? 'opacity-45' : '',
          // ── Selected state ──
          isSelected
            ? 'scale-[1.04] -translate-y-1.5 shadow-2xl z-20 ring-2 ring-gray-900/10 bg-white rounded-lg'
            : 'scale-100 translate-y-0 z-0',
          // ── Hover (only when NOT selected) ──
          isAvailable && !isSelected ? 'hover:bg-gray-50 hover:scale-[1.02] hover:z-10 hover:ring-1 hover:ring-black/50' : '',
        ].join(' ')}
      >
        <Icon
          className={[
            'w-5 h-5 transition-colors duration-200',
            isSelected ? 'text-gray-700' : 'text-gray-400',
            isAvailable && !isSelected ? 'group-hover:text-gray-600' : '',
          ].join(' ')}
          strokeWidth={1.5}
        />
        <span
          className={[
            'text-[10px] leading-tight text-center px-1 max-w-full transition-colors duration-200',
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
    </motion.div>
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
}

function FeaturedToolCard({ tool, col, row, isSelected, onSelect }: FeaturedToolCardProps) {
  const Icon = tool.icon
  const mockup = featuredMockups[tool.id]

  return (
    <motion.div
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
          tool.bgColor ?? 'bg-white',
          'transition-all duration-200 ease-out',
          // ── Selected state ──
          isSelected
            ? 'scale-[1.03] -translate-y-1.5 shadow-2xl z-20 ring-2 ring-gray-900/10 rounded-lg'
            : 'scale-100 translate-y-0 z-0',
          // ── Hover (only when NOT selected) ──
          !isSelected ? 'hover:scale-[1.01] hover:shadow-md hover:z-10 hover:ring-1 hover:ring-black/50' : '',
        ].join(' ')}
      >
        {/* Mockup preview area */}
        <div className="flex-1 min-h-0 overflow-hidden m-2 mb-0 rounded-sm bg-white/70 border border-gray-100/80">
          {mockup}
        </div>

        {/* Card label */}
        <div className="flex items-center gap-2 px-3 py-2.5 shrink-0">
          <Icon
            className={`w-4 h-4 ${tool.accentColor ?? 'text-gray-500'}`}
            strokeWidth={2}
          />
          <span className="text-xs md:text-sm font-bold text-gray-800 tracking-tight">
            {tool.title}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ────────────────────────────────────────────────────────────
// Mobile tool grid — simplified 3-col list
// ────────────────────────────────────────────────────────────
function MobileToolsGrid({ selectedToolId, onSelect }: { selectedToolId: string | null; onSelect: (id: string) => void }) {
  const featured = tools.filter((t) => t.featured)
  const small = tools.filter((t) => !t.featured)

  return (
    <div className="md:hidden w-full">
      {/* Featured cards — 2-column grid, full-width cards */}
      <div className="grid grid-cols-2 gap-3 mb-4 px-4">
        {featured.map((tool) => {
          const Icon = tool.icon
          const mockup = featuredMockups[tool.id]
          const isSelected = selectedToolId === tool.id
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={[
                'rounded-xl border overflow-hidden cursor-pointer',
                'transition-all duration-300 ease-out',
                tool.bgColor ?? 'bg-white',
                isSelected
                  ? 'scale-[1.03] -translate-y-1 shadow-2xl z-20 ring-2 ring-gray-900/10 border-transparent'
                  : 'scale-100 translate-y-0 z-0 border-gray-200/80',
              ].join(' ')}
              onClick={() => onSelect(tool.id)}
            >
              {/* Mini mockup */}
              <div className="h-24 overflow-hidden m-1.5 mb-0 rounded-sm bg-white/80 border border-gray-100">
                {mockup}
              </div>
              {/* Label */}
              <div className="flex items-center gap-1.5 px-2.5 py-2">
                <Icon className={`w-3.5 h-3.5 ${tool.accentColor ?? 'text-gray-500'}`} strokeWidth={2} />
                <span className="text-xs font-bold text-gray-800">{tool.title}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Small tools — 3-column grid */}
      <div className="grid grid-cols-3 border-t border-l border-gray-200/60">
        {small.map((tool) => {
          const Icon = tool.icon
          const isAvailable = tool.status === 'available'
          const isSelected = selectedToolId === tool.id
          return (
            <div
              key={tool.id}
              className={[
                'flex flex-col items-center justify-center gap-1 py-5 px-2',
                'border-r border-b border-gray-200/60',
                'transition-all duration-300 ease-out',
                !isAvailable ? 'opacity-40' : 'cursor-pointer',
                isSelected
                  ? 'scale-[1.04] -translate-y-1 shadow-2xl z-20 ring-2 ring-gray-900/10 bg-white rounded-lg'
                  : 'scale-100 translate-y-0 z-0',
              ].join(' ')}
              onClick={() => isAvailable && onSelect(tool.id)}
            >
              <Icon className={`w-5 h-5 ${isSelected ? 'text-gray-700' : 'text-gray-400'} transition-colors duration-200`} strokeWidth={1.5} />
              <span className={`text-[9px] text-center leading-tight transition-colors duration-200 ${isSelected ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>{tool.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Main section export
// ────────────────────────────────────────────────────────────
export function ToolsSection() {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    // Toggle: clicking the same card again deselects it
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
          Todas as ferramentas da sua plataforma
          <br />
          em <HighlightText variant="yellow">um só lugar</HighlightText>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-md mx-auto leading-relaxed">
          Recursos integrados para organizar, criar, colaborar e transformar suas ideias.
        </p>
      </motion.div>

      {/* ── Desktop grid ────────────────────────────────────── */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-4">
        <div className="overflow-visible pb-6" style={GRID_MASK_STYLE}>
          <div
            className="border-t border-l border-gray-200/60"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${TOTAL_ROWS}, ${GRID_ROW_HEIGHT}px)`,
            }}
          >
            {/* Linha 1: células vazias para formar a borda fantasma superior */}
            {Array.from({ length: COLS }).map((_, i) => (
              <div
                key={`empty-top-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{
                  gridColumn: i + 1,
                  gridRow: 1,
                }}
              />
            ))}

            {/* Linha Final: células vazias para formar a borda fantasma inferior */}
            {Array.from({ length: COLS }).map((_, i) => (
              <div
                key={`empty-bottom-cell-${i}`}
                className="border-r border-b border-gray-100/50"
                style={{
                  gridColumn: i + 1,
                  gridRow: TOTAL_ROWS,
                }}
              />
            ))}

            {placements.map(({ tool, col, row }) =>
              tool.featured ? (
                <FeaturedToolCard
                  key={tool.id}
                  tool={tool}
                  col={col}
                  row={row}
                  isSelected={selectedToolId === tool.id}
                  onSelect={handleSelect}
                />
              ) : (
                <SmallToolCell
                  key={tool.id}
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

      {/* ── Mobile / Tablet ─────────────────────────────────── */}
      <MobileToolsGrid selectedToolId={selectedToolId} onSelect={handleSelect} />
    </section>
  )
}
