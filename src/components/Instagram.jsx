import React, { useState } from 'react'
import { Instagram as InstagramIcon, CheckCircle2, MessageCircle } from 'lucide-react'

const conversations = [
  {
    id: 1,
    name: 'Ashley R.',
    preview: 'Thursday afternoon',
    time: '2m ago',
    status: 'Consultation Booked',
    messages: [
      { from: 'visitor', text: 'How much are lip fillers?' },
      { from: 'ai', text: 'Hi! At Wishful Beauty Med Spa, lip fillers start at $550 depending on the product and amount needed. Would you like to book a consultation to discuss the best option for you?' },
      { from: 'visitor', text: 'Yes, what times do you have?' },
      { from: 'ai', text: 'We have availability this week! Tuesday & Thursday 10am–7pm, Wednesday & Friday 12–5pm, Saturday 10am–2pm. Which day works for you?' },
      { from: 'visitor', text: 'Thursday afternoon' },
      { from: 'ai', text: "Perfect! I've noted Thursday afternoon for a lip filler consultation. Confirming your appointment at Wishful Beauty Med Spa, 3433 Kirchoff Rd, Rolling Meadows IL. You'll receive a confirmation shortly! 🌿" },
    ],
    booked: true,
  },
  {
    id: 2,
    name: 'Jordan P.',
    preview: 'How long does it take?',
    time: '18m ago',
    status: 'In Progress',
    messages: [
      { from: 'visitor', text: 'Do you offer laser hair removal?' },
      { from: 'ai', text: 'Yes! Wishful Beauty Med Spa offers laser hair removal for hydration, energy, and immunity. Sessions start at $99. Would you like to book?' },
      { from: 'visitor', text: 'How long does it take?' },
      { from: 'ai', text: 'laser hair removal sessions take about 45–60 minutes. We can have you in and out during your lunch break! Want me to book you in?' },
    ],
    booked: false,
  },
  {
    id: 3,
    name: 'Kayla M.',
    preview: 'yes omg book me',
    time: '35m ago',
    status: 'Consultation Booked',
    messages: [
      { from: 'visitor', text: "What's your Botox special?" },
      { from: 'ai', text: "Great timing! We're running a Botox special: 20 units for $179 (regular $240). Want to grab that deal this week?" },
      { from: 'visitor', text: 'yes omg book me' },
      { from: 'ai', text: 'Done! Booking you in for the Botox special. What day works best this week?' },
    ],
    booked: true,
  },
  {
    id: 4,
    name: 'Nina C.',
    preview: 'What skin treatments do you offer?',
    time: '1h ago',
    status: 'Replied',
    messages: [
      { from: 'visitor', text: 'What skin treatments do you offer?' },
      { from: 'ai', text: 'We offer HydraFacials ($175+), microneedling, chemical peels, and PRP facials! Each is tailored to your skin goals. Want to book a skin consultation?' },
      { from: 'visitor', text: 'Ooh yes, what does the consultation involve?' },
      { from: 'ai', text: "It's a 15-minute call with one of our aesthetic nurses to review your skin goals and recommend the best treatment path. Completely free! Want me to schedule you in?" },
    ],
    booked: false,
  },
]

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
  const [activeId, setActiveId] = useState(1)
  const active = allConversations.find((c) => c.id === activeId) || allConversations[0]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl text-white tracking-wide">Instagram DM Automation</h2>
          <p className="text-[#4a6560] text-sm mt-0.5">AI handles every DM — 24/7, instant, on-brand.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#0D1110] border border-[#333] rounded-xl px-4 py-2">
          <InstagramIcon size={14} className="text-pink-400" />
          <span className="text-white font-mono text-xs">18 messages today</span>
          <span className="bg-[#c4688a] text-[#0D1110] font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">LIVE</span>
        </div>
      </div>

      {/* Main split */}
      <div className="flex gap-4 h-[580px]">
        {/* Conversation List */}
        <div className="w-[280px] bg-[#131918] border border-[#1E2B28] rounded-xl flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-[#1E2B28]">
            <span className="text-[#6a8a85] font-mono text-[10px]">CONVERSATIONS</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {allConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                className={`w-full text-left px-4 py-3 border-b border-[#1a2420] hover:bg-[#0D1110] transition-colors ${
                  activeId === conv.id ? 'bg-[#0D1110] border-l-2 border-l-[#c4688a]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {conv.name[0]}
                    </div>
                    {conv.isNew && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#c4688a] animate-pulse border-2 border-[#131918]" />}
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <InstagramGradient />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">{conv.name}</span>
                      <span className="text-[#3a5550] font-mono text-[10px]">{conv.time}</span>
                    </div>
                    <p className="text-[#4a6560] text-xs truncate mt-0.5">{conv.preview}</p>
                    <span className={`inline-block mt-1 text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      conv.booked
                        ? 'bg-[#c4688a]/10 text-[#c4688a]'
                        : conv.status === 'In Progress'
                        ? 'bg-[#C9A87C]/10 text-[#C9A87C]'
                        : 'bg-[#333] text-[#888]'
                    }`}>
                      {conv.status}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Conversation */}
        <div className="flex-1 bg-[#131918] border border-[#1E2B28] rounded-xl flex flex-col">
          {/* Chat header */}
          <div className="px-5 py-3 border-b border-[#1E2B28] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {active.name[0]}
              </div>
              <div>
                <div className="text-white font-medium text-sm">{active.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <InstagramGradient />
                  <span className="text-[#4a6560] font-mono text-[10px]">via Instagram DM</span>
                </div>
              </div>
            </div>
            {active.booked && (
              <div className="flex items-center gap-1.5 bg-[#c4688a]/10 border border-[#c4688a]/30 rounded-lg px-3 py-1.5">
                <CheckCircle2 size={13} className="text-[#c4688a]" />
                <span className="text-[#c4688a] font-mono text-[10px]">CONSULTATION BOOKED</span>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {active.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'ai' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'visitor' && (
                  <div className="max-w-[70%]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[#4a6560] font-mono text-[9px]">{active.name}</span>
                    </div>
                    <div className="bg-[#1e1e1e] border border-[#2a3632] rounded-xl rounded-tl-sm px-4 py-2.5">
                      <p className="text-white text-sm">{msg.text}</p>
                    </div>
                  </div>
                )}
                {msg.from === 'ai' && (
                  <div className="max-w-[70%]">
                    <div className="flex items-center justify-end gap-1.5 mb-1">
                      <span className="text-[#c4688a] font-mono text-[9px]">AI AGENT</span>
                    </div>
                    <div className="bg-[#0D1110] border border-[#c4688a]/20 border-l-2 border-l-[#c4688a] rounded-xl rounded-tr-sm px-4 py-2.5">
                      <p className="text-[#e0e0e0] text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="px-5 py-3 border-t border-[#1E2B28] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={13} className="text-[#4a6560]" />
              <span className="text-[#4a6560] font-mono text-[10px]">AI responding automatically via Instagram</span>
            </div>
            <span className="text-[#3a5550] font-mono text-[10px]">Wishful Beauty Med Spa AI</span>
          </div>
        </div>
      </div>
    </div>
  )
}
