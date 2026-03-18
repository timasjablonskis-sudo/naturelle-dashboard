import React, { useState } from 'react'
import { Zap, Activity } from 'lucide-react'
import { motion } from 'framer-motion'
import AutomationFlow from './AutomationFlow'
import { staggerContainer, staggerItem, hoverScale } from '../lib/motion'

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

export default function Automations() {
  const [automations] = useState(initialAutomations)

  const totalTriggers = automations.reduce((a, b) => a + b.triggers, 0)
  const activeCount   = automations.filter((a) => a.active).length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-3xl text-white tracking-tight">Automations</h2>
          <p className="text-zinc-400 text-sm mt-0.5">Every automation running in the background — 24/7, zero manual intervention.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl px-4 py-2 bg-primary/10 border border-primary/25">
            <Zap size={13} className="text-primary" />
            <span className="font-mono text-xs font-bold text-primary">{activeCount} ACTIVE</span>
          </div>
          <div className="rounded-xl px-4 py-2 bg-surface-1 border border-white/10">
            <span className="text-zinc-400 font-mono text-xs">{totalTriggers.toLocaleString()} triggers this month</span>
          </div>
        </div>
      </div>

      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-3" variants={staggerContainer} initial="initial" animate="animate">
        {[
          { label: 'Active Automations', value: activeCount.toString() },
          { label: 'Total Triggers',     value: totalTriggers.toLocaleString() },
          { label: 'Leads Captured',     value: '847' },
          { label: 'Revenue Attributed', value: '$89k' },
        ].map((s) => (
          <motion.div key={s.label} variants={staggerItem} {...hoverScale} className="rounded-xl p-4 text-center bg-surface-1 border border-white/10">
            <div className="font-data text-3xl font-semibold text-white">{s.value}</div>
            <div className="text-zinc-500 font-mono text-[10px] mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.15 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <h3 className="text-white font-semibold text-base tracking-tight">Automation Network</h3>
          <span className="flex items-center gap-1.5 ml-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-primary" />
            <span className="font-mono text-[9px] text-primary">LIVE</span>
          </span>
        </div>
        <AutomationFlow />
      </motion.div>

      <div className="rounded-xl px-5 py-4 flex items-center gap-3 bg-surface-1 border border-white/10">
        <Activity size={16} className="text-primary" />
        <p className="text-zinc-400 text-sm">
          All automations run 24/7 without manual intervention.{' '}
          <span className="text-primary">1,497 actions taken this month</span> — saving the team an estimated 100+ hours.
        </p>
      </div>
    </div>
  )
}
