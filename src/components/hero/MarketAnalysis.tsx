import { ideaAnalysisData } from './ideaAnalysisData'
import { TrendingUp, Info } from 'lucide-react'

export function MarketAnalysis() {
  const { market } = ideaAnalysisData

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Top row: Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Demanda
          </span>
          <span className="text-[14px] text-slate-800 font-bold">{market.demand}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Concorrência
          </span>
          <span className="text-[14px] text-slate-800 font-bold">{market.competition}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Tendência
          </span>
          <span className="text-[14px] text-slate-800 font-bold flex items-center gap-1.5">
            {market.trend}
            <TrendingUp size={14} className="text-emerald-500" />
          </span>
        </div>
      </div>

      <div className="h-px w-full bg-slate-200/50" />

      {/* Middle row: Differentiation & Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Potencial de diferenciação
          </span>
          <p className="text-[13px] text-slate-700 font-medium leading-relaxed">
            {market.differentiation}
          </p>
        </div>
        <div>
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Oportunidades
          </span>
          <div className="flex flex-wrap gap-2">
            {market.opportunities.map((opp, i) => (
              <span
                key={i}
                className="inline-flex rounded-md bg-white/50 border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
              >
                {opp}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-2 flex items-center gap-2 bg-slate-100/50 rounded-lg p-3 border border-slate-200/50">
        <Info size={14} className="text-slate-400" />
        <span className="text-[11px] text-slate-500 font-medium">
          {market.disclaimer}
        </span>
      </div>
    </div>
  )
}
