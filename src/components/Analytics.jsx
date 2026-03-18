import React from 'react'
import {
  ResponsiveContainer,
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line,
  Tooltip, CartesianGrid,
} from 'recharts'
import { TrendingUp, Users, Clock, DollarSign, Percent } from 'lucide-react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, hoverScale } from '../lib/motion'
import { CHART_COLORS, CHART_TOOLTIP } from '../lib/chart-theme'

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
  { name: 'Website Chat', value: 45, color: CHART_COLORS.primary },
  { name: 'Instagram', value: 30, color: CHART_COLORS.success },
  { name: 'Missed Call', value: 25, color: CHART_COLORS.accent },
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
  { label: 'Total Leads', value: '847', icon: Users, color: CHART_COLORS.primary },
  { label: 'Avg Response Time', value: '8 sec', icon: Clock, color: CHART_COLORS.success },
  { label: 'Conversion Rate', value: '38%', icon: Percent, color: CHART_COLORS.accent },
  { label: 'Total Revenue', value: '$89,400', icon: DollarSign, color: CHART_COLORS.primary },
]

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={CHART_TOOLTIP.contentStyle}>
        <p style={CHART_TOOLTIP.labelStyle}>{label}</p>
        <p className="text-white text-sm font-semibold">
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

export default function Analytics({ simStarted = false }) {
  const chartLeadData = simStarted ? leadData : zeroLeadData
  const chartRevenueData = simStarted ? revenueData : zeroRevenueData

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-semibold text-3xl text-white tracking-tight">Analytics</h2>
        <p className="text-zinc-500 text-sm mt-0.5">AI performance overview — all channels, all time.</p>
      </div>

      {/* KPI row */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={staggerContainer} initial="initial" animate="animate">
        {kpis.map((k) => {
          const Icon = k.icon
          return (
            <motion.div
              key={k.label}
              variants={staggerItem}
              {...hoverScale}
              className="rounded-xl p-4 bg-surface-1 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: `${k.color}12` }}>
                  <Icon size={16} style={{ color: k.color }} />
                </div>
                <TrendingUp size={14} className="text-emerald-400" />
              </div>
              <div className="text-white font-data text-3xl font-semibold leading-none mb-1">{k.value}</div>
              <div className="text-zinc-500 text-xs">{k.label}</div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area: Leads 30d */}
        <motion.div {...hoverScale} className="lg:col-span-2 rounded-xl p-5 relative bg-surface-1 border border-white/10">
          {!simStarted && (
            <div className="absolute inset-0 flex items-center justify-center z-10 rounded-xl bg-background/75 backdrop-blur-sm">
              <span className="text-zinc-500 font-mono text-xs">Run simulation to see analytics</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-sm tracking-tight">Leads Over Last 30 Days</h3>
              <p className="text-zinc-500 font-mono text-[10px]">DAILY VOLUME</p>
            </div>
            <span className="font-mono text-[10px] px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary">+38% growth</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartLeadData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="primaryAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" vertical={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="leads" stroke={CHART_COLORS.primary} strokeWidth={2} fill="url(#primaryAreaGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie: Sources */}
        <motion.div {...hoverScale} className="rounded-xl p-5 bg-surface-1 border border-white/10">
          <div className="mb-4">
            <h3 className="text-white font-semibold text-sm tracking-tight">Lead Sources</h3>
            <p className="text-zinc-500 font-mono text-[10px]">ALL TIME</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={sourceData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" labelLine={false} label={<CustomPieLabel />}>
                {sourceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={CHART_TOOLTIP.contentStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {sourceData.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-zinc-400 font-mono text-[10px]">{s.name}</span>
                </div>
                <span className="text-white font-mono text-[10px]">{s.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar: Bookings by service */}
        <motion.div {...hoverScale} className="rounded-xl p-5 bg-surface-1 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-sm tracking-tight">Bookings by Service</h3>
              <p className="text-zinc-500 font-mono text-[10px]">THIS MONTH</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={serviceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" vertical={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="bookings" fill={CHART_COLORS.success} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line: Revenue trend */}
        <motion.div {...hoverScale} className="rounded-xl p-5 bg-surface-1 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-sm tracking-tight">Revenue Trend</h3>
              <p className="text-zinc-500 font-mono text-[10px]">WEEKLY — LAST 8 WEEKS</p>
            </div>
            <span className="text-primary font-mono text-xs">$89,400 total</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartRevenueData} margin={{ top: 5, right: 5, left: -5, bottom: 0 }}>
              <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" vertical={false} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="revenue" stroke={CHART_COLORS.success} strokeWidth={2.5}
                dot={{ fill: CHART_COLORS.success, r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: CHART_COLORS.success }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}
