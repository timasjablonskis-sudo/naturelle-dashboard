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

// Reply rules — checked top-to-bottom, first match wins.
// Each rule: [patterns[], response, priority (higher = checked first)]
const REPLY_RULES = [
  // ── Greetings ──
  { patterns: [/^(hi|hey|hello|howdy|good morning|good afternoon|good evening|sup|yo)\b/],
    reply: "Hi there! Welcome to Naturelle Med Spa. I'm the AI assistant — I can answer questions about our treatments, pricing, and availability, or help you book a consultation. What can I help you with?" },

  // ── Booking intent ──
  { patterns: [/\b(book|schedule|appointment|reserve|sign up|come in|visit)\b/],
    reply: "I'd love to help you book! We have availability this week at our Wheaton location — 400 W Liberty Dr Suite B. Do you have a treatment in mind, or would you like a general consultation?" },

  // ── Pricing (general) ──
  { patterns: [/\b(price|pricing|cost|how much|rates|menu|what do you charge)\b/],
    reply: "Here's a quick look at our most popular treatments:\n\n• Neuromodulators (Botox/Dysport) — $12/unit\n• Dermal Fillers — from $550/syringe\n• Sculptra — $750/vial\n• PRP Therapy — from $350\n• Microneedling — from $300\n• Kybella — from $600\n• SkinVive — $450\n\nAnything specific you'd like to know more about?" },

  // ── Specific treatments ──
  { patterns: [/\b(botox|dysport|neuromodulator|tox|wrinkle)/],
    reply: "Neuromodulators like Botox and Dysport start at $12/unit. Most clients need 20–40 units depending on the treatment area — forehead lines, crow's feet, frown lines, etc. Results last about 3–4 months. Our providers specialize in keeping it natural — no frozen look. Would you like to book a consultation?" },

  { patterns: [/\b(sculptra|collagen stimulat)/],
    reply: "Sculptra is one of our most popular treatments — it's a collagen stimulator that rebuilds volume naturally over time. Starting at $750/vial, most clients need 2–3 vials per session. The best part? Results last 2+ years. It's great for cheeks, temples, jawline, and overall facial rejuvenation. Want to learn more or book a consultation?" },

  { patterns: [/\b(filler|lip|cheek|jawline|chin|under.?eye|nasolabial)/],
    reply: "Dermal fillers start at $550/syringe. We use premium hyaluronic acid fillers and treat lips, cheeks, jawline, chin, under-eyes, and nasolabial folds. Results are immediate and last 6–18 months depending on the area. Our approach is all about subtle, natural enhancement. Which area are you interested in?" },

  { patterns: [/\b(microneedling|micro.?needle)/],
    reply: "Microneedling starts at $300/session. It stimulates your skin's natural collagen production for improved texture, tone, and firmness. We also offer PRP-enhanced microneedling for even better results. Most clients do a series of 3 sessions spaced 4–6 weeks apart. Want to book one?" },

  { patterns: [/\b(prp|platelet.?rich plasma)/],
    reply: "PRP therapy uses your body's own growth factors for natural rejuvenation. Sessions start at $350 and take about 45–60 minutes. It's great for skin rejuvenation, fine lines, and even hair restoration. Most clients see visible improvement after 2–3 sessions. Interested in scheduling?" },

  { patterns: [/\b(prf|platelet.?rich fibrin)/],
    reply: "PRF is the next generation of PRP — it releases growth factors over a longer period for enhanced, longer-lasting results. We use it for facial rejuvenation and under-eye treatment. Want to book a consultation to see if PRF is right for your goals?" },

  { patterns: [/\b(kybella|double chin|chin fat|submental)/],
    reply: "Kybella permanently destroys fat cells under the chin — no surgery, no downtime. Most clients see great results in 2–4 sessions spaced about a month apart. Once those fat cells are gone, they don't come back. Starting at $600. Want to schedule a consultation?" },

  { patterns: [/\b(pdo|thread|thread lift|non.?surgical lift)/],
    reply: "PDO Threads are a non-surgical lift for the jawline, cheeks, neck, and brows. The threads dissolve naturally over time while stimulating collagen production — so you get an immediate lift plus ongoing improvement. Results last 12–18 months. Starting at $800. Want to learn more?" },

  { patterns: [/\b(skinvive|skin.?vive|skin quality|glow|hydrat)/],
    reply: "SkinVive is an injectable skin quality treatment at $450. It improves hydration, smoothness, and gives you a natural glow from within. Most clients see visible results within 2 weeks, and they last about 6 months. It's one of our most-requested treatments. Want to try it?" },

  { patterns: [/\b(b12|vitamin|energy|metabolism)/],
    reply: "Vitamin B12 injections are just $35 — quick and easy, takes a few minutes. Great for energy, metabolism, and overall wellness. A lot of our clients add it on to their regular treatments. Want to add one to your next visit?" },

  // ── Common questions ──
  { patterns: [/\b(where|location|address|directions|find you)\b/],
    reply: "We're located at 400 W Liberty Dr Suite B, Wheaton, IL 60187. Easy to find with parking available. Our hours are Monday–Saturday. Would you like to schedule a visit?" },

  { patterns: [/\b(hour|open|close|when are you|availability|what time)\b/],
    reply: "We're open Monday through Saturday. We have morning, afternoon, and some evening availability depending on the day. When works best for you?" },

  { patterns: [/\b(phone|call|number|contact)\b/],
    reply: "You can reach us at (773) 592-9781, or I can help you right here! Would you like to book a consultation or have questions about a specific treatment?" },

  { patterns: [/\b(service|treatment|offer|do you do|what do you|menu|option)\b/],
    reply: "We offer a full range of aesthetic treatments:\n\n• Neuromodulators (Botox/Dysport)\n• Dermal Fillers (lips, cheeks, jawline)\n• Sculptra\n• PRP & PRF Therapy\n• PDO Thread Lifts\n• Kybella\n• Microneedling\n• SkinVive\n• Vitamin B12 Injections\n\nAll focused on natural-looking results. Anything catch your eye?" },

  { patterns: [/\b(hurt|pain|painful|does it hurt|uncomfortable)\b/],
    reply: "Most of our treatments involve minimal discomfort. We use topical numbing for injectables, and most clients describe it as a slight pinch. Our providers go at your pace and make sure you're comfortable throughout. Which treatment are you asking about?" },

  { patterns: [/\b(safe|side effect|risk|recovery|downtime|heal)\b/],
    reply: "All of our treatments are FDA-approved with excellent safety profiles. Downtime varies — injectables like Botox and fillers have minimal to no downtime, while treatments like microneedling may have a day or two of redness. Our providers will walk you through everything during your consultation. Which treatment are you curious about?" },

  { patterns: [/\b(first time|never done|new to|beginner|nervous|scared)\b/],
    reply: "No worries at all — many of our clients are first-timers! That's exactly what the consultation is for. Our providers will assess your goals, explain everything in detail, answer all your questions, and create a personalized plan. No pressure, no commitment. Would you like to schedule one?" },

  { patterns: [/\b(thank|thanks|awesome|great|perfect|sounds good|cool)\b/],
    reply: "You're welcome! If you have any other questions or want to book, I'm right here. We'd love to see you at Naturelle Med Spa!" },

  { patterns: [/\b(yes|yeah|yep|sure|definitely|absolutely|let'?s do it)\b/],
    reply: "Great! We have availability this week at our Wheaton location. What day and time works best for you? Morning, afternoon, or evening?" },

  { patterns: [/\b(no|not right now|maybe later|i'll think|not sure)\b/],
    reply: "No rush at all! We're here whenever you're ready. Feel free to message us anytime with questions — we'd love to help you feel your most confident." },

  { patterns: [/\b(consult|consultation|assessment|evaluation)\b/],
    reply: "Our consultations are complimentary! It's a one-on-one assessment with one of our providers where we'll discuss your aesthetic goals and recommend the best treatment plan. Takes about 15–20 minutes. No obligation. Would you like to schedule one?" },

  { patterns: [/\b(insurance|cover|accept)\b/],
    reply: "Aesthetic treatments are typically not covered by insurance since they're elective procedures. However, we do offer flexible payment options to make treatments accessible. Want to discuss pricing for a specific treatment?" },

  { patterns: [/\b(payment|pay|finance|plan|afford)\b/],
    reply: "We want to make sure our treatments are accessible. We accept all major credit cards and can discuss flexible payment arrangements during your consultation. Which treatment are you interested in? I can give you exact pricing." },
]

function getAIReply(input) {
  const lower = input.toLowerCase().trim()
  for (const rule of REPLY_RULES) {
    if (rule.patterns.some(p => p.test(lower))) return rule.reply
  }
  return "Thanks for reaching out! I'd be happy to help. Are you looking for information about a specific treatment, pricing, or would you like to book a consultation at our Wheaton location?"
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
