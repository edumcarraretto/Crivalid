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
  { id: '1', from: 'var(--color-brand-coral)', to: 'var(--color-brand-orange)', initials: 'JP' },
  { id: '2', from: 'var(--color-brand-blue)', to: 'var(--color-action)', initials: 'MC' },
  { id: '3', from: 'var(--color-brand-magenta)', to: 'var(--color-brand-coral)', initials: 'AL' },
  { id: '4', from: 'var(--color-brand-green)', to: 'var(--color-success)', initials: 'RS' },
]

const getSubtitleContent = () => [
  <span key="1">Crie. Valide. <span className="italic font-medium text-blue-500">Realize.</span> ✦</span>,
  <span key="2">Do insight ao <span className="italic font-medium text-blue-500">lançamento</span> 💡</span>,
  <span key="3">Menos achismo, mais <span className="italic font-medium text-blue-500">dados</span> 📊</span>,
  <span key="4">Sua ideia, validada de <span className="italic font-medium text-blue-500">verdade</span> ✓</span>,
]

// ─── Rotating Subtitle ────────────────────────────────────────────────────────

function RotatingSubtitle({ isDark }: { isDark: boolean }) {
  const [index, setIndex] = useState(0)
  const subtitles = getSubtitleContent()

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
          className={`absolute text-sm sm:text-base whitespace-nowrap`}
          style={{ color: isDark ? 'var(--color-text-inverse-muted)' : 'var(--color-text-body)' }}
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
    <div className="relative w-[13.8rem] h-[13.8rem] sm:w-[21rem] sm:h-[21rem] md:w-[25.5rem] md:h-[25.5rem] mx-auto mt-16 mb-8 flex items-center justify-center">
      {/* Huge background marquee */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] sm:w-[120vw] flex pointer-events-none -z-10 select-none overflow-hidden"
        style={{
          maskImage: 'radial-gradient(circle at center, transparent 100px, black 320px)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 100px, black 320px)'
        }}
      >
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 45 }}
          className={`flex w-max items-center whitespace-nowrap text-[12rem] sm:text-[18rem] md:text-[22rem] font-extrabold tracking-tighter text-black ${isDark ? '' : 'opacity-[0.04]'}`}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {['VALIDE', 'MAKEPLOY', 'CRIE', 'REALIZE'].map((word, j) => (
                <div key={j} className="flex items-center">
                  <span>{word}</span>
                  <span className="mx-8 sm:mx-16 text-[6rem] sm:text-[10rem] text-black">•</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>



      {/* Premium Logo Showcase */}
      <div className="relative z-10 flex items-center justify-center w-[13.8rem] h-[13.8rem] sm:w-[21rem] sm:h-[21rem] md:w-[25.5rem] md:h-[25.5rem] translate-y-2.5 sm:translate-y-4 md:translate-y-5">
        
        {/* Solid Theme-Matched Backing to Prevent Text Bleed */}
        <div 
          className={`absolute inset-6 rounded-3xl pointer-events-none ${isDark ? 'bg-black' : 'bg-white'}`}
          style={{
            boxShadow: isDark 
              ? '0 0 50px 25px rgba(0,0,0,1)' 
              : '0 0 50px 25px rgba(255,255,255,1)'
          }}
        />
        
        {/* Pulsing Dynamic Aura */}
        <motion.div 
          className="absolute inset-0 rounded-full blur-[60px] sm:blur-[80px]"
          animate={{ 
            background: isDark 
              ? [
                  'radial-gradient(circle, rgb(22 140 255 / 0.4) 0%, rgb(0 0 0 / 0) 70%)',
                  'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(0,0,0,0) 70%)',
                  'radial-gradient(circle, rgb(22 140 255 / 0.4) 0%, rgb(0 0 0 / 0) 70%)'
                ]
              : [
                  'radial-gradient(circle, rgba(22,140,255,0.12) 0%, rgba(255,255,255,0) 70%)',
                  'radial-gradient(circle, rgba(34,197,94,0.12) 0%, rgba(255,255,255,0) 70%)',
                  'radial-gradient(circle, rgba(22,140,255,0.12) 0%, rgba(255,255,255,0) 70%)'
                ],
            scale: [0.8, 1.1, 0.8],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Animation Wrapper */}
        <motion.div
          className="w-full h-full flex items-center justify-center relative z-10"
        >
          {/* The Logo with Complex Drop Shadows */}
          <motion.img 
            src="/nova-logo-1914.png" 
            alt="Logo oficial da MAKEPLOY"
            className="w-full h-full object-contain" 
            style={{ 
              filter: isDark 
                ? 'drop-shadow(0 30px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 50px rgba(22,140,255,0.3))' 
                : 'drop-shadow(0 18px 30px rgba(0,0,0,0.08)) drop-shadow(0 10px 28px rgba(22,140,255,0.08))' 
            }}
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
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] tracking-tight leading-tight transition-colors duration-500`}
          style={{ color: isDark ? '#ffffff' : '#171717' }}
        >
          Valide suas ideias antes de{' '}
          <span
            className="italic bg-clip-text"
            style={{
          background: 'var(--gradient-brand)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            investir.
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
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-7 py-3.5 rounded-full font-medium text-sm transition-all shadow-[0_0_20px_rgb(0_103_217/0.24)] hover:shadow-[0_0_25px_rgb(0_87_184/0.32)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
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
