import { ideaAnalysisData } from './ideaAnalysisData'
import { Users, Target, Share2 } from 'lucide-react'

export function AudienceAnalysis() {
  const { audience } = ideaAnalysisData

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {/* Profiles */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <Users size={14} className="text-violet-500" />
          <h4 className="text-[12px] font-bold text-slate-700 uppercase tracking-wider">
            Perfis principais
          </h4>
        </div>
        <ul className="flex flex-col gap-2">
          {audience.profiles.map((profile, i) => (
            <li key={i} className="text-[13px] text-slate-600 font-medium flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              {profile}
            </li>
          ))}
        </ul>
      </div>

      {/* Needs */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <Target size={14} className="text-emerald-500" />
          <h4 className="text-[12px] font-bold text-slate-700 uppercase tracking-wider">
            Principais necessidades
          </h4>
        </div>
        <ul className="flex flex-col gap-2">
          {audience.needs.map((need, i) => (
            <li key={i} className="text-[13px] text-slate-600 font-medium flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              {need}
            </li>
          ))}
        </ul>
      </div>

      {/* Channels */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <Share2 size={14} className="text-sky-500" />
          <h4 className="text-[12px] font-bold text-slate-700 uppercase tracking-wider">
            Canais relevantes
          </h4>
        </div>
        <ul className="flex flex-col gap-2">
          {audience.channels.map((ch, i) => (
            <li key={i} className="flex flex-col">
              <span className="text-[13px] text-slate-800 font-semibold">{ch.name}</span>
              <span className="text-[11px] text-slate-500 font-medium">{ch.relevance}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
