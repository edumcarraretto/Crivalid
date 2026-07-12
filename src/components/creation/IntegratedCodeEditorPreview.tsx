import { useState, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CodeToken {
  text: string
  color: string
}

interface CodeLine {
  num: number
  tokens: CodeToken[]
  highlighted?: boolean
}

interface FileEntry {
  name: string
  indent: number
  isDir: boolean
  /** If a directory, which children file names belong under it */
  children?: string[]
}

interface FileContent {
  language: string
  lines: CodeLine[]
}

// ─── File Tree ────────────────────────────────────────────────────────────────

const FILE_TREE: FileEntry[] = [
  { name: 'src/', indent: 0, isDir: true, children: ['App.tsx', 'components/', 'styles/', 'pages/'] },
  { name: 'App.tsx', indent: 1, isDir: false },
  { name: 'components/', indent: 1, isDir: true, children: ['Hero.tsx', 'Card.tsx'] },
  { name: 'Hero.tsx', indent: 2, isDir: false },
  { name: 'Card.tsx', indent: 2, isDir: false },
  { name: 'styles/', indent: 1, isDir: true, children: ['index.css'] },
  { name: 'index.css', indent: 2, isDir: false },
  { name: 'pages/', indent: 1, isDir: true, children: ['Home.tsx'] },
  { name: 'Home.tsx', indent: 2, isDir: false },
]

// ─── File Contents ────────────────────────────────────────────────────────────

const FILE_CONTENTS: Record<string, FileContent> = {
  'App.tsx': {
    language: 'TypeScript React',
    lines: [
      { num: 1, tokens: [{ text: 'import', color: 'text-pink-400' }, { text: ' { Hero } ', color: 'text-white' }, { text: 'from', color: 'text-pink-400' }, { text: " './Hero'", color: 'text-emerald-400' }] },
      { num: 2, tokens: [{ text: 'import', color: 'text-pink-400' }, { text: ' { Card } ', color: 'text-white' }, { text: 'from', color: 'text-pink-400' }, { text: " './Card'", color: 'text-emerald-400' }] },
      { num: 3, tokens: [] },
      { num: 4, tokens: [{ text: 'export', color: 'text-pink-400' }, { text: ' function ', color: 'text-blue-400' }, { text: 'App', color: 'text-amber-300' }, { text: '() {', color: 'text-white' }] },
      { num: 5, tokens: [{ text: '  return (', color: 'text-white' }], highlighted: true },
      { num: 6, tokens: [{ text: '    <', color: 'text-neutral-400' }, { text: 'main', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 7, tokens: [{ text: '      <', color: 'text-neutral-400' }, { text: 'Hero', color: 'text-amber-300' }, { text: ' />', color: 'text-neutral-400' }] },
      { num: 8, tokens: [{ text: '      <', color: 'text-neutral-400' }, { text: 'Card', color: 'text-amber-300' }, { text: ' title=', color: 'text-white' }, { text: '"Valide"', color: 'text-emerald-400' }, { text: ' />', color: 'text-neutral-400' }] },
      { num: 9, tokens: [{ text: '    </', color: 'text-neutral-400' }, { text: 'main', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 10, tokens: [{ text: '  )', color: 'text-white' }] },
      { num: 11, tokens: [{ text: '}', color: 'text-white' }] },
    ],
  },
  'Hero.tsx': {
    language: 'TypeScript React',
    lines: [
      { num: 1, tokens: [{ text: 'import', color: 'text-pink-400' }, { text: ' { motion } ', color: 'text-white' }, { text: 'from', color: 'text-pink-400' }, { text: " 'motion/react'", color: 'text-emerald-400' }] },
      { num: 2, tokens: [] },
      { num: 3, tokens: [{ text: 'export', color: 'text-pink-400' }, { text: ' function ', color: 'text-blue-400' }, { text: 'Hero', color: 'text-amber-300' }, { text: '() {', color: 'text-white' }] },
      { num: 4, tokens: [{ text: '  return (', color: 'text-white' }], highlighted: true },
      { num: 5, tokens: [{ text: '    <', color: 'text-neutral-400' }, { text: 'motion.section', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 6, tokens: [{ text: '      <', color: 'text-neutral-400' }, { text: 'h1', color: 'text-blue-400' }, { text: ' className=', color: 'text-white' }, { text: '"text-5xl"', color: 'text-emerald-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 7, tokens: [{ text: '        Valide suas ideias', color: 'text-white' }] },
      { num: 8, tokens: [{ text: '      </', color: 'text-neutral-400' }, { text: 'h1', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 9, tokens: [{ text: '    </', color: 'text-neutral-400' }, { text: 'motion.section', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 10, tokens: [{ text: '  )', color: 'text-white' }] },
      { num: 11, tokens: [{ text: '}', color: 'text-white' }] },
    ],
  },
  'Card.tsx': {
    language: 'TypeScript React',
    lines: [
      { num: 1, tokens: [{ text: 'interface', color: 'text-pink-400' }, { text: ' CardProps', color: 'text-amber-300' }, { text: ' {', color: 'text-white' }] },
      { num: 2, tokens: [{ text: '  title', color: 'text-white' }, { text: ': ', color: 'text-neutral-400' }, { text: 'string', color: 'text-blue-400' }] },
      { num: 3, tokens: [{ text: '  description', color: 'text-white' }, { text: '?: ', color: 'text-neutral-400' }, { text: 'string', color: 'text-blue-400' }] },
      { num: 4, tokens: [{ text: '}', color: 'text-white' }] },
      { num: 5, tokens: [] },
      { num: 6, tokens: [{ text: 'export', color: 'text-pink-400' }, { text: ' function ', color: 'text-blue-400' }, { text: 'Card', color: 'text-amber-300' }, { text: '({ title }: CardProps) {', color: 'text-white' }] },
      { num: 7, tokens: [{ text: '  return (', color: 'text-white' }], highlighted: true },
      { num: 8, tokens: [{ text: '    <', color: 'text-neutral-400' }, { text: 'div', color: 'text-blue-400' }, { text: ' className=', color: 'text-white' }, { text: '"rounded-xl p-6"', color: 'text-emerald-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 9, tokens: [{ text: '      <', color: 'text-neutral-400' }, { text: 'h3', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }, { text: '{title}', color: 'text-amber-300' }, { text: '</', color: 'text-neutral-400' }, { text: 'h3', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 10, tokens: [{ text: '    </', color: 'text-neutral-400' }, { text: 'div', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 11, tokens: [{ text: '  )', color: 'text-white' }] },
      { num: 12, tokens: [{ text: '}', color: 'text-white' }] },
    ],
  },
  'index.css': {
    language: 'CSS',
    lines: [
      { num: 1, tokens: [{ text: '@import', color: 'text-pink-400' }, { text: ' "tailwindcss"', color: 'text-emerald-400' }, { text: ';', color: 'text-neutral-400' }] },
      { num: 2, tokens: [] },
      { num: 3, tokens: [{ text: ':root', color: 'text-amber-300' }, { text: ' {', color: 'text-white' }] },
      { num: 4, tokens: [{ text: '  --primary', color: 'text-white' }, { text: ': ', color: 'text-neutral-400' }, { text: '#863bff', color: 'text-violet-400' }, { text: ';', color: 'text-neutral-400' }], highlighted: true },
      { num: 5, tokens: [{ text: '  --bg', color: 'text-white' }, { text: ': ', color: 'text-neutral-400' }, { text: '#ffffff', color: 'text-violet-400' }, { text: ';', color: 'text-neutral-400' }] },
      { num: 6, tokens: [{ text: '  --text', color: 'text-white' }, { text: ': ', color: 'text-neutral-400' }, { text: '#171717', color: 'text-violet-400' }, { text: ';', color: 'text-neutral-400' }] },
      { num: 7, tokens: [{ text: '}', color: 'text-white' }] },
      { num: 8, tokens: [] },
      { num: 9, tokens: [{ text: 'body', color: 'text-amber-300' }, { text: ' {', color: 'text-white' }] },
      { num: 10, tokens: [{ text: '  font-family', color: 'text-white' }, { text: ': ', color: 'text-neutral-400' }, { text: "'Inter', sans-serif", color: 'text-emerald-400' }, { text: ';', color: 'text-neutral-400' }] },
      { num: 11, tokens: [{ text: '  background', color: 'text-white' }, { text: ': ', color: 'text-neutral-400' }, { text: 'var(--bg)', color: 'text-blue-400' }, { text: ';', color: 'text-neutral-400' }] },
      { num: 12, tokens: [{ text: '}', color: 'text-white' }] },
    ],
  },
  'Home.tsx': {
    language: 'TypeScript React',
    lines: [
      { num: 1, tokens: [{ text: 'import', color: 'text-pink-400' }, { text: ' { App } ', color: 'text-white' }, { text: 'from', color: 'text-pink-400' }, { text: " '../App'", color: 'text-emerald-400' }] },
      { num: 2, tokens: [] },
      { num: 3, tokens: [{ text: 'export', color: 'text-pink-400' }, { text: ' default', color: 'text-pink-400' }, { text: ' function ', color: 'text-blue-400' }, { text: 'Home', color: 'text-amber-300' }, { text: '() {', color: 'text-white' }] },
      { num: 4, tokens: [{ text: '  return (', color: 'text-white' }] },
      { num: 5, tokens: [{ text: '    <', color: 'text-neutral-400' }, { text: 'div', color: 'text-blue-400' }, { text: ' className=', color: 'text-white' }, { text: '"min-h-screen"', color: 'text-emerald-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 6, tokens: [{ text: '      <', color: 'text-neutral-400' }, { text: 'App', color: 'text-amber-300' }, { text: ' />', color: 'text-neutral-400' }] },
      { num: 7, tokens: [{ text: '    </', color: 'text-neutral-400' }, { text: 'div', color: 'text-blue-400' }, { text: '>', color: 'text-neutral-400' }] },
      { num: 8, tokens: [{ text: '  )', color: 'text-white' }] },
      { num: 9, tokens: [{ text: '}', color: 'text-white' }] },
    ],
  },
}

// ─── Navigable file names (non-directory entries) ─────────────────────────────

const NAVIGABLE_FILES = FILE_TREE.filter((f) => !f.isDir).map((f) => f.name)

// ─── Component ────────────────────────────────────────────────────────────────

export function IntegratedCodeEditorPreview() {
  const [activeFile, setActiveFile] = useState(NAVIGABLE_FILES[0])
  const [openTabs, setOpenTabs] = useState<string[]>(['App.tsx', 'index.css', 'Home.tsx'])

  useEffect(() => {
    // Check if the user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const interval = setInterval(() => {
      setActiveFile((prev) => {
        const currentIndex = NAVIGABLE_FILES.indexOf(prev)
        const nextIndex = (currentIndex + 1) % NAVIGABLE_FILES.length
        return NAVIGABLE_FILES[nextIndex]
      })
    }, 2500) // Change every 2.5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleFileClick = (fileName: string) => {
    if (!FILE_CONTENTS[fileName]) return
    setActiveFile(fileName)
    if (!openTabs.includes(fileName)) {
      setOpenTabs((prev) => [...prev, fileName])
    }
  }

  const handleTabClose = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newTabs = openTabs.filter((t) => t !== fileName)
    if (newTabs.length === 0) return // Keep at least one tab
    setOpenTabs(newTabs)
    if (activeFile === fileName) {
      setActiveFile(newTabs[newTabs.length - 1])
    }
  }

  const content = FILE_CONTENTS[activeFile]

  return (
    <div 
      className="w-full h-full flex overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0c0c0e]/90"
      style={{
        maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
      }}
    >
      {/* File tree sidebar */}
      <div className="w-[72px] shrink-0 border-r border-white/[0.08] flex flex-col pt-2 overflow-y-auto no-scrollbar">
        <div className="px-2 mb-1.5">
          <div className="text-[7px] font-medium text-neutral-500 uppercase tracking-wider">
            Arquivos
          </div>
        </div>
        {FILE_TREE.map((file) => {
          const isNavigable = NAVIGABLE_FILES.includes(file.name)
          const isActive = activeFile === file.name

          return (
            <div
              key={`${file.indent}-${file.name}`}
              className={[
                'flex items-center gap-1 px-2 py-[3px] text-[7px] transition-colors duration-150',
                isActive
                  ? 'bg-white/[0.08] text-white font-medium'
                  : 'text-neutral-500',
                isNavigable
                  ? 'cursor-pointer hover:text-neutral-300 hover:bg-white/[0.04]'
                  : 'cursor-default',
              ].join(' ')}
              style={{ paddingLeft: `${8 + file.indent * 8}px` }}
              onClick={() => isNavigable && handleFileClick(file.name)}
              role={isNavigable ? 'button' : undefined}
              tabIndex={isNavigable ? 0 : undefined}
              onKeyDown={(e) => {
                if (isNavigable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  handleFileClick(file.name)
                }
              }}
            >
              {file.isDir ? (
                <span className="text-[6px] text-neutral-500">▸</span>
              ) : (
                <span className={`text-[6px] ${isActive ? 'text-violet-400' : 'text-neutral-600'}`}>◇</span>
              )}
              <span className="truncate">{file.name}</span>
            </div>
          )
        })}
      </div>

      {/* Editor area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="flex border-b border-white/[0.06] shrink-0 overflow-x-auto no-scrollbar">
          {openTabs.map((tab) => (
            <div
              key={tab}
              className={[
                'group/tab flex items-center gap-1 px-2.5 py-1.5 text-[7px] border-r border-white/[0.06] cursor-pointer shrink-0 transition-colors duration-150',
                tab === activeFile
                  ? 'text-white bg-[#0c0c0e] border-b-2 border-b-violet-500'
                  : 'text-neutral-500 bg-[#080809] hover:text-neutral-300',
              ].join(' ')}
              onClick={() => setActiveFile(tab)}
              role="tab"
              aria-selected={tab === activeFile}
            >
              <span>{tab}</span>
              {openTabs.length > 1 && (
                <button
                  className="ml-0.5 w-2.5 h-2.5 flex items-center justify-center rounded-sm opacity-0 group-hover/tab:opacity-100 hover:bg-white/[0.1] transition-opacity duration-150 text-[6px] text-neutral-500 hover:text-white"
                  onClick={(e) => handleTabClose(tab, e)}
                  aria-label={`Fechar ${tab}`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Code */}
        {content && (
          <div className="flex-1 overflow-hidden py-1.5">
            {content.lines.map((line) => (
              <div
                key={line.num}
                className={[
                  'flex items-center h-[14px] px-1',
                  line.highlighted ? 'bg-violet-500/[0.08]' : '',
                ].join(' ')}
              >
                {/* Line number */}
                <span className="w-6 shrink-0 text-right pr-2 text-[7px] text-neutral-600 select-none font-mono">
                  {line.num}
                </span>

                {/* Highlight bar */}
                {line.highlighted && (
                  <div className="w-[2px] h-full bg-violet-500 shrink-0 mr-1 rounded-full" />
                )}

                {/* Tokens */}
                <div className="flex items-center gap-0 text-[7px] font-mono whitespace-nowrap overflow-hidden">
                  {line.tokens.map((token, j) => (
                    <span key={j} className={token.color}>
                      {token.text}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Status bar */}
        <div className="flex items-center justify-between px-2 py-1 border-t border-white/[0.06] bg-[#080809] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[6px] text-neutral-500">{content?.language ?? 'Text'}</span>
            <span className="text-[6px] text-neutral-600">|</span>
            <span className="text-[6px] text-neutral-500">UTF-8</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
            <span className="text-[6px] text-neutral-500">Salvo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
