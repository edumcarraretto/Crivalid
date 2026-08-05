import { AnimatedMetricValue } from './AnimatedMetricValue'
import type { PlatformMetric } from './metricsData'

// ─── Types ────────────────────────────────────────────────────────────────────

interface MetricItemProps {
  metric: PlatformMetric
  /** Whether to render a right-side vertical divider (hidden on mobile) */
  showDivider: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MetricItem({ metric, showDivider }: MetricItemProps) {
  return (
    <div className="relative flex flex-col py-5 px-4 sm:px-5 md:py-6 md:px-5">
      {/* Eyebrow label */}
      <span className="mb-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] text-violet-600">
        {metric.label}
      </span>

      {/* Animated number — whitespace-nowrap prevents "R$ 2.400.000+" from breaking */}
      <p className="mb-3 whitespace-nowrap text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] font-extrabold leading-[1] tracking-tight text-neutral-900">
        <AnimatedMetricValue
          target={metric.numericValue}
          startFrom={metric.startFrom}
          decimals={metric.decimals}
          prefix={metric.prefix}
          suffix={metric.suffix}
          displayValue={metric.displayValue}
          duration={30000}
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
    </div>
  )
}
