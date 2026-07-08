import { motion } from 'motion/react'

export function ProblemSection() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-[#050508] w-full flex flex-col items-center overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        
        {/* Section Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-center mb-12 sm:mb-16 text-neutral-900 dark:text-white tracking-tight"
        >
          Por que a maioria das ideias{' '}
          <span className="italic bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
            não sai do papel
          </span>
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
            src="/images/problemas-ideia.png" 
            alt="Ilustração mostrando os três principais obstáculos para validar uma ideia de negócio: ideias dispersas, falta de validação e paralisia por análise" 
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </motion.div>

      </div>
    </section>
  )
}
