export interface ArticleSource {
  label: string
  url: string
}

export interface BlogArticle {
  slug: string
  category: string
  title: string
  description: string
  imageUrl: string
  publishedAt: string
  updatedAt: string
  readTime: string
  takeaways: string[]
  sections: Array<{ heading: string; paragraphs: string[] }>
  sources: ArticleSource[]
}

const sharedSources: ArticleSource[] = [
  {
    label: 'Strategyzer — Testing Business Ideas',
    url: 'https://www.strategyzer.com/library/testing-business-ideas-book',
  },
  {
    label: 'Y Combinator — How to Evaluate Startup Ideas and Talk to Users',
    url: 'https://www.ycombinator.com/blog/startup-school-week-1-recap-kevin-hale-and-eric-migicovsky/',
  },
]

export const blogArticles: BlogArticle[] = [
  {
    slug: 'agentes-ia-validacao-produtos',
    category: 'Inteligência Artificial',
    title: 'O que agentes de IA conseguem validar — e o que ainda depende de pessoas',
    description: 'Como usar velocidade de análise sem confundir uma resposta convincente com evidência de mercado.',
    imageUrl: '/images/blog/makeploy-ai-agents.jpg',
    publishedAt: '2 set. 2026',
    updatedAt: '2 set. 2026',
    readTime: '7 min',
    takeaways: ['IA organiza hipóteses e acelera pesquisa.', 'Comportamento real continua sendo a evidência mais forte.', 'Toda conclusão deve manter sua fonte e seu contexto.'],
    sections: [
      { heading: 'Onde a IA realmente ajuda', paragraphs: ['Agentes conseguem reunir referências, comparar concorrentes, estruturar segmentos e transformar uma ideia vaga em hipóteses que podem ser testadas.', 'O ganho principal não é prever o futuro. É reduzir o trabalho mecânico e tornar explícitas as suposições escondidas no projeto.'] },
      { heading: 'Onde o mercado precisa responder', paragraphs: ['Uma análise pode apontar padrões, mas não prova que alguém mudará de comportamento, entregará seus dados ou pagará pela solução.', 'Por isso, o próximo passo deve ser um experimento observável: uma conversa bem conduzida, uma página de intenção ou uma oferta limitada.'] },
      { heading: 'Uma parceria mais responsável', paragraphs: ['Use IA para formular perguntas melhores, não para fabricar certeza. Registre o que é hipótese, o que veio de fonte externa e o que foi observado diretamente.'] },
    ],
    sources: sharedSources,
  },
  {
    slug: 'sinais-solucao-sem-problema',
    category: 'Validação',
    title: 'Sete sinais de que sua solução procura um problema',
    description: 'Padrões que parecem progresso, mas podem esconder a ausência de uma necessidade relevante.',
    imageUrl: '/images/blog/makeploy-validation-signals.jpg',
    publishedAt: '2 set. 2026',
    updatedAt: '2 set. 2026',
    readTime: '6 min',
    takeaways: ['Elogio não equivale a intenção.', 'Funcionalidades demais podem esconder uma proposta fraca.', 'Um problema claro pode ser descrito sem mencionar a solução.'],
    sections: [
      { heading: 'Sinais que merecem atenção', paragraphs: ['Você explica o produto por muito tempo, recebe elogios sem compromissos, muda de público a cada conversa ou adiciona funcionalidades para tentar tornar a proposta interessante.', 'Outro sinal é não conseguir descrever quando, onde e com que frequência o problema acontece.'] },
      { heading: 'Volte ao comportamento', paragraphs: ['Pergunte como a pessoa resolve a situação hoje, quanto esforço ela já investiu e o que acontece quando não resolve. Histórias recentes são mais úteis do que opiniões sobre um futuro hipotético.'] },
      { heading: 'Transforme dúvidas em teste', paragraphs: ['Escolha a suposição que, se estiver errada, derruba a ideia. Defina uma evidência mínima e execute um experimento curto antes de aumentar o investimento.'] },
    ],
    sources: sharedSources,
  },
  {
    slug: 'mercado-grande-oportunidade',
    category: 'Mercado',
    title: 'Mercado grande não significa oportunidade para o seu produto',
    description: 'Como sair de números amplos e chegar a um público, contexto e problema que possam ser testados.',
    imageUrl: '/images/blog/makeploy-market-focus.jpg',
    publishedAt: '2 set. 2026',
    updatedAt: '2 set. 2026',
    readTime: '8 min',
    takeaways: ['Tamanho de mercado não demonstra acesso ao público.', 'O contexto de uso define a urgência.', 'Uma boa oportunidade começa com um recorte verificável.'],
    sections: [
      { heading: 'O perigo dos números amplos', paragraphs: ['Relatórios de mercado ajudam a entender uma categoria, mas não dizem se o seu produto alcança o segmento certo nem se resolve uma prioridade real.', 'Começar pelo total do mercado pode criar uma sensação de segurança sem revelar o caminho até os primeiros usuários.'] },
      { heading: 'Faça um recorte operacional', paragraphs: ['Defina quem vive o problema, em qual situação, qual alternativa utiliza hoje e por que buscaria uma mudança agora. Esse recorte orienta mensagem, canal e experimento.'] },
      { heading: 'Expanda depois da evidência', paragraphs: ['Um público inicial específico não limita a visão. Ele cria um ambiente onde é possível aprender com clareza antes de testar novos segmentos.'] },
    ],
    sources: sharedSources,
  },
  {
    slug: 'escolher-primeiro-experimento-mvp',
    category: 'MVP',
    title: 'Construa menos: um guia para escolher o primeiro experimento',
    description: 'Defina a menor experiência capaz de confirmar ou refutar a hipótese central do produto.',
    imageUrl: '/images/blog/makeploy-mvp-experiment.jpg',
    publishedAt: '2 set. 2026',
    updatedAt: '2 set. 2026',
    readTime: '9 min',
    takeaways: ['MVP é um experimento, não uma versão pequena do produto.', 'O formato depende da hipótese.', 'Critérios de sucesso devem existir antes do teste.'],
    sections: [
      { heading: 'Comece pelo risco', paragraphs: ['Liste o que precisa ser verdade para a ideia funcionar. Depois, identifique a suposição com maior impacto e menor quantidade de evidência disponível.', 'Essa pergunta deve determinar o experimento — e não a tecnologia que a equipe tem vontade de construir.'] },
      { heading: 'Escolha o formato', paragraphs: ['Entrevistas exploram contexto. Landing pages medem reação a uma proposta. Protótipos testam compreensão e uso. Experimentos concierge verificam valor antes de automatizar a entrega.'] },
      { heading: 'Decida antes de medir', paragraphs: ['Registre público, mensagem, canal, duração e critério de decisão. Assim, o resultado não será reinterpretado apenas para confirmar a ideia original.'] },
    ],
    sources: [
      ...sharedSources,
      { label: 'Strategyzer — Start with the most critical hypotheses', url: 'https://www.strategyzer.com/library/how-to-test-your-idea-start-with-the-most-critical-hypotheses' },
    ],
  },
]

export function getArticle(slug?: string) {
  return blogArticles.find((article) => article.slug === slug)
}
