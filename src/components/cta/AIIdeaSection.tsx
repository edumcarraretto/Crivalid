import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUp, ChevronDown, Sparkles } from 'lucide-react'

const SUGGESTIONS = [
  'Crie um portfólio pessoal',
  'Criar site de startup',
  'Launch landing page',
  'Comece o blog da empresa',
]

export function AIIdeaSection() {
  const [prompt, setPrompt] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSuggestionClick = (text: string) => {
    setPrompt(text)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    console.log('Simulating AI generation for:', prompt)
    setPrompt('')
  }

  return (
    <section className="bg-white pt-14 sm:pt-20 pb-0">
      <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16">
        <div className="relative bg-black rounded-t-[32px] sm:rounded-t-[40px] rounded-b-none py-20 sm:py-28 overflow-hidden flex flex-col items-center px-4 sm:px-6 shadow-2xl">
          
          {/* ── Background Glow ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

          {/* ── Title ── */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-20 text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight text-white text-center mb-10 sm:mb-14 leading-[1.1] max-w-3xl"
          >
            Sua próxima ideia <br className="hidden sm:block" />
            começa aqui.
          </motion.h2>

          {/* ── Prompt Box ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`
              relative z-20 w-full max-w-4xl bg-neutral-900 border rounded-[24px] p-2 sm:p-3
              transition-all duration-300 shadow-2xl
              ${isFocused ? 'border-neutral-700 ring-4 ring-white/5' : 'border-neutral-800/80'}
            `}
          >
            <div className="relative h-32 sm:h-44 px-3 sm:px-4 pt-3 sm:pt-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Descreva o que você quer criar..."
                className="w-full h-full bg-transparent text-neutral-200 placeholder:text-neutral-600 text-lg sm:text-xl resize-none focus:outline-none"
              />
            </div>

            {/* Controls Footer */}
            <div className="flex items-center justify-between mt-2 px-3 sm:px-4 pb-2">
              {/* Model Selector */}
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors font-medium px-2 py-1.5 rounded-lg hover:bg-white/5"
              >
                <Sparkles className="w-4 h-4" />
                GPT 5.6 Terra
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="p-2 sm:p-2.5 rounded-[12px] bg-white text-black hover:bg-neutral-200 disabled:opacity-50 disabled:bg-neutral-800 disabled:text-neutral-600 transition-all duration-200 shadow-sm"
                aria-label="Gerar com IA"
              >
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </motion.form>

          {/* ── Suggestions Chips ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-20 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 w-full max-w-4xl"
          >
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-neutral-800 bg-neutral-900 text-[13px] sm:text-sm text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 hover:border-blue-500 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>

          {/* ── Bottom Cutout ── */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[28px] w-[86vw] sm:h-[34px] sm:w-[74vw] md:h-[40px] md:w-[64vw] rounded-t-[20px] sm:rounded-t-[22px] bg-white z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
