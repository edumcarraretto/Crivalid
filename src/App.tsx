import { Hero } from '@/components/hero/Hero'
import { LogoCloud } from '@/components/logos/LogoCloud'
import { ProblemSection } from '@/components/problem/ProblemSection'
import { ToolsSection } from '@/components/tools/ToolsSection'
import { CreationTechnologySection } from '@/components/creation/CreationTechnologySection'
import { MemoryAITableSection } from '@/components/brain/MemoryAITableSection'
import { GlobeSection } from '@/components/globe/GlobeSection'
import { WorkflowHeroSection } from '@/components/workflow/WorkflowHeroSection'

function App() {
  return (
    <main>
      <Hero />
      <LogoCloud />
      <ProblemSection />
      <ToolsSection />
      <CreationTechnologySection />
      <MemoryAITableSection />
      <GlobeSection />
      <WorkflowHeroSection />
    </main>
  )
}

export default App
