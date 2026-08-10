import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'

const PRODUCT_FAQ = [
  {
    question: 'A MAKEPLOY é apenas um conjunto de ferramentas?',
    answer:
      'Não. Documentos, tarefas, criação, código, IA e automações trabalham sobre o mesmo projeto e compartilham o contexto produzido durante ele.',
  },
  {
    question: 'Preciso saber programar para começar?',
    answer:
      'Não. Você pode começar visualmente e usar IA durante o processo. Quando precisar de mais controle, abra o código no IDE integrado.',
  },
  {
    question: 'Posso continuar um projeto que já existe?',
    answer:
      'Sim. Importe materiais e estruturas existentes, organize o contexto e continue a partir do estágio atual.',
  },
  {
    question: 'Ficarei limitado ao no-code?',
    answer:
      'Não. A criação visual e o código fazem parte do mesmo fluxo. Você escolhe o nível de controle necessário em cada etapa.',
  },
  {
    question: 'Posso importar e exportar meu projeto?',
    answer:
      'Sim. Você pode trazer o que já existe e exportar quando precisar. O projeto não fica preso a um único caminho de construção.',
  },
  {
    question: 'O que posso construir?',
    answer:
      'Sites, páginas de vendas, cursos, aplicações, SaaS e outras experiências digitais.',
  },
  {
    question: 'O que acontece depois que o projeto é publicado?',
    answer:
      'Tarefas, pessoas, dados e automações continuam conectados à operação e às próximas versões.',
  },
  {
    question: 'Como a IA utiliza o contexto?',
    answer:
      'Ela trabalha com objetivos, arquivos, decisões e histórico para pesquisar, analisar, escrever e programar sem começar do zero a cada tarefa.',
  },
  {
    question: 'O que acontece quando começo?',
    answer:
      'Você descreve uma ideia ou um projeto existente. A MAKEPLOY organiza esse ponto de partida e conduz a próxima etapa.',
  },
]

export function ProductFAQSection() {
  return (
    <section
      id="duvidas"
      aria-labelledby="faq-heading"
      className="w-full bg-white px-5 py-20 sm:px-8 sm:py-24 md:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            Antes de começar
          </p>
          <h2
            id="faq-heading"
            className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-4xl"
          >
            Antes de começar.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base">
            O que muda quando todo o ciclo trabalha sobre o mesmo projeto.
          </p>
        </motion.div>

        <div className="border-t border-neutral-200">
          {PRODUCT_FAQ.map((item, index) => (
            <motion.details
              key={item.question}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="group border-b border-neutral-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-base font-bold text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 sm:text-lg">
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-neutral-600 sm:text-base">
                {item.answer}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  )
}
