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
    <section id="inteligencia" className="bg-white relative">
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
            IA que <GradientText inverse>conhece o projeto.</GradientText>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto">
            Objetivos, decisões, arquivos e histórico acompanham cada nova tarefa.
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
                O HISTÓRICO CONTINUA ÚTIL
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Comece uma ideia ou traga o que já existe. O <strong className="text-white font-medium">histórico do projeto</strong> continua orientando mudanças e próximas versões.
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
                MODELOS DIFERENTES. UM CONTEXTO.
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Pesquisa, análise, conteúdo e código avançam sem exigir que você explique o projeto novamente.
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
                UMA BASE. MUITOS PRODUTOS.
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Sites, cursos, aplicações e SaaS partem do mesmo sistema sem perder liberdade de estrutura.
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
                INTEGRAÇÕES AO REDOR DO PROJETO
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Serviços, dados e ferramentas externas entram no fluxo sem fragmentar a operação.
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
                O PRÓXIMO PASSO CONSIDERA OS ANTERIORES
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Objetivos, decisões e histórico ajudam a <strong className="text-white font-medium">definir ações</strong> coerentes com o estágio atual.
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
                PESQUISA ANTES DA RESPOSTA
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                A MAKEPLOY investiga contexto e referências antes de propor uma direção.
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
