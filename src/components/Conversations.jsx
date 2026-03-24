import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, Globe, Instagram, Phone, Send, Bot } from 'lucide-react'
import { cn } from '../lib/utils'
import { conversationLeads } from '../data/stats'

const initialConversations = conversationLeads.map(l => ({
  id: l.id,
  name: l.name,
  channel: l.conversation.channel,
  preview: l.conversation.preview,
  time: l.conversation.time,
  live: l.conversation.live,
  messages: l.conversation.messages,
}))

const aiReplies = {
  botox: "Neuromodulators (Botox/Dysport) start at $12/unit — most clients need 20–40 units. We focus on natural-looking results tailored to your features. Would you like to book a consultation?",
  neuromodulator: "Neuromodulators (Botox/Dysport) start at $12/unit — most clients need 20–40 units. Our providers specialize in natural-looking results. Would you like to book a consultation?",
  sculptra: "Sculptra starts at $750/vial — it's a collagen stimulator that builds volume naturally over 2+ years. Most clients need 2–3 vials per session. Want to book a consultation?",
  microneedling: "Microneedling starts at $300/session. We also offer PRP-enhanced sessions for incredible collagen results. 3-session packages are most popular. Want to book a consultation?",
  prp: "PRP (Platelet-Rich Plasma) therapy uses your body's own growth factors for natural rejuvenation. Sessions start at $350. Great for skin rejuvenation and hair restoration. Want to learn more?",
  prf: "PRF (Platelet-Rich Fibrin) is the next evolution of PRP — it releases growth factors over a longer period for enhanced results. Want to book a consultation to see if it's right for you?",
  filler: "Dermal fillers start at $550/syringe. We use premium hyaluronic acid fillers for natural enhancement — lips, cheeks, jawline, and more. Results last 6–18 months. Want to book?",
  'dermal filler': "Dermal fillers start at $550/syringe. We offer treatment for lips, cheeks, jawline, chin, and under-eyes. Natural-looking results that last 6–18 months. Want to schedule a consultation?",
  kybella: "Kybella is an injectable treatment that permanently destroys fat cells under the chin — no surgery needed. Typically 2–4 sessions. Want to book a consultation?",
  'pdo thread': "PDO Threads provide a non-surgical lift for jawline, cheeks, neck, and brows. Results last 12–18 months with minimal downtime. Want to learn more?",
  skinvive: "SkinVive is an injectable that improves skin quality from within — better hydration, smoothness, and glow. Results last about 6 months. Want to book?",
  b12: "Vitamin B12 injections boost energy, metabolism, and overall wellness. Quick and easy — just a few minutes. Want to schedule one?",
  book: "I'd love to help you book! We have availability at our Wheaton location. What day works best for you?",
  appointment: "I'd love to help you book! We have availability at our Wheaton location. What day works best for you?",
  price: "Which service are you asking about? We offer Neuromodulators ($12/unit), Dermal Fillers ($550+), Sculptra ($750+), PRP ($350+), Microneedling ($300+), and more!",
  cost: "Which service are you asking about? We offer Neuromodulators ($12/unit), Dermal Fillers ($550+), Sculptra ($750+), PRP ($350+), Microneedling ($300+), and more!",
  'how much': "Which service are you asking about? We offer Neuromodulators ($12/unit), Dermal Fillers ($550+), Sculptra ($750+), PRP ($350+), Microneedling ($300+), and more!",
}

const defaultReply = "Great question! At Naturelle Med Spa, we specialize in neuromodulators, dermal fillers, Sculptra, PRP, PRF, PDO Threads, Kybella, microneedling, and SkinVive — all focused on enhancing your natural beauty. Would you like to book a consultation?"

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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">Conversations</h2>
          <p className="text-zinc-500 text-sm mt-0.5">Unified inbox — Website, Instagram, SMS.</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-xl px-4 py-2">
          <MessageSquare size={13} className="text-primary" />
          <span className="text-primary font-mono text-xs font-bold">6 ACTIVE CONVERSATIONS</span>
        </div>
      </div>

      {!simStarted ? (
        <div className="bg-surface-1 border border-white/10 rounded-xl h-[300px] md:h-[600px] flex flex-col items-center justify-center gap-3">
          <MessageSquare size={32} className="text-zinc-700" />
          <p className="text-zinc-600 font-mono text-xs">No conversations yet — start the simulation</p>
        </div>
      ) : (
      <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[600px]">
        {/* Conversation List */}
        <div className="w-full md:w-[280px] bg-surface-1 border border-white/10 rounded-xl flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <span className="text-zinc-500 font-mono text-[10px]">ALL CHANNELS</span>
          </div>
          <div className="max-h-[200px] md:max-h-none flex-1 overflow-y-auto">
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
                      <span className="text-zinc-600 font-mono text-[9px]">Naturelle Med Spa AI</span>
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
                  className="flex items-center gap-1.5 bg-primary text-white rounded-lg px-3 py-1.5 text-xs font-bold hover:bg-emerald-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={12} />
                  Send
                </button>
              </div>
              <p className="text-zinc-700 font-mono text-[9px] mt-1.5 px-1">
                Live AI chat demo — try: "sculptra", "dermal filler", "microneedling", "PRP"
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
