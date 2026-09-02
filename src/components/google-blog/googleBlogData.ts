export interface AuthorInfo {
  name: string
  role: string
}

export interface CarouselSlide {
  id: string
  category: string
  title: string
  description: string
  metricLabel: string
  metricValue: string
}

export interface VerticalCard {
  id: string
  category: string
  title: string
  description: string
  author: AuthorInfo
  imageUrl: string
  accentClass: string
}

export interface ResearchArticle {
  sectionTitle: string
  category: string
  title: string
  description: string
  badgeTitle: string
}

export interface ArchiveArticle {
  id: string
  slug: string
  topic: string
  categoryPill: string
  title: string
  description: string
  readTime: string
}

export const carouselSlidesData: CarouselSlide[] = [
  {
    id: 'slide-1',
    category: 'VALIDAÇÃO DE MERCADO',
    title: 'Como descobrir se existe demanda antes de construir o produto',
    description:
      'Transforme uma hipótese em sinais mensuráveis: público, problema, proposta de valor e intenção de compra reunidos em uma única jornada.',
    metricLabel: 'Etapa atual',
    metricValue: 'Problema confirmado',
  },
  {
    id: 'slide-2',
    category: 'PROTÓTIPO & MVP',
    title: 'Um MVP deve testar a decisão mais arriscada da sua ideia',
    description:
      'Crie somente o necessário para aprender. Uma experiência clara e testável revela mais do que semanas adicionando funcionalidades.',
    metricLabel: 'Objetivo do teste',
    metricValue: 'Medir intenção',
  },
  {
    id: 'slide-3',
    category: 'DADOS & APRENDIZADO',
    title: 'Métricas úteis mostram comportamento, não apenas atenção',
    description:
      'Cliques, respostas e cadastros ganham valor quando estão ligados a uma hipótese. Veja como separar curiosidade de interesse real.',
    metricLabel: 'Sinal principal',
    metricValue: 'Ação do público',
  },
]

export const verticalCardsData: VerticalCard[] = [
  {
    id: 'card-1',
    category: 'Inteligência Artificial',
    title: 'O que agentes de IA conseguem validar — e o que ainda depende de pessoas',
    description: 'Use automação para pesquisar e comparar sinais sem transformar suposições em certezas.',
    author: { name: 'Equipe Makeploy', role: 'Inteligência de produto' },
    imageUrl: '/images/blog/makeploy-ai-agents.jpg',
    accentClass: 'bg-blue-50 text-blue-700 border-blue-200/70',
  },
  {
    id: 'card-2',
    category: 'Validação',
    title: 'Sete sinais de que sua solução procura um problema',
    description: 'Reconheça cedo os padrões que costumam consumir tempo sem gerar aprendizado de mercado.',
    author: { name: 'Equipe Makeploy', role: 'Pesquisa e validação' },
    imageUrl: '/images/blog/makeploy-validation-signals.jpg',
    accentClass: 'bg-rose-50 text-rose-700 border-rose-200/70',
  },
  {
    id: 'card-3',
    category: 'Mercado',
    title: 'Mercado grande não significa oportunidade para o seu produto',
    description: 'Aprenda a recortar público, contexto e concorrência até chegar a uma oportunidade testável.',
    author: { name: 'Equipe Makeploy', role: 'Inteligência de mercado' },
    imageUrl: '/images/blog/makeploy-market-focus.jpg',
    accentClass: 'bg-amber-50 text-amber-700 border-amber-200/70',
  },
  {
    id: 'card-4',
    category: 'MVP',
    title: 'Construa menos: um guia para escolher o primeiro experimento',
    description: 'Defina a menor experiência capaz de confirmar ou refutar a hipótese central do produto.',
    author: { name: 'Equipe Makeploy', role: 'Estratégia de produto' },
    imageUrl: '/images/blog/makeploy-mvp-experiment.jpg',
    accentClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
  },
]

export const researchArticleData: ResearchArticle = {
  sectionTitle: 'Pesquisa em destaque',
  category: 'DADOS DE MERCADO',
  title: 'Por que boas ideias falham quando chegam ao mercado?',
  description:
    'Uma leitura prática sobre falta de demanda, posicionamento impreciso e aprendizado tardio — e como transformar cada risco em uma hipótese verificável.',
  badgeTitle: 'Mapa de Risco',
}

export const filterTopics = ['Todos', 'Inteligência Artificial', 'Validação', 'Mercado', 'MVP', 'Produto']

export const archiveArticlesData: ArchiveArticle[] = [
  {
    id: 'archive-1', slug: 'sinais-solucao-sem-problema', topic: 'Validação', categoryPill: 'Validação',
    title: 'Pesquisa de mercado e validação não são a mesma coisa',
    description: 'Entenda quando informação vira evidência suficiente para tomar uma decisão.', readTime: '6 min',
  },
  {
    id: 'archive-2', slug: 'mercado-grande-oportunidade', topic: 'Mercado', categoryPill: 'Mercado',
    title: 'Como definir um público específico sem reduzir sua ambição',
    description: 'Começar por um recorte claro torna o aprendizado mais rápido e a mensagem mais forte.', readTime: '8 min',
  },
  {
    id: 'archive-3', slug: 'escolher-primeiro-experimento-mvp', topic: 'Produto', categoryPill: 'Produto',
    title: 'Quais hipóteses você precisa testar antes de escrever código?',
    description: 'Um método simples para ordenar riscos de problema, público, canal e solução.', readTime: '7 min',
  },
  {
    id: 'archive-4', slug: 'agentes-ia-validacao-produtos', topic: 'Inteligência Artificial', categoryPill: 'Inteligência Artificial',
    title: 'IA acelera a análise, mas não substitui evidências reais',
    description: 'Veja onde os agentes ajudam e onde o comportamento do público continua decisivo.', readTime: '5 min',
  },
  {
    id: 'archive-5', slug: 'escolher-primeiro-experimento-mvp', topic: 'MVP', categoryPill: 'MVP',
    title: 'Landing page, protótipo ou concierge: qual MVP escolher?',
    description: 'Escolha o formato do experimento de acordo com a pergunta que precisa responder.', readTime: '9 min',
  },
]
