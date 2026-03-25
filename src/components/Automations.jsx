import React, { useState } from 'react'
import { Zap, Activity, Clock, PhoneMissed, MessageSquare, Phone, Mail, Calendar, Star, Brain, Shield, RotateCcw, UserCheck, Mic } from 'lucide-react'
import { motion } from 'framer-motion'
import AutomationFlow from './AutomationFlow'
import { staggerContainer, staggerItem } from '../lib/motion'
import { cn } from '../lib/utils'
import { analyticsKPIs, BASE_STATS } from '../data/stats'

const ICON_MAP = { PhoneMissed, MessageSquare, Phone, Mail, Calendar, Clock, Zap, Star, Brain, Shield, RotateCcw, UserCheck, Mic }

// ─── CORE ENGINES (Always On) ────────────────────────────
const CORES = [
  {
    id: 'omni',
    name: 'The Omni-Channel Concierge',
    type: 'text',
    subtitle: 'Text-Based AI',
    description: 'Unified inbox — IG, FB, Website Chat, Email, SMS. Every text channel, one AI brain.',
    color: '#3b82f6',
    colorRgb: '59,130,246',
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/25',
    icon: 'MessageSquare',
    baseTriggers: 748,
    skills: [
      { name: 'Instant Lead Response', icon: 'Zap' },
      { name: 'Missed Call Text-Back', icon: 'PhoneMissed' },
      { name: 'AI Qualification Engine', icon: 'UserCheck' },
      { name: 'In-Conversation Booking', icon: 'Calendar' },
    ],
  },
  {
    id: 'voice',
    name: 'The Omni Voice Receptionist',
    type: 'voice',
    subtitle: 'Voice-Based AI',
    description: '24/7 phone handling — answers calls, qualifies leads, books appointments live.',
    color: '#8b5cf6',
    colorRgb: '139,92,246',
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/25',
    icon: 'Phone',
    baseTriggers: 132,
    skills: [
      { name: 'Voice Qualification', icon: 'Mic' },
      { name: 'In-Call Booking', icon: 'Calendar' },
      { name: 'Smart Hand-off', icon: 'Phone' },
    ],
  },
]

// ─── MODULAR ADD-ONS (Toggleable Logic Packs) ────────────
const INITIAL_ADDONS = [
  { id: 'reengagement',    name: 'Lead Re-engagement',         attachedTo: ['omni'],           baseTriggers: 84,  active: true, icon: 'Zap',          description: 'Monitors for ghosted leads — auto-triggers follow-up sequences to restart booking conversations' },
  { id: 'noshow',          name: 'No-Show Recovery',           attachedTo: ['omni', 'voice'],  baseTriggers: 47,  active: true, icon: 'PhoneMissed',  description: 'CRM trigger on no-show status — instant SMS or voice outreach to reschedule' },
  { id: 'reminders',       name: 'Smart Reminder Suite',       attachedTo: ['omni', 'voice'],  baseTriggers: 203, active: true, icon: 'Calendar',     description: '"Confirmation Required" logic — alerts staff if no confirmation within X hours' },
  { id: 'reactivation',    name: 'Database Reactivation',      attachedTo: ['omni', 'voice'],  baseTriggers: 12,  active: true, icon: 'RotateCcw',    description: 'Campaign mode across text or voice — re-engages patients inactive 90+ days' },
  { id: 'treatment-cycle', name: 'Treatment Cycle Automation', attachedTo: ['omni'],           baseTriggers: 94,  active: true, icon: 'Clock',        description: 'The "Botox Clock" — auto-recall at 4-week, 3-month, and 6-month intervals' },
  { id: 'review-gen',      name: 'Review Generation',          attachedTo: ['omni'],           baseTriggers: 156, active: true, icon: 'Star',         description: 'Post-appointment SMS triggers for Google/Yelp reviews' },
]

// ─── STANDALONE SYSTEM ───────────────────────────────────
const STANDALONE = {
  id: 'reputation',
  name: 'The Reputation Response Engine',
  color: '#f59e0b',
  colorRgb: '245,158,11',
  accent: 'text-amber-400',
  bg: 'bg-amber-500/10',
  border: 'border-amber-500/25',
  icon: 'Shield',
  baseTriggers: 156,
  subFeatures: [
    { label: 'Positive Filter', detail: '4-5★ reviews → auto thank-you response optimized for SEO', accent: 'text-emerald-400' },
    { label: 'Negative Shield', detail: '<3★ reviews → professional holding response + instant owner SMS alert', accent: 'text-red-400' },
  ],
}

// ─── CORE ENGINE SECTION ─────────────────────────────────
function CoreSection({ core, triggers }) {
  const Icon = ICON_MAP[core.icon]
  return (
    <div className={cn('rounded-xl p-5 border', core.border)} style={{ background: `rgba(${core.colorRgb},0.04)` }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', core.bg)}>
            {Icon && <Icon size={20} className={core.accent} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={cn('font-semibold text-base tracking-tight', core.accent)}>{core.name}</h3>
            </div>
            <p className="text-zinc-500 text-xs mt-0.5">{core.description}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={cn('font-mono text-[9px] px-2 py-0.5 rounded-full border font-bold', core.bg, core.border, core.accent)}>
            {core.subtitle.toUpperCase()}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[9px] text-emerald-400 font-bold">ALWAYS ON</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[10px] text-zinc-500">NATIVE SKILLS</span>
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="font-mono text-[10px] text-zinc-500">{triggers.toLocaleString()} triggers</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {core.skills.map((skill) => {
          const SkillIcon = ICON_MAP[skill.icon]
          return (
            <div key={skill.name} className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2">
              {SkillIcon && <SkillIcon size={13} className={core.accent} />}
              <span className="text-zinc-300 text-xs font-medium">{skill.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── ADD-ON ROW ──────────────────────────────────────────
function AddonRow({ addon, toggleAddon, maxTriggers }) {
  const Icon = ICON_MAP[addon.icon]
  const coreColors = {
    omni: { dot: 'bg-blue-400', label: 'text-blue-400', name: 'Text' },
    voice: { dot: 'bg-violet-400', label: 'text-violet-400', name: 'Voice' },
  }
  return (
    <div className="bg-surface-1 border border-white/10 rounded-xl px-5 py-4 flex items-center gap-4 card-hover">
      <button
        onClick={() => toggleAddon(addon.id)}
        className={cn(
          'relative w-9 h-5 rounded-full transition-colors flex-shrink-0',
          addon.active ? 'bg-primary' : 'bg-zinc-700'
        )}
      >
        <span className={cn(
          'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform',
          addon.active ? 'left-[18px]' : 'left-0.5'
        )} />
      </button>

      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', addon.active ? 'bg-primary/10' : 'bg-zinc-800')}>
        {Icon && <Icon size={16} className={addon.active ? 'text-primary' : 'text-zinc-600'} />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn('text-sm font-medium', addon.active ? 'text-white' : 'text-zinc-500')}>{addon.name}</span>
          {addon.active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />}
        </div>
        <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{addon.description}</p>
        {addon.baseTriggers > 0 && (
          <div className="mt-1.5 flex items-center gap-3">
            <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(addon.baseTriggers / maxTriggers) * 100}%`,
                  background: addon.active ? '#059669' : '#3f3f46',
                }}
              />
            </div>
            <span className="font-mono text-[10px] text-zinc-500 w-16 text-right font-data">{addon.baseTriggers} runs</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        {addon.attachedTo.map((coreId) => (
          <span key={coreId} className="flex items-center gap-1">
            <span className={cn('w-1.5 h-1.5 rounded-full', coreColors[coreId].dot)} />
            <span className={cn('font-mono text-[9px]', coreColors[coreId].label)}>{coreColors[coreId].name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── STANDALONE SECTION ──────────────────────────────────
function StandaloneSection({ data }) {
  const Icon = ICON_MAP[data.icon]
  return (
    <div className={cn('rounded-xl p-5 border', data.border)} style={{ background: `rgba(${data.colorRgb},0.04)` }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', data.bg)}>
            {Icon && <Icon size={20} className={data.accent} />}
          </div>
          <div>
            <h3 className={cn('font-semibold text-base tracking-tight', data.accent)}>{data.name}</h3>
            <p className="text-zinc-500 text-xs mt-0.5">Independent watchdog — monitors and responds to all Google reviews 24/7</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={cn('font-mono text-[9px] px-2 py-0.5 rounded-full border font-bold', data.bg, data.border, data.accent)}>
            STANDALONE
          </span>
          <span className="font-mono text-[10px] text-zinc-500">{data.baseTriggers} reviews processed</span>
        </div>
      </div>

      <div className="space-y-2">
        {data.subFeatures.map((feat) => (
          <div key={feat.label} className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3">
            <span className={cn('font-mono text-[10px] font-bold mt-0.5 flex-shrink-0 w-28', feat.accent)}>{feat.label}</span>
            <span className="text-zinc-400 text-xs">{feat.detail}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────
export default function Automations({ simStats, simStarted }) {
  const [addons, setAddons] = useState(INITIAL_ADDONS)

  // Compute live trigger deltas from simulation
  const simDelta = simStats ? {
    leads: simStats.leads - BASE_STATS.leads,
    missed: simStats.missed - BASE_STATS.missed,
    instagram: simStats.instagram - BASE_STATS.instagram,
  } : { leads: 0, missed: 0, instagram: 0 }

  const omniTriggers = CORES[0].baseTriggers + simDelta.leads + simDelta.instagram
  const voiceTriggers = CORES[1].baseTriggers

  const activeAddonCount = addons.filter(a => a.active).length
  const totalAddonTriggers = addons.reduce((a, b) => a + b.baseTriggers, 0)
  const totalTriggers = omniTriggers + voiceTriggers + totalAddonTriggers + STANDALONE.baseTriggers
  const activeCount = 2 + activeAddonCount + 1 // 2 cores + active add-ons + 1 standalone
  const maxAddonTriggers = Math.max(...addons.map(a => a.baseTriggers))

  const toggleAddon = (id) => {
    setAddons((prev) => prev.map((a) => a.id === id ? { ...a, active: !a.active } : a))
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">Automations</h2>
          <p className="text-zinc-400 text-sm mt-0.5">2 Core Engines + 6 Add-On Modules + 1 Standalone System — running 24/7.</p>
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

      {/* KPI Row */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-3" variants={staggerContainer} initial="initial" animate="animate">
        {[
          { label: 'Active Systems', value: activeCount.toString() },
          { label: 'Total Triggers', value: totalTriggers.toLocaleString() },
          { label: 'Leads Captured', value: analyticsKPIs.totalLeads.toLocaleString() },
          { label: 'Revenue Attributed', value: `$${Math.round(analyticsKPIs.totalRevenue / 1000)}k` },
        ].map((s) => (
          <motion.div key={s.label} variants={staggerItem} className="rounded-xl p-4 text-center bg-surface-1 border border-white/10 card-hover">
            <div className="font-data text-3xl font-semibold text-white">{s.value}</div>
            <div className="text-zinc-500 font-mono text-[10px] mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Automation Network Diagram */}
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

      {/* Core Engine A */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[10px] text-blue-400 tracking-wider">CORE ENGINE A</span>
          <div className="flex-1 h-px bg-blue-500/15" />
        </div>
        <CoreSection core={CORES[0]} triggers={omniTriggers} />
      </motion.div>

      {/* Core Engine B */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.28 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[10px] text-violet-400 tracking-wider">CORE ENGINE B</span>
          <div className="flex-1 h-px bg-violet-500/15" />
        </div>
        <CoreSection core={CORES[1]} triggers={voiceTriggers} />
      </motion.div>

      {/* Modular Add-Ons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.36 }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-primary tracking-wider">MODULAR ADD-ONS</span>
            <div className="flex-1 h-px bg-primary/15" />
          </div>
          <span className="font-mono text-[10px] text-zinc-500">{activeAddonCount}/{addons.length} ACTIVE</span>
        </div>
        <div className="space-y-2">
          {addons.map((addon) => (
            <AddonRow
              key={addon.id}
              addon={addon}
              toggleAddon={toggleAddon}
              maxTriggers={maxAddonTriggers}
            />
          ))}
        </div>
      </motion.div>

      {/* Standalone: Reputation Engine */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.44 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[10px] text-amber-400 tracking-wider">STANDALONE SYSTEM</span>
          <div className="flex-1 h-px bg-amber-500/15" />
        </div>
        <StandaloneSection data={STANDALONE} />
      </motion.div>

      {/* Footer */}
      <div className="rounded-xl px-5 py-4 flex items-center gap-3 bg-surface-1 border border-white/10">
        <Activity size={16} className="text-primary" />
        <p className="text-zinc-400 text-sm">
          All systems run 24/7 without manual intervention.{' '}
          <span className="text-primary">{totalTriggers.toLocaleString()} actions taken this month</span> — 2 Core Engines + 6 Add-Ons + 1 Standalone.
        </p>
      </div>
    </div>
  )
}
