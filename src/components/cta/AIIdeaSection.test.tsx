import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AIIdeaSection } from '@/components/cta/AIIdeaSection'

describe('AIIdeaSection', () => {
  it('mantém a ideia e aciona o fluxo de early access ao enviar', async () => {
    const user = userEvent.setup()
    const listener = vi.fn()
    window.addEventListener('makeploy:early-access', listener)

    render(<AIIdeaSection />)

    const input = screen.getByRole('textbox', { name: /descreva sua ideia/i })
    await user.type(input, 'Criar um SaaS de atendimento')
    await user.click(screen.getByRole('button', { name: /começar projeto/i }))

    expect(input).toHaveValue('Criar um SaaS de atendimento')
    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener.mock.calls[0][0].detail).toEqual({ source: 'idea' })

    window.removeEventListener('makeploy:early-access', listener)
  })

  it('preenche o campo a partir de uma sugestão', () => {
    render(<AIIdeaSection />)
    fireEvent.click(screen.getByRole('button', { name: 'Criar um SaaS' }))
    expect(screen.getByRole('textbox')).toHaveValue(
      'Quero criar uma plataforma SaaS focada em automação de tarefas. Preciso de autenticação segura, dashboard interativo com métricas em tempo real, integração de pagamentos e arquitetura escalável.'
    )
  })
})
