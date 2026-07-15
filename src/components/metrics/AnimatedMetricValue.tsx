import { useEffect, useRef, useState } from 'react'

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
  /** Duration of the count-up animation in ms (default 2400) */
  duration?: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Ease-out cubic: decelerates towards the end for a polished feel. */
function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

/**
 * Format a number for display during the count-up animation.
 *
 * - Integer values (decimals=0): uses pt-BR locale → "10.000"
 * - Decimal values (decimals>0): formats with comma separator → "2,4"
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
  duration = 2400,
}: AnimatedMetricValueProps) {
  const initialDisplay = prefix + formatAnimatedNumber(startFrom, decimals) + suffix
  const [display, setDisplay] = useState(initialDisplay)
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
      setDisplay(displayValue)
      hasAnimated.current = true
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
            setDisplay(prefix + formatAnimatedNumber(currentValue, decimals) + suffix)
            rafRef.current = requestAnimationFrame(step)
          } else {
            // Land exactly on the designed display value
            setDisplay(displayValue)
          }
        }

        rafRef.current = requestAnimationFrame(step)
      },
      { threshold: 0.2 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, startFrom, decimals, prefix, suffix, displayValue, duration])

  return (
    <span
      ref={containerRef}
      // aria-label always carries the final readable value so screen
      // readers never announce intermediate animation frames.
      aria-label={displayValue}
    >
      {display}
    </span>
  )
}
