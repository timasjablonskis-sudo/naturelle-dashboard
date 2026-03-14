import React from 'react'
import {
  LayoutDashboard, Users, MessageSquare, PhoneMissed,
  Instagram, Star, Calendar, Zap, BarChart2, Settings, Mail
} from 'lucide-react'

const navItems = [
  { id: 'dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'leads',         label: 'Leads',         icon: Users },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare },
  { id: 'missed',        label: 'Missed Calls',  icon: PhoneMissed },
  { id: 'instagram',     label: 'Instagram',     icon: Instagram },
  { id: 'email',         label: 'Email Followup', icon: Mail },
  { id: 'reviews',       label: 'Reviews',       icon: Star },
  { id: 'appointments',  label: 'Appointments',  icon: Calendar },
  { id: 'automations',   label: 'Automations',   icon: Zap },
  { id: 'analytics',     label: 'Analytics',     icon: BarChart2 },
  { id: 'settings',      label: 'Settings',      icon: Settings },
]

export default function Sidebar({ active, setActive }) {
  return (
    <div className="w-[220px] h-full bg-[#0F1613] border-r border-[#1E2B28] flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4 border-b border-[#1E2B28]">
        <div className="font-display text-3xl leading-none tracking-wide" style={{ color: 'var(--accent)' }}>INTU</div>
        <div className="text-[#4a6560] text-xs mt-0.5 font-mono">Med Spa</div>
        <div className="flex items-center gap-2 mt-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--accent)' }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--accent)' }} />
          </span>
          <span className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--accent)' }}>AI ACTIVE</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'text-[#0D1110]'
                  : 'text-[#6a8a85] hover:text-white hover:bg-[#1a2420]'
              }`}
              style={isActive ? { background: 'var(--accent)' } : {}}
            >
              <Icon size={16} className={isActive ? 'text-[#0D1110]' : 'text-[#3a5a55] group-hover:text-white'} />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-[#1E2B28]">
        <div className="text-[10px] font-mono text-[#3a5550] leading-relaxed">
          Powered by<br />
          <span style={{ color: 'var(--accent)' }}>AdScale Labs</span>
        </div>
      </div>
    </div>
  )
}
