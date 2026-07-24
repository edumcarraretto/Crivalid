// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShowcaseExample {
  id: string
  title: string
  category: string
  subcategory: string
  image: string
  accentColor?: string
}

// ─── Category colors & themes ──────────────────────────────────────────────────

export const categoryColors: Record<string, string> = {
  SaaS: 'bg-violet-500',
  Pagamentos: 'bg-red-500',
  Fintech: 'bg-amber-500',
  'E-commerce': 'bg-blue-500',
  Educação: 'bg-sky-500',
  Tecnologia: 'bg-fuchsia-500',
  Automação: 'bg-purple-500',
  'Experiência digital': 'bg-blue-500',
  Plataforma: 'bg-teal-500',
  'Inteligência artificial': 'bg-indigo-500',
  'Realidade virtual': 'bg-fuchsia-500',
  'Produto digital': 'bg-rose-500',
  'Área de membros': 'bg-lime-500',
  Checkout: 'bg-orange-500',
}

export const categoryTheme: Record<string, { bg: string; text: string }> = {
  SaaS: { bg: '#6d28d9', text: '#ffffff' },                   // Deep Violet
  Pagamentos: { bg: '#b91c1c', text: '#ffffff' },             // Deep Red
  Fintech: { bg: '#92400e', text: '#ffffff' },                // Deep Amber / Gold
  'E-commerce': { bg: '#1d4ed8', text: '#ffffff' },           // Deep Blue
  Educação: { bg: '#0369a1', text: '#ffffff' },               // Deep Sky
  Tecnologia: { bg: '#a21caf', text: '#ffffff' },             // Deep Fuchsia
  Automação: { bg: '#7e22ce', text: '#ffffff' },              // Deep Purple
  'Experiência digital': { bg: '#0369a1', text: '#ffffff' },   // Deep Ocean Blue
  Plataforma: { bg: '#0f766e', text: '#ffffff' },             // Deep Teal
  'Inteligência artificial': { bg: '#4338ca', text: '#ffffff' }, // Deep Indigo
  'Realidade virtual': { bg: '#a21caf', text: '#ffffff' },     // Deep Fuchsia
  'Produto digital': { bg: '#be123c', text: '#ffffff' },       // Deep Rose
  'Área de membros': { bg: '#4d7c0f', text: '#ffffff' },       // Deep Lime
  Checkout: { bg: '#c2410c', text: '#ffffff' },               // Deep Orange
}

export const CATEGORY_COLOR_FALLBACK = 'bg-neutral-500'
export const CATEGORY_THEME_FALLBACK = { bg: '#374151', text: '#ffffff' }

// ─── Showcase Data ────────────────────────────────────────────────────────────

export const showcaseExamples: ShowcaseExample[] = [
  {
    id: 'aura-step',
    title: 'Aura Step',
    category: 'E-commerce',
    subcategory: 'Produto e moda',
    image: '/images/showcase/aura-step.png',
    accentColor: '#1d4ed8',
  },
  {
    id: 'lumen-deep',
    title: 'Lumen Deep',
    category: 'Experiência digital',
    subcategory: 'Site imersivo',
    image: '/images/showcase/lumen-deep.png',
    accentColor: '#0369a1',
  },
  {
    id: 'pulse-grid',
    title: 'Pulse Grid',
    category: 'SaaS',
    subcategory: 'IA e automação',
    image: '/images/showcase/pulse-grid.png',
    accentColor: '#6d28d9',
  },
  {
    id: 'nexa-vision',
    title: 'Nexa Vision',
    category: 'Tecnologia',
    subcategory: 'Realidade virtual',
    image: '/images/showcase/nexa-vision.png',
    accentColor: '#a21caf',
  },
  {
    id: 'cria-checkout-gold',
    title: 'Cria Checkout',
    category: 'Fintech',
    subcategory: 'Conversão e pagamentos',
    image: '/images/showcase/cria-checkout-gold.png',
    accentColor: '#92400e',
  },
  {
    id: 'cria-checkout-red',
    title: 'Cria Checkout',
    category: 'Pagamentos',
    subcategory: 'Checkout global',
    image: '/images/showcase/cria-checkout-red.png',
    accentColor: '#b91c1c',
  },
]
