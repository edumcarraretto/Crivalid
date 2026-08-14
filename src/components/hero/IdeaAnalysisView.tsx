import { useState, useEffect } from 'react'
import { IdeaAnalysisHeader } from './IdeaAnalysisHeader'
import { IdeaAnalysisTabs } from './IdeaAnalysisTabs'
import { IDEA_ANALYSIS_TABS } from './ideaAnalysisTabsData'
import { OverviewAnalysis } from './OverviewAnalysis'
import { AudienceAnalysis } from './AudienceAnalysis'
import { MarketAnalysis } from './MarketAnalysis'
import { RecommendedPlanAnalysis } from './RecommendedPlanAnalysis'
import { Loader2 } from 'lucide-react'

const LOADING_STEPS = [
  'Entendendo sua ideia...',
  'Identificando o público...',
  'Analisando relevância...',
  'Mapeando oportunidades...',
  'Organizando recomendações...'
]

export function IdeaAnalysisView() {
  const [activeTab, setActiveTab] = useState<string>(IDEA_ANALYSIS_TABS[0])
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [loadingStepIndex, setLoadingStepIndex] = useState(0)

  useEffect(() => {
    if (!isAnalyzing) return

    // Change loading text every 800ms
    const interval = setInterval(() => {
      setLoadingStepIndex((prev) => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1
        }
        clearInterval(interval)
        return prev
      })
    }, 800)

    // Finish analyzing after all steps
    const timeout = setTimeout(() => {
      setIsAnalyzing(false)
    }, 800 * LOADING_STEPS.length + 400)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isAnalyzing])

  if (isAnalyzing) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center animate-in fade-in duration-500">
        <Loader2 size={28} className="text-violet-500 animate-spin mb-4" />
        <p className="text-[13px] font-medium text-slate-600 transition-opacity duration-300">
          {LOADING_STEPS[loadingStepIndex]}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col animate-[contentFadeIn_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]">
      <IdeaAnalysisHeader />
      <IdeaAnalysisTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto no-scrollbar max-h-[320px] md:max-h-none pb-2">
        {activeTab === IDEA_ANALYSIS_TABS[0] && <OverviewAnalysis />}
        {activeTab === IDEA_ANALYSIS_TABS[1] && <AudienceAnalysis />}
        {activeTab === IDEA_ANALYSIS_TABS[2] && <MarketAnalysis />}
        {activeTab === IDEA_ANALYSIS_TABS[3] && <RecommendedPlanAnalysis />}
      </div>
    </div>
  )
}
