import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { MonitorSmartphone, PackageOpen, LayoutTemplate, GraduationCap, BookCopy, Users2 } from 'lucide-react'

// Using 6 items for infinite seamless looping
const PROFILES = [
  { id: 1, name: 'SaaS', icon: MonitorSmartphone, gradient: 'bg-gradient-to-br from-blue-400 to-indigo-600' },
  { id: 2, name: 'Infoprodutos', icon: PackageOpen, gradient: 'bg-gradient-to-br from-purple-400 to-fuchsia-600' },
  { id: 3, name: 'Landing Page', icon: LayoutTemplate, gradient: 'bg-gradient-to-br from-pink-400 to-rose-600' },
  { id: 4, name: 'Cursos', icon: GraduationCap, gradient: 'bg-gradient-to-br from-emerald-400 to-teal-600' },
  { id: 5, name: 'E-book', icon: BookCopy, gradient: 'bg-gradient-to-br from-amber-400 to-orange-600' },
  { id: 6, name: 'Comunidades', icon: Users2, gradient: 'bg-gradient-to-br from-cyan-400 to-blue-600' },
]

export function MultiplayerAIPreview() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROFILES.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-[260px] mx-auto mt-16 pb-8 h-[180px]">
      <div className="flex flex-col relative w-full h-full justify-end pb-4">
        {PROFILES.map((item, index) => {
          const relIndex = (index - activeIndex + PROFILES.length) % PROFILES.length

          let scale = 0.85
          let y = -64
          let zIndex = 0

          // Adjusted stack values to match the fatter cards and tight perspective
          if (relIndex === 0) {
            scale = 1
            y = 0
            zIndex = 30
          } else if (relIndex === 1) {
            scale = 0.94
            y = -42
            zIndex = 20
          } else if (relIndex === 2) {
            scale = 0.88
            y = -80
            zIndex = 10
          } else if (relIndex === PROFILES.length - 1) {
            scale = 1.05
            y = 40
            zIndex = 40
          }

          const isFront = relIndex === 0
          const isMiddle = relIndex === 1
          const isBack = relIndex === 2

          return (
            <motion.div
              key={item.id}
              className="absolute left-0 right-0 mx-auto w-full rounded-[24px] p-4 flex items-center justify-between overflow-hidden"
              initial={false}
              animate={{ 
                scale, 
                y, 
                opacity: (isFront || isMiddle || isBack) ? 1 : 0, 
                zIndex,
                boxShadow: isFront 
                  ? '0 24px 48px -12px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08)' 
                  : 'inset 0 1px 0 rgba(255,255,255,0.03)',
                backgroundColor: isFront ? '#151517' : isMiddle ? '#111112' : '#0a0a0c',
              }}
              style={{
                border: '1px solid rgba(255,255,255,0.02)',
                backdropFilter: 'blur(12px)',
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtle top glow for the front card to simulate glass bevel */}
              {isFront && (
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}
              
              {/* Optional soft ambient light from bottom like in the image */}
              {isFront && (
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
              )}

              <div className="flex items-center gap-4 relative z-10">
                <motion.div 
                  className={`w-11 h-11 rounded-[12px] flex items-center justify-center ${item.gradient} shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),_inset_0_-2px_4px_rgba(0,0,0,0.4),_0_4px_8px_rgba(0,0,0,0.5)]`}
                  animate={{ opacity: isFront ? 1 : isMiddle ? 0.6 : 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <item.icon className="w-[22px] h-[22px] text-white drop-shadow-md" strokeWidth={2.5} />
                </motion.div>
                <span className={`text-[15px] tracking-wide transition-colors duration-800 ${isFront ? 'text-white font-medium' : isMiddle ? 'text-white/40 font-medium' : 'text-white/20 font-medium'}`}>
                  {item.name}
                </span>
              </div>
              
              {/* Status Circle */}
              <div className="relative flex items-center justify-center w-[22px] h-[22px] z-10">
                {/* Inactive state ring */}
                <motion.div 
                  className="absolute inset-0 m-auto w-5 h-5 rounded-full border-[1.5px] border-white/10"
                  animate={{ opacity: isFront ? 0 : isMiddle ? 1 : 0.5 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Active state green ring & dot */}
                <motion.div
                  className="absolute inset-0 rounded-full border-[2.5px] border-[#00e599] flex items-center justify-center"
                  animate={{ opacity: isFront ? 1 : 0, scale: isFront ? 1 : 0.5 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-[8px] h-[8px] rounded-full bg-[#00e599]" />
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
