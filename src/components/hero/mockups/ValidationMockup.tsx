import { BarChart2, TrendingUp, Lightbulb, CheckCircle2 } from 'lucide-react'

export function ValidationMockup() {
  return (
    <div className="w-full mx-auto rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden">
      {/* Window header (macOS style) */}
      <div className="flex items-center px-4 py-3 border-b border-neutral-100 bg-neutral-50/80 backdrop-blur-sm relative">
        <div className="flex gap-1.5 absolute left-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        <div className="w-full text-center">
          <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest select-none">
            Relatório de Validação
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-7">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
              Aplicativo de Finanças Pessoais
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Criado há 2 minutos
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600 border border-emerald-200/60">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Em análise
          </div>
        </div>

        {/* Metrics List */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Metric 1 */}
          <div className="flex items-center gap-4 rounded-xl bg-neutral-50 p-3 border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-100/50 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-neutral-100 text-violet-600">
              <BarChart2 size={18} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Análise de Mercado</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-base font-bold text-neutral-900">94%</span>
                <span className="text-[11px] text-neutral-500 truncate">potencial identificado</span>
              </div>
            </div>
            <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          </div>

          {/* Metric 2 */}
          <div className="flex items-center gap-4 rounded-xl bg-neutral-50 p-3 border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-100/50 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-neutral-100 text-violet-600">
              <TrendingUp size={18} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Análise Competitiva</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-base font-bold text-neutral-900">12</span>
                <span className="text-[11px] text-neutral-500 truncate">concorrentes mapeados</span>
              </div>
            </div>
            <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          </div>

          {/* Metric 3 (Active) */}
          <div className="flex items-center gap-4 rounded-xl bg-violet-50 p-3 border border-violet-100 ring-1 ring-inset ring-violet-500/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-violet-100 text-violet-600">
              <Lightbulb size={18} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-violet-700 uppercase tracking-wide">Viabilidade</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-base font-bold text-violet-900">8,7<span className="text-sm text-violet-600 font-semibold">/10</span></span>
                <span className="text-[11px] text-violet-600/80 truncate">score de validação</span>
              </div>
            </div>
            {/* Spinning loading indicator for active state */}
            <div className="h-4 w-4 shrink-0 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-5 border-t border-neutral-100">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider">Score Final</span>
            <span className="text-xs font-bold text-violet-600">87%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-500 transition-all duration-1000 ease-out w-[87%] bg-[length:200%_100%] animate-[gradient_2s_linear_infinite]"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
