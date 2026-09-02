import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { GoogleBlogIndexPage } from '@/pages/GoogleBlogIndexPage'

describe('GoogleBlogIndexPage - conteúdo editorial Makeploy', () => {
  it('renderiza as 5 seções na ordem exata solicitada', () => {
    render(
      <MemoryRouter initialEntries={['/blog']}>
        <GoogleBlogIndexPage />
      </MemoryRouter>
    )

    // 0. Navbar
    expect(screen.getByText('Ideias & Pesquisa')).toBeInTheDocument()

    // 1. Seção 1: Hero Spotlight com padrão Makeploy
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Crie e valide produtos digitais/i,
      })
    ).toBeInTheDocument()
    expect(screen.getAllByText('Inteligência Artificial').length).toBeGreaterThan(0)

    // 2. Seção 2: validação na prática
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Validação na prática/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByText(/Como descobrir se existe demanda/i)).toBeInTheDocument()

    // 3. Seção 3: Grade de 4 Cards Verticais
    expect(
      screen.getByText(/O que agentes de IA conseguem validar/i)
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Leia o post/i }).length).toBe(4)

    // 4. Seção 4: Pesquisa (Card Horizontal Amplo)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Pesquisa em destaque/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Por que boas ideias falham quando chegam ao mercado/i)
    ).toBeInTheDocument()

    // 5. Seção 5: Todas as notícias (Filtros Laterais em Pílulas)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Continue explorando/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByText(/Filtre os conteúdos por tema/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Todos' })).toBeInTheDocument()
  })
})
