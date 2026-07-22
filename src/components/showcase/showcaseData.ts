// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShowcaseExample {
  id: string
  title: string
  category: string
  subcategory: string
  image: string
}

// ─── Category colours (Tailwind-safe) ─────────────────────────────────────────

export const categoryColors: Record<string, string> = {
  SaaS: 'bg-violet-400',
  Pagamentos: 'bg-emerald-400',
  Fintech: 'bg-amber-400',
  'E-commerce': 'bg-pink-400',
  Educação: 'bg-sky-400',
  Tecnologia: 'bg-cyan-400',
  Automação: 'bg-purple-400',
  'Experiência digital': 'bg-blue-400',
  Plataforma: 'bg-teal-400',
  'Inteligência artificial': 'bg-indigo-400',
  'Realidade virtual': 'bg-fuchsia-400',
  'Produto digital': 'bg-rose-400',
  'Área de membros': 'bg-lime-400',
  Checkout: 'bg-orange-400',
}

export const CATEGORY_COLOR_FALLBACK = 'bg-neutral-400'

// ─── Showcase Data ────────────────────────────────────────────────────────────

export const showcaseExamples: ShowcaseExample[] = [
  {
    id: 'aura-step',
    title: 'Aura Step',
    category: 'E-commerce',
    subcategory: 'Produto e moda',
    image: '/images/showcase/aura-step.png',
  },
  {
    id: 'lumen-deep',
    title: 'Lumen Deep',
    category: 'Experiência digital',
    subcategory: 'Site imersivo',
    image: '/images/showcase/lumen-deep.png',
  },
  {
    id: 'pulse-grid',
    title: 'Pulse Grid',
    category: 'SaaS',
    subcategory: 'IA e automação',
    image: '/images/showcase/pulse-grid.png',
  },
  {
    id: 'nexa-vision',
    title: 'Nexa Vision',
    category: 'Tecnologia',
    subcategory: 'Realidade virtual',
    image: '/images/showcase/nexa-vision.png',
  },
  {
    id: 'cria-checkout-gold',
    title: 'Cria Checkout',
    category: 'Fintech',
    subcategory: 'Conversão e pagamentos',
    image: '/images/showcase/cria-checkout-gold.png',
  },
  {
    id: 'cria-checkout-red',
    title: 'Cria Checkout',
    category: 'Pagamentos',
    subcategory: 'Checkout global',
    image: '/images/showcase/cria-checkout-red.png',
  },
]
