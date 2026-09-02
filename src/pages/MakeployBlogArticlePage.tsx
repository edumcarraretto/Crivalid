import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, CheckCircle2, Clock3, ExternalLink } from 'lucide-react'
import { GoogleBlogNavbar } from '@/components/google-blog/GoogleBlogNavbar'
import { blogArticles, getArticle } from '@/components/google-blog/blogArticleData'
import { SiteFooter } from '@/components/footer/SiteFooter'

export function MakeployBlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = getArticle(slug)

  useEffect(() => {
    if (!article) return
    const previousTitle = document.title
    document.title = `${article.title} | Makeploy`
    return () => { document.title = previousTitle }
  }, [article])

  if (!article) return <Navigate to="/blog" replace />

  const related = blogArticles.filter((item) => item.slug !== article.slug).slice(0, 2)

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <GoogleBlogNavbar />
      <main>
        <article>
          <header className="border-b border-neutral-100 bg-neutral-50/60">
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-blue-600">
                <ArrowLeft className="h-4 w-4" /> Voltar ao blog
              </Link>
              <div className="mt-8 h-1 w-24 rounded-full" style={{ background: 'var(--gradient-brand)' }} />
              <span className="mt-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{article.category}</span>
              <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{article.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">{article.description}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-500">
                <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> Atualizado em {article.updatedAt}</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4" /> {article.readTime} de leitura</span>
                <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> Equipe Makeploy</span>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
            <img src={article.imageUrl} alt="" className="aspect-[16/9] w-full rounded-[28px] border border-neutral-200 object-cover shadow-sm" />
          </div>

          <div className="mx-auto grid max-w-5xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_260px]">
            <div className="max-w-2xl">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                <h2 className="text-sm font-extrabold text-neutral-950">O que você vai levar deste artigo</h2>
                <ul className="mt-4 space-y-3">
                  {article.takeaways.map((item) => <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-neutral-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />{item}</li>)}
                </ul>
              </div>
              <div className="mt-10 space-y-10">
                {article.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-extrabold tracking-tight text-neutral-950">{section.heading}</h2>
                    <div className="mt-4 space-y-5">
                      {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-[17px] leading-8 text-neutral-700">{paragraph}</p>)}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <aside className="self-start rounded-2xl border border-neutral-200 bg-neutral-50 p-5 lg:sticky lg:top-24">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">Fontes consultadas</h2>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500">Referências externas para aprofundar os conceitos apresentados.</p>
              <ul className="mt-4 space-y-3">
                {article.sources.map((source) => (
                  <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="flex gap-2 text-xs font-bold leading-relaxed text-blue-700 hover:underline">{source.label}<ExternalLink className="mt-0.5 h-3 w-3 shrink-0" /></a></li>
                ))}
              </ul>
            </aside>
          </div>
        </article>

        <section className="border-t border-neutral-100 bg-neutral-50/70 py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight">Continue aprendendo</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} to={`/blog/${item.slug}`} className="group rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
                  <span className="text-xs font-bold text-blue-600">{item.category}</span>
                  <h3 className="mt-2 font-extrabold leading-snug group-hover:text-blue-600">{item.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold">Ler artigo <ArrowRight className="h-3.5 w-3.5" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
