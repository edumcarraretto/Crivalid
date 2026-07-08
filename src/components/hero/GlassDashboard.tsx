import { useState } from 'react'
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
} from 'lucide-react'

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

// ─── Main Component ───────────────────────────────────────────────────────────

export function GlassDashboard() {
  const [activeTab, setActiveTab] = useState(TABS[0].label)

  return (
    <div className="relative w-full flex justify-center px-4 sm:px-6 lg:px-10">

      {/* Glass Panel — single large panel with its own blue tint */}
      <div
        className="relative flex items-stretch overflow-hidden w-full"
        style={{
          maxWidth: '1100px',
          minHeight: '220px',
          borderRadius: 'clamp(24px, 3.5vw, 34px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          backgroundColor: 'rgba(164, 218, 255, 0.25)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
      >
        {/* ── Left Panel — Logo ── */}
        <div className="hidden lg:flex flex-col w-[150px] shrink-0 px-5 pt-4">
          <div className="flex items-center gap-2 text-white">
            <AppleLogo />
            <span className="text-xs font-bold tracking-wide">Supasto</span>
          </div>
        </div>

        {/* ── Center — Black Container ── */}
        <main
          className="relative flex-1 min-w-0 overflow-hidden bg-black"
          style={{ borderRadius: 'clamp(16px, 2.5vw, 24px)' }}
        >
          {/* Subtle gradient sheen */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              borderRadius: 'inherit',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%)',
            }}
          />

          <div className="relative z-10 px-3 py-3 sm:px-4 sm:py-3.5">
            {/* Row 1 — Search + Action Buttons */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-7 w-full max-w-[300px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-white/50">
                <Search size={14} />
                <span className="text-[11px] font-medium select-none">Procurar...</span>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { icon: <Star size={14} />, label: 'Favoritos' },
                  { icon: <LayoutGrid size={13} />, label: 'Grade' },
                  { icon: <Bell size={13} />, label: 'Notificações' },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    aria-label={btn.label}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.15] text-white/80 backdrop-blur-md transition hover:bg-white/25"
                  >
                    {btn.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2 — Tab Pills */}
            <nav
              className="mt-5 sm:mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar"
              aria-label="Categorias"
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.label
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={[
                      'flex h-8 items-center gap-2 rounded-full px-3 text-[11px] font-medium transition-all duration-200 whitespace-nowrap',
                      isActive
                        ? 'bg-white text-black shadow-lg'
                        : 'bg-white/[0.08] text-white/75 backdrop-blur-md hover:bg-white/[0.15]',
                    ].join(' ')}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={[
                        'rounded-full px-1.5 py-0.5 text-[10px]',
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
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/80 backdrop-blur-md transition hover:bg-white/[0.15]"
              >
                <Plus size={17} />
              </button>
            </nav>

            {/* Row 3 — Cards */}
            <div className="mt-5 sm:mt-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {CARDS.map((card) => (
                <article
                  key={card.id}
                  className="relative h-[100px] min-w-[135px] flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-lg"
                >
                  {card.type === 'image' && <ImageCard alt={card.title} />}
                  {card.type === 'text' && <TextCard title={card.title} />}
                  {card.type === 'brand' && <BrandCard title={card.title} />}
                  {card.type === 'color' && (
                    <ColorCard title={card.title} color={card.color ?? '#0080FF'} />
                  )}
                  {card.type === 'icon' && <IconCard />}

                  {/* Footer */}
                  <footer className="absolute bottom-0 left-0 right-0 flex h-7 items-center justify-between bg-black/30 px-2 text-[9px] text-white backdrop-blur-md">
                    <div className="flex items-center gap-1.5">
                      <CardFooterIcon type={card.iconType} />
                      <span>{card.time}</span>
                    </div>
                    {card.size && <span>{card.size}</span>}
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </main>

        {/* ── Right Panel — Status ── */}
        <div className="hidden lg:flex items-start justify-center w-[150px] shrink-0 gap-3 pt-4 text-white">
          <Search size={13} />
          <Wifi size={15} />
          <Monitor size={15} />
          <span className="text-xs font-semibold">09:41</span>
        </div>
      </div>
    </div>
  )
}
