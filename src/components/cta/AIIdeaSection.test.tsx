import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { AIIdeaSection } from '@/components/cta/AIIdeaSection'

describe('AIIdeaSection', () => {
  it('mantém a ideia e apresenta uma confirmação honesta ao enviar', async () => {
    const user = userEvent.setup()
    render(<AIIdeaSection />)

    const input = screen.getByRole('textbox', { name: /descreva sua ideia/i })
    await user.type(input, 'Criar um SaaS de atendimento')
    await user.click(screen.getByRole('button', { name: /começar projeto/i }))

    expect(input).toHaveValue('Criar um SaaS de atendimento')
    expect(screen.getByText(/sua ideia está pronta/i)).toBeInTheDocument()
  })

  it('preenche o campo a partir de uma sugestão', () => {
    render(<AIIdeaSection />)
    fireEvent.click(screen.getByRole('button', { name: 'Criar um SaaS' }))
    expect(screen.getByRole('textbox')).toHaveValue('Criar um SaaS')
  })
})
