import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Shield, Lock, Eye, Fingerprint } from 'lucide-react'

const layers = [
  { id: 'encrypt', label: 'Criptografia E2E', icon: Lock, color: 'from-emerald-400 to-green-600' },
  { id: 'privacy', label: 'Privacidade total', icon: Eye, color: 'from-blue-400 to-indigo-600' },
  { id: 'auth', label: 'Autenticação 2FA', icon: Fingerprint, color: 'from-violet-400 to-purple-600' },
]

export function SecurityLayersPreview() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % layers.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full max-w-[260px] mx-auto mt-16 pb-8 h-[200px] flex items-end justify-center">
      {/* Central shield icon */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-600/10 border border-emerald-400/20 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.15)]"
        >
          <Shield className="w-6 h-6 text-emerald-400" strokeWidth={2} />
        </motion.div>
      </div>

      {/* Layers stack */}
      <div className="relative z-10 w-full space-y-2">
        {layers.map((layer, index) => {
          const isActive = index === activeIndex
          const Icon = layer.icon

          return (
            <motion.div
              key={layer.id}
              animate={{
                opacity: isActive ? 1 : 0.4,
                scale: isActive ? 1 : 0.96,
                x: isActive ? 0 : 4,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.03] cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              {isActive && (
                <motion.div
                  layoutId="securityAccent"
                  className="absolute inset-0 rounded-xl border border-emerald-400/30 bg-emerald-500/5"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}

              <div className={`relative z-10 w-8 h-8 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center shadow-lg shrink-0`}>
                <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>

              <span className={`relative z-10 text-[13px] font-medium transition-colors duration-500 ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                {layer.label}
              </span>

              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative z-10 ml-auto w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
