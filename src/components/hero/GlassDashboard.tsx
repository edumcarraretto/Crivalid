import { useState, useEffect } from 'react'
import {
  Search,
  Star,
  LayoutGrid,
  Bell,
  Plus,
  Wifi,
  Monitor,
  Send,
  Image as ImageIcon,
  Globe,
  Home,
} from 'lucide-react'
import { IdeaAnalysisView } from './IdeaAnalysisView'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Tab {
  label: string
  count: number
}

type CardIconType = 'photos' | 'browser' | 'folder'

interface CardData {
  id: string
  type: 'image' | 'text' | 'brand' | 'color' | 'icon'
  title: string
  iconType: CardIconType
  time: string
  size?: string
  color?: string
}

// ─── Data (arrays para futura integração com API) ─────────────────────────────

const TABS: Tab[] = [
  { label: 'História', count: 24 },
  { label: 'Instruções', count: 24 },
  { label: 'Cores', count: 24 },
  { label: 'Ativos', count: 24 },
  { label: 'Inspirações', count: 24 },
]

const CARDS: CardData[] = [
  {
    id: 'card-image',
    type: 'image',
    title: 'Retrato profissional',
    iconType: 'photos',
    time: '5 minutos atrás',
    size: '3,5 MB',
  },
  {
    id: 'card-text',
    type: 'text',
    title: 'Minneapolis 55410,\n2941 Rocket Drive\nEstados Unidos',
    iconType: 'photos',
    time: '19 minutos atrás',
  },
  {
    id: 'card-brand',
    type: 'brand',
    title: 'Macfolio',
    iconType: 'browser',
    time: '23 minutos atrás',
  },
  {
    id: 'card-color',
    type: 'color',
    title: '#0080FF',
    iconType: 'folder',
    time: '35 minutos atrás',
    color: '#0080FF',
  },
  {
    id: 'card-icon',
    type: 'icon',
    title: 'Ícone de envio',
    iconType: 'browser',
    time: '37 minutos atrás',
    size: '412 bytes',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function CardFooterIcon({ type }: { type: CardIconType }) {
  if (type === 'browser') {
    return (
      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white">
        <Globe size={13} className="text-red-500" />
      </div>
    )
  }
  if (type === 'folder') {
    return (
      <div className="h-5 w-5 rounded-md bg-gradient-to-br from-sky-300 to-blue-600" />
    )
  }
  return (
    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white">
      <ImageIcon size={13} className="text-pink-500" />
    </div>
  )
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.02-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.81-1.31.04-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

// ─── Card Content Renderers ───────────────────────────────────────────────────

function ImageCard({ alt }: { alt: string }) {
  return (
    <div
      className="h-full w-full bg-gradient-to-br from-teal-400 via-emerald-500 to-green-700"
      role="img"
      aria-label={alt}
    >
      {/* Simulated portrait highlight */}
      <div className="absolute inset-0 flex items-end justify-center">
        <div className="w-16 h-20 rounded-t-full bg-gradient-to-t from-emerald-800/40 to-transparent" />
      </div>
    </div>
  )
}

function TextCard({ title }: { title: string }) {
  return (
    <div className="flex h-full items-center bg-gradient-to-br from-zinc-700 to-zinc-950 px-3">
      <h3 className="whitespace-pre-line text-[10px] font-bold leading-tight text-white">
        {title}
      </h3>
    </div>
  )
}

function BrandCard({ title }: { title: string }) {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-white via-zinc-100 to-zinc-400">
      <div className="text-center">
        <div className="mx-auto mb-1 grid h-4 w-4 grid-cols-2 overflow-hidden rounded-[2px]">
          <span className="bg-red-500" />
          <span className="bg-yellow-400" />
          <span className="bg-green-500" />
          <span className="bg-blue-500" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-black leading-none">
          {title}
        </h3>
        <p className="text-[8px] text-black/40 mt-0.5">macfolio.com</p>
      </div>
    </div>
  )
}

function ColorCard({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex h-full items-center px-3" style={{ backgroundColor: color }}>
      <h3 className="text-sm font-bold text-white">{title}</h3>
    </div>
  )
}

function IconCard() {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-white to-zinc-200">
      <Send size={34} className="text-black" />
    </div>
  )
}

// ─── Real Time Clock ──────────────────────────────────────────────────────────

function RealTimeClock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(time)

  return <span className="text-sm font-semibold">{formattedTime}</span>
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function GlassDashboard() {
  const [activeTab, setActiveTab] = useState(TABS[0].label)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

  const isLightBackground = !selectedCardId || CARDS.find((c) => c.id === selectedCardId)?.type === 'brand'
  const textColorClass = isLightBackground ? 'text-black' : 'text-white'

  return (
    <div className="relative w-full flex justify-center px-2 sm:px-4">

      {/* Glass Panel — single large panel with its own blue tint */}
      <div
        className="relative flex flex-col w-full overflow-hidden transition-all duration-700 ease-in-out"
        style={{
          maxWidth: '1400px',
          minHeight: selectedCardId ? '800px' : 'auto',
          borderRadius: 'clamp(28px, 3.5vw, 40px)',
          backdropFilter: 'blur(48px) saturate(150%)',
          WebkitBackdropFilter: 'blur(48px) saturate(150%)',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* ── Glass Reflection Overlay ── */}
        <div 
          className="absolute inset-0 z-50 pointer-events-none"
          style={{
            borderRadius: 'inherit',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.6), inset 0 0 30px rgba(255,255,255,0.15)',
          }}
        />

        {/* ── Background Layer ── */}
        <div className="absolute inset-0 z-0 transition-colors duration-500 overflow-hidden pointer-events-none">
          {!selectedCardId ? (
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(164, 218, 255, 0.28)' }} />
          ) : (
            <div className="absolute inset-0 animate-in fade-in duration-500 pointer-events-auto">
              {(() => {
                const card = CARDS.find((c) => c.id === selectedCardId)
                if (!card) return null

                return (
                  <>
                    {card.type === 'image' && (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600">
                        <div className="absolute bottom-[-20%] left-1/2 h-64 w-96 -translate-x-1/2 rounded-[100%] bg-white/20 blur-3xl pointer-events-none" />
                        <div className="absolute bottom-12 w-full flex justify-center z-10">
                          <div className="inline-flex items-center text-white text-sm font-medium drop-shadow-md bg-black/20 px-5 py-2.5 rounded-full backdrop-blur-md">
                            {card.title} • {card.size}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {card.type === 'text' && (
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center pt-[300px] p-12">
                        <p className="text-4xl sm:text-5xl leading-relaxed text-white/90 font-medium text-center whitespace-pre-wrap max-w-4xl drop-shadow-lg">
                          {card.title}
                        </p>
                      </div>
                    )}
                    
                    {card.type === 'brand' && (
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-zinc-100 to-zinc-300 flex flex-col items-center justify-center pt-[300px] gap-10">
                        <div className="flex h-48 w-48 items-center justify-center rounded-[40px] bg-white shadow-2xl">
                          <div className="grid h-20 w-20 grid-cols-2 overflow-hidden rounded-xl shadow-inner">
                            <span className="bg-red-500" />
                            <span className="bg-yellow-400" />
                            <span className="bg-green-500" />
                            <span className="bg-blue-500" />
                          </div>
                        </div>
                        <div className="text-center">
                          <h2 className="font-serif text-6xl font-bold tracking-tight text-black drop-shadow-sm">{card.title}</h2>
                          <p className="text-black/50 mt-4 text-xl">macfolio.com</p>
                        </div>
                      </div>
                    )}
                    
                    {card.type === 'color' && (
                      <div 
                        className="absolute inset-0 flex flex-col items-center justify-center pt-[300px] p-12"
                        style={{ backgroundColor: card.color }}
                      >
                        <div className="flex items-center gap-6 w-full max-w-2xl bg-black/20 p-4 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
                          <code className="flex-1 px-6 py-4 text-white font-mono text-4xl sm:text-5xl text-center tracking-widest">
                            {card.color}
                          </code>
                          <button className="px-10 py-5 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition shadow-lg whitespace-nowrap text-xl">
                            Copiar
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {card.type === 'icon' && (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center pt-[300px] gap-12">
                        <Send size={180} strokeWidth={1} className="text-white drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]" />
                        <span className="text-2xl text-white/90 font-medium tracking-wide drop-shadow-md">{card.title}</span>
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          )}
        </div>

        {/* ── Top Section (Header & Cards) ── */}
        <div className="flex w-full relative z-10">
          {/* ── Left Panel — Logo ── */}
          <div className="hidden lg:flex flex-col w-[180px] shrink-0 px-7 pt-6">
            <div className={`flex items-center gap-2.5 transition-colors duration-500 ${textColorClass}`}>
              <AppleLogo />
              <span className="text-sm font-bold tracking-wide">Supasto</span>
            </div>
          </div>

          {/* ── Center — Black Container Wrapper ── */}
          <div className="relative flex-1 min-w-0 flex flex-col items-center">
            
            {/* ── Black Container ── */}
            <main
              className="w-full relative overflow-hidden bg-black"
              style={{ 
                borderRadius: 'clamp(20px, 2.5vw, 28px)'
              }}
            >
              {/* Subtle gradient sheen */}
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  borderRadius: 'inherit',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%)',
                }}
              />

              <div className="relative z-10 px-5 py-5 sm:px-6 sm:py-5">
                {/* Row 1 — Search + Action Buttons */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-9 w-full max-w-[340px] items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 text-white/50">
                    <Search size={16} />
                    <span className="text-sm font-medium select-none">Procurar...</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedCardId(null)}
                      aria-label="Voltar ao início"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.15] text-white/80 backdrop-blur-md transition hover:bg-white/25"
                    >
                      <Home size={15} />
                    </button>
                    {[
                      { icon: <Star size={16} />, label: 'Favoritos' },
                      { icon: <LayoutGrid size={15} />, label: 'Grade' },
                      { icon: <Bell size={15} />, label: 'Notificações' },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        aria-label={btn.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.15] text-white/80 backdrop-blur-md transition hover:bg-white/25"
                      >
                        {btn.icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 2 — Tab Pills */}
                <nav
                  className="mt-6 flex items-center gap-2.5 overflow-x-auto no-scrollbar"
                  aria-label="Categorias"
                >
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab.label
                    return (
                      <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.label)}
                        className={[
                          'flex h-9 items-center gap-2 rounded-full px-4 text-xs font-medium transition-all duration-200 whitespace-nowrap',
                          isActive
                            ? 'bg-white text-black shadow-lg'
                            : 'bg-white/[0.08] text-white/75 backdrop-blur-md hover:bg-white/[0.15]',
                        ].join(' ')}
                      >
                        <span>{tab.label}</span>
                        <span
                          className={[
                            'rounded-full px-1.5 py-0.5 text-[11px]',
                            isActive
                              ? 'bg-black/10 text-black/70'
                              : 'bg-black/20 text-white/40',
                          ].join(' ')}
                        >
                          {tab.count}
                        </span>
                      </button>
                    )
                  })}
                  <button
                    aria-label="Adicionar categoria"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/80 backdrop-blur-md transition hover:bg-white/[0.15]"
                  >
                    <Plus size={18} />
                  </button>
                </nav>

                {/* Row 3 — Cards */}
                <div className="mt-6 flex gap-3 overflow-x-auto no-scrollbar pb-1">
                  {CARDS.map((card) => {
                    const isSelected = selectedCardId === card.id
                    return (
                      <article
                        key={card.id}
                        onClick={() => setSelectedCardId(card.id)}
                        className={[
                          'relative h-[160px] min-w-[200px] flex-shrink-0 overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer',
                          isSelected
                            ? 'border-white/40 bg-zinc-800 shadow-[0_0_0_1px_rgba(255,255,255,0.2)]'
                            : 'border-white/10 bg-zinc-900 shadow-lg hover:border-white/30',
                        ].join(' ')}
                      >
                        {card.type === 'image' && <ImageCard alt={card.title} />}
                        {card.type === 'text' && <TextCard title={card.title} />}
                        {card.type === 'brand' && <BrandCard title={card.title} />}
                        {card.type === 'color' && (
                          <ColorCard title={card.title} color={card.color ?? '#0080FF'} />
                        )}
                        {card.type === 'icon' && <IconCard />}

                        {/* Footer */}
                        <footer className="absolute bottom-0 left-0 right-0 flex h-8 items-center justify-between bg-black/30 px-3 text-[10px] text-white backdrop-blur-md">
                          <div className="flex items-center gap-2">
                            <CardFooterIcon type={card.iconType} />
                            <span>{card.time}</span>
                          </div>
                          {card.size && <span>{card.size}</span>}
                        </footer>
                      </article>
                    )
                  })}
                </div>
              </div>
            </main>
          </div>

          {/* ── Right Panel — Status ── */}
          <div className={`hidden lg:flex items-start justify-center w-[180px] shrink-0 gap-3 pt-6 transition-colors duration-500 ${textColorClass}`}>
            <Search size={15} />
            <Wifi size={17} />
            <Monitor size={17} />
            <RealTimeClock />
          </div>
        </div>

        {/* ── Content Area — directly inside the glass panel ── */}
        {!selectedCardId && (
          <div className="relative w-full flex-1 flex flex-col z-10 px-6 sm:px-10 lg:px-16 pt-8 pb-10">
            <IdeaAnalysisView />
          </div>
        )}

        {/* Spacer when a card IS selected (content area already filled by background) */}
        {selectedCardId && <div className="w-full flex-1" />}
      </div>
    </div>
  )
}
