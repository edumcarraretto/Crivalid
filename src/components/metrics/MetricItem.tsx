import { AnimatedMetricValue } from '@/components/metrics/AnimatedMetricValue'
import type { PlatformMetric } from '@/components/metrics/metricsData'
import { motion } from 'motion/react'
import { useCallback, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface MetricItemProps {
  metric: PlatformMetric
  /** Whether to render a right-side vertical divider (hidden on mobile) */
  showDivider: boolean
  index: number
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MetricItem({ metric, showDivider, index }: MetricItemProps) {
  const [isComplete, setIsComplete] = useState(false)
  const handleComplete = useCallback(() => setIsComplete(true), [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.58, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`
        group relative flex flex-col justify-between
        py-5 px-3.5 sm:px-5 md:py-6 md:px-6
        transition-colors duration-200
        ${index % 2 === 0 ? 'border-r border-neutral-200/80 md:border-r-0' : ''}
        ${index < 2 ? 'border-b border-neutral-200/80 md:border-b-0' : ''}
      `}
    >
      <div>
        {/* Eyebrow label */}
        <span className="mb-2.5 sm:mb-3 inline-block text-[9.5px] sm:text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">
          {metric.label}
        </span>

        {/* Animated stage number */}
        <motion.p
          animate={isComplete ? { scale: [1, 1.035, 1] } : undefined}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2 sm:mb-3 whitespace-nowrap text-[1.35rem] xs:text-[1.55rem] sm:text-[2rem] md:text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-neutral-900 transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
        >
          <AnimatedMetricValue
            target={metric.numericValue}
            startFrom={metric.startFrom}
            decimals={metric.decimals}
            prefix={metric.prefix}
            suffix={metric.suffix}
            displayValue={metric.displayValue}
            duration={Math.min(metric.duration ?? 2200, 2400)}
            onComplete={handleComplete}
          />
        </motion.p>
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.06 }}
        className="mt-1.5 sm:mt-2 text-[11.5px] sm:text-[13px] leading-relaxed text-neutral-500 line-clamp-3 sm:line-clamp-none"
      >
        {metric.description}
      </motion.p>

      {/* Vertical divider — visible only on md+ when not last item */}
      {showDivider && (
        <span
          aria-hidden="true"
          className="absolute right-0 top-5 bottom-5 hidden w-px bg-neutral-200 md:block"
        />
      )}
    </motion.div>
  )
}
