import React from 'react'
import { PhoneMissed, Zap, CheckCircle2, Clock, MessageSquare } from 'lucide-react'

const calls = [
  {
    name: 'Sarah M.',
    time: '7:42 PM',
    topic: 'Botox',
    aiResponse: 'Hi Sarah! Thanks for contacting Wishful Beauty Med Spa. We saw you called about Botox. Would you like to book a consultation this week?',
    status: 'Consultation Booked',
    responseTime: '8 seconds',
  },
  {
    name: 'Michael T.',
    time: '6:15 PM',
    topic: 'Microneedling',
    aiResponse: 'Hi Michael! You called about microneedling at Wishful Beauty. Sessions start at $250. Want to book a free consultation?',
    status: 'Follow-up Sent',
    responseTime: '6 seconds',
  },
  {
    name: 'Jennifer K.',
    time: '5:30 PM',
    topic: 'HydraFacial',
    aiResponse: 'Hi Jennifer! You missed a call to Wishful Beauty Med Spa. Our HydraFacials start at $175. Ready to book?',
    status: 'Consultation Booked',
    responseTime: '9 seconds',
  },
  {
    name: 'David R.',
    time: '4:48 PM',
    topic: 'Laser Hair Removal',
    aiResponse: 'Hi David! Wishful Beauty Med Spa here. Our laser hair removal sessions start at $99. Want to schedule?',
    status: 'Replied',
    responseTime: '7 seconds',
  },
  {
    name: 'Lisa W.',
    time: '3:22 PM',
    topic: 'Lip Fillers',
    aiResponse: 'Hi Lisa! We saw you called about lip fillers at Wishful Beauty Med Spa, starting at $550. Shall we book a consult?',
    status: 'Consultation Booked',
    responseTime: '5 seconds',
    sequence: [
      { touch: 1, delay: '2 hrs', message: 'Hey — saw you were checking out lip filler pricing. Any questions? I can help right now.', badge: 'Opened' },
      { touch: 2, delay: '24 hrs', message: 'Still thinking it over? Here\'s what clients say about their first visit: "Absolutely love my results — natural and beautiful!" Want to grab a time?', badge: 'Replied' },
      { touch: 3, delay: '72 hrs', message: 'Last chance — we have openings this week. Want me to grab you a spot?', badge: 'Booked ✓' },
    ],
  },
  {
    name: 'Marcus H.',
    time: '2:10 PM',
    topic: 'Botox',
    aiResponse: 'Hi Marcus! Wishful Beauty Med Spa here — we have a current Botox special: 20 units for $179. Book this week?',
    status: 'Follow-up Sent',
    responseTime: '11 seconds',
  },
]

const statusStyle = {
  'Consultation Booked': 'bg-[#c4688a]/10 text-[#c4688a] border-[#c4688a]/30',
  'Follow-up Sent': 'bg-[#C9A87C]/10 text-[#C9A87C] border-[#C9A87C]/30',
  'Replied': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
}

const topicColor = {
  'Botox': '#c4688a',
  'Microneedling': '#f59e0b',
  'HydraFacial': '#e6d5b8',
  'Laser Hair Removal': '#a78bfa',
  'Lip Fillers': '#f472b6',
}

export default function MissedCalls({ simMissedCalls = [] }) {
  const liveCalls = [
    ...simMissedCalls.map((mc) => ({
      name: mc.name,
      time: mc.time,
      topic: mc.service,
      aiResponse: mc.aiResponse || `Hi ${mc.name.split(' ')[0]}! You called about ${mc.service} at Wishful Beauty Med Spa. Want to book an appointment?`,
      status: mc.status,
      responseTime: '8 seconds',
      isNew: mc.isNew,
    })),
    ...calls,
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl text-white tracking-wide">Missed Call Recovery</h2>
          <p className="text-[#4a6560] text-sm mt-0.5">AI texts back within seconds. No lead left behind.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#c4688a]/10 border border-[#c4688a]/30 rounded-xl px-4 py-2">
            <CheckCircle2 size={14} className="text-[#c4688a]" />
            <span className="text-[#c4688a] font-mono text-xs font-bold">12 CALLS RECOVERED TODAY</span>
          </div>
          <div className="flex items-center gap-2 bg-[#0D1110] border border-[#333] rounded-xl px-4 py-2">
            <Zap size={14} className="text-[#f59e0b]" />
            <span className="text-[#f59e0b] font-mono text-xs">AVG 8 SEC RESPONSE</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Missed Calls',       value: '14' },
          { label: 'AI Responded',       value: '12' },
          { label: 'Bookings Generated', value: '7'  },
          { label: 'Recovery Rate',      value: '86%'},
        ].map((s) => (
          <div key={s.label} className="bg-[#131918] border border-[#1E2B28] rounded-xl p-4 text-center">
            <div className="font-display text-3xl text-white">{s.value}</div>
            <div className="text-[#4a6560] font-mono text-[10px] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Call Cards */}
      <div className="grid grid-cols-2 gap-4">
        {liveCalls.map((call, i) => (
          <div key={i} className={`bg-[#131918] border rounded-xl p-4 hover:border-[#333] transition-colors ${call.isNew ? 'border-[#c4688a]/30' : 'border-[#1E2B28]'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#0D1110] font-bold text-sm flex-shrink-0"
                  style={{ background: topicColor[call.topic] || '#c4688a' }}
                >
                  {call.name[0]}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{call.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1 text-[#4a6560] font-mono text-[10px]">
                      <Clock size={10} />
                      {call.time}
                    </span>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                      style={{ color: topicColor[call.topic], background: (topicColor[call.topic] || '#c4688a') + '18' }}
                    >
                      {call.topic}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${statusStyle[call.status]}`}>
                  {call.status}
                </span>
                <span className="flex items-center gap-1 text-[#f59e0b] font-mono text-[9px]">
                  <Zap size={9} />
                  {call.responseTime}
                </span>
              </div>
            </div>

            {/* AI Response bubble */}
            <div className="bg-[#0D1110] border border-[#2a3632] rounded-lg p-3 relative">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-4 h-4 rounded-full bg-[#c4688a] flex items-center justify-center">
                  <MessageSquare size={9} className="text-[#0D1110]" />
                </div>
                <span className="text-[#c4688a] font-mono text-[9px] font-bold">AI RESPONSE</span>
              </div>
              <p className="text-[#cccccc] text-xs leading-relaxed">{call.aiResponse}</p>
            </div>

            {/* 3-Touch SMS Abandonment Sequence */}
            {call.sequence && (
              <div className="mt-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap size={9} className="text-[#f59e0b]" />
                  <span className="text-[#f59e0b] font-mono text-[9px] font-bold">3-TOUCH RECOVERY SEQUENCE</span>
                </div>
                <div className="space-y-1.5">
                  {call.sequence.map((touch) => {
                    const badgeColor = touch.badge === 'Booked ✓'
                      ? 'bg-[#c4688a]/15 text-[#c4688a] border-[#c4688a]/30'
                      : touch.badge === 'Replied'
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20'
                    return (
                      <div key={touch.touch} className="bg-[#0a0f0d] border border-[#1a2420] rounded-lg px-3 py-2 flex items-start gap-2">
                        <span className="text-[#3a5550] font-mono text-[9px] w-12 flex-shrink-0 mt-0.5">T{touch.touch} · {touch.delay}</span>
                        <p className="text-[#8a9e99] text-[10px] leading-relaxed flex-1">{touch.message}</p>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full border flex-shrink-0 ${badgeColor}`}>{touch.badge}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
