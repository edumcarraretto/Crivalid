import { Suspense, lazy, type ReactNode } from 'react'
import { Navbar } from '@/components/navbar/Navbar'
import { Hero } from '@/components/hero/Hero'
import { FeaturesGrid } from '@/components/hero/FeaturesGrid'
import { LogoCloud } from '@/components/logos/LogoCloud'
import { ProblemSection } from '@/components/problem/ProblemSection'
import { ToolsSection } from '@/components/tools/ToolsSection'
import { DeferredSection, SectionErrorBoundary, SectionSkeleton } from '@/components/system/AsyncSectionBoundary'

// Below-the-fold components loaded on demand for optimal initial load time
const CreationTechnologySection = lazy(() =>
  import('@/components/creation/CreationTechnologySection').then((m) => ({ default: m.CreationTechnologySection }))
)
const MemoryAITableSection = lazy(() =>
  import('@/components/intelligence/MemoryAITableSection').then((m) => ({ default: m.MemoryAITableSection }))
)
const WorkflowHeroSection = lazy(() =>
  import('@/components/workflow/WorkflowHeroSection').then((m) => ({ default: m.WorkflowHeroSection }))
)
const GlobeSection = lazy(() =>
  import('@/components/globe/GlobeSection').then((m) => ({ default: m.GlobeSection }))
)
const PlatformMetricsSection = lazy(() =>
  import('@/components/metrics/PlatformMetricsSection').then((m) => ({ default: m.PlatformMetricsSection }))
)
const MissionMessageSection = lazy(() =>
  import('@/components/mission/MissionMessageSection').then((m) => ({ default: m.MissionMessageSection }))
)
const ProductFAQSection = lazy(() =>
  import('@/components/faq/ProductFAQSection').then((m) => ({ default: m.ProductFAQSection }))
)
const AIIdeaSection = lazy(() =>
  import('@/components/cta/AIIdeaSection').then((m) => ({ default: m.AIIdeaSection }))
)
const MarqueeStripes = lazy(() =>
  import('@/components/marquee/MarqueeStripes').then((m) => ({ default: m.MarqueeStripes }))
)
const SiteFooter = lazy(() =>
  import('@/components/footer/SiteFooter').then((m) => ({ default: m.SiteFooter }))
)

function DeferredAsyncSection({ children, minHeight }: { children: ReactNode; minHeight?: string }) {
  return (
    <DeferredSection minHeight={minHeight}>
      <SectionErrorBoundary>
        <Suspense fallback={<SectionSkeleton minHeight={minHeight} />}>
          {children}
        </Suspense>
      </SectionErrorBoundary>
    </DeferredSection>
  )
}

function App() {
  return (
    <>
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo-principal" className="min-h-screen bg-white overflow-x-hidden">
        <Hero />
        <FeaturesGrid />
        <LogoCloud />
        <ProblemSection />
        <ToolsSection />
        <DeferredAsyncSection minHeight="min-h-[720px]">
          <CreationTechnologySection />
        </DeferredAsyncSection>
        <DeferredAsyncSection minHeight="min-h-[640px]">
          <MemoryAITableSection />
        </DeferredAsyncSection>
        <DeferredAsyncSection minHeight="min-h-[520px]">
          <WorkflowHeroSection />
        </DeferredAsyncSection>
        <DeferredAsyncSection minHeight="min-h-[520px]">
          <GlobeSection />
        </DeferredAsyncSection>
        <DeferredAsyncSection>
          <PlatformMetricsSection />
        </DeferredAsyncSection>
        <DeferredAsyncSection>
          <MissionMessageSection />
        </DeferredAsyncSection>
        <DeferredAsyncSection>
          <ProductFAQSection />
        </DeferredAsyncSection>
        <DeferredAsyncSection>
          <AIIdeaSection />
        </DeferredAsyncSection>
        <DeferredAsyncSection minHeight="min-h-40">
          <MarqueeStripes />
        </DeferredAsyncSection>
      </main>
      <DeferredAsyncSection>
        <SiteFooter />
      </DeferredAsyncSection>
    </>
  )
}

export default App
