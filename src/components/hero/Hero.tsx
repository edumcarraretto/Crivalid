import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown, Globe } from 'lucide-react'
import { GradientText } from '@/components/text/GradientText'
import { openEarlyAccess } from '@/lib/earlyAccess'

export type HeroTheme = 'dark' | 'light'

interface HeroProps {
  theme?: HeroTheme
}

const getSubtitleContent = () => [
  <span key="1">Uma ideia é <span className="italic font-medium text-blue-500">só o começo.</span></span>,
  <span key="2">Dê forma <span className="italic font-medium text-blue-500">ao que você imagina.</span></span>,
  <span key="3">Leve sua ideia <span className="italic font-medium text-blue-500">adiante.</span></span>,
  <span key="4">Do rascunho <span className="italic font-medium text-blue-500">à construção.</span></span>,
]

function RotatingSubtitle({ isDark, reduceMotion }: { isDark: boolean; reduceMotion: boolean }) {
  const [index, setIndex] = useState(0)
  const subtitles = getSubtitleContent()

  useEffect(() => {
    if (reduceMotion) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % subtitles.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [subtitles.length, reduceMotion])

  return (
    <div className="relative w-full min-h-[2.5em] mt-3 sm:mt-4 flex justify-center items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-xs sm:text-base text-center px-4 max-w-full leading-snug"
          style={{ color: isDark ? 'var(--color-text-inverse-muted)' : 'var(--color-text-body)' }}
        >
          {subtitles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Mascot ───────────────────────────────────────────────────────────────────

function Mascot({ isDark, reduceMotion }: { isDark: boolean; reduceMotion: boolean }) {
  return (
    <div className="relative w-[13.8rem] h-[13.8rem] sm:w-[21rem] sm:h-[21rem] md:w-[25.5rem] md:h-[25.5rem] mx-auto mt-16 mb-8 flex items-center justify-center">
      {/* Background marquee (adapted proportionally for mobile & desktop) */}
      <div 
        className="
          flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[140vw] sm:w-[120vw] pointer-events-none -z-10 select-none overflow-hidden
          [mask-image:radial-gradient(circle_at_center,transparent_30px,black_105px)]
          sm:[mask-image:radial-gradient(circle_at_center,transparent_100px,black_320px)]
          [-webkit-mask-image:radial-gradient(circle_at_center,transparent_30px,black_105px)]
          sm:[-webkit-mask-image:radial-gradient(circle_at_center,transparent_100px,black_320px)]
        "
      >
        <motion.div
          animate={reduceMotion ? undefined : { x: [0, '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
          className={`flex w-max items-center whitespace-nowrap text-[4.2rem] sm:text-[16rem] md:text-[22rem] font-extrabold tracking-tighter text-black ${isDark ? 'text-white opacity-20' : 'opacity-[0.06] sm:opacity-[0.04]'}`}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {['SONHE', 'CRIE', 'REALIZE', 'MAKEPLOY'].map((word, j) => (
                <div key={j} className="flex items-center">
                  <span>{word}</span>
                  <span className="mx-4 sm:mx-12 md:mx-16 text-[2rem] sm:text-[8rem] md:text-[10rem] text-black">•</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Premium Logo Showcase */}
      <div className="relative z-10 flex items-center justify-center w-[13.8rem] h-[13.8rem] sm:w-[21rem] sm:h-[21rem] md:w-[25.5rem] md:h-[25.5rem] translate-y-2.5 sm:translate-y-4 md:translate-y-5">
        
        {/* Solid Theme-Matched Backing to Prevent Text Bleed (hidden on mobile, full on desktop) */}
        <div 
          className={`
            absolute inset-6 rounded-3xl pointer-events-none hidden sm:block
            ${isDark ? 'bg-black shadow-[0_0_50px_25px_rgba(0,0,0,1)]' : 'bg-white shadow-[0_0_50px_25px_rgba(255,255,255,1)]'}
          `}
        />
        
        {/* Pulsing Dynamic Aura */}
        <motion.div 
          className={`absolute inset-0 rounded-full ${reduceMotion ? '' : 'blur-[20px] sm:blur-[80px]'}`}
          animate={reduceMotion
            ? {
                background: isDark
                  ? 'radial-gradient(circle, rgb(22 140 255 / 0.34) 0%, rgb(0 0 0 / 0) 70%)'
                  : 'radial-gradient(circle, rgb(22 140 255 / 0.1) 0%, rgb(255 255 255 / 0) 70%)',
                scale: 1,
                opacity: 0.7,
              }
            : {
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
            src="/nova-logo-384.webp"
            alt="Logo oficial da MAKEPLOY"
            width={384}
            height={384}
            fetchPriority="high"
            className="w-full h-full object-contain" 
            style={{ 
              filter: reduceMotion
                ? 'none'
                : isDark
                ? 'drop-shadow(0 30px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 50px rgba(22,140,255,0.3))' 
                : 'drop-shadow(0 18px 30px rgba(0,0,0,0.08)) drop-shadow(0 10px 28px rgba(22,140,255,0.08))' 
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero({ theme = 'light' }: HeroProps) {
  const isDark = theme === 'dark'
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <section
      aria-labelledby="hero-heading"
      className={`relative flex flex-col items-center justify-center min-h-svh px-4 sm:px-6 pt-28 pb-16 sm:pt-36 sm:pb-20 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      {/* Top Background Gradient (subtle) */}
      <div className={`absolute top-0 left-0 right-0 h-64 pointer-events-none transition-colors duration-500 ${isDark ? 'bg-gradient-to-b from-violet-900/20 to-transparent' : 'hidden'}`} />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center flex flex-col items-center">

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mb-4 sm:mb-5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-blue-600"
        >
          1ª PLATAFORMA END-TO-END
        </motion.p>

        {/* 1 & 2 — Headline */}
        <motion.h1
          id="hero-heading"
          initial={false}
          className={`text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] tracking-tight leading-tight transition-colors duration-500`}
          style={{ color: isDark ? '#ffffff' : '#171717' }}
        >
          Tire sua ideia do papel{' '}
          <GradientText className="italic" priority>
            Mesmo sem saber como
          </GradientText>
        </motion.h1>

        <RotatingSubtitle isDark={isDark} reduceMotion={reduceMotion} />

        {/* 4 & 5 — Mascot with Sparkle */}
        <Mascot isDark={isDark} reduceMotion={reduceMotion} />

        {/* CTA Pill */}
        <a
          href="#comece"
          onClick={(event) => { event.preventDefault(); openEarlyAccess('hero') }}
          className="mt-6 relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium text-sm no-underline cursor-pointer transition-all duration-300 shadow-[0_0_24px_rgba(22,140,255,0.35)] hover:shadow-[0_0_32px_rgba(22,140,255,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <motion.span
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: 'linear',
            }}
            className="inline-flex items-center justify-center shrink-0"
          >
            <Globe size={18} />
          </motion.span>
          Começar agora
        </a>

        {/* 7 — CTAs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <a
            href="#como-funciona"
            className={`flex items-center justify-center w-[3.25rem] h-[3.25rem] rounded-full border transition-colors ${isDark
              ? 'border-white/15 text-white hover:bg-white/10'
              : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            aria-label="Conhecer o sistema"
          >
            <ArrowDown size={18} />
          </a>
        </div>
      </div>

    </section>
  )
}
