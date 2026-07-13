import { motion } from 'motion/react'

// ─── Avatar color palettes ───────────────────────────────────────────────────

const PEOPLE_COLORS = [
  'bg-amber-400',
  'bg-sky-400',
  'bg-rose-400',
  'bg-emerald-400',
]

const AGENT_COLORS = [
  'bg-violet-500',
  'bg-teal-400',
  'bg-fuchsia-400',
]

const PEOPLE_INITIALS = ['M', 'A', 'J', 'L']
const AGENT_INITIALS = ['α', 'β', 'γ']

// ─── Component ───────────────────────────────────────────────────────────────

interface InlineAvatarGroupProps {
  variant: 'people' | 'agents'
  className?: string
}

export function InlineAvatarGroup({ variant, className = '' }: InlineAvatarGroupProps) {
  const colors = variant === 'people' ? PEOPLE_COLORS : AGENT_COLORS
  const initials = variant === 'people' ? PEOPLE_INITIALS : AGENT_INITIALS

  return (
    <span
      className={`inline-flex items-center align-middle -space-x-1.5 ${className}`}
      role="img"
      aria-label={variant === 'people' ? 'Avatares de pessoas' : 'Avatares de agentes de IA'}
    >
      {colors.map((color, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
          className={`
            inline-flex items-center justify-center
            w-7 h-7 sm:w-8 sm:h-8
            rounded-full ${color}
            border-2 border-white
            text-[10px] sm:text-[11px] font-bold text-white
            shadow-sm
          `}
        >
          {initials[i]}
        </motion.span>
      ))}
    </span>
  )
}
