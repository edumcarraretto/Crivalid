/**
 * Mini-mockup illustrations rendered inside the featured tool cards.
 * Lightweight HTML/CSS previews — no images, no SVGs, just divs.
 */

// ─────────────────────────────────────────────
// Projetos — Kanban board preview
// ─────────────────────────────────────────────
export function ProjectsMockup() {
  return (
    <div className="w-full h-full flex flex-col p-2 gap-1.5 overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-400/70" />
        <div className="ml-auto flex items-center gap-1">
          <div className="w-8 h-1 rounded-full bg-gray-200" />
          <div className="w-4 h-1 rounded-full bg-violet-200" />
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1">
        <div className="px-1.5 py-0.5 rounded bg-violet-100 border border-violet-200/60">
          <div className="w-5 h-0.5 rounded bg-violet-400" />
        </div>
        <div className="px-1.5 py-0.5 rounded bg-gray-50">
          <div className="w-4 h-0.5 rounded bg-gray-300" />
        </div>
        <div className="px-1.5 py-0.5 rounded bg-gray-50">
          <div className="w-6 h-0.5 rounded bg-gray-300" />
        </div>
      </div>

      {/* Kanban columns */}
      <div className="flex gap-1.5 flex-1 min-h-0">
        {/* Col 1 - A fazer */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-5 h-0.5 rounded bg-gray-300" />
          </div>
          <div className="w-full h-4 rounded-sm bg-white border border-gray-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="h-0.5 w-full rounded-t-sm bg-violet-300" />
            <div className="p-0.5 flex flex-col gap-0.5">
              <div className="w-full h-0.5 rounded bg-gray-200" />
              <div className="w-3/4 h-0.5 rounded bg-gray-200" />
            </div>
          </div>
          <div className="w-full h-5 rounded-sm bg-white border border-gray-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="h-0.5 w-full rounded-t-sm bg-violet-300" />
            <div className="p-0.5 flex flex-col gap-0.5">
              <div className="w-full h-0.5 rounded bg-gray-200" />
              <div className="w-2/3 h-0.5 rounded bg-gray-200" />
              <div className="w-4 h-0.5 rounded bg-violet-200" />
            </div>
          </div>
        </div>

        {/* Col 2 - Em progresso */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
            <div className="w-6 h-0.5 rounded bg-gray-300" />
          </div>
          <div className="w-full h-4 rounded-sm bg-white border border-gray-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="h-0.5 w-full rounded-t-sm bg-blue-300" />
            <div className="p-0.5 flex flex-col gap-0.5">
              <div className="w-full h-0.5 rounded bg-gray-200" />
              <div className="w-5/6 h-0.5 rounded bg-gray-200" />
            </div>
          </div>
          <div className="w-full h-3 rounded-sm bg-white border border-gray-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="h-0.5 w-full rounded-t-sm bg-blue-300" />
          </div>
        </div>

        {/* Col 3 - Feito */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
            <div className="w-4 h-0.5 rounded bg-gray-300" />
          </div>
          <div className="w-full h-3 rounded-sm bg-white border border-gray-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="h-0.5 w-full rounded-t-sm bg-emerald-300" />
          </div>
          <div className="w-full h-5 rounded-sm bg-white border border-gray-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="h-0.5 w-full rounded-t-sm bg-emerald-300" />
            <div className="p-0.5 flex flex-col gap-0.5">
              <div className="w-full h-0.5 rounded bg-gray-200" />
              <div className="w-2/3 h-0.5 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Documentos — Page editor preview
// ─────────────────────────────────────────────
export function DocumentsMockup() {
  return (
    <div className="w-full h-full flex gap-1.5 p-2 overflow-hidden">
      {/* Sidebar */}
      <div className="w-8 flex flex-col gap-1 shrink-0 pt-1">
        <div className="w-full h-1 rounded bg-blue-200/70" />
        <div className="w-5 h-0.5 rounded bg-gray-200 ml-1" />
        <div className="w-6 h-0.5 rounded bg-gray-200 ml-1" />
        <div className="w-5 h-0.5 rounded bg-blue-100 ml-1" />
        <div className="w-full h-px bg-gray-100 my-0.5" />
        <div className="w-6 h-0.5 rounded bg-gray-200 ml-1" />
        <div className="w-4 h-0.5 rounded bg-gray-200 ml-1" />
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        {/* Title */}
        <div className="w-3/4 h-2 rounded bg-gray-800/10" />
        <div className="w-1/2 h-1.5 rounded bg-gray-300/60" />

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 my-0.5" />

        {/* Body text */}
        <div className="flex flex-col gap-0.5">
          <div className="w-full h-0.5 rounded bg-gray-200" />
          <div className="w-11/12 h-0.5 rounded bg-gray-200" />
          <div className="w-3/4 h-0.5 rounded bg-gray-200" />
        </div>

        {/* Highlighted block */}
        <div className="w-full rounded bg-blue-50 border border-blue-100 p-1 flex flex-col gap-0.5">
          <div className="w-full h-0.5 rounded bg-blue-200" />
          <div className="w-5/6 h-0.5 rounded bg-blue-200" />
        </div>

        {/* More text */}
        <div className="flex flex-col gap-0.5">
          <div className="w-full h-0.5 rounded bg-gray-200" />
          <div className="w-5/6 h-0.5 rounded bg-gray-200" />
          <div className="w-2/3 h-0.5 rounded bg-gray-200" />
        </div>

        {/* Tags */}
        <div className="flex gap-1 mt-0.5">
          <div className="px-1 py-0.5 rounded bg-blue-100 border border-blue-200/60">
            <div className="w-4 h-0.5 rounded bg-blue-400" />
          </div>
          <div className="px-1 py-0.5 rounded bg-gray-100 border border-gray-200/60">
            <div className="w-5 h-0.5 rounded bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Assistente de IA — Chat interface preview
// ─────────────────────────────────────────────
export function AIMockup() {
  return (
    <div className="w-full h-full flex flex-col p-2 gap-1.5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-rose-400 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-white/80" />
        </div>
        <div className="w-12 h-0.5 rounded bg-gray-300" />
        <div className="ml-auto px-1 py-0.5 rounded text-[5px] font-bold bg-rose-500 text-white leading-none">IA</div>
      </div>

      {/* Search bar */}
      <div className="w-full h-4 rounded-md bg-white border border-gray-200 flex items-center px-1.5 gap-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="w-1.5 h-1.5 rounded-full bg-rose-300/70 shrink-0" />
        <div className="w-14 h-0.5 rounded bg-gray-200" />
        <div className="ml-auto w-1 h-2 rounded-sm bg-rose-300 animate-pulse" />
      </div>

      {/* Suggestion chips */}
      <div className="flex gap-1 flex-wrap">
        <div className="px-1 py-0.5 rounded-full bg-rose-50 border border-rose-100">
          <div className="w-6 h-0.5 rounded bg-rose-300" />
        </div>
        <div className="px-1 py-0.5 rounded-full bg-gray-50 border border-gray-100">
          <div className="w-8 h-0.5 rounded bg-gray-300" />
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="self-end max-w-[70%] px-1.5 py-1 rounded-lg bg-rose-100 border border-rose-200/50">
          <div className="w-10 h-0.5 rounded bg-rose-300" />
        </div>
        <div className="self-start max-w-[80%] px-1.5 py-1 rounded-lg bg-white border border-gray-200">
          <div className="flex flex-col gap-0.5">
            <div className="w-14 h-0.5 rounded bg-gray-200" />
            <div className="w-10 h-0.5 rounded bg-gray-200" />
          </div>
        </div>
        <div className="self-end max-w-[60%] px-1.5 py-1 rounded-lg bg-rose-100 border border-rose-200/50">
          <div className="w-8 h-0.5 rounded bg-rose-300" />
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <div className="w-10 h-0.5 rounded bg-gray-200" />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Conversas — Team chat preview
// ─────────────────────────────────────────────
export function ChatMockup() {
  const avatarColors = ['bg-violet-300', 'bg-indigo-300', 'bg-pink-300', 'bg-amber-300']

  return (
    <div className="w-full h-full flex flex-col p-2 gap-1.5 overflow-hidden">
      {/* Header with avatars */}
      <div className="flex items-center gap-1">
        {avatarColors.slice(0, 3).map((color, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${color} border border-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)] ${i > 0 ? '-ml-1' : ''}`}
          />
        ))}
        <div className="ml-1 w-10 h-0.5 rounded bg-gray-300" />
        <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400" />
      </div>

      {/* Channel name */}
      <div className="flex items-center gap-1">
        <div className="text-[6px] text-violet-400 font-bold">#</div>
        <div className="w-8 h-0.5 rounded bg-gray-300" />
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex items-start gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-violet-300 shrink-0 mt-0.5" />
          <div className="flex-1 flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <div className="w-5 h-0.5 rounded bg-violet-300" />
              <div className="w-3 h-0.5 rounded bg-gray-200" />
            </div>
            <div className="w-full h-2.5 rounded-md bg-violet-50 border border-violet-100" />
          </div>
        </div>

        <div className="flex items-start gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-300 shrink-0 mt-0.5" />
          <div className="flex-1 flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <div className="w-6 h-0.5 rounded bg-indigo-300" />
              <div className="w-3 h-0.5 rounded bg-gray-200" />
            </div>
            <div className="w-3/4 h-2 rounded-md bg-indigo-50 border border-indigo-100" />
          </div>
        </div>

        <div className="flex items-start gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-pink-300 shrink-0 mt-0.5" />
          <div className="flex-1 flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <div className="w-4 h-0.5 rounded bg-pink-300" />
            </div>
            <div className="w-4/5 h-3 rounded-md bg-pink-50 border border-pink-100 p-0.5">
              <div className="w-full h-0.5 rounded bg-pink-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="w-full h-4 rounded-md bg-white border border-gray-200 flex items-center px-1.5 gap-1">
        <div className="w-16 h-0.5 rounded bg-gray-200" />
        <div className="ml-auto flex gap-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-violet-200" />
        </div>
      </div>
    </div>
  )
}
