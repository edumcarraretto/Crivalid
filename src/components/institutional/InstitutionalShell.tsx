import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/navbar/Navbar'
import { SiteFooter } from '@/components/footer/SiteFooter'

interface InstitutionalShellProps {
  section: InstitutionalSection
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  updated?: string
}

type InstitutionalSection = 'about' | 'privacy' | 'terms' | 'cookies' | 'contact'

const INSTITUTIONAL_STEPS: Array<{ id: InstitutionalSection; label: string; href: string; color: string }> = [
  { id: 'about', label: 'Sobre', href: '/sobre', color: 'var(--color-brand-coral)' },
  { id: 'privacy', label: 'Privacidade', href: '/privacidade', color: 'var(--color-brand-blue)' },
  { id: 'terms', label: 'Termos', href: '/termos', color: 'var(--color-brand-green)' },
  { id: 'cookies', label: 'Cookies', href: '/cookies', color: 'var(--color-brand-yellow)' },
  { id: 'contact', label: 'Contato', href: '/contato', color: 'var(--color-brand-magenta)' },
]

export function InstitutionalShell({ section, eyebrow, title, description, children, updated }: InstitutionalShellProps) {
  const activeStep = INSTITUTIONAL_STEPS.find((step) => step.id === section) ?? INSTITUTIONAL_STEPS[0]
  const reduceMotion = useReducedMotion()

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <div aria-hidden="true" className="h-1" style={{ background: activeStep.color }} />

      <main id="conteudo-principal" className="pt-14">
        <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-50 px-4 py-14 sm:px-8 sm:py-20">
          <div aria-hidden="true" className="absolute -right-28 -top-32 h-72 w-72 rounded-full opacity-[0.08] blur-3xl" style={{ background: activeStep.color }} />
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mx-auto max-w-4xl">
            <nav aria-label="Áreas institucionais" className="mb-12 sm:mb-16">
              <ol className="grid grid-cols-5 gap-1.5 sm:gap-3">
                {INSTITUTIONAL_STEPS.map((step, index) => {
                  const isActive = step.id === section
                  return (
                    <li key={step.id}>
                      <Link to={step.href} aria-current={isActive ? 'page' : undefined} className="group block">
                        <span className="flex items-center gap-1.5">
                          <span className="text-[9px] font-bold tabular-nums text-neutral-400 sm:text-[10px]">0{index + 1}</span>
                          <span aria-hidden="true" className={`h-1 rounded-full transition-all duration-300 ${isActive ? 'flex-1 opacity-100' : 'flex-1 opacity-25 group-hover:opacity-60'}`} style={{ background: step.color }} />
                        </span>
                        <span className={`mt-2 hidden text-[10px] font-bold sm:block sm:text-xs ${isActive ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-700'}`}>{step.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: activeStep.color }}>{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl md:text-6xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">{description}</p>
            {updated && <p className="mt-5 text-xs font-bold text-neutral-500">Última atualização: {updated}</p>}
          </motion.div>
        </section>
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-8 sm:py-20">{children}</div>
      </main>
      <SiteFooter />
    </div>
  )
}

export function ContentSection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-neutral-200 py-9 first:pt-0 last:border-0 last:pb-0">
      <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-7 text-neutral-600 sm:text-base">{children}</div>
    </section>
  )
}

export function BulletList({ items }: { items: string[] }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-blue-600">{items.map((item) => <li key={item}>{item}</li>)}</ul>
}
