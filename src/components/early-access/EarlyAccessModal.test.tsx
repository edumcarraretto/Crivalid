import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import axe from 'axe-core'
import { EarlyAccessModal } from '@/components/early-access/EarlyAccessModal'
import { openEarlyAccess } from '@/lib/earlyAccess'

describe('EarlyAccessModal', () => {
  it('contains keyboard focus, closes with Escape and restores the trigger', async () => {
    const user = userEvent.setup()
    render(<><button onClick={() => openEarlyAccess('hero')}>Abrir acesso</button><EarlyAccessModal /></>)
    const trigger = screen.getByRole('button', { name: 'Abrir acesso' })
    await user.click(trigger)
    const close = screen.getByRole('button', { name: 'Fechar janela' })
    const submit = screen.getByRole('button', { name: 'Garantir minha vaga' })
    expect(close).toHaveFocus()
    fireEvent.keyDown(close, { key: 'Tab', shiftKey: true })
    expect(submit).toHaveFocus()
    fireEvent.keyDown(submit, { key: 'Tab' })
    expect(close).toHaveFocus()
    expect(trigger.inert).toBe(true)
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
    expect(trigger.inert).toBeFalsy()
    expect(document.body.style.overflow).toBe('')
  })

  it('has a named e-mail input and no serious semantic accessibility violations when open', async () => {
    const user = userEvent.setup()
    render(<><button onClick={() => openEarlyAccess('hero')}>Abrir acesso</button><EarlyAccessModal /></>)
    await user.click(screen.getByRole('button', { name: 'Abrir acesso' }))
    expect(screen.getByRole('textbox', { name: 'Seu e-mail para acesso antecipado' })).toBeRequired()
    const result = await axe.run(screen.getByRole('dialog'), { rules: { 'color-contrast': { enabled: false } } })
    expect(result.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical')).toEqual([])
  })
})
