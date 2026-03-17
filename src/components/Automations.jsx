import React, { useState } from 'react'
import { Zap, PhoneMissed, Instagram, Globe, Star, Calendar, Mail, ToggleLeft, ToggleRight, Clock, Activity, MessageSquare } from 'lucide-react'

const initialAutomations = [
  {
    id: 1,
    title: 'Missed Call Text-Back',
    description: 'Texts patient within 8 seconds of a missed call with service info and a booking link.',
    icon: PhoneMissed,
    color: '#C9A87C',
    triggers: 247,
    lastTriggered: '4 minutes ago',
    active: true,
    tag: 'SMS',
  },
  {
    id: 2,
    title: 'Instagram Auto-Reply',
    description: 'Responds to Instagram DMs 24/7 with personalized service info and books consultations.',
    icon: Instagram,
    color: '#D4907A',
    triggers: 189,
    lastTriggered: '2 minutes ago',
    active: true,
    tag: 'Instagram',
  },
  {
    id: 3,
    title: 'Website Chat AI',
    description: 'Answers questions, provides pricing, and books consultations directly from the website chat.',
    icon: Globe,
    color: '#c4688a',
    triggers: 312,
    lastTriggered: '1 minute ago',
    active: true,
    tag: 'Website',
  },
  {
    id: 4,
    title: 'Email Lead Follow-Up',
    description: 'Sends a personalized follow-up email to every new lead within 60 seconds. Includes service info, pricing, and a booking link.',
    icon: Mail,
    color: '#a78bfa',
    triggers: 284,
    lastTriggered: '6 minutes ago',
    active: true,
    tag: 'Email',
  },
  {
    id: 5,
    title: 'Post-Visit Review Request',
    description: 'Automatically texts a Google review link 2 hours after each completed appointment.',
    icon: Star,
    color: '#f59e0b',
    triggers: 156,
    lastTriggered: '3 hours ago',
    active: true,
    tag: 'SMS',
  },

  {
    id: 7,
    title: 'Appointment Reminder',
    description: 'Sends automated reminders 24h and 1h before each appointment to reduce no-shows.',
    icon: Calendar,
    color: '#c4688a',
    triggers: 203,
    lastTriggered: '12 minutes ago',
    active: true,
    tag: 'SMS',
  },
  {
    id: 9,
    title: 'SMS Abandonment Recovery',
    description: '3-touch sequence fires when a lead visits but doesn\'t book. Recovers 10–18% of abandoned leads automatically.',
    icon: MessageSquare,
    color: '#4ade80',
    triggers: 14,
    lastTriggered: '22 minutes ago',
    active: true,
    tag: 'SMS',
    stat: '14 leads recovered this month',
  },
  {
    id: 8,
    title: 'Monthly Email Newsletter',
    description: 'Sends a branded email to all patients highlighting promotions, new services, and seasonal offers.',
    icon: Mail,
    color: '#D4907A',
    triggers: 12,
    lastTriggered: '18 days ago',
    active: true,
    tag: 'Email',
  },
]

const tagColor = {
  SMS:          'bg-[#C9A87C]/10 text-[#C9A87C]',
  Instagram:    'bg-[#D4907A]/10 text-[#D4907A]',
  Website:      'bg-[#c4688a]/10 text-[#c4688a]',
  Email:        'bg-purple-500/10 text-purple-400',
  'Email + SMS':'bg-green-500/10 text-green-400',
}

export default function Automations() {
  const [automations, setAutomations] = useState(initialAutomations)

  const toggle = (id) =>
    setAutomations((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)))

  const totalTriggers = automations.reduce((a, b) => a + b.triggers, 0)
  const activeCount   = automations.filter((a) => a.active).length

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl text-white tracking-wide">Automations</h2>
          <p className="text-[#6a8a85] text-sm mt-0.5">Every rule running in the background for Wishful Beauty Med Spa.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl px-4 py-2 border"
            style={{ background: 'rgba(196,104,138,0.08)', borderColor: 'rgba(196,104,138,0.25)' }}>
            <Zap size={13} style={{ color: 'var(--accent)' }} />
            <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent)' }}>{activeCount} ACTIVE</span>
          </div>
          <div className="bg-[#131918] border border-[#1E2B28] rounded-xl px-4 py-2">
            <span className="text-[#6a8a85] font-mono text-xs">{totalTriggers.toLocaleString()} triggers this month</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Active Automations', value: activeCount.toString() },
          { label: 'Total Triggers',     value: totalTriggers.toLocaleString() },
          { label: 'Leads Captured',     value: '847' },
          { label: 'Revenue Attributed', value: '$89k' },
        ].map((s) => (
          <div key={s.label} className="bg-[#131918] border border-[#1E2B28] rounded-xl p-4 text-center">
            <div className="font-display text-3xl text-white">{s.value}</div>
            <div className="text-[#4a6560] font-mono text-[10px] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">
        {automations.map((auto) => {
          const Icon = auto.icon
          return (
            <div
              key={auto.id}
              className={`bg-[#131918] border rounded-xl p-5 transition-all duration-200 ${
                auto.active ? 'border-[#1E2B28] hover:border-[#2a3a36]' : 'border-[#1a2420] opacity-50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: auto.color + '18' }}>
                    <Icon size={18} style={{ color: auto.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-semibold text-sm">{auto.title}</h3>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${tagColor[auto.tag] || ''}`}>
                        {auto.tag}
                      </span>
                    </div>
                    <p className="text-[#6a8a85] text-xs mt-1 leading-relaxed">{auto.description}</p>
                  </div>
                </div>
                <button onClick={() => toggle(auto.id)} className="flex-shrink-0 ml-3 transition-colors">
                  {auto.active
                    ? <ToggleRight size={28} style={{ color: auto.color }} />
                    : <ToggleLeft size={28} className="text-[#333]" />}
                </button>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#1a2420]">
                <div>
                  <div className="text-white font-display text-xl">{auto.triggers}</div>
                  <div className="text-[#3a5550] font-mono text-[9px]">triggers this month</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1.5">
                    {auto.active ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: auto.color }} />
                        <span className="font-mono text-[10px]" style={{ color: auto.color }}>ACTIVE</span>
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#444]" />
                        <span className="font-mono text-[10px] text-[#444]">PAUSED</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock size={9} className="text-[#3a5550]" />
                    <span className="text-[#3a5550] font-mono text-[9px]">{auto.lastTriggered}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-[#131918] border border-[#1E2B28] rounded-xl px-5 py-4 flex items-center gap-3">
        <Activity size={16} style={{ color: 'var(--accent)' }} />
        <p className="text-[#6a8a85] text-sm">
          All automations run 24/7 without manual intervention.{' '}
          <span style={{ color: 'var(--accent)' }}>1,497 actions taken this month</span> — saving the team an estimated 100+ hours.
        </p>
      </div>
    </div>
  )
}
