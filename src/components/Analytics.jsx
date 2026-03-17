import React from 'react'
import {
  ResponsiveContainer,
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line,
  Tooltip,
} from 'recharts'
import { TrendingUp, Users, Clock, DollarSign, Percent } from 'lucide-react'
import { motion } from 'framer-motion'

// 30 days of lead data
const leadData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  leads: Math.round(18 + i * 0.8 + Math.sin(i * 0.5) * 6 + Math.random() * 4),
}))

const zeroLeadData = Array.from({ length: 30 }, (_, i) => ({ day: `${i + 1}`, leads: 0 }))
const zeroRevenueData = [
  { week: 'Wk 1', revenue: 0 }, { week: 'Wk 2', revenue: 0 }, { week: 'Wk 3', revenue: 0 },
  { week: 'Wk 4', revenue: 0 }, { week: 'Wk 5', revenue: 0 }, { week: 'Wk 6', revenue: 0 },
  { week: 'Wk 7', revenue: 0 }, { week: 'Wk 8', revenue: 0 },
]

const serviceData = [
  { service: 'Botox', bookings: 38 },
  { service: 'HydraFacial', bookings: 24 },
  { service: 'Fillers', bookings: 19 },
  { service: 'Weight Loss', bookings: 15 },
  { service: 'Laser', bookings: 12 },
  { service: 'Other', bookings: 8 },
]

const sourceData = [
  { name: 'Website Chat', value: 45, color: '#D4AF37' },
  { name: 'Instagram', value: 30, color: '#c4688a' },
  { name: 'Missed Call', value: 25, color: 'rgba(212,175,55,0.5)' },
]

const revenueData = [
  { week: 'Wk 1', revenue: 6200 },
  { week: 'Wk 2', revenue: 7400 },
  { week: 'Wk 3', revenue: 7100 },
  { week: 'Wk 4', revenue: 8800 },
  { week: 'Wk 5', revenue: 9200 },
  { week: 'Wk 6', revenue: 10500 },
  { week: 'Wk 7', revenue: 11800 },
  { week: 'Wk 8', revenue: 13600 },
]

const kpis = [
  { label: 'Total Leads', value: '847', icon: Users, color: '#D4AF37' },
  { label: 'Avg Response Time', value: '8 sec', icon: Clock, color: '#4ade80' },
  { label: 'Conversion Rate', value: '38%', icon: Percent, color: '#D4AF37' },
  { label: 'Total Revenue', value: '$89,400', icon: DollarSign, color: '#D4AF37' },
]

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
        <p style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>
          {typeof payload[0].value === 'number' && payload[0].dataKey === 'revenue'
            ? `$${payload[0].value.toLocaleString()}`
            : payload[0].value}
        </p>
      </div>
    )
  }
  return null
}

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontFamily="Space Mono">
      {value}%
    </text>
  )
}

const springTransition = { type: 'spring', stiffness: 260, damping: 28 }

export default function Analytics({ simStarted = false }) {
  const chartLeadData = simStarted ? leadData : zeroLeadData
  const chartRevenueData = simStarted ? revenueData : zeroRevenueData

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-3xl text-white">Analytics</h2>
        <p className="text-[#4a6560] text-sm mt-0.5">AI performance overview — all channels, all time.</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k, idx) => {
          const Icon = k.icon
          return (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: idx * 0.06 }}
              className="rounded-xl p-4 hover:border-[#D4AF37]/20 transition-colors glass"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: 'rgba(212,175,55,0.08)' }}>
                  <Icon size={16} style={{ color: '#D4AF37' }} />
                </div>
                <TrendingUp size={14} style={{ color: '#D4AF37' }} />
              </div>
              <div className="text-white font-data text-3xl font-semibold leading-none mb-1">{k.value}</div>
              <div className="text-[#4a6560] text-xs">{k.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-3 gap-4">
        {/* Area: Leads 30d */}
        <div className="col-span-2 rounded-xl p-5 relative glass">
          {!simStarted && (
            <div className="absolute inset-0 flex items-center justify-center z-10 rounded-xl" style={{ background: 'rgba(5,5,5,0.75)' }}>
              <span className="text-[#4a6560] font-mono text-xs">Run simulation to see analytics</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-display text-sm">Leads Over Last 30 Days</h3>
              <p className="text-[#4a6560] font-mono text-[10px]">DAILY VOLUME</p>
            </div>
            <span style={{ background: 'rgba(212,175,55,0.08)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)' }}
              className="font-mono text-[10px] px-2 py-1 rounded-md">+38% growth</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartLeadData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip content={<GoldTooltip />} />
              <Area
                type="monotone" dataKey="leads"
                stroke="#D4AF37" strokeWidth={2}
                fill="url(#goldAreaGrad)"
                dot={false}
                style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.6))' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie: Sources */}
        <div className="rounded-xl p-5 glass">
          <div className="mb-4">
            <h3 className="text-white font-display text-sm">Lead Sources</h3>
            <p className="text-[#4a6560] font-mono text-[10px]">ALL TIME</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%" cy="50%"
                innerRadius={45} outerRadius={75}
                dataKey="value"
                labelLine={false}
                label={<CustomPieLabel />}
              >
                {sourceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => `${v}%`}
                contentStyle={{ background: 'rgba(5,5,5,0.9)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 10 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {sourceData.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-[#6a8a85] font-mono text-[10px]">{s.name}</span>
                </div>
                <span className="text-white font-mono text-[10px]">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bar: Bookings by service */}
        <div className="rounded-xl p-5 glass">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-display text-sm">Bookings by Service</h3>
              <p className="text-[#4a6560] font-mono text-[10px]">THIS MONTH</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={serviceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <Tooltip content={<GoldTooltip />} />
              <Bar dataKey="bookings" fill="#D4AF37" radius={[4, 4, 0, 0]}
                style={{ filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.45))' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line: Revenue trend */}
        <div className="rounded-xl p-5 glass">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-display text-sm">Revenue Trend</h3>
              <p className="text-[#4a6560] font-mono text-[10px]">WEEKLY — LAST 8 WEEKS</p>
            </div>
            <span style={{ color: '#D4AF37' }} className="font-mono text-xs">$89,400 total</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartRevenueData} margin={{ top: 5, right: 5, left: -5, bottom: 0 }}>
              <Tooltip content={<GoldTooltip />} />
              <Line
                type="monotone" dataKey="revenue"
                stroke="#D4AF37" strokeWidth={2.5}
                dot={{ fill: '#D4AF37', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#D4AF37' }}
                style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.6))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
