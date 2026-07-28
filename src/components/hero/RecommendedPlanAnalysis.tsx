import { ideaAnalysisData } from './ideaAnalysisData'
import { ArrowRight, CheckCircle2, DollarSign, LayoutList } from 'lucide-react'

export function RecommendedPlanAnalysis() {
  const { recommendedPlan } = ideaAnalysisData

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
      {/* Left Column */}
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <LayoutList size={14} className="text-violet-500" />
            <h4 className="text-[12px] font-bold text-slate-700 uppercase tracking-wider">
              Estrutura sugerida
            </h4>
          </div>
          <div className="flex flex-col gap-2.5">
            {recommendedPlan.structure.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-violet-100 text-violet-700 text-[9px] font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[13px] text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <h4 className="text-[12px] font-bold text-slate-700 uppercase tracking-wider">
              Formato recomendado
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendedPlan.formats.map((format, i) => (
              <span
                key={i}
                className="inline-flex rounded-md bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600"
              >
                {format}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={14} className="text-amber-500" />
            <h4 className="text-[12px] font-bold text-slate-700 uppercase tracking-wider">
              Monetização
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendedPlan.monetization.map((monetization, i) => (
              <span
                key={i}
                className="inline-flex rounded-md bg-amber-50 border border-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-700"
              >
                {monetization}
              </span>
            ))}
          </div>
        </div>

        {/* Next Step Highlight */}
        <div className="mt-2 bg-slate-900 rounded-xl p-4 shadow-lg flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Próximo passo estratégico
          </span>
          <p className="text-[13px] text-white font-medium flex items-start gap-2">
            <ArrowRight size={16} className="text-violet-400 mt-0.5 flex-shrink-0" />
            {recommendedPlan.nextStep}
          </p>
        </div>
      </div>
    </div>
  )
}
