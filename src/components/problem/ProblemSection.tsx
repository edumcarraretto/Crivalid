import { motion } from 'motion/react'
import { HighlightText } from '../text/HighlightText'

export function ProblemSection() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-neutral-950 w-full flex flex-col items-center overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 text-neutral-900 dark:text-white tracking-tight"
        >
          O custo não está na ferramenta.{' '}
          <HighlightText variant="coral">Está em reconstruir o contexto.</HighlightText>
        </motion.h2>

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full"
        >
          <img 
            src="/images/novaimagem.png" 
            alt="Como um projeto perde continuidade: contexto disperso, decisões repetidas e retrabalho crescente"
            loading="lazy"
            draggable={false}
            className="w-full h-auto object-contain select-none"
            style={{ imageRendering: 'auto', maxWidth: '100%' }}
          />
        </motion.div>

      </div>
    </section>
  )
}
