import { motion } from 'motion/react'
import type { CreationPillar } from './creationData'

// ─── Types ────────────────────────────────────────────────────────────────────

interface TechnologyPillarCardProps {
  pillar: CreationPillar
  index: number
  isLast: boolean
  children: React.ReactNode
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TechnologyPillarCard({
  pillar,
  index,
  isLast,
  children,
}: TechnologyPillarCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.15 * index, ease: 'easeOut' }}
      className={[
        'group relative flex flex-col',
        // Vertical divider on the right (except last card)
        !isLast ? 'md:border-r md:border-white/[0.10]' : '',
      ].join(' ')}
    >
      {/* Hover glow — subtle gradient behind card on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col h-full px-5 py-6 md:px-6 md:py-8">
        {/* Eyebrow */}
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.15em] ${pillar.eyebrowColor} mb-4`}
        >
          {pillar.eyebrow}
        </span>

        {/* Description */}
        <p className="text-[13px] md:text-sm text-[#B4B4B4] leading-relaxed mb-6">
          {pillar.description}
        </p>

        {/* Mini-interface preview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.25 + 0.1 * index }}
          className="mt-auto h-[180px] sm:h-[200px] md:h-[220px] group-hover:-translate-y-1 transition-transform duration-300"
        >
          {children}
        </motion.div>
      </div>

      {/* Bottom border for mobile (stacked layout) */}
      {!isLast && (
        <div className="md:hidden h-px w-full bg-white/[0.10]" />
      )}
    </motion.article>
  )
}
