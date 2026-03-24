import React from 'react'

const ITEMS = [
  { service: 'Neuromodulators', value: '$12/unit' },
  { service: 'Dermal Fillers', value: '$550' },
  { service: 'Sculptra', value: '$750' },
  { service: 'PRP Treatment', value: '$350' },
  { service: 'PRF Therapy', value: '$400' },
  { service: 'PDO Threads', value: '$800' },
  { service: 'Microneedling + PRP', value: '$450' },
  { service: 'SkinVive', value: '$450' },
  { service: 'Kybella', value: '$600' },
  { service: 'Vitamin B12', value: '$35' },
]

function TickerContent() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-2 whitespace-nowrap">
          <span className="w-1 h-1 rounded-full bg-primary" />
          <span className="text-zinc-400">{item.service}</span>
          <span className="text-white font-mono font-medium">{item.value}</span>
          <span className="text-zinc-700 mx-2">·</span>
        </span>
      ))}
    </>
  )
}

export default function RevenueTicker() {
  return (
    <div className="h-7 flex items-center overflow-hidden border-b border-white/[0.04] flex-shrink-0" style={{ background: 'rgba(24,24,27,0.6)' }}>
      {/* Fixed label */}
      <div className="flex items-center gap-2 px-4 border-r border-white/[0.06] h-full flex-shrink-0 z-10" style={{ background: 'rgba(24,24,27,0.95)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-[9px] text-zinc-500 tracking-wider whitespace-nowrap">LIVE REVENUE</span>
      </div>

      {/* Scrolling ticker */}
      <div className="flex-1 overflow-hidden relative">
        <div className="ticker-scroll flex items-center text-[11px]">
          <TickerContent />
          <TickerContent />
        </div>
      </div>
    </div>
  )
}
