import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Brain, Zap, Database } from 'lucide-react'

const memories = [
  { label: 'Preferências do usuário', value: 'Tom direto, sem jargões', icon: Brain },
  { label: 'Histórico de projeto', value: '14 projetos anteriores', icon: Database },
  { label: 'Contexto ativo', value: 'Campanha Q3 2025', icon: Zap },
]

export function MemoryContextPreview() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % memories.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full max-w-[300px] mx-auto mt-16 pb-8 h-[200px] flex flex-col items-center justify-end">
      {/* Glow */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-gradient-to-r from-purple-600/30 via-blue-500/20 to-cyan-400/30 blur-2xl rounded-full pointer-events-none" />

      <div className="relative z-10 w-full space-y-2">
        {memories.map((mem, index) => {
          const isActive = index === activeIndex
          const Icon = mem.icon

          return (
            <motion.div
              key={mem.label}
              animate={{
                opacity: isActive ? 1 : 0.35,
                scale: isActive ? 1 : 0.97,
                backgroundColor: isActive ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] cursor-pointer overflow-hidden"
              onClick={() => setActiveIndex(index)}
            >
              {/* Active left accent */}
              {isActive && (
                <motion.div
                  layoutId="memoryAccent"
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}

              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-500 ${isActive ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
                <Icon className={`w-4 h-4 transition-colors duration-500 ${isActive ? 'text-cyan-400' : 'text-neutral-500'}`} />
              </div>

              <div className="flex flex-col min-w-0">
                <span className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-500 ${isActive ? 'text-cyan-300/70' : 'text-neutral-500'}`}>
                  {mem.label}
                </span>
                <span className={`text-[13px] font-medium truncate transition-colors duration-500 ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                  {mem.value}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
