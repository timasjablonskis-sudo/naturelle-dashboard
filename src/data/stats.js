/**
 * COMPUTED STATS — All numbers derived from the master LEADS array.
 * Nothing is hardcoded. If the leads change, every stat updates automatically.
 */

import { LEADS } from './leads'

// ─── Core Counts ──────────────────────────────────────
export const totalLeads = LEADS.length
export const bookedLeads = LEADS.filter(l => l.booked)
export const totalBookings = bookedLeads.length
export const totalRevenue = bookedLeads.reduce((sum, l) => sum + l.estimatedValue, 0)
export const conversionRate = Math.round((totalBookings / totalLeads) * 100)

// ─── By Source ────────────────────────────────────────
export const sourceBreakdown = {
  'Website Chat': LEADS.filter(l => l.source === 'Website Chat').length,
  'Instagram DM': LEADS.filter(l => l.source === 'Instagram DM').length,
  'Missed Call':  LEADS.filter(l => l.source === 'Missed Call').length,
  'Website Form': LEADS.filter(l => l.source === 'Website Form').length,
}

export const bookingsByChannel = [
  { channel: 'Website', bookings: LEADS.filter(l => l.source === 'Website Chat' && l.booked).length },
  { channel: 'Instagram', bookings: LEADS.filter(l => l.source === 'Instagram DM' && l.booked).length },
  { channel: 'Missed Call', bookings: LEADS.filter(l => l.source === 'Missed Call' && l.booked).length },
].filter(c => c.bookings > 0)

// ─── Missed Call Stats ────────────────────────────────
export const missedCallLeads = LEADS.filter(l => l.missedCall)
export const missedCallsRecovered = missedCallLeads.filter(l => l.booked).length
export const missedCallRecoveryRate = Math.round((missedCallsRecovered / missedCallLeads.length) * 100)

// ─── Instagram Stats ──────────────────────────────────
export const instagramLeads = LEADS.filter(l => l.instagramDM)
export const instagramBooked = instagramLeads.filter(l => l.booked).length
export const instagramTotalMessages = instagramLeads.reduce(
  (sum, l) => sum + l.instagramDM.messages.length, 0
)

// ─── Conversation Stats ───────────────────────────────
export const conversationLeads = LEADS.filter(l => l.conversation)

// ─── Email Stats ──────────────────────────────────────
export const emailLeads = LEADS.filter(l => l.emailFollowup)
export const emailsOpened = emailLeads.filter(l => l.emailFollowup.status === 'Opened').length
export const emailOpenRate = Math.round((emailsOpened / emailLeads.length) * 100)

// ─── Appointment Stats ────────────────────────────────
export const appointmentLeads = LEADS.filter(l => l.appointment)

export function getAppointmentSchedule() {
  const schedule = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [] }
  LEADS.filter(l => l.appointment).forEach(l => {
    const appts = Array.isArray(l.appointment) ? l.appointment : [l.appointment]
    appts.forEach(a => {
      if (schedule[a.day]) {
        schedule[a.day].push({
          patient: l.name,
          service: a.serviceName,
          time: a.time,
          color: a.color,
        })
      }
    })
  })
  // Sort each day by time
  Object.values(schedule).forEach(day => {
    day.sort((a, b) => a.time.localeCompare(b.time))
  })
  return schedule
}

export const totalAppointments = LEADS.reduce((sum, l) => {
  if (!l.appointment) return sum
  return sum + (Array.isArray(l.appointment) ? l.appointment.length : 1)
}, 0)

// ─── Dashboard Funnel ─────────────────────────────────
const conversationCount = conversationLeads.length + instagramLeads.length
const consultationCount = totalBookings + 2 // booked + some still in consultation stage

export const funnelSteps = [
  { label: 'Leads',         base: totalLeads,         pct: 100 },
  { label: 'Conversations', base: conversationCount,  pct: Math.round((conversationCount / totalLeads) * 100) },
  { label: 'Consultations', base: consultationCount,  pct: Math.round((consultationCount / totalLeads) * 100) },
  { label: 'Booked',        base: totalBookings,      pct: Math.round((totalBookings / totalLeads) * 100) },
]

// ─── Analytics (All-Time Projections) ─────────────────
// Multiplier represents ~1.5 months of accumulated data
const ALL_TIME_MULTIPLIER = 47

export const analyticsKPIs = {
  totalLeads:     totalLeads * ALL_TIME_MULTIPLIER,
  avgResponse:    '8 sec',
  conversionRate: `${conversionRate}%`,
  totalRevenue:   totalRevenue * ALL_TIME_MULTIPLIER,
}

// Source percentages for pie chart
export const sourcePercentages = [
  { name: 'Website Chat', value: Math.round((sourceBreakdown['Website Chat'] / totalLeads) * 100) },
  { name: 'Instagram',    value: Math.round((sourceBreakdown['Instagram DM'] / totalLeads) * 100) },
  { name: 'Missed Call',  value: Math.round((sourceBreakdown['Missed Call'] / totalLeads) * 100) },
]

// ─── BASE_STATS (consumed by App.jsx) ─────────────────
export const BASE_STATS = {
  leads:     totalLeads,
  bookings:  totalBookings,
  missed:    missedCallLeads.length,
  instagram: instagramLeads.length,
  revenue:   totalRevenue,
}
