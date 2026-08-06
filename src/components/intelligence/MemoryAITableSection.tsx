import { JourneyPreviewCard } from './JourneyPreviewCard'
import { AIModelsPreview } from './AIModelsPreview'
import { MultiplayerAIPreview } from './MultiplayerAIPreview'
import { ConnectedTechPreview } from './ConnectedTechPreview'
import { AmbientIntelligencePreview } from './AmbientIntelligencePreview'
import { DeepSearchPreview } from './DeepSearchPreview'

export function MemoryAITableSection() {
  return (
    <section className="bg-white relative">
      {/* Main dark area — inset card (bottom half, connects with Creation above) */}
      <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 relative bg-black rounded-b-[24px] sm:rounded-b-[32px] pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
      {/* Container principal para o grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título e Descrição */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Nada se compara ao MAKEPLOY.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto">
            Reconstruímos tudo do zero.
          </p>
        </div>

        {/* Grid de cards quadrados — 3×2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10 rounded-2xl sm:rounded-[32px] overflow-hidden">

          {/* ═══ Card 1: Jornada ═══ */}
          <div className="flex flex-col p-7 sm:p-8 md:aspect-square bg-black relative overflow-hidden">
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
          </div>

          {/* ═══ Card 2: Modelos ═══ */}
          <div className="flex flex-col p-7 sm:p-8 md:aspect-square bg-black relative overflow-hidden">
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
          </div>

          {/* ═══ Card 3: Criação ═══ */}
          <div className="flex flex-col p-7 sm:p-8 md:aspect-square bg-black relative overflow-hidden">
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
          </div>

          {/* ═══ Card 4: Tecnologia Conectada ═══ */}
          <div className="flex flex-col p-7 sm:p-8 md:aspect-square bg-black relative overflow-hidden">
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
          </div>

          {/* ═══ Card 5: Inteligência Contextual ═══ */}
          <div className="flex flex-col p-7 sm:p-8 md:aspect-square bg-black relative overflow-hidden">
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
          </div>

          {/* ═══ Card 6: Busca Profunda ═══ */}
          <div className="flex flex-col p-7 sm:p-8 md:aspect-square bg-black relative overflow-hidden">
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
          </div>

        </div>
      </div>
      </div>
    </section>
  )
}
