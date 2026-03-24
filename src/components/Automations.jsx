import React, { useState } from 'react'
import { Zap, Activity, Clock, PhoneMissed, MessageSquare, Phone, Mail, Calendar, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import AutomationFlow from './AutomationFlow'
import { staggerContainer, staggerItem } from '../lib/motion'
import { cn } from '../lib/utils'
import { analyticsKPIs } from '../data/stats'

const ICON_MAP = { PhoneMissed, MessageSquare, Phone, Mail, Calendar, Clock, Zap, Star }

const TIERS = [
  {
    key: 'tier1',
    name: 'The Safety Net',
    subtitle: 'Lead Protection',
    description: 'Never lose a lead again — 100% capture rate',
    accent: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    barColor: '245,158,11',
  },
  {
    key: 'tier2',
    name: 'The AI Front Desk',
    subtitle: 'Operational Efficiency',
    description: 'Replace manual admin — AI handles the busywork',
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/25',
    barColor: '59,130,246',
  },
  {
    key: 'tier3',
    name: 'The Revenue Engine',
    subtitle: 'Database Growth',
    description: 'Instant ROI from existing patient data',
    accent: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/25',
    barColor: '5,150,105',
  },
]

const initialAutomations = [
  // Tier 1: The Safety Net
  { id: 1, tier: 'tier1', title: 'Missed Call Text-Back',  description: 'AI texts back within seconds when a call is missed', icon: 'PhoneMissed',   triggers: 247, active: true,  lastTriggered: '8m ago' },
  { id: 2, tier: 'tier1', title: 'Omni-Channel Chat AI',   description: 'Website + Instagram + FB DM — unified auto-reply',   icon: 'MessageSquare', triggers: 501, active: true,  lastTriggered: '2m ago' },

  // Tier 2: The AI Front Desk
  { id: 3, tier: 'tier2', title: 'AI Voice Receptionist',   description: 'Answers calls, qualifies leads, books appointments', icon: 'Phone',    triggers: 132, active: true,  lastTriggered: '15m ago' },
  { id: 4, tier: 'tier2', title: 'Instant Lead Handshake',  description: 'Personalized email within 60 seconds of any inquiry', icon: 'Mail',     triggers: 284, active: true,  lastTriggered: '5m ago' },
  { id: 5, tier: 'tier2', title: 'Smart Reminders',         description: 'Appointment confirms, day-before reminders, no-show follow-ups', icon: 'Calendar', triggers: 203, active: true,  lastTriggered: '12m ago' },

  // Tier 3: The Revenue Engine
  { id: 6, tier: 'tier3', title: 'The "Botox Clock" Recall', description: 'Treatment cycle tracking — auto-recall at 90d, 6mo, 12mo', icon: 'Clock', triggers: 94,  active: true,  lastTriggered: '4h ago' },
  { id: 7, tier: 'tier3', title: 'Database Reactivation',    description: 'Re-engages patients who haven\'t visited in 90+ days', icon: 'Zap',   triggers: 12,  active: true,  lastTriggered: '2d ago' },
  { id: 8, tier: 'tier3', title: 'The Reputation Builder',   description: 'Post-visit review requests + loyalty loop',           icon: 'Star',  triggers: 156, active: true,  lastTriggered: '1h ago' },
]

function TierSection({ tier, automations, toggleAutomation, maxTriggers }) {
  const activeInTier = automations.filter(a => a.active).length
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <div>
          <div className="flex items-center gap-2">
            <h3 className={cn('font-semibold text-base tracking-tight', tier.accent)}>{tier.name}</h3>
            <span className={cn('font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider border', tier.bg, tier.border, tier.accent)}>
              {tier.subtitle}
            </span>
          </div>
          <p className="text-zinc-500 text-xs mt-0.5">{tier.description}</p>
        </div>
        <div className={cn('rounded-lg px-3 py-1.5 border', tier.bg, tier.border)}>
          <span className={cn('font-mono text-[10px] font-bold', tier.accent)}>
            {activeInTier}/{automations.length} ACTIVE
          </span>
        </div>
      </div>

      {automations.map((auto) => {
        const Icon = ICON_MAP[auto.icon]
        const isComingSoon = auto.badge === 'Coming Soon'
        return (
          <div key={auto.id} className="bg-surface-1 border border-white/10 rounded-xl px-5 py-4 flex items-center gap-4 card-hover">
            <button
              onClick={() => !isComingSoon && toggleAutomation(auto.id)}
              className={cn(
                'relative w-9 h-5 rounded-full transition-colors flex-shrink-0',
                isComingSoon ? 'bg-zinc-800 cursor-not-allowed opacity-50' : auto.active ? 'bg-primary' : 'bg-zinc-700'
              )}
            >
              <span className={cn(
                'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform',
                auto.active && !isComingSoon ? 'left-[18px]' : 'left-0.5'
              )} />
            </button>

            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', tier.bg)}>
              {Icon && <Icon size={16} className={tier.accent} />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn('text-sm font-medium', auto.active ? 'text-white' : 'text-zinc-500')}>{auto.title}</span>
                {auto.active && !isComingSoon && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />}
                {isComingSoon && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    COMING SOON
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{auto.description}</p>
              {auto.triggers > 0 && (
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(auto.triggers / maxTriggers) * 100}%`,
                        background: auto.active ? `rgb(${tier.barColor})` : '#3f3f46',
                      }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 w-16 text-right font-data">{auto.triggers} runs</span>
                </div>
              )}
            </div>

            {auto.lastTriggered && (
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Clock size={11} className="text-zinc-600" />
                <span className="font-mono text-[10px] text-zinc-500">{auto.lastTriggered}</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">Automations</h2>
          <p className="text-zinc-400 text-sm mt-0.5">8 AI services across 3 tiers — running 24/7, zero manual intervention.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 rounded-xl px-3 md:px-4 py-2 bg-primary/10 border border-primary/25">
            <Zap size={13} className="text-primary" />
            <span className="font-mono text-xs font-bold text-primary">{activeCount} ACTIVE</span>
          </div>
          <div className="rounded-xl px-3 md:px-4 py-2 bg-surface-1 border border-white/10">
            <span className="text-zinc-400 font-mono text-xs">{totalTriggers.toLocaleString()} triggers this month</span>
          </div>
        </div>
      </div>

      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-3" variants={staggerContainer} initial="initial" animate="animate">
        {[
          { label: 'Active Automations', value: activeCount.toString() },
          { label: 'Total Triggers',     value: totalTriggers.toLocaleString() },
          { label: 'Leads Captured',     value: analyticsKPIs.totalLeads.toLocaleString() },
          { label: 'Revenue Attributed', value: `$${Math.round(analyticsKPIs.totalRevenue / 1000)}k` },
        ].map((s) => (
          <motion.div key={s.label} variants={staggerItem} className="rounded-xl p-4 text-center bg-surface-1 border border-white/10 card-hover">
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

      {TIERS.map((tier, i) => (
        <motion.div
          key={tier.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.2 + i * 0.08 }}
        >
          <TierSection
            tier={tier}
            automations={automations.filter(a => a.tier === tier.key)}
            toggleAutomation={toggleAutomation}
            maxTriggers={maxTriggers}
          />
        </motion.div>
      ))}

      <div className="rounded-xl px-5 py-4 flex items-center gap-3 bg-surface-1 border border-white/10">
        <Activity size={16} className="text-primary" />
        <p className="text-zinc-400 text-sm">
          All automations run 24/7 without manual intervention.{' '}
          <span className="text-primary">{totalTriggers.toLocaleString()} actions taken this month</span> — organized into 3 tiers for maximum impact.
        </p>
      </div>
    </div>
  )
}
