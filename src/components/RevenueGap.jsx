import React from 'react'
import { PhoneMissed, Users, XCircle, UserX, TrendingDown, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../lib/motion'

const LEAKS = [
  {
    Icon: PhoneMissed,
    color: '#f59e0b',
    colorBg: 'rgba(245,158,11,0.07)',
    border: 'rgba(245,158,11,0.18)',
    badge: 'CALL LEAKAGE',
    label: 'Missed Calls — Unrecovered',
    amount: '$3,200',
    period: '/mo',
    description:
      'Avg med spa misses ~30% of inbound calls. At $400/treatment and a 30% would-have-booked rate, that\'s hundreds of dollars lost every day the front desk is closed or busy.',
    fixedBy: 'Voice Receptionist · Missed Call Text-Back',
  },
  {
    Icon: Users,
    color: '#a78bfa',
    colorBg: 'rgba(167,139,250,0.07)',
    border: 'rgba(167,139,250,0.18)',
    badge: 'PASSIVE LEAKAGE',
    label: 'Dormant Patient Database',
    amount: '$7,000',
    period: '/mo',
    description:
      '~35% of a med spa\'s patient list has gone silent for 90+ days. At 10% monthly reactivation on 500 patients, that\'s 50 unclaimed appointments sitting in the database.',
    fixedBy: 'Database Reactivation · Treatment Cycle (Botox Clock)',
  },
  {
    Icon: XCircle,
    color: '#f472b6',
    colorBg: 'rgba(244,114,182,0.07)',
    border: 'rgba(244,114,182,0.18)',
    badge: 'BOOKING LEAKAGE',
    label: 'No-Show Revenue Loss',
    amount: '$2,400',
    period: '/mo',
    description:
      'Industry no-show rate averages 12%. Without automated outreach, 60% of no-shows never rebook. These patients were already sold — they just needed a reminder and a nudge.',
    fixedBy: 'No-Show Recovery · Smart Reminder Suite',
  },
  {
    Icon: UserX,
    color: '#34d399',
    colorBg: 'rgba(52,211,153,0.07)',
    border: 'rgba(52,211,153,0.18)',
    badge: 'PIPELINE LEAKAGE',
    label: 'Ghosted Leads — Dead Pipeline',
    amount: '$2,600',
    period: '/mo',
    description:
      'Leads that inquired and went cold. Without follow-up within 24 hours, 70% never respond again. Most med spas follow up zero times after the first non-reply.',
    fixedBy: 'Lead Re-engagement · AI Concierge Follow-Up',
  },
]

export default function RevenueGap() {
  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown size={14} className="text-red-400" />
            <span className="font-mono text-[10px] tracking-widest text-red-400">REVENUE DIAGNOSTIC</span>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
            Where the Money Is Leaking
          </h2>
          <p className="text-zinc-500 text-sm mt-0.5">
            Industry averages for a mid-volume med spa. Every leak has a direct fix.
          </p>
        </div>

        {/* Total leakage callout */}
        <div className="flex-shrink-0 rounded-xl px-5 py-4 border border-red-500/20 bg-red-500/5">
          <div className="text-red-400 font-mono text-[10px] tracking-widest mb-1">EST. MONTHLY LEAKAGE</div>
          <div className="text-white font-bold text-3xl tracking-tight leading-none">
            $15,200
            <span className="text-zinc-500 text-sm font-normal">/mo</span>
          </div>
          <div className="text-zinc-600 font-mono text-[9px] mt-1">before a single new ad is run</div>
        </div>
      </div>

      {/* Leak cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {LEAKS.map((leak) => {
          const Icon = leak.Icon
          return (
            <motion.div
              key={leak.label}
              variants={staggerItem}
              className="rounded-xl p-5 border"
              style={{ background: leak.colorBg, borderColor: leak.border }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-black/30">
                    <Icon size={15} style={{ color: leak.color }} />
                  </div>
                  <span
                    className="font-mono text-[9px] font-bold px-2 py-0.5 rounded"
                    style={{ background: 'rgba(0,0,0,0.25)', color: leak.color }}
                  >
                    {leak.badge}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-2xl leading-none tracking-tight">
                    {leak.amount}
                  </div>
                  <div className="text-zinc-500 font-mono text-[9px]">{leak.period} estimated</div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-sm mb-1.5">{leak.label}</h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-3">{leak.description}</p>

              {/* Fix attribution */}
              <div className="flex items-center gap-1.5 pt-2.5 border-t border-white/[0.06]">
                <ArrowRight size={10} className="text-primary flex-shrink-0" />
                <span className="text-primary font-mono text-[9px]">Fixed by: {leak.fixedBy}</span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Footer note */}
      <div className="rounded-xl p-4 bg-surface-1 border border-white/10 flex items-start gap-3">
        <div className="w-0.5 self-stretch rounded-full bg-primary flex-shrink-0" />
        <p className="text-zinc-400 text-xs leading-relaxed">
          These are conservative industry averages. Actual leakage depends on call volume, database size, and current
          follow-up processes — or lack thereof. The AI Front Desk patches all four categories simultaneously,
          running 24/7 without staff overhead.
        </p>
      </div>
    </div>
  )
}
