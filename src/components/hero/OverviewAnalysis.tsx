import { ideaAnalysisData } from './ideaAnalysisData'

export function OverviewAnalysis() {
  const { overview } = ideaAnalysisData

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 animate-in fade-in duration-500">
      {/* Left Column: Summary */}
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Resumo da oportunidade
          </h4>
          <p className="text-[14px] text-slate-800 font-medium leading-relaxed">
            {overview.summary}
          </p>
        </div>

        <div className="h-px w-full bg-slate-200/50" />

        <div className="grid gap-4">
          <div>
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Público principal
            </span>
            <span className="text-[13px] text-slate-700 font-medium">
              {overview.mainAudience}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Necessidade identificada
            </span>
            <span className="text-[13px] text-slate-700 font-medium">
              {overview.identifiedNeed}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Indicators */}
      <div className="w-full md:w-[240px] flex-shrink-0 bg-white/40 rounded-xl p-5 border border-slate-200/50">
        <div className="flex flex-col gap-4">
          {overview.indicators.map((ind) => (
            <div key={ind.label} className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-slate-600">{ind.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-900">{ind.value}</span>
                <div className={`w-2 h-2 rounded-full ${ind.color}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
