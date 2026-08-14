// ─── Types ────────────────────────────────────────────────────────────────────

export interface PlatformMetric {
  /** Stable identifier for keying and future backend mapping */
  id: string
  /** Short label displayed as an uppercase eyebrow above the number */
  label: string
  /** Numeric portion used for the count-up animation */
  numericValue: number
  /** Optional starting value for the animation (defaults to 0) */
  startFrom?: number
  /** Number of decimal places to show during animation (default 0) */
  decimals?: number
  /** Prefix rendered before the animated number (e.g. "R$ ") */
  prefix: string
  /** Suffix appended after the animated number (e.g. "+") */
  suffix: string
  /** Final display value — the exact formatted string shown at animation end */
  displayValue: string
  /** Contextual description rendered below the number */
  description: string
  /** Custom duration in ms for this metric's count-up animation */
  duration?: number
}

// ─── Demonstrative Data ───────────────────────────────────────────────────────

export const DEMO_METRICS: PlatformMetric[] = [
  {
    id: 'countries-active',
    label: 'Países ativos',
    numericValue: 150,
    startFrom: 0,
    decimals: 0,
    prefix: '',
    suffix: '+',
    displayValue: '150+',
    duration: 6800,
    description:
      'Criadores, empresas e projetos construindo em escala global em qualquer lugar do mundo.',
  },
  {
    id: 'hours-saved',
    label: 'Horas economizadas',
    numericValue: 85_000,
    startFrom: 0,
    decimals: 0,
    prefix: '',
    suffix: '+',
    displayValue: '85.000+',
    duration: 7200,
    description:
      'Tempo poupado com criação no-code, inteligência artificial e automações integradas.',
  },
  {
    id: 'uptime-global',
    label: 'Disponibilidade global',
    numericValue: 99.9,
    startFrom: 80.0,
    decimals: 1,
    prefix: '',
    suffix: '%',
    displayValue: '99,9%',
    duration: 7200,
    description:
      'Infraestrutura distribuída de alta performance com estabilidade e escala contínua.',
  },
  {
    id: 'money-saved',
    label: 'Dinheiro economizado',
    numericValue: 2_400_000,
    startFrom: 50_000,
    decimals: 0,
    prefix: 'R$ ',
    suffix: '+',
    displayValue: 'R$ 2.400.000+',
    duration: 7500,
    description:
      'Economia gerada ao reunir criação, inteligência artificial, automações e publicação em uma única plataforma.',
  },
]
