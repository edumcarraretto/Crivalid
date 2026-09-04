import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, MessageCircle, Send, X } from 'lucide-react'
import { createMailto } from '@/lib/site'

const feedbackTypes = ['Sugestão', 'Problema', 'Elogio'] as const
type FeedbackType = (typeof feedbackTypes)[number]

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState<FeedbackType>('Sugestão')
  const [message, setMessage] = useState('')
  const [prepared, setPrepared] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isOpen) return
    textareaRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  const prepareFeedback = (event: React.FormEvent) => {
    event.preventDefault()
    const page = `${window.location.pathname}${window.location.hash}`
    window.location.href = createMailto(`[Feedback: ${type}] MAKEPLOY`, `${message}\n\nPágina: ${page}`)
    setPrepared(true)
  }

  const close = () => {
    setIsOpen(false)
    window.setTimeout(() => setPrepared(false), 200)
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} aria-label="Enviar feedback sobre esta página" className="fixed bottom-4 right-4 z-[70] inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-3 text-sm font-bold text-neutral-900 shadow-[0_12px_35px_rgb(0_0_0/0.14)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 sm:bottom-6 sm:right-6">
        <MessageCircle size={18} aria-hidden="true" />
        <span className="hidden sm:inline">Feedback</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
            <motion.button type="button" aria-label="Fechar feedback" onClick={close} className="absolute inset-0 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }} className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl sm:p-8">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: 'var(--gradient-brand)' }} />
              <button type="button" onClick={close} aria-label="Fechar" className="absolute right-4 top-4 rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"><X size={18} /></button>
              {!prepared ? (
                <form onSubmit={prepareFeedback}>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">Ajude a construir</p>
                  <h2 id="feedback-title" className="mt-3 pr-10 text-2xl font-extrabold tracking-tight">Como podemos melhorar?</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">Seu comentário será associado apenas à página atual.</p>
                  <fieldset className="mt-6"><legend className="sr-only">Tipo de feedback</legend><div className="flex flex-wrap gap-2">{feedbackTypes.map((item) => <button key={item} type="button" onClick={() => setType(item)} aria-pressed={type === item} className={`rounded-full px-4 py-2 text-xs font-bold transition ${type === item ? 'bg-blue-500 text-white' : 'border border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-blue-200'}`}>{item}</button>)}</div></fieldset>
                  <label htmlFor="feedback-message" className="mt-5 block text-sm font-bold">Seu comentário</label>
                  <textarea ref={textareaRef} id="feedback-message" required minLength={5} maxLength={1200} rows={5} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Conte o que funcionou, o que faltou ou o que ficou confuso." className="mt-2 w-full resize-y rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm leading-6 outline-none placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white" />
                  <button type="submit" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-600"><Send size={16} /> Preparar envio</button>
                  <p className="mt-3 text-center text-xs leading-5 text-neutral-500">Abriremos seu aplicativo de e-mail. Nada será enviado sem sua confirmação.</p>
                </form>
              ) : (
                <div className="py-7 text-center" aria-live="polite"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check size={26} /></div><h2 id="feedback-title" className="mt-5 text-2xl font-extrabold">Mensagem preparada</h2><p className="mt-3 text-sm leading-6 text-neutral-600">Revise e confirme o envio no seu aplicativo de e-mail. Obrigado por ajudar a melhorar a MAKEPLOY.</p><button type="button" onClick={close} className="mt-6 rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white">Concluir</button></div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
