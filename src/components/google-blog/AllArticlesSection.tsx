import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { archiveArticlesData, filterTopics } from './googleBlogData'

export function AllArticlesSection() {
  const [selectedTopic, setSelectedTopic] = useState('Todos')

  const filteredArticles = useMemo(() => {
    if (selectedTopic === 'Todos') return archiveArticlesData
    return archiveArticlesData.filter((article) => article.topic === selectedTopic)
  }, [selectedTopic])

  return (
    <section id="todas-noticias" className="py-12 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 sm:mb-14">
          <div aria-hidden="true" className="w-20 h-1 rounded-full mb-4" style={{ background: 'var(--gradient-brand)' }} />
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">Continue explorando</h2>
          <p className="mt-2 text-sm text-neutral-600">Ideias, métodos e perguntas para tomar decisões com mais evidência.</p>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Filter by Topic Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs sm:text-sm text-neutral-500 font-normal block">
              Filtre os conteúdos por tema
            </span>

            {/* Cloud of Rounded Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {filterTopics.map((topic) => {
                const isActive = selectedTopic === topic

                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    aria-pressed={isActive}
                    className={`
                      px-4 py-2 rounded-full text-xs font-normal transition-all cursor-pointer whitespace-nowrap
                      ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/70 shadow-xs'
                          : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                      }
                    `}
                  >
                    {topic}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Article List with Horizontal Dividers */}
          <div className="lg:col-span-8 divide-y divide-neutral-200">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <article key={article.id} className="py-7 first:pt-0 last:pb-0 space-y-3 group">
                  {/* Category Pill */}
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold">
                    {article.categoryPill}
                  </span>

                  {/* Article Title */}
                  <Link to={`/blog/${article.slug}`} className="flex items-start justify-between gap-5">
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug tracking-tight group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-neutral-300 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
                  </Link>
                  <p className="text-sm text-neutral-600 leading-relaxed">{article.description}</p>
                  <div className="text-xs text-neutral-500 pt-1">
                    {article.readTime} de leitura
                  </div>
                </article>
              ))
            ) : (
              <div className="py-8 text-sm text-neutral-500">
                Nenhum artigo encontrado para o filtro selecionado.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
