import React, { useState } from 'react'
import { Calendar, List, Plus, Clock, User } from 'lucide-react'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const dayAbbr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const schedule = {
  Monday: [
    { patient: 'Anna T.', service: 'IV Therapy', time: '10:00 AM', color: '#a78bfa' },
    { patient: 'Rachel K.', service: 'Botox', time: '2:00 PM', color: '#8BBCAD' },
  ],
  Tuesday: [
    { patient: 'Emily R.', service: 'Botox Consultation', time: '2:30 PM', color: '#8BBCAD' },
    { patient: 'Michael B.', service: 'HydraFacial', time: '4:00 PM', color: '#8BBCAD' },
  ],
  Wednesday: [
    { patient: 'Sarah L.', service: 'Weight Loss Consultation', time: '11:00 AM', color: '#f59e0b' },
    { patient: 'Lisa P.', service: 'Lip Fillers', time: '3:00 PM', color: '#f472b6' },
  ],
  Thursday: [
    { patient: 'Anna T.', service: 'IV Therapy Follow-up', time: '4:00 PM', color: '#a78bfa' },
    { patient: 'Jessica M.', service: 'Lip Filler Consult', time: '1:30 PM', color: '#f472b6' },
  ],
  Friday: [
    { patient: 'Maria C.', service: 'PRP Treatment', time: '11:30 AM', color: '#4ade80' },
  ],
  Saturday: [
    { patient: 'David W.', service: 'Microneedling', time: '10:30 AM', color: '#fb923c' },
    { patient: 'James T.', service: 'Weight Loss Consult', time: '12:00 PM', color: '#f59e0b' },
  ],
}

const allAppts = Object.entries(schedule).flatMap(([day, appts]) =>
  appts.map((a) => ({ ...a, day }))
).sort((a, b) => {
  const di = days.indexOf(a.day) - days.indexOf(b.day)
  if (di !== 0) return di
  return a.time.localeCompare(b.time)
})

export default function Appointments({ simAppointments = [], simStarted = false }) {
  const [view, setView] = useState('calendar')

  // Merge sim appointments into Thursday (first available slot)
  const liveSchedule = { ...schedule }
  simAppointments.forEach((sa) => {
    const day = sa.day || 'Thursday'
    if (!liveSchedule[day]) liveSchedule[day] = []
    liveSchedule[day] = [
      { patient: sa.name, service: sa.service, time: sa.time, color: '#8BBCAD', isNew: true },
      ...liveSchedule[day],
    ]
  })

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl text-white tracking-wide">Appointments</h2>
          <p className="text-[#4a6560] text-sm mt-0.5">This week's schedule — booked by AI.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#8BBCAD]/10 border border-[#8BBCAD]/30 rounded-xl px-3 py-1.5">
            <span className="text-[#8BBCAD] font-mono text-xs font-bold">16 APPOINTMENTS THIS WEEK</span>
          </div>
          {/* View toggle */}
          <div className="flex bg-[#0D1110] border border-[#333] rounded-lg overflow-hidden">
            <button
              onClick={() => setView('calendar')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono transition-colors ${
                view === 'calendar' ? 'bg-[#8BBCAD] text-[#0D1110]' : 'text-[#888]'
              }`}
            >
              <Calendar size={12} />
              Calendar
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono transition-colors ${
                view === 'list' ? 'bg-[#8BBCAD] text-[#0D1110]' : 'text-[#888]'
              }`}
            >
              <List size={12} />
              List
            </button>
          </div>
          <button className="flex items-center gap-1.5 bg-[#8BBCAD] text-[#0D1110] rounded-lg px-4 py-2 text-sm font-semibold hover:bg-[#9ECFC0] transition-colors">
            <Plus size={14} />
            New Appointment
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="grid grid-cols-6 gap-3">
          {days.map((day, di) => (
            <div key={day} className="bg-[#131918] border border-[#1E2B28] rounded-xl overflow-hidden">
              {/* Day header */}
              <div className="px-3 py-2 border-b border-[#1E2B28] bg-[#0D1110]">
                <div className="font-mono text-[10px] text-[#4a6560]">{dayAbbr[di]}</div>
                <div className="text-white font-semibold text-sm">{day.slice(0, 3)}</div>
              </div>
              {/* Appointments */}
              <div className="p-2 space-y-2 min-h-[160px]">
                {(liveSchedule[day] || []).map((appt, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-2 cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ background: appt.color + '18', borderLeft: `2px solid ${appt.color}` }}
                  >
                    {appt.isNew && <div className="font-mono text-[8px] mb-0.5 text-[#8BBCAD]">✦ AI BOOKED</div>}
                    <div className="font-mono text-[9px] mb-0.5" style={{ color: appt.color }}>{appt.time}</div>
                    <div className="text-white text-[11px] font-medium leading-tight">{appt.patient}</div>
                    <div className="text-[#6a8a85] text-[10px] leading-tight mt-0.5">{appt.service}</div>
                  </div>
                ))}
                {(liveSchedule[day] || []).length === 0 && (
                  <div className="flex items-center justify-center h-full pt-4">
                    <span className="text-[#333333] font-mono text-[10px]">{simStarted ? 'No appts' : 'No appointments'}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {allAppts.map((appt, i) => (
            <div
              key={i}
              className="bg-[#131918] border border-[#1E2B28] rounded-xl px-5 py-4 flex items-center gap-5 hover:border-[#333333] transition-colors"
            >
              <div
                className="w-1 h-10 rounded-full flex-shrink-0"
                style={{ background: appt.color }}
              />
              <div className="w-24 flex-shrink-0">
                <div className="text-[#4a6560] font-mono text-[10px]">{appt.day.slice(0, 3).toUpperCase()}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock size={11} className="text-[#8BBCAD]" />
                  <span className="text-white font-mono text-xs">{appt.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 flex-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#0D1110] font-bold text-sm"
                  style={{ background: appt.color }}
                >
                  {appt.patient[0]}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{appt.patient}</div>
                  <div className="text-[#4a6560] text-xs">{appt.service}</div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="bg-[#8BBCAD]/10 text-[#8BBCAD] border border-[#8BBCAD]/30 font-mono text-[10px] px-2 py-0.5 rounded-full">
                  Confirmed
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
