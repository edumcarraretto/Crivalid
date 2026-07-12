import { motion } from 'motion/react'
import { creationPillars } from './creationData'
import { TechnologyPillarCard } from './TechnologyPillarCard'
import { NoCodeBuilderPreview } from './NoCodeBuilderPreview'
import { AIModelsPreview } from './AIModelsPreview'
import { IntegratedCodeEditorPreview } from './IntegratedCodeEditorPreview'

// ─── Preview registry ─────────────────────────────────────────────────────────

const PILLAR_PREVIEWS: Record<string, React.ReactNode> = {
  'no-code': <NoCodeBuilderPreview />,
  ai: <AIModelsPreview />,
  code: <IntegratedCodeEditorPreview />,
}

// ─── Crivalid Logo (bolt) ─────────────────────────────────────────────────────

function CrivalidBolt({ className }: { className?: string }) {
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
        fill="#863bff"
      />
    </svg>
  )
}

// ─── Noise texture (inline SVG filter) ────────────────────────────────────────

function NoiseOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]">
      <svg width="100%" height="100%">
        <filter id="creation-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#creation-noise)" />
      </svg>
    </div>
  )
}

// ─── Aurora glow ──────────────────────────────────────────────────────────────

function AuroraGlow() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] overflow-hidden z-0">
      {/* Blue */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] opacity-20"
        style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)' }}
      />
      {/* Violet */}
      <div
        className="absolute top-10 left-[35%] w-[500px] h-[250px] rounded-full blur-[100px] opacity-15"
        style={{ background: 'radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)' }}
      />
      {/* Pink */}
      <div
        className="absolute top-28 left-[60%] w-[400px] h-[200px] rounded-full blur-[100px] opacity-12"
        style={{ background: 'radial-gradient(ellipse, #ec4899 0%, transparent 70%)' }}
      />
      {/* Warm red accent */}
      <div
        className="absolute top-16 left-[55%] w-[250px] h-[150px] rounded-full blur-[80px] opacity-8"
        style={{ background: 'radial-gradient(ellipse, #ef4444 0%, transparent 70%)' }}
      />
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function CreationTechnologySection() {
  return (
    <section
      id="tecnologias"
      aria-labelledby="creation-heading"
      className="relative w-full overflow-hidden"
    >
      {/* Top transition: white → dark */}
      <div className="h-24 sm:h-32 bg-gradient-to-b from-white to-[#050508]" />

      {/* Main dark area */}
      <div className="relative bg-[#050508] pb-8 sm:pb-12">
        <AuroraGlow />
        <NoiseOverlay />

        {/* ── Header ──────────────────────────────── */}
        <div className="relative z-20 mx-auto max-w-4xl px-6 pt-12 pb-14 sm:pt-16 sm:pb-20 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2.5 mb-8"
          >
            <CrivalidBolt />
            <span className="text-lg font-bold text-white tracking-tight">
              Crivalid
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="creation-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-serif text-white leading-[1.12] tracking-tight"
          >
            Da ideia ao{' '}
            <em className="italic bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent not-italic font-bold">
              código
            </em>
            ,
            <br className="hidden sm:block" />{' '}
            tudo no mesmo lugar.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed"
          >
            Crie visualmente, trabalhe com as melhores IAs e tenha controle
            completo sobre o código da sua criação.
          </motion.p>

          {/* Tech badges line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-6 flex items-center justify-center gap-3 sm:gap-5"
            aria-label="Tecnologias principais"
          >
            {['NO-CODE', 'IA MULTIMODELO', 'EDITOR INTEGRADO'].map(
              (label, i) => (
                <span key={label} className="flex items-center gap-3 sm:gap-5">
                  <span className="text-[10px] sm:text-xs font-mono font-medium text-neutral-500 uppercase tracking-[0.18em]">
                    {label}
                  </span>
                  {i < 2 && (
                    <span className="text-neutral-600 text-[10px]" aria-hidden="true">
                      •
                    </span>
                  )}
                </span>
              ),
            )}
          </motion.div>
        </div>

        {/* ── Cards grid ──────────────────────────── */}
        <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-xl border border-white/[0.10] overflow-hidden bg-[#0a0a0c]/80 backdrop-blur-sm">
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
      </div>

      {/* Bottom transition: dark → white */}
      <div className="h-24 sm:h-32 bg-gradient-to-b from-[#050508] to-white" />
    </section>
  )
}
