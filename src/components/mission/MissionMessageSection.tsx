import { motion, useReducedMotion } from 'motion/react'

// ─── Decorative Illustrations ─────────────────────────────────────────────────

/**
 * Abstract floral / organic SVG — left side.
 * Soft petal shapes evoking growth & creation.
 */
function LeftIllustration() {
  return (
    <svg
      aria-hidden="true"
      width="160"
      height="220"
      viewBox="0 0 160 220"
      fill="none"
      className="pointer-events-none select-none"
    >
      {/* Stem */}
      <path
        d="M80 210 C80 170, 60 150, 70 120 C75 100, 85 85, 80 60"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Lower-left leaf */}
      <ellipse
        cx="55"
        cy="155"
        rx="18"
        ry="9"
        transform="rotate(-35 55 155)"
        fill="rgb(22 140 255 / 0.25)"
      />

      {/* Lower-right leaf */}
      <ellipse
        cx="92"
        cy="140"
        rx="15"
        ry="7"
        transform="rotate(30 92 140)"
        fill="rgb(0 103 217 / 0.2)"
      />

      {/* Mid branch left */}
      <path
        d="M70 120 C50 110, 35 100, 30 80"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="30" cy="78" r="6" fill="rgb(22 140 255 / 0.3)" />
      <circle cx="30" cy="78" r="3" fill="rgb(0 103 217 / 0.35)" />

      {/* Top petal cluster */}
      <ellipse
        cx="80"
        cy="50"
        rx="12"
        ry="16"
        transform="rotate(-15 80 50)"
        fill="rgb(22 140 255 / 0.3)"
      />
      <ellipse
        cx="72"
        cy="44"
        rx="10"
        ry="14"
        transform="rotate(-40 72 44)"
        fill="rgb(0 103 217 / 0.22)"
      />
      <ellipse
        cx="90"
        cy="46"
        rx="10"
        ry="13"
        transform="rotate(20 90 46)"
        fill="rgb(207 231 255 / 0.4)"
      />
      <circle cx="80" cy="48" r="5" fill="rgb(0 103 217 / 0.35)" />
      <circle cx="80" cy="48" r="2.5" fill="rgba(255,255,255,0.4)" />

      {/* Small floating dots */}
      <circle cx="45" cy="90" r="2.5" fill="rgb(207 231 255 / 0.5)" />
      <circle cx="105" cy="100" r="2" fill="rgb(22 140 255 / 0.3)" />
      <circle cx="60" cy="70" r="1.5" fill="rgba(255,255,255,0.25)" />
    </svg>
  )
}

/**
 * Abstract floral / organic SVG — right side.
 * Slightly different shape for visual asymmetry.
 */
function RightIllustration() {
  return (
    <svg
      aria-hidden="true"
      width="160"
      height="220"
      viewBox="0 0 160 220"
      fill="none"
      className="pointer-events-none select-none"
    >
      {/* Stem */}
      <path
        d="M80 210 C80 175, 95 150, 85 120 C80 100, 75 85, 80 55"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Lower-right leaf */}
      <ellipse
        cx="105"
        cy="155"
        rx="18"
        ry="9"
        transform="rotate(35 105 155)"
        fill="rgb(22 140 255 / 0.25)"
      />

      {/* Lower-left leaf */}
      <ellipse
        cx="68"
        cy="142"
        rx="14"
        ry="7"
        transform="rotate(-30 68 142)"
        fill="rgb(0 103 217 / 0.2)"
      />

      {/* Mid branch right */}
      <path
        d="M85 115 C105 105, 120 95, 130 78"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="130" cy="76" r="5" fill="rgb(22 140 255 / 0.28)" />
      <circle cx="130" cy="76" r="2.5" fill="rgb(0 103 217 / 0.3)" />

      {/* Top flower */}
      <ellipse
        cx="80"
        cy="46"
        rx="13"
        ry="17"
        transform="rotate(10 80 46)"
        fill="rgb(22 140 255 / 0.3)"
      />
      <ellipse
        cx="88"
        cy="40"
        rx="11"
        ry="14"
        transform="rotate(35 88 40)"
        fill="rgb(0 103 217 / 0.22)"
      />
      <ellipse
        cx="70"
        cy="42"
        rx="10"
        ry="13"
        transform="rotate(-25 70 42)"
        fill="rgb(207 231 255 / 0.4)"
      />
      <circle cx="80" cy="44" r="6" fill="rgb(0 103 217 / 0.35)" />
      <circle cx="80" cy="44" r="3" fill="rgba(255,255,255,0.4)" />

      {/* Mid-left bud */}
      <path
        d="M80 90 C65 82, 55 78, 48 65"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse
        cx="46"
        cy="62"
        rx="6"
        ry="9"
        transform="rotate(-20 46 62)"
        fill="rgb(22 140 255 / 0.22)"
      />
      <circle cx="46" cy="62" r="2.5" fill="rgb(0 103 217 / 0.3)" />

      {/* Small floating dots */}
      <circle cx="115" cy="95" r="2.5" fill="rgb(207 231 255 / 0.5)" />
      <circle cx="55" cy="105" r="2" fill="rgb(22 140 255 / 0.3)" />
      <circle cx="100" cy="68" r="1.5" fill="rgba(255,255,255,0.25)" />
    </svg>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function MissionMessageSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="mission-message"
      aria-labelledby="mission-heading"
      className="w-full bg-white px-5 sm:px-8 py-16 sm:py-20 md:py-24 lg:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="
          relative mx-auto w-full max-w-5xl overflow-hidden
          rounded-3xl
          bg-gradient-to-br from-violet-600 via-violet-600 to-violet-700
          px-8 py-16 sm:px-12 sm:py-20 md:px-16 md:py-24
        "
      >
        {/* ── Left illustration ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="
            absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2
            pointer-events-none hidden md:block
            w-[100px] lg:w-[140px]
          "
        >
          <LeftIllustration />
        </motion.div>

        {/* ── Right illustration ── */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="
            absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2
            pointer-events-none hidden md:block
            w-[100px] lg:w-[140px]
          "
        >
          <RightIllustration />
        </motion.div>

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.h2
            id="mission-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="
              text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem]
              italic font-bold leading-tight tracking-tight
              text-white
            "
          >
            O projeto{' '}
            <span className="relative inline-block">
              não volta ao zero.
              <motion.span
                aria-hidden="true"
                initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-[0.12em] left-0 h-[0.08em] w-full origin-left rounded-full bg-gradient-to-r from-white via-blue-200 to-blue-400"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="
              mt-5 sm:mt-6 max-w-lg lg:max-w-xl
              text-sm sm:text-base md:text-[1.05rem] leading-relaxed
              text-white/80
            "
          >
            Cada decisão permanece útil entre pensar, construir, publicar e operar.
            A próxima versão começa com tudo que o projeto já aprendeu.
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
