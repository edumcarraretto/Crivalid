import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, CheckCircle2, MessageCircle, X } from 'lucide-react'
import { HighlightText } from '@/components/text/HighlightText'
import { createMailto } from '@/lib/site'


export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [prepared, setPrepared] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()

  const close = useCallback(() => setIsOpen(false), [])

  // Fechar ao clicar fora ou apertar Escape
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        close()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, close])


  const prepareFeedback = (event: React.FormEvent) => {
    event.preventDefault()
    const page = `${window.location.pathname}${window.location.hash}`
    window.location.href = createMailto(
      `[Feedback] MAKEPLOY`,
      `${message}\n\nPágina: ${page}`
    )
    setPrepared(true)
  }

  return (
    <>
      {/* ── CARD FLUTUANTE EM CIMA DO BOTÃO (Popover Pop-up) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            role="dialog"
            aria-modal="false"
            aria-labelledby="feedback-popover-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 380 }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed bottom-[74px] right-4 sm:right-6 z-[85] w-[calc(100vw-32px)] sm:w-[500px] overflow-hidden rounded-[24px] border border-neutral-200/90 bg-white/95 backdrop-blur-xl px-5 py-4 sm:px-6 sm:py-5 shadow-[0_16px_45px_rgba(0,0,0,0.14)]"
          >
            {/* Linha gradiente oficial no topo */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: 'var(--gradient-brand)' }}
            />

            {/* Brilho decorativo no fundo */}
            <div
              aria-hidden="true"
              className="absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-blue-50/80 blur-2xl pointer-events-none"
            />

            {!prepared ? (
              <form onSubmit={prepareFeedback}>
                {/* Logo Centralizada + Botão Fechar */}
                <div className="flex items-center justify-between gap-2">
                  <div className="w-7" />

                  <img
                    src="/text-logo-512.webp"
                    alt="MAKEPLOY"
                    className="w-28 h-auto object-contain -my-5"
                    draggable={false}
                  />

                  <button
                    type="button"
                    onClick={close}
                    aria-label="Fechar janela"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-neutral-200 hover:text-neutral-900 cursor-pointer"
                  >
                    <X size={15} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Título centralizado */}
                <h3
                  id="feedback-popover-title"
                  className="mt-2 text-center text-base sm:text-lg font-black uppercase leading-tight tracking-tight text-neutral-950"
                >
                  Sua opinião <HighlightText variant="blue" className="!bg-[#168cff]/35">importa</HighlightText>
                </h3>

                <p className="mt-1 text-center text-xs text-neutral-500 leading-relaxed">
                  Ajude a evoluir a plataforma. Cada detalhe conta.
                </p>

                {/* Área de Texto */}
                <div className="mt-3">
                  <textarea
                    id="feedback-popover-message"
                    required
                    minLength={5}
                    maxLength={1200}
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="O que podemos melhorar na sua experiência?"
                    className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50/70 p-3.5 text-xs sm:text-sm leading-relaxed text-neutral-900 placeholder:text-neutral-400 outline-none transition duration-150 focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10"
                  />
                  <div className="flex justify-end mt-1">
                    <span
                      className={`text-[10px] font-mono ${
                        message.length > 1000 ? 'font-bold text-amber-600' : 'text-neutral-300'
                      }`}
                    >
                      {message.length}/1200
                    </span>
                  </div>
                </div>

                {/* Botão de Envio */}
                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-between rounded-xl bg-blue-600 hover:bg-blue-500 pl-5 pr-1.5 py-1.5 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all duration-150 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.99] cursor-pointer group"
                >
                  <span>Enviar feedback</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 transition-transform group-hover:translate-x-0.5 shadow-2xs">
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </span>
                </button>

                <p className="mt-1.5 text-center text-[10px] leading-relaxed text-neutral-400">
                  Abre seu e-mail com a mensagem pronta para envio.
                </p>
              </form>
            ) : (
              /* ── Estado de Sucesso ── */
              <div className="py-4 text-center" aria-live="polite">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-xs">
                  <CheckCircle2 size={28} />
                </div>

                <h3
                  id="feedback-popover-title"
                  className="text-base sm:text-lg font-black uppercase tracking-tight text-neutral-950"
                >
                  Mensagem preparada!
                </h3>

                <p className="mx-auto mt-1.5 max-w-xs text-xs leading-relaxed text-neutral-600">
                  Seu cliente de e-mail foi aberto com os dados. Basta revisar e enviar. Obrigado!
                </p>

                <button
                  type="button"
                  onClick={close}
                  className="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-2 text-xs font-bold text-white transition active:scale-[0.98] cursor-pointer shadow-sm shadow-blue-500/20"
                >
                  Concluir
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTÃO FLUTUANTE NA PÁGINA (Gatilho Elegante & Fundo Claro) ── */}
      <div className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6 group">
        {/* Halo / Glow sutil no hover */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400/20 via-indigo-400/15 to-purple-400/20 opacity-0 blur-md transition-opacity duration-300 ${
            isOpen ? 'opacity-40' : 'group-hover:opacity-100'
          }`}
        />

        <motion.button
          ref={triggerRef}
          type="button"
          onClick={() => {
            setPrepared(false)
            setIsOpen((prev) => !prev)
          }}
          whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Fechar painel de feedback' : 'Enviar feedback sobre esta página'}
          className={`relative inline-flex items-center gap-2.5 rounded-full px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs sm:text-[13px] font-semibold tracking-wide backdrop-blur-xl transition-all duration-200 cursor-pointer select-none ${
            isOpen
              ? 'bg-white hover:bg-neutral-50 text-neutral-800 hover:text-neutral-950 border border-neutral-300 shadow-[0_8px_25px_rgba(0,0,0,0.12)] ring-2 ring-blue-500/20'
              : 'bg-white/95 hover:bg-white text-neutral-800 hover:text-neutral-950 border border-neutral-200/90 hover:border-neutral-300 shadow-[0_8px_30px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.12),0_2px_8px_rgba(59,130,246,0.1)]'
          }`}
        >
          {/* Ícone com mini-badge sofisticado e movimento suave */}
          <span
            className={`relative flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
              isOpen
                ? 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200 group-hover:text-neutral-900 shadow-2xs'
                : 'bg-neutral-100 text-neutral-700 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 shadow-2xs'
            }`}
          >
            {isOpen ? (
              <X size={13} strokeWidth={2.5} />
            ) : (
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: [0, -9, 7, -5, 3, 0],
                        y: [0, -1.5, 0],
                      }
                }
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 2.8,
                  ease: 'easeInOut',
                }}
                className="inline-flex items-center justify-center"
              >
                <MessageCircle size={13} strokeWidth={2.3} />
              </motion.span>
            )}
          </span>

          <span className="font-semibold tracking-tight">
            {isOpen ? 'Fechar' : 'Feedback'}
          </span>
        </motion.button>
      </div>
    </>
  )
}
