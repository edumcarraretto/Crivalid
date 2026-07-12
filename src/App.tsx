import { Hero } from '@/components/hero/Hero'
import { LogoCloud } from '@/components/logos/LogoCloud'
import { ProblemSection } from '@/components/problem/ProblemSection'
import { ToolsSection } from '@/components/tools/ToolsSection'
import { CreationTechnologySection } from '@/components/creation/CreationTechnologySection'
import { GlobeSection } from '@/components/globe/GlobeSection'

function App() {
  return (
    <main>
      <Hero />
      <LogoCloud />
      <ProblemSection />
      <ToolsSection />
      <CreationTechnologySection />
      <GlobeSection />
    </main>
  )
}

export default App
