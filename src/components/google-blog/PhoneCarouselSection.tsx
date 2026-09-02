import { useState } from 'react'
import {
  ChevronRight,
  ArrowRight,
  MapPin,
  Navigation,
  Sparkles,
  Layers,
  Check,
  BarChart3,
} from 'lucide-react'
import { carouselSlidesData } from './googleBlogData'

export function PhoneCarouselSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselSlidesData.length)
  }

  const currentSlide = carouselSlidesData[activeIndex]

  return (
    <section id="novidades" className="py-12 sm:py-16 bg-white border-b border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-8 sm:mb-12">
          <span className="inline-flex px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/70 text-xs font-bold uppercase tracking-wider">
            Do conceito à evidência
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Validação na prática
          </h2>
        </div>

        {/* Carousel Viewport Container */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Smartphone Mockup Frame */}
            <div className="lg:col-span-6 flex justify-center py-8 sm:py-10">
              <div className="relative">
                <div aria-hidden="true" className="absolute -inset-12 rounded-full bg-blue-400/10 blur-3xl" />
                <div aria-hidden="true" className="absolute -left-8 top-20 h-32 w-32 rounded-full bg-rose-300/15 blur-2xl" />
                <div aria-hidden="true" className="absolute -right-10 bottom-20 h-36 w-36 rounded-full bg-amber-300/20 blur-2xl" />

                <div className="relative w-[286px] sm:w-[332px] rounded-[50px] bg-neutral-950 p-[7px] shadow-[0_30px_80px_rgba(23,23,23,0.22),0_8px_24px_rgba(0,103,217,0.12)] ring-1 ring-black/10">
                  <div aria-hidden="true" className="absolute -left-[10px] top-28 h-16 w-[4px] rounded-l-full bg-neutral-700" />
                  <div aria-hidden="true" className="absolute -left-[10px] top-48 h-10 w-[4px] rounded-l-full bg-neutral-700" />
                  <div aria-hidden="true" className="absolute -right-[10px] top-36 h-20 w-[4px] rounded-r-full bg-neutral-700" />

                  <div className="relative h-[552px] sm:h-[616px] overflow-hidden rounded-[43px] bg-neutral-50 ring-1 ring-white/15">
                    <div aria-hidden="true" className="absolute inset-x-0 top-0 z-20 h-1" style={{ background: 'var(--gradient-brand)' }} />

                    <div className="relative z-10 flex h-9 items-center justify-between px-5 pt-1 text-[9px] font-bold text-neutral-700">
                      <span>9:41</span>
                      <div className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-neutral-950">
                        <span className="absolute right-3 top-2 h-1.5 w-1.5 rounded-full bg-blue-400/50" />
                      </div>
                      <span className="tracking-widest">● ◒</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-neutral-200/80 bg-white/90 px-4 py-3 backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950">
                          <Sparkles className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div>
                          <div className="text-[11px] font-extrabold tracking-tight text-neutral-950">MAKEPLOY</div>
                          <div className="text-[8px] font-medium text-neutral-400">VALIDATION AGENT</div>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[8px] font-bold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ATIVO
                      </span>
                    </div>

                    <div className="relative flex h-[calc(100%-85px)] flex-col overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-amber-50/50 p-4">
                      <div aria-hidden="true" className="absolute right-[-35px] top-12 h-28 w-28 rounded-full bg-blue-300/15 blur-2xl" />
                      <div aria-hidden="true" className="absolute bottom-20 left-[-30px] h-24 w-24 rounded-full bg-rose-300/15 blur-2xl" />

                      <div className="relative">
                        <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-blue-600">Jornada de validação</span>
                        <h4 className="mt-1 text-lg font-extrabold leading-tight tracking-tight text-neutral-950">Da sua ideia até uma evidência real.</h4>
                        <div className="mt-3 flex items-center gap-1.5">
                          {[0, 1, 2].map((step) => (
                            <span key={step} className={`h-1.5 flex-1 rounded-full ${step <= activeIndex ? 'bg-blue-500' : 'bg-neutral-200'}`} />
                          ))}
                        </div>
                      </div>

                      <div className="relative mt-5 space-y-2.5">
                        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/80 bg-white/95 p-3 shadow-sm">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <Check className="h-4 w-4" strokeWidth={3} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-extrabold text-neutral-900">Problema identificado</div>
                            <div className="text-[9px] text-neutral-500">Contexto e público organizados</div>
                          </div>
                          <span className="text-[8px] font-bold text-emerald-600">PRONTO</span>
                        </div>

                        <div className="ml-3 flex items-center gap-3 rounded-2xl border border-blue-200 bg-white/95 p-3 shadow-[0_8px_22px_rgba(0,103,217,0.10)]">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Navigation className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-extrabold text-neutral-900">Experimento recomendado</div>
                            <div className="text-[9px] text-neutral-500">Teste de intenção de compra</div>
                          </div>
                        </div>

                        <div className="ml-6 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white/75 p-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                            <BarChart3 className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-[10px] font-extrabold text-neutral-900">Coletar evidências</div>
                            <div className="text-[9px] text-neutral-500">Comportamento, não opinião</div>
                          </div>
                        </div>
                      </div>

                      <div className="relative mt-auto rounded-[22px] border border-neutral-200 bg-white p-3.5 shadow-[0_10px_28px_rgba(23,23,23,0.08)]">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[9px] font-medium text-neutral-500">{currentSlide.metricLabel}</div>
                            <div className="mt-0.5 text-xs font-extrabold text-neutral-950">{currentSlide.metricValue}</div>
                          </div>
                          <MapPin className="h-4 w-4 text-rose-500" />
                        </div>
                        <button type="button" className="mt-3 w-full rounded-xl bg-neutral-950 py-2.5 text-[10px] font-bold text-white shadow-sm transition-colors hover:bg-blue-600">
                          Continuar validação
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 top-24 hidden rounded-2xl border border-neutral-200 bg-white/95 p-3 shadow-xl backdrop-blur-md sm:block">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Agente analisando</div>
                  <div className="mt-1 flex items-center gap-2 text-xs font-bold text-neutral-900">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" /> Mercado e concorrentes
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Editorial Slide Details */}
            <div className="lg:col-span-5 space-y-5">
              <div aria-hidden="true" className="w-20 h-1 rounded-full" style={{ background: 'var(--gradient-brand)' }} />
              <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-bold tracking-wider uppercase">
                {currentSlide.category}
              </span>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 leading-snug tracking-tight">
                {currentSlide.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {currentSlide.description}
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 text-neutral-900 hover:text-blue-600 font-medium text-base transition-colors group cursor-pointer"
                  aria-label="Ver próximo conteúdo"
                >
                  <span>Ver próximo insight</span>
                  <ArrowRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>

            {/* Next Slide Peek on larger screens */}
            <div className="hidden xl:block lg:col-span-1 opacity-40 hover:opacity-70 transition-opacity">
              <div className="h-64 rounded-2xl bg-neutral-100 border border-neutral-200 p-3 flex flex-col justify-center items-center">
                <Layers className="w-8 h-8 text-neutral-400" />
              </div>
            </div>
          </div>

          {/* Floating Next Button on right edge */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute top-1/2 -right-3 sm:-right-5 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border border-neutral-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-neutral-800 z-20 cursor-pointer"
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Pagination */}
        <div className="flex justify-center items-center gap-2.5 mt-10">
          {carouselSlidesData.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`transition-all rounded-full cursor-pointer ${
                activeIndex === idx
                  ? 'w-2.5 h-2.5 bg-neutral-900'
                  : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
