import React from 'react'
import { PhoneMissed, Zap, CheckCircle2, Clock, MessageSquare } from 'lucide-react'

const calls = [
  {
    name: 'Sarah M.',
    time: '7:42 PM',
    topic: 'Botox',
    aiResponse: 'Hi Sarah! Thanks for contacting Intu Med Spa. We saw you called about Botox. Would you like to book a consultation this week?',
    status: 'Consultation Booked',
    responseTime: '8 seconds',
  },
  {
    name: 'Michael T.',
    time: '6:15 PM',
    topic: 'Weight Loss',
    aiResponse: 'Hi Michael! You called about our GLP-1 weight loss program. Starting at $189/month. Want to book a free consultation?',
    status: 'Follow-up Sent',
    responseTime: '6 seconds',
  },
  {
    name: 'Jennifer K.',
    time: '5:30 PM',
    topic: 'HydraFacial',
    aiResponse: 'Hi Jennifer! You missed a call to Intu Med Spa. Our HydraFacials start at $175. Ready to book?',
    status: 'Consultation Booked',
    responseTime: '9 seconds',
  },
  {
    name: 'David R.',
    time: '4:48 PM',
    topic: 'IV Therapy',
    aiResponse: 'Hi David! Intu Med Spa here. Our IV therapy sessions start at $99. Want to schedule?',
    status: 'Replied',
    responseTime: '7 seconds',
  },
  {
    name: 'Lisa W.',
    time: '3:22 PM',
    topic: 'Lip Fillers',
    aiResponse: 'Hi Lisa! We saw you called about lip fillers at Intu Med Spa, starting at $550. Shall we book a consult?',
    status: 'Consultation Booked',
    responseTime: '5 seconds',
  },
  {
    name: 'Marcus H.',
    time: '2:10 PM',
    topic: 'Botox',
    aiResponse: 'Hi Marcus! Intu Med Spa here — we have a current Botox special: 20 units for $179. Book this week?',
    status: 'Follow-up Sent',
    responseTime: '11 seconds',
  },
]

const statusStyle = {
  'Consultation Booked': 'bg-[#8BBCAD]/10 text-[#8BBCAD] border-[#8BBCAD]/30',
  'Follow-up Sent': 'bg-[#C9A87C]/10 text-[#C9A87C] border-[#C9A87C]/30',
  'Replied': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
}

const topicColor = {
  'Botox': '#8BBCAD',
  'Weight Loss': '#f59e0b',
  'HydraFacial': '#8BBCAD',
  'IV Therapy': '#a78bfa',
  'Lip Fillers': '#f472b6',
}

export default function MissedCalls({ simMissedCalls = [] }) {
  const liveCalls = [
    ...simMissedCalls.map((mc) => ({
      name: mc.name,
      time: mc.time,
      topic: mc.service,
      aiResponse: mc.aiResponse || `Hi ${mc.name.split(' ')[0]}! You called about ${mc.service} at Intu Med Spa. Want to book an appointment?`,
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
          <div className="flex items-center gap-2 bg-[#8BBCAD]/10 border border-[#8BBCAD]/30 rounded-xl px-4 py-2">
            <CheckCircle2 size={14} className="text-[#8BBCAD]" />
            <span className="text-[#8BBCAD] font-mono text-xs font-bold">12 CALLS RECOVERED TODAY</span>
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
          <div key={i} className={`bg-[#131918] border rounded-xl p-4 hover:border-[#333] transition-colors ${call.isNew ? 'border-[#8BBCAD]/30' : 'border-[#1E2B28]'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#0D1110] font-bold text-sm flex-shrink-0"
                  style={{ background: topicColor[call.topic] || '#8BBCAD' }}
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
                      style={{ color: topicColor[call.topic], background: (topicColor[call.topic] || '#8BBCAD') + '18' }}
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
                <div className="w-4 h-4 rounded-full bg-[#8BBCAD] flex items-center justify-center">
                  <MessageSquare size={9} className="text-[#0D1110]" />
                </div>
                <span className="text-[#8BBCAD] font-mono text-[9px] font-bold">AI RESPONSE</span>
              </div>
              <p className="text-[#cccccc] text-xs leading-relaxed">{call.aiResponse}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
