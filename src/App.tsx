import { Suspense, lazy, useEffect, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/navbar/Navbar'
import { Hero } from '@/components/hero/Hero'
import { FeaturesGrid } from '@/components/hero/FeaturesGrid'
import { LogoCloud } from '@/components/logos/LogoCloud'
import { ProblemSection } from '@/components/problem/ProblemSection'
import { ToolsSection } from '@/components/tools/ToolsSection'
import { DeferredSection, SectionErrorBoundary, SectionSkeleton } from '@/components/system/AsyncSectionBoundary'
import { EarlyAccessModal } from '@/components/early-access/EarlyAccessModal'
import { FeedbackWidget } from '@/components/feedback/FeedbackWidget'

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

// Google Blog Page loaded on demand
const GoogleBlogIndexPage = lazy(() =>
  import('@/pages/GoogleBlogIndexPage').then((m) => ({ default: m.GoogleBlogIndexPage }))
)
const MakeployBlogArticlePage = lazy(() =>
  import('@/pages/MakeployBlogArticlePage').then((m) => ({ default: m.MakeployBlogArticlePage }))
)
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })))
const TermsOfUsePage = lazy(() => import('@/pages/TermsOfUsePage').then((m) => ({ default: m.TermsOfUsePage })))
const CookiePolicyPage = lazy(() => import('@/pages/CookiePolicyPage').then((m) => ({ default: m.CookiePolicyPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))

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

function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    let id: string
    try { id = decodeURIComponent(hash.slice(1)) } catch { return }
    const scroll = () => {
      const target = document.getElementById(id)
      if (!target || document.querySelector('[data-section-loading]')) return false
      target.scrollIntoView({ block: 'start', behavior: 'instant' })
      return true
    }
    if (scroll()) return
    const observer = new MutationObserver(() => { if (scroll()) observer.disconnect() })
    observer.observe(document.getElementById('root') ?? document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-section-loading'] })
    return () => observer.disconnect()
  }, [pathname, hash, key])
  return null
}

function HomePage() {
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<GoogleBlogIndexPage />} />
          <Route path="/blog/:slug" element={<MakeployBlogArticlePage />} />
          <Route path="/privacidade" element={<PrivacyPolicyPage />} />
          <Route path="/termos" element={<TermsOfUsePage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <EarlyAccessModal />
      <FeedbackWidget />
    </BrowserRouter>
  )
}
