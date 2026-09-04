import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ContentSection, InstitutionalShell } from '@/components/institutional/InstitutionalShell'
import { usePageMetadata } from '@/hooks/usePageMetadata'
import { SITE } from '@/lib/site'

const principles = [
  { number: '01', title: 'Contexto que permanece', text: 'Decisões, arquivos e histórico acompanham todo o projeto.', color: 'var(--color-brand-coral)' },
  { number: '02', title: 'Liberdade para criar', text: 'Comece visualmente e assuma o código quando quiser.', color: 'var(--color-brand-green)' },
  { number: '03', title: 'IA que entende', text: 'Cada próximo passo considera tudo o que veio antes.', color: 'var(--color-brand-blue)' },
]

function PrinciplesFlow() {
  const reduceMotion = useReducedMotion()

  return (
    <section aria-labelledby="principles-heading" className="border-b border-neutral-200 py-14 sm:py-20">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">Princípios do produto</p>
      <h2 id="principles-heading" className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl">Como pensamos a MAKEPLOY.</h2>
      <p className="mt-4 max-w-lg text-sm leading-6 text-neutral-500 sm:text-base">Três princípios conectam cada decisão do produto.</p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.16 } } }}
        className="relative mt-12 md:mt-16"
      >
        <div aria-hidden="true" className="absolute bottom-5 left-[5px] top-[5px] w-px bg-neutral-200 md:hidden" />
        <motion.div aria-hidden="true" initial={reduceMotion ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="absolute bottom-5 left-[5px] top-[5px] w-px origin-top md:hidden" style={{ background: 'linear-gradient(to bottom, var(--color-brand-coral), var(--color-brand-green), var(--color-brand-blue))' }} />
        <div aria-hidden="true" className="absolute left-[5px] right-[5px] top-[5px] hidden h-px bg-neutral-200 md:block" />
        <motion.div aria-hidden="true" initial={reduceMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }} className="absolute left-[5px] right-[5px] top-[5px] hidden h-px origin-left md:block" style={{ background: 'linear-gradient(to right, var(--color-brand-coral), var(--color-brand-green), var(--color-brand-blue))' }} />

        <div className="grid gap-10 md:grid-cols-3 md:gap-10">
          {principles.map(({ number, title, text, color }) => (
            <motion.article key={title} variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 12 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="relative grid grid-cols-[12px_1fr] gap-5 md:block">
              <span aria-hidden="true" className="relative z-10 mt-0.5 h-[11px] w-[11px] rounded-full ring-4 ring-white md:mt-0" style={{ backgroundColor: color, boxShadow: `0 0 0 1px ${color}` }} />
              <div className="md:mt-7">
                <span className="text-[10px] font-bold tracking-[0.18em] text-neutral-400">{number}</span>
                <h3 className="mt-2 text-lg font-extrabold tracking-tight text-neutral-900 sm:text-xl">{title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-600 sm:text-[15px]">{text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export function AboutPage() {
  usePageMetadata('Sobre', 'Conheça a visão, os princípios e as informações institucionais da MAKEPLOY.')
  return (
    <InstitutionalShell section="about" eyebrow="Sobre a MAKEPLOY" title="Uma ideia. Um só lugar." description="A MAKEPLOY reúne o ciclo de um produto digital — da primeira ideia à evolução contínua — em um ambiente conectado.">
      <ContentSection title="Nossa visão"><p>Queremos diminuir a distância entre imaginar e colocar algo útil no mundo. A plataforma está sendo desenhada para pessoas que preferem começar visualmente, equipes que precisam colaborar e profissionais que desejam controle técnico quando o projeto cresce.</p></ContentSection>
      <PrinciplesFlow />
      <ContentSection title="Informações da empresa">
        <dl className="grid gap-5 rounded-2xl border border-neutral-200 bg-white p-6 sm:grid-cols-2">
          <div><dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">Nome do produto e marca</dt><dd className="mt-1 font-bold">{SITE.legalName}</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">País de operação</dt><dd className="mt-1 font-bold">{SITE.country}</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">Site oficial</dt><dd className="mt-1 font-bold">www.makeploy.com</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">Contato institucional</dt><dd className="mt-1"><a href={`mailto:${SITE.email}`} className="font-bold text-blue-600 hover:underline">{SITE.email}</a></dd></div>
        </dl>
        <p>A MAKEPLOY está em fase de desenvolvimento e acesso antecipado. Dados cadastrais adicionais serão publicados nesta página quando aplicáveis à operação comercial.</p>
      </ContentSection>
      <div className="relative mt-10 overflow-hidden rounded-3xl bg-neutral-950 p-7 text-white sm:p-10">
        <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-1" style={{ background: 'var(--gradient-brand)' }} />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Construa com a gente</p>
        <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Sua experiência pode ajudar a definir o produto.</h2>
        <Link to="/contato" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-neutral-950 transition hover:bg-blue-50">
          Falar com a MAKEPLOY <ArrowRight size={16} />
        </Link>
      </div>
    </InstitutionalShell>
  )
}
