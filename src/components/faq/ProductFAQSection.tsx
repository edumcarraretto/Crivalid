import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Plus } from 'lucide-react'

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
      <motion.span
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Frequentes"
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

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductFAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  // Split into 2 columns for a balanced layout
  const leftColumn = FAQ_ITEMS.slice(0, Math.ceil(FAQ_ITEMS.length / 2))
  const rightColumn = FAQ_ITEMS.slice(Math.ceil(FAQ_ITEMS.length / 2))

  return (
    <section
      id="duvidas"
      aria-labelledby="faq-heading"
      className="w-full bg-white px-5 py-24 sm:px-8 sm:py-28 md:py-32 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl">
        
        {/* ── Centered Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <h2
            id="faq-heading"
            className="text-4xl sm:text-5xl md:text-[52px] font-extrabold leading-[1.08] tracking-[-0.03em] text-neutral-900"
          >
            <AnimatedFAQHeading />
          </h2>

          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-500">
            Tudo o que você precisa saber sobre a MAKEPLOY, desde a{' '}
            <motion.span
              initial={{ backgroundSize: '0% 35%' }}
              whileInView={{ backgroundSize: '100% 35%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[linear-gradient(rgb(191_219_254),rgb(191_219_254))] bg-bottom bg-no-repeat font-semibold text-neutral-700"
            >
              criação com IA e código
            </motion.span>{' '}
            até a{' '}
            <motion.span
              initial={{ backgroundSize: '0% 35%' }}
              whileInView={{ backgroundSize: '100% 35%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[linear-gradient(rgb(207_250_254),rgb(207_250_254))] bg-bottom bg-no-repeat font-semibold text-neutral-700"
            >
              publicação e escala
            </motion.span>{' '}
            dos seus projetos.
          </p>
        </motion.div>

        {/* ── 2-Column FAQ Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
          
          {/* Left Column */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            {leftColumn.map((item, index) => {
              const isOpen = openId === item.id

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className={`
                    rounded-2xl transition-all duration-300 overflow-hidden
                    ${isOpen ? 'bg-[#F4F4F6] shadow-xs' : 'bg-[#F7F7F8] hover:bg-[#F0F0F2]'}
                  `}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-4 px-6 py-5 sm:py-5.5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-neutral-900 rounded-2xl"
                  >
                    {/* Plus Icon with smooth rotation */}
                    <div
                      className={`
                        shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300
                        ${isOpen ? 'rotate-45 text-neutral-900' : 'text-neutral-600'}
                      `}
                    >
                      <Plus className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    <span className="text-[15px] sm:text-base font-bold text-neutral-900 tracking-tight leading-snug">
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
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 8, filter: 'blur(5px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          transition={{ duration: 0.36, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                          className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-[15px] leading-relaxed text-neutral-600 pl-12 sm:pl-16"
                        >
                          {item.answer}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            {rightColumn.map((item, index) => {
              const isOpen = openId === item.id

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (index + leftColumn.length) * 0.05 }}
                  whileHover={{ y: -2 }}
                  className={`
                    rounded-2xl transition-all duration-300 overflow-hidden
                    ${isOpen ? 'bg-[#F4F4F6] shadow-xs' : 'bg-[#F7F7F8] hover:bg-[#F0F0F2]'}
                  `}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-4 px-6 py-5 sm:py-5.5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-neutral-900 rounded-2xl"
                  >
                    {/* Plus Icon with smooth rotation */}
                    <div
                      className={`
                        shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300
                        ${isOpen ? 'rotate-45 text-neutral-900' : 'text-neutral-600'}
                      `}
                    >
                      <Plus className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    <span className="text-[15px] sm:text-base font-bold text-neutral-900 tracking-tight leading-snug">
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
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 8, filter: 'blur(5px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          transition={{ duration: 0.36, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                          className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-[15px] leading-relaxed text-neutral-600 pl-12 sm:pl-16"
                        >
                          {item.answer}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}

export default ProductFAQSection
