import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const metrics = [
  { label: 'Velocidade', value: '3.2x', sub: 'mais rápido', color: '#FF6B6B' },
  { label: 'Precisão', value: '99.7%', sub: 'de acurácia', color: '#4ECDC4' },
  { label: 'Economia', value: '68%', sub: 'redução de custo', color: '#A78BFA' },
]

export function PerformanceMetricsPreview() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % metrics.length)
    }, 2600)
    return () => clearInterval(timer)
  }, [])

  const active = metrics[activeIndex]

  return (
    <div className="relative w-full max-w-[280px] mx-auto mt-16 pb-8 h-[200px] flex items-end justify-center">
      {/* Glow behind the active card */}
      <motion.div
        animate={{ backgroundColor: `${active.color}15` }}
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-20 blur-3xl rounded-full pointer-events-none"
        transition={{ duration: 0.8 }}
      />

      <div className="relative z-10 w-full">
        {/* Big metric display */}
        <div className="relative mb-4 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-1">
                {active.label}
              </span>
              <span
                className="text-4xl font-bold tracking-tight"
                style={{ color: active.color }}
              >
                {active.value}
              </span>
              <span className="text-[12px] text-neutral-400 mt-0.5">
                {active.sub}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2">
          {metrics.map((m, i) => (
            <button
              key={m.label}
              onClick={() => setActiveIndex(i)}
              className="relative p-1 cursor-pointer"
            >
              <motion.div
                animate={{
                  width: i === activeIndex ? 20 : 6,
                  backgroundColor: i === activeIndex ? m.color : 'rgba(255,255,255,0.15)',
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-1.5 rounded-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
