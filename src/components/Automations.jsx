import React, { useState } from 'react'
import { Zap, Activity, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import AutomationFlow from './AutomationFlow'
import { staggerContainer, staggerItem, hoverScale } from '../lib/motion'
import { cn } from '../lib/utils'

const initialAutomations = [
  { id: 1, title: 'Website Chat AI',              triggers: 312, active: true,  lastTriggered: '2m ago' },
  { id: 2, title: 'Email Lead Follow-Up',          triggers: 284, active: true,  lastTriggered: '5m ago' },
  { id: 3, title: 'Monthly Email Newsletter',       triggers: 12,  active: true,  lastTriggered: '2d ago' },
  { id: 4, title: 'Missed Call Text-Back',          triggers: 247, active: true,  lastTriggered: '8m ago' },
  { id: 5, title: 'Appointment Reminder',           triggers: 203, active: true,  lastTriggered: '12m ago' },
  { id: 6, title: 'Post-Visit Review Request',      triggers: 156, active: true,  lastTriggered: '1h ago' },
  { id: 7, title: 'Instagram Auto-Reply',           triggers: 189, active: true,  lastTriggered: '3m ago' },
  { id: 8, title: 'Lead Re-Engagement Sequence',   triggers: 94,  active: true,  lastTriggered: '4h ago' },
]

export default function Automations() {
  const [automations, setAutomations] = useState(initialAutomations)

  const totalTriggers = automations.reduce((a, b) => a + b.triggers, 0)
  const activeCount   = automations.filter((a) => a.active).length
  const maxTriggers   = Math.max(...automations.map((a) => a.triggers))

  const toggleAutomation = (id) => {
    setAutomations((prev) => prev.map((a) => a.id === id ? { ...a, active: !a.active } : a))
  }

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
          <motion.div key={s.label} variants={staggerItem} {...hoverScale} className="rounded-xl p-4 text-center bg-surface-1 border border-white/10 card-hover">
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

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.25 }}
      >
        <div className="mb-3">
          <span className="text-zinc-500 font-mono text-[10px] tracking-wider">ALL AUTOMATIONS</span>
        </div>
        <div className="space-y-2">
          {automations.map((auto) => (
            <div
              key={auto.id}
              className="bg-surface-1 border border-white/10 rounded-xl px-5 py-4 flex items-center gap-5 card-hover"
            >
              {/* Toggle */}
              <button
                onClick={() => toggleAutomation(auto.id)}
                className={cn(
                  'relative w-9 h-5 rounded-full transition-colors flex-shrink-0',
                  auto.active ? 'bg-primary' : 'bg-zinc-700'
                )}
              >
                <span className={cn(
                  'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform',
                  auto.active ? 'left-[18px]' : 'left-0.5'
                )} />
              </button>

              {/* Title + status */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn('text-sm font-medium', auto.active ? 'text-white' : 'text-zinc-500')}>
                    {auto.title}
                  </span>
                  {auto.active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  )}
                </div>
                {/* Trigger progress bar */}
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(auto.triggers / maxTriggers) * 100}%`,
                        background: auto.active
                          ? 'linear-gradient(90deg, #3b82f6, #10b981)'
                          : '#3f3f46',
                      }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 w-16 text-right font-data">
                    {auto.triggers} runs
                  </span>
                </div>
              </div>

              {/* Last triggered */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Clock size={11} className="text-zinc-600" />
                <span className="font-mono text-[10px] text-zinc-500">{auto.lastTriggered}</span>
              </div>
            </div>
          ))}
        </div>
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
