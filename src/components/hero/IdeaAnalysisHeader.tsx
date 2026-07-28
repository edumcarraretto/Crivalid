import { CheckCircle2 } from 'lucide-react'
import { ideaAnalysisData } from './ideaAnalysisData'

export function IdeaAnalysisHeader() {
  return (
    <div className="mb-6 flex flex-col gap-3">
      {/* Labels row */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-bold tracking-wider text-violet-700 uppercase">
          Ideia Analisada
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
          <CheckCircle2 size={12} className="text-emerald-500" />
          Análise concluída
        </span>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="text-[20px] sm:text-[24px] font-bold text-slate-900 tracking-tight leading-tight">
          {ideaAnalysisData.header.title}
        </h3>
        <p className="text-[13px] text-slate-600 mt-2 font-medium max-w-2xl leading-relaxed">
          {ideaAnalysisData.header.description}
        </p>
      </div>
    </div>
  )
}
