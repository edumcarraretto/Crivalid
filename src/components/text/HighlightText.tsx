import type { ReactNode } from 'react'

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
  return (
    <span className="relative isolate inline-block px-[0.06em]">
      <span
        aria-hidden="true"
        className={`absolute inset-x-[-0.04em] bottom-[0.02em] -z-10 h-[0.48em] origin-left -rotate-[0.6deg] rounded-[0.08em] ${highlightVariants[variant]} ${className}`}
      />
      <span className="relative">{children}</span>
    </span>
  )
}

