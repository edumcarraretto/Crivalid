import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { InlineAvatarGroup } from './InlineAvatarGroup'

// ─── Section ─────────────────────────────────────────────────────────────────

export function WorkflowHeroSection() {
  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="relative w-full bg-white overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-20 sm:pt-28 md:pt-32 pb-20 sm:pb-28 md:pb-36">

        {/* ── Eyebrow ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm sm:text-[15px] font-medium text-neutral-900 tracking-tight italic mb-5 sm:mb-6"
        >
          Orquestre fluxos de trabalho
        </motion.p>

        {/* ── Headline ── */}
        <motion.h2
          id="workflow-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-center text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem] lg:text-[5.25rem] font-extrabold text-black leading-[0.95] tracking-[-0.03em] mb-6 sm:mb-8 md:mb-10"
        >
          Deixe o trabalho
          <br />
          fluir
        </motion.h2>

        {/* ── Subtitle with inline avatars ── */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="text-center text-lg sm:text-xl md:text-[1.4rem] font-medium text-neutral-900 leading-[1.55] max-w-lg mx-auto mb-8 sm:mb-10 md:mb-12"
        >
          Automatize a colaboração
          <br />
          entre pessoas{' '}
          <InlineAvatarGroup variant="people" className="mx-0.5" />
          {' '}e
          <br />
          agentes{' '}
          <InlineAvatarGroup variant="agents" className="mx-0.5" />
        </motion.p>

        {/* ── CTA button ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="flex justify-center mb-16 sm:mb-20 md:mb-24"
        >
          <a
            href="#"
            className="
              group inline-flex items-center gap-2
              px-7 py-3 sm:px-8 sm:py-3.5
              bg-black text-white text-sm sm:text-[15px] font-semibold
              rounded-full
              hover:bg-neutral-800
              active:scale-[0.97]
              transition-all duration-200
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
            "
          >
            Comece já
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        {/* ── Automation flow image ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex justify-center"
        >
          <img 
            src="/images/automation-flow.png" 
            alt="Fluxo de automação entre pessoas e agentes" 
            className="w-full max-w-[620px] h-auto"
          />
        </motion.div>

      </div>
    </section>
  )
}
