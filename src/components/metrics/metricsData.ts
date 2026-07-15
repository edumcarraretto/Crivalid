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
}

// ─── Demonstrative Data ───────────────────────────────────────────────────────
//
// ⚠ DEMONSTRATIVE VALUES — These are placeholder metrics for visual purposes
// only. Replace with real data once the Supabase integration is in place.
// The component accepts this array as a prop, making backend binding trivial.

export const DEMO_METRICS: PlatformMetric[] = [
  {
    id: 'projects-created',
    label: 'Projetos criados',
    numericValue: 120_000,
    decimals: 0,
    prefix: '',
    suffix: '+',
    displayValue: '120.000+',
    description:
      'Páginas, sites, cursos, SaaS e produtos digitais iniciados dentro da plataforma.',
  },
  {
    id: 'hours-saved',
    label: 'Horas economizadas',
    numericValue: 85_000,
    decimals: 0,
    prefix: '',
    suffix: '+',
    displayValue: '85.000+',
    description:
      'Tempo poupado com criação no-code, inteligência artificial e automações integradas.',
  },
  {
    id: 'published-creations',
    label: 'Criações publicadas',
    numericValue: 28_500,
    decimals: 0,
    prefix: '',
    suffix: '+',
    displayValue: '28.500+',
    description:
      'Projetos que avançaram da primeira ideia até uma experiência publicada e acessível.',
  },
  {
    id: 'money-saved',
    label: 'Dinheiro economizado',
    numericValue: 2_400_000,
    startFrom: 100_000,
    decimals: 0,
    prefix: 'R$ ',
    suffix: '+',
    displayValue: 'R$ 2.400.000+',
    description:
      'Economia gerada ao reunir criação, inteligência artificial, automações e publicação em uma única plataforma, reduzindo custos operacionais e acelerando entregas.',
  },
]
