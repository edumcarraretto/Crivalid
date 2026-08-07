import { JourneyPreviewCard } from './JourneyPreviewCard'
import { AIModelsPreview } from './AIModelsPreview'
import { MultiplayerAIPreview } from './MultiplayerAIPreview'
import { ConnectedTechPreview } from './ConnectedTechPreview'
import { AmbientIntelligencePreview } from './AmbientIntelligencePreview'
import { DeepSearchPreview } from './DeepSearchPreview'
import { motion } from 'motion/react'
import { GradientText } from '../text/GradientText'

const cardReveal = {
  hidden: { opacity: 0, y: 22, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export function MemoryAITableSection() {
  return (
    <section className="bg-white relative">
      {/* Main dark area — inset card (bottom half, connects with Creation above) */}
      <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 relative bg-black rounded-b-[24px] sm:rounded-b-[32px] pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
      {/* Container principal para o grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título e Descrição */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Nada se compara ao <GradientText inverse>MAKEPLOY.</GradientText>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto">
            Reconstruímos tudo do zero.
          </p>
        </motion.div>

        {/* Grid de cards quadrados — 3×2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-70px' }}
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10 rounded-2xl sm:rounded-[32px] overflow-hidden"
        >

          {/* ═══ Card 1: Jornada ═══ */}
          <motion.div variants={cardReveal} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col p-7 sm:p-8 md:aspect-square bg-black relative overflow-hidden">
            <div className="mb-6 relative z-20">
              <h3 className="text-white text-[11px] sm:text-[12px] tracking-widest uppercase mb-4 font-bold">
                Com Você em Toda a Jornada
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Não é apenas sobre criar. É sobre <strong className="text-white font-medium">caminhar ao seu lado</strong>. Da primeira faísca da ideia até o crescimento contínuo do seu projeto, a plataforma evolui com você.
              </p>
            </div>
            
            <div className="mt-auto flex-1 flex flex-col justify-end">
              <JourneyPreviewCard />
            </div>
          </motion.div>

          {/* ═══ Card 2: Modelos ═══ */}
          <motion.div variants={cardReveal} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col p-7 sm:p-8 md:aspect-square bg-black relative overflow-hidden">
            <div className="mb-6 relative z-20">
              <h3 className="text-white text-[11px] sm:text-[12px] tracking-widest uppercase mb-4 font-bold">
                Toda IA, Ilimitada
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                GPT, Claude Opus, Gemini e muito mais. Cada modelo funciona com pleno conhecimento do seu trabalho.
              </p>
            </div>

            <div className="mt-auto flex-1 flex flex-col justify-end">
              <AIModelsPreview />
            </div>
          </motion.div>

          {/* ═══ Card 3: Criação ═══ */}
          <motion.div variants={cardReveal} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col p-7 sm:p-8 md:aspect-square bg-black relative overflow-hidden">
            <div className="mb-6 relative z-20">
              <h3 className="text-white text-[11px] sm:text-[12px] tracking-widest uppercase mb-4 font-bold">
                Feito para Qualquer Tipo de Criação
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Da ideia ao lançamento, a plataforma se adapta ao tipo de criação que você quiser construir.
              </p>
            </div>

            <div className="mt-auto flex-1 flex flex-col justify-end">
              <MultiplayerAIPreview />
            </div>
          </motion.div>

          {/* ═══ Card 4: Tecnologia Conectada ═══ */}
          <motion.div variants={cardReveal} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col p-7 sm:p-8 md:aspect-square bg-black relative overflow-hidden">
            <div className="mb-6 relative z-20">
              <h3 className="text-white text-[11px] sm:text-[12px] tracking-widest uppercase mb-4 font-bold">
                Tecnologia Conectada e Sem Limites
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Utilizamos <strong className="text-white font-medium">tecnologia de ponta</strong>, <strong className="text-white font-medium">conectada</strong> a ferramentas, serviços e recursos modernos para oferecer o <strong className="text-white font-medium">melhor resultado possível</strong> com mais inteligência e velocidade.
              </p>
            </div>

            <div className="mt-auto flex-1 flex flex-col justify-end w-[110%] -ml-[5%] max-w-none items-center -translate-y-6">
              <ConnectedTechPreview />
            </div>
          </motion.div>

          {/* ═══ Card 5: Inteligência Contextual ═══ */}
          <motion.div variants={cardReveal} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col p-7 sm:p-8 md:aspect-square bg-black relative overflow-hidden">
            <div className="mb-6 relative z-20">
              <h3 className="text-white text-[11px] sm:text-[12px] tracking-widest uppercase mb-4 font-bold">
                Inteligência Contextual
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                A plataforma acompanha cada etapa da sua criação, <strong className="text-white font-medium">entende o contexto do projeto</strong> e <strong className="text-white font-medium">sugere melhorias</strong> <strong className="text-white font-medium">antes mesmo de você pedir</strong>.
              </p>
            </div>

            <div className="mt-auto flex-1 flex flex-col justify-end">
              <AmbientIntelligencePreview />
            </div>
          </motion.div>

          {/* ═══ Card 6: Busca Profunda ═══ */}
          <motion.div variants={cardReveal} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col p-7 sm:p-8 md:aspect-square bg-black relative overflow-hidden">
            <div className="mb-auto relative z-20">
              <h3 className="text-white text-[11px] sm:text-[12px] tracking-widest uppercase mb-4 font-bold">
                Busca Profunda
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Antes de criar, a plataforma <strong className="text-white font-medium">analisa o contexto</strong>, referências e ideias para encontrar a <strong className="text-white font-medium">melhor direção possível</strong>.
              </p>
            </div>

            <div className="mt-auto flex-1 flex flex-col justify-end relative z-10">
              <DeepSearchPreview />
            </div>

            {/* Fade right — conteúdo dissolve horizontalmente encostando na divisão do card */}
            <div
              className="absolute top-0 right-0 bottom-0 z-30 pointer-events-none"
              style={{
                width: '45%',
                background: 'linear-gradient(to right, transparent 0%, transparent 10%, rgb(10 10 10 / 0.1) 30%, rgb(10 10 10 / 0.4) 55%, rgb(10 10 10 / 0.8) 80%, var(--color-surface-inverse) 100%)',
              }}
            />
          </motion.div>

        </motion.div>
      </div>
      </div>
    </section>
  )
}
