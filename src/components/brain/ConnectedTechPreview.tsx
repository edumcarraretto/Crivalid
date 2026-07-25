import { motion } from 'motion/react'
import {
  Cpu,
  Globe,
  Layers,
  Zap,
  Code2,
  Palette,
  Database,
  Workflow,
} from 'lucide-react'

// ─── Orbital node data ───────────────────────────────────────────────────────

const orbitalNodes = [
  { icon: Code2, angle: 0, label: 'Código', delay: 0.3 },
  { icon: Palette, angle: 45, label: 'Design', delay: 0.5 },
  { icon: Database, angle: 90, label: 'Dados', delay: 0.7 },
  { icon: Workflow, angle: 135, label: 'Automação', delay: 0.9 },
  { icon: Globe, angle: 180, label: 'Web', delay: 1.1 },
  { icon: Layers, angle: 225, label: 'Stack', delay: 1.3 },
  { icon: Zap, angle: 270, label: 'APIs', delay: 1.5 },
  { icon: Cpu, angle: 315, label: 'IA', delay: 1.7 },
]

// ─── Component ───────────────────────────────────────────────────────────────

export function ConnectedTechPreview() {
  const radius = 78
  const centerX = 96
  const centerY = 96

  return (
    <div className="relative w-full max-w-[240px] mx-auto mt-8 pb-4 h-[230px] flex flex-col items-center justify-center">

      {/* ── SVG Connection Lines ── */}
      <svg
        viewBox="0 0 192 192"
        fill="none"
        className="absolute inset-0 w-full h-[192px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{ maxWidth: 240, maxHeight: 192 }}
      >
        {orbitalNodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180
          const x2 = centerX + radius * Math.cos(rad)
          const y2 = centerY + radius * Math.sin(rad)
          return (
            <motion.line
              key={node.label}
              x1={centerX}
              y1={centerY}
              x2={x2}
              y2={y2}
              stroke="url(#lineGrad)"
              strokeWidth={0.8}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.35 }}
              transition={{ duration: 1.2, delay: node.delay, ease: [0.22, 1, 0.36, 1] }}
            />
          )
        })}
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Orbital ring (subtle) ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{ width: radius * 2 + 24, height: radius * 2 + 24 }}
      >
        <div
          className="w-full h-full rounded-full border border-dashed border-white/[0.06]"
        />
      </motion.div>

      {/* ── Central Core ── */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px rgba(139,92,246,0.15), 0 0 40px rgba(6,182,212,0.08)',
            '0 0 28px rgba(139,92,246,0.25), 0 0 56px rgba(6,182,212,0.15)',
            '0 0 20px rgba(139,92,246,0.15), 0 0 40px rgba(6,182,212,0.08)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600/30 to-cyan-500/20 border border-violet-400/25 flex items-center justify-center backdrop-blur-sm"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Cpu className="w-6 h-6 text-violet-300" strokeWidth={1.8} />
        </motion.div>
      </motion.div>

      {/* ── Orbital Nodes ── */}
      {orbitalNodes.map((node) => {
        const rad = (node.angle * Math.PI) / 180
        const x = centerX + radius * Math.cos(rad)
        const y = centerY + radius * Math.sin(rad)
        const Icon = node.icon

        return (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: node.delay, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-10"
            style={{
              left: `calc(50% + ${x - centerX}px)`,
              top: `calc(50% + ${y - centerY}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2.5 + Math.random() * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: node.delay * 0.5,
              }}
              className="w-8 h-8 rounded-xl bg-[#0c0c10] border border-white/[0.08] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            >
              <Icon className="w-3.5 h-3.5 text-neutral-400" strokeWidth={2} />
            </motion.div>
          </motion.div>
        )
      })}

      {/* ── Status Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 8px rgba(52,211,153,0.1)',
              '0 0 16px rgba(52,211,153,0.25)',
              '0 0 8px rgba(52,211,153,0.1)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a0a0c] border border-emerald-500/20"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          <span className="text-[9px] font-mono font-semibold tracking-[0.15em] text-emerald-400/90 uppercase">
            Núcleo Ativo
          </span>
        </motion.div>
      </motion.div>

    </div>
  )
}
