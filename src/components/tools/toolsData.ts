import {
  AlertCircle,
  Search,
  CheckSquare,
  GitBranch,
  BookOpen,
  Bot,
  Calendar,
  FileCheck,
  Briefcase,
  LayoutTemplate,
  Bell,
  BarChart3,
  Target,
  Zap,
  ToggleLeft,
  Workflow,
  TextCursorInput,
  Flag,
  Clock,
  Film,
  Eye,
  Plug,
  LayoutDashboard,
  Timer,
  CalendarClock,
  Table2,
  PenTool,
  LineChart,
  Map,
  Inbox,
  Users,
  Tags,
  History,
  Star,
  Box,
  Palette,
  Lightbulb,
  BookMarked,
  FolderKanban,
  FileText,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react'

export type ToolStatus = 'available' | 'coming_soon' | 'unavailable'

export interface Tool {
  id: string
  title: string
  icon: LucideIcon
  status: ToolStatus
  featured: boolean
  colSpan: number
  rowSpan: number
  /** Grid column start (1-indexed). Required for featured cards. */
  colStart?: number
  /** Grid row start (1-indexed). Required for featured cards. */
  rowStart?: number
  /** Tailwind bg class for featured cards */
  bgColor?: string
  /** Tailwind text class for the accent icon in featured cards */
  accentColor?: string
}

/**
 * Grid: 10 columns x 6 rows
 *
 * Featured card positions (col / row, 1-indexed):
 *   Projetos      -> col 4-5, row 2-3
 *   Documentos    -> col 6-7, row 2-3
 *   Assistente IA -> col 4-5, row 4-5
 *   Conversas     -> col 6-7, row 4-5
 *
 * Small tools fill every remaining cell in row-major order.
 */
export const tools: Tool[] = [
  // Featured cards
  {
    id: 'projetos',
    title: 'Projetos',
    icon: FolderKanban,
    status: 'available',
    featured: true,
    colSpan: 2,
    rowSpan: 2,
    colStart: 4,
    rowStart: 2,
    bgColor: 'bg-white',
    accentColor: 'text-violet-600',
  },
  {
    id: 'documentos',
    title: 'Documentos',
    icon: FileText,
    status: 'available',
    featured: true,
    colSpan: 2,
    rowSpan: 2,
    colStart: 6,
    rowStart: 2,
    bgColor: 'bg-blue-50/50',
    accentColor: 'text-blue-600',
  },
  {
    id: 'assistente-ia',
    title: 'Assistente de IA',
    icon: Bot,
    status: 'available',
    featured: true,
    colSpan: 2,
    rowSpan: 2,
    colStart: 4,
    rowStart: 4,
    bgColor: 'bg-rose-50/50',
    accentColor: 'text-rose-500',
  },
  {
    id: 'conversas',
    title: 'Conversas',
    icon: MessageCircle,
    status: 'available',
    featured: true,
    colSpan: 2,
    rowSpan: 2,
    colStart: 6,
    rowStart: 4,
    bgColor: 'bg-violet-50/50',
    accentColor: 'text-violet-500',
  },

  // Small tools - Row 1 (all 10 cols free)
  { id: 'pendencias',           title: 'Pendencias',           icon: AlertCircle,    status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'busca',                title: 'Busca conectada',      icon: Search,         status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'tarefas',              title: 'Tarefas',              icon: CheckSquare,    status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'mapas-mentais',        title: 'Mapas mentais',        icon: GitBranch,      status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'wikis',                title: 'Wikis',                icon: BookOpen,       status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'anotador-ia',          title: 'Anotador de IA',       icon: Bot,            status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'calendario',           title: 'Calendario',           icon: Calendar,       status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'provas',               title: 'Provas',               icon: FileCheck,      status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'portfolios',           title: 'Portfolios',           icon: Briefcase,      status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'modelos',              title: 'Modelos',              icon: LayoutTemplate, status: 'coming_soon',  featured: false, colSpan: 1, rowSpan: 1 },

  // Row 2 - cols 1-3 and 8-10 free (6 cells)
  { id: 'lembretes',            title: 'Lembretes',            icon: Bell,           status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'relatorios',           title: 'Relatorios',           icon: BarChart3,      status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'metas',                title: 'Metas',                icon: Target,         status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'sprints',              title: 'Sprints',              icon: Zap,            status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'status-personalizado', title: 'Status personalizado', icon: ToggleLeft,     status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'escritorio',           title: 'Escritorio',           icon: Briefcase,      status: 'coming_soon',  featured: false, colSpan: 1, rowSpan: 1 },

  // Row 3 - cols 1-3 and 8-10 free (6 cells)
  { id: 'api',                  title: 'Acesso a API',         icon: Plug,           status: 'coming_soon',  featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'formularios',          title: 'Formularios',          icon: TextCursorInput,status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'prioridades',          title: 'Prioridades',          icon: Flag,           status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'automacoes',           title: 'Automacoes',           icon: Workflow,       status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'campos-personalizados',title: 'Campos personalizados',icon: TextCursorInput,status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'folhas',               title: 'Folhas de ponto',      icon: Clock,          status: 'coming_soon',  featured: false, colSpan: 1, rowSpan: 1 },

  // Row 4 - cols 1-3 and 8-10 free (6 cells)
  { id: 'importar',             title: 'Importar e exportar',  icon: Box,            status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'estimativa-tempo',     title: 'Estimativa de tempo',  icon: Timer,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'emails',               title: 'E-mails',              icon: Inbox,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'clipes',               title: 'Clipes',               icon: Film,           status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'visao-geral',          title: 'Visao geral',          icon: Eye,            status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'autenticacao',         title: 'Autenticacao',         icon: ToggleLeft,     status: 'coming_soon',  featured: false, colSpan: 1, rowSpan: 1 },

  // Row 5 - cols 1-3 and 8-10 free (6 cells)
  { id: 'paineis',              title: 'Paineis de controle',  icon: LayoutDashboard,status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'controle-tempo',       title: 'Controle de tempo',    icon: Clock,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'agendamento',          title: 'Agendamento',          icon: CalendarClock,  status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'quadros-kanban',       title: 'Quadros Kanban',       icon: LayoutTemplate, status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'integracoes',          title: 'Integracoes',          icon: Plug,           status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'contadores',           title: 'Contadores',           icon: BarChart3,      status: 'coming_soon',  featured: false, colSpan: 1, rowSpan: 1 },

  // Row 6 - all 10 cols free
  { id: 'etiquetas',            title: 'Etiquetas',            icon: Tags,           status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'suporte',              title: 'Suporte 24h',          icon: Users,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'checklists',           title: 'Listas de verificacao',icon: CheckSquare,    status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'planilhas',            title: 'Planilhas',            icon: Table2,         status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'quadros-brancos',      title: 'Quadros brancos',      icon: PenTool,        status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'graficos',             title: 'Graficos',             icon: LineChart,      status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'roteiros',             title: 'Roteiros',             icon: Map,            status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'caixa-entrada',        title: 'Caixa de entrada',     icon: Inbox,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'equipes',              title: 'Equipes',              icon: Users,          status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'historico',            title: 'Historico',            icon: History,        status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },

  // Extra row
  { id: 'favoritos',            title: 'Favoritos',            icon: Star,           status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'ativos',               title: 'Ativos',               icon: Box,            status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'cores',                title: 'Cores',                icon: Palette,        status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'inspiracoes',          title: 'Inspiracoes',          icon: Lightbulb,      status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
  { id: 'instrucoes',           title: 'Instrucoes',           icon: BookMarked,     status: 'available',    featured: false, colSpan: 1, rowSpan: 1 },
]
