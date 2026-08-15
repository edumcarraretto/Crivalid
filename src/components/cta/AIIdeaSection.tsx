import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUp, ChevronDown, Sparkles } from 'lucide-react'
import { GradientText } from '../text/GradientText'

const SUGGESTIONS = [
  'Criar um SaaS',
  'Criar um site',
  'Lançar uma página de vendas',
  'Continuar um projeto',
]

export function AIIdeaSection() {
  const [prompt, setPrompt] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const reduceMotion = useReducedMotion()

  const handleSuggestionClick = (text: string) => {
    setPrompt(text)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    setPrompt('')
  }

  return (
    <section id="comece" className="bg-white pt-14 sm:pt-20 pb-0">
      <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16">
        <div className="relative bg-black rounded-t-[32px] sm:rounded-t-[40px] rounded-b-none py-20 sm:py-28 overflow-hidden flex flex-col items-center px-4 sm:px-6 shadow-2xl">
          
          {/* ── Background Glow ── */}
          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { x: ['-54%', '-46%', '-54%'], scale: [0.92, 1.06, 0.92], opacity: [0.45, 0.8, 0.45] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle,rgb(22_140_255_/_0.16),transparent_64%)] blur-[80px] pointer-events-none"
          />

          {/* ── Title ── */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-20 text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight text-white text-center mb-10 sm:mb-14 leading-[1.1] max-w-3xl"
          >
            Comece de onde está. <br className="hidden sm:block" />
            <GradientText inverse>Continue sem recomeçar.</GradientText>
          </motion.h2>

          {/* ── Prompt Box ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              boxShadow: isFocused
                ? '0 28px 80px rgb(0 103 217 / 0.22), 0 0 0 1px rgb(22 140 255 / 0.22)'
                : '0 24px 64px rgb(0 0 0 / 0.34), 0 0 0 1px rgb(255 255 255 / 0.02)',
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, boxShadow: { duration: 0.35, delay: 0 } }}
            className={`
              relative z-20 w-full max-w-4xl bg-neutral-900 border rounded-[24px] p-2 sm:p-3
              transition-all duration-300 shadow-2xl
              ${isFocused ? 'border-neutral-700 ring-4 ring-white/5' : 'border-neutral-800/80'}
            `}
          >
            <div className="relative h-32 sm:h-44 px-3 sm:px-4 pt-3 sm:pt-4">
              <textarea
                aria-label="Descreva sua ideia ou projeto"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Descreva uma ideia ou o projeto que já existe."
                className="w-full h-full bg-transparent text-neutral-200 placeholder:text-neutral-600 text-lg sm:text-xl resize-none focus:outline-none"
              />
            </div>

            {/* Controls Footer */}
            <div className="flex items-center justify-between mt-2 px-3 sm:px-4 pb-2">
              {/* Model Selector */}
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors font-medium px-2 py-1.5 rounded-lg hover:bg-white/5"
              >
                <Sparkles className="w-4 h-4" />
                Contexto do projeto
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="group p-2 sm:p-2.5 rounded-[12px] bg-white text-black hover:bg-neutral-200 disabled:opacity-50 disabled:bg-neutral-800 disabled:text-neutral-400 transition-all duration-200 shadow-sm active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Começar projeto"
              >
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-y-0.5" />
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
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-neutral-800 bg-neutral-900 text-[13px] sm:text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-blue-500 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 cursor-pointer"
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
