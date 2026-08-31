import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { MetricItem } from './MetricItem'
import { DEMO_METRICS } from './metricsData'
import type { PlatformMetric } from './metricsData'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlatformMetricsSectionProps {
  /**
   * Metric data to display. Defaults to the demonstrative dataset.
   */
  metrics?: PlatformMetric[]
}

const TITLE_TEXT = 'Escala global,'

function AnimatedTitleLine() {
  return (
    <span aria-label={TITLE_TEXT} className="inline-flex">
      {Array.from(TITLE_TEXT).map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          aria-hidden="true"
          initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-pre"
        >
          {character}
        </motion.span>
      ))}
    </span>
  )
}

function ShimmerHighlight() {
  return (
    <motion.span
      initial={{ opacity: 0.45, backgroundPosition: '100% 50%' }}
      whileInView={{ opacity: 1, backgroundPosition: '0% 50%' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.15, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block bg-[linear-gradient(105deg,#047857_0%,#10b981_36%,#65a30d_68%,#059669_100%)] bg-[length:210%_100%] bg-clip-text text-transparent"
    >
      impacto que você pode medir.
    </motion.span>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PlatformMetricsSection({
  metrics = DEMO_METRICS,
}: PlatformMetricsSectionProps) {
  return (
    <section
      id="platform-metrics"
      aria-labelledby="metrics-heading"
      className="w-full bg-white px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* ── Header: title + description ── */}
        <div className="w-full pt-4 pb-12 md:pt-6 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center px-4 max-w-3xl">
              <h2
                id="metrics-heading"
                className="text-[1.75rem] sm:text-[2.125rem] md:text-[2.5rem] lg:text-[2.75rem] font-extrabold leading-[1.08] tracking-[-0.025em] text-neutral-900"
              >
                <AnimatedTitleLine />
                <br />
                <ShimmerHighlight />
              </h2>

              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-neutral-500">
                Criadores e empresas ao redor do mundo acelerando lançamentos, economizando
                tempo e escalando sem fronteiras.
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
            grid grid-cols-2 gap-0
            md:grid-cols-4
            mb-12 md:mb-16
          "
        >
          {metrics.map((metric, index) => (
            <MetricItem
              key={metric.id}
              metric={metric}
              index={index}
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
              text-[15px] font-bold text-white
              transition-all duration-200
              hover:bg-neutral-800 active:scale-[0.97]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900
            "
          >
            Começar de onde estou
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

export default PlatformMetricsSection
