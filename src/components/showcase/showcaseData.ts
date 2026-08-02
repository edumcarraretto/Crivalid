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
    image: '/images/showcase/lumen-deep.png',
  },
  {
    id: 'pulse-grid',
    title: 'Pulse Grid',
    category: 'SaaS',
    image: '/images/showcase/pulse-grid.png',
  },
  {
    id: 'aura-step',
    title: 'Aura Step',
    category: 'E-commerce',
    image: '/images/showcase/aura-step.png',
  },
  {
    id: 'nexa-vision',
    title: 'Nexa Vision',
    category: 'Tecnologia',
    image: '/images/showcase/nexa-vision.png',
  },
  {
    id: 'cria-checkout-gold',
    title: 'Cria Checkout',
    category: 'Fintech',
    image: '/images/showcase/cria-checkout-gold.png',
  },
  {
    id: 'cria-checkout-red',
    title: 'Cria Checkout',
    category: 'Pagamentos',
    image: '/images/showcase/cria-checkout-red.png',
  },
]
