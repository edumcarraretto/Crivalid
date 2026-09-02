import { Link } from 'react-router-dom'

export function GoogleBlogNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo & Blog Label */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/nova-logo-128.webp"
              alt="Makeploy Logo"
              width={26}
              height={26}
              className="object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-bold text-lg sm:text-xl tracking-tight text-neutral-900">
              MAKEPLOY
            </span>
          </Link>

          <span className="text-sm font-normal text-neutral-600 hidden sm:inline-block border-l border-neutral-300 pl-3">
            Ideias & Pesquisa
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700 font-normal">
          <a href="#ultimos-posts" className="hover:text-neutral-950 transition-colors">
            Destaque
          </a>
          <a href="#novidades" className="hover:text-neutral-950 transition-colors">
            Na prática
          </a>
          <a href="#pesquisa" className="hover:text-neutral-950 transition-colors">
            Pesquisa
          </a>
          <a href="#todas-noticias" className="hover:text-neutral-950 transition-colors">
            Explorar
          </a>
          <Link to="/" className="text-blue-600 font-medium hover:underline">
            Voltar ao site
          </Link>
        </nav>

        <Link to="/#comece" className="rounded-full bg-neutral-950 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-600">
          Validar uma ideia
        </Link>
      </div>
    </header>
  )
}
