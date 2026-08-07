import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface GradientTextProps {
  children: ReactNode
  className?: string
  inverse?: boolean
}

export function GradientText({ children, className = '', inverse = false }: GradientTextProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: inverse
          ? 'linear-gradient(105deg, #ffffff 5%, #9dceff 38%, #ffffff 65%, #66b2ff 100%)'
          : 'var(--gradient-brand)',
        backgroundSize: reduceMotion ? '100% 100%' : '220% 100%',
      }}
      initial={reduceMotion ? false : { backgroundPosition: '100% 50%', opacity: 0.72 }}
      whileInView={{ backgroundPosition: '0% 50%', opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  )
}
