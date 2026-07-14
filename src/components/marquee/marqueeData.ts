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
      { color: '#8B7BFF', text: 'Crie sem medo de errar' },
      { color: '#FFB13B', text: 'Valide com inteligência' },
      { color: '#FF5733', text: 'Realize com clareza' },
      { color: '#C7F056', text: 'Pare de construir no escuro' },
    ],
  },
  {
    arrow: 'left',
    direction: 'right',
    duration: 45,
    chevrons: [
      { color: '#C7F056', text: 'Mentor ao seu lado' },
      { color: '#FF5733', text: 'Da ideia à execução' },
      { color: '#8B7BFF', text: 'Decida com dados' },
      { color: '#FFB13B', text: 'Comece grátis hoje' },
    ],
  },
]
