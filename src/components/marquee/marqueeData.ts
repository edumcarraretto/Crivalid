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
      { color: 'var(--color-brand-blue)', text: 'Contexto antes de execução' },
      { color: 'var(--color-brand-yellow)', text: 'Visual sem barreiras' },
      { color: 'var(--color-brand-coral)', text: 'Código sem recomeços' },
      { color: 'var(--color-brand-green)', text: 'Operação depois do lançamento' },
    ],
  },
  {
    arrow: 'left',
    direction: 'right',
    duration: 45,
    chevrons: [
      { color: 'var(--color-brand-green)', text: 'Uma origem' },
      { color: 'var(--color-brand-coral)', text: 'Um projeto contínuo' },
      { color: 'var(--color-brand-blue)', text: 'Próximas versões conectadas' },
      { color: 'var(--color-brand-yellow)', text: 'MAKEPLOY' },
    ],
  },
]
