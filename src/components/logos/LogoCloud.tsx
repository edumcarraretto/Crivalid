import { useEffect } from 'react'
import { motion, useAnimate, type AnimationPlaybackControls } from 'motion/react'
import { FaGoogle, FaGithub, FaSlack, FaFigma } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'
import { SiNotion } from 'react-icons/si'

// Usando logos oficiais combinando diferentes pacotes do react-icons
const LOGOS = [
  { id: 1, icon: FaGoogle, name: 'Google', hoverColor: 'group-hover:text-[#4285F4]' },
  { id: 2, icon: FaGithub, name: 'GitHub', hoverColor: 'group-hover:text-[#181717]' },
  { id: 3, icon: VscVscode, name: 'VS Code', hoverColor: 'group-hover:text-[#007ACC]' },
  { id: 4, icon: SiNotion, name: 'Notion', hoverColor: 'group-hover:text-[#000000]' },
  { id: 5, icon: FaSlack, name: 'Slack', hoverColor: 'group-hover:text-[#4A154B]' },
  { id: 6, icon: FaFigma, name: 'Figma', hoverColor: 'group-hover:text-[#F24E1E]' },
]

export function LogoCloud() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    let controls: AnimationPlaybackControls | undefined
    
    if (scope.current) {
      // Cria a animação contínua (marquee) de 0 a -50% (para loop perfeito)
      controls = animate(scope.current, { x: ['0%', '-50%'] }, {
        duration: 30,
        ease: 'linear',
        repeat: Infinity,
      })

      // Event listeners para pausar no hover
      const handleMouseEnter = () => controls?.pause()
      const handleMouseLeave = () => controls?.play()

      const element = scope.current
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
        controls?.stop()
      }
    }
  }, [animate, scope])

  return (
    <section className="py-12 sm:py-20 bg-white overflow-hidden border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Texto de apoio com divisores laterais */}
        <div className="flex items-center gap-3 sm:gap-6 mb-8 sm:mb-14">
          <div className="flex-grow border-t border-neutral-200"></div>
          <p className="text-center text-xs sm:text-sm font-medium text-neutral-400">
            Suas tecnologias. O mesmo projeto.
          </p>
          <div className="flex-grow border-t border-neutral-200"></div>
        </div>
        
        {/* Carrossel Infinito (Marquee) */}
        <div className="relative w-full overflow-hidden flex items-center">
          
          {/* Gradient Masks para fade nas bordas horizontais */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-28 lg:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-28 lg:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Container animado que desliza continuamente */}
          <motion.div
            ref={scope}
            className="flex whitespace-nowrap items-center"
          >
            {/* Duplicamos a lista para criar o loop perfeito */}
            {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => {
              const Icon = logo.icon
              return (
                <div 
                  key={`${logo.id}-${index}`} 
                  className="w-[calc((100vw-32px)/3)] sm:w-[calc((100vw-48px)/4)] md:w-[calc((100vw-48px)/5)] max-w-[246px] min-w-[80px] sm:min-w-[140px] shrink-0 flex flex-col items-center justify-center text-neutral-300 transition-colors duration-300 group cursor-pointer"
                  aria-label={`Logo oficial de ${logo.name}`}
                >
                  <Icon size={32} className={`group-hover:scale-110 transition-transform duration-300 ${logo.hoverColor}`} />
                </div>
              )
            })}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
