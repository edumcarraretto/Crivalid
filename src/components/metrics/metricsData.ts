// ─── Types ────────────────────────────────────────────────────────────────────

export interface PlatformMetric {
  /** Stable identifier for keying */
  id: string
  /** Short label displayed as an uppercase eyebrow above the number */
  label: string
  /** Numeric portion used for the count-up animation */
  numericValue: number
  /** Optional starting value for the animation (defaults to 0) */
  startFrom?: number
  /** Number of decimal places to show during animation (default 0) */
  decimals?: number
  /** Prefix rendered before the animated number */
  prefix: string
  /** Suffix appended after the animated number */
  suffix: string
  /** Final display value — the exact formatted string shown at animation end */
  displayValue: string
  /** Contextual description rendered below the number */
  description: string
}

// ─── Demonstrative Data ───────────────────────────────────────────────────────
//
// ⚠ DEMONSTRATIVE VALUES — These are placeholder metrics for visual purposes
// only. Replace with real data once the Supabase integration is in place.
// The component accepts this array as a prop, making backend binding trivial.

export const PROJECT_LIFECYCLE_STAGES: PlatformMetric[] = [
  {
    id: 'understand',
    label: 'Compreender',
    numericValue: 1,
    decimals: 0,
    prefix: '',
    suffix: '',
    displayValue: '01',
    description:
      'Transforme contexto, público e mercado em direção.',
  },
  {
    id: 'build',
    label: 'Construir',
    numericValue: 2,
    decimals: 0,
    prefix: '',
    suffix: '',
    displayValue: '02',
    description:
      'Passe da interface ao código sem separar decisão e execução.',
  },
  {
    id: 'operate',
    label: 'Operar',
    numericValue: 3,
    decimals: 0,
    prefix: '',
    suffix: '',
    displayValue: '03',
    description:
      'Conecte pessoas, serviços e automações depois do lançamento.',
  },
  {
    id: 'evolve',
    label: 'Evoluir',
    numericValue: 4,
    startFrom: 0,
    decimals: 0,
    prefix: '',
    suffix: '',
    displayValue: '04',
    description:
      'Use histórico e dados para construir a próxima versão.',
  },
]
