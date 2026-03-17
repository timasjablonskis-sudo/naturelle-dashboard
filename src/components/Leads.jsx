import React, { useState } from 'react'
import { Users, X, Phone, Mail, Calendar, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const allLeads = [
  { name: 'Emily R.',    service: 'Botox',            source: 'Website Chat', status: 'Consultation Booked',    date: 'Today 2:30pm',   phone: '(312) 555-0182', email: 'emily.r@email.com' },
  { name: 'Jessica M.',  service: 'Lip Filler',        source: 'Instagram DM', status: 'Follow-up Sent',         date: 'Today 1:15pm',   phone: '(773) 555-0241', email: 'jess.m@email.com' },
  { name: 'Sarah L.',    service: 'GLP-1 Weight Loss', source: 'Missed Call',  status: 'Interested',             date: 'Today 12:40pm',  phone: '(847) 555-0374', email: 'sarah.l@email.com' },
  { name: 'Anna T.',     service: 'IV Therapy',        source: 'Website Form', status: 'Consultation Scheduled', date: 'Today 11:20am',  phone: '(630) 555-0198', email: 'anna.t@email.com' },
  { name: 'Michael B.',  service: 'HydraFacial',       source: 'Instagram DM', status: 'Consultation Booked',    date: 'Today 10:05am',  phone: '(312) 555-0527', email: 'mike.b@email.com' },
  { name: 'Rachel K.',   service: 'Botox',             source: 'Website Chat', status: 'Contacted',              date: 'Yesterday',      phone: '(773) 555-0639', email: 'rachel.k@email.com' },
  { name: 'David W.',    service: 'Microneedling',     source: 'Missed Call',  status: 'Follow-up Sent',         date: 'Yesterday',      phone: '(847) 555-0712', email: 'david.w@email.com' },
  { name: 'Lisa P.',     service: 'Fillers',           source: 'Instagram DM', status: 'Consultation Booked',    date: 'Yesterday',      phone: '(630) 555-0845', email: 'lisa.p@email.com' },
  { name: 'James T.',    service: 'Weight Loss',       source: 'Website Chat', status: 'Interested',             date: 'Yesterday',      phone: '(312) 555-0956', email: 'james.t@email.com' },
  { name: 'Maria C.',    service: 'PRP',               source: 'Missed Call',  status: 'Consultation Booked',    date: '2 days ago',     phone: '(773) 555-0107', email: 'maria.c@email.com' },
]

const statusStyle = {
  'Consultation Booked':    'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30',
  'Follow-up Sent':         'bg-[#c4688a]/10 text-[#c4688a] border-[#c4688a]/30',
  'Interested':             'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  'Contacted':              'bg-[#333]/60 text-[#888] border-[#444]',
  'Consultation Scheduled': 'bg-green-500/10 text-green-400 border-green-500/30',
}

const sourceStyle = {
  'Website Chat': 'bg-purple-500/10 text-purple-400',
  'Instagram DM': 'bg-pink-500/10 text-pink-400',
  'Missed Call':  'bg-[#D4AF37]/10 text-[#D4AF37]',
  'Website Form': 'bg-[#c4688a]/10 text-[#c4688a]',
}

const filters = ['All', 'Website', 'Instagram', 'SMS']
const springTransition = { type: 'spring', stiffness: 300, damping: 30 }

function LeadDetailPanel({ lead, onClose }) {
  return (
    <AnimatePresence>
      {lead && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              background: 'rgba(0,0,0,0.4)',
            }}
          />
          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={springTransition}
            style={{
              position: 'fixed', right: 0, top: 0, bottom: 0,
              width: 400, zIndex: 50,
              background: 'rgba(8,8,8,0.95)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#D4AF37', letterSpacing: '0.1em' }}>LEAD PROFILE</span>
                <button
                  onClick={onClose}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '4px 8px', cursor: 'pointer' }}
                >
                  <X size={14} color="rgba(255,255,255,0.6)" />
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'rgba(212,175,55,0.12)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 600, color: '#D4AF37',
                }}>
                  {lead.name[0]}
                </div>
                <div>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#fff', margin: 0 }}>{lead.name}</h2>
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>{lead.service}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
              {/* Status */}
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', marginBottom: 8 }}>STATUS</p>
                <span className={`text-[10px] font-mono px-3 py-1 rounded-full border ${statusStyle[lead.status]}`}>{lead.status}</span>
              </div>

              {/* Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                {[
                  { icon: Phone, label: 'Phone', value: lead.phone || '—' },
                  { icon: Mail,  label: 'Email', value: lead.email || '—' },
                  { icon: Users, label: 'Source', value: lead.source },
                  { icon: Clock, label: 'Date', value: lead.date },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={14} color="rgba(212,175,55,0.7)" />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', margin: 0 }}>{label}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: '2px 0 0' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', marginBottom: 12 }}>ACTIVITY TIMELINE</p>
                {[
                  { label: 'Lead captured by AI', time: lead.date, dot: '#D4AF37' },
                  { label: 'AI sent instant follow-up', time: lead.date, dot: '#c4688a' },
                  { label: lead.status, time: lead.date, dot: '#4ade80' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.dot, marginTop: 4 }} />
                      {i < 2 && <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.06)', marginTop: 4 }} />}
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.75)', margin: 0 }}>{item.label}</p>
                      <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: '2px 0 0' }}>{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer action */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button style={{
                width: '100%', padding: '12px', borderRadius: 12,
                background: '#D4AF37', color: '#050505',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
                border: 'none', cursor: 'pointer',
                boxShadow: '0 0 20px rgba(212,175,55,0.25)',
              }}>
                <Calendar size={14} style={{ display: 'inline', marginRight: 8 }} />
                Book Consultation
              </button>
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
        if (activeFilter === 'SMS')       return l.source === 'Missed Call'
        return true
      })

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl text-white">Lead Management</h2>
          <p className="text-[#4a6560] text-sm mt-0.5">All leads captured by AI across every channel.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl px-4 py-2 glass"
            style={{ borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.06)' }}>
            <Users size={13} style={{ color: '#D4AF37' }} />
            <span style={{ color: '#D4AF37' }} className="font-mono text-xs font-bold">{simLeads.length + allLeads.length} LEADS TODAY</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Leads Today', value: (simLeads.length + allLeads.length).toString() },
          { label: 'Website Chat',      value: '18' },
          { label: 'Instagram DM',      value: '14' },
          { label: 'Missed Calls',      value: '10' },
        ].map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: idx * 0.05 }}
            className="rounded-xl p-4 text-center glass"
          >
            <div style={{ color: '#D4AF37' }} className="font-data text-3xl font-semibold">{s.value}</div>
            <div className="text-[#4a6560] font-mono text-[10px] mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filter buttons */}
      <div className="flex items-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-lg font-mono text-xs transition-all ${
              activeFilter === f
                ? 'text-[#050505] font-bold'
                : 'text-[#888] border border-[#333] hover:border-[#555]'
            }`}
            style={activeFilter === f ? { background: '#D4AF37' } : { background: 'rgba(255,255,255,0.02)' }}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-[#4a6560] font-mono text-xs">{filtered.length} leads</span>
      </div>

      {/* Lead cards */}
      <div className="rounded-xl overflow-hidden glass">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Name', 'Service', 'Source', 'Status', 'Date', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[#4a6560] font-mono text-[10px] uppercase tracking-wider">
                  {h}
                </th>
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
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                          style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}>
                          {lead.name[0]}
                        </div>
                        <span className="text-white text-sm font-medium">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[#cccccc] text-sm">{lead.service}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${sourceStyle[lead.source] || 'bg-[#222] text-[#888]'}`}>
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${statusStyle[lead.status]}`}>
                          {lead.status}
                        </span>
                        {isNew && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded animate-pulse"
                            style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)' }}>
                            ✦ NEW
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[#4a6560] font-mono text-xs">{lead.date}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[#4a6560] font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#D4AF37' }}>
                        View →
                      </span>
                    </td>
                  </motion.tr>
                )
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Lead detail panel */}
      <LeadDetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  )
}
