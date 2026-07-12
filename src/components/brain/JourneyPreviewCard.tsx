import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Lightbulb, Code2, Rocket, TrendingUp } from 'lucide-react'

const steps = [
  { id: 'ideia', label: 'Ideia', icon: Lightbulb },
  { id: 'criacao', label: 'Criação', icon: Code2 },
  { id: 'lancamento', label: 'Lançamento', icon: Rocket },
  { id: 'escala', label: 'Escala', icon: TrendingUp },
]

export function JourneyPreviewCard() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-cycle for continuous evolution effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[220px] mx-auto flex flex-col items-center justify-center font-sans px-2">
      
      {/* 2x2 Grid Container */}
      <div className="flex w-full max-w-[340px] sm:max-w-[380px] rounded-xl bg-[#0a0a0c] border border-white/5 shadow-2xl overflow-hidden">
        
        {/* Left Column (Ideia & Criação) */}
        <div className="flex flex-col flex-1 border-r border-white/5">
          <TabItem step={steps[0]} idx={0} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          <div className="w-full h-[1px] bg-white/5" />
          <TabItem step={steps[1]} idx={1} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>

        {/* Right Column (Lançamento & Escala) */}
        <div className="flex flex-col flex-1">
          <TabItem step={steps[2]} idx={2} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          <div className="w-full h-[1px] bg-white/5" />
          <TabItem step={steps[3]} idx={3} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>

      </div>
      
    </div>
  )
}

function TabItem({ step, idx, activeIndex, setActiveIndex }: any) {
  const isActive = idx === activeIndex;

  return (
    <div 
      className="relative flex flex-1 items-center justify-center lg:justify-start p-3 sm:px-4 sm:py-4 cursor-pointer overflow-hidden" 
      onClick={() => setActiveIndex(idx)}
    >
      
      {/* Active Background */}
      {isActive && (
        <motion.div 
          layoutId="activeTabBg"
          className="absolute inset-0 bg-[#2a164d] z-0" 
          transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
        />
      )}
      
      {/* Active Left Border Highlight */}
      {isActive && (
        <motion.div 
          layoutId="activeTabBorder"
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] z-10" 
          transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2.5 w-full justify-center lg:justify-start">
        
        {/* Number Prefix */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={`font-sans font-medium text-[10px] sm:text-[11px] tracking-widest whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-purple-300' : 'text-neutral-500'}`}>
            0{idx + 1}
          </span>
          <div className={`w-[1px] h-3 transition-colors duration-300 ${isActive ? 'bg-purple-400/40' : 'bg-white/10'}`} />
        </div>

        {/* Icon & Text */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <step.icon 
            strokeWidth={isActive ? 2.5 : 2} 
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-purple-400' : 'text-neutral-500'}`} 
          />
          <span className={`text-[10px] sm:text-[11px] tracking-tight whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-purple-200 font-semibold' : 'text-neutral-400 font-medium'}`}>
            {step.label}
          </span>
        </div>

      </div>

    </div>
  )
}
