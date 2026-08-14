import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface AnimatedMetricValueProps {
  /** The numeric target to count up to */
  target: number
  /** Starting value for the animation (defaults to 0) */
  startFrom?: number
  /** Number of decimal places to display during animation (default 0) */
  decimals?: number
  /** Prefix rendered before the number (e.g. "R$ ") */
  prefix?: string
  /** Suffix appended after the number (e.g. "+") */
  suffix?: string
  /** Exact formatted string shown at animation end and used for accessibility */
  displayValue: string
  /** Duration of the count-up animation in ms (default 7000) */
  duration?: number
  /** Called when the counter lands on its final value. */
  onComplete?: () => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Ease-out cubic: smooth progression that keeps counting visibly alive across longer durations. */
function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

/**
 * Format a number for display during the count-up animation.
 *
 * - Integer values (decimals=0): uses pt-BR locale → "10.000"
 * - Decimal values (decimals>0): formats with comma separator → "80,0" -> "99,9"
 */
function formatAnimatedNumber(n: number, decimals: number): string {
  if (decimals > 0) {
    return n.toFixed(decimals).replace('.', ',')
  }
  return Math.floor(n).toLocaleString('pt-BR')
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AnimatedMetricValue({
  target,
  startFrom = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  displayValue,
  duration = 7000,
  onComplete,
}: AnimatedMetricValueProps) {
  const [display, setDisplay] = useState(formatAnimatedNumber(startFrom, decimals))
  const hasAnimated = useRef(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number>(0)

  // Detect prefers-reduced-motion once at mount
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (hasAnimated.current) return

    const el = containerRef.current
    if (!el) return

    // If user prefers reduced motion, show final value immediately
    if (prefersReducedMotion.current) {
      setDisplay(formatAnimatedNumber(target, decimals))
      hasAnimated.current = true
      onComplete?.()
      return
    }

    const range = target - startFrom

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return

        observer.disconnect()
        hasAnimated.current = true

        let start: number | null = null

        function step(timestamp: number) {
          if (start === null) start = timestamp
          const elapsed = timestamp - start
          const progress = Math.min(elapsed / duration, 1)
          const easedProgress = easeOutCubic(progress)
          const currentValue = startFrom + easedProgress * range

          if (progress < 1) {
            setDisplay(formatAnimatedNumber(currentValue, decimals))
            rafRef.current = requestAnimationFrame(step)
          } else {
            // Land exactly on the designed display value
            setDisplay(formatAnimatedNumber(target, decimals))
            onComplete?.()
          }
        }

        rafRef.current = requestAnimationFrame(step)
      },
      { threshold: 0.15 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, startFrom, decimals, displayValue, duration, onComplete])

  return (
    <span
      ref={containerRef}
      aria-label={displayValue}
    >
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.3 }}
      >
        {prefix}
      </motion.span>
      <motion.span
        aria-hidden="true"
        initial={{ filter: 'blur(5px)' }}
        whileInView={{ filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: Math.min(duration / 1000, 2.4), ease: 'easeOut' }}
        className="inline-block tabular-nums"
      >
        {display}
      </motion.span>
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: 8, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: Math.min(duration / 1000, 2.4) * 0.72 }}
      >
        {suffix}
      </motion.span>
    </span>
  )
}
