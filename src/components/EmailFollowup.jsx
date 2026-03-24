import React, { useState } from 'react'
import { Mail, Eye } from 'lucide-react'
import { cn } from '../lib/utils'
import { emailLeads, emailOpenRate } from '../data/stats'

const staticEmails = emailLeads.map(l => ({
  to: l.name,
  service: l.service,
  subject: l.emailFollowup.subject,
  timestamp: l.emailFollowup.timestamp,
  status: l.emailFollowup.status,
  body: l.emailFollowup.body,
}))

function getEmailBody(email) {
  if (email.body) return email.body
  return `Hi ${email.to.split(' ')[0]},\n\nThank you for your interest in ${email.service} at Naturelle Med Spa. We wanted to personally reach out and make sure you have all the information you need.\n\nWe offer ${email.service} with personalized treatment plans designed for your goals. Book a free consultation and our team will walk you through pricing, availability, and what to expect.\n\nWe look forward to hearing from you!`
}

export default function EmailFollowup({ simEmails = [], simStarted = false }) {
  const allEmails = [...simEmails.map((e) => ({ ...e, status: 'Delivered', timestamp: 'Just now', isNew: true })), ...staticEmails]
  const [selectedIdx, setSelectedIdx] = useState(0)
  const selected = allEmails[selectedIdx]

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">Email Follow-Up Automation</h2>
          <p className="text-zinc-500 text-sm mt-0.5">Sent within 60 seconds of inquiry — automatically.</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-surface-1 border border-white/10 rounded-xl px-3 md:px-4 py-2">
            <Mail size={13} className="text-primary" />
            <span className="text-primary font-mono text-xs font-bold">{allEmails.length} EMAILS SENT TODAY</span>
          </div>
          <div className="flex items-center gap-2 bg-surface-1 border border-white/10 rounded-xl px-3 md:px-4 py-2">
            <Eye size={13} className="text-emerald-400" />
            <span className="text-emerald-400 font-mono text-xs">{emailOpenRate}% OPEN RATE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Emails Sent Today', value: allEmails.length.toString() },
          { label: 'Opened', value: `${allEmails.filter((e) => e.status === 'Opened').length}` },
          { label: 'Open Rate', value: `${emailOpenRate}%` },
          { label: 'Avg Send Time', value: '< 60s' },
        ].map((s) => (
          <div key={s.label} className="bg-surface-1 border border-white/10 rounded-xl p-4 text-center">
            <div className="font-semibold text-3xl text-white tracking-tight">{s.value}</div>
            <div className="text-zinc-500 font-mono text-[10px] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[520px]">
        <div className="w-full md:w-[280px] bg-surface-1 border border-white/10 rounded-xl flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <span className="text-zinc-500 font-mono text-[10px]">SENT FOLLOW-UPS</span>
          </div>
          <div className="max-h-[180px] md:max-h-none flex-1 overflow-y-auto">
            {allEmails.map((email, i) => (
              <button
                key={i}
                onClick={() => setSelectedIdx(i)}
                className={cn(
                  'w-full text-left px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors',
                  selectedIdx === i && 'bg-white/[0.03] border-l-2 border-l-primary'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 bg-primary">
                    {email.to[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-white text-sm font-medium truncate">{email.to}</span>
                      <span className="text-zinc-600 font-mono text-[10px] flex-shrink-0">{email.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-primary font-mono text-[9px]">{email.service}</span>
                      {email.isNew && (
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded animate-pulse bg-primary/15 text-primary border border-primary/30">NEW</span>
                      )}
                    </div>
                    <p className="text-zinc-500 text-xs truncate mt-0.5">{email.subject}</p>
                    <span className={cn('inline-block mt-1 text-[9px] font-mono px-1.5 py-0.5 rounded',
                      email.status === 'Opened' ? 'bg-primary/10 text-primary' : 'bg-amber-500/10 text-amber-400'
                    )}>
                      {email.status}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-surface-1 border border-white/10 rounded-xl flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-primary" />
              <span className="text-white font-medium text-sm">{selected.subject}</span>
            </div>
            <span className={cn('text-[9px] font-mono px-2 py-0.5 rounded-full border',
              selected.status === 'Opened' ? 'bg-primary/10 text-primary border-primary/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            )}>
              {selected.status === 'Opened' ? <><Eye size={9} className="inline mr-1" />Opened</> : 'Delivered'}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 md:p-6">
            <div className="max-w-[600px] mx-auto rounded-xl overflow-hidden shadow-xl">
              <div className="px-4 md:px-8 py-4 bg-primary">
                <div className="font-semibold text-xl text-white tracking-tight">Naturelle Med Spa</div>
                <div className="text-emerald-200 text-xs font-mono mt-0.5">AI-Powered Follow-Up</div>
              </div>
              <div className="bg-white px-4 md:px-8 py-6">
                <div className="mb-5 pb-4 border-b border-[#f0f0f0]">
                  <div className="flex items-center gap-2 text-xs text-[#666] mb-1">
                    <span className="font-medium text-[#333]">From:</span>
                    <span>Naturelle Med Spa &lt;hello@naturellemedspa.com&gt;</span>
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
                <div className="text-[#1a1a1a] text-sm leading-relaxed space-y-3">
                  {getEmailBody(selected).split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a href="#" className="inline-block px-6 py-3 rounded-lg text-white text-sm font-semibold bg-primary" onClick={(e) => e.preventDefault()}>
                    Book Your Consultation
                  </a>
                </div>
                <div className="mt-8 pt-5 border-t border-[#f0f0f0] text-center text-[#999] text-[11px]">
                  <div className="font-semibold text-[#555] mb-1">Naturelle Med Spa</div>
                  <div>400 W Liberty Dr Suite B, Wheaton, IL 60187 · (773) 592-9781</div>
                  <div className="mt-1">
                    <a href="#" className="text-emerald-500 underline" onClick={(e) => e.preventDefault()}>Unsubscribe</a>
                    {' · '}
                    <a href="#" className="text-emerald-500 underline" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
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
