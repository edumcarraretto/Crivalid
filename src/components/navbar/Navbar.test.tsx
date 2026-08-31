import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Navbar } from '@/components/navbar/Navbar'

describe('Navbar', () => {
  it('abre e fecha o menu mobile com Escape', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const toggle = screen.getByRole('button', { name: /abrir menu/i })
    await user.click(toggle)
    expect(screen.getByRole('button', { name: /fechar menu/i })).toHaveAttribute('aria-expanded', 'true')

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.getByRole('button', { name: /abrir menu/i })).toHaveAttribute('aria-expanded', 'false')
  })
})
