import { useEffect, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export interface DocumentSection {
  id: string
  label: string
}

interface LegalDocumentLayoutProps {
  sections: DocumentSection[]
  accent: string
  children: ReactNode
}

export function LegalDocumentLayout({ sections, accent, children }: LegalDocumentLayoutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      setProgress(available > 0 ? Math.min(100, Math.max(0, (window.scrollY / available) * 100)) : 100)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useEffect(() => {
    const elements = sections.map(({ id }) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-18% 0px -65% 0px', threshold: 0 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [sections])

  return (
    <>
      <div className="fixed left-0 right-0 top-16 z-30 h-0.5 bg-neutral-200" aria-hidden="true">
        <div className="h-full origin-left transition-[width] duration-100" style={{ width: `${progress}%`, background: accent }} />
      </div>

      <details className="group mb-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-neutral-900">
          Nesta página
          <ChevronDown size={17} className="transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <nav aria-label="Sumário da página" className="mt-4 border-t border-neutral-200 pt-3">
          <ol className="space-y-1">{sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className={`block rounded-lg px-3 py-2 text-sm transition ${activeId === section.id ? 'bg-white font-bold text-neutral-900 shadow-sm' : 'text-neutral-500'}`}>{section.label}</a></li>)}</ol>
        </nav>
      </details>

      <div className="lg:grid lg:grid-cols-[210px_1fr] lg:gap-14">
        <aside className="hidden lg:block">
          <nav aria-label="Sumário da página" className="sticky top-28 border-l border-neutral-200 py-1">
            <p className="mb-4 pl-5 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">Nesta página</p>
            <ol className="space-y-1">
              {sections.map((section) => {
                const isActive = activeId === section.id
                return <li key={section.id}><a href={`#${section.id}`} aria-current={isActive ? 'location' : undefined} className={`relative block py-2 pl-5 text-xs leading-5 transition-colors ${isActive ? 'font-bold text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'}`}><span aria-hidden="true" className={`absolute -left-px top-2 h-5 w-0.5 rounded-full transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ background: accent }} />{section.label}</a></li>
              })}
            </ol>
          </nav>
        </aside>
        <article>{children}</article>
      </div>
    </>
  )
}
