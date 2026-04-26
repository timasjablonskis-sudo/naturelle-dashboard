import { useState, useEffect, useRef } from 'react'
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, Tooltip, CartesianGrid
} from 'recharts'
import { Users, Calendar, PhoneMissed, DollarSign, TrendingUp, ArrowUpRight, Play, RotateCcw, Zap, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { staggerContainer, staggerItem, hoverScale } from '../lib/motion'
import { CHART_COLORS, CHART_TOOLTIP } from '../lib/chart-theme'
import { bookingsByChannel, funnelSteps as computedFunnel, conversionRate, totalLeads } from '../data/stats'

const dailyBase = Math.round(totalLeads / 7)
const weekData = [
  { day: 'Mon', leads: dailyBase - 1 },
  { day: 'Tue', leads: dailyBase + 1 },
  { day: 'Wed', leads: dailyBase },
  { day: 'Thu', leads: dailyBase + 3 },
  { day: 'Fri', leads: dailyBase + 2 },
  { day: 'Sat', leads: dailyBase + 4 },
  { day: 'Sun', leads: dailyBase + 1 },
]

const channelData = bookingsByChannel

const funnelSteps = computedFunnel

const STATIC_FEED = [
  // Recent — last hour
  { icon: '🤖', text: 'AI booked Neuromodulator consultation for Emily R.', time: '2m ago' },
  { icon: '📞', text: 'Missed call recovered → Sarah M. booked Neuromodulator consult', time: '8m ago' },
  { icon: '💬', text: 'Instagram DM converted → Ashley R. booked Dermal Filler consult', time: '15m ago' },
  { icon: '📧', text: 'Follow-up email sent to 4 leads — 2 opened within 5 min', time: '22m ago' },
  { icon: '⭐', text: 'AI responded to 2-star review from Jessica L.', time: '31m ago' },
  { icon: '🤖', text: 'AI booked Dermal Filler consult for Jessica M.', time: '45m ago' },
  // Mid-day
  { icon: '📞', text: 'Missed call recovered → David R. texted back about PRP', time: '1h ago' },
  { icon: '🔄', text: 'Email sequence triggered for 3 unbooked leads', time: '1.5h ago' },
  { icon: '💬', text: 'Instagram DM → Kayla M. asked about Kybella, AI responded', time: '2h ago' },
  { icon: '🤖', text: 'AI booked SkinVive treatment for Michael B.', time: '2h ago' },
  { icon: '📞', text: 'Missed call recovered → Marcus H. texted back about Kybella', time: '2.5h ago' },
  { icon: '📧', text: 'Follow-up emails sent to 6 overnight leads — 4 opened', time: '3h ago' },
  // Late morning
  { icon: '🤖', text: 'AI booked PDO Thread consultation for Anna T.', time: '3.5h ago' },
  { icon: '📞', text: '3 missed calls recovered via AI text-back (Sculptra, PRP, Fillers)', time: '4h ago' },
  { icon: '💬', text: '5 Instagram DMs handled — 2 converted to consultations', time: '4.5h ago' },
  { icon: '🤖', text: 'AI booked PRP Facial for Maria C. via website chat', time: '5h ago' },
  // Early morning
  { icon: '📞', text: '4 overnight missed calls detected → AI texted all back by 8:01 AM', time: '5.5h ago' },
  { icon: '📧', text: 'Morning follow-up batch: 8 emails sent to leads from yesterday', time: '6h ago' },
  { icon: '💬', text: '7 overnight Instagram DMs answered by AI within seconds', time: '6h ago' },
  { icon: '📅', text: 'Appointment reminders sent to 11 patients for today', time: '7h ago' },
  { icon: '🤖', text: 'AI Front Desk online — monitoring all channels', time: '8h ago' },
]

const PULSE_CITIES = [
  { x: 160, y: 100 },
  { x: 120, y: 130 },
  { x: 185, y: 80  },
  { x: 140, y: 90  },
  { x: 145, y: 115 },
  { x: 115, y: 150 },
]

function LeadPulseMap({ simStarted }) {
  const [pulses, setPulses] = useState([])
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
    <div className="bg-surface-1 border border-white/10 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold text-sm tracking-tight">Lead Pulse Map</h3>
          <p className="text-zinc-500 font-mono text-[10px]">CHICAGOLAND AREA</p>
        </div>
        {simStarted && (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-primary" />
            <span className="font-mono text-[9px] text-primary">LIVE</span>
          </span>
        )}
      </div>
      <svg viewBox="0 0 300 220" width="100%" height={180}>
        <polygon
          points="120,30 200,30 220,80 210,160 180,190 140,185 110,160 105,100 120,30"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
        {PULSE_CITIES.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={2.5}
            fill={CHART_COLORS.primaryDim} stroke={CHART_COLORS.primary} strokeWidth={0.5} />
        ))}
        {pulses.map((p) => (
          <g key={p.id}>
            <circle cx={p.x} cy={p.y} r={4} fill={CHART_COLORS.primaryDim}>
              <animate attributeName="r" from="4" to="22" dur="1.8s" fill="freeze" />
              <animate attributeName="opacity" from="0.8" to="0" dur="1.8s" fill="freeze" />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={CHART_TOOLTIP.contentStyle}>
        <p style={CHART_TOOLTIP.labelStyle}>{label}</p>
        <p className="text-white text-sm font-semibold">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

const springTransition = { type: 'spring', stiffness: 260, damping: 28 }

export default function Dashboard({ simStats, simFeed, simRunning, simStarted, onStart, onReset }) {
  const feed = simFeed.length ? [...simFeed, ...STATIC_FEED] : STATIC_FEED

  const kpis = [
    { label: 'Leads Captured',       value: simStats.leads,                         change: simStarted ? '+18%' : '—', icon: Users,       color: CHART_COLORS.primary },
    { label: 'Consultations Booked', value: simStats.bookings,                       change: simStarted ? '+33%' : '—', icon: Calendar,    color: CHART_COLORS.success },
    { label: 'Calls Recovered',      value: simStats.missed,                         change: simStarted ? '+25%' : '—', icon: PhoneMissed, color: CHART_COLORS.accent },
    { label: 'Revenue Generated',    value: '$' + simStats.revenue.toLocaleString(), change: simStarted ? '+12%' : '—', icon: DollarSign, color: CHART_COLORS.primary },
  ]

  return (
    <div className="space-y-5">
      {/* Welcome + Sim button */}
      <div className="rounded-xl px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between bg-surface-1 border border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full animate-pulse bg-primary" />
            <span className="font-mono text-[10px] tracking-widest text-primary">LIVE — TODAY</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-white tracking-tight">{(() => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening' })()}, Lumina Med Spa.</h1>
          <p className="text-zinc-400 text-sm mt-0.5">
            Your AI Front Desk has handled{' '}
            <span className="font-semibold text-white">{simStats.leads} leads</span>
            {' '}today so far — converting {simStats.bookings} into consultations.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <div className="flex items-center gap-2 rounded-xl px-4 py-3 bg-surface-1 border border-white/10">
            <TrendingUp size={18} className="text-primary" />
            <div>
              <div className="font-semibold text-xl text-white tracking-tight">{conversionRate}%</div>
              <div className="text-zinc-500 font-mono text-[10px]">CONVERSION</div>
            </div>
          </div>
          {simRunning ? (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white text-sm font-medium transition-all bg-surface-1 border border-white/10"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          ) : (
            <motion.button
              onClick={onStart}
              {...hoverScale}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all sim-pulse bg-primary"
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
            className="rounded-xl px-5 py-3 flex items-center gap-3 bg-primary/5 border border-primary/25"
          >
            <Zap size={15} className="text-primary" />
            <span className="text-sm text-primary">
              <strong>Live Simulation Running</strong> — watch the AI handle patient inquiries, book appointments, and update your metrics in real time.
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-primary" />
              <span className="font-mono text-[10px] text-primary">ACTIVE</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPI Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {kpis.map((k) => {
          const Icon = k.icon
          return (
            <motion.div
              key={k.label}
              variants={staggerItem}
              className="rounded-xl p-4 bg-surface-1 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: `${k.color}12` }}>
                  <Icon size={16} style={{ color: k.color }} />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-emerald-400">
                  <ArrowUpRight size={12} />
                  {k.change}
                </div>
              </div>
              <div key={k.value} className="text-white font-data text-3xl font-semibold leading-none mb-1 count-up">{k.value}</div>
              <div className="text-zinc-400 text-xs">{k.label}</div>
              <div className="text-zinc-600 font-mono text-[10px] mt-0.5">today so far</div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Empty state */}
      <AnimatePresence>
        {!simStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4 bg-surface-1 border border-white/10"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10">
              <Sparkles size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-xl mb-1 tracking-tight">Your AI Front Desk is ready.</h3>
              <p className="text-zinc-500 text-sm max-w-sm">Hit Start to see it in action — watch leads come in, appointments get booked, and revenue grow in real time.</p>
            </div>
            <motion.button
              onClick={onStart}
              {...hoverScale}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all sim-pulse mt-2 bg-primary"
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
            {/* Row 1: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Leads chart */}
              <div className="lg:col-span-2 rounded-xl p-5 bg-surface-1 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-sm tracking-tight">Leads This Week</h3>
                    <p className="text-zinc-600 font-mono text-[10px]">DAILY VOLUME</p>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary">+18%</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={weekData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="primaryGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" vertical={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="leads" stroke={CHART_COLORS.primary} strokeWidth={2} fill="url(#primaryGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Bookings chart */}
              <div className="rounded-xl p-5 bg-surface-1 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-sm tracking-tight">Bookings by Channel</h3>
                    <p className="text-zinc-600 font-mono text-[10px]">TODAY</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={channelData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" vertical={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="bookings" fill={CHART_COLORS.success} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Row 2: Activity Feed + Pulse Map */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Activity Feed */}
              <div className="lg:col-span-2 rounded-xl p-5 bg-surface-1 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold text-sm tracking-tight">Today's Activity</h3>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-primary" />
                    <span className="font-mono text-[9px] text-primary">LIVE</span>
                  </span>
                </div>
                <div className="space-y-2.5 max-h-[240px] overflow-y-auto">
                  {feed.map((item, i) => (
                    <div key={i} className={cn('flex items-start gap-2.5 transition-opacity', i === 0 ? 'opacity-100' : 'opacity-60')}>
                      <span className="text-sm leading-none mt-0.5 flex-shrink-0">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-zinc-300 text-xs leading-snug">{item.text}</p>
                      </div>
                      <span className="text-zinc-600 font-mono text-[10px] flex-shrink-0 whitespace-nowrap">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Pulse Map */}
              <LeadPulseMap simStarted={simStarted} />
            </div>

            {/* Row 3: Conversion Funnel */}
            <div className="rounded-xl p-5 bg-surface-1 border border-white/10">
              <h3 className="text-white font-semibold text-sm mb-4 tracking-tight">Conversion Funnel — Today</h3>
              <div className="space-y-3">
                {funnelSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-4">
                    <div className="w-20 md:w-32 text-right">
                      <span className="text-white font-semibold text-xs md:text-sm">{step.base}</span>
                      <span className="text-zinc-500 text-[10px] md:text-xs ml-1">{step.label}</span>
                    </div>
                    <div className="flex-1 h-7 rounded-full overflow-hidden bg-white/[0.04]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${step.pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.12, ease: 'easeOut' }}
                        className="h-full rounded-full flex items-center justify-end pr-3"
                        style={{
                          background: i === 0 ? CHART_COLORS.primary : `rgba(5,150,105,${0.7 - i * 0.15})`,
                          boxShadow: i === 0 ? '0 0 12px rgba(5,150,105,0.3)' : 'none',
                        }}
                      >
                        <span className="text-white font-mono text-[10px] font-bold">{step.pct}%</span>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
