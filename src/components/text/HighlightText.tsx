import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface HighlightTextProps {
  children: ReactNode
  className?: string
  variant?: 'green' | 'yellow' | 'magenta' | 'blue' | 'orange' | 'coral'
}

const highlightVariants: Record<NonNullable<HighlightTextProps['variant']>, string> = {
  green: 'bg-green-400/45',
  yellow: 'bg-yellow-400/55',
  magenta: 'bg-pink-300/45',
  blue: 'bg-blue-300/45',
  orange: 'bg-orange-500/35',
  coral: 'bg-rose-300/45',
}

export function HighlightText({
  children,
  className = '',
  variant = 'yellow',
}: HighlightTextProps) {
  const reduceMotion = useReducedMotion()

  return (
    <span className="relative isolate inline-block whitespace-nowrap px-[0.08em]">
      <motion.span
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0.35 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute inset-x-[-0.02em] bottom-[0.06em] -z-10 h-[0.42em] origin-left -rotate-[0.5deg] rounded-[0.08em] will-change-transform ${highlightVariants[variant]} ${className}`}
      />
      <span className="relative">{children}</span>
    </span>
  )
}
