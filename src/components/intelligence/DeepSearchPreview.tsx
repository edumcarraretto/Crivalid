import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DeepSearchStatusPanel } from './DeepSearchStatusPanel'

/* ── Background analysis lines (simulated deep context scan) ── */
const BG_LINES = [
  { label: 'Crescimento e Aquisição', accent: 'text-emerald-400/60' },
  { label: 'Estrutura da Página', accent: 'text-cyan-400/60' },
  { label: 'Padrões de Interface', accent: 'text-indigo-400/60' },
  { label: 'Arquitetura de Informação', accent: 'text-purple-400/60' },
]

const BG_CONTENT = [
  'A taxa de conversão se manteve em 4,2x em todas as buscas, uma melhoria significativa em relação à semana passada.',
  'O fluxo principal do projeto apresenta oportunidades claras de otimização na hierarquia de informações.',
  'Componentes com alta interatividade estão gerando 3x mais engajamento do que elementos estáticos na jornada.',
  'A navegação lateral reduz a fricção cognitiva, sendo recomendada para interfaces com mais de 4 níveis de profundidade.',
]



export function DeepSearchPreview() {
  const [activeLine, setActiveLine] = useState(0)

  /* Cycle background lines */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % BG_LINES.length)
    }, 4500) // Troca a cada 4.5 segundos
    return () => clearInterval(timer)
  }, [])

  const currentLine = BG_LINES[activeLine]
  const currentContent = BG_CONTENT[activeLine]

  return (
    <div className="relative w-full h-full min-h-[180px] flex flex-col select-none">

      {/* ── BACKGROUND: Blurred analysis text layer ── */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center px-1 pb-24 overflow-hidden pointer-events-none">
        <div className="relative w-full h-[60px]">
          <AnimatePresence>
            <motion.div
              key={activeLine}
              initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.98, x: -10 }}
              animate={{ opacity: 0.55, filter: 'blur(0px)', scale: 1, x: 0 }}
              exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.02, x: 10 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col gap-0.5"
            >
              {/* Label */}
              <span className={`text-[9px] font-bold tracking-wider uppercase ${currentLine.accent} transition-colors duration-500`}>
                {currentLine.label}
              </span>
              {/* Content text */}
              <p className="text-[9.5px] leading-[1.4] font-medium tracking-tight text-white/35">
                {currentContent}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Gradient fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-10" />
      </div>

      {/* ── FOREGROUND: SVG Status Panel ── */}
      <DeepSearchStatusPanel />

    </div>
  )
}


