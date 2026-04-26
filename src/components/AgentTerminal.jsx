import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Terminal, ChevronUp, ChevronDown } from 'lucide-react'

const LOG_ENTRIES = [
  { tag: 'webhook', color: '#10b981', text: 'POST /lead → { name: "Olivia K.", source: "instagram" }' },
  { tag: 'ai-agent', color: '#059669', text: 'Processing lead → matching to service: Botox' },
  { tag: 'ai-agent', color: '#059669', text: 'Confidence: 94% → auto-qualifying lead' },
  { tag: 'scheduler', color: '#a78bfa', text: 'Checking availability → Thu 2:00 PM open' },
  { tag: 'scheduler', color: '#a78bfa', text: 'Booking confirmed → Thu 2:00 PM — Botox Consultation' },
  { tag: 'sms', color: '#10b981', text: 'Text-back sent → +1 (630) 555-0142 (8.2s response)' },
  { tag: 'email', color: '#f59e0b', text: 'Dispatching follow-up → olivia.k@gmail.com' },
  { tag: 'webhook', color: '#10b981', text: 'POST /missed-call → { caller: "Sarah M.", service: "Laser" }' },
  { tag: 'ai-agent', color: '#059669', text: 'Missed call recovery initiated → composing SMS' },
  { tag: 'sms', color: '#10b981', text: 'Recovery text sent → +1 (630) 555-0198 (6.1s)' },
  { tag: 'review', color: '#f59e0b', text: 'New 5★ Google review detected → auto-responding' },
  { tag: 'ai-agent', color: '#059669', text: 'Thank-you response posted → "Mia, thank you so much!"' },
]

function getTimestamp() {
  const now = new Date()
  return now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export default function AgentTerminal({ simRunning }) {
  const [expanded, setExpanded] = useState(false)
  const [lines, setLines] = useState([])
  const [typingLine, setTypingLine] = useState(null)
  const scrollRef = useRef(null)
  const indexRef = useRef(0)
  const timerRef = useRef(null)
  const typeTimerRef = useRef(null)

  const addLine = useCallback(() => {
    const entry = LOG_ENTRIES[indexRef.current % LOG_ENTRIES.length]
    indexRef.current++
    const fullText = `[${entry.tag}] ${entry.text}`
    const timestamp = getTimestamp()

    // Start typewriter
    setTypingLine({ tag: entry.tag, color: entry.color, timestamp, text: '', fullText, charIndex: 0 })
  }, [])

  // Typewriter effect
  useEffect(() => {
    if (!typingLine) return
    if (typingLine.charIndex >= typingLine.fullText.length) {
      // Done typing — move to lines
      setLines((prev) => [...prev.slice(-50), { ...typingLine, text: typingLine.fullText }])
      setTypingLine(null)
      return
    }
    typeTimerRef.current = setTimeout(() => {
      setTypingLine((prev) => prev ? { ...prev, text: prev.fullText.slice(0, prev.charIndex + 1), charIndex: prev.charIndex + 1 } : null)
    }, 12)
    return () => clearTimeout(typeTimerRef.current)
  }, [typingLine])

  // Schedule new lines
  useEffect(() => {
    const interval = simRunning ? (2000 + Math.random() * 1500) : (5000 + Math.random() * 3000)
    timerRef.current = setTimeout(() => {
      addLine()
      // Re-schedule
    }, interval)
    return () => clearTimeout(timerRef.current)
  }, [lines, simRunning, addLine])

  // Initial line
  useEffect(() => {
    const t = setTimeout(addLine, 1000)
    return () => clearTimeout(t)
  }, [addLine])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines, typingLine])

  // Toggle with backtick
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`' && !e.metaKey && !e.ctrlKey) {
        const tag = e.target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA') return
        e.preventDefault()
        setExpanded((v) => !v)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const renderLine = (line, isTyping = false) => (
    <div className="flex gap-2 leading-relaxed" key={isTyping ? 'typing' : line.timestamp + line.text.slice(0, 10)}>
      <span className="text-zinc-600 flex-shrink-0">{line.timestamp}</span>
      <span style={{ color: line.color }} className="flex-shrink-0">[{line.tag}]</span>
      <span className="text-zinc-300">
        {line.text.replace(`[${line.tag}] `, '')}
        {isTyping && <span className="inline-block w-[6px] h-[14px] bg-primary ml-0.5 animate-pulse" />}
      </span>
    </div>
  )

  return (
    <div className="fixed bottom-[72px] left-0 right-0 z-30">
      {/* Expanded terminal — above the bar so it opens upward */}
      {expanded && (
        <div
          className="border-t border-white/[0.06] overflow-hidden"
          style={{ background: 'rgba(9,9,11,0.97)', backdropFilter: 'blur(24px)' }}
        >
          <div
            ref={scrollRef}
            className="h-[260px] overflow-y-auto px-4 py-3 font-mono text-[11px] space-y-1 terminal-scroll"
          >
            {lines.map((line) => renderLine(line))}
            {typingLine && renderLine(typingLine, true)}
          </div>
        </div>
      )}

      {/* Collapsed bar */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full h-9 flex items-center gap-2 px-4 border-t border-white/[0.06] backdrop-blur-xl transition-colors hover:bg-white/[0.02]"
        style={{ background: 'rgba(24,24,27,0.95)' }}
      >
        <Terminal size={12} className="text-primary" />
        <span className="font-mono text-[10px] text-zinc-400 tracking-wider">AI TERMINAL</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        <kbd className="ml-auto text-[9px] font-mono text-zinc-600 bg-white/5 border border-white/10 rounded px-1 py-0.5">`</kbd>
        {expanded ? <ChevronDown size={12} className="text-zinc-500" /> : <ChevronUp size={12} className="text-zinc-500" />}
      </button>
    </div>
  )
}
