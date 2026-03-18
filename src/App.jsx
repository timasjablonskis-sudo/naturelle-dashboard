import React, { useState, useRef, useCallback } from 'react'
import InteractiveBackground from './components/InteractiveBackground'
import FloatingNav from './components/FloatingNav'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Conversations from './components/Conversations'
import MissedCalls from './components/MissedCalls'
import Instagram from './components/Instagram'
import Reviews from './components/Reviews'
import Appointments from './components/Appointments'
import Leads from './components/Leads'
import Analytics from './components/Analytics'
import Automations from './components/Automations'
import EmailFollowup from './components/EmailFollowup'
import SimToast from './components/SimToast'
import CommandPalette, { openCommandPalette } from './components/CommandPalette'

const BASE_STATS = {
  leads: 42,
  bookings: 16,
  missed: 12,
  instagram: 18,
  revenue: 13600,
}

const SIM_EVENTS = [
  {
    delay: 1200,
    toast: { type: 'instagram', title: '📱 New Instagram DM', body: '@glowgirl22: "Hi! Do you offer Botox and how much does it cost?"' },
    igConversation: {
      id: 99,
      name: 'Olivia K.',
      handle: '@glowgirl22',
      preview: 'Hi! Do you offer Botox?',
      time: 'just now',
      status: 'In Progress',
      booked: false,
      isNew: true,
      messages: [
        { from: 'visitor', text: 'Hi! Do you offer Botox and how much does it cost?' },
      ],
    },
  },
  {
    delay: 3000,
    toast: { type: 'instagram', title: '🤖 AI Responded Instantly', body: '"Hi! Yes, Wishful Beauty Med Spa offers Botox from $12/unit. Want to book a consult?"' },
    igUpdate: { id: 99, message: { from: 'ai', text: 'Hi! Yes, Wishful Beauty Med Spa offers Botox starting at $12/unit. We also have a special right now: 20 units for $179! Would you like to book a consultation?' } },
  },
  {
    delay: 5200,
    toast: { type: 'booked', title: '✅ Consultation Booked!', body: 'Botox consult confirmed for @glowgirl22 — Thursday 2:00 PM' },
    stat: { leads: 1, bookings: 1, instagram: 1, revenue: 550 },
    feed: { icon: '📸', text: 'AI booked Botox consultation from Instagram DM — @glowgirl22', time: 'just now' },
    appointment: { name: 'Olivia K.', service: 'Botox Consultation', day: 'Thursday', time: '2:00 PM' },
    lead: { name: 'Olivia K.', service: 'Botox', source: 'Instagram DM', status: 'Consultation Booked', date: 'Just now' },
    igUpdate: { id: 99, message: { from: 'visitor', text: 'Yes please! That deal sounds amazing' }, status: 'Consultation Booked', booked: true, preview: 'Consultation booked ✅' },
  },
  {
    delay: 8000,
    toast: { type: 'missed', title: '📞 Missed Call Detected', body: 'Sarah M. called about Laser Hair Removal — AI texting back now' },
    missedCall: {
      name: 'Sarah M.',
      time: 'Just now',
      service: 'Laser Hair Removal',
      status: 'AI Responding',
      isNew: true,
      aiResponse: 'Hi Sarah! You just missed a call from Wishful Beauty Med Spa. We saw you were inquiring about Laser Hair Removal. Want to book an appointment this week?',
    },
  },
  {
    delay: 10000,
    toast: { type: 'missed', title: '💬 AI Texted Back in 8 Seconds', body: '"Hi Sarah! You called about Laser Hair Removal — want to book an appointment?"' },
  },
  {
    delay: 12500,
    toast: { type: 'booked', title: '✅ Laser Hair Removal Appointment Booked!', body: 'Sarah M. confirmed — Friday 11:00 AM' },
    stat: { leads: 1, missed: 1, revenue: 250 },
    feed: { icon: '📞', text: 'Missed call recovered — Sarah M. booked Laser Hair Removal appointment', time: 'just now' },
    appointment: { name: 'Sarah M.', service: 'Laser Hair Removal', day: 'Friday', time: '11:00 AM' },
    lead: { name: 'Sarah M.', service: 'Laser Hair Removal', source: 'Missed Call', status: 'Consultation Booked', date: 'Just now' },
    missedCallUpdate: { name: 'Sarah M.', status: 'Consultation Booked' },
  },
  {
    delay: 15500,
    toast: { type: 'email', title: '📧 Follow-Up Emails Sent', body: 'AI sent follow-up to 3 leads who have not booked in 24h' },
    feed: { icon: '📧', text: 'Automated follow-up email sent to 3 unbooked leads', time: 'just now' },
    emailExample: { to: 'Jessica M.', service: 'Lip Filler', subject: 'Your consultation at Wishful Beauty Med Spa', preview: 'Hi Jessica! We wanted to follow up on your interest in lip fillers...' },
  },
  {
    delay: 18500,
    toast: { type: 'review', title: '⭐ New 5-Star Google Review', body: 'Mia T.: "The AI booking made it so easy. Amazing results!"' },
    feed: { icon: '⭐', text: 'New 5-star review posted — AI sent thank-you response automatically', time: 'just now' },
    review: {
      name: 'Mia T.',
      rating: 5,
      text: 'The AI receptionist booked my Botox appointment instantly at midnight — no waiting, no phone tag. And the results? Incredible. Wishful Beauty Med Spa is next level.',
      aiResponse: "Mia, thank you so much! We're thrilled our AI front desk made booking effortless — and even more thrilled you love your results! Can't wait to see you again. 💚",
      status: 'Response Posted',
      time: 'just now',
      isNew: true,
    },
  },
]

let toastIdCounter = 0

export default function App() {
  const [active, setActive] = useState('dashboard')
  const [simRunning, setSimRunning] = useState(false)
  const [simStarted, setSimStarted] = useState(false)
  const [simStats, setSimStats] = useState({ ...BASE_STATS })
  const [simFeed, setSimFeed] = useState([])
  const [toasts, setToasts] = useState([])
  const [simAppointments, setSimAppointments] = useState([])
  const [simLeads, setSimLeads] = useState([])
  const [simMissedCalls, setSimMissedCalls] = useState([])
  const [simEmails, setSimEmails] = useState([])
  const [simReviews, setSimReviews] = useState([])
  const [simIgConversations, setSimIgConversations] = useState([])
  const timersRef = useRef([])

  const addToast = useCallback((toast) => {
    const id = ++toastIdCounter
    setToasts((prev) => [...prev, { ...toast, id }])
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t))
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 350)
    }, 4000)
  }, [])

  const startSim = useCallback(() => {
    if (simRunning) return
    setSimRunning(true)
    setSimStarted(true)
    setSimStats({ ...BASE_STATS })
    setSimFeed([])
    setSimAppointments([])
    setSimLeads([])
    setSimMissedCalls([])
    setSimEmails([])
    setSimReviews([])
    setSimIgConversations([])
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    SIM_EVENTS.forEach((event) => {
      const t = setTimeout(() => {
        if (event.toast) addToast(event.toast)
        if (event.stat) {
          setSimStats((prev) => ({
            leads:     prev.leads     + (event.stat.leads     || 0),
            bookings:  prev.bookings  + (event.stat.bookings  || 0),
            missed:    prev.missed    + (event.stat.missed    || 0),
            instagram: prev.instagram + (event.stat.instagram || 0),
            revenue:   prev.revenue   + (event.stat.revenue   || 0),
          }))
        }
        if (event.feed)              setSimFeed((prev) => [event.feed, ...prev])
        if (event.appointment)       setSimAppointments((prev) => [event.appointment, ...prev])
        if (event.lead)              setSimLeads((prev) => [event.lead, ...prev])
        if (event.missedCall)        setSimMissedCalls((prev) => [event.missedCall, ...prev])
        if (event.emailExample)      setSimEmails((prev) => [event.emailExample, ...prev])
        if (event.review)            setSimReviews((prev) => [event.review, ...prev])
        if (event.igConversation)    setSimIgConversations((prev) => [event.igConversation, ...prev])
        if (event.igUpdate) {
          setSimIgConversations((prev) => prev.map((c) =>
            c.id === event.igUpdate.id
              ? {
                  ...c,
                  messages: [...c.messages, event.igUpdate.message],
                  ...(event.igUpdate.status ? { status: event.igUpdate.status } : {}),
                  ...(event.igUpdate.booked !== undefined ? { booked: event.igUpdate.booked } : {}),
                  ...(event.igUpdate.preview ? { preview: event.igUpdate.preview } : {}),
                }
              : c
          ))
        }
        if (event.missedCallUpdate) {
          setSimMissedCalls((prev) => prev.map((c) =>
            c.name === event.missedCallUpdate.name ? { ...c, status: event.missedCallUpdate.status } : c
          ))
        }
      }, event.delay)
      timersRef.current.push(t)
    })

    const endTimer = setTimeout(() => setSimRunning(false), SIM_EVENTS[SIM_EVENTS.length - 1].delay + 2000)
    timersRef.current.push(endTimer)
  }, [simRunning, addToast])

  const resetSim = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    setSimRunning(false)
    setSimStarted(false)
    setSimStats({ ...BASE_STATS })
    setSimFeed([])
    setSimAppointments([])
    setSimLeads([])
    setSimMissedCalls([])
    setSimEmails([])
    setSimReviews([])
    setSimIgConversations([])
    setToasts([])
  }, [])

  const panels = {
    dashboard:     <Dashboard simStats={simStats} simFeed={simFeed} simRunning={simRunning} simStarted={simStarted} onStart={startSim} onReset={resetSim} />,
    leads:         <Leads simStarted={simStarted} simLeads={simLeads} />,
    conversations: <Conversations simStarted={simStarted} />,
    missed:        <MissedCalls simStarted={simStarted} simMissedCalls={simMissedCalls} />,
    instagram:     <Instagram simStarted={simStarted} simConversations={simIgConversations} />,
    reviews:       <Reviews simReviews={simReviews} />,
    appointments:  <Appointments simAppointments={simAppointments} simStarted={simStarted} />,
    automations:   <Automations />,
    analytics:     <Analytics simStarted={simStarted} />,
    email:         <EmailFollowup simEmails={simEmails} simStarted={simStarted} />,
  }

  return (
    <div className="relative h-screen overflow-hidden font-sans" style={{ background: 'var(--bg-deep)' }}>
      <InteractiveBackground />
      <div className="relative z-10 flex flex-col h-full">
        <Header simStats={simStats} />
        <main className="flex-1 overflow-y-auto px-6 pt-4 pb-28">
          {panels[active] || panels.dashboard}
        </main>
      </div>
      <FloatingNav active={active} setActive={setActive} onCommandOpen={openCommandPalette} />
      <CommandPalette setActive={setActive} />
      <SimToast toasts={toasts} />
    </div>
  )
}
