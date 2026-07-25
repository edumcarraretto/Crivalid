import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DeepSearchStatusPanel } from './DeepSearchStatusPanel'

/* ── Background analysis lines (simulated deep context scan) ── */
const BG_LINES = [
  { label: 'Crescimento e Aquisição', accent: 'text-emerald-400/60' },
  { label: 'Estrutura da Página', accent: 'text-purple-400/60' },
]

const BG_CONTENT = [
  'A taxa de conversão se manteve em 4,2x em todas as buscas, uma melhoria significativa em relação à semana passada.',
  'O fluxo principal do projeto apresenta oportunidades claras de otimização na hierarquia de informações.',
]

/* ── Status phrases that cycle in the bottom bar ── */
const STATUS_PHRASES = [
  'Analisando contexto e referências...',
  'Buscando referências relevantes...',
  'Mapeando ideias e direções...',
  'Conectando contexto e intenção...',
  'Investigando a melhor abordagem...',
]

export function DeepSearchPreview() {
  const [statusIndex, setStatusIndex] = useState(0)
  const [progressWidth, setProgressWidth] = useState(0)
  const [activeLine, setActiveLine] = useState(0)

  /* Cycle status text */
  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_PHRASES.length)
      setProgressWidth(0)
    }, 3800)
    return () => clearInterval(timer)
  }, [])

  /* Animate progress bar */
  useEffect(() => {
    const t = setTimeout(() => setProgressWidth(85 + Math.random() * 12), 200)
    return () => clearTimeout(t)
  }, [statusIndex])

  /* Highlight background lines one by one */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % BG_LINES.length)
    }, 1200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-full min-h-[180px] flex flex-col select-none">

      {/* ── BACKGROUND: Blurred analysis text layer ── */}
      <div className="absolute inset-0 z-0 flex flex-col gap-3 px-1 pt-1 pb-20 overflow-hidden pointer-events-none">
        {BG_LINES.map((line, i) => {
          const isActive = i === activeLine
          return (
            <motion.div
              key={i}
              animate={{ opacity: isActive ? 0.55 : 0.15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-0.5"
            >
              {/* Label */}
              <span className={`text-[9px] font-mono font-semibold tracking-wider uppercase ${isActive ? line.accent : 'text-white/20'} transition-colors duration-200`}>
                {line.label}
              </span>
              {/* Content text */}
              <p className={`text-[9.5px] leading-[1.4] font-medium tracking-tight ${isActive ? 'text-white/35 blur-[0.4px]' : 'text-white/10 blur-[1.5px]'} transition-all duration-200`}>
                {BG_CONTENT[i]}
              </p>
            </motion.div>
          )
        })}
        {/* Gradient fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-10" />
      </div>

      {/* ── FOREGROUND: SVG Status Panel ── */}
      <DeepSearchStatusPanel />

    </div>
  )
}


