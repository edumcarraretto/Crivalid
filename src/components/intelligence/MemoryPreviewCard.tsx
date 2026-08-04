export function MemoryPreviewCard() {
  return (
    <div className="relative w-full max-w-[280px] mx-auto mt-16 pb-8">
      {/* Glow / Aurora na base (canto inferior esquerdo/central) */}
      <div className="absolute -bottom-4 left-0 right-8 h-24 bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-500 rounded-full blur-[40px] opacity-40 z-0" />
      
      {/* Card principal */}
      <div 
        className="relative z-10 rounded-2xl p-6 flex flex-col h-[140px] overflow-hidden"
        style={{
          backgroundColor: '#15151a',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)'
        }}
      >
        {/* Leve brilho interno no topo/esq */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        
        <div className="flex items-center justify-between mb-auto relative z-10">
          <span className="text-white font-medium text-sm">Memória atualizada</span>
          {/* Logo colorido */}
          <div className="flex items-center justify-center relative w-5 h-5">
            <div className="absolute top-0 right-1 w-2 h-2 rounded-full bg-blue-400" />
            <div className="absolute bottom-1 left-0 w-2 h-2 rounded-full bg-pink-400" />
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-purple-400" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase mb-1">
            Preferência do Usuário:
          </div>
          <div className="text-white text-2xl font-semibold tracking-tight">
            Prefers visuals
          </div>
        </div>
      </div>
    </div>
  )
}
