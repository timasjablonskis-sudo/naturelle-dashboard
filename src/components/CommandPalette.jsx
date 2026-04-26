import React, { useEffect, useState, useCallback } from 'react'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, MessageSquare, PhoneMissed,
  Instagram, Zap, BarChart2, Mail, Star, Calendar, Search,
  Phone, PauseCircle, Scan, TrendingDown, CreditCard
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard',     label: 'Dashboard',      Icon: LayoutDashboard },
  { id: 'revenue',       label: 'Revenue Gap',    Icon: TrendingDown },
  { id: 'leads',         label: 'Leads',           Icon: Users },
  { id: 'conversations', label: 'Conversations',   Icon: MessageSquare },
  { id: 'missed',        label: 'Missed Calls',    Icon: PhoneMissed },
  { id: 'instagram',     label: 'Instagram DMs',   Icon: Instagram },
  { id: 'email',         label: 'Email Follow-Up', Icon: Mail },
  { id: 'reviews',       label: 'Reviews',         Icon: Star },
  { id: 'appointments',  label: 'Appointments',    Icon: Calendar },
  { id: 'automations',   label: 'Automations',     Icon: Zap },
  { id: 'analytics',     label: 'Analytics',       Icon: BarChart2 },
  { id: 'plans',         label: 'Plans',           Icon: CreditCard },
]

export default function CommandPalette({ setActive, addToast }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const navigate = useCallback((id) => {
    setActive(id)
    setOpen(false)
  }, [setActive])

  const quickAction = useCallback((action) => {
    setOpen(false)
    if (action === 'call') {
      addToast?.({ type: 'booked', title: 'AI Call Initiated', body: 'Calling next uncontacted lead — Sarah M. via AI voice agent...' })
    } else if (action === 'audit') {
      addToast?.({ type: 'review', title: 'Lead Audit Started', body: 'Scanning all leads for engagement gaps and follow-up opportunities...' })
      setActive('leads')
    } else if (action === 'pause') {
      addToast?.({ type: 'missed', title: 'Automations Paused', body: 'All 8 automations paused across 3 tiers. Resume anytime from the Automations panel.' })
    }
  }, [addToast, setActive])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-[18%] left-1/2 -translate-x-1/2 z-[101] w-[580px]"
          >
            <Command className="bg-surface-1 border border-white/10 rounded-xl shadow-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(5,150,105,0.08), 0 25px 50px rgba(0,0,0,0.5)' }}>
              <div className="flex items-center gap-3 px-4 border-b border-white/[0.06]">
                <Search size={16} className="text-zinc-500 flex-shrink-0" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="w-full py-3.5 bg-transparent text-white text-sm outline-none placeholder:text-zinc-500 font-sans"
                  autoFocus
                />
                <kbd className="text-[10px] font-mono text-zinc-600 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 flex-shrink-0">ESC</kbd>
              </div>
              <Command.List className="max-h-[380px] overflow-y-auto p-2">
                <Command.Empty className="px-4 py-8 text-center text-zinc-500 text-sm">
                  No results found.
                </Command.Empty>

                {/* Quick Actions */}
                <Command.Group heading="Quick Actions" className="[&_[cmdk-group-heading]]:text-primary [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
                  <Command.Item
                    value="Call Lead via AI"
                    onSelect={() => quickAction('call')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 cursor-pointer data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors"
                  >
                    <Phone size={16} className="text-emerald-400" />
                    <span className="flex-1">Call Lead via AI</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">VOICE</span>
                  </Command.Item>
                  <Command.Item
                    value="Audit All Leads"
                    onSelect={() => quickAction('audit')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 cursor-pointer data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors"
                  >
                    <Scan size={16} className="text-primary" />
                    <span className="flex-1">Audit All Leads</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">SCAN</span>
                  </Command.Item>
                  <Command.Item
                    value="Pause Automations"
                    onSelect={() => quickAction('pause')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 cursor-pointer data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors"
                  >
                    <PauseCircle size={16} className="text-amber-400" />
                    <span className="flex-1">Pause All Automations</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">PAUSE</span>
                  </Command.Item>
                </Command.Group>

                {/* Navigation */}
                <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:text-zinc-600 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
                  {NAV_ITEMS.map(({ id, label, Icon }) => (
                    <Command.Item
                      key={id}
                      value={label}
                      onSelect={() => navigate(id)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 cursor-pointer data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors"
                    >
                      <Icon size={16} className="text-zinc-500" />
                      {label}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function openCommandPalette() {
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
}
