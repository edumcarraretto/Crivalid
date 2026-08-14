export interface RollerWord {
  id: string
  text: string
  category: 'action' | 'integration'
  description?: string
  accentColor?: string
}

export const ACTION_WORDS: RollerWord[] = [
  { id: 'visual-sem-barreiras', text: 'Visual sem barreiras', category: 'action' },
  { id: 'codigo-sem-recomecos', text: 'Código sem recomeços', category: 'action' },
  { id: 'operacao-depois-lancamento', text: 'Operação depois do lançamento', category: 'action' },
  { id: 'contexto-antes-execucao', text: 'Contexto antes de execução', category: 'action' },
  { id: 'uma-origem', text: 'Uma origem', category: 'action' },
  { id: 'um-projeto-continuo', text: 'Um projeto contínuo', category: 'action' },
  { id: 'proximas-versoes-conectadas', text: 'Próximas versões conectadas', category: 'action' },
]
