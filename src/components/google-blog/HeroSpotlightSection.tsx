import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HighlightText } from '@/components/text/HighlightText'

export function HeroSpotlightSection() {
  return (
    <section id="ultimos-posts" className="py-6 sm:py-10 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* ── CARD ESQUERDO: Card Editorial com cores e efeitos Makeploy ── */}
          <div className="lg:col-span-5 xl:col-span-5 bg-[#f8f9fa] rounded-[32px] p-7 sm:p-9 md:p-10 flex flex-col justify-between border border-neutral-200/70 shadow-xs relative overflow-hidden">
            {/* Linha gradiente oficial Makeploy no topo do card */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[3.5px]"
              style={{ background: 'var(--gradient-brand)' }}
            />

            <div className="space-y-4 sm:space-y-5">
              {/* Tag da categoria com padrão Makeploy */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-blue-600 fill-blue-600" />
                  Inteligência Artificial
                </span>
                <span className="text-xs text-neutral-400 font-medium">• Destaque</span>
              </div>

              {/* Título do artigo mais enxuto para caber em 2 linhas */}
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-neutral-950 leading-[1.2] tracking-tight">
                Crie e valide produtos digitais{' '}
                <HighlightText variant="coral">sem programar</HighlightText>.
              </h1>

              {/* Resumo do artigo com destaque suave e mais direto */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal pr-4">
                Agentes de IA que analisam o mercado e testam a sua ideia na prática{' '}
                <HighlightText variant="yellow">antes de você gastar tempo com código.</HighlightText>
              </p>
            </div>

            {/* Rodapé do card: Autor + Botão Pílula */}
            <div className="pt-8 space-y-5 border-t border-neutral-200/60">
              <div className="text-xs text-neutral-700 space-y-0.5">
                <div className="font-bold text-neutral-900">
                  Por Equipe Makeploy
                </div>
                <div className="text-neutral-500 font-normal text-[11px]">
                  Pesquisa, produto e inteligência de mercado
                </div>
              </div>

              <div>
                <Link
                  to="/blog/agentes-ia-validacao-produtos"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-400 hover:border-neutral-950 bg-white text-neutral-900 text-xs sm:text-sm font-medium shadow-xs hover:shadow-sm transition-all cursor-pointer group"
                >
                  <span>Ler análise</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── CARD DIREITO: Banner Fotográfico Editorial com Identidade Makeploy ── */}
          <div className="lg:col-span-7 xl:col-span-7 relative min-h-[400px] sm:min-h-[480px] rounded-[32px] overflow-hidden border border-neutral-200/70 shadow-xs flex items-center justify-center p-6 sm:p-12 text-center group">
            {/* Imagem fotográfica de alta definição */}
            <img
              src="/images/blog/google-gemini-hero.jpg"
              alt="Criação e validação de produtos com a Makeploy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradiente escuro para legibilidade perfeita */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/40 backdrop-blur-[0.5px]" />

            {/* Conteúdo central: Badge Makeploy + Título com Efeitos */}
            <div className="relative z-10 max-w-lg space-y-4 text-white">
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-black/[0.06]">
                <img
                  src="/nova-logo-128.webp"
                  alt="Makeploy Logo"
                  width={22}
                  height={22}
                  className="object-contain"
                />
                <span className="text-base sm:text-xl font-bold tracking-tight text-neutral-950">
                  MAKEPLOY INTELLIGENCE
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
                Da hipótese ao primeiro sinal real de mercado
              </h2>

              <p className="text-xs sm:text-sm text-neutral-200 max-w-md mx-auto leading-relaxed drop-shadow-xs">
                Pesquise o problema, construa o experimento e aprenda com o comportamento do público em uma jornada conectada.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[10px] font-bold text-white/85">
                <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1.5 backdrop-blur-md">GUIA EM DESTAQUE</span>
                <span>2 set. 2026</span><span aria-hidden="true">•</span><span>7 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
