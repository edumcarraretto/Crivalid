import { IDEA_ANALYSIS_TABS } from './ideaAnalysisTabsData'

interface IdeaAnalysisTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function IdeaAnalysisTabs({ activeTab, onTabChange }: IdeaAnalysisTabsProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar border-b border-slate-200/50 mb-6 pb-2">
      {IDEA_ANALYSIS_TABS.map((tab) => {
        const isActive = activeTab === tab
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={[
              'px-4 py-1.5 text-[12px] font-bold transition-all duration-200 rounded-full whitespace-nowrap',
              isActive
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
            ].join(' ')}
          >
            {tab}
          </button>
        )
      })}
    </div>
  )
}
