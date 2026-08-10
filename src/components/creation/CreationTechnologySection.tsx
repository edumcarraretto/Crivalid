import { motion } from 'motion/react'
import { FaApple, FaWindows, FaGooglePlay } from 'react-icons/fa'
import { creationPillars } from './creationData'
import { TechnologyPillarCard } from './TechnologyPillarCard'
import { NoCodeBuilderPreview } from './NoCodeBuilderPreview'
import { AIModelsPreview } from './AIModelsPreview'
import { IntegratedCodeEditorPreview } from './IntegratedCodeEditorPreview'
import { CreationShowcase } from '../showcase/CreationShowcase'
import { GradientText } from '../text/GradientText'

// ─── Preview registry ─────────────────────────────────────────────────────────

const PILLAR_PREVIEWS: Record<string, React.ReactNode> = {
  'no-code': <NoCodeBuilderPreview />,
  ai: <AIModelsPreview />,
  code: <IntegratedCodeEditorPreview />,
}

// ─── MAKEPLOY Logo (bolt) ─────────────────────────────────────────────────────

function MakeployBolt({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="31"
      viewBox="0 0 48 46"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"
        fill="var(--color-brand-blue)"
      />
    </svg>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function CreationTechnologySection() {
  return (
    <section
      id="tecnologias"
      aria-labelledby="creation-heading"
      className="relative w-full bg-white"
    >
      {/* Main dark area — inset card (top half, connects with MAKEPLOY section below) */}
      <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 relative bg-black rounded-t-[24px] sm:rounded-t-[32px] overflow-hidden">

        {/* ── Header ──────────────────────────────── */}
        <div className="relative z-20 mx-auto max-w-4xl px-6 pt-14 pb-14 sm:pt-20 sm:pb-20 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2.5 mb-8"
          >
            <MakeployBolt />
            <span className="text-lg font-bold text-white tracking-tight">
              MAKEPLOY
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="creation-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.12] tracking-tight"
          >
            Visual por escolha.
            <br className="hidden sm:block" />{' '}
            <GradientText inverse className="font-bold">
              Código por controle.
            </GradientText>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed"
          >
            Comece pela interface. Use IA para avançar. Abra o IDE quando precisar de profundidade.
          </motion.p>

          {/* Tech badges line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            aria-label="Plataformas disponíveis"
          >
            <span className="text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-[0.18em] mr-2">
              O PROJETO ACOMPANHA VOCÊ
            </span>
            <span className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-[0.18em]">
              <FaApple className="text-sm" /> MACOS
            </span>
            <span className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-[0.18em]">
              <FaApple className="text-sm" /> IOS
            </span>
            <span className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-[0.18em]">
              <FaWindows className="text-sm" /> WINDOWS
            </span>
            <span className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-[0.18em]">
              <FaGooglePlay className="text-sm" /> ANDROID
            </span>
          </motion.div>
        </div>

        {/* ── Cards grid ──────────────────────────── */}
        <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-xl border border-white/[0.10] overflow-hidden bg-black">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {creationPillars.map((pillar, i) => (
                <TechnologyPillarCard
                  key={pillar.id}
                  pillar={pillar}
                  index={i}
                  isLast={i === creationPillars.length - 1}
                >
                  {PILLAR_PREVIEWS[pillar.id]}
                </TechnologyPillarCard>
              ))}
            </div>
          </div>
        </div>

        {/* ── Creation Showcase (design gallery) ── */}
        <CreationShowcase />
      </div>
    </section>
  )
}
