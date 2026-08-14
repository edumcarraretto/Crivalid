import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { ACTION_WORDS } from './rollerData'
import { GradientText } from '../text/GradientText'

const VISIBLE_ABOVE = 7
const VISIBLE_BELOW = 3

export function PlatformRollerSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<number | null>(null)

  const words = ACTION_WORDS

  // Fast & rhythmic rotation
  useEffect(() => {
    if (isPaused) return

    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length)
    }, 1700)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, words.length])

  /**
   * Ultra-smooth organic 2D arc geometry:
   * - Continuous smooth curvature along a natural parabolic sweep
   * - Hardware-accelerated translate3d for zero-jitter motion
   * - Gradual scale and opacity roll-off
   */
  const computeGeometry = (offset: number) => {
    if (offset === 0) {
      return {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        color: '#09090B',
        fontWeight: 800,
        zIndex: 40,
        visible: true,
      }
    }

    // ── Words ABOVE center (curve up and to the left smoothly) ──
    if (offset < 0) {
      const d = Math.abs(offset)
      if (d > VISIBLE_ABOVE) {
        return { x: -160, y: -480, rotate: -36, scale: 0.75, opacity: 0, color: '#A1A1AA', fontWeight: 700, zIndex: 1, visible: false }
      }

      // Smooth vertical spacing
      const y = -d * 64

      // Ultra-fluid parabolic curve
      const x = -(d * 3.4 + Math.pow(d, 1.75) * 2.6)

      // Gradual tilt: smooth ~4.2° per step
      const rotate = -(d * 4.2)

      // Smooth scale falloff
      const scale = Math.max(0.78, 1 - d * 0.028)

      // Smooth opacity falloff
      const opacity = Math.max(0.05, 0.72 - d * 0.088)

      return {
        x,
        y,
        rotate,
        scale,
        opacity,
        color: '#71717A',
        fontWeight: 700,
        zIndex: 30 - d,
        visible: true,
      }
    }

    // ── Words BELOW center (drop down with subtle vertical glide) ──
    if (offset > VISIBLE_BELOW) {
      return { x: 8, y: 240, rotate: 0, scale: 0.88, opacity: 0, color: '#A1A1AA', fontWeight: 700, zIndex: 1, visible: false }
    }

    const d = offset
    const y = d * 64
    const x = d * 2.5
    const rotate = 0
    const scale = Math.max(0.9, 1 - d * 0.035)
    const opacity = Math.max(0.08, 0.58 - d * 0.18)

    return {
      x,
      y,
      rotate,
      scale,
      opacity,
      color: '#8E8E93',
      fontWeight: 700,
      zIndex: 20 - d,
      visible: true,
    }
  }

  return (
    <section
      id="ecossistema"
      className="relative w-full py-16 sm:py-20 lg:py-28 bg-white select-none overflow-hidden"
      aria-labelledby="ecossistema-heading"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Branded Inset Showcase Card ── */}
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-neutral-50/90 via-white to-neutral-50/60 border border-neutral-200/80 shadow-[0_12px_45px_rgba(0,0,0,0.03)] px-4 sm:px-8 pt-12 sm:pt-16 pb-12 sm:pb-16 flex flex-col items-center overflow-hidden">
          
          {/* Subtle Dynamic Brand Light Aura */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(0_103_217_/_0.07),transparent_65%)] blur-3xl"
          />

          {/* ── Card Header: Badge & Context ── */}
          <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold text-blue-600 uppercase tracking-[0.14em] mb-4 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Ecossistema Unificado</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              id="ecossistema-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight"
            >
              Tudo o que seu projeto precisa,{' '}
              <GradientText className="italic">
                em perfeita harmonia.
              </GradientText>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mt-3 text-sm sm:text-base text-neutral-500 max-w-lg leading-relaxed"
            >
              Da primeira hipótese ao lançamento e operação contínua, conecte cada movimento em um só fluxo.
            </motion.p>
          </div>

          {/* ── Main Interactive Rolling Arena ── */}
          <div
            className="relative w-full flex flex-col items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Clean Masked Horizon */}
            <div
              className="relative w-full flex items-center justify-center pt-8 sm:pt-14 pb-8 min-h-[420px] sm:min-h-[480px]"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
              }}
            >
              {/* Unified Centered Lockup */}
              <div className="inline-flex items-center justify-center gap-3 sm:gap-5 md:gap-7 lg:gap-8 mx-auto max-w-full">
                
                {/* ── Left Fixed Brand: Logo Icon + MAKEPLOY ── */}
                <div className="shrink-0 flex items-center gap-2 sm:gap-3">
                  <img
                    src="/nova-logo-1914.png"
                    alt="MAKEPLOY"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain drop-shadow-xs"
                  />
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[52px] font-extrabold tracking-tight text-neutral-950 whitespace-nowrap leading-none">
                    MAKEPLOY
                  </span>
                </div>

                {/* ── Center: Handshake 🤝 ── */}
                <div
                  className="shrink-0 text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[52px] px-1 sm:px-2 select-none leading-none"
                  aria-hidden="true"
                >
                  🤝
                </div>

                {/* ── Right Side: Clean 2D Curved Arc ── */}
                <div className="shrink-0 relative w-[260px] sm:w-[420px] md:w-[560px] lg:w-[680px] xl:w-[780px] h-[80px] lg:h-[96px] flex items-center overflow-visible">
                  
                  {words.map((item, index) => {
                    let offset = index - activeIndex
                    const total = words.length

                    // Circular wrap
                    if (offset > total / 2) offset -= total
                    if (offset < -total / 2) offset += total

                    const geo = computeGeometry(offset)
                    if (!geo.visible) return null

                    const isActive = offset === 0

                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveIndex(index)}
                        style={{
                          transform: `translate3d(${geo.x}px, ${geo.y}px, 0px) rotate(${geo.rotate}deg) scale(${geo.scale})`,
                          opacity: geo.opacity,
                          zIndex: geo.zIndex,
                          transformOrigin: 'left center',
                          WebkitBackfaceVisibility: 'hidden',
                          backfaceVisibility: 'hidden',
                          transition: 'transform 0.48s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, color 0.25s ease',
                        }}
                        className={`
                          absolute left-0 top-1/2 -translate-y-1/2 flex items-center cursor-pointer will-change-transform pr-6 sm:pr-10
                          ${isActive ? 'z-30 pointer-events-auto' : 'z-10'}
                        `}
                      >
                        <span
                          style={{ color: geo.color }}
                          className={`
                            whitespace-nowrap transition-colors duration-400 tracking-tight select-none leading-none pr-4
                            ${
                              isActive
                                ? 'text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[52px] text-neutral-950 font-extrabold'
                                : 'text-xl sm:text-2xl md:text-3xl lg:text-[38px] xl:text-[44px] font-bold hover:text-neutral-700'
                            }
                          `}
                        >
                          {item.text}
                        </span>
                      </div>
                    )
                  })}
                </div>

              </div>
            </div>

          </div>

          {/* ── Card Footer: Connecting Tagline & Link ── */}
          <div className="relative z-20 mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <a
              href="#comece"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-900 hover:text-blue-600 transition-colors group cursor-pointer"
            >
              <span>Experimentar todas as possibilidades na prática</span>
              <ArrowRight className="w-4 h-4 text-blue-600 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

        </div>

      </div>
    </section>
  )
}

export default PlatformRollerSection
