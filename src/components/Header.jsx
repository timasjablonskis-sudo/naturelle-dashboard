import React, { useState, useEffect } from 'react'
import { Bot, MapPin } from 'lucide-react'
import { cn } from '../lib/utils'

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
    <header className="h-[48px] md:h-[56px] border-b border-white/10 px-3 md:px-6 flex items-center gap-2 md:gap-4 flex-shrink-0 backdrop-blur-md bg-surface-1/60">
      {/* Left */}
      <div className="flex-shrink-0 min-w-[160px]">
        <div className="font-sans font-semibold text-white text-base leading-none tracking-tight">Lumina Med Spa</div>
        <div className="text-[9px] font-mono text-zinc-600 tracking-widest uppercase mt-0.5">Pulse by AdScale</div>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin size={10} className="text-zinc-500" />
          <span className="text-[10px] text-zinc-500 font-mono">Wheaton, IL</span>
        </div>
      </div>

      {/* Center: stat chips */}
      <div className="flex-1 hidden md:flex items-center justify-center gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-background border border-white/10 rounded-lg px-3 py-1.5 flex flex-col items-center min-w-[90px]"
          >
            <span key={s.value} className="text-white font-semibold text-sm leading-none count-up">{s.value}</span>
            <span className="text-zinc-500 font-mono text-[9px] mt-0.5 leading-none text-center whitespace-nowrap">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Right */}
      <div className="flex-shrink-0 flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-1.5 rounded-lg px-2 md:px-3 py-1.5 border border-primary/25 bg-primary/8">
          <Bot size={13} className="text-primary" />
          <span className="hidden md:inline font-mono text-[10px] font-bold tracking-wider text-primary">AI FRONT DESK</span>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-white font-mono text-xs">{formatTime(time)}</div>
          <div className="text-zinc-500 font-mono text-[10px]">{formatDate(time)}</div>
        </div>
      </div>
    </header>
  )
}
