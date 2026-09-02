import { ArrowRight, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { researchArticleData } from './googleBlogData'

export function ResearchHighlightSection() {
  return (
    <section id="pesquisa" className="py-12 sm:py-16 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-8">
          {researchArticleData.sectionTitle}
        </h2>

        {/* Large Split Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Dark Green Graphical Banner ("AI & Economy Atlas") */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/9] w-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#063b28] text-white p-6 sm:p-10 flex flex-col justify-between border border-emerald-900/40 shadow-sm group">
              {/* Linha gradiente no topo */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[4px]"
                style={{ background: 'var(--gradient-brand)' }}
              />
              {/* Perspective Grid Background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #34d399 1px, transparent 1px), linear-gradient(to bottom, #34d399 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                  transform: 'perspective(500px) rotateX(25deg)',
                }}
              />

              {/* Glowing data points across simulated map */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-5 h-5 rounded-full bg-emerald-400/80 blur-xs animate-ping" />
                <div className="absolute top-1/2 left-1/3 w-8 h-8 rounded-full bg-emerald-300/60" />
                <div className="absolute top-2/3 left-1/2 w-6 h-6 rounded-full bg-emerald-400/70" />
                <div className="absolute top-1/2 right-1/4 w-10 h-10 rounded-full bg-emerald-200/50" />
              </div>

              {/* Banner Top Strip: Title + Brand Mark */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-serif italic tracking-wide text-emerald-50">
                  {researchArticleData.badgeTitle}
                </div>

                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Globe className="w-4 h-4 text-emerald-300" />
                </div>
              </div>

              {/* Banner Bottom Label */}
              <div className="relative z-10 text-xs font-mono text-emerald-300/80">
                MAKEPLOY INTELLIGENCE LABS // DATA INDEX 2026
              </div>
            </div>
          </div>

          {/* Right: Editorial Overview & Action */}
          <div className="lg:col-span-5 space-y-5">
            <div aria-hidden="true" className="w-20 h-1 rounded-full" style={{ background: 'var(--gradient-brand)' }} />
            <span className="inline-flex px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-xs font-bold tracking-wider uppercase">
              {researchArticleData.category}
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug tracking-tight">
              {researchArticleData.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              {researchArticleData.description}
            </p>

            <div className="pt-2">
              <Link
                to="/blog/sinais-solucao-sem-problema"
                className="inline-flex items-center gap-2 text-neutral-900 hover:text-blue-600 font-medium text-base transition-colors group cursor-pointer"
              >
                <span>Ler pesquisa</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
