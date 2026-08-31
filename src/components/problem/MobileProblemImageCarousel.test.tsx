import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MobileProblemImageCarousel } from '@/components/problem/MobileProblemImageCarousel'

describe('MobileProblemImageCarousel', () => {
  it('expõe estado acessível e permite navegação pelos controles', () => {
    render(<MobileProblemImageCarousel />)

    const slider = screen.getByRole('slider', { name: /etapa 1 de 3/i })
    const secondStep = screen.getByRole('button', { name: /mostrar etapa 2/i })
    fireEvent.click(secondStep)

    expect(slider).toHaveAttribute('aria-valuenow', '2')
    expect(secondStep).toHaveAttribute('aria-current', 'true')
    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalled()
  })

  it('responde às setas do teclado', () => {
    render(<MobileProblemImageCarousel />)
    const slider = screen.getByRole('slider')
    const scrollSpy = vi.spyOn(HTMLElement.prototype, 'scrollTo')

    fireEvent.keyDown(slider, { key: 'ArrowRight' })

    expect(slider).toHaveAttribute('aria-valuenow', '2')
    expect(scrollSpy).toHaveBeenCalled()
  })
})
