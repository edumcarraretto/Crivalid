import { JourneyPreviewCard } from './JourneyPreviewCard'
import { AIModelsPreview } from './AIModelsPreview'
import { MultiplayerAIPreview } from './MultiplayerAIPreview'

export function MemoryAITableSection() {
  return (
    <section className="bg-black py-24 sm:py-32 relative overflow-hidden">
      {/* Container principal para o grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título e Descrição */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Nada se compara ao Brain<sup className="text-xl sm:text-2xl md:text-3xl relative -top-2 sm:-top-3">2.</sup>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto">
            Reconstruímos o Brain do zero.
          </p>
        </div>

        {/* Bloco/Tabela principal */}
        <div className="bg-[#050505] border border-white/10 rounded-none sm:rounded-2xl overflow-hidden flex flex-col md:grid md:grid-cols-3">
          
          {/* Coluna 1: Jornada */}
          <div className="flex flex-col p-8 sm:p-10 border-b md:border-b-0 md:border-r border-white/10 relative h-full">
            <div className="mb-10 relative z-20">
              <h3 className="text-neutral-400 font-mono text-[11px] sm:text-[12px] tracking-[0.2em] uppercase mb-4 font-medium">
                Com você em toda a jornada
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Não é apenas sobre criar. É sobre <strong className="text-white font-medium">caminhar ao seu lado</strong>. Da primeira faísca da ideia até o crescimento contínuo do seu projeto, a plataforma evolui com você.
              </p>
            </div>
            
            <div className="mt-auto flex-1 flex flex-col justify-end">
              <JourneyPreviewCard />
            </div>
          </div>

          {/* Coluna 2: Modelos */}
          <div className="flex flex-col p-8 sm:p-10 border-b md:border-b-0 md:border-r border-white/10 relative h-full">
            <div className="mb-10 relative z-20">
              <h3 className="text-white font-mono text-[11px] sm:text-[12px] tracking-widest uppercase mb-4 font-semibold">
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

          {/* Coluna 3: Criação */}
          <div className="flex flex-col p-8 sm:p-10 relative h-full">
            <div className="mb-10 relative z-20">
              <h3 className="text-white font-mono text-[11px] sm:text-[12px] tracking-widest uppercase mb-4 font-semibold">
                Feito para qualquer tipo de criação
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Da ideia ao lançamento, a plataforma se adapta ao tipo de criação que você quiser construir.
              </p>
            </div>

            <div className="mt-auto flex-1 flex flex-col justify-end">
              <MultiplayerAIPreview />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
