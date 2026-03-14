import React from 'react'
import {
  ResponsiveContainer,
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from 'recharts'
import { TrendingUp, Users, Clock, DollarSign, Percent } from 'lucide-react'

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
  { service: 'IV Therapy', bookings: 12 },
  { service: 'Other', bookings: 8 },
]

const sourceData = [
  { name: 'Website Chat', value: 45, color: '#8BBCAD' },
  { name: 'Instagram', value: 30, color: '#ec4899' },
  { name: 'Missed Call', value: 25, color: '#f59e0b' },
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
  { label: 'Total Leads', value: '847', icon: Users, color: '#8BBCAD' },
  { label: 'Avg Response Time', value: '8 sec', icon: Clock, color: '#4ade80' },
  { label: 'Conversion Rate', value: '38%', icon: Percent, color: '#8BBCAD' },
  { label: 'Total Revenue', value: '$89,400', icon: DollarSign, color: '#f59e0b' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a2420] border border-[#333] rounded-lg px-3 py-2">
        <p className="text-[#888] font-mono text-[10px] mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-white text-sm font-semibold" style={{ color: p.color }}>
            {typeof p.value === 'number' && p.dataKey === 'revenue' ? `$${p.value.toLocaleString()}` : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
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
      {/* Header */}
      <div>
        <h2 className="font-display text-3xl text-white tracking-wide">Analytics</h2>
        <p className="text-[#4a6560] text-sm mt-0.5">AI performance overview — all channels, all time.</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon
          return (
            <div key={k.label} className="bg-[#131918] border border-[#1E2B28] rounded-xl p-4 hover:border-[#333] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: k.color + '18' }}>
                  <Icon size={16} style={{ color: k.color }} />
                </div>
                <TrendingUp size={14} className="text-green-400" />
              </div>
              <div className="text-white font-display text-3xl leading-none mb-1">{k.value}</div>
              <div className="text-[#4a6560] text-xs">{k.label}</div>
            </div>
          )
        })}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-3 gap-4">
        {/* Area: Leads 30d */}
        <div className="col-span-2 bg-[#131918] border border-[#1E2B28] rounded-xl p-5 relative">
          {!simStarted && (
            <div className="absolute inset-0 flex items-center justify-center z-10 rounded-xl" style={{ background: 'rgba(13,17,16,0.7)' }}>
              <span className="text-[#4a6560] font-mono text-xs">Run simulation to see analytics</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-sm">Leads Over Last 30 Days</h3>
              <p className="text-[#4a6560] font-mono text-[10px]">DAILY VOLUME</p>
            </div>
            <span className="bg-[#8BBCAD]/10 text-[#8BBCAD] font-mono text-[10px] px-2 py-1 rounded-md border border-[#8BBCAD]/20">+38% growth</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartLeadData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8BBCAD" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#8BBCAD" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
              <XAxis dataKey="day" tick={{ fill: '#444', fontSize: 9, fontFamily: 'Space Mono' }} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={{ fill: '#444', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="leads" stroke="#8BBCAD" strokeWidth={2} fill="url(#areaGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie: Sources */}
        <div className="bg-[#131918] border border-[#1E2B28] rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-white font-semibold text-sm">Lead Sources</h3>
            <p className="text-[#4a6560] font-mono text-[10px]">ALL TIME</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                dataKey="value"
                labelLine={false}
                label={<CustomPieLabel />}
              >
                {sourceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {sourceData.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }}></div>
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
        <div className="bg-[#131918] border border-[#1E2B28] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-sm">Bookings by Service</h3>
              <p className="text-[#4a6560] font-mono text-[10px]">THIS MONTH</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={serviceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" vertical={false} />
              <XAxis dataKey="service" tick={{ fill: '#555', fontSize: 9, fontFamily: 'Space Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#555', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="bookings" fill="#8BBCAD" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line: Revenue trend */}
        <div className="bg-[#131918] border border-[#1E2B28] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-sm">Revenue Trend</h3>
              <p className="text-[#4a6560] font-mono text-[10px]">WEEKLY — LAST 8 WEEKS</p>
            </div>
            <span className="text-[#8BBCAD] font-mono text-xs">$89,400 total</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartRevenueData} margin={{ top: 5, right: 5, left: -5, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
              <XAxis dataKey="week" tick={{ fill: '#555', fontSize: 10, fontFamily: 'Space Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#555', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="revenue" stroke="#8BBCAD" strokeWidth={2.5} dot={{ fill: '#8BBCAD', r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: '#8BBCAD' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
