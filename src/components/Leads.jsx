import React, { useState } from 'react'
import { Users, ExternalLink, ChevronDown } from 'lucide-react'

const allLeads = [
  { name: 'Emily R.', service: 'Botox', source: 'Website Chat', status: 'Consultation Booked', date: 'Today 2:30pm' },
  { name: 'Jessica M.', service: 'Lip Filler', source: 'Instagram DM', status: 'Follow-up Sent', date: 'Today 1:15pm' },
  { name: 'Sarah L.', service: 'GLP-1 Weight Loss', source: 'Missed Call', status: 'Interested', date: 'Today 12:40pm' },
  { name: 'Anna T.', service: 'IV Therapy', source: 'Website Form', status: 'Consultation Scheduled', date: 'Today 11:20am' },
  { name: 'Michael B.', service: 'HydraFacial', source: 'Instagram DM', status: 'Consultation Booked', date: 'Today 10:05am' },
  { name: 'Rachel K.', service: 'Botox', source: 'Website Chat', status: 'Contacted', date: 'Yesterday' },
  { name: 'David W.', service: 'Microneedling', source: 'Missed Call', status: 'Follow-up Sent', date: 'Yesterday' },
  { name: 'Lisa P.', service: 'Fillers', source: 'Instagram DM', status: 'Consultation Booked', date: 'Yesterday' },
  { name: 'James T.', service: 'Weight Loss', source: 'Website Chat', status: 'Interested', date: 'Yesterday' },
  { name: 'Maria C.', service: 'PRP', source: 'Missed Call', status: 'Consultation Booked', date: '2 days ago' },
]

const statusStyle = {
  'Consultation Booked': 'bg-[#c4688a]/10 text-[#c4688a] border-[#c4688a]/30',
  'Follow-up Sent': 'bg-[#C9A87C]/10 text-[#C9A87C] border-[#C9A87C]/30',
  'Interested': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  'Contacted': 'bg-[#333]/60 text-[#888] border-[#444]',
  'Consultation Scheduled': 'bg-green-500/10 text-green-400 border-green-500/30',
}

const sourceStyle = {
  'Website Chat': 'bg-purple-500/10 text-purple-400',
  'Instagram DM': 'bg-pink-500/10 text-pink-400',
  'Missed Call': 'bg-[#f59e0b]/10 text-[#f59e0b]',
  'Website Form': 'bg-[#c4688a]/10 text-[#c4688a]',
}

const filters = ['All', 'Website', 'Instagram', 'SMS']

export default function Leads({ simStarted = false, simLeads = [] }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const baseLeads = [...simLeads, ...allLeads]
  const filtered = activeFilter === 'All'
    ? baseLeads
    : baseLeads.filter((l) => {
        if (activeFilter === 'Website') return l.source.startsWith('Website')
        if (activeFilter === 'Instagram') return l.source.includes('Instagram')
        if (activeFilter === 'SMS') return l.source === 'Missed Call'
        return true
      })

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl text-white tracking-wide">Lead Management</h2>
          <p className="text-[#4a6560] text-sm mt-0.5">All leads captured by AI across every channel.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#c4688a]/10 border border-[#c4688a]/30 rounded-xl px-4 py-2">
            <Users size={13} className="text-[#c4688a]" />
            <span className="text-[#c4688a] font-mono text-xs font-bold">{simLeads.length + allLeads.length} LEADS TODAY</span>
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
        ].map((s) => (
          <div key={s.label} className="bg-[#131918] border border-[#1E2B28] rounded-xl p-4 text-center">
            <div className="font-display text-3xl text-white">{s.value}</div>
            <div className="text-[#4a6560] font-mono text-[10px] mt-0.5">{s.label}</div>
          </div>
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
                ? 'bg-[#c4688a] text-[#0D1110] font-bold'
                : 'bg-[#0D1110] text-[#888] border border-[#333] hover:border-[#555]'
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-[#4a6560] font-mono text-xs">{filtered.length} leads</span>
      </div>

      {/* Table */}
      <div className="bg-[#131918] border border-[#1E2B28] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E2B28]">
              {['Name', 'Service', 'Source', 'Status', 'Date', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[#4a6560] font-mono text-[10px] uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead, i) => {
                const isNew = simLeads.includes(lead)
                return (
                  <tr
                    key={i}
                    className="border-b border-[#1a2420] hover:bg-[#0D1110] transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#1E2B28] flex items-center justify-center text-[#888] text-xs font-semibold">
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
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded animate-pulse" style={{ background: 'rgba(139,188,173,0.15)', color: 'var(--accent)', border: '1px solid rgba(139,188,173,0.3)' }}>
                            ✦ NEW
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[#4a6560] font-mono text-xs">{lead.date}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="flex items-center gap-1 text-[#4a6560] hover:text-[#c4688a] font-mono text-[10px] transition-colors opacity-0 group-hover:opacity-100">
                        <ExternalLink size={12} />
                        View
                      </button>
                    </td>
                  </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
