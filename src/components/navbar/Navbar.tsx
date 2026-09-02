import { useEffect, useState, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { openEarlyAccess } from '@/lib/earlyAccess'

interface NavItem {
  id: string
  label: string
  href: string
}

const leftNavItems: NavItem[] = [
  { id: 'ferramentas', label: 'Plataforma', href: '#ferramentas' },
  { id: 'tecnologias', label: 'Criação', href: '#tecnologias' },
  { id: 'inteligencia', label: 'Inteligência', href: '#inteligencia' },
]

const rightNavItems: NavItem[] = [
  { id: 'workflow', label: 'Automações', href: '#workflow' },
  { id: 'platform-metrics', label: 'Métricas', href: '#platform-metrics' },
  { id: 'duvidas', label: 'Dúvidas', href: '#duvidas' },
  { id: 'blog', label: 'Artigos', href: '/blog' },
]

const allNavItems = [...leftNavItems, ...rightNavItems]

export function Navbar() {
  const [activeItem, setActiveItem] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // ── Smooth scroll to section ──
  const scrollToSection = useCallback((href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const navbarHeight = 100 // offset for sticky navbar
      const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      window.scrollTo({ top, behavior })
    }
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // ── Scroll-spy: highlight active section + shrink navbar ──
  useEffect(() => {
    let frameId: number | undefined

    const handleScroll = () => {
      if (frameId !== undefined) return

      frameId = window.requestAnimationFrame(() => {
        // Navbar shrink
        setIsScrolled(window.scrollY > 30)

        // Scroll-spy: find which section is currently in view
        const navbarOffset = 120
        let currentActive = ''

        for (const item of allNavItems) {
          const el = document.getElementById(item.id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= navbarOffset && rect.bottom > navbarOffset) {
              currentActive = item.id
            }
          }
        }

        setActiveItem(currentActive)
        frameId = undefined
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId !== undefined) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 w-full bg-transparent pointer-events-none
        transition-all duration-300 ease-out
        ${isScrolled ? 'py-2 sm:py-3 px-3 sm:px-6' : 'py-3.5 sm:py-5 px-3 sm:px-8'}
      `}
    >
      <div
        className={`
          mx-auto transition-all duration-300 ease-out
          ${isScrolled ? 'max-w-7xl' : 'max-w-[1360px]'}
        `}
      >
        {/* Floating Navbar Container */}
        <nav
          className={`
            relative bg-white flex items-center justify-between
            pointer-events-auto border border-black/[0.08]
            transition-all duration-300 ease-out
            ${
              isScrolled
                ? 'rounded-2xl px-4 sm:px-6 py-2 sm:py-3 shadow-[0_8px_30px_rgba(0,0,0,0.1)]'
                : 'rounded-2xl sm:rounded-[26px] px-4 sm:px-7 py-3 sm:py-4 shadow-[0_6px_30px_rgba(0,0,0,0.07)]'
            }
          `}
          aria-label="Navegação principal"
        >
          {/* ── 1. LADO ESQUERDO: Somente o ÍCONE / Símbolo da Logo ── */}
          <div className="flex items-center select-none shrink-0 pl-1 sm:pl-2 relative z-30">
            <button
              type="button"
              className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center group cursor-pointer"
              aria-label="MAKEPLOY Home"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
              }}
            >
              <img
                src="/nova-logo-128.webp"
                alt="MAKEPLOY"
                width={36}
                height={36}
                className={`
                  object-contain shrink-0 transform transition-transform duration-300 group-hover:scale-[2.05]
                  ${isScrolled ? 'w-8.5 h-8.5 sm:w-9 sm:h-9 scale-[1.85]' : 'w-8 h-8 sm:w-8.5 sm:h-8.5 scale-[1.7]'}
                `}
              />
            </button>
          </div>

          {/* ── 2. CENTRO EXPANDIDO: 3 Links | LOGO ESCRITA | 3 Links (Desktop) ── */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-2 xl:mx-4">
            
            {/* 3 Links da Esquerda */}
            <div className="flex items-center gap-1 xl:gap-1.5">
              {leftNavItems.map((item, index) => {
                const isActive = activeItem === item.id

                return (
                  <div key={item.id} className="flex items-center gap-1 xl:gap-1.5">
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(item.href)
                      }}
                      className={`
                        font-bold tracking-tight rounded-xl
                        transition-all duration-200 ease-out cursor-pointer whitespace-nowrap
                        ${
                          isScrolled
                            ? 'px-3 py-1.5 text-xs xl:text-sm'
                            : 'px-3.5 xl:px-4 py-2 text-sm xl:text-[15px]'
                        }
                        ${
                          isActive
                            ? 'bg-blue-50 text-neutral-900 shadow-xs'
                            : 'text-neutral-700 hover:text-neutral-900 hover:bg-blue-50/60'
                        }
                      `}
                    >
                      {item.label}
                    </a>

                    {/* Divisor vertical */}
                    {index < leftNavItems.length - 1 && (
                      <span
                        className="w-px h-3.5 bg-black/[0.12] rounded-full shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* ── LOGO ESCRITA NO MEIO (ISOLADA COM RESPIRO) ── */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
              }}
              aria-label="MAKEPLOY Home"
              className="relative flex items-center justify-center mx-10 sm:mx-14 lg:mx-16 xl:mx-24 h-8 group cursor-pointer shrink-0"
            >
              <img
                src="/text-logo-128.webp"
                alt="MAKEPLOY"
                width={140}
                height={32}
                className={`
                  object-contain shrink-0 transform transition-transform duration-300 group-hover:scale-[3.35]
                  ${isScrolled ? 'h-7 sm:h-8 scale-[3.15]' : 'h-7 sm:h-7.5 scale-[2.85]'}
                `}
              />
            </button>

            {/* 3 Links da Direita */}
            <div className="flex items-center gap-1 xl:gap-1.5">
              {rightNavItems.map((item, index) => {
                const isActive = activeItem === item.id

                return (
                  <div key={item.id} className="flex items-center gap-1 xl:gap-1.5">
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith('#')) {
                          e.preventDefault()
                          scrollToSection(item.href)
                        }
                      }}
                      className={`
                        font-bold tracking-tight rounded-xl
                        transition-all duration-200 ease-out cursor-pointer whitespace-nowrap
                        ${
                          isScrolled
                            ? 'px-3 py-1.5 text-xs xl:text-sm'
                            : 'px-3.5 xl:px-4 py-2 text-sm xl:text-[15px]'
                        }
                        ${
                          isActive
                            ? 'bg-blue-50 text-neutral-900 shadow-xs'
                            : 'text-neutral-700 hover:text-neutral-900 hover:bg-blue-50/60'
                        }
                      `}
                    >
                      {item.label}
                    </a>

                    {/* Divisor vertical */}
                    {index < rightNavItems.length - 1 && (
                      <span
                        className="w-px h-3.5 bg-black/[0.12] rounded-full shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                )
              })}
            </div>

          </div>

          {/* ── 3. LADO DIREITO: Botão "Começar projeto" (Desktop) ── */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href="#comece"
              onClick={(event) => { event.preventDefault(); openEarlyAccess('navbar') }}
              className={`
                bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold
                shadow-sm hover:shadow-md active:scale-98 whitespace-nowrap
                transition-all duration-200
                ${
                  isScrolled
                    ? 'px-5 py-2 text-xs xl:text-sm rounded-xl'
                    : 'px-6 py-2.5 text-sm xl:text-[15px] rounded-xl'
                }
              `}
            >
              Começar projeto
            </a>
          </div>

          {/* Mobile Center Logo View */}
          <div className="flex lg:hidden items-center justify-center flex-1 mx-2 pointer-events-none">
            <div className="relative w-[110px] h-8 flex items-center justify-center overflow-hidden">
              <img
                src="/text-logo-128.webp"
                alt="MAKEPLOY"
                width={140}
                height={32}
                className="h-6 sm:h-7 object-contain scale-[3.0] sm:scale-[3.2] transform transition-transform duration-300 select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="lg:hidden relative z-30 p-2 -mr-1 rounded-xl text-neutral-800 hover:bg-neutral-100 active:scale-90 transition-all cursor-pointer pointer-events-auto select-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2.2]" /> : <Menu className="w-6 h-6 stroke-[2.2]" />}
          </button>
        </nav>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="lg:hidden mt-3 bg-white rounded-2xl p-4 shadow-xl border border-black/[0.08] flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto relative z-40"
          >
            <div className="flex flex-col gap-1">
              {allNavItems.map((item) => {
                const isActive = activeItem === item.id
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith('#')) {
                        e.preventDefault()
                        scrollToSection(item.href)
                      }
                      setMobileMenuOpen(false)
                    }}
                    className={`
                      w-full text-left px-4 py-2.5 text-sm font-bold rounded-xl transition-colors block cursor-pointer
                      ${
                        isActive
                          ? 'bg-blue-50 text-neutral-900'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }
                    `}
                  >
                    {item.label}
                  </a>
                )
              })}
            </div>

            <div className="pt-2 border-t border-neutral-100">
              <a
                href="#comece"
                onClick={(event) => { event.preventDefault(); setMobileMenuOpen(false); openEarlyAccess('navbar_mobile') }}
                className="block w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-xl text-center cursor-pointer shadow-xs"
              >
                Começar projeto
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
