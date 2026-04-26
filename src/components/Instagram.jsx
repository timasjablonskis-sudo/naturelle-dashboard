import React, { useState } from 'react'
import { Instagram as InstagramIcon, CheckCircle2, MessageCircle } from 'lucide-react'
import { cn } from '../lib/utils'
import { instagramLeads, instagramTotalMessages } from '../data/stats'

const conversations = instagramLeads.map(l => ({
  id: l.id,
  name: l.name,
  preview: l.instagramDM.preview,
  time: l.instagramDM.time,
  status: l.status,
  booked: l.booked,
  messages: l.instagramDM.messages,
}))

const InstagramGradient = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig)" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="4" stroke="url(#ig)" strokeWidth="2" fill="none" />
    <circle cx="18" cy="6" r="1.2" fill="url(#ig)" />
  </svg>
)

export default function Instagram({ simStarted = false, simConversations = [] }) {
  const allConversations = [...simConversations, ...conversations]
  const [activeId, setActiveId] = useState(conversations[0]?.id)
  const active = allConversations.find((c) => c.id === activeId) || allConversations[0]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">Instagram DM Automation</h2>
          <p className="text-zinc-500 text-sm mt-0.5">AI handles every DM — 24/7, instant, on-brand.</p>
        </div>
        <div className="flex items-center gap-2 bg-surface-1 border border-white/10 rounded-xl px-4 py-2">
          <InstagramIcon size={14} className="text-pink-400" />
          <span className="text-white font-mono text-xs">{instagramTotalMessages} messages today</span>
          <span className="bg-primary text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">LIVE</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[580px]">
        <div className="w-full md:w-[280px] bg-surface-1 border border-white/10 rounded-xl flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <span className="text-zinc-500 font-mono text-[10px]">CONVERSATIONS</span>
          </div>
          <div className="max-h-[180px] md:max-h-none flex-1 overflow-y-auto">
            {allConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                className={cn(
                  'w-full text-left px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors',
                  activeId === conv.id && 'bg-white/[0.03] border-l-2 border-l-primary'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {conv.name[0]}
                    </div>
                    {conv.isNew && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary animate-pulse border-2 border-surface-1" />}
                    <div className="absolute -bottom-0.5 -right-0.5"><InstagramGradient /></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">{conv.name}</span>
                      <span className="text-zinc-600 font-mono text-[10px]">{conv.time}</span>
                    </div>
                    <p className="text-zinc-500 text-xs truncate mt-0.5">{conv.preview}</p>
                    <span className={cn('inline-block mt-1 text-[9px] font-mono px-1.5 py-0.5 rounded',
                      conv.booked ? 'bg-primary/10 text-primary' : conv.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400' : 'bg-zinc-800 text-zinc-400'
                    )}>
                      {conv.status}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-surface-1 border border-white/10 rounded-xl flex flex-col">
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {active.name[0]}
              </div>
              <div>
                <div className="text-white font-medium text-sm">{active.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <InstagramGradient />
                  <span className="text-zinc-500 font-mono text-[10px]">via Instagram DM</span>
                </div>
              </div>
            </div>
            {active.booked && (
              <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/25 rounded-lg px-3 py-1.5">
                <CheckCircle2 size={13} className="text-primary" />
                <span className="text-primary font-mono text-[10px]">CONSULTATION BOOKED</span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {active.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'ai' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'visitor' && (
                  <div className="max-w-[70%]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-zinc-500 font-mono text-[9px]">{active.name}</span>
                    </div>
                    <div className="bg-surface-2 border border-white/10 rounded-xl rounded-tl-sm px-4 py-2.5">
                      <p className="text-white text-sm">{msg.text}</p>
                    </div>
                  </div>
                )}
                {msg.from === 'ai' && (
                  <div className="max-w-[70%]">
                    <div className="flex items-center justify-end gap-1.5 mb-1">
                      <span className="text-primary font-mono text-[9px]">AI AGENT</span>
                    </div>
                    <div className="bg-background border border-primary/20 border-l-2 border-l-primary rounded-xl rounded-tr-sm px-4 py-2.5">
                      <p className="text-zinc-200 text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={13} className="text-zinc-500" />
              <span className="text-zinc-500 font-mono text-[10px]">AI responding automatically via Instagram</span>
            </div>
            <span className="text-zinc-600 font-mono text-[10px]">Lumina Med Spa AI</span>
          </div>
        </div>
      </div>
    </div>
  )
}
