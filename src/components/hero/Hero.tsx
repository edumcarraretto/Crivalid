import { ArrowRight, CheckCircle, BarChart2, Lightbulb, TrendingUp } from 'lucide-react'

const VALIDATION_STEPS = [
  {
    id: 'market',
    icon: BarChart2,
    label: 'Análise de Mercado',
    value: '94%',
    description: 'potencial identificado',
    status: 'complete' as const,
  },
  {
    id: 'competition',
    icon: TrendingUp,
    label: 'Análise Competitiva',
    value: '12',
    description: 'concorrentes mapeados',
    status: 'complete' as const,
  },
  {
    id: 'viability',
    icon: Lightbulb,
    label: 'Viabilidade do Negócio',
    value: '8.7/10',
    description: 'score de validação',
    status: 'active' as const,
  },
]

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-screen bg-white overflow-hidden flex items-center"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      {/* Radial glow - top center, very subtle */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.06),transparent_70%)]"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* Left column — copy */}
          <div className="flex flex-col gap-8 max-w-xl">
            {/* Badge */}
            <div className="flex items-center gap-2 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-[#7C3AED]" aria-hidden="true" />
              <span className="text-sm font-medium text-neutral-500 tracking-wide uppercase">
                Validação de Ideias
              </span>
            </div>

            {/* Heading */}
            <div className="flex flex-col gap-4">
              <h1
                id="hero-heading"
                className="text-5xl lg:text-6xl font-bold text-neutral-900 leading-[1.08] tracking-tight"
              >
                Valide Suas Ideias{' '}
                <span className="text-[#7C3AED]">Antes de Investir</span>
              </h1>
              <p className="text-lg text-neutral-500 leading-relaxed max-w-md">
                Transforme hipóteses em decisões embasadas. O Crivalid analisa
                mercado, concorrência e viabilidade para que você invista com
                confiança — não com achismo.
              </p>
            </div>

            {/* Social proof pills */}
            <ul className="flex flex-col gap-2" aria-label="Principais benefícios">
              {[
                'Relatório completo em menos de 5 minutos',
                'Dados reais de mercado, sem suposições',
                'Decisões mais inteligentes, menos desperdício',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-neutral-600">
                  <CheckCircle
                    size={16}
                    className="text-[#7C3AED] flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#testar"
                id="hero-cta-primary"
                className="inline-flex items-center justify-center gap-2 bg-[#7C3AED] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#6D28D9] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]"
              >
                Testar Agora
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#como-funciona"
                id="hero-cta-secondary"
                className="inline-flex items-center justify-center gap-2 bg-white text-neutral-700 px-6 py-3 rounded-lg text-sm font-semibold border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
              >
                Ver como funciona
              </a>
            </div>

            {/* Trust footnote */}
            <p className="text-xs text-neutral-400">
              Sem cartão de crédito · Cancele quando quiser
            </p>
          </div>

          {/* Right column — glassmorphism product mockup */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Glow behind the card */}
            <div
              aria-hidden="true"
              className="absolute w-80 h-80 bg-[radial-gradient(ellipse,rgba(124,58,237,0.12),transparent_70%)] blur-2xl"
            />

            {/* Glass card */}
            <div
              role="img"
              aria-label="Prévia do painel de validação do Crivalid"
              className="relative w-full max-w-md rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_8px_64px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] p-6 flex flex-col gap-5"
            >
              {/* Card header */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                    Relatório de Validação
                  </span>
                  <span className="text-sm font-semibold text-neutral-800">
                    App de Finanças Pessoais
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  Em análise
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-neutral-100" aria-hidden="true" />

              {/* Validation steps */}
              <ul className="flex flex-col gap-3" aria-label="Etapas de validação">
                {VALIDATION_STEPS.map(({ id, icon: Icon, label, value, description, status }) => (
                  <li
                    key={id}
                    className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${
                      status === 'active'
                        ? 'bg-[#7C3AED]/5 border border-[#7C3AED]/10'
                        : 'bg-neutral-50/80'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 ${
                        status === 'active'
                          ? 'bg-[#7C3AED]/10'
                          : 'bg-white border border-neutral-100'
                      }`}
                      aria-hidden="true"
                    >
                      <Icon
                        size={15}
                        className={status === 'active' ? 'text-[#7C3AED]' : 'text-neutral-400'}
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="text-xs font-medium text-neutral-500">{label}</span>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`text-sm font-bold ${
                            status === 'active' ? 'text-[#7C3AED]' : 'text-neutral-800'
                          }`}
                        >
                          {value}
                        </span>
                        <span className="text-xs text-neutral-400">{description}</span>
                      </div>
                    </div>
                    {status === 'complete' && (
                      <CheckCircle
                        size={14}
                        className="text-emerald-500 flex-shrink-0"
                        aria-label="Concluído"
                      />
                    )}
                    {status === 'active' && (
                      <div
                        className="w-4 h-4 rounded-full border-2 border-[#7C3AED] border-t-transparent animate-spin flex-shrink-0"
                        aria-label="Em progresso"
                        role="status"
                      />
                    )}
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="h-px bg-neutral-100" aria-hidden="true" />

              {/* Score bar */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-500">Score de Validação</span>
                  <span className="text-xs font-bold text-neutral-800">8.7 / 10</span>
                </div>
                <div
                  className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={87}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Score de validação: 87%"
                >
                  <div
                    className="h-full w-[87%] bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
