import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Sparkles, Send, User } from 'lucide-react'

// ─── Constants ────────────────────────────────────────────────────────────────

const PROMPTS = [
  "Crie uma landing page com um Hero principal e um botão de CTA",
  "Crie um curso online com módulos em vídeo e testes",
  "Crie uma página de venda para um infoproduto",
  "Gere um dashboard administrativo com gráficos",
  "Monte um blog minimalista com modo escuro"
]

// ─── Component ────────────────────────────────────────────────────────────────

export function NoCodeBuilderPreview() {
  const [promptIndex, setPromptIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % PROMPTS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#09090b]">
      {/* Left Panel: Lovable-style Chat */}
      <div className="w-[45%] flex flex-col border-r border-white/[0.08] bg-[#0c0c0e]">
        {/* Chat Area */}
        <div className="flex-1 p-3 flex flex-col gap-3 overflow-hidden">
          {/* User Message */}
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
              <User className="w-2.5 h-2.5 text-neutral-400" />
            </div>
            <div className="flex-1 grid">
              <AnimatePresence mode="wait">
                <motion.div
                  key={promptIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="col-start-1 row-start-1 h-fit text-[7px] text-neutral-300 leading-relaxed bg-white/[0.06] border border-white/[0.04] p-2.5 rounded-lg rounded-tl-none"
                >
                  {PROMPTS[promptIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* AI Message */}
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
            </div>
            <div className="text-[7px] text-neutral-400 leading-relaxed pt-1">
              <motion.div
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 1, repeat: Infinity, repeatType: 'reverse' }
                }
              >
                Gerando interface...
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Input Area */}
        <div className="p-2 border-t border-white/[0.06] bg-black/20">
          <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-full p-1 pl-2.5">
            <span className="text-[6px] text-neutral-500 flex-1">Faça uma alteração...</span>
            <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
              <Send className="w-2 h-2 text-white ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Preview/Canvas */}
      <div className="flex-1 bg-[#050505] p-3 flex flex-col gap-2.5 relative">
        {/* Browser Header */}
        <div className="flex items-center gap-1.5 mb-1">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
          <div className="flex-1 h-3.5 rounded bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <span className="text-[5px] text-neutral-500 tracking-wider">localhost:3000</span>
          </div>
        </div>

        {/* Generated Canvas Blocks */}
        <motion.div
          className="w-full h-10 border border-indigo-500/30 bg-indigo-500/10 rounded-md flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0.5, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
          }
        >
           <span className="text-[6px] text-indigo-400/80 font-semibold tracking-widest uppercase">Hero Section</span>
           {/* Scanning line effect */}
           {!prefersReducedMotion && (
             <motion.div
               className="absolute top-0 bottom-0 w-[1px] bg-indigo-400/60 shadow-[0_0_12px_2px_rgba(99,102,241,0.6)]"
               animate={{ left: ['-10%', '110%'] }}
               transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
             />
           )}
        </motion.div>

        <div className="w-4/5 h-4 border border-white/[0.06] bg-white/[0.02] rounded-md flex items-center px-2">
           <div className="w-1/2 h-1 bg-white/10 rounded-full" />
        </div>

        <div className="flex gap-2 w-full mt-1">
          <div className="w-1/2 h-7 border border-white/[0.06] bg-white/[0.02] rounded-md" />
          <div className="w-1/2 h-7 border border-white/[0.06] bg-white/[0.02] rounded-md" />
        </div>
        
        {/* Animated pointer to simulate user/AI interacting */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute w-3 h-3 pointer-events-none z-10"
            initial={{ x: 20, y: 30, opacity: 0 }}
            animate={{
              x: [20, 60, 40, 20],
              y: [30, 40, 70, 30],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
              <path
                d="M5 3L19 12L12 13L9 20L5 3Z"
                fill="white"
                stroke="rgba(99,102,241,0.6)"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  )
}
