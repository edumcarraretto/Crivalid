import { motion } from 'motion/react'
import {
  LayoutList,
  Sparkles,
  Bell,
  Users,
  Plus,
  Bot,
} from 'lucide-react'
import { FaSlack } from 'react-icons/fa'
import { SiGmail } from '@icons-pack/react-simple-icons'
import { FlowNode } from './FlowNode'

// ─── Vertical connector ──────────────────────────────────────────────────────

function VerticalConnector({ height = 32, delay = 0 }: { height?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="flex justify-center"
      style={{ transformOrigin: 'top' }}
    >
      <div
        className="w-px bg-neutral-200"
        style={{ height }}
      />
    </motion.div>
  )
}

// ─── Add button ──────────────────────────────────────────────────────────────

function AddButton({ delay = 0 }: { delay?: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="mx-auto flex items-center justify-center w-7 h-7 rounded-lg border border-dashed border-neutral-300 text-neutral-400 hover:text-neutral-600 hover:border-neutral-400 transition-colors duration-200 cursor-pointer"
      aria-label="Adicionar passo"
      type="button"
    >
      <Plus size={14} strokeWidth={2} />
    </motion.button>
  )
}

// ─── Branch label ────────────────────────────────────────────────────────────

function BranchLabel({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full border border-neutral-200 bg-white text-[11px] font-medium text-neutral-500"
    >
      {text}
    </motion.span>
  )
}

// ─── Trigger icon ────────────────────────────────────────────────────────────

function TriggerIcon({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex justify-center"
    >
      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_2px_8px_rgba(16,185,129,0.3)]">
        <Sparkles size={14} className="text-white" />
      </div>
    </motion.div>
  )
}

// ─── Decision diamond icon ───────────────────────────────────────────────────

function DecisionIcon({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex justify-center"
    >
      <div className="w-7 h-7 rotate-45 rounded-[5px] bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-[0_2px_8px_rgba(16,185,129,0.25)]">
        <Sparkles size={12} className="text-white -rotate-45" />
      </div>
    </motion.div>
  )
}

// ─── Main diagram component ──────────────────────────────────────────────────

export function AutomationFlowDiagram() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[680px] flex flex-col items-center">

        {/* ── Trigger ── */}
        <TriggerIcon delay={0.1} />
        <VerticalConnector height={20} delay={0.15} />

        {/* ── Trigger node ── */}
        <div className="w-full max-w-[280px] sm:max-w-[300px]">
          <FlowNode
            icon={<LayoutList size={16} className="text-neutral-500" />}
            label="Quando um ticket for criado"
            delay={0.2}
          />
        </div>

        <VerticalConnector height={20} delay={0.25} />

        {/* ── Decision diamond icon ── */}
        <DecisionIcon delay={0.3} />
        <VerticalConnector height={12} delay={0.32} />

        {/* ── Decision node ── */}
        <div className="w-full max-w-[270px] sm:max-w-[290px]">
          <FlowNode
            icon={<Sparkles size={16} className="text-indigo-500" />}
            label="Verificar a gravidade do ticket"
            variant="decision"
            delay={0.35}
          />
        </div>

        <VerticalConnector height={16} delay={0.4} />

        {/* ── Branch split ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.42 }}
          className="w-full relative"
        >
          {/* Horizontal connector bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-neutral-200" style={{ width: '50%' }} />

          {/* Branch columns */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-0">

            {/* ── Left branch (Sim) ── */}
            <div className="flex flex-col items-center">
              {/* Vertical line down from horizontal bar */}
              <div className="w-px h-4 bg-neutral-200" />
              <BranchLabel text="Sim" delay={0.45} />
              <VerticalConnector height={16} delay={0.48} />

              <div className="w-full space-y-3">
                <FlowNode
                  icon={<Bell size={16} className="text-neutral-500" />}
                  label="Notificar a equipe de escalonamento"
                  delay={0.5}
                />
                <FlowNode
                  icon={<FaSlack size={16} className="text-[#4A154B]" />}
                  label="Notificar a equipe no Slack"
                  delay={0.55}
                />
                <FlowNode
                  icon={<Bot size={16} className="text-orange-500" />}
                  label="Agente acionador de escalonamento"
                  variant="agent"
                  delay={0.6}
                />
              </div>

              <VerticalConnector height={16} delay={0.65} />
              <AddButton delay={0.68} />
            </div>

            {/* ── Right branch (Não) ── */}
            <div className="flex flex-col items-center">
              {/* Vertical line down from horizontal bar */}
              <div className="w-px h-4 bg-neutral-200" />
              <BranchLabel text="Não" delay={0.45} />
              <VerticalConnector height={16} delay={0.48} />

              <div className="w-full space-y-3">
                <FlowNode
                  icon={<Users size={16} className="text-neutral-500" />}
                  label="Notificar a equipe de plantão"
                  delay={0.5}
                />
                <FlowNode
                  icon={<SiGmail size={16} className="text-[#EA4335]" />}
                  label="Enviar notificação pelo Gmail"
                  delay={0.55}
                />
                <FlowNode
                  icon={<Bot size={16} className="text-violet-500" />}
                  label="Agente de resolução de tickets"
                  variant="agent"
                  delay={0.6}
                />
              </div>

              <VerticalConnector height={16} delay={0.65} />
              <AddButton delay={0.68} />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
