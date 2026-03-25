import React, { useState } from 'react'
import { Users, X, Phone, Mail, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { staggerContainer, staggerItem, hoverScale } from '../lib/motion'
import { LEADS } from '../data/leads'
import { totalLeads, sourceBreakdown } from '../data/stats'

const allLeads = LEADS

const statusStyle = {
  'Consultation Booked':    'bg-primary/10 text-emerald-400 border-primary/30',
  'Follow-up Sent':         'bg-amber-500/10 text-amber-400 border-amber-500/30',
  'Interested':             'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  'Contacted':              'bg-zinc-700/40 text-zinc-400 border-zinc-600',
  'Consultation Scheduled': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
}

const sourceStyle = {
  'Website Chat': 'bg-purple-500/10 text-purple-400',
  'Instagram DM': 'bg-pink-500/10 text-pink-400',
  'Missed Call':  'bg-amber-500/10 text-amber-400',
  'Website Form': 'bg-emerald-500/10 text-emerald-400',
}

const filters = ['All', 'Website', 'Instagram', 'Missed Call']
const springTransition = { type: 'spring', stiffness: 300, damping: 30 }

function LeadDetailPanel({ lead, onClose }) {
  return (
    <AnimatePresence>
      {lead && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/50"
          />
          <motion.div
            key="panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={springTransition}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[400px] z-50 bg-background/95 border-l border-white/10 backdrop-blur-xl flex flex-col"
          >
            <div className="px-6 pt-6 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-primary tracking-widest">LEAD PROFILE</span>
                <button onClick={onClose} className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 cursor-pointer">
                  <X size={14} className="text-zinc-400" />
                </button>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-primary/12 border border-primary/30 flex items-center justify-center text-xl font-semibold text-primary">
                  {lead.name[0]}
                </div>
                <div>
                  <h2 className="font-semibold text-xl text-white tracking-tight">{lead.name}</h2>
                  <p className="font-mono text-[11px] text-zinc-500 mt-0.5">{lead.service}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="mb-6">
                <p className="font-mono text-[9px] text-zinc-600 tracking-wider mb-2">STATUS</p>
                <span className={cn('text-[10px] font-mono px-3 py-1 rounded-full border', statusStyle[lead.status])}>{lead.status}</span>
              </div>

              <div className="flex flex-col gap-3.5 mb-6">
                {[
                  { icon: Phone, label: 'Phone', value: lead.phone || '—' },
                  { icon: Mail,  label: 'Email', value: lead.email || '—' },
                  { icon: Users, label: 'Source', value: lead.source },
                  { icon: Clock, label: 'Date', value: lead.date },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/[0.06] border border-primary/[0.12] flex items-center justify-center">
                      <Icon size={14} className="text-primary/70" />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-zinc-600 tracking-wider">{label}</p>
                      <p className="text-[13px] text-zinc-200 mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="font-mono text-[9px] text-zinc-600 tracking-wider mb-3">ACTIVITY TIMELINE</p>
                {[
                  { label: 'Lead captured by AI', time: lead.date, dot: 'bg-primary' },
                  { label: 'AI sent instant follow-up', time: '< 1 min later', dot: 'bg-amber-400' },
                  { label: lead.status, time: '3 min later', dot: 'bg-emerald-400' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 mb-4">
                    <div className="flex flex-col items-center">
                      <div className={cn('w-2 h-2 rounded-full mt-1', item.dot)} />
                      {i < 2 && <div className="w-px flex-1 bg-white/[0.06] mt-1" />}
                    </div>
                    <div>
                      <p className="text-xs text-zinc-300">{item.label}</p>
                      <p className="font-mono text-[10px] text-zinc-600 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Leads({ simStarted = false, simLeads = [] }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedLead, setSelectedLead] = useState(null)

  const baseLeads = [...simLeads, ...allLeads]
  const filtered = activeFilter === 'All'
    ? baseLeads
    : baseLeads.filter((l) => {
        if (activeFilter === 'Website')   return l.source.startsWith('Website')
        if (activeFilter === 'Instagram') return l.source.includes('Instagram')
        if (activeFilter === 'Missed Call') return l.source === 'Missed Call'
        return true
      })

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">Lead Management</h2>
          <p className="text-zinc-500 text-sm mt-0.5">All leads captured by AI across every channel.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl px-4 py-2 bg-primary/10 border border-primary/25">
          <Users size={13} className="text-primary" />
          <span className="text-primary font-mono text-xs font-bold">{simLeads.length + allLeads.length} LEADS TODAY</span>
        </div>
      </div>

      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-3" variants={staggerContainer} initial="initial" animate="animate">
        {[
          { label: 'Total Leads Today', value: (simLeads.length + allLeads.length).toString() },
          { label: 'Website Chat',      value: sourceBreakdown['Website Chat'].toString() },
          { label: 'Instagram DM',      value: sourceBreakdown['Instagram DM'].toString() },
          { label: 'Missed Calls',      value: sourceBreakdown['Missed Call'].toString() },
        ].map((s) => (
          <motion.div key={s.label} variants={staggerItem} className="rounded-xl p-4 text-center bg-surface-1 border border-white/10">
            <div className="text-primary font-data text-3xl font-semibold">{s.value}</div>
            <div className="text-zinc-500 font-mono text-[10px] mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex items-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              'px-4 py-1.5 rounded-lg font-mono text-xs transition-all',
              activeFilter === f
                ? 'bg-primary text-white font-bold'
                : 'text-zinc-500 border border-white/10 hover:border-white/20 bg-white/[0.02]'
            )}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-zinc-500 font-mono text-xs">{filtered.length} leads</span>
      </div>

      <div className="rounded-xl overflow-hidden bg-surface-1 border border-white/10 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['Name', 'Service', 'Source', 'Status', 'Date', ''].map((h) => (
                <th key={h} className={cn("px-4 py-3 text-left text-zinc-500 font-mono text-[10px] uppercase tracking-wider", (h === 'Source' || h === 'Date') && 'hidden md:table-cell')}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {filtered.map((lead, i) => {
                const isNew = simLeads.includes(lead)
                return (
                  <motion.tr
                    key={lead.name + i}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ ...springTransition, delay: i * 0.03 }}
                    onClick={() => setSelectedLead(lead)}
                    className="border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold bg-primary/10 border border-primary/20 text-primary">
                          {lead.name[0]}
                        </div>
                        <span className="text-white text-sm font-medium">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-zinc-300 text-sm">{lead.service}</span></td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={cn('text-xs font-mono px-2 py-0.5 rounded-full', sourceStyle[lead.source] || 'bg-zinc-800 text-zinc-400')}>
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={cn('text-[10px] font-mono px-2 py-0.5 rounded-full border', statusStyle[lead.status])}>
                          {lead.status}
                        </span>
                        {isNew && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded animate-pulse bg-primary/10 text-primary border border-primary/30">
                            NEW
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell"><span className="text-zinc-500 font-mono text-xs">{lead.date}</span></td>
                    <td className="px-4 py-3">
                      <span className="text-primary font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                    </td>
                  </motion.tr>
                )
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <LeadDetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  )
}
