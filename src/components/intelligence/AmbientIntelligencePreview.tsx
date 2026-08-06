import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

function AnimatedRow({
  phrases,
  intervalDelay,
  markerColor,
  bgClass,
  blurClass,
  targetOpacity,
  textColor,
  indentClass,
}: {
  phrases: string[]
  intervalDelay: number
  markerColor: string
  bgClass: string
  blurClass: string
  targetOpacity: number
  textColor: string
  indentClass: string
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, intervalDelay)
    return () => clearInterval(timer)
  }, [intervalDelay, phrases.length])

  return (
    <div className={`h-[26px] ${indentClass} flex items-center`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: targetOpacity, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`inline-flex items-center gap-2 px-2 py-1 rounded-[4px] ${bgClass} ${blurClass}`}
        >
          <div className={`w-[7px] h-[7px] shrink-0 ${markerColor}`} />
          <span className={`text-[13px] font-medium tracking-tight ${textColor}`}>
            {phrases[index]}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function AmbientIntelligencePreview() {
  return (
    <div className="relative w-full max-w-[310px] mx-auto mt-4 pb-2 flex flex-col select-none">
      
      {/* ── 1. MAIN PILL (EXACT STADIUM/CAPSULE MATCH TO REFERENCE) ── */}
      <div className="relative w-full h-[52px] rounded-full bg-[#111114] border border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.8)] overflow-hidden mb-5 flex items-center justify-between px-5">
        
        {/* Soft Multi-stop Ambient Glow on Bottom-Left */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `
              radial-gradient(ellipse at 12% 100%, rgba(165, 115, 175, 0.45) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 100%, rgba(195, 55, 115, 0.5) 0%, transparent 60%)
            `,
          }}
        />

        {/* Left Side: Crisp 8-spoke Spinner + Text */}
        <div className="relative z-10 flex items-center gap-3.5 min-w-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 shrink-0 text-[#d4d4d8]"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="8" y1="2" x2="8" y2="4.5" opacity="1.0" />
              <line x1="12.24" y1="3.76" x2="10.47" y2="5.53" opacity="0.85" />
              <line x1="14" y1="8" x2="11.5" y2="8" opacity="0.7" />
              <line x1="12.24" y1="12.24" x2="10.47" y2="10.47" opacity="0.55" />
              <line x1="8" y1="14" x2="8" y2="11.5" opacity="0.4" />
              <line x1="3.76" y1="12.24" x2="5.53" y2="10.47" opacity="0.3" />
              <line x1="2" y1="8" x2="4.5" y2="8" opacity="0.2" />
              <line x1="3.76" y1="3.76" x2="5.53" y2="5.53" opacity="0.15" />
            </svg>
          </motion.div>

          <span className="text-[13.5px] font-medium text-white tracking-tight truncate">
            Analisando sua criação
          </span>
        </div>

        {/* Right Side: Exact Flower Logo */}
        <div className="relative z-10 shrink-0 ml-3 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="flowerGradRef" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="40%" stopColor="#ec4899" />
                <stop offset="75%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <g fill="url(#flowerGradRef)">
              <circle cx="16" cy="10" r="5.2" />
              <circle cx="21.2" cy="13" r="5.2" />
              <circle cx="21.2" cy="19" r="5.2" />
              <circle cx="16" cy="22" r="5.2" />
              <circle cx="10.8" cy="19" r="5.2" />
              <circle cx="10.8" cy="13" r="5.2" />
            </g>
            <path d="M16 9L17.3 14.7L23 16L17.3 17.3L16 23L14.7 17.3L9 16L14.7 14.7L16 9Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* ── 2. CONTEXTUAL SUGGESTIONS (ANIMATED LIVE LOOP) ── */}
      <div className="flex flex-col items-start gap-2.5 w-full">
        
        {/* Row 1 — Solid, purple square */}
        <AnimatedRow 
          phrases={[
            "Melhorar a experiência do usuário",
            "Ajustar a estrutura da interface",
            "Destacar a proposta de valor"
          ]}
          intervalDelay={3500}
          targetOpacity={1}
          markerColor="bg-blue-500"
          bgClass="bg-white/[0.04]"
          blurClass=""
          textColor="text-white/90"
          indentClass="ml-0"
        />

        {/* Row 2 — Solid, teal square, indented */}
        <AnimatedRow 
          phrases={[
            "Otimizar o desempenho da página",
            "Refinar a clareza do conteúdo",
            "Fortalecer a conversão da interface"
          ]}
          intervalDelay={4600}
          targetOpacity={0.85}
          markerColor="bg-[#0d9488]"
          bgClass="bg-white/[0.04]"
          blurClass=""
          textColor="text-white/90"
          indentClass="ml-[36px]"
        />

        {/* Row 3 — Blurred, purple square */}
        <AnimatedRow 
          phrases={[
            "Automatizar tarefas repetitivas",
            "Melhorar a navegação da página"
          ]}
          intervalDelay={5200}
          targetOpacity={0.4}
          markerColor="bg-blue-700"
          bgClass="bg-white/[0.02]"
          blurClass="blur-[1.5px]"
          textColor="text-white/70"
          indentClass="ml-0"
        />

        {/* Row 4 — Heavily blurred, blue square, indented */}
        <AnimatedRow 
          phrases={[
            "Preparar a criação para publicação",
            "Organizar melhor os blocos da seção"
          ]}
          intervalDelay={6100}
          targetOpacity={0.15}
          markerColor="bg-[#3b82f6]"
          bgClass="bg-white/[0.01]"
          blurClass="blur-[2.5px]"
          textColor="text-white/40"
          indentClass="ml-[36px]"
        />

      </div>
    </div>
  )
}
