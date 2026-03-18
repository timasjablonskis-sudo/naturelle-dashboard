import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, Globe, Instagram, Phone, Send, Bot } from 'lucide-react'
import { cn } from '../lib/utils'

const initialConversations = [
  {
    id: 1, name: 'Emily R.', channel: 'Website Chat', preview: 'That works for me!', time: '2m ago', live: true,
    messages: [
      { from: 'visitor', text: 'Hi, I\'m interested in Botox. What are your prices?' },
      { from: 'ai', text: 'Hi! Botox at Wishful Beauty Med Spa starts at $12/unit. We have a current special: 20 units for $179! Would you like to book a consultation?' },
      { from: 'visitor', text: 'Yes! What availability do you have this week?' },
      { from: 'ai', text: 'I\'d love to help you book! We have availability this week: Tue & Thu 10am–7pm, Wed & Fri 12–5pm, Sat 10am–2pm. What day works for you?' },
      { from: 'visitor', text: 'Thursday afternoon works!' },
      { from: 'ai', text: 'Perfect! I\'ve reserved Thursday afternoon for your Botox consultation. You\'ll receive a confirmation text shortly. See you then!' },
    ],
  },
  {
    id: 2, name: 'Jordan P.', channel: 'Instagram', preview: 'how long does laser hair removal take', time: '18m ago', live: false,
    messages: [
      { from: 'visitor', text: 'do you offer laser hair removal' },
      { from: 'ai', text: 'Yes! Wishful Beauty Med Spa offers laser hair removal for all skin types. Sessions start at $99 depending on the area. Would you like to book?' },
      { from: 'visitor', text: 'how long does laser hair removal take' },
      { from: 'ai', text: 'Sessions take about 15–45 minutes depending on the area. Most clients need 6–8 sessions for full results. Want me to book you in?' },
    ],
  },
  {
    id: 3, name: 'Sarah L.', channel: 'SMS', preview: 'AI: Free consult booked!', time: '40m ago', live: false,
    messages: [
      { from: 'ai', text: 'Hi Sarah! This is Wishful Beauty Med Spa — we saw you called about microneedling. We offer microneedling with PRP starting at $250/session. Want a free consultation?' },
      { from: 'visitor', text: 'yes how do i sign up' },
      { from: 'ai', text: 'Microneedling stimulates collagen production for smoother, firmer skin. We offer standard and PRP-enhanced sessions. Book a free consultation to find the best option for you!' },
      { from: 'visitor', text: 'ok book me for Tuesday' },
      { from: 'ai', text: 'Done! Booking you in for a free microneedling consultation on Tuesday. You\'ll get a reminder the morning of. See you then!' },
    ],
  },
  {
    id: 4, name: 'Michael B.', channel: 'Website Chat', preview: 'What\'s a HydraFacial?', time: '1h ago', live: false,
    messages: [
      { from: 'visitor', text: 'What\'s included in a HydraFacial?' },
      { from: 'ai', text: 'HydraFacials at Wishful Beauty Med Spa start at $175 and leave your skin glowing for weeks. Want to book?' },
      { from: 'visitor', text: 'How much is it?' },
      { from: 'ai', text: 'Which service are you asking about? We offer Botox ($12/unit), Facials ($175+), Fillers ($550+), Laser Hair Removal ($99+), and Microneedling ($250+).' },
      { from: 'visitor', text: 'HydraFacial' },
      { from: 'ai', text: 'HydraFacials start at $175. The treatment deeply cleanses, exfoliates, and hydrates — most patients see instant results! Ready to book?' },
      { from: 'visitor', text: 'Let\'s book Saturday' },
      { from: 'ai', text: 'I\'d love to help you book! Saturday 10am–2pm works great. Confirming your HydraFacial appointment. See you Saturday!' },
    ],
  },
  {
    id: 5, name: 'Anna T.', channel: 'SMS', preview: 'See you Wednesday!', time: '2h ago', live: false,
    messages: [
      { from: 'ai', text: 'Hi Anna! Wishful Beauty Med Spa here — following up on your inquiry about laser hair removal. Sessions start at $150–$400 depending on the area. Want to schedule?' },
      { from: 'visitor', text: 'Yes what are the options' },
      { from: 'ai', text: 'We offer laser hair removal for face, underarms, bikini, legs, and full body. Most clients see full results in 6–8 sessions. Want to schedule?' },
      { from: 'visitor', text: 'Wednesday at noon' },
      { from: 'ai', text: 'Confirmed! Laser Hair Removal Wednesday at noon. See you Wednesday!' },
    ],
  },
  {
    id: 6, name: 'Rachel V.', channel: 'Website Chat', preview: 'AI: See you Friday!', time: '30m ago', live: false,
    messages: [
      { from: 'visitor', text: 'How much is lip filler?' },
      { from: 'ai', text: 'Lip filler starts at $550 — or as low as $46/month with Cherry patient financing. Takes 60 seconds to check your rate, no credit impact. Want me to pull up availability after?' },
      { from: 'visitor', text: "Oh that's not bad. What does it look like?" },
      { from: 'ai', text: 'Most clients go for a natural, subtle enhancement — fuller lips without looking overdone. We use premium hyaluronic acid filler, lasts 6–12 months. Want to book a free consultation?' },
      { from: 'visitor', text: "Yes, I'm interested!" },
      { from: 'ai', text: 'I have Thursday at 2pm and Friday at 11am open this week. Which works for you?' },
      { from: 'visitor', text: 'Friday works!' },
      { from: 'ai', text: "Done! Booking you in for Friday at 11am for a lip filler consultation. You'll get a reminder text the morning of. See you then!" },
    ],
  },
]

const aiReplies = {
  botox: "Botox starts at $12/unit — most clients need 20–40 units. We have a current special: 20 units for $179! Would you like to book a consultation?",
  hydrafacial: "HydraFacials start at $175 and leave your skin glowing for weeks — zero downtime. Want to book?",
  microneedling: "Microneedling starts at $300/session. We also offer PRP-enhanced sessions for even better collagen results. 3-session packages are most common. Want to book a consultation?",
  'laser hair removal': "Laser hair removal starts at $150–$400/session depending on the area. Most clients need 6–8 sessions for full results. Want to schedule?",
  laser: "Laser hair removal starts at $150–$400/session depending on the area. Most clients need 6–8 sessions for full results. Want to schedule?",
  'lip filler': "Lip filler starts at $550 — or as low as $46/month with Cherry patient financing. Takes 60 seconds to check your rate, no credit impact. Want me to pull up availability after?",
  'lip fillers': "Lip filler starts at $550 — or as low as $46/month with Cherry patient financing. Takes 60 seconds to check your rate, no credit impact. Want me to pull up availability after?",
  filler: "Lip filler starts at $550 — or as low as $46/month with Cherry patient financing. Takes 60 seconds to check your rate, no credit impact. Want me to pull up availability?",
  book: "I'd love to help you book! We have availability this week: Tue & Thu 10am–7pm, Wed & Fri 12–5pm, Sat 10am–2pm. What day works for you?",
  appointment: "I'd love to help you book! We have availability this week: Tue & Thu 10am–7pm, Wed & Fri 12–5pm, Sat 10am–2pm. What day works for you?",
  price: "Which service are you asking about? We offer Botox ($12/unit), Facials ($175+), Fillers ($550+), Laser Hair Removal ($150+), and Microneedling ($300+). Anything over $600 qualifies for Cherry financing!",
  cost: "Which service are you asking about? We offer Botox ($12/unit), Facials ($175+), Fillers ($550+), Laser Hair Removal ($150+), and Microneedling ($300+).",
  'how much': "Which service are you asking about? We offer Botox ($12/unit), Facials ($175+), Fillers ($550+), Laser Hair Removal ($150+), and Microneedling ($300+).",
}

const defaultReply = "Great question! We specialize in Botox, fillers, facials, laser hair removal, and microneedling. Services over $600 qualify for Cherry patient financing — as low as $46/month. Would you like to book a consultation?"

function getAIReply(input) {
  const lower = input.toLowerCase()
  for (const [key, reply] of Object.entries(aiReplies)) {
    if (lower.includes(key)) return reply
  }
  return defaultReply
}

const ChannelIcon = ({ channel }) => {
  if (channel === 'Instagram') return <Instagram size={11} className="text-pink-400" />
  if (channel === 'SMS') return <Phone size={11} className="text-amber-400" />
  return <Globe size={11} className="text-primary" />
}

const channelColor = {
  'Website Chat': 'bg-primary/10 text-primary',
  Instagram: 'bg-pink-500/10 text-pink-400',
  SMS: 'bg-amber-500/10 text-amber-400',
}

export default function Conversations({ simStarted = false }) {
  const [conversations, setConversations] = useState(initialConversations)
  const [activeId, setActiveId] = useState(1)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  const active = conversations.find((c) => c.id === activeId)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [active?.messages, isTyping])

  const sendMessage = () => {
    if (!input.trim()) return
    const text = input.trim()
    setInput('')
    setConversations((prev) =>
      prev.map((c) => c.id === activeId ? { ...c, messages: [...c.messages, { from: 'visitor', text }], preview: text } : c)
    )
    setIsTyping(true)
    setTimeout(() => {
      const reply = getAIReply(text)
      setIsTyping(false)
      setConversations((prev) =>
        prev.map((c) => c.id === activeId ? { ...c, messages: [...c.messages, { from: 'ai', text: reply }], preview: reply } : c)
      )
    }, 1200)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-3xl text-white tracking-tight">Conversations</h2>
          <p className="text-zinc-500 text-sm mt-0.5">Unified inbox — Website, Instagram, SMS.</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-xl px-4 py-2">
          <MessageSquare size={13} className="text-primary" />
          <span className="text-primary font-mono text-xs font-bold">6 ACTIVE CONVERSATIONS</span>
        </div>
      </div>

      {!simStarted ? (
        <div className="bg-surface-1 border border-white/10 rounded-xl h-[600px] flex flex-col items-center justify-center gap-3">
          <MessageSquare size={32} className="text-zinc-700" />
          <p className="text-zinc-600 font-mono text-xs">No conversations yet — start the simulation</p>
        </div>
      ) : (
      <div className="flex gap-4 h-[600px]">
        {/* Conversation List */}
        <div className="w-[280px] bg-surface-1 border border-white/10 rounded-xl flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <span className="text-zinc-500 font-mono text-[10px]">ALL CHANNELS</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                className={cn(
                  'w-full text-left px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors',
                  activeId === conv.id && 'bg-white/[0.03] border-l-2 border-l-primary'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {conv.name[0]}
                    </div>
                    {conv.live && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary border border-surface-1" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">{conv.name}</span>
                      <span className="text-zinc-600 font-mono text-[10px]">{conv.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <ChannelIcon channel={conv.channel} />
                      <span className={cn('text-[9px] font-mono px-1.5 py-0.5 rounded', channelColor[conv.channel])}>
                        {conv.channel}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-xs truncate mt-0.5">{conv.preview}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="flex-1 bg-surface-1 border border-white/10 rounded-xl flex flex-col">
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-white font-bold text-sm">
                {active.name[0]}
              </div>
              <div>
                <div className="text-white font-medium text-sm">{active.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <ChannelIcon channel={active.channel} />
                  <span className="text-zinc-500 font-mono text-[10px]">via {active.channel}</span>
                  {active.live && (
                    <span className="flex items-center gap-1 text-primary font-mono text-[9px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-background border border-white/10 rounded-lg px-3 py-1.5">
              <Bot size={12} className="text-primary" />
              <span className="text-zinc-400 font-mono text-[10px]">AI Responding</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {active.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'ai' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'visitor' ? (
                  <div className="max-w-[70%]">
                    <div className="bg-surface-2 border border-white/10 rounded-xl rounded-tl-sm px-4 py-2.5">
                      <p className="text-white text-sm">{msg.text}</p>
                    </div>
                    <div className="text-zinc-600 font-mono text-[9px] mt-1">{active.name}</div>
                  </div>
                ) : (
                  <div className="max-w-[70%]">
                    <div className="bg-background border border-primary/20 border-l-[3px] border-l-primary rounded-xl rounded-tr-sm px-4 py-2.5">
                      <p className="text-zinc-200 text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <Bot size={9} className="text-primary" />
                      <span className="text-zinc-600 font-mono text-[9px]">Wishful Beauty AI</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-background border border-primary/20 border-l-[3px] border-l-primary rounded-xl px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {active.channel === 'Website Chat' && (
            <div className="px-5 py-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 bg-background border border-white/10 rounded-xl px-4 py-2.5 focus-within:border-primary/50 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about services, pricing, or booking…"
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-zinc-600"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="flex items-center gap-1.5 bg-primary text-white rounded-lg px-3 py-1.5 text-xs font-bold hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={12} />
                  Send
                </button>
              </div>
              <p className="text-zinc-700 font-mono text-[9px] mt-1.5 px-1">
                Live AI chat demo — try: "botox price", "book appointment", "laser hair removal"
              </p>
            </div>
          )}
          {active.channel !== 'Website Chat' && (
            <div className="px-5 py-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <ChannelIcon channel={active.channel} />
                <span className="text-zinc-600 font-mono text-[10px]">AI managing this conversation via {active.channel}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  )
}
