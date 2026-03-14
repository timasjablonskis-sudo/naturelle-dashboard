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
      { from: 'ai', text: 'Hi! Botox at Intu Med Spa starts at $12/unit. We have a current special: 20 units for $179! Would you like to book a consultation?' },
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
    preview: 'how long does iv therapy take',
    time: '18m ago',
    live: false,
    messages: [
      { from: 'visitor', text: 'do you offer iv therapy' },
      { from: 'ai', text: 'Yes! Intu Med Spa offers IV therapy for hydration, energy, and immunity. Sessions start at $99. Would you like to book?' },
      { from: 'visitor', text: 'how long does iv therapy take' },
      { from: 'ai', text: 'IV therapy sessions take about 45–60 minutes. We can have you in and out during your lunch break! Want me to book you in?' },
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
      { from: 'ai', text: 'Hi Sarah! This is Intu Med Spa — we saw you called about weight loss. We offer medical weight loss with Semaglutide starting at $189/month. Want a free consultation?' },
      { from: 'visitor', text: 'yes how do i sign up' },
      { from: 'ai', text: 'We offer medical weight loss with Semaglutide & Tirzepatide starting at $189/month. Book a free consultation to see what\'s right for you!' },
      { from: 'visitor', text: 'ok book me for Tuesday' },
      { from: 'ai', text: 'Done! Booking you in for a free weight loss consultation on Tuesday. You\'ll get a reminder the morning of. See you then! 🌿' },
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
      { from: 'ai', text: 'HydraFacials at Intu Med Spa start at $175 and leave your skin glowing for weeks. Want to book?' },
      { from: 'visitor', text: 'How much is it?' },
      { from: 'ai', text: 'Which service are you asking about? We offer Botox ($12/unit), HydraFacials ($175+), Fillers ($550+), IV Therapy ($99+), and Weight Loss ($189/month).' },
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
      { from: 'ai', text: 'Hi Anna! Intu Med Spa here — following up on your inquiry about IV therapy. Our sessions start at $99. Want to schedule?' },
      { from: 'visitor', text: 'Yes what are the options' },
      { from: 'ai', text: 'IV therapy sessions start at $99 and take about 45–60 minutes. Great for energy, hydration, and recovery. Want to schedule?' },
      { from: 'visitor', text: 'Wednesday at noon' },
      { from: 'ai', text: 'Confirmed! IV Therapy Wednesday at noon. We\'re at 4726 Main St, Lisle IL. See you Wednesday! 💧' },
    ],
  },
]

const aiReplies = {
  botox: "Botox at Intu Med Spa starts at $12/unit. We have a current special: 20 units for $179! Would you like to book a consultation?",
  hydrafacial: "HydraFacials at Intu Med Spa start at $175 and leave your skin glowing for weeks. Want to book?",
  'weight loss': "We offer medical weight loss with Semaglutide & Tirzepatide starting at $189/month. Book a free consultation to see what's right for you!",
  glp: "We offer medical weight loss with Semaglutide & Tirzepatide starting at $189/month. Book a free consultation to see what's right for you!",
  'iv therapy': "IV therapy sessions start at $99 and take about 45–60 minutes. Great for energy, hydration, and recovery. Want to schedule?",
  iv: "IV therapy sessions start at $99 and take about 45–60 minutes. Great for energy, hydration, and recovery. Want to schedule?",
  book: "I'd love to help you book! We have availability this week: Tue & Thu 10am–7pm, Wed & Fri 12–5pm, Sat 10am–2pm. What day works for you?",
  appointment: "I'd love to help you book! We have availability this week: Tue & Thu 10am–7pm, Wed & Fri 12–5pm, Sat 10am–2pm. What day works for you?",
  price: "Which service are you asking about? We offer Botox ($12/unit), HydraFacials ($175+), Fillers ($550+), IV Therapy ($99+), and Weight Loss ($189/month).",
  cost: "Which service are you asking about? We offer Botox ($12/unit), HydraFacials ($175+), Fillers ($550+), IV Therapy ($99+), and Weight Loss ($189/month).",
  'how much': "Which service are you asking about? We offer Botox ($12/unit), HydraFacials ($175+), Fillers ($550+), IV Therapy ($99+), and Weight Loss ($189/month).",
}

const defaultReply = "Great question! At Intu Med Spa we specialize in injectables, skincare, IV therapy, and medical weight loss. Would you like to book a consultation?"

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
  return <Globe size={11} className="text-[#8BBCAD]" />
}

const channelColor = {
  'Website Chat': 'bg-[#8BBCAD]/10 text-[#8BBCAD]',
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
            ? { ...c, messages: [...c.messages, { from: 'visitor', text }, { from: 'ai', text: reply }], preview: reply }
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
        <div className="flex items-center gap-2 bg-[#8BBCAD]/10 border border-[#8BBCAD]/30 rounded-xl px-4 py-2">
          <MessageSquare size={13} className="text-[#8BBCAD]" />
          <span className="text-[#8BBCAD] font-mono text-xs font-bold">5 ACTIVE CONVERSATIONS</span>
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
                  activeId === conv.id ? 'bg-[#0D1110] border-l-2 border-l-[#8BBCAD]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-[#1E2B28] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {conv.name[0]}
                    </div>
                    {conv.live && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#8BBCAD] border border-[#111]"></span>
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
                    <span className="flex items-center gap-1 text-[#8BBCAD] font-mono text-[9px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8BBCAD] animate-pulse"></span>
                      LIVE
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0D1110] border border-[#333] rounded-lg px-3 py-1.5">
              <Bot size={12} className="text-[#8BBCAD]" />
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
                    <div className="bg-[#0D1110] border border-[#8BBCAD]/20 border-l-[3px] border-l-[#8BBCAD] rounded-xl rounded-tr-sm px-4 py-2.5">
                      <p className="text-[#e0e0e0] text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <Bot size={9} className="text-[#8BBCAD]" />
                      <span className="text-[#3a5550] font-mono text-[9px]">Intu AI</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-[#0D1110] border border-[#8BBCAD]/20 border-l-[3px] border-l-[#8BBCAD] rounded-xl px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8BBCAD] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8BBCAD] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8BBCAD] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input — only for Website Chat conversations */}
          {active.channel === 'Website Chat' && (
            <div className="px-5 py-3 border-t border-[#1E2B28]">
              <div className="flex items-center gap-2 bg-[#0D1110] border border-[#333] rounded-xl px-4 py-2.5 focus-within:border-[#8BBCAD]/50 transition-colors">
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
                  className="flex items-center gap-1.5 bg-[#8BBCAD] text-[#0D1110] rounded-lg px-3 py-1.5 text-xs font-bold hover:bg-[#a8d900] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={12} />
                  Send
                </button>
              </div>
              <p className="text-[#333333] font-mono text-[9px] mt-1.5 px-1">
                Live AI chat demo — try: "botox price", "book appointment", "iv therapy"
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
