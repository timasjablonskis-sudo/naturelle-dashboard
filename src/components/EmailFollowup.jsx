import React, { useState } from 'react'
import { Mail, CheckCircle2, Eye } from 'lucide-react'

const staticEmails = [
  {
    to: 'Emily R.',
    service: 'Botox',
    subject: 'Your complimentary Botox consultation at Wishful Beauty Med Spa',
    timestamp: '3m ago',
    status: 'Opened',
    body: `Hi Emily,\n\nThank you for your interest in Botox at Wishful Beauty Med Spa! We wanted to personally reach out and make sure you have everything you need to take the next step.\n\nBotox at Wishful Beauty Med Spa starts at just $12/unit, and we're currently running a special: 20 units for $179. Our board-certified providers will assess your goals and create a personalized treatment plan during a complimentary consultation.\n\nWe have availability this week — Tuesday and Thursday 10am–7pm, and Saturday 10am–2pm. Book your free consultation today and get the look you've been thinking about.`,
  },
  {
    to: 'Michael B.',
    service: 'HydraFacial',
    subject: 'Glow up with a HydraFacial — book this week',
    timestamp: '12m ago',
    status: 'Opened',
    body: `Hi Michael,\n\nThank you for reaching out about HydraFacials at Wishful Beauty Med Spa. We're excited to share more!\n\nA HydraFacial deeply cleanses, exfoliates, and hydrates your skin — leaving you glowing for weeks. Sessions start at $175 and take just 45 minutes. Most clients see instant results after their very first treatment.\n\nWe have slots open this week. Don't wait — your skin will thank you. Click below to lock in your appointment.`,
  },
  {
    to: 'Rachel K.',
    service: 'Botox',
    subject: 'Still thinking about Botox? Here\'s what to expect',
    timestamp: '1h ago',
    status: 'Delivered',
    body: `Hi Rachel,\n\nWe noticed you inquired about Botox recently and wanted to follow up with some helpful info.\n\nBotox is one of our most popular treatments — quick, virtually painless, and results last 3–4 months. At Wishful Beauty Med Spa, we offer Botox starting at $12/unit with a current promo of 20 units for $179.\n\nIf you have any questions or want to see before/afters, we're happy to chat. Otherwise, book your free consultation below — we'd love to help you look and feel your best.`,
  },
  {
    to: 'James T.',
    service: 'Microneedling',
    subject: 'Your skin transformation starts here',
    timestamp: '2h ago',
    status: 'Opened',
    body: `Hi James,\n\nThank you for your interest in microneedling at Wishful Beauty Med Spa. It's one of our most popular treatments — and for good reason.\n\nMicroneedling stimulates your skin's natural collagen production, reducing fine lines, acne scars, and uneven texture. We offer standard and PRP-enhanced sessions starting at $250. Most clients see visible improvement after just 2–3 sessions.\n\nBook a free consultation and our team will assess your skin goals and recommend the best treatment plan for you.`,
  },
]

function getEmailBody(email) {
  if (email.body) return email.body
  return `Hi ${email.to.split(' ')[0]},\n\nThank you for your interest in ${email.service} at Wishful Beauty Med Spa. We wanted to personally reach out and make sure you have all the information you need.\n\nWe offer ${email.service} with personalized treatment plans designed for your goals. Book a free consultation and our team will walk you through pricing, availability, and what to expect.\n\nWe look forward to hearing from you!`
}

export default function EmailFollowup({ simEmails = [], simStarted = false }) {
  const allEmails = [...simEmails.map((e) => ({ ...e, status: 'Delivered', timestamp: 'Just now', isNew: true })), ...staticEmails]
  const [selectedIdx, setSelectedIdx] = useState(0)
  const selected = allEmails[selectedIdx]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl text-white tracking-wide">Email Follow-Up Automation</h2>
          <p className="text-[#4a6560] text-sm mt-0.5">Sent within 60 seconds of inquiry — automatically.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#131918] border border-[#1E2B28] rounded-xl px-4 py-2">
            <Mail size={13} className="text-[#c4688a]" />
            <span className="text-[#c4688a] font-mono text-xs font-bold">{allEmails.length} EMAILS SENT TODAY</span>
          </div>
          <div className="flex items-center gap-2 bg-[#131918] border border-[#1E2B28] rounded-xl px-4 py-2">
            <Eye size={13} className="text-[#C9A87C]" />
            <span className="text-[#C9A87C] font-mono text-xs">75% OPEN RATE</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Emails Sent Today', value: allEmails.length.toString() },
          { label: 'Opened', value: `${allEmails.filter((e) => e.status === 'Opened').length}` },
          { label: 'Open Rate', value: '75%' },
          { label: 'Avg Send Time', value: '< 60s' },
        ].map((s) => (
          <div key={s.label} className="bg-[#131918] border border-[#1E2B28] rounded-xl p-4 text-center">
            <div className="font-display text-3xl text-white">{s.value}</div>
            <div className="text-[#4a6560] font-mono text-[10px] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Main panel */}
      <div className="flex gap-4 h-[520px]">
        {/* Email list */}
        <div className="w-[280px] bg-[#131918] border border-[#1E2B28] rounded-xl flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-[#1E2B28]">
            <span className="text-[#6a8a85] font-mono text-[10px]">SENT FOLLOW-UPS</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {!simStarted && allEmails.length === staticEmails.length ? (
              allEmails.map((email, i) => (
                <EmailListItem key={i} email={email} active={selectedIdx === i} onClick={() => setSelectedIdx(i)} />
              ))
            ) : (
              allEmails.map((email, i) => (
                <EmailListItem key={i} email={email} active={selectedIdx === i} onClick={() => setSelectedIdx(i)} isNew={email.isNew} />
              ))
            )}
          </div>
        </div>

        {/* Email viewer */}
        <div className="flex-1 bg-[#131918] border border-[#1E2B28] rounded-xl flex flex-col overflow-hidden">
          {/* Email header bar */}
          <div className="px-5 py-3 border-b border-[#1E2B28] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail size={14} style={{ color: 'var(--accent)' }} />
              <span className="text-white font-medium text-sm">{selected.subject}</span>
            </div>
            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
              selected.status === 'Opened'
                ? 'bg-[#c4688a]/10 text-[#c4688a] border-[#c4688a]/30'
                : 'bg-[#C9A87C]/10 text-[#C9A87C] border-[#C9A87C]/30'
            }`}>
              {selected.status === 'Opened' ? <><Eye size={9} className="inline mr-1" />Opened</> : 'Delivered'}
            </span>
          </div>

          {/* Email rendered card */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-[600px] mx-auto rounded-xl overflow-hidden shadow-xl">
              {/* Email top bar */}
              <div className="px-8 py-4" style={{ background: '#c4688a' }}>
                <div className="font-display text-xl text-[#0D1110] tracking-wide">Wishful Beauty Med Spa</div>
                <div className="text-[#1a3a30] text-xs font-mono mt-0.5">AI-Powered Follow-Up</div>
              </div>

              {/* Email body */}
              <div className="bg-white px-8 py-6">
                {/* Meta */}
                <div className="mb-5 pb-4 border-b border-[#f0f0f0]">
                  <div className="flex items-center gap-2 text-xs text-[#666] mb-1">
                    <span className="font-medium text-[#333]">From:</span>
                    <span>Wishful Beauty Med Spa &lt;hello@wishfulbeautymedspa.com&gt;</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#666] mb-1">
                    <span className="font-medium text-[#333]">To:</span>
                    <span>{selected.to}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#666]">
                    <span className="font-medium text-[#333]">Subject:</span>
                    <span className="font-semibold text-[#1a1a1a]">{selected.subject}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="text-[#1a1a1a] text-sm leading-relaxed space-y-3">
                  {getEmailBody(selected).split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6 text-center">
                  <a
                    href="#"
                    className="inline-block px-6 py-3 rounded-lg text-white text-sm font-semibold"
                    style={{ background: '#c4688a' }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Book Your Consultation
                  </a>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-5 border-t border-[#f0f0f0] text-center text-[#999] text-[11px]">
                  <div className="font-semibold text-[#555] mb-1">Wishful Beauty Med Spa</div>
                  <div>3433 Kirchoff Rd, Rolling Meadows IL · (630) 284-0212</div>
                  <div className="mt-1">
                    <a href="#" className="text-[#c4688a] underline" onClick={(e) => e.preventDefault()}>Unsubscribe</a>
                    {' · '}
                    <a href="#" className="text-[#c4688a] underline" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmailListItem({ email, active, onClick, isNew = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-[#1a2420] hover:bg-[#0D1110] transition-colors ${
        active ? 'bg-[#0D1110] border-l-2 border-l-[#c4688a]' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#0D1110] font-bold text-sm flex-shrink-0"
          style={{ background: '#c4688a' }}
        >
          {email.to[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-white text-sm font-medium truncate">{email.to}</span>
            <span className="text-[#3a5550] font-mono text-[10px] flex-shrink-0">{email.timestamp}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[#c4688a] font-mono text-[9px]">{email.service}</span>
            {isNew && (
              <span className="text-[9px] font-mono px-1 py-0.5 rounded animate-pulse" style={{ background: 'rgba(196,104,138,0.15)', color: 'var(--accent)', border: '1px solid rgba(196,104,138,0.3)' }}>
                ✦ NEW
              </span>
            )}
          </div>
          <p className="text-[#4a6560] text-xs truncate mt-0.5">{email.subject}</p>
          <span className={`inline-block mt-1 text-[9px] font-mono px-1.5 py-0.5 rounded ${
            email.status === 'Opened'
              ? 'bg-[#c4688a]/10 text-[#c4688a]'
              : 'bg-[#C9A87C]/10 text-[#C9A87C]'
          }`}>
            {email.status}
          </span>
        </div>
      </div>
    </button>
  )
}
