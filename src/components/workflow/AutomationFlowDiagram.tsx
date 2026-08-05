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

// ─── Connector style constants ───────────────────────────────────────────────

const CONNECTOR_COLOR = '#3a3a3c'
const CONNECTOR_WIDTH = 1.5

// ─── Vertical connector (solid) ──────────────────────────────────────────────

function VerticalConnector({ height = 32, delay = 0 }: { height?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className="flex justify-center"
      style={{ transformOrigin: 'top' }}
    >
      <div
        style={{
          width: `${CONNECTOR_WIDTH}px`,
          height,
          backgroundColor: CONNECTOR_COLOR,
        }}
      />
    </motion.div>
  )
}

// ─── Vertical connector (dashed — for final segments) ────────────────────────

function DashedVerticalConnector({ height = 24, delay = 0 }: { height?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className="flex justify-center"
      style={{ transformOrigin: 'top' }}
    >
      <svg
        width={CONNECTOR_WIDTH + 2}
        height={height}
        viewBox={`0 0 ${CONNECTOR_WIDTH + 2} ${height}`}
        fill="none"
        style={{ display: 'block' }}
      >
        <line
          x1={(CONNECTOR_WIDTH + 2) / 2}
          y1={0}
          x2={(CONNECTOR_WIDTH + 2) / 2}
          y2={height}
          stroke={CONNECTOR_COLOR}
          strokeWidth={CONNECTOR_WIDTH}
          strokeDasharray="4 3"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}

// ─── Add button ──────────────────────────────────────────────────────────────

function AddButton({ delay = 0 }: { delay?: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex items-center justify-center w-7 h-7 rounded-lg border border-dashed border-neutral-300 text-neutral-400 hover:text-neutral-700 hover:border-neutral-400 bg-white transition-all duration-200 cursor-pointer shadow-xs"
      aria-label="Adicionar passo"
      type="button"
    >
      <Plus size={14} strokeWidth={2.2} />
    </motion.button>
  )
}

// ─── Branch label (Sim / Não) ────────────────────────────────────────────────

function BranchLabel({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: -4 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px 12px',
        borderRadius: '6px',
        border: `1px solid #d1d5db`,
        backgroundColor: '#ffffff',
        fontSize: '12px',
        fontWeight: 700,
        color: '#374151',
        letterSpacing: '0.01em',
        lineHeight: '18px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {text}
    </motion.span>
  )
}

// ─── Column connector ────────────────────────────────────────────────────────

function ColumnConnector({ height = 14, delay = 0 }: { height?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
      className="flex justify-center w-full"
      style={{ transformOrigin: 'top' }}
    >
      <div
        style={{
          width: `${CONNECTOR_WIDTH}px`,
          height,
          backgroundColor: CONNECTOR_COLOR,
        }}
      />
    </motion.div>
  )
}

// ─── Trigger icon ────────────────────────────────────────────────────────────

function TriggerIcon({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-center"
    >
      <div className="w-8 h-8 rounded-full bg-[#00C853] flex items-center justify-center shadow-[0_3px_12px_rgba(0,200,83,0.35)]">
        <Sparkles size={15} className="text-white" />
      </div>
    </motion.div>
  )
}

// ─── Decision diamond icon ───────────────────────────────────────────────────

function DecisionIcon({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-center"
    >
      <div className="w-7 h-7 rounded-[5px] bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-[0_2px_10px_rgba(79,70,229,0.3)]">
        <Sparkles size={12} className="text-white -rotate-45" />
      </div>
    </motion.div>
  )
}

// ─── Main diagram component ──────────────────────────────────────────────────

export function AutomationFlowDiagram() {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-full max-w-[640px] flex flex-col items-center">

        {/* ── ETAPA 1: Top Trigger ── */}
        <TriggerIcon delay={0.1} />
        <VerticalConnector height={18} delay={0.25} />

        {/* ── ETAPA 2: Card "Quando o ticket é criado" ── */}
        <div className="w-full max-w-[280px] sm:max-w-[310px]">
          <FlowNode
            icon={<LayoutList size={16} className="text-neutral-600" />}
            label="Quando o ticket é criado"
            delay={0.4}
          />
        </div>

        <VerticalConnector height={18} delay={0.65} />

        {/* ── ETAPA 3: Decision diamond ── */}
        <DecisionIcon delay={0.8} />
        <VerticalConnector height={12} delay={0.95} />

        {/* ── ETAPA 4: Card "Verificar severidade do ticket" ── */}
        <div className="w-full max-w-[270px] sm:max-w-[300px] relative z-10">
          <FlowNode
            icon={<Sparkles size={16} className="text-indigo-500" />}
            label="Verificar severidade do ticket"
            variant="decision"
            delay={1.1}
          />
        </div>

        {/* ── Stem from decision node ── */}
        <VerticalConnector height={16} delay={1.35} />

        {/* ── ETAPA 5 & 6: Branch Split (Sim / Não) ── */}
        <div className="w-full relative mt-[11.5px]" style={{ maxWidth: '640px' }}>

          {/* Central Flare */}
          <div className="absolute top-0 left-0 w-full h-0 pointer-events-none">
            {/* Left flare curve */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 1.5 }}
              className="absolute box-border"
              style={{
                top: '-12.5px',
                width: '12px',
                height: '14px',
                right: `calc(50% - ${CONNECTOR_WIDTH / 2}px)`,
                borderBottom: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                borderRight: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                borderBottomRightRadius: '12px',
              }}
            />
            {/* Right flare curve */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 1.5 }}
              className="absolute box-border"
              style={{
                top: '-12.5px',
                width: '12px',
                height: '14px',
                left: `calc(50% - ${CONNECTOR_WIDTH / 2}px)`,
                borderBottom: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                borderLeft: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                borderBottomLeftRadius: '12px',
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 relative">

            {/* ── RAMO ESQUERDO (Sim) ── */}
            <div className="flex flex-col items-center w-full">
              {/* Shoulder */}
              <div className="w-full relative h-[28px] shrink-0">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 1.55 }}
                  className="absolute top-0 origin-right right-[-12px]"
                  style={{
                    left: `calc(50% + 9.25px)`,
                    borderTop: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                  }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: 1.7 }}
                  className="absolute top-0 box-border"
                  style={{
                    left: `calc(50% - ${CONNECTOR_WIDTH / 2}px)`,
                    width: '10px',
                    height: '10px',
                    borderTop: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                    borderLeft: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                    borderTopLeftRadius: '10px',
                  }}
                />
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: 1.85 }}
                  className="absolute top-[10px] origin-top"
                  style={{
                    left: `calc(50% - ${CONNECTOR_WIDTH / 2}px)`,
                    width: `${CONNECTOR_WIDTH}px`,
                    height: '18px',
                    backgroundColor: CONNECTOR_COLOR,
                  }}
                />
              </div>

              {/* Label "Sim" */}
              <div className="py-1">
                <BranchLabel text="Sim" delay={2.0} />
              </div>

              <ColumnConnector height={10} delay={2.15} />

              {/* ETAPA 7: Card "Notificar equipe de escalonamento" */}
              <div className="w-full flex flex-col items-center">
                <FlowNode
                  icon={<Bell size={16} className="text-neutral-700" />}
                  label="Notificar equipe de escalonamento"
                  delay={2.3}
                />
                <ColumnConnector height={14} delay={2.6} />

                {/* ETAPA 8: Card "Notificar equipe no Slack" */}
                <FlowNode
                  icon={<FaSlack size={16} className="text-[#4A154B]" />}
                  label="Notificar equipe no Slack"
                  delay={2.8}
                />
                <ColumnConnector height={14} delay={3.1} />

                {/* ETAPA 9: Agent Card "Agente de Chamadas de Escalonamento" */}
                <FlowNode
                  icon={<Bot size={16} className="text-pink-500" />}
                  label="Agente de Chamadas de Escalonamento"
                  variant="agent"
                  delay={3.3}
                />
              </div>

              <DashedVerticalConnector height={24} delay={3.6} />
              <AddButton delay={3.8} />
            </div>

            {/* ── RAMO DIREITO (Não) ── */}
            <div className="flex flex-col items-center w-full">
              {/* Shoulder */}
              <div className="w-full relative h-[28px] shrink-0">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 1.55 }}
                  className="absolute top-0 origin-left left-[-12px]"
                  style={{
                    right: `calc(50% + 9.25px)`,
                    borderTop: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                  }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: 1.7 }}
                  className="absolute top-0 box-border"
                  style={{
                    right: `calc(50% - ${CONNECTOR_WIDTH / 2}px)`,
                    width: '10px',
                    height: '10px',
                    borderTop: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                    borderRight: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                    borderTopRightRadius: '10px',
                  }}
                />
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: 1.85 }}
                  className="absolute top-[10px] origin-top"
                  style={{
                    left: `calc(50% - ${CONNECTOR_WIDTH / 2}px)`,
                    width: `${CONNECTOR_WIDTH}px`,
                    height: '18px',
                    backgroundColor: CONNECTOR_COLOR,
                  }}
                />
              </div>

              {/* Label "Não" */}
              <div className="py-1">
                <BranchLabel text="Não" delay={2.0} />
              </div>

              <ColumnConnector height={10} delay={2.15} />

              {/* ETAPA 7: Card "Notificar equipe de plantão" */}
              <div className="w-full flex flex-col items-center">
                <FlowNode
                  icon={<Users size={16} className="text-neutral-700" />}
                  label="Notificar equipe de plantão"
                  delay={2.3}
                />
                <ColumnConnector height={14} delay={2.6} />

                {/* ETAPA 8: Card "Enviar notificação por Gmail" */}
                <FlowNode
                  icon={<SiGmail size={16} className="text-[#EA4335]" />}
                  label="Enviar notificação por Gmail"
                  delay={2.8}
                />
                <ColumnConnector height={14} delay={3.1} />

                {/* ETAPA 9: Agent Card "Agente Resolutor de Tickets" */}
                <FlowNode
                  icon={<Bot size={16} className="text-purple-500" />}
                  label="Agente Resolutor de Tickets"
                  variant="agent"
                  delay={3.3}
                />
              </div>

              <DashedVerticalConnector height={24} delay={3.6} />
              <AddButton delay={3.8} />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
