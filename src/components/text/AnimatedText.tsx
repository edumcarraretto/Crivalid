import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

interface AnimatedTextProps {
  text: string
  className?: string
  animationDuration?: number
  delayMultiplier?: number
}

/**
 * A restrained typographic pulse for short display words.
 *
 * MAKEPLOY currently ships static font files, so this uses optical scale,
 * spacing and colour instead of pretending the font has a variable axis.
 */
export function AnimatedText({
  text,
  className = '',
  animationDuration = 2.4,
  delayMultiplier = 0.08,
}: AnimatedTextProps) {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(containerRef, { margin: '120px 0px 120px 0px' })

  return (
    <span ref={containerRef} className={`relative inline-flex whitespace-pre ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative inline-flex">
        {Array.from(text).map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, y: 12, rotateX: -35 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="inline-block origin-bottom bg-gradient-to-b from-neutral-950 via-neutral-900 to-blue-600 bg-clip-text text-transparent"
          animate={
            reduceMotion || !isInView
              ? undefined
              : {
                  y: [0, -2, 0],
                  scaleY: [1, 1.035, 1],
                }
          }
          transition={{
            duration: animationDuration,
            delay: index * delayMultiplier,
            repeat: Infinity,
            repeatDelay: 2.6,
            ease: [0.37, 0, 0.63, 1],
          }}
        >
          {character}
        </motion.span>
        ))}
        <motion.span
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-[0.04em] -bottom-[0.08em] h-[0.055em] origin-left rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-transparent"
        />
      </span>
    </span>
  )
}
