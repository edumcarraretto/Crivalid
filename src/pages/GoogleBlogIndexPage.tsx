import { GoogleBlogNavbar } from '@/components/google-blog/GoogleBlogNavbar'
import { HeroSpotlightSection } from '@/components/google-blog/HeroSpotlightSection'
import { PhoneCarouselSection } from '@/components/google-blog/PhoneCarouselSection'
import { FeaturedCardsGrid } from '@/components/google-blog/FeaturedCardsGrid'
import { ResearchHighlightSection } from '@/components/google-blog/ResearchHighlightSection'
import { AllArticlesSection } from '@/components/google-blog/AllArticlesSection'
import { EditorialTrustStrip } from '@/components/google-blog/EditorialTrustStrip'
import { SiteFooter } from '@/components/footer/SiteFooter'

export function GoogleBlogIndexPage() {
  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = description?.content
    document.title = 'Ideias & Pesquisa | Blog da Makeploy'
    if (description) description.content = 'Conteúdo prático sobre validação de ideias, inteligência artificial, mercado e MVP com fontes verificáveis.'
    return () => {
      document.title = previousTitle
      if (description && previousDescription) description.content = previousDescription
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-neutral-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* 0. Top Navbar */}
      <GoogleBlogNavbar />

      <main className="flex-1">
        {/* 1. Hero Spotlight de Abertura (Imagem 1) */}
        <HeroSpotlightSection />

        {/* 2. Novidades da Makeploy - Carrossel com Celular (Imagem 2) */}
        <PhoneCarouselSection />

        {/* 3. Grade de 4 Cards Verticais com 'Leia o post' (Imagem 3) */}
        <FeaturedCardsGrid />

        {/* 4. Pesquisa - Card Horizontal Amplo (Imagem 4) */}
        <ResearchHighlightSection />

        <EditorialTrustStrip />

        {/* 5. Todas as notícias com Filtro Lateral em Pílulas (Imagem 5) */}
        <AllArticlesSection />
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
import { useEffect } from 'react'
