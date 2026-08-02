import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDown, Globe, Star } from 'lucide-react'
import { FeaturesGrid } from './FeaturesGrid'

// ─── Types ────────────────────────────────────────────────────────────────────

export type HeroTheme = 'dark' | 'light'

interface HeroProps {
  theme?: HeroTheme
}

// ─── Constants ────────────────────────────────────────────────────────────────

const AVATARS = [
  { id: '1', from: '#c084fc', to: '#7c3aed', initials: 'JP' },
  { id: '2', from: '#60a5fa', to: '#2563eb', initials: 'MC' },
  { id: '3', from: '#f472b6', to: '#db2777', initials: 'AL' },
  { id: '4', from: '#4ade80', to: '#16a34a', initials: 'RS' },
]

const getSubtitleContent = (isDark: boolean) => [
  <span key="1">Crie. Valide. <span className={`italic font-medium ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>Realize.</span> ✦</span>,
  <span key="2">Do insight ao <span className={`italic font-medium ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>lançamento</span> 💡</span>,
  <span key="3">Menos achismo, mais <span className={`italic font-medium ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>dados</span> 📊</span>,
  <span key="4">Sua ideia, validada de <span className={`italic font-medium ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>verdade</span> ✓</span>,
]

// ─── Rotating Subtitle ────────────────────────────────────────────────────────

function RotatingSubtitle({ isDark }: { isDark: boolean }) {
  const [index, setIndex] = useState(0)
  const subtitles = getSubtitleContent(isDark)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % subtitles.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [subtitles.length])

  return (
    <div className="relative w-full h-[2em] mt-4 flex justify-center items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`absolute text-sm sm:text-base font-serif whitespace-nowrap ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}
        >
          {subtitles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Mascot ───────────────────────────────────────────────────────────────────

function Mascot({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mt-16 mb-8 flex items-center justify-center">
      {/* Huge background marquee */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] sm:w-[120vw] flex pointer-events-none -z-10 select-none overflow-hidden">
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 45 }}
          className={`flex w-max items-center whitespace-nowrap text-[12rem] sm:text-[18rem] md:text-[22rem] font-black tracking-tighter text-black ${isDark ? '' : 'opacity-[0.04]'}`}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {['VALIDE', 'CRIVALID', 'CRIE', 'REALIZE'].map((word, j) => (
                <div key={j} className="flex items-center">
                  <span>{word}</span>
                  <span className="mx-8 sm:mx-16 mb-6 sm:mb-10 text-[6rem] sm:text-[10rem] text-black">•</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>



      {/* Premium Logo Showcase */}
      <div className="relative z-10 flex items-center justify-center w-64 h-64 sm:w-[22rem] sm:h-[22rem]">
        
        {/* Pulsing Dynamic Aura */}
        <motion.div 
          className="absolute inset-0 rounded-full blur-[60px] sm:blur-[80px]"
          animate={{ 
            background: isDark 
              ? [
                  'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(0,0,0,0) 70%)',
                  'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(0,0,0,0) 70%)',
                  'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(0,0,0,0) 70%)'
                ]
              : [
                  'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(255,255,255,0) 70%)',
                  'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0) 70%)',
                  'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(255,255,255,0) 70%)'
                ],
            scale: [0.8, 1.1, 0.8],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Animation Wrapper */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full flex items-center justify-center relative z-10"
        >
          {/* The Spinning Logo with Complex Drop Shadows */}
          <motion.img 
            src="/logo-oficial.png" 
            alt="Crivalid Logo Oficial" 
            className="w-full h-full object-contain" 
            style={{ 
              filter: isDark 
                ? 'drop-shadow(0 30px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 50px rgba(139,92,246,0.4))' 
                : 'drop-shadow(0 25px 35px rgba(0,0,0,0.15)) drop-shadow(0 0 30px rgba(139,92,246,0.2))' 
            }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 35 }}
          />
        </motion.div>
      </div>
    </div>
  )
}

// ─── Interactive Preview ──────────────────────────────────────────────────────

function InteractivePreview() {
  return (
    <div className="mt-20 sm:mt-28 z-20 w-full relative">
      <FeaturesGrid />
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero({ theme = 'light' }: HeroProps) {
  const isDark = theme === 'dark'

  return (
    <section
      aria-labelledby="hero-heading"
      className={`relative flex flex-col items-center justify-center min-h-svh px-6 py-20 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      {/* Top Background Gradient (subtle) */}
      <div className={`absolute top-0 left-0 right-0 h-64 pointer-events-none transition-colors duration-500 ${isDark ? 'bg-gradient-to-b from-violet-900/20 to-transparent' : 'hidden'}`} />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center flex flex-col items-center">

        {/* 1 & 2 — Headline */}
        <h1
          id="hero-heading"
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-serif tracking-tight leading-tight transition-colors duration-500 ${isDark ? 'text-white' : 'text-neutral-900'}`}
        >
          Valide suas ideias{' '}
          <span className="italic bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            antes de investir.
          </span>
        </h1>

        {/* 3 — Subtitle / Highlight */}
        <RotatingSubtitle isDark={isDark} />

        {/* 4 & 5 — Mascot with Sparkle */}
        <Mascot isDark={isDark} />

        {/* 6 — Avatars & Ratings */}
        <div className={`mt-6 flex items-center gap-5 backdrop-blur-md px-6 py-3 rounded-full border transition-colors duration-500 ${isDark ? 'bg-black/50 border-white/5' : 'bg-white/50 border-black/5 shadow-sm'}`}>
          <div className="flex -space-x-3">
            {AVATARS.map((av) => (
              <div
                key={av.id}
                className={`flex h-10 w-10 select-none items-center justify-center rounded-full border-2 text-[10px] font-bold text-white shadow-sm transition-colors duration-500 ${isDark ? 'border-black' : 'border-white'}`}
                style={{ background: `linear-gradient(135deg, ${av.from}, ${av.to})` }}
              >
                {av.initials}
              </div>
            ))}
          </div>
          <div className={`h-8 w-px transition-colors duration-500 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
          <div className="flex flex-col items-start gap-0.5">
            <div className="flex items-center gap-1.5">
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={12} fill="currentColor" />
                ))}
              </div>
              <span className={`font-bold text-sm leading-none mt-0.5 transition-colors duration-500 ${isDark ? 'text-white' : 'text-neutral-900'}`}>4.8</span>
            </div>
            <span className="text-neutral-500 text-[10px] leading-none">
              Mais de 2.000 avaliações
            </span>
          </div>
        </div>

        {/* 7 — CTAs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <a
            href="#testar"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-7 py-3.5 rounded-full font-medium text-sm transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
          >
            <Globe size={18} />
            Testar Agora
          </a>
          <a
            href="#como-funciona"
            className={`flex items-center justify-center w-[3.25rem] h-[3.25rem] rounded-full border transition-colors ${isDark
              ? 'border-white/15 text-white hover:bg-white/10'
              : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            aria-label="Ver como funciona"
          >
            <ArrowDown size={18} />
          </a>
        </div>
      </div>

      {/* 8 — Video Demo / Glass Dashboard */}
      <InteractivePreview />

    </section>
  )
}
