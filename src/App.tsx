import { Navbar } from '@/components/navbar/Navbar'
import { Hero } from '@/components/hero/Hero'
import { LogoCloud } from '@/components/logos/LogoCloud'
import { ProblemSection } from '@/components/problem/ProblemSection'
import { FeaturesGrid } from '@/components/hero/FeaturesGrid'
import { ToolsSection } from '@/components/tools/ToolsSection'
import { CreationTechnologySection } from '@/components/creation/CreationTechnologySection'
import { MemoryAITableSection } from '@/components/intelligence/MemoryAITableSection'
import { WorkflowHeroSection } from '@/components/workflow/WorkflowHeroSection'
import { GlobeSection } from '@/components/globe/GlobeSection'
import { PlatformMetricsSection } from '@/components/metrics/PlatformMetricsSection'
import { MissionMessageSection } from '@/components/mission/MissionMessageSection'
import { ProductFAQSection } from '@/components/faq/ProductFAQSection'
import { AIIdeaSection } from '@/components/cta/AIIdeaSection'
import { MarqueeStripes } from '@/components/marquee/MarqueeStripes'
import { SiteFooter } from '@/components/footer/SiteFooter'

function App() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <LogoCloud />
      <ProblemSection />
      <FeaturesGrid />
      <ToolsSection />
      <CreationTechnologySection />
      <MemoryAITableSection />
      <WorkflowHeroSection />
      <GlobeSection />
      <PlatformMetricsSection />
      <MissionMessageSection />
      <ProductFAQSection />
      <AIIdeaSection />
      <MarqueeStripes />
      <SiteFooter />
    </main>
  )
}

export default App
