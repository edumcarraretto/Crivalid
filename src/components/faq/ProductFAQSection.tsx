import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Plus, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { openEarlyAccess } from '@/lib/earlyAccess'

// ─── FAQ Questions & Answers ──────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    id: 'what-is',
    question: 'O que é a MAKEPLOY?',
    answer:
      'A MAKEPLOY é uma plataforma completa que reúne ideação, criação no-code, desenvolvimento em código com IA, automações e publicação em nuvem em um único ecossistema integrado.',
  },
  {
    id: 'coding-required',
    question: 'Preciso saber programar para começar?',
    answer:
      'Não. Você pode começar 100% visualmente e contar com auxílio de inteligência artificial em todas as etapas. Quando quiser controle total, você pode abrir e editar o código diretamente no IDE integrado.',
  },
  {
    id: 'existing-project',
    question: 'Posso continuar um projeto que já existe?',
    answer:
      'Sim. Você pode importar materiais, estruturas e código existentes, organizar o contexto e continuar desenvolvendo a partir do estágio atual sem recomeçar do zero.',
  },
  {
    id: 'nocode-limited',
    question: 'Ficarei limitado ao no-code?',
    answer:
      'Não. A criação visual e o código compartilham a mesma base. Você tem total liberdade para alternar entre blocos visuais e código customizado sempre que precisar.',
  },
  {
    id: 'import-export',
    question: 'Posso importar e exportar meu projeto?',
    answer:
      'Sim. O seu projeto pertence a você. Você pode exportar todo o código, ativos e banco de dados quando quiser, sem ficar preso a uma única plataforma.',
  },
  {
    id: 'what-to-build',
    question: 'O que posso construir na MAKEPLOY?',
    answer:
      'Você pode construir desde páginas de alta conversão, landing pages e sites institucionais até cursos, SaaS, web apps interativos e plataformas completas.',
  },
  {
    id: 'after-publish',
    question: 'O que acontece depois que o projeto é publicado?',
    answer:
      'A plataforma continua cuidando da hospedagem, domínio, tráfego, automações e métricas em tempo real, facilitando a operação e evolução contínua da sua aplicação.',
  },
  {
    id: 'ai-context',
    question: 'Como a IA utiliza o contexto do projeto?',
    answer:
      'A IA da MAKEPLOY acessa objetivos, arquivos, banco de dados e histórico de decisões do projeto para gerar código preciso, criar designs e sugerir automações sob medida.',
  },
  {
    id: 'tools-or-platform',
    question: 'A MAKEPLOY substitui várias ferramentas?',
    answer:
      'Sim. Em vez de pagar e alternar entre ferramentas desconexas de design, código, hospedagem, automação e banco de dados, você opera tudo centralizado em uma só assinatura.',
  },
  {
    id: 'how-to-start',
    question: 'Como faço para começar agora?',
    answer:
      'Basta criar sua conta gratuitamente, descrever sua ideia inicial ou escolher um modelo e deixar que a MAKEPLOY estruture o primeiro passo do seu projeto em segundos.',
  },
]

function AnimatedFAQHeading() {
  const reduceMotion = useReducedMotion()
  const firstLine = ['Perguntas']

  return (
    <>
      <span className="inline-flex flex-wrap justify-center gap-x-[0.22em]">
        {firstLine.map((word, index) => (
          <motion.span
            key={word}
            initial={reduceMotion ? false : { opacity: 0, y: 22, filter: 'blur(7px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </span>
      {' '}
      <span className="sr-only">Frequentes</span>
      <motion.span
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
        className="relative inline-flex px-[0.04em]"
      >
        {Array.from('Frequentes').map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            aria-hidden="true"
            animate={
              reduceMotion
                ? { color: '#2563eb' }
                : { color: ['#2563eb', '#06b6d4', '#4f46e5', '#2563eb'], y: [0, -2, 0] }
            }
            transition={{
              duration: 2.1,
              delay: index * 0.065,
              repeat: Infinity,
              repeatDelay: 2.6,
              ease: [0.37, 0, 0.63, 1],
            }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </>
  )
}

// ─── Reusable FAQ Item Component ─────────────────────────────────────────────

interface FAQCardProps {
  item: (typeof FAQ_ITEMS)[number]
  isOpen: boolean
  onToggle: () => void
  delayIndex?: number
}

function FAQCard({ item, isOpen, onToggle, delayIndex = 0 }: FAQCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: delayIndex * 0.04 }}
      whileHover={{ y: -2 }}
      className={`
        rounded-2xl transition-all duration-300 overflow-hidden border
        ${
          isOpen
            ? 'bg-neutral-50/90 border-neutral-200 shadow-xs'
            : 'bg-[#F8F8F9] border-transparent hover:bg-[#F0F0F2] hover:border-neutral-200/50'
        }
      `}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-3 sm:gap-4 px-4.5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-neutral-900 rounded-2xl"
      >
        {/* Plus Icon with smooth rotation */}
        <div
          className={`
            shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
            ${isOpen ? 'rotate-45 bg-neutral-900 text-white' : 'bg-neutral-200/60 text-neutral-600'}
          `}
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>

        <span className="text-[14.5px] sm:text-base font-bold text-neutral-900 tracking-tight leading-snug">
          {item.question}
        </span>
      </button>

      {/* Expandable Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.3, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="px-4.5 sm:px-6 pb-4.5 pt-0.5 text-[13.5px] sm:text-[15px] leading-relaxed text-neutral-600 pl-11 sm:pl-16"
            >
              {item.answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ProductFAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [activePage, setActivePage] = useState<number>(0) // 0: Questions 1-5, 1: Questions 6-10

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  const handlePageChange = (newPage: number) => {
    setActivePage(newPage)
    setOpenId(null) // Close any open accordion to keep transition clean
  }

  // 2 subsets of 5 questions each
  const page1Items = FAQ_ITEMS.slice(0, 5)
  const page2Items = FAQ_ITEMS.slice(5, 10)
  const activeMobileItems = activePage === 0 ? page1Items : page2Items

  return (
    <section
      id="duvidas"
      aria-labelledby="faq-heading"
      className="w-full bg-white px-4.5 py-16 sm:px-8 sm:py-24 md:py-28 lg:py-32 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl">
        
        {/* ── Centered Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20"
        >
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.1] tracking-[-0.03em] text-neutral-900"
          >
            <AnimatedFAQHeading />
          </h2>

          <p className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-neutral-500">
            Tudo o que você precisa saber sobre a MAKEPLOY, desde a criação com IA e código até a publicação e escala dos seus projetos.
          </p>
        </motion.div>

        {/* ── Desktop View (2 Columns - all 10 visible) ── */}
        <div className="hidden md:grid md:grid-cols-2 gap-4 items-start">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            {page1Items.map((item, index) => (
              <FAQCard
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggleItem(item.id)}
                delayIndex={index}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            {page2Items.map((item, index) => (
              <FAQCard
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggleItem(item.id)}
                delayIndex={index}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile View (Paginated 5-Card Swap in place) ── */}
        <div className="block md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: activePage === 1 ? 16 : -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activePage === 1 ? -16 : 16 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3"
            >
              {activeMobileItems.map((item, index) => (
                <FAQCard
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => toggleItem(item.id)}
                  delayIndex={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Mobile Pagination Dock (Unified Capsule Design) ── */}
          <div className="flex items-center justify-center mt-7">
            <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-neutral-100/90 border border-neutral-200/80 shadow-xs">
              {/* Previous button */}
              <button
                type="button"
                onClick={() => handlePageChange(0)}
                disabled={activePage === 0}
                aria-label="Perguntas anteriores (1 a 5)"
                className="
                  w-8 h-8 rounded-full flex items-center justify-center
                  text-neutral-700 hover:bg-white hover:shadow-xs active:scale-90
                  disabled:opacity-20 disabled:pointer-events-none
                  transition-all duration-200 cursor-pointer
                "
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Seamless Dot Indicators */}
              <div className="flex items-center gap-1.5 px-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(0)}
                  aria-label="Página 1: Perguntas 1 a 5"
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 cursor-pointer
                  `}
                >
                  <span aria-hidden="true" className={`h-1.5 rounded-full transition-all duration-300 ${activePage === 0 ? 'w-5 bg-neutral-900' : 'w-1.5 bg-neutral-400'}`} />
                </button>
                <button
                  type="button"
                  onClick={() => handlePageChange(1)}
                  aria-label="Página 2: Perguntas 6 a 10"
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 cursor-pointer
                  `}
                >
                  <span aria-hidden="true" className={`h-1.5 rounded-full transition-all duration-300 ${activePage === 1 ? 'w-5 bg-neutral-900' : 'w-1.5 bg-neutral-400'}`} />
                </button>
              </div>

              {/* Next button */}
              <button
                type="button"
                onClick={() => handlePageChange(1)}
                disabled={activePage === 1}
                aria-label="Próximas perguntas (6 a 10)"
                className="
                  w-8 h-8 rounded-full flex items-center justify-center
                  text-neutral-700 hover:bg-white hover:shadow-xs active:scale-90
                  disabled:opacity-20 disabled:pointer-events-none
                  transition-all duration-200 cursor-pointer
                "
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* ── FAQ CTA Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mt-10 sm:mt-14"
        >
          <button
            type="button"
            onClick={() => openEarlyAccess('faq')}
            className="
              group inline-flex items-center gap-2
              px-7 py-3.5 sm:px-8 sm:py-4
              bg-neutral-900 text-white text-sm sm:text-[15px] font-bold
              rounded-full
              hover:bg-neutral-800
              active:scale-[0.97]
              transition-all duration-200
              shadow-md hover:shadow-lg
              cursor-pointer
            "
          >
            Entrar na fila de espera
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </motion.div>

      </div>
    </section>
  )
}

export default ProductFAQSection
