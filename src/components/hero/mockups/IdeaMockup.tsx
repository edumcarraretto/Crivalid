import { useState } from 'react'
import { Sparkles, Send, Lightbulb } from 'lucide-react'

const SUGGESTIONS = [
  "SaaS para clínicas",
  "App de finanças pessoais",
  "Plataforma E-learning",
  "Delivery vegano"
]

export function IdeaMockup() {
  const [idea, setIdea] = useState('')
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null)

  const handleSuggestionClick = (suggestion: string) => {
    if (selectedSuggestion === suggestion) {
      setSelectedSuggestion(null)
      setIdea('')
    } else {
      setSelectedSuggestion(suggestion)
      setIdea(suggestion)
    }
  }

  return (
    <div className="w-full mx-auto rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden flex flex-col">
      {/* Window header (macOS style) */}
      <div className="flex items-center px-4 py-3 border-b border-neutral-100 bg-neutral-50/80 backdrop-blur-sm relative shrink-0">
        <div className="flex gap-1.5 absolute left-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        <div className="w-full text-center">
          <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest select-none flex items-center justify-center gap-1.5">
            <Lightbulb size={12} />
            Nova Ideia
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2">
            Descreva sua ideia
            <Sparkles size={18} className="text-violet-500" />
          </h3>
          <p className="text-sm text-neutral-500 mt-1">
            Qual problema você quer resolver e para quem?
          </p>
        </div>

        {/* Text Input */}
        <div className="relative mb-6">
          <textarea
            value={idea}
            onChange={(e) => {
              setIdea(e.target.value)
              setSelectedSuggestion(null)
            }}
            placeholder="Ex: Um aplicativo que ajuda autônomos a organizar..."
            className="w-full h-32 p-4 pb-12 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 resize-none transition-all shadow-inner"
          />
          <button 
            type="button"
            className={`absolute bottom-3 right-3 p-2.5 rounded-lg flex items-center justify-center transition-colors duration-200 ${idea.trim() ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'}`}
          >
            <Send size={16} className={idea.trim() ? 'ml-0.5' : ''} />
          </button>
        </div>

        {/* Suggestions */}
        <div>
          <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-3">
            Ou comece com um exemplo
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedSuggestion === suggestion
                    ? 'bg-violet-100 text-violet-700 border-violet-300 shadow-sm'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-violet-300 hover:bg-violet-50'
                } border`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
