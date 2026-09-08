import { motion } from 'motion/react'
import { FaGoogle, FaGithub, FaSlack, FaFigma } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'
import { SiNotion } from 'react-icons/si'
import { Copy, Braces, TerminalSquare, Sparkles, GitBranch, Command, Code2, RefreshCw, Wand2, Box, Monitor, Fingerprint, Layers, Cpu, Code, ArrowRightToLine, ArrowLeftToLine } from 'lucide-react'

// Conjunto de logos sem repetição para carrossel, apenas para preencher a tela
const LOGOS = [
  { id: 1, icon: FaGoogle, name: 'Google', hoverColor: 'group-hover:text-[#4285F4]' },
  { id: 2, icon: Copy, name: 'Copy', hoverColor: 'group-hover:text-neutral-900' },
  { id: 3, icon: FaGithub, name: 'GitHub', hoverColor: 'group-hover:text-[#181717]' },
  { id: 4, icon: Braces, name: 'Code', hoverColor: 'group-hover:text-neutral-900' },
  { id: 5, icon: VscVscode, name: 'VS Code', hoverColor: 'group-hover:text-[#007ACC]' },
  { id: 6, icon: TerminalSquare, name: 'Terminal', hoverColor: 'group-hover:text-neutral-900' },
  { id: 7, icon: SiNotion, name: 'Notion', hoverColor: 'group-hover:text-[#000000]' },
  { id: 8, icon: Sparkles, name: 'Sparkles', hoverColor: 'group-hover:text-amber-500' },
  { id: 9, icon: FaSlack, name: 'Slack', hoverColor: 'group-hover:text-[#4A154B]' },
  { id: 10, icon: GitBranch, name: 'Git', hoverColor: 'group-hover:text-neutral-900' },
  { id: 11, icon: FaFigma, name: 'Figma', hoverColor: 'group-hover:text-[#F24E1E]' },
  { id: 12, icon: Command, name: 'Command', hoverColor: 'group-hover:text-neutral-900' },
  { id: 13, icon: Code2, name: 'Code2', hoverColor: 'group-hover:text-neutral-900' },
  { id: 14, icon: RefreshCw, name: 'Refresh', hoverColor: 'group-hover:text-blue-500' },
  { id: 15, icon: Wand2, name: 'Wand', hoverColor: 'group-hover:text-purple-500' },
  { id: 16, icon: Box, name: 'Box', hoverColor: 'group-hover:text-neutral-900' },
  { id: 17, icon: Monitor, name: 'Monitor', hoverColor: 'group-hover:text-neutral-900' },
  { id: 18, icon: Fingerprint, name: 'Security', hoverColor: 'group-hover:text-neutral-900' },
  { id: 19, icon: Layers, name: 'Layers', hoverColor: 'group-hover:text-neutral-900' },
  { id: 20, icon: Cpu, name: 'Cpu', hoverColor: 'group-hover:text-neutral-900' },
]

export function LogoCloud() {
  return (
    <section className="py-10 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-[100vw] mx-auto">
        
        {/* Fila Única com Animação de Onda Vertical */}
        <div className="relative w-full overflow-hidden flex items-center justify-center h-40 sm:h-48">
          
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex flex-nowrap items-center justify-center gap-2 px-32">
            {LOGOS.map((logo, index) => {
              const Icon = logo.icon
              
              return (
                <motion.div 
                  key={logo.id} 
                  className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex flex-col items-center justify-center rounded-full border border-neutral-100 bg-white/60 backdrop-blur-sm shadow-[0_2px_14px_-4px_rgba(0,0,0,0.06)] text-neutral-800 transition-colors duration-300 group hover:shadow-lg hover:border-neutral-200 hover:text-neutral-900 cursor-pointer"
                  // Efeito de onda: sobe e desce, com um delay baseado no índice para criar o movimento em cadeia
                  animate={{ y: [-24, 24, -24] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2, // O atraso faz a onda propagar
                  }}
                  title={logo.name}
                >
                  <Icon
                    size={36}
                    aria-hidden="true"
                    focusable="false"
                    className={`transition-all duration-300 group-hover:scale-110 ${logo.hoverColor}`}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
