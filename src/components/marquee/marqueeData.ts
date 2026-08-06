// ─── Types ───────────────────────────────────────────────────────────────────

type Arrow = 'left' | 'right'
type Direction = 'left' | 'right'

export interface Chevron {
  color: string
  text: string
}

export interface Stripe {
  arrow: Arrow
  direction: Direction
  duration: number
  chevrons: Chevron[]
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const stripes: Stripe[] = [
  {
    arrow: 'right',
    direction: 'left',
    duration: 35,
    chevrons: [
      { color: 'var(--color-brand-blue)', text: 'Crie sem medo de errar' },
      { color: 'var(--color-brand-yellow)', text: 'Valide com inteligência' },
      { color: 'var(--color-brand-coral)', text: 'Realize com clareza' },
      { color: 'var(--color-brand-green)', text: 'Pare de construir no escuro' },
    ],
  },
  {
    arrow: 'left',
    direction: 'right',
    duration: 45,
    chevrons: [
      { color: 'var(--color-brand-green)', text: 'Mentor ao seu lado' },
      { color: 'var(--color-brand-coral)', text: 'Da ideia à execução' },
      { color: 'var(--color-brand-blue)', text: 'Decida com dados' },
      { color: 'var(--color-brand-yellow)', text: 'Comece grátis hoje' },
    ],
  },
]
