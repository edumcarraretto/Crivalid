import { AnimatedMetricValue } from './AnimatedMetricValue'
import type { PlatformMetric } from './metricsData'
import { motion } from 'motion/react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface MetricItemProps {
  metric: PlatformMetric
  /** Whether to render a right-side vertical divider (hidden on mobile) */
  showDivider: boolean
  index: number
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MetricItem({ metric, showDivider, index }: MetricItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.58, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col py-5 px-4 sm:px-5 md:py-6 md:px-5"
    >
      {/* Eyebrow label */}
      <span className="mb-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] text-violet-600">
        {metric.label}
      </span>

      {/* Animated stage number */}
      <p className="mb-3 whitespace-nowrap text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] font-extrabold leading-[1] tracking-tight text-neutral-900 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
        <AnimatedMetricValue
          target={metric.numericValue}
          startFrom={metric.startFrom}
          decimals={metric.decimals}
          prefix={metric.prefix}
          suffix={metric.suffix}
          displayValue={metric.displayValue}
          duration={2200}
        />
      </p>

      {/* Spacer pushes description to the same vertical position across columns */}
      <div className="flex-1" />

      {/* Description */}
      <p className="max-w-[220px] text-[12px] sm:text-[13px] leading-relaxed text-neutral-500">
        {metric.description}
      </p>

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
