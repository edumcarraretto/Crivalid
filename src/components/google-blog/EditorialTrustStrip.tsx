import { MarqueeStripes } from '@/components/marquee/MarqueeStripes'
import type { Stripe } from '@/components/marquee/marqueeData'

const editorialStripes: Stripe[] = [
  {
    arrow: 'right',
    direction: 'left',
    duration: 35,
    chevrons: [
      { color: 'var(--color-brand-blue)', text: 'Evidências, não promessas' },
      { color: 'var(--color-brand-yellow)', text: 'Fontes verificáveis' },
      { color: 'var(--color-brand-coral)', text: 'Conteúdo atualizado' },
      { color: 'var(--color-brand-green)', text: 'Decisões reais' },
    ],
  },
  {
    arrow: 'left',
    direction: 'right',
    duration: 45,
    chevrons: [
      { color: 'var(--color-brand-green)', text: 'Decisões reais' },
      { color: 'var(--color-brand-coral)', text: 'Conteúdo atualizado' },
      { color: 'var(--color-brand-blue)', text: 'Fontes verificáveis' },
      { color: 'var(--color-brand-yellow)', text: 'Evidências, não promessas' },
    ],
  },
]

export function EditorialTrustStrip() {
  return (
    <div className="border-y border-neutral-800 bg-black">
      <MarqueeStripes data={editorialStripes} />
    </div>
  )
}


