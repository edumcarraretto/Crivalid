import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, CheckCircle2, Mail, X } from 'lucide-react'
import { HighlightText } from '@/components/text/HighlightText'
import type { EarlyAccessSource } from '@/lib/earlyAccess'
import { useModalFocus } from '@/hooks/useModalFocus'

interface ModalContent {
  badge: string
  title: React.ReactNode
  description: React.ReactNode
  statLabel: string
  statValue: string
  statSubtext: string
  statusTitle: string
  statusSubtext: string
  ctaTitle: string
  ctaSubtitle: string
}

const MODAL_VARIANTS: Record<EarlyAccessSource, ModalContent> = {
  hero: {
    badge: 'Em construção',
    title: (
      <>
        A MAKEPLOY AINDA<br />
        NÃO ESTÁ <HighlightText variant="coral">ABERTA.</HighlightText>
      </>
    ),
    description: (
      <>
        Estamos criando a plataforma que reúne criação, publicação e operação num <HighlightText variant="yellow">único lugar.</HighlightText> O acesso será liberado por convite.
      </>
    ),
    statLabel: 'Uma plataforma',
    statValue: 'Tudo em 1',
    statSubtext: 'Crie. Publique. Opere.',
    statusTitle: 'Acesso por convite',
    statusSubtext: 'Lotes limitados v1',
    ctaTitle: 'Entre na fila de acesso',
    ctaSubtitle: 'Receba seu convite assim que o próximo lote abrir.',
  },
  navbar: {
    badge: 'Acesso antecipado',
    title: (
      <>
        CRIE, PUBLIQUE E<br />
        <HighlightText variant="coral">OPERE</HighlightText> SEU PRODUTO.
      </>
    ),
    description: (
      <>
        Do código ao deploy <HighlightText variant="yellow">sem trocar de ferramenta.</HighlightText> O acesso antecipado será liberado para os primeiros cadastrados.
      </>
    ),
    statLabel: 'Tudo integrado',
    statValue: 'Tudo em 1',
    statSubtext: 'Código. Deploy. Operação.',
    statusTitle: 'Acesso prioritário',
    statusSubtext: 'Fila oficial aberta',
    ctaTitle: 'Solicite seu acesso',
    ctaSubtitle: 'Avisamos assim que sua vaga estiver disponível.',
  },
  navbar_mobile: {
    badge: 'Acesso antecipado',
    title: (
      <>
        CRIE, PUBLIQUE E<br />
        <HighlightText variant="coral">OPERE</HighlightText> SEU PRODUTO.
      </>
    ),
    description: (
      <>
        Do código ao deploy <HighlightText variant="yellow">sem trocar de ferramenta.</HighlightText> O acesso antecipado será liberado para os primeiros cadastrados.
      </>
    ),
    statLabel: 'Tudo integrado',
    statValue: 'Tudo em 1',
    statSubtext: 'Código. Deploy. Operação.',
    statusTitle: 'Acesso prioritário',
    statusSubtext: 'Fila oficial aberta',
    ctaTitle: 'Solicite seu acesso',
    ctaSubtitle: 'Avisamos assim que sua vaga estiver disponível.',
  },
  metrics: {
    badge: 'Transição contínua',
    title: (
      <>
        EVOLUA SEM TER QUE<br />
        RECOMEÇAR DO <HighlightText variant="coral">ZERO.</HighlightText>
      </>
    ),
    description: (
      <>
        Importe materiais, estrutura e código para desenvolver num <HighlightText variant="yellow">fluxo contínuo.</HighlightText> Acesso liberado em lotes.
      </>
    ),
    statLabel: 'Continuidade',
    statValue: 'Sem recomeçar',
    statSubtext: 'Importe. Adapte. Escale.',
    statusTitle: 'Acesso por convite',
    statusSubtext: 'Vagas para projetos ativos',
    ctaTitle: 'Garanta sua vaga na fila',
    ctaSubtitle: 'Avisaremos para você testar com a estrutura do seu projeto.',
  },
  idea: {
    badge: 'Do prompt ao produto',
    title: (
      <>
        SUA IDEIA PRONTA<br />
        PARA <HighlightText variant="coral">FUNCIONAR.</HighlightText>
      </>
    ),
    description: (
      <>
        Gere arquitetura, interfaces e deploy integrado diretamente das suas ideias num <HighlightText variant="yellow">único ambiente.</HighlightText> Vagas por convite.
      </>
    ),
    statLabel: 'Do prompt ao ar',
    statValue: 'Direto ao ponto',
    statSubtext: 'Conceba. Gere. Publique.',
    statusTitle: 'Acesso por convite',
    statusSubtext: 'Fila de criadores v1',
    ctaTitle: 'Receba seu acesso',
    ctaSubtitle: 'Deixe seu e-mail para testar com suas próprias ideias no lançamento.',
  },
  footer: {
    badge: 'Acesso antecipado',
    title: (
      <>
        O PRÓXIMO PASSO<br />
        DA CRIAÇÃO <HighlightText variant="coral">DIGITAL.</HighlightText>
      </>
    ),
    description: (
      <>
        Criação, deploy e operação contínua sem quebras de contexto num <HighlightText variant="yellow">ecossistema único.</HighlightText> Convites por ordem de fila.
      </>
    ),
    statLabel: 'Uma plataforma',
    statValue: 'Tudo em 1',
    statSubtext: 'Crie. Publique. Opere.',
    statusTitle: 'Acesso por convite',
    statusSubtext: 'Fila oficial aberta',
    ctaTitle: 'Entre na fila oficial',
    ctaSubtitle: 'Seja um dos primeiros a experimentar a MAKEPLOY.',
  },
  workflow: {
    badge: 'Operação integrada',
    title: (
      <>
        PUBLICAR É SÓ O<br />
        COMEÇO DA <HighlightText variant="coral">OPERAÇÃO.</HighlightText>
      </>
    ),
    description: (
      <>
        Automatize rotinas, gerencie infraestrutura e evolua recursos num <HighlightText variant="yellow">único fluxo.</HighlightText> Acesso liberado por convite.
      </>
    ),
    statLabel: 'Automação total',
    statValue: 'Sem atrito',
    statSubtext: 'Monitore. Ajuste. Evolua.',
    statusTitle: 'Acesso por convite',
    statusSubtext: 'Vagas para equipes',
    ctaTitle: 'Solicite seu acesso',
    ctaSubtitle: 'Avisaremos assim que as vagas de operação forem abertas.',
  },
  tools: {
    badge: 'Ferramentas integradas',
    title: (
      <>
        TODAS AS SUAS<br />
        FERRAMENTAS NUM <HighlightText variant="coral">SÓ LUGAR.</HighlightText>
      </>
    ),
    description: (
      <>
        Documentos, tarefas, IA, dados e automações compartilhando o <HighlightText variant="yellow">mesmo contexto.</HighlightText> Acesso liberado por convite.
      </>
    ),
    statLabel: 'Tudo integrado',
    statValue: 'Tudo em 1',
    statSubtext: 'Crie. Conecte. Escale.',
    statusTitle: 'Acesso por convite',
    statusSubtext: 'Lotes de ferramentas v1',
    ctaTitle: 'Entre na fila de acesso',
    ctaSubtitle: 'Avisaremos assim que liberarmos novos acessos às ferramentas.',
  },
  faq: {
    badge: 'Dúvidas & Acesso',
    title: (
      <>
        TIRE SUAS DÚVIDAS E<br />
        GARANTA SUA <HighlightText variant="coral">VAGA.</HighlightText>
      </>
    ),
    description: (
      <>
        Nossa equipe libera acessos periódicos para criadores e desenvolvedores num <HighlightText variant="yellow">fluxo prioritário.</HighlightText>
      </>
    ),
    statLabel: 'Fila prioritária',
    statValue: 'Acesso direto',
    statSubtext: 'Sem burocracia.',
    statusTitle: 'Acesso por convite',
    statusSubtext: 'Suporte dedicado v1',
    ctaTitle: 'Solicitar acesso agora',
    ctaSubtitle: 'Deixe seu e-mail para receber as orientações de entrada.',
  },
}

export function EarlyAccessModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [source, setSource] = useState<EarlyAccessSource>('hero')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const open = (event: Event) => {
      const customEvent = event as CustomEvent<{ source?: EarlyAccessSource }>
      if (customEvent.detail?.source && MODAL_VARIANTS[customEvent.detail.source]) {
        setSource(customEvent.detail.source)
      } else {
        setSource('hero')
      }
      setSubmitted(false)
      setIsOpen(true)
    }
    window.addEventListener('makeploy:early-access', open)
    return () => window.removeEventListener('makeploy:early-access', open)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])
  useModalFocus(isOpen, modalRef, close)
  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  const content = MODAL_VARIANTS[source] || MODAL_VARIANTS.hero

  return (
    <AnimatePresence>
      {isOpen && (
        <div ref={modalRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="early-access-title" className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-3 sm:p-4">
          <motion.button
            type="button"
            aria-label="Fechar mensagem"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 cursor-default bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-[820px] my-auto"
          >
            {/* Botão de Fechar flutuante */}
            <button
              type="button"
              onClick={close}
              aria-label="Fechar janela"
              className="absolute -top-3 -right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-500 shadow-xl border border-neutral-200 transition hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {!submitted ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">

                {/* ── CARD ESQUERDO (Grande, limpo e vertical - padrão 2 linhas) ── */}
                <div className="md:col-span-6 relative flex flex-col justify-between overflow-hidden rounded-[26px] bg-white border border-neutral-200/90 p-7 sm:p-9 shadow-lg min-h-[380px]">
                  {/* Linha gradiente no topo do card */}
                  <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3.5px]" style={{ background: 'var(--gradient-brand)' }} />
                  
                  {/* Marca d'água sutil de brilho no fundo */}
                  <div aria-hidden="true" className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-blue-50/70 blur-2xl pointer-events-none" />

                  <div>
                    {/* Badge estilo pílula */}
                    <span className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white shadow-sm">
                      {content.badge}
                    </span>

                    {/* Título enxuto em exatamente 2 linhas */}
                    <h2 id="early-access-title" className="mt-6 text-2xl sm:text-[1.95rem] font-black uppercase leading-[1.12] tracking-tight text-neutral-950">
                      {content.title}
                    </h2>
                  </div>

                  {/* Texto na base */}
                  <p className="mt-8 text-sm sm:text-[15px] leading-relaxed text-neutral-600 font-medium">
                    {content.description}
                  </p>
                </div>

                {/* ── COLUNA DIREITA (2 cards em cima + 1 card largo embaixo) ── */}
                <div className="md:col-span-6 flex flex-col gap-3.5">
                  
                  {/* Linha superior: 2 cards lado a lado */}
                  <div className="grid grid-cols-2 gap-3.5 flex-1">
                    
                    {/* Card 1: Verde Vibrante (Métrica / Destaque) */}
                    <div className="flex flex-col justify-between rounded-[24px] p-5 sm:p-6 text-white relative overflow-hidden shadow-md" style={{ background: 'linear-gradient(145deg, #059669, #10b981)' }}>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-100">
                        {content.statLabel}
                      </span>
                      
                      <div className="my-2">
                        <span className="text-2xl sm:text-[1.85rem] font-black tracking-tight text-white inline-block leading-tight">
                          {content.statValue}
                        </span>
                        {/* Linha de destaque branca embaixo */}
                        <div className="h-1 w-14 bg-white/70 rounded-full mt-1.5 shadow-sm" />
                      </div>

                      <span className="text-[11px] font-semibold text-emerald-100/90">
                        {content.statSubtext}
                      </span>
                    </div>

                    {/* Card 2: Dark Premium (Logo MAKEPLOY pura e centralizada) */}
                    <div className="flex flex-col justify-between items-center text-center rounded-[24px] bg-neutral-950 p-5 sm:p-6 text-white border border-white/10 shadow-md relative overflow-hidden">
                      <div className="flex items-center justify-center my-auto py-1">
                        <img
                          src="/nova-logo-384.webp"
                          alt="MAKEPLOY"
                          width={64}
                          height={64}
                          className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
                        />
                      </div>

                      <div className="mt-3">
                        <h3 className="text-[15px] font-bold text-white leading-tight">
                          {content.statusTitle}
                        </h3>
                        <p className="mt-1 text-[11px] text-neutral-400 font-mono">
                          {content.statusSubtext}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Linha inferior: Card Horizontal com formulário de E-mail */}
                  <div className="rounded-[24px] p-5 sm:p-6 text-white relative overflow-hidden shadow-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700">
                    {/* Brilho decorativo */}
                    <div aria-hidden="true" className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

                    <div>
                      <h3 className="text-sm sm:text-[15px] font-black uppercase tracking-wider text-white">
                        {content.ctaTitle}
                      </h3>
                      <p className="mt-1 text-xs text-blue-100">
                        {content.ctaSubtitle}
                      </p>
                    </div>

                    <form onSubmit={submit} className="mt-4">
                      <div className="flex items-center gap-2 rounded-2xl bg-white/15 p-1.5 backdrop-blur-md border border-white/25 focus-within:bg-white/20 focus-within:border-white/50 transition">
                        <Mail className="ml-3 h-4 w-4 text-blue-100 flex-shrink-0" />
                        <input
                          aria-label="Seu e-mail para acesso antecipado"
                          type="email"
                          required
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seuemail@exemplo.com"
                          className="w-full bg-transparent px-2 py-1.5 text-sm text-white placeholder-blue-200/70 outline-none"
                        />
                        {/* Botão circular branco com seta */}
                        <button
                          type="submit"
                          aria-label="Garantir minha vaga"
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-neutral-950 shadow-md transition hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <ArrowRight size={18} strokeWidth={2.5} />
                        </button>
                      </div>
                      <p className="mt-2 text-[10px] text-blue-200/80 text-center">
                        Sem spam. Apenas o aviso de liberação do seu acesso.
                      </p>
                    </form>
                  </div>

                </div>

              </div>
            ) : (
              /* ── Estado de Sucesso ── */
              <div className="overflow-hidden rounded-[26px] bg-white border border-neutral-200/90 p-8 sm:p-11 text-center shadow-2xl relative">
                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: 'var(--gradient-brand)' }} />
                
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-sm" aria-live="polite">
                  <CheckCircle2 size={34} />
                </div>
                
                <h2 id="early-access-title" className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
                  Você está na fila.
                </h2>
                
                <p className="mx-auto mt-3 max-w-md text-sm sm:text-base leading-relaxed text-neutral-600">
                  Seu e-mail foi registrado. Avisaremos assim que liberarmos o próximo lote de acessos.
                </p>
                
                <button
                  type="button"
                  onClick={close}
                  className="mt-8 inline-flex items-center justify-center rounded-xl bg-neutral-950 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-neutral-800 active:scale-98 cursor-pointer shadow-md"
                >
                  Voltar ao site
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
