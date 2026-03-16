import React, { useState, useEffect } from 'react'
import { Bot, MapPin } from 'lucide-react'

export default function Header({ simStats }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const stats = [
    { label: 'New Leads Today',   value: simStats.leads },
    { label: 'Consults Booked',   value: simStats.bookings },
    { label: 'Calls Recovered',   value: simStats.missed },
    { label: 'Instagram DMs',     value: simStats.instagram },
    { label: 'Est. Revenue',      value: '$' + simStats.revenue.toLocaleString() },
  ]

  const formatTime = (d) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })
  const formatDate = (d) =>
    d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <header className="h-[60px] bg-[#131918] border-b border-[#1E2B28] px-6 flex items-center gap-4 flex-shrink-0">
      {/* Left */}
      <div className="flex-shrink-0 min-w-[160px]">
        <div className="font-display text-white text-lg leading-none tracking-wide">Wishful Beauty</div>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin size={10} className="text-[#4a6560]" />
          <span className="text-[10px] text-[#4a6560] font-mono">Rolling Meadows, IL</span>
        </div>
      </div>

      {/* Center: stat chips */}
      <div className="flex-1 flex items-center justify-center gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#0D1110] border border-[#1E2B28] rounded-lg px-3 py-1.5 flex flex-col items-center min-w-[90px]"
          >
            <span key={s.value} className="text-white font-semibold text-sm leading-none count-up">{s.value}</span>
            <span className="text-[#4a6560] font-mono text-[9px] mt-0.5 leading-none text-center whitespace-nowrap">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Right */}
      <div className="flex-shrink-0 flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 border"
          style={{ background: 'rgba(196,104,138,0.08)', borderColor: 'rgba(196,104,138,0.25)' }}>
          <Bot size={13} style={{ color: 'var(--accent)' }} />
          <span className="font-mono text-[10px] font-bold tracking-wider" style={{ color: 'var(--accent)' }}>AI FRONT DESK</span>
        </div>
        <div className="text-right">
          <div className="text-white font-mono text-xs">{formatTime(time)}</div>
          <div className="text-[#4a6560] font-mono text-[10px]">{formatDate(time)}</div>
        </div>
      </div>
    </header>
  )
}
