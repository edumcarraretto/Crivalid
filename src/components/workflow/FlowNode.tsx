import { motion } from 'motion/react'
import type { ReactNode } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface FlowNodeProps {
  icon: ReactNode
  label: string
  variant?: 'default' | 'decision' | 'agent'
  delay?: number
}

// ─── Rainbow gradient for agent cards ────────────────────────────────────────

const RAINBOW_GRADIENT =
  'linear-gradient(135deg, #f9a8d4 0%, #fde68a 18%, #86efac 36%, #67e8f9 54%, #93c5fd 72%, #c4b5fd 90%, #f9a8d4 100%)'


// ─── Decision: back card with rainbow gradient border ────────────────────────

function DecisionBackCard() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ transform: 'translate(-2px, -1px)' }}
    >
      <div
        className="w-full h-full rounded-2xl"
        style={{
          padding: '1.5px',
          background:
            'linear-gradient(90deg, rgba(103,232,249,0.5) 0%, rgba(134,239,172,0.45) 25%, rgba(253,224,71,0.5) 50%, rgba(251,146,180,0.55) 75%, rgba(196,181,253,0.5) 100%)',
        }}
      >
        <div className="w-full h-full rounded-[14.5px] bg-white" />
      </div>
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export function FlowNode({ icon, label, variant = 'default', delay = 0 }: FlowNodeProps) {
  const isDecision = variant === 'decision'
  const isAgent = variant === 'agent'

  if (isDecision) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full group"
        style={{ padding: '6px 8px' }}
      >
        {/* Back card — straight, rainbow gradient border */}
        <DecisionBackCard />

        {/* Front card — content, slightly tilted right, same rainbow border */}
        <div
          className="relative z-10 w-full"
          style={{ transform: 'rotate(1.2deg)' }}
        >
          <div
            className="rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            style={{
              padding: '1.5px',
              background:
                'linear-gradient(90deg, rgba(103,232,249,0.5) 0%, rgba(134,239,172,0.45) 25%, rgba(253,224,71,0.5) 50%, rgba(251,146,180,0.55) 75%, rgba(196,181,253,0.5) 100%)',
            }}
          >
            <div className="flex items-center gap-3 pl-2.5 pr-4 py-2.5 rounded-[14.5px] bg-white">
              {/* Icon in capsule */}
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-50 border border-neutral-100">
                {icon}
              </span>
              <span className="text-[13px] sm:text-sm font-medium text-neutral-800 truncate">
                {label}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full group"
    >
      {/* ── Agent: rainbow gradient border ── */}
      {isAgent && (
        <div
          className="absolute -inset-px rounded-[13px] pointer-events-none"
          style={{ background: RAINBOW_GRADIENT, opacity: 0.55 }}
        />
      )}

      {/* ── Card content ── */}
      <div
        className={`
          relative flex items-center gap-2.5 px-4 py-3 rounded-xl
          text-[13px] sm:text-sm font-medium text-neutral-800
          w-full transition-shadow duration-200
          ${isAgent
            ? 'bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]'
            : 'bg-white border border-neutral-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md'
          }
        `}
      >
        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6">{icon}</span>
        <span className="truncate">{label}</span>
      </div>
    </motion.div>
  )
}
