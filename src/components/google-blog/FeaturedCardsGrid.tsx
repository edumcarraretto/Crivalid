import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { verticalCardsData } from './googleBlogData'
import { blogArticles } from './blogArticleData'

export function FeaturedCardsGrid() {

  return (
    <section id="explorar" className="py-12 sm:py-16 bg-neutral-50/60 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-bold uppercase tracking-wider">
            Para aprender e aplicar
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
            Explore os riscos antes de construir
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
            Conteúdos práticos para transformar incertezas em experimentos e decisões melhores.
          </p>
        </div>
        {/* Responsive Grid of 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {verticalCardsData.map((card) => (
            <article
              key={card.id}
              className="bg-white rounded-[26px] p-5 sm:p-6 border border-neutral-200/90 hover:border-neutral-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Linha gradiente no topo do card */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: 'var(--gradient-brand)' }}
              />
              {/* Card Top: Image / Illustration Frame with Rounded-2xl */}
              <div>
                <div className="aspect-[16/11] rounded-2xl overflow-hidden border border-black/[0.04] relative mb-5">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Category Tag */}
                <span className={`inline-flex px-3 py-1 rounded-full border text-xs font-bold mb-3 ${card.accentClass}`}>
                  {card.category}
                </span>

                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed">{card.description}</p>

              {/* Card Footer: Author + Pill Action Button */}
              <div className="pt-6 space-y-4">
                <div className="text-xs text-neutral-600 space-y-0.5">
                  <div className="font-normal text-neutral-900">
                    Por {card.author.name}
                  </div>
                  <div className="text-neutral-500 font-normal text-[11px] truncate">
                    {card.author.role}
                  </div>
                </div>

                <div>
                  <Link
                    to={`/blog/${blogArticles.find((article) => article.category === card.category)?.slug ?? ''}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs font-medium bg-white hover:bg-neutral-50 transition-all cursor-pointer group/btn"
                  >
                    <span>Leia o post</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
