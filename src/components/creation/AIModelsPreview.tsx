import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { SiAnthropic, SiGooglegemini } from '@icons-pack/react-simple-icons'
import { aiModels } from './creationData'

// ─── Provider icon indicator ──────────────────────────────────────────────────

const OpenAIIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 3.234.41l-.096.054-3.23 1.838a.53.53 0 0 0-.265.455zm.742-1.577 1.758-1 1.762 1v2l-1.755 1-1.762-1z" />
  </svg>
)

const CerebroIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="8" r="3.5" fill="#3b82f6" style={{ mixBlendMode: 'screen' }} />
    <circle cx="15.5" cy="10" r="3.5" fill="#ec4899" style={{ mixBlendMode: 'screen' }} />
    <circle cx="15.5" cy="14" r="3.5" fill="#f43f5e" style={{ mixBlendMode: 'screen' }} />
    <circle cx="12" cy="16" r="3.5" fill="#f59e0b" style={{ mixBlendMode: 'screen' }} />
    <circle cx="8.5" cy="14" r="3.5" fill="#10b981" style={{ mixBlendMode: 'screen' }} />
    <circle cx="8.5" cy="10" r="3.5" fill="#06b6d4" style={{ mixBlendMode: 'screen' }} />
  </svg>
)

const getProviderIcon = (provider: string) => {
  switch (provider) {
    case 'OpenAI':
      return <OpenAIIcon className="w-3.5 h-3.5 text-neutral-300" />
    case 'Anthropic':
      return <SiAnthropic className="w-3.5 h-3.5 text-[#e5d9c5]" /> // Anthropic's beige-ish color
    case 'Google':
      return <SiGooglegemini className="w-4 h-4 text-blue-400" />
    case 'Cerebro':
      return <CerebroIcon className="w-4 h-4" />
    default:
      return <div className="w-3 h-3 rounded-full bg-neutral-500" />
  }
}



// ─── Component ────────────────────────────────────────────────────────────────

export function AIModelsPreview() {
  const [selectedIndex, setSelectedIndex] = useState(1) // Default to second item (Claude Opus)

  useEffect(() => {
    // Check if the user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return // Do not animate if user prefers reduced motion

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % aiModels.length)
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="w-full h-full flex flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0c0c0e]/90"
      style={{
        maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)'
      }}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="text-[10px] font-medium text-neutral-400">
          Melhores modelos
        </div>
      </div>

      {/* Model list */}
      <div className="flex-1 flex flex-col py-1">
        {aiModels.map((model, i) => {
          const isSelected = i === selectedIndex

          return (
            <div
              key={model.id}
              className={[
                'flex items-center gap-3 px-4 py-2.5 transition-all duration-300',
                isSelected
                  ? 'bg-gradient-to-r from-rose-500/[0.08] to-transparent'
                  : 'hover:bg-white/[0.02]',
              ].join(' ')}
            >
              {/* Provider logo */}
              <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
                {getProviderIcon(model.provider)}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-white leading-none transition-colors duration-300">
                  {model.name}
                </div>
              </div>

              {/* Selection check */}
              <div
                className={`w-3.5 h-3.5 ml-1 shrink-0 flex items-center justify-center transition-opacity duration-300 ${
                  isSelected ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Check className="w-full h-full text-white" strokeWidth={2.5} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
