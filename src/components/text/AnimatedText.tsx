import { motion, useReducedMotion } from 'motion/react'

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

  return (
    <span aria-label={text} className={`inline-flex whitespace-pre ${className}`}>
      {Array.from(text).map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          aria-hidden="true"
          className="inline-block origin-bottom"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -2, 0],
                  scaleY: [1, 1.055, 1],
                  color: [
                    'var(--color-text-primary)',
                    'var(--color-action)',
                    'var(--color-text-primary)',
                  ],
                }
          }
          transition={{
            duration: animationDuration,
            delay: index * delayMultiplier,
            repeat: Infinity,
            repeatDelay: 1.4,
            ease: [0.37, 0, 0.63, 1],
          }}
        >
          {character}
        </motion.span>
      ))}
    </span>
  )
}

