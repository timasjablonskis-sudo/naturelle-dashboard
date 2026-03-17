import React, { useEffect, useRef } from 'react'
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, Tooltip
} from 'recharts'
import { Users, Calendar, PhoneMissed, DollarSign, TrendingUp, ArrowUpRight, Play, RotateCcw, Zap, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

// City coords in SVG space (approximate midwest view)
const PULSE_CITIES = [
  { x: 160, y: 100 }, // Chicago
  { x: 120, y: 130 }, // Naperville
  { x: 185, y: 80  }, // Evanston
  { x: 140, y: 90  }, // Schaumburg
  { x: 145, y: 115 }, // Oak Park
  { x: 115, y: 150 }, // Joliet
]

function LeadPulseMap({ simStarted }) {
  const [pulses, setPulses] = React.useState([])
  const cityIndex = useRef(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!simStarted) { setPulses([]); return }

    const fire = () => {
      const city = PULSE_CITIES[cityIndex.current % PULSE_CITIES.length]
      cityIndex.current++
      const id = Date.now()
      setPulses((prev) => [...prev, { ...city, id }])
      setTimeout(() => setPulses((prev) => prev.filter((p) => p.id !== id)), 2000)
      timerRef.current = setTimeout(fire, 1800 + Math.random() * 1200)
    }
    timerRef.current = setTimeout(fire, 600)
    return () => clearTimeout(timerRef.current)
  }, [simStarted])

  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-5"
      style={{ borderColor: 'var(--glass-border)' }}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-white font-display text-base">Lead Pulse Map</h3>
          <p className="text-[#4a6560] font-mono text-[10px]">CHICAGOLAND AREA</p>
        </div>
        {simStarted && (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D4AF37' }} />
            <span className="font-mono text-[9px]" style={{ color: '#D4AF37' }}>LIVE</span>
          </span>
        )}
      </div>
      <svg viewBox="0 0 300 220" width="100%" height={180}>
        {/* State outlines (simplified Illinois shape) */}
        <polygon
          points="120,30 200,30 220,80 210,160 180,190 140,185 110,160 105,100 120,30"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
        {/* City dots */}
        {PULSE_CITIES.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={2.5}
            fill="rgba(212,175,55,0.4)" stroke="rgba(212,175,55,0.6)" strokeWidth={0.5} />
        ))}
        {/* Animated pulses */}
        {pulses.map((p) => (
          <g key={p.id}>
            <circle cx={p.x} cy={p.y} r={4} fill="rgba(212,175,55,0.6)">
              <animate attributeName="r" from="4" to="22" dur="1.8s" fill="freeze" />
              <animate attributeName="opacity" from="0.8" to="0" dur="1.8s" fill="freeze" />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}

const GoldTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(5,5,5,0.9)',
        border: '1px solid rgba(212,175,55,0.3)',
        borderRadius: 10,
        padding: '8px 14px',
      }}>
        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 11, color: '#D4AF37', marginBottom: 2 }}>{label}</p>
        <p style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{payload[0].value}</p>
      </div>
    )
  }
  return null
}

const springTransition = { type: 'spring', stiffness: 260, damping: 28 }

export default function Dashboard({ simStats, simFeed, simRunning, simStarted, onStart, onReset }) {
  const feed = simFeed.length ? [...simFeed, ...STATIC_FEED] : STATIC_FEED

  const kpis = [
    { label: 'Leads Captured',       value: simStats.leads,                         change: '+18%', icon: Users,       color: '#D4AF37' },
    { label: 'Consultations Booked', value: simStats.bookings,                       change: '+33%', icon: Calendar,    color: 'var(--accent)' },
    { label: 'Calls Recovered',      value: simStats.missed,                         change: '+25%', icon: PhoneMissed, color: '#D4AF37' },
    { label: 'Revenue Generated',    value: '$' + simStats.revenue.toLocaleString(), change: '+$2,400', icon: DollarSign, color: '#D4AF37' },
  ]

  return (
    <div className="space-y-5">
      {/* Welcome + Sim button */}
      <div className="rounded-xl px-6 py-4 flex items-center justify-between glass">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#D4AF37' }} />
            <span className="font-mono text-[10px] tracking-widest" style={{ color: '#D4AF37' }}>LIVE — TODAY</span>
          </div>
          <h1 className="font-display text-2xl text-white">Good morning, Wishful Beauty.</h1>
          <p className="text-[#6a8a85] text-sm mt-0.5">
            Your AI Front Desk handled{' '}
            <span className="font-semibold" style={{ color: '#D4AF37' }}>{simStats.leads} leads</span>
            {' '}today — converting {simStats.bookings} into consultations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl px-4 py-3 glass">
            <TrendingUp size={18} style={{ color: '#D4AF37' }} />
            <div>
              <div className="font-display text-xl" style={{ color: '#D4AF37' }}>38%</div>
              <div className="text-[#6a8a85] font-mono text-[10px]">CONVERSION</div>
            </div>
          </div>
          {simRunning ? (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[#6a8a85] hover:text-white text-sm font-medium transition-all glass"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          ) : (
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={springTransition}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[#050505] text-sm font-semibold transition-all sim-pulse"
              style={{ background: '#D4AF37' }}
            >
              <Play size={14} fill="currentColor" />
              Start Live Simulation
            </motion.button>
          )}
        </div>
      </div>

      {/* Live sim banner */}
      <AnimatePresence>
        {simRunning && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={springTransition}
            className="rounded-xl px-5 py-3 flex items-center gap-3 glass"
            style={{ borderColor: 'rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.05)' }}
          >
            <Zap size={15} style={{ color: '#D4AF37' }} />
            <span className="text-sm" style={{ color: '#D4AF37' }}>
              <strong>Live Simulation Running</strong> — watch the AI handle patient inquiries, book appointments, and update your metrics in real time.
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D4AF37' }} />
              <span className="font-mono text-[10px]" style={{ color: '#D4AF37' }}>ACTIVE</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k, idx) => {
          const Icon = k.icon
          return (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: idx * 0.06 }}
              className="rounded-xl p-4 hover:border-[#D4AF37]/20 transition-colors glass"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: 'rgba(212,175,55,0.08)' }}>
                  <Icon size={16} style={{ color: '#D4AF37' }} />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono" style={{ color: '#D4AF37' }}>
                  <ArrowUpRight size={12} />
                  {k.change}
                </div>
              </div>
              <div key={k.value} className="text-white font-data text-3xl font-semibold leading-none mb-1 count-up">{k.value}</div>
              <div className="text-[#6a8a85] text-xs">{k.label}</div>
              <div className="text-[#3a5550] font-mono text-[10px] mt-0.5">from yesterday</div>
            </motion.div>
          )
        })}
      </div>

      {/* Empty state */}
      <AnimatePresence>
        {!simStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4 glass"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.08)' }}>
              <Sparkles size={24} style={{ color: '#D4AF37' }} />
            </div>
            <div>
              <h3 className="font-display text-white text-xl mb-1">Your AI Front Desk is ready.</h3>
              <p className="text-[#4a6560] text-sm max-w-sm">Hit Start to see it in action — watch leads come in, appointments get booked, and revenue grow in real time.</p>
            </div>
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={springTransition}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-[#050505] font-semibold transition-all sim-pulse mt-2"
              style={{ background: '#D4AF37' }}
            >
              <Play size={16} fill="currentColor" />
              Start Live Simulation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Charts + Feed + Funnel + PulseMap */}
      <AnimatePresence>
        {simStarted && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springTransition}
            className="space-y-4"
          >
            <div className="grid grid-cols-3 gap-4">
              {/* Leads chart */}
              <div className="col-span-1 rounded-xl p-4 glass">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-display text-sm">Leads This Week</h3>
                    <p className="text-[#3a5550] font-mono text-[10px]">DAILY VOLUME</p>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-1 rounded-md"
                    style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}>+18%</span>
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <AreaChart data={weekData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#D4AF37" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip content={<GoldTooltip />} />
                    <Area
                      type="monotone" dataKey="leads"
                      stroke="#D4AF37" strokeWidth={2}
                      fill="url(#goldGrad)"
                      dot={false}
                      style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.6))' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Bookings chart */}
              <div className="col-span-1 rounded-xl p-4 glass">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-display text-sm">Bookings by Channel</h3>
                    <p className="text-[#3a5550] font-mono text-[10px]">TODAY</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={channelData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <Tooltip content={<GoldTooltip />} />
                    <Bar dataKey="bookings" fill="#D4AF37" radius={[4, 4, 0, 0]}
                      style={{ filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.5))' }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Activity Feed */}
              <div className="col-span-1 rounded-xl p-4 glass">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-display text-sm">Live Activity</h3>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D4AF37' }} />
                    <span className="font-mono text-[9px]" style={{ color: '#D4AF37' }}>LIVE</span>
                  </span>
                </div>
                <div className="space-y-2.5 overflow-y-auto max-h-[160px]">
                  {feed.map((item, i) => (
                    <div key={i} className={`flex items-start gap-2.5 transition-opacity ${i === 0 ? 'opacity-100' : 'opacity-60'}`}>
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

            {/* Lead Pulse Map + Funnel side by side */}
            <div className="grid grid-cols-2 gap-4">
              <LeadPulseMap simStarted={simStarted} />

              {/* Conversion Funnel */}
              <div className="rounded-xl p-5 glass">
                <h3 className="text-white font-display text-sm mb-4">Conversion Funnel — Today</h3>
                <div className="space-y-3">
                  {funnelSteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-32 text-right">
                        <span className="text-white font-semibold text-sm">{step.base}</span>
                        <span className="text-[#4a6560] text-xs ml-1.5">{step.label}</span>
                      </div>
                      <div className="flex-1 h-7 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${step.pct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.12, ease: 'easeOut' }}
                          className="h-full rounded-full flex items-center justify-end pr-3"
                          style={{
                            background: i === 0 ? '#D4AF37' : `rgba(212,175,55,${0.7 - i * 0.15})`,
                            boxShadow: i === 0 ? '0 0 12px rgba(212,175,55,0.4)' : 'none',
                          }}
                        >
                          <span className="text-[#050505] font-mono text-[10px] font-bold">{step.pct}%</span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
