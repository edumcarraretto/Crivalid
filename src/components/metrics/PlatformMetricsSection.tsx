import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { MetricItem } from './MetricItem'
import { DEMO_METRICS } from './metricsData'
import type { PlatformMetric } from './metricsData'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlatformMetricsSectionProps {
  /**
   * Metric data to display. Defaults to the demonstrative dataset.
   * Pass real data here once the Supabase integration is wired up.
   */
  metrics?: PlatformMetric[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PlatformMetricsSection({
  metrics = DEMO_METRICS,
}: PlatformMetricsSectionProps) {
  return (
    <section
      id="platform-metrics"
      aria-labelledby="metrics-heading"
      className="w-full bg-white px-5 py-14 sm:px-8 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* ── Header: title + description ── */}
        <div className="w-full pt-6 pb-12 md:pt-8 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            {/* Heading + description */}
            <div className="flex flex-col items-center px-4 max-w-3xl">
              <h2
                id="metrics-heading"
                className="text-[1.75rem] sm:text-[2.125rem] md:text-[2.5rem] lg:text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-neutral-900"
              >
                Da ideia ao lançamento,
                <br />
                resultados que você pode medir.
              </h2>

              <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-neutral-500">
                Crie, automatize e publique em um só lugar. Acompanhe o impacto da
                plataforma em cada etapa do seu projeto.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Metrics grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="
            grid grid-cols-1 divide-y divide-neutral-200
            sm:grid-cols-2 sm:divide-y-0
            md:grid-cols-4 md:divide-y-0
            mb-12 md:mb-16
          "
        >
          {metrics.map((metric, index) => (
            <MetricItem
              key={metric.id}
              metric={metric}
              showDivider={index < metrics.length - 1}
            />
          ))}
        </motion.div>

        {/* ── CTA button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <a
            href="#comece"
            className="
              group inline-flex items-center gap-2
              rounded-full bg-neutral-900 px-8 py-3.5
              text-[15px] font-semibold text-white
              transition-all duration-200
              hover:bg-neutral-800 active:scale-[0.97]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900
            "
          >
            agora
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
