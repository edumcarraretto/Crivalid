// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShowcaseProject {
  id: string
  title: string
  category: string
  image: string
  objectPosition?: string
}

// ─── All projects ─────────────────────────────────────────────────────────────

export const allProjects: ShowcaseProject[] = [
  {
    id: 'lumen-deep',
    title: 'Lumen Deep',
    category: 'Experiência digital',
    image: '/images/showcase/lumen-deep.webp',
  },
  {
    id: 'pulse-grid',
    title: 'Pulse Grid',
    category: 'SaaS',
    image: '/images/showcase/pulse-grid.webp',
  },
  {
    id: 'aura-step',
    title: 'Aura Step',
    category: 'E-commerce',
    image: '/images/showcase/aura-step.webp',
  },
  {
    id: 'nexa-vision',
    title: 'Nexa Vision',
    category: 'Tecnologia',
    image: '/images/showcase/nexa-vision.webp',
  },
  {
    id: 'cria-checkout-gold',
    title: 'Cria Checkout',
    category: 'Fintech',
    image: '/images/showcase/cria-checkout-gold.webp',
  },
  {
    id: 'cria-checkout-red',
    title: 'Cria Checkout',
    category: 'Pagamentos',
    image: '/images/showcase/cria-checkout-red.webp',
  },
]
