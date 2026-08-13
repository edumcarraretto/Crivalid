import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { InteractiveGlobe } from './InteractiveGlobe'
import { globeArcs, globeMarkers } from './globeData'
import { HighlightText } from '../text/HighlightText'

const sectionStars = [
  { left: '6%', top: '16%', size: 3, delay: 0.2, duration: 3.8 },
  { left: '14%', top: '38%', size: 2, delay: 1.1, duration: 4.4 },
  { left: '9%', top: '72%', size: 4, delay: 0.7, duration: 5.2 },
  { left: '22%', top: '9%', size: 2, delay: 1.8, duration: 4.7 },
  { left: '27%', top: '58%', size: 3, delay: 0.4, duration: 4.1 },
  { left: '36%', top: '24%', size: 2, delay: 2.1, duration: 5.4 },
  { left: '43%', top: '82%', size: 3, delay: 1.4, duration: 4.6 },
  { left: '57%', top: '13%', size: 2, delay: 0.9, duration: 5 },
  { left: '65%', top: '76%', size: 3, delay: 2.3, duration: 4.3 },
  { left: '73%', top: '31%', size: 2, delay: 0.5, duration: 5.1 },
  { left: '82%', top: '10%', size: 3, delay: 1.6, duration: 4.8 },
  { left: '89%', top: '47%', size: 4, delay: 0.3, duration: 5.5 },
  { left: '94%', top: '69%', size: 2, delay: 2, duration: 4.2 },
  { left: '78%', top: '88%', size: 2, delay: 1.2, duration: 5.3 },
  { left: '3%', top: '31%', size: 2, delay: 2.4, duration: 5.1 },
  { left: '11%', top: '54%', size: 2, delay: 0.8, duration: 4.6 },
  { left: '17%', top: '84%', size: 3, delay: 1.9, duration: 5.5 },
  { left: '25%', top: '30%', size: 2, delay: 0.1, duration: 4.2 },
  { left: '31%', top: '69%', size: 2, delay: 2.7, duration: 5.3 },
  { left: '39%', top: '43%', size: 3, delay: 1.3, duration: 4.9 },
  { left: '47%', top: '7%', size: 2, delay: 2.2, duration: 5.6 },
  { left: '52%', top: '61%', size: 2, delay: 0.6, duration: 4.5 },
  { left: '59%', top: '91%', size: 3, delay: 1.7, duration: 5.2 },
  { left: '68%', top: '19%', size: 2, delay: 2.9, duration: 4.7 },
  { left: '71%', top: '52%', size: 2, delay: 0.25, duration: 5.4 },
  { left: '84%', top: '27%', size: 2, delay: 1.5, duration: 4.3 },
  { left: '87%', top: '79%', size: 3, delay: 2.5, duration: 5 },
  { left: '97%', top: '22%', size: 2, delay: 0.95, duration: 5.7 },
  { left: '34%', top: '92%', size: 2, delay: 1.05, duration: 4.8 },
  { left: '63%', top: '36%', size: 2, delay: 2.15, duration: 5.1 },
  { left: '2%', top: '11%', size: 2, delay: 0.45, duration: 5.2 },
  { left: '5%', top: '88%', size: 2, delay: 2.65, duration: 4.9 },
  { left: '13%', top: '24%', size: 2, delay: 1.35, duration: 5.6 },
  { left: '19%', top: '66%', size: 2, delay: 0.15, duration: 4.4 },
  { left: '23%', top: '47%', size: 3, delay: 2.25, duration: 5.3 },
  { left: '29%', top: '16%', size: 2, delay: 0.75, duration: 4.7 },
  { left: '32%', top: '80%', size: 2, delay: 1.85, duration: 5.5 },
  { left: '41%', top: '55%', size: 2, delay: 2.95, duration: 4.6 },
  { left: '45%', top: '19%', size: 2, delay: 0.35, duration: 5.1 },
  { left: '54%', top: '29%', size: 2, delay: 1.55, duration: 4.8 },
  { left: '56%', top: '75%', size: 3, delay: 2.35, duration: 5.4 },
  { left: '62%', top: '5%', size: 2, delay: 0.85, duration: 4.5 },
  { left: '67%', top: '65%', size: 2, delay: 1.95, duration: 5.7 },
  { left: '75%', top: '42%', size: 2, delay: 0.55, duration: 4.9 },
  { left: '80%', top: '62%', size: 2, delay: 2.75, duration: 5.2 },
  { left: '86%', top: '16%', size: 3, delay: 1.15, duration: 4.6 },
  { left: '91%', top: '35%', size: 2, delay: 2.05, duration: 5.5 },
  { left: '96%', top: '53%', size: 2, delay: 0.65, duration: 4.7 },
  { left: '92%', top: '91%', size: 2, delay: 1.75, duration: 5.3 },
  { left: '73%', top: '95%', size: 2, delay: 2.45, duration: 4.8 },
  { left: '1%', top: '44%', size: 2, delay: 1.25, duration: 5.4 },
  { left: '7%', top: '61%', size: 2, delay: 2.85, duration: 4.7 },
  { left: '10%', top: '94%', size: 3, delay: 0.55, duration: 5.6 },
  { left: '16%', top: '5%', size: 2, delay: 2.05, duration: 4.9 },
  { left: '21%', top: '75%', size: 2, delay: 0.35, duration: 5.2 },
  { left: '26%', top: '94%', size: 2, delay: 1.65, duration: 4.6 },
  { left: '30%', top: '39%', size: 2, delay: 2.55, duration: 5.5 },
  { left: '37%', top: '12%', size: 2, delay: 0.95, duration: 4.8 },
  { left: '38%', top: '73%', size: 3, delay: 1.45, duration: 5.3 },
  { left: '44%', top: '95%', size: 2, delay: 2.35, duration: 4.5 },
  { left: '49%', top: '35%', size: 2, delay: 0.05, duration: 5.7 },
  { left: '51%', top: '87%', size: 2, delay: 1.95, duration: 4.9 },
  { left: '58%', top: '47%', size: 2, delay: 2.75, duration: 5.1 },
  { left: '64%', top: '89%', size: 3, delay: 0.65, duration: 5.4 },
  { left: '69%', top: '10%', size: 2, delay: 1.55, duration: 4.7 },
  { left: '72%', top: '71%', size: 2, delay: 2.15, duration: 5.6 },
  { left: '77%', top: '21%', size: 2, delay: 0.45, duration: 4.8 },
  { left: '83%', top: '70%', size: 2, delay: 1.85, duration: 5.2 },
  { left: '90%', top: '57%', size: 3, delay: 2.65, duration: 4.6 },
  { left: '98%', top: '82%', size: 2, delay: 0.75, duration: 5.5 },
] as const

const rotatingNouns = [
  { label: 'ideias', color: 'rgb(15 184 128)' },
  { label: 'criações', color: 'rgb(5 181 212)' },
  { label: 'possibilidades', color: 'rgb(99 102 240)' },
  { label: 'soluções', color: 'rgb(59 130 245)' },
  { label: 'inovações', color: 'rgb(140 51 242)' },
] as const

function RotatingNoun() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % rotatingNouns.length)
    }, 2800)

    return () => window.clearInterval(interval)
  }, [reduceMotion])

  const activeNoun = rotatingNouns[activeIndex]

  return (
    <motion.span
      layout
      transition={{ layout: { type: 'spring', stiffness: 260, damping: 28, mass: 0.7 } }}
      className="relative inline-flex overflow-hidden align-bottom font-semibold"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={activeNoun.label}
          layout
          initial={reduceMotion ? false : { opacity: 0, y: 6, filter: 'blur(2px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6, filter: 'blur(2px)' }}
          transition={{
            opacity: { duration: 0.32, ease: 'easeOut' },
            y: { type: 'spring', stiffness: 240, damping: 25, mass: 0.65 },
            filter: { duration: 0.38, ease: 'easeOut' },
          }}
          className="whitespace-nowrap"
          style={{ color: activeNoun.color }}
        >
          {activeNoun.label}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}

export function GlobeSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-24 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {sectionStars.map((star) => (
          <motion.span
            key={`${star.left}-${star.top}`}
            className="absolute rounded-full bg-blue-400"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              boxShadow: star.size >= 3 ? '0 0 10px 2px rgb(96 165 250 / 0.3)' : '0 0 6px rgb(96 165 250 / 0.25)',
            }}
            animate={{ opacity: [0.18, 0.72, 0.18], scale: [0.8, 1.15, 0.8] }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        <motion.span
          className="absolute left-[18%] top-[27%] h-px w-12 rotate-[-24deg] bg-gradient-to-r from-transparent via-blue-300/60 to-transparent"
          animate={{ opacity: [0, 0.65, 0], x: [-10, 18] }}
          transition={{ duration: 5.5, delay: 1.4, repeat: Infinity, repeatDelay: 6 }}
        />
        <motion.span
          className="absolute right-[14%] top-[64%] h-px w-10 rotate-[-18deg] bg-gradient-to-r from-transparent via-violet-300/55 to-transparent"
          animate={{ opacity: [0, 0.6, 0], x: [-8, 16] }}
          transition={{ duration: 4.8, delay: 3.2, repeat: Infinity, repeatDelay: 7 }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="mb-8 w-full max-w-2xl text-center sm:mb-10"
        >
          <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl md:text-[2.75rem] lg:text-5xl">
            Ideias surgem. Projetos{' '}
            <HighlightText variant="blue">ganham o mundo.</HighlightText>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-gray-500 sm:text-base">
            A cada minuto, novas <RotatingNoun /> se transformam em projetos, evoluem e atravessam fronteiras.
          </p>
        </motion.div>

        <div className="relative flex w-full justify-center">
          <InteractiveGlobe
            markers={globeMarkers}
            arcs={globeArcs}
            speed={0.002}
            initialPhi={-2.55}
            baseColor={[0.85, 0.92, 1]} // Fundo azul claro para o globo
            glowColor={[0.85, 0.92, 1]} // Brilho azul claro para suavizar as bordas
            mapColor={[0.1, 0.75, 0.4]} // Verde esmeralda brilhante
            mapSamples={24000}
            mapBrightness={7.5}
            className="relative z-10 max-w-[min(680px,calc(100vw-2rem))] sm:max-w-[520px] lg:max-w-[640px] xl:max-w-[680px]"
          />
        </div>

      </div>
    </section>
  )
}
