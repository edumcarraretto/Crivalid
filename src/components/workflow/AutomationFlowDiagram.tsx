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

const CONNECTOR_COLOR = '#4a4a4c'
const CONNECTOR_WIDTH = 1.5

// ─── Vertical connector (solid) ──────────────────────────────────────────────

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
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
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

// ─── Branch label (refined, technical) ───────────────────────────────────────

function BranchLabel({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px 10px',
        borderRadius: '4px',
        border: `1px solid #d1d5db`,
        backgroundColor: '#ffffff',
        fontSize: '11px',
        fontWeight: 500,
        color: '#4b5563',
        letterSpacing: '0.01em',
        lineHeight: '18px',
      }}
    >
      {text}
    </motion.span>
  )
}

// ─── Column connector (between stacked cards within a branch) ────────────────

function ColumnConnector({ height = 12, delay = 0 }: { height?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay }}
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
    <div className="w-full flex justify-center pb-12">
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
        <div className="w-full max-w-[270px] sm:max-w-[290px] relative z-10">
          <FlowNode
            icon={<Sparkles size={16} className="text-indigo-500" />}
            label="Verificar a gravidade do ticket"
            variant="decision"
            delay={0.35}
          />
        </div>

        {/* ── Stem from decision node ── */}
        <VerticalConnector height={16} delay={0.4} />

        {/* ── Branch split (clean Y-junction with flared branch corners) ── */}
        <div className="w-full relative mt-[11.5px]" style={{ maxWidth: '680px' }}>

          {/* ── Central Flare (Pure CSS Y-split for perfect sub-pixel matching) ── */}
          <div className="absolute top-0 left-0 w-full h-0 pointer-events-none">
            {/* Left flare curve */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.42 }}
              className="absolute box-border"
              style={{ 
                top: '-12.5px',
                width: '12px',
                height: '14px',
                right: `calc(50% - ${CONNECTOR_WIDTH/2}px)`,
                borderBottom: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                borderRight: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                borderBottomRightRadius: '12px'
              }} 
            />
            {/* Right flare curve */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.42 }}
              className="absolute box-border"
              style={{ 
                top: '-12.5px',
                width: '12px',
                height: '14px',
                left: `calc(50% - ${CONNECTOR_WIDTH/2}px)`,
                borderBottom: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                borderLeft: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                borderBottomLeftRadius: '12px'
              }} 
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 relative">
            
            {/* ── Left branch (Sim) ── */}
            <div className="flex flex-col items-center w-full">
              {/* Shoulder: horizontal bar → rounded corner → vertical drop */}
              <div className="w-full relative h-[28px] shrink-0">
                {/* Horizontal line — pure CSS border to perfectly match outer corner, intentionally overlaps flare by stretching past it */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: 0.42 }}
                  className="absolute top-0 origin-right right-[-12px]"
                  style={{
                    left: `calc(50% + 9.25px)`,
                    borderTop: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                  }}
                />

                {/* Rounded corner (top-left turn) */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.15, delay: 0.55 }}
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

                {/* Vertical drop */}
                <motion.div 
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: 0.6 }}
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
                <BranchLabel text="Sim" delay={0.65} />
              </div>

              <ColumnConnector height={8} delay={0.7} />

              {/* Cards */}
              <div className="w-full flex flex-col items-center">
                <FlowNode
                  icon={<Bell size={16} className="text-neutral-500" />}
                  label="Notificar a equipe de escalonamento"
                  delay={0.78}
                />
                <ColumnConnector height={14} delay={0.81} />
                <FlowNode
                  icon={<FaSlack size={16} className="text-[#4A154B]" />}
                  label="Notificar a equipe no Slack"
                  delay={0.84}
                />
                <ColumnConnector height={14} delay={0.87} />
                <FlowNode
                  icon={<Bot size={16} className="text-orange-500" />}
                  label="Agente acionador de escalonamento"
                  variant="agent"
                  delay={0.9}
                />
              </div>

              <DashedVerticalConnector height={24} delay={0.95} />
              <AddButton delay={0.98} />
            </div>

            {/* ── Right branch (Não) ── */}
            <div className="flex flex-col items-center w-full">
              {/* Shoulder: horizontal bar → rounded corner → vertical drop */}
              <div className="w-full relative h-[28px] shrink-0">
                {/* Horizontal line — pure CSS border to perfectly match outer corner, intentionally overlaps flare by stretching past it */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: 0.42 }}
                  className="absolute top-0 origin-left left-[-12px]"
                  style={{
                    right: `calc(50% + 9.25px)`,
                    borderTop: `${CONNECTOR_WIDTH}px solid ${CONNECTOR_COLOR}`,
                  }}
                />

                {/* Rounded corner (top-right turn) */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.15, delay: 0.55 }}
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

                {/* Vertical drop */}
                <motion.div 
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: 0.6 }}
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
                <BranchLabel text="Não" delay={0.65} />
              </div>

              <ColumnConnector height={8} delay={0.7} />

              {/* Cards */}
              <div className="w-full flex flex-col items-center">
                <FlowNode
                  icon={<Users size={16} className="text-neutral-500" />}
                  label="Notificar a equipe de plantão"
                  delay={0.78}
                />
                <ColumnConnector height={14} delay={0.81} />
                <FlowNode
                  icon={<SiGmail size={16} className="text-[#EA4335]" />}
                  label="Enviar notificação pelo Gmail"
                  delay={0.84}
                />
                <ColumnConnector height={14} delay={0.87} />
                <FlowNode
                  icon={<Bot size={16} className="text-violet-500" />}
                  label="Agente de resolução de tickets"
                  variant="agent"
                  delay={0.9}
                />
              </div>

              <DashedVerticalConnector height={24} delay={0.95} />
              <AddButton delay={0.98} />
            </div>
            
          </div>
        </div>

      </div>
    </div>
  )
}
