import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, Globe, Instagram, Phone, Send, Bot } from 'lucide-react'

const initialConversations = [
  {
    id: 1,
    name: 'Emily R.',
    channel: 'Website Chat',
    preview: 'That works for me!',
    time: '2m ago',
    live: true,
    messages: [
      { from: 'visitor', text: 'Hi, I\'m interested in Botox. What are your prices?' },
      { from: 'ai', text: 'Hi! Botox at Wishful Beauty Med Spa starts at $12/unit. We have a current special: 20 units for $179! Would you like to book a consultation?' },
      { from: 'visitor', text: 'Yes! What availability do you have this week?' },
      { from: 'ai', text: 'I\'d love to help you book! We have availability this week: Tue & Thu 10am–7pm, Wed & Fri 12–5pm, Sat 10am–2pm. What day works for you?' },
      { from: 'visitor', text: 'Thursday afternoon works!' },
      { from: 'ai', text: 'Perfect! I\'ve reserved Thursday afternoon for your Botox consultation. You\'ll receive a confirmation text shortly. See you then! 💚' },
    ],
  },
  {
    id: 2,
    name: 'Jordan P.',
    channel: 'Instagram',
    preview: 'how long does laser hair removal take',
    time: '18m ago',
    live: false,
    messages: [
      { from: 'visitor', text: 'do you offer laser hair removal' },
      { from: 'ai', text: 'Yes! Wishful Beauty Med Spa offers laser hair removal for all skin types. Sessions start at $99 depending on the area. Would you like to book?' },
      { from: 'visitor', text: 'how long does laser hair removal take' },
      { from: 'ai', text: 'Sessions take about 15–45 minutes depending on the area. Most clients need 6–8 sessions for full results. Want me to book you in?' },
    ],
  },
  {
    id: 3,
    name: 'Sarah L.',
    channel: 'SMS',
    preview: 'AI: Free consult booked!',
    time: '40m ago',
    live: false,
    messages: [
      { from: 'ai', text: 'Hi Sarah! This is Wishful Beauty Med Spa — we saw you called about microneedling. We offer microneedling with PRP starting at $250/session. Want a free consultation?' },
      { from: 'visitor', text: 'yes how do i sign up' },
      { from: 'ai', text: 'Microneedling stimulates collagen production for smoother, firmer skin. We offer standard and PRP-enhanced sessions. Book a free consultation to find the best option for you!' },
      { from: 'visitor', text: 'ok book me for Tuesday' },
      { from: 'ai', text: 'Done! Booking you in for a free microneedling consultation on Tuesday. You\'ll get a reminder the morning of. See you then! 🌿' },
    ],
  },
  {
    id: 4,
    name: 'Michael B.',
    channel: 'Website Chat',
    preview: 'What\'s a HydraFacial?',
    time: '1h ago',
    live: false,
    messages: [
      { from: 'visitor', text: 'What\'s included in a HydraFacial?' },
      { from: 'ai', text: 'HydraFacials at Wishful Beauty Med Spa start at $175 and leave your skin glowing for weeks. Want to book?' },
      { from: 'visitor', text: 'How much is it?' },
      { from: 'ai', text: 'Which service are you asking about? We offer Botox ($12/unit), Facials ($175+), Fillers ($550+), Laser Hair Removal ($99+), and Microneedling ($250+).' },
      { from: 'visitor', text: 'HydraFacial' },
      { from: 'ai', text: 'HydraFacials start at $175. The treatment deeply cleanses, exfoliates, and hydrates — most patients see instant results! Ready to book?' },
      { from: 'visitor', text: 'Let\'s book Saturday' },
      { from: 'ai', text: 'I\'d love to help you book! Saturday 10am–2pm works great. Confirming your HydraFacial appointment. See you Saturday! ✨' },
    ],
  },
  {
    id: 5,
    name: 'Anna T.',
    channel: 'SMS',
    preview: 'See you Wednesday!',
    time: '2h ago',
    live: false,
    messages: [
      { from: 'ai', text: 'Hi Anna! Wishful Beauty Med Spa here — following up on your inquiry about laser hair removal. Sessions start at $150–$400 depending on the area. Want to schedule?' },
      { from: 'visitor', text: 'Yes what are the options' },
      { from: 'ai', text: 'We offer laser hair removal for face, underarms, bikini, legs, and full body. Most clients see full results in 6–8 sessions. Want to schedule?' },
      { from: 'visitor', text: 'Wednesday at noon' },
      { from: 'ai', text: 'Confirmed! Laser Hair Removal Wednesday at noon. See you Wednesday! 💧' },
    ],
  },
  {
    id: 6,
    name: 'Rachel V.',
    channel: 'Website Chat',
    preview: 'AI: See you Friday! 💄',
    time: '30m ago',
    live: false,
    messages: [
      { from: 'visitor', text: 'How much is lip filler?' },
      { from: 'ai', text: 'Lip filler starts at $550 — or as low as $46/month with Cherry patient financing. Takes 60 seconds to check your rate, no credit impact. Want me to pull up availability after?' },
      { from: 'visitor', text: "Oh that's not bad. What does it look like?" },
      { from: 'ai', text: 'Most clients go for a natural, subtle enhancement — fuller lips without looking overdone. We use premium hyaluronic acid filler, lasts 6–12 months. Want to book a free consultation?' },
      { from: 'visitor', text: "Yes, I'm interested!" },
      { from: 'ai', text: 'I have Thursday at 2pm and Friday at 11am open this week. Which works for you?' },
      { from: 'visitor', text: 'Friday works!' },
      { from: 'ai', text: "Done! Booking you in for Friday at 11am for a lip filler consultation. You'll get a reminder text the morning of. See you then! 💄" },
    ],
  },
]

const aiReplies = {
  botox: "Botox starts at $12/unit — most clients need 20–40 units. We have a current special: 20 units for $179! Would you like to book a consultation?",
  hydrafacial: "HydraFacials start at $175 and leave your skin glowing for weeks — zero downtime. Want to book?",
  microneedling: "Microneedling starts at $300/session. We also offer PRP-enhanced sessions for even better collagen results. 3-session packages are most common. Want to book a consultation?",
  'laser hair removal': "Laser hair removal starts at $150–$400/session depending on the area. Most clients need 6–8 sessions for full results. Want to schedule?",
  laser: "Laser hair removal starts at $150–$400/session depending on the area. Most clients need 6–8 sessions for full results. Want to schedule?",
  cryotherapy: "We offer cryotherapy sessions for recovery and wellness. Want to learn more or book a session?",
  'lip filler': "Lip filler starts at $550 — or as low as $46/month with Cherry patient financing. Takes 60 seconds to check your rate, no credit impact. Want me to pull up availability after?",
  'lip fillers': "Lip filler starts at $550 — or as low as $46/month with Cherry patient financing. Takes 60 seconds to check your rate, no credit impact. Want me to pull up availability after?",
  filler: "Lip filler starts at $550 — or as low as $46/month with Cherry patient financing. Takes 60 seconds to check your rate, no credit impact. Want me to pull up availability?",
  cheek: "Cheek filler starts at $700 — or as low as $58/month with Cherry patient financing. Results last 12–18 months. Want to book a consultation?",
  cherry: "Cherry patient financing lets you split any service over $600 into monthly payments — starting as low as $46/month. Takes 60 seconds with no credit impact. Want to check your rate?",
  financing: "We offer Cherry patient financing — pay as low as $46/month on services over $600. Takes 60 seconds to check your rate with no credit impact!",
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
  if (channel === 'SMS') return <Phone size={11} className="text-[#f59e0b]" />
  return <Globe size={11} className="text-[#c4688a]" />
}

const channelColor = {
  'Website Chat': 'bg-[#c4688a]/10 text-[#c4688a]',
  Instagram: 'bg-pink-500/10 text-pink-400',
  SMS: 'bg-[#f59e0b]/10 text-[#f59e0b]',
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
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, { from: 'visitor', text }], preview: text }
          : c
      )
    )

    setIsTyping(true)
    setTimeout(() => {
      const reply = getAIReply(text)
      setIsTyping(false)
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? { ...c, messages: [...c.messages, { from: 'ai', text: reply }], preview: reply }
            : c
        )
      )
    }, 1200)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl text-white tracking-wide">Conversations</h2>
          <p className="text-[#4a6560] text-sm mt-0.5">Unified inbox — Website, Instagram, SMS.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#c4688a]/10 border border-[#c4688a]/30 rounded-xl px-4 py-2">
          <MessageSquare size={13} className="text-[#c4688a]" />
          <span className="text-[#c4688a] font-mono text-xs font-bold">6 ACTIVE CONVERSATIONS</span>
        </div>
      </div>

      {/* Main split */}
      {!simStarted ? (
        <div className="bg-[#131918] border border-[#1E2B28] rounded-xl h-[600px] flex flex-col items-center justify-center gap-3">
          <MessageSquare size={32} className="text-[#2a3a36]" />
          <p className="text-[#3a5550] font-mono text-xs">No conversations yet — start the simulation</p>
        </div>
      ) : (
      <div className="flex gap-4 h-[600px]">
        {/* Conversation List */}
        <div className="w-[280px] bg-[#131918] border border-[#1E2B28] rounded-xl flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-[#1E2B28]">
            <span className="text-[#6a8a85] font-mono text-[10px]">ALL CHANNELS</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                className={`w-full text-left px-4 py-3 border-b border-[#1a2420] hover:bg-[#0D1110] transition-colors ${
                  activeId === conv.id ? 'bg-[#0D1110] border-l-2 border-l-[#c4688a]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-[#1E2B28] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {conv.name[0]}
                    </div>
                    {conv.live && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#c4688a] border border-[#111]"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">{conv.name}</span>
                      <span className="text-[#3a5550] font-mono text-[10px]">{conv.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <ChannelIcon channel={conv.channel} />
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${channelColor[conv.channel]}`}>
                        {conv.channel}
                      </span>
                    </div>
                    <p className="text-[#4a6560] text-xs truncate mt-0.5">{conv.preview}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="flex-1 bg-[#131918] border border-[#1E2B28] rounded-xl flex flex-col">
          {/* Chat header */}
          <div className="px-5 py-3 border-b border-[#1E2B28] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1E2B28] flex items-center justify-center text-white font-bold text-sm">
                {active.name[0]}
              </div>
              <div>
                <div className="text-white font-medium text-sm">{active.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <ChannelIcon channel={active.channel} />
                  <span className="text-[#4a6560] font-mono text-[10px]">via {active.channel}</span>
                  {active.live && (
                    <span className="flex items-center gap-1 text-[#c4688a] font-mono text-[9px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c4688a] animate-pulse"></span>
                      LIVE
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0D1110] border border-[#333] rounded-lg px-3 py-1.5">
              <Bot size={12} className="text-[#c4688a]" />
              <span className="text-[#6a8a85] font-mono text-[10px]">AI Responding</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {active.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'ai' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'visitor' ? (
                  <div className="max-w-[70%]">
                    <div className="bg-[#1e1e1e] border border-[#2a3632] rounded-xl rounded-tl-sm px-4 py-2.5">
                      <p className="text-white text-sm">{msg.text}</p>
                    </div>
                    <div className="text-[#3a5550] font-mono text-[9px] mt-1">{active.name}</div>
                  </div>
                ) : (
                  <div className="max-w-[70%]">
                    <div className="bg-[#0D1110] border border-[#c4688a]/20 border-l-[3px] border-l-[#c4688a] rounded-xl rounded-tr-sm px-4 py-2.5">
                      <p className="text-[#e0e0e0] text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <Bot size={9} className="text-[#c4688a]" />
                      <span className="text-[#3a5550] font-mono text-[9px]">Wishful Beauty AI</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-[#0D1110] border border-[#c4688a]/20 border-l-[3px] border-l-[#c4688a] rounded-xl px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c4688a] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c4688a] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c4688a] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input — only for Website Chat conversations */}
          {active.channel === 'Website Chat' && (
            <div className="px-5 py-3 border-t border-[#1E2B28]">
              <div className="flex items-center gap-2 bg-[#0D1110] border border-[#333] rounded-xl px-4 py-2.5 focus-within:border-[#c4688a]/50 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about services, pricing, or booking…"
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-[#3a5550]"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="flex items-center gap-1.5 bg-[#c4688a] text-[#0D1110] rounded-lg px-3 py-1.5 text-xs font-bold hover:bg-[#a8d900] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={12} />
                  Send
                </button>
              </div>
              <p className="text-[#333333] font-mono text-[9px] mt-1.5 px-1">
                Live AI chat demo — try: "botox price", "book appointment", "laser hair removal"
              </p>
            </div>
          )}
          {active.channel !== 'Website Chat' && (
            <div className="px-5 py-3 border-t border-[#1E2B28]">
              <div className="flex items-center gap-2">
                <ChannelIcon channel={active.channel} />
                <span className="text-[#3a5550] font-mono text-[10px]">
                  AI managing this conversation via {active.channel}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  )
}
