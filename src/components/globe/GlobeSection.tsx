import { motion } from 'motion/react'
import { InteractiveGlobe } from './InteractiveGlobe'
import { globeArcs, globeMarkers } from './globeData'
import { HighlightText } from '../text/HighlightText'

export function GlobeSection() {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-24 md:py-28">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="mb-8 w-full max-w-2xl text-center sm:mb-10"
        >
          <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl md:text-[2.75rem] lg:text-5xl">
            Conecte suas ideias <HighlightText variant="blue">ao mundo</HighlightText>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-gray-500 sm:text-base">
            Visualize conexões, projetos e atividades distribuídas globalmente.
          </p>
        </motion.div>

        <InteractiveGlobe
          markers={globeMarkers}
          arcs={globeArcs}
          speed={0.0015} 
          baseColor={[0.85, 0.92, 1]} // Fundo azul claro para o globo
          glowColor={[0.85, 0.92, 1]} // Brilho azul claro para suavizar as bordas
          mapColor={[0.1, 0.75, 0.4]} // Verde esmeralda brilhante
          className="max-w-[min(680px,calc(100vw-2rem))] sm:max-w-[520px] lg:max-w-[640px] xl:max-w-[680px]"
        />
      </div>
    </section>
  )
}
