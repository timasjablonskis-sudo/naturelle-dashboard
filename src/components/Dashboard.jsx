import React from 'react'
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts'
import { Users, Calendar, PhoneMissed, DollarSign, TrendingUp, ArrowUpRight, Play, RotateCcw, Zap, Sparkles } from 'lucide-react'

const weekData = [
  { day: 'Mon', leads: 28 },
  { day: 'Tue', leads: 35 },
  { day: 'Wed', leads: 31 },
  { day: 'Thu', leads: 42 },
  { day: 'Fri', leads: 38 },
  { day: 'Sat', leads: 44 },
  { day: 'Sun', leads: 42 },
]

const channelData = [
  { channel: 'Website', bookings: 8 },
  { channel: 'Instagram', bookings: 5 },
  { channel: 'SMS', bookings: 3 },
  { channel: 'Email', bookings: 2 },
]

const funnelSteps = [
  { label: 'Leads',         pct: 100, base: 42  },
  { label: 'Conversations', pct: 74,  base: 31  },
  { label: 'Consultations', pct: 52,  base: 22  },
  { label: 'Booked',        pct: 38,  base: 16  },
]

const STATIC_FEED = [
  { icon: '🤖', text: 'AI booked Botox consultation for Emily R.', time: '2m ago' },
  { icon: '📞', text: 'Missed call recovered → Sarah L. booked Weight Loss consult', time: '8m ago' },
  { icon: '💬', text: 'Instagram DM converted → Anna T. booked IV Therapy', time: '15m ago' },
  { icon: '📧', text: 'Follow-up email sent to 4 leads — 2 opened within 5 min', time: '22m ago' },
  { icon: '⭐', text: 'AI responded to 2-star review from Jessica L.', time: '31m ago' },
  { icon: '🤖', text: 'AI booked Lip Filler consult for Jessica M.', time: '45m ago' },
  { icon: '🔄', text: 'Email sequence triggered for 3 unbooked leads', time: '1h ago' },
  { icon: '📅', text: 'Appointment reminder sent to tomorrow\'s patients', time: '2h ago' },
]

const Tooltip_ = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a2420] border border-[#2a3632] rounded-lg px-3 py-2">
        <p className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>{label}</p>
        <p className="text-white text-sm font-semibold">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

export default function Dashboard({ simStats, simFeed, simRunning, simStarted, onStart, onReset }) {
  const feed = simFeed.length ? [...simFeed, ...STATIC_FEED] : STATIC_FEED

  const kpis = [
    { label: 'Leads Captured',       value: simStats.leads,                       change: '+18%', icon: Users,       color: 'var(--accent)' },
    { label: 'Consultations Booked', value: simStats.bookings,                     change: '+33%', icon: Calendar,    color: 'var(--rose)' },
    { label: 'Calls Recovered',      value: simStats.missed,                       change: '+25%', icon: PhoneMissed, color: 'var(--gold)' },
    { label: 'Revenue Generated',    value: '$' + simStats.revenue.toLocaleString(), change: '+$2,400', icon: DollarSign, color: 'var(--gold)' },
  ]

  return (
    <div className="space-y-5">
      {/* Welcome + Sim button */}
      <div className="bg-[#131918] border border-[#1E2B28] rounded-xl px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
            <span className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--accent)' }}>LIVE — TODAY</span>
          </div>
          <h1 className="font-display text-2xl text-white tracking-wide">Good morning, Intu Med Spa.</h1>
          <p className="text-[#6a8a85] text-sm mt-0.5">
            Your AI Front Desk handled{' '}
            <span className="font-semibold" style={{ color: 'var(--accent)' }}>{simStats.leads} leads</span>
            {' '}today — converting {simStats.bookings} into consultations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl px-4 py-3 border"
            style={{ background: 'rgba(139,188,173,0.08)', borderColor: 'rgba(139,188,173,0.2)' }}>
            <TrendingUp size={18} style={{ color: 'var(--accent)' }} />
            <div>
              <div className="font-display text-xl" style={{ color: 'var(--accent)' }}>38%</div>
              <div className="text-[#6a8a85] font-mono text-[10px]">CONVERSION</div>
            </div>
          </div>
          {simRunning ? (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2a3632] text-[#6a8a85] hover:text-white hover:border-[#3a4a47] text-sm font-medium transition-all"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          ) : (
            <button
              onClick={onStart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[#0D1110] text-sm font-semibold transition-all hover:opacity-90 sim-pulse"
              style={{ background: 'var(--accent)' }}
            >
              <Play size={14} fill="currentColor" />
              Start Live Simulation
            </button>
          )}
        </div>
      </div>

      {/* Live sim banner */}
      {simRunning && (
        <div className="rounded-xl border px-5 py-3 flex items-center gap-3"
          style={{ background: 'rgba(139,188,173,0.07)', borderColor: 'rgba(139,188,173,0.25)' }}>
          <Zap size={15} style={{ color: 'var(--accent)' }} />
          <span className="text-sm" style={{ color: 'var(--accent)' }}>
            <strong>Live Simulation Running</strong> — watch the AI handle patient inquiries, book appointments, and update your metrics in real time.
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
            <span className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>ACTIVE</span>
          </span>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon
          return (
            <div key={k.label} className="bg-[#131918] border border-[#1E2B28] rounded-xl p-4 hover:border-[#2a3a36] transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: k.color === 'var(--accent)' ? 'rgba(139,188,173,0.12)' : k.color === 'var(--rose)' ? 'rgba(212,144,122,0.12)' : k.color === 'var(--gold)' ? 'rgba(201,168,124,0.12)' : 'rgba(167,139,250,0.12)' }}>
                  <Icon size={16} style={{ color: k.color }} />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono" style={{ color: 'var(--accent)' }}>
                  <ArrowUpRight size={12} />
                  {k.change}
                </div>
              </div>
              <div key={k.value} className="text-white font-display text-3xl leading-none mb-1 count-up">{k.value}</div>
              <div className="text-[#6a8a85] text-xs">{k.label}</div>
              <div className="text-[#3a5550] font-mono text-[10px] mt-0.5">from yesterday</div>
            </div>
          )
        })}
      </div>

      {/* Empty state overlay when not started */}
      {!simStarted && (
        <div className="bg-[#131918] border border-[#1E2B28] rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(139,188,173,0.1)' }}>
            <Sparkles size={24} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Your AI Front Desk is ready.</h3>
            <p className="text-[#4a6560] text-sm max-w-sm">Hit Start to see it in action — watch leads come in, appointments get booked, and revenue grow in real time.</p>
          </div>
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-[#0D1110] font-semibold transition-all hover:opacity-90 sim-pulse mt-2"
            style={{ background: 'var(--accent)' }}
          >
            <Play size={16} fill="currentColor" />
            Start Live Simulation
          </button>
        </div>
      )}

      {/* Charts + Feed + Funnel */}
      {simStarted && <>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-[#131918] border border-[#1E2B28] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-sm">Leads This Week</h3>
              <p className="text-[#3a5550] font-mono text-[10px]">DAILY VOLUME</p>
            </div>
            <span className="font-mono text-[10px] px-2 py-1 rounded-md border"
              style={{ background: 'rgba(139,188,173,0.08)', borderColor: 'rgba(139,188,173,0.2)', color: 'var(--accent)' }}>+18%</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={weekData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8BBCAD" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#8BBCAD" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2420" />
              <XAxis dataKey="day" tick={{ fill: '#4a6560', fontSize: 10, fontFamily: 'Space Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#4a6560', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Area type="monotone" dataKey="leads" stroke="#8BBCAD" strokeWidth={2} fill="url(#leadGrad)" dot={{ fill: '#8BBCAD', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-1 bg-[#131918] border border-[#1E2B28] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-sm">Bookings by Channel</h3>
              <p className="text-[#3a5550] font-mono text-[10px]">TODAY</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={channelData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2420" vertical={false} />
              <XAxis dataKey="channel" tick={{ fill: '#4a6560', fontSize: 10, fontFamily: 'Space Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#4a6560', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Bar dataKey="bookings" fill="#8BBCAD" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="col-span-1 bg-[#131918] border border-[#1E2B28] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-sm">Live Activity</h3>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
              <span className="font-mono text-[9px]" style={{ color: 'var(--accent)' }}>LIVE</span>
            </span>
          </div>
          <div className="space-y-2.5 overflow-y-auto max-h-[160px]">
            {feed.map((item, i) => (
              <div key={i} className={`flex items-start gap-2.5 transition-opacity ${i === 0 ? 'opacity-100' : 'opacity-65'}`}>
                <span className="text-sm leading-none mt-0.5 flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#b0c8c4] text-xs leading-snug">{item.text}</p>
                </div>
                <span className="text-[#3a5550] font-mono text-[10px] flex-shrink-0 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-[#131918] border border-[#1E2B28] rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Conversion Funnel — Today</h3>
        <div className="space-y-3">
          {funnelSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-32 text-right">
                <span className="text-white font-semibold text-sm">{step.base}</span>
                <span className="text-[#4a6560] text-xs ml-1.5">{step.label}</span>
              </div>
              <div className="flex-1 h-7 bg-[#1a2420] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-700"
                  style={{
                    width: `${step.pct}%`,
                    background: ['#8BBCAD', '#7aab9c', '#6a9a8b', '#5a897a'][i],
                  }}
                >
                  <span className="text-[#0D1110] font-mono text-[10px] font-bold">{step.pct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>}
    </div>
  )
}
