import { render } from '@testing-library/react'
import axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import { AIIdeaSection } from '@/components/cta/AIIdeaSection'
import { Navbar } from '@/components/navbar/Navbar'
import { MobileProblemImageCarousel } from '@/components/problem/MobileProblemImageCarousel'

describe('acessibilidade automatizada', () => {
  it.each([
    ['navegação', <Navbar key="navbar" />],
    ['formulário de ideia', <AIIdeaSection key="idea" />],
    ['carrossel mobile', <MobileProblemImageCarousel key="carousel" />],
  ])('não encontra violações graves em %s', async (_name, component) => {
    const { container } = render(component)
    const result = await axe.run(container, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa'],
      },
      rules: {
        'color-contrast': { enabled: false },
      },
    })
    const seriousViolations = result.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    )

    expect(seriousViolations).toEqual([])
  })
})
