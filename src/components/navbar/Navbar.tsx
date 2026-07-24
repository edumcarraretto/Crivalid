import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavItem {
  id: string
  label: string
}

const navItems: NavItem[] = [
  { id: 'caracteristicas', label: 'Características' },
  { id: 'seguranca', label: 'Segurança' },
  { id: 'comecando', label: 'Começando' },
  { id: 'faq', label: 'Perguntas frequentes' },
]

export function Navbar() {
  const [activeItem, setActiveItem] = useState('caracteristicas')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`
        sticky top-0 z-50 w-full bg-transparent pointer-events-none
        transition-all duration-300 ease-out
        ${isScrolled ? 'py-3 sm:py-4 px-4 sm:px-6' : 'py-5 sm:py-7 px-4 sm:px-8'}
      `}
    >
      <div
        className={`
          mx-auto transition-all duration-300 ease-out
          ${isScrolled ? 'max-w-6.5xl sm:max-w-7xl' : 'max-w-7xl'}
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
                ? 'rounded-2xl px-5 sm:px-7 py-2.5 sm:py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.1)]'
                : 'rounded-2xl sm:rounded-[26px] px-5 sm:px-8 py-3.5 sm:py-4.5 shadow-[0_6px_30px_rgba(0,0,0,0.07)]'
            }
          `}
          aria-label="Navegação principal"
        >
          {/* ── 1. LADO ESQUERDO: Logo "OWO" ── */}
          <div className="flex items-center gap-2 select-none">
            <a href="#" className="flex items-center gap-2 group" aria-label="OWO Home">
              {/* Icon symbol: Pink circle with plus/cross */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`
                  text-[#FF0080] shrink-0 transform group-hover:scale-105 transition-all duration-300
                  ${isScrolled ? 'w-6.5 h-6.5 sm:w-7 sm:h-7' : 'w-7 h-7 sm:w-8 sm:h-8'}
                `}
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path
                  d="M12 7V17M7 12H17"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              {/* Bold pink text logo */}
              <span
                className={`
                  font-black tracking-tighter text-[#FF0080] leading-none transition-all duration-300
                  ${isScrolled ? 'text-2.5xl sm:text-3xl' : 'text-3xl sm:text-4xl'}
                `}
              >
                OWO
              </span>
            </a>
          </div>

          {/* ── 2. CENTRO: Links de Navegação (Desktop) ── */}
          <div
            className={`
              hidden md:flex items-center transition-all duration-300
              ${isScrolled ? 'gap-1 sm:gap-1.5' : 'gap-1.5 sm:gap-2'}
            `}
          >
            {navItems.map((item, index) => {
              const isActive = activeItem === item.id

              return (
                <div key={item.id} className="flex items-center gap-1 sm:gap-1.5">
                  <button
                    onClick={() => setActiveItem(item.id)}
                    className={`
                      font-bold tracking-tight rounded-xl sm:rounded-2xl
                      transition-all duration-300 ease-out
                      ${
                        isScrolled
                          ? 'px-4 py-2 text-xs sm:text-sm'
                          : 'px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base'
                      }
                      ${
                        isActive
                          ? 'bg-[#FFD6EB] text-[#121212] shadow-xs'
                          : 'text-[#2C2C2C] hover:text-black hover:bg-black/[0.04]'
                      }
                    `}
                  >
                    {item.label}
                  </button>

                  {/* Pequena barra vertical de divisão entre os tópicos */}
                  {index < navItems.length - 1 && (
                    <span
                      className={`
                        w-px bg-black/[0.15] rounded-full shrink-0 transition-all duration-300
                        ${isScrolled ? 'h-3.5' : 'h-4'}
                      `}
                      aria-hidden="true"
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* ── 3. LADO DIREITO: Botões (Desktop) ── */}
          <div
            className={`
              hidden md:flex items-center transition-all duration-300
              ${isScrolled ? 'gap-3' : 'gap-3.5'}
            `}
          >
            {/* Botão Principal: Experimente */}
            <button
              className={`
                bg-[#120B05] hover:bg-[#26170F] text-white font-bold
                shadow-sm hover:shadow-md active:scale-98
                transition-all duration-300
                ${
                  isScrolled
                    ? 'px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl sm:rounded-2xl'
                    : 'px-6 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-xl sm:rounded-2xl'
                }
              `}
            >
              Experimente
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="md:hidden p-2 rounded-xl text-neutral-800 hover:bg-neutral-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 bg-white rounded-2xl p-4 shadow-lg border border-black/[0.04] flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeItem === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveItem(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`
                      w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors
                      ${
                        isActive
                          ? 'bg-[#FFD6EB] text-[#1A1A1A]'
                          : 'text-[#2B2B2B] hover:bg-neutral-100'
                      }
                    `}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>

            <div className="pt-2 border-t border-neutral-100">
              <button className="w-full bg-[#120B05] hover:bg-[#26170F] text-white text-sm font-bold py-2.5 rounded-xl text-center">
                Experimente
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
