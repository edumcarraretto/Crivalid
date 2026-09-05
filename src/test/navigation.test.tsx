import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '@/App'

afterEach(() => window.history.replaceState({}, '', '/'))

describe('route regressions', () => {
  it.each(['/sobre', '/contato', '/privacidade', '/termos', '/cookies', '/blog', '/blog/agentes-ia-validacao-produtos', '/blog/sinais-solucao-sem-problema', '/blog/mercado-grande-oportunidade', '/blog/escolher-primeiro-experimento-mvp'])('renders the main content at %s', async (route) => {
    window.history.replaceState({}, '', route)
    render(<App />)
    await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument())
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('opens early access from an institutional page', async () => {
    window.history.replaceState({}, '', '/sobre')
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    fireEvent.click(screen.getAllByRole('link', { name: 'Começar projeto' })[0])
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('navigates from an institutional page to a deferred home section', async () => {
    window.history.replaceState({}, '', '/sobre')
    const scroll = vi.mocked(HTMLElement.prototype.scrollIntoView)
    scroll.mockClear()
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    fireEvent.click(screen.getAllByRole('link', { name: 'Dúvidas' })[0])
    await waitFor(() => expect(document.getElementById('duvidas')).toBeInTheDocument(), { timeout: 4000 })
    await waitFor(() => expect(scroll).toHaveBeenCalled())
    expect(window.location.pathname + window.location.hash).toBe('/#duvidas')
    expect(document.getElementById('duvidas')).toBeInTheDocument()
  })
})
