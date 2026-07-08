import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDown, Globe, Star } from 'lucide-react'
import { GlassDashboard } from './GlassDashboard'

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

      {/* Decorative Sparkle (Background) */}
      <div className={`absolute top-1/2 -translate-y-1/2 -right-16 sm:-right-24 pointer-events-none z-0 ${isDark ? 'text-neutral-800' : 'text-neutral-200'}`}>
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
        </svg>
      </div>

      {/* Blob */}
      <div
        className={`relative flex items-center justify-center w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-600 p-[3px] z-10 ${isDark ? 'shadow-[0_0_60px_-15px_rgba(139,92,246,0.6)]' : 'shadow-[0_0_50px_-15px_rgba(139,92,246,0.3)]'}`}
        style={{ borderRadius: '45% 55% 65% 35% / 40% 60% 40% 60%' }}
      >
        <div
          className="w-full h-full bg-[#050508] flex items-center justify-center relative overflow-hidden"
          style={{ borderRadius: 'inherit' }}
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-violet-500/10 rounded-full blur-xl" />

          {/* Left Eye */}
          <div className="absolute top-[30%] left-[22%] w-[4.5rem] h-[5rem] sm:w-[5.5rem] sm:h-[6rem] bg-white rounded-[50%] -rotate-[12deg] shadow-[inset_-4px_-4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center z-10">
            <div className="w-[2.5rem] h-[2.8rem] sm:w-[3rem] sm:h-[3.5rem] bg-[#0A0A0A] rounded-[50%] absolute top-3 right-2">
              <div className="w-3.5 h-3.5 bg-white rounded-full absolute top-1.5 right-1.5" />
            </div>
          </div>

          {/* Right Eye */}
          <div className="absolute top-[33%] right-[20%] w-[5rem] h-[5.5rem] sm:w-[6.5rem] sm:h-[7rem] bg-white rounded-[50%] rotate-[8deg] shadow-[inset_-4px_-4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center z-10">
            <div className="w-[2.8rem] h-[3.2rem] sm:w-[3.5rem] sm:h-[4rem] bg-[#0A0A0A] rounded-[50%] absolute top-4 left-3">
              <div className="w-4 h-4 bg-white rounded-full absolute top-2 right-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Interactive Preview ──────────────────────────────────────────────────────

function InteractivePreview() {
  return (
    <div className="mt-16 sm:mt-24 z-20 w-full max-w-7xl relative">
      <GlassDashboard />
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero({ theme = 'light' }: HeroProps) {
  const isDark = theme === 'dark'

  return (
    <section
      aria-labelledby="hero-heading"
      className={`relative flex flex-col items-center justify-center min-h-svh px-6 py-20 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      {/* Top Background Gradient (subtle) */}
      <div className={`absolute top-0 left-0 right-0 h-64 pointer-events-none transition-colors duration-500 ${isDark ? 'bg-gradient-to-b from-violet-900/20 to-transparent' : 'bg-gradient-to-b from-violet-100/60 to-transparent'}`} />

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
