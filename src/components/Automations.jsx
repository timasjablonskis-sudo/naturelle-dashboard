import React, { useState } from 'react'
import { Zap, Activity } from 'lucide-react'
import { motion } from 'framer-motion'
import AutomationFlow from './AutomationFlow'

const initialAutomations = [
  { id: 1, title: 'Website Chat AI',              triggers: 312, active: true },
  { id: 2, title: 'Email Lead Follow-Up',          triggers: 284, active: true },
  { id: 3, title: 'Monthly Email Newsletter',       triggers: 12,  active: true },
  { id: 4, title: 'Missed Call Text-Back',          triggers: 247, active: true },
  { id: 5, title: 'Appointment Reminder',           triggers: 203, active: true },
  { id: 6, title: 'Post-Visit Review Request',      triggers: 156, active: true },
  { id: 7, title: 'Instagram Auto-Reply',           triggers: 189, active: true },
  { id: 8, title: 'Lead Re-Engagement Sequence',   triggers: 94,  active: true },
]

const springTransition = { type: 'spring', stiffness: 260, damping: 28 }

export default function Automations() {
  const [automations] = useState(initialAutomations)

  const totalTriggers = automations.reduce((a, b) => a + b.triggers, 0)
  const activeCount   = automations.filter((a) => a.active).length

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl text-white">Automations</h2>
          <p className="text-[#6a8a85] text-sm mt-0.5">Every automation running in the background — 24/7, zero manual intervention.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl px-4 py-2 glass"
            style={{ borderColor: 'rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.05)' }}>
            <Zap size={13} style={{ color: '#D4AF37' }} />
            <span className="font-mono text-xs font-bold" style={{ color: '#D4AF37' }}>{activeCount} ACTIVE</span>
          </div>
          <div className="rounded-xl px-4 py-2 glass">
            <span className="text-[#6a8a85] font-mono text-xs">{totalTriggers.toLocaleString()} triggers this month</span>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Active Automations', value: activeCount.toString() },
          { label: 'Total Triggers',     value: totalTriggers.toLocaleString() },
          { label: 'Leads Captured',     value: '847' },
          { label: 'Revenue Attributed', value: '$89k' },
        ].map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: idx * 0.06 }}
            className="rounded-xl p-4 text-center glass"
          >
            <div className="font-data text-3xl font-semibold text-white" style={{ color: '#D4AF37' }}>{s.value}</div>
            <div className="text-[#4a6560] font-mono text-[10px] mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Node graph */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.15 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <h3 className="text-white font-display text-base">Automation Network</h3>
          <span className="flex items-center gap-1.5 ml-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D4AF37' }} />
            <span className="font-mono text-[9px]" style={{ color: '#D4AF37' }}>LIVE</span>
          </span>
        </div>
        <AutomationFlow />
      </motion.div>

      <div className="rounded-xl px-5 py-4 flex items-center gap-3 glass">
        <Activity size={16} style={{ color: '#D4AF37' }} />
        <p className="text-[#6a8a85] text-sm">
          All automations run 24/7 without manual intervention.{' '}
          <span style={{ color: '#D4AF37' }}>1,497 actions taken this month</span> — saving the team an estimated 100+ hours.
        </p>
      </div>
    </div>
  )
}
