// ─── Types ────────────────────────────────────────────────────────────────────

export type PillarType = 'no-code' | 'ai' | 'code'

export interface CreationPillar {
  id: PillarType
  eyebrow: string
  eyebrowColor: string
  title: string
  description: string
}

export interface AIModel {
  id: string
  name: string
  provider: string
  tag: string
  selected?: boolean
}

// ─── Pillar Data ──────────────────────────────────────────────────────────────

export const creationPillars: CreationPillar[] = [
  {
    id: 'no-code',
    eyebrow: 'CRIAÇÃO NO-CODE',
    eyebrowColor: 'text-[#EEEEEE]',
    title: 'Crie páginas, sites, cursos e experiências digitais sem precisar programar.',
    description:
      'Use componentes visuais, blocos reutilizáveis e edição por arrastar e soltar para transformar uma ideia em um produto funcional.',
  },
  {
    id: 'ai',
    eyebrow: 'INTELIGÊNCIA',
    eyebrowColor: 'text-[#EEEEEE]',
    title: 'As principais IAs trabalhando juntas dentro da mesma criação.',
    description:
      'A plataforma pode usar o modelo mais adequado para escrever, planejar, pesquisar, analisar, programar ou revisar cada etapa do projeto.',
  },
  {
    id: 'code',
    eyebrow: 'CONTROLE TOTAL',
    eyebrowColor: 'text-[#EEEEEE]',
    title: 'Visualize e edite o código da sua criação sem sair da plataforma.',
    description:
      'Comece no modo visual e, quando precisar de controle avançado, abra o editor integrado para inspecionar, alterar e acompanhar o resultado.',
  },
]

// ─── AI Model Data ────────────────────────────────────────────────────────────

export const aiModels: AIModel[] = [
  { id: 'cerebro', name: 'Cérebro', provider: 'Cerebro', tag: 'Criativo' },
  { id: 'gpt', name: 'GPT', provider: 'OpenAI', tag: 'Análise' },
  { id: 'claude-opus', name: 'Claude Opus', provider: 'Anthropic', tag: 'Código', selected: true },
  { id: 'gemeos', name: 'Gêmeos', provider: 'Google', tag: 'Rápido' },
]
