/**
 * MASTER LEAD DATABASE — Single Source of Truth
 *
 * Every person, stat, and number across the entire dashboard
 * derives from this array. If it's not here, it doesn't exist.
 *
 * Sources (18 total):
 *   Website Chat: 6  |  Instagram DM: 4  |  Missed Call: 6  |  Website Form: 2
 *
 * Booked: 8 of 18 (44% conversion)
 * Revenue: $8,200 (sum of booked leads' estimatedValue)
 */

export const LEADS = [
  // ──────────────────────────────────────────────
  // WEBSITE CHAT (6 leads)
  // ──────────────────────────────────────────────
  {
    id: 1,
    name: 'Emily R.',
    phone: '(312) 555-0182',
    email: 'emily.r@email.com',
    source: 'Website Chat',
    service: 'Neuromodulators',
    status: 'Consultation Booked',
    date: 'Today 2:30 PM',
    estimatedValue: 840,
    booked: true,

    conversation: {
      channel: 'Website Chat',
      preview: 'That works for me!',
      time: '2m ago',
      live: true,
      messages: [
        { from: 'visitor', text: "Hi, I'm interested in neuromodulators. What are your prices?" },
        { from: 'ai', text: "Hi! Neuromodulators (Botox/Dysport) at Naturelle Med Spa start at $12/unit. We focus on natural-looking results tailored to your unique features. Would you like to book a consultation?" },
        { from: 'visitor', text: 'Yes! What availability do you have this week?' },
        { from: 'ai', text: "I'd love to help you book! We have openings this week at our Wheaton location. What day works best for you?" },
        { from: 'visitor', text: 'Thursday afternoon works!' },
        { from: 'ai', text: "Perfect! I've reserved Thursday afternoon for your neuromodulator consultation at 400 W Liberty Dr Suite B, Wheaton. You'll receive a confirmation text shortly. See you then!" },
      ],
    },

    emailFollowup: {
      subject: 'Your complimentary neuromodulator consultation at Naturelle Med Spa',
      timestamp: '3m ago',
      status: 'Opened',
      body: `Hi Emily,\n\nThank you for your interest in neuromodulators (Botox/Dysport) at Naturelle Med Spa! We wanted to personally reach out and make sure you have everything you need.\n\nAt Naturelle Med Spa, we specialize in natural-looking results tailored to your unique features. Neuromodulators start at just $12/unit, and our expert providers will create a personalized treatment plan during a complimentary consultation.\n\nWe have availability at our Wheaton location this week. Book your free consultation today — we'd love to help you look and feel your natural best.`,
    },

    appointment: {
      day: 'Tuesday',
      time: '2:30 PM',
      serviceName: 'Neuromodulator Consult',
      color: '#059669',
    },

    missedCall: null,
    instagramDM: null,
  },

  {
    id: 2,
    name: 'Michael B.',
    phone: '(312) 555-0527',
    email: 'mike.b@email.com',
    source: 'Website Chat',
    service: 'SkinVive',
    status: 'Consultation Booked',
    date: 'Today 10:05 AM',
    estimatedValue: 450,
    booked: true,

    conversation: {
      channel: 'Website Chat',
      preview: "Let's book Saturday",
      time: '1h ago',
      live: false,
      messages: [
        { from: 'visitor', text: 'What is SkinVive? I keep seeing it on Instagram.' },
        { from: 'ai', text: "Great question! SkinVive is an injectable skin quality treatment that improves hydration, smoothness, and glow from within. It's one of our most popular treatments at Naturelle Med Spa!" },
        { from: 'visitor', text: 'How much is it?' },
        { from: 'ai', text: 'SkinVive treatments start at $450. Results last about 6 months with improved skin texture and hydration. Most clients see a beautiful glow within 2 weeks! Ready to book?' },
        { from: 'visitor', text: "Let's book Saturday" },
        { from: 'ai', text: "I'd love to help you book! Confirming your SkinVive consultation for Saturday at Naturelle Med Spa in Wheaton. See you then!" },
      ],
    },

    emailFollowup: {
      subject: 'Discover SkinVive — the glow-from-within treatment',
      timestamp: '12m ago',
      status: 'Opened',
      body: `Hi Michael,\n\nThank you for reaching out about SkinVive at Naturelle Med Spa. We're excited to share more!\n\nSkinVive is a revolutionary injectable that improves skin quality from within — better hydration, smoothness, and a natural glow that lasts about 6 months. Most clients see visible results within 2 weeks.\n\nWe have openings this week at our Wheaton location. Click below to lock in your consultation — your skin will thank you.`,
    },

    appointment: {
      day: 'Tuesday',
      time: '4:00 PM',
      serviceName: 'SkinVive Treatment',
      color: '#10b981',
    },

    missedCall: null,
    instagramDM: null,
  },

  {
    id: 3,
    name: 'Rachel V.',
    phone: '(773) 555-0639',
    email: 'rachel.v@email.com',
    source: 'Website Chat',
    service: 'Dermal Fillers',
    status: 'Consultation Booked',
    date: 'Today 12:20 PM',
    estimatedValue: 1100,
    booked: true,

    conversation: {
      channel: 'Website Chat',
      preview: 'Friday works!',
      time: '30m ago',
      live: false,
      messages: [
        { from: 'visitor', text: 'How much are dermal fillers?' },
        { from: 'ai', text: 'Dermal fillers at Naturelle Med Spa start at $550 per syringe. We use premium hyaluronic acid fillers for natural-looking enhancement that lasts 6–18 months depending on the area.' },
        { from: 'visitor', text: "Oh that's not bad. What areas do you treat?" },
        { from: 'ai', text: "We treat lips, cheeks, jawline, chin, under-eyes, and nasolabial folds. Our approach focuses on enhancing your natural beauty — subtle, personalized results. Want to book a free consultation?" },
        { from: 'visitor', text: "Yes, I'm interested!" },
        { from: 'ai', text: "I have Thursday at 2pm and Friday at 11am open this week. Which works for you?" },
        { from: 'visitor', text: 'Friday works!' },
        { from: 'ai', text: "Done! Booking you in for Friday at 11am for a dermal filler consultation at Naturelle Med Spa. You'll get a reminder text the morning of. See you then!" },
      ],
    },

    appointment: {
      day: 'Friday',
      time: '11:00 AM',
      serviceName: 'Dermal Filler Consult',
      color: '#f472b6',
    },

    emailFollowup: null,
    missedCall: null,
    instagramDM: null,
  },

  {
    id: 4,
    name: 'Rachel K.',
    phone: '(773) 555-0411',
    email: 'rachel.k@email.com',
    source: 'Website Chat',
    service: 'Neuromodulators',
    status: 'Contacted',
    date: 'Today 9:15 AM',
    estimatedValue: 0,
    booked: false,

    emailFollowup: {
      subject: 'Sculptra: Natural collagen restoration that lasts 2+ years',
      timestamp: '1h ago',
      status: 'Delivered',
      body: `Hi Rachel,\n\nWe noticed you inquired about neuromodulators recently and wanted to follow up with some helpful info.\n\nNeuromodulators (Botox/Dysport) at Naturelle Med Spa start at just $12/unit. Our providers specialize in natural-looking results — no frozen faces here. Most clients need 20–40 units, and results last 3–4 months.\n\nIf you have any questions, we're happy to chat. Otherwise, book your free consultation below — we'd love to help you achieve your aesthetic goals naturally.`,
    },

    conversation: null,
    missedCall: null,
    instagramDM: null,
    appointment: null,
  },

  {
    id: 5,
    name: 'James T.',
    phone: '(312) 555-0956',
    email: 'james.t@email.com',
    source: 'Website Chat',
    service: 'PDO Threads',
    status: 'Interested',
    date: 'Today 11:40 AM',
    estimatedValue: 0,
    booked: false,

    emailFollowup: {
      subject: 'Your skin transformation starts here',
      timestamp: '2h ago',
      status: 'Opened',
      body: `Hi James,\n\nThank you for your interest in PDO Threads at Naturelle Med Spa. It's one of our most transformative treatments — and for good reason.\n\nPDO Threads provide a non-surgical lift for jawline, cheeks, neck, and brows. Results last 12–18 months with minimal downtime. Most clients see an immediate improvement that continues to build over the following weeks.\n\nBook a free consultation and our team will assess your goals and recommend the best treatment plan for you.`,
    },

    conversation: null,
    missedCall: null,
    instagramDM: null,
    appointment: null,
  },

  {
    id: 6,
    name: 'Jordan P.',
    phone: '(630) 555-0318',
    email: 'jordan.p@email.com',
    source: 'Website Chat',
    service: 'PRP',
    status: 'Follow-up Sent',
    date: 'Today 2:18 PM',
    estimatedValue: 0,
    booked: false,

    conversation: {
      channel: 'Instagram',
      preview: 'how long does PRP take',
      time: '18m ago',
      live: false,
      messages: [
        { from: 'visitor', text: 'do you offer PRP treatments?' },
        { from: 'ai', text: "Yes! Naturelle Med Spa offers PRP (Platelet-Rich Plasma) therapy for skin rejuvenation and hair restoration. It uses your body's own growth factors for natural healing. Would you like to learn more?" },
        { from: 'visitor', text: 'how long does PRP take' },
        { from: 'ai', text: 'PRP sessions take about 45–60 minutes including the blood draw and treatment. Most clients see visible improvement after 2–3 sessions. Want me to book you in?' },
      ],
    },

    emailFollowup: null,
    missedCall: null,
    instagramDM: null,
    appointment: null,
  },

  // ──────────────────────────────────────────────
  // INSTAGRAM DM (4 leads)
  // ──────────────────────────────────────────────
  {
    id: 7,
    name: 'Ashley R.',
    phone: '(847) 555-0223',
    email: 'ashley.r@email.com',
    source: 'Instagram DM',
    service: 'Dermal Fillers',
    status: 'Consultation Booked',
    date: 'Today 1:45 PM',
    estimatedValue: 1100,
    booked: true,

    instagramDM: {
      preview: 'Thursday afternoon',
      time: '2m ago',
      messages: [
        { from: 'visitor', text: 'How much are dermal fillers?' },
        { from: 'ai', text: 'Hi! At Naturelle Med Spa, dermal fillers start at $550/syringe. We specialize in natural-looking enhancement for lips, cheeks, jawline, and more. Would you like to book a consultation?' },
        { from: 'visitor', text: 'Yes, what times do you have?' },
        { from: 'ai', text: 'We have availability at our Wheaton location this week! Which day works best for you?' },
        { from: 'visitor', text: 'Thursday afternoon' },
        { from: 'ai', text: "Perfect! I've noted Thursday afternoon for a dermal filler consultation. Confirming your appointment at Naturelle Med Spa, 400 W Liberty Dr Suite B, Wheaton, IL 60187. You'll receive a confirmation shortly!" },
      ],
    },

    appointment: {
      day: 'Thursday',
      time: '2:00 PM',
      serviceName: 'Dermal Filler Consult',
      color: '#f472b6',
    },

    conversation: null,
    emailFollowup: null,
    missedCall: null,
  },

  {
    id: 8,
    name: 'Kayla M.',
    phone: '(630) 555-0492',
    email: 'kayla.m@email.com',
    source: 'Instagram DM',
    service: 'Kybella',
    status: 'Consultation Booked',
    date: 'Today 1:10 PM',
    estimatedValue: 1200,
    booked: true,

    instagramDM: {
      preview: 'yes omg book me',
      time: '35m ago',
      messages: [
        { from: 'visitor', text: 'Do you offer Kybella for double chin?' },
        { from: 'ai', text: "Yes! Kybella permanently destroys fat cells under the chin — no surgery needed. Most clients see visible results in 2–4 sessions. Want to book a consultation?" },
        { from: 'visitor', text: 'yes omg book me' },
        { from: 'ai', text: "Done! Booking you in for a Kybella consultation at Naturelle Med Spa. What day works best this week?" },
      ],
    },

    appointment: {
      day: 'Wednesday',
      time: '3:00 PM',
      serviceName: 'Kybella Consultation',
      color: '#059669',
    },

    conversation: null,
    emailFollowup: null,
    missedCall: null,
  },

  {
    id: 9,
    name: 'Nina C.',
    phone: '(312) 555-0873',
    email: 'nina.c@email.com',
    source: 'Instagram DM',
    service: 'General Inquiry',
    status: 'Replied',
    date: 'Today 11:00 AM',
    estimatedValue: 0,
    booked: false,

    instagramDM: {
      preview: 'What treatments do you offer?',
      time: '1h ago',
      messages: [
        { from: 'visitor', text: 'What treatments do you offer?' },
        { from: 'ai', text: "We offer neuromodulators, dermal fillers, Sculptra, PRP, PRF, PDO Threads, Kybella, microneedling, SkinVive, and Vitamin B12 injections! Everything focused on enhancing your natural beauty. Want to book a consultation?" },
        { from: 'visitor', text: 'Ooh yes, what does the consultation involve?' },
        { from: 'ai', text: "It's a personalized assessment with one of our providers to review your aesthetic goals and recommend the best treatment path. Completely complimentary! Want me to schedule you in?" },
      ],
    },

    conversation: null,
    emailFollowup: null,
    missedCall: null,
    appointment: null,
  },

  {
    id: 10,
    name: 'Jessica M.',
    phone: '(773) 555-0241',
    email: 'jess.m@email.com',
    source: 'Instagram DM',
    service: 'Dermal Fillers',
    status: 'Follow-up Sent',
    date: 'Today 9:45 AM',
    estimatedValue: 0,
    booked: false,

    instagramDM: {
      preview: 'How long do fillers last?',
      time: '2h ago',
      messages: [
        { from: 'visitor', text: 'How long do fillers last?' },
        { from: 'ai', text: "Dermal fillers typically last 6–18 months depending on the area and product used. Lip fillers tend to last 6–12 months, while cheek and jawline fillers can last up to 18 months. Want to book a consultation to discuss your goals?" },
        { from: 'visitor', text: "I'll think about it" },
        { from: 'ai', text: "No rush at all! We're here whenever you're ready. Feel free to DM us anytime with questions. We'd love to help you feel your most confident!" },
      ],
    },

    conversation: null,
    emailFollowup: null,
    missedCall: null,
    appointment: null,
  },

  // ──────────────────────────────────────────────
  // MISSED CALL (6 leads)
  // ──────────────────────────────────────────────
  {
    id: 11,
    name: 'Sarah M.',
    phone: '(847) 555-0374',
    email: 'sarah.m@email.com',
    source: 'Missed Call',
    service: 'Neuromodulators',
    status: 'Consultation Booked',
    date: 'Today 9:30 AM',
    estimatedValue: 600,
    booked: true,

    missedCall: {
      time: '9:30 AM',
      responseTime: '8 seconds',
      aiResponse: 'Hi Sarah! Thanks for contacting Naturelle Med Spa. We saw you called about neuromodulators (Botox/Dysport). We focus on natural-looking results. Would you like to book a consultation?',
      sequence: [
        { touch: 1, delay: '2 hrs', message: "Hey Sarah — saw you were interested in neuromodulators. Any questions? I'm happy to help.", badge: 'Opened' },
        { touch: 2, delay: '24 hrs', message: "Quick reminder: consultations are complimentary and our providers will create a personalized plan. Want to grab a time?", badge: 'Replied' },
        { touch: 3, delay: '72 hrs', message: "Last chance this week! We have a few openings left. Want me to lock one in for you?", badge: 'Booked ✓' },
      ],
    },

    conversation: {
      channel: 'SMS',
      preview: 'AI: Free consult booked!',
      time: '40m ago',
      live: false,
      messages: [
        { from: 'ai', text: 'Hi Sarah! This is Naturelle Med Spa — we saw you called about neuromodulators. We offer Botox/Dysport starting at $12/unit with a focus on natural results. Want a free consultation?' },
        { from: 'visitor', text: 'yes how do i sign up' },
        { from: 'ai', text: "Our providers will create a personalized treatment plan during your consultation — most clients need 20–40 units. It's quick, virtually painless, and results last 3–4 months." },
        { from: 'visitor', text: 'ok book me for Tuesday' },
        { from: 'ai', text: "Done! Booking you in for a free neuromodulator consultation on Tuesday at Naturelle Med Spa. You'll get a reminder the morning of. See you then!" },
      ],
    },

    appointment: {
      day: 'Monday',
      time: '10:00 AM',
      serviceName: 'Neuromodulator Consult',
      color: '#059669',
    },

    emailFollowup: null,
    instagramDM: null,
  },

  {
    id: 12,
    name: 'Jennifer K.',
    phone: '(630) 555-0156',
    email: 'jennifer.k@email.com',
    source: 'Missed Call',
    service: 'Sculptra',
    status: 'Consultation Booked',
    date: 'Today 8:45 AM',
    estimatedValue: 1500,
    booked: true,

    missedCall: {
      time: '8:45 AM',
      responseTime: '9 seconds',
      aiResponse: "Hi Jennifer! You missed a call to Naturelle Med Spa. Sculptra is a collagen stimulator with results lasting 2+ years. Want to book a consultation?",
      sequence: [
        { touch: 1, delay: '2 hrs', message: "Hi Jennifer — following up on your Sculptra inquiry. It's our most popular anti-aging treatment with results lasting 2+ years!", badge: 'Opened' },
        { touch: 2, delay: '24 hrs', message: "Sculptra stimulates your body's own collagen. Most clients see a natural improvement that builds over weeks. Want to book a consult?", badge: 'Replied' },
        { touch: 3, delay: '72 hrs', message: "We have one opening left this week for a Sculptra consultation. Shall I grab it for you?", badge: 'Booked ✓' },
      ],
    },

    appointment: {
      day: 'Thursday',
      time: '1:30 PM',
      serviceName: 'Sculptra Consultation',
      color: '#a78bfa',
    },

    conversation: null,
    emailFollowup: null,
    instagramDM: null,
  },

  {
    id: 13,
    name: 'Lisa W.',
    phone: '(312) 555-0745',
    email: 'lisa.w@email.com',
    source: 'Missed Call',
    service: 'Dermal Fillers',
    status: 'Consultation Booked',
    date: 'Today 7:22 AM',
    estimatedValue: 1410,
    booked: true,

    missedCall: {
      time: '7:22 AM',
      responseTime: '5 seconds',
      aiResponse: 'Hi Lisa! We saw you called about dermal fillers at Naturelle Med Spa, starting at $550/syringe. Natural-looking enhancement for lips, cheeks, and more. Shall we book a consult?',
      sequence: [
        { touch: 1, delay: '2 hrs', message: 'Hey — saw you were checking out dermal filler options. Any questions? I can help right now.', badge: 'Opened' },
        { touch: 2, delay: '24 hrs', message: 'Still thinking it over? Here\'s what clients say: "The most natural-looking results — exactly what I wanted!" Want to grab a time?', badge: 'Replied' },
        { touch: 3, delay: '72 hrs', message: 'Last chance — we have openings this week. Want me to grab you a spot?', badge: 'Booked ✓' },
      ],
    },

    appointment: {
      day: 'Wednesday',
      time: '11:00 AM',
      serviceName: 'Dermal Filler Consult',
      color: '#f472b6',
    },

    conversation: null,
    emailFollowup: null,
    instagramDM: null,
  },

  {
    id: 14,
    name: 'Michael T.',
    phone: '(847) 555-0612',
    email: 'michael.t@email.com',
    source: 'Missed Call',
    service: 'Microneedling',
    status: 'Follow-up Sent',
    date: 'Today 10:15 AM',
    estimatedValue: 0,
    booked: false,

    missedCall: {
      time: '10:15 AM',
      responseTime: '6 seconds',
      aiResponse: 'Hi Michael! You called about microneedling at Naturelle Med Spa. We offer standard and PRP-enhanced sessions starting at $300. Want to book a consultation?',
      sequence: null,
    },

    conversation: null,
    emailFollowup: null,
    instagramDM: null,
    appointment: null,
  },

  {
    id: 15,
    name: 'David R.',
    phone: '(630) 555-0891',
    email: 'david.r@email.com',
    source: 'Missed Call',
    service: 'PRP',
    status: 'Follow-up Sent',
    date: 'Today 11:30 AM',
    estimatedValue: 0,
    booked: false,

    missedCall: {
      time: '11:30 AM',
      responseTime: '7 seconds',
      aiResponse: "Hi David! Naturelle Med Spa here. Our PRP treatments use your body's own growth factors for natural rejuvenation. Sessions start at $350. Want to schedule?",
      sequence: null,
    },

    conversation: null,
    emailFollowup: null,
    instagramDM: null,
    appointment: null,
  },

  {
    id: 16,
    name: 'Marcus H.',
    phone: '(312) 555-0334',
    email: 'marcus.h@email.com',
    source: 'Missed Call',
    service: 'Kybella',
    status: 'Follow-up Sent',
    date: 'Today 12:10 PM',
    estimatedValue: 0,
    booked: false,

    missedCall: {
      time: '12:10 PM',
      responseTime: '11 seconds',
      aiResponse: "Hi Marcus! Naturelle Med Spa here — Kybella permanently reduces chin fat without surgery. Typically 2–4 sessions. Want to book a consultation?",
      sequence: null,
    },

    conversation: null,
    emailFollowup: null,
    instagramDM: null,
    appointment: null,
  },

  // ──────────────────────────────────────────────
  // WEBSITE FORM (2 leads)
  // ──────────────────────────────────────────────
  {
    id: 17,
    name: 'Anna T.',
    phone: '(630) 555-0198',
    email: 'anna.t@email.com',
    source: 'Website Form',
    service: 'Sculptra',
    status: 'Interested',
    date: 'Today 9:00 AM',
    estimatedValue: 0,
    booked: false,

    conversation: {
      channel: 'SMS',
      preview: 'See you Wednesday!',
      time: '2h ago',
      live: false,
      messages: [
        { from: 'ai', text: "Hi Anna! Naturelle Med Spa here — following up on your inquiry about Sculptra. This non-surgical collagen stimulator gives natural results that last 2+ years. Want to schedule a consultation?" },
        { from: 'visitor', text: 'Yes what areas can you treat' },
        { from: 'ai', text: "Sculptra works beautifully for cheek volume, temples, jawline definition, and overall facial rejuvenation. It's a great alternative to surgery with gradual, natural results. Want to schedule?" },
        { from: 'visitor', text: 'Wednesday at noon' },
        { from: 'ai', text: 'Confirmed! Sculptra consultation Wednesday at noon at Naturelle Med Spa. See you Wednesday!' },
      ],
    },

    appointment: [
      { day: 'Monday', time: '10:00 AM', serviceName: 'Sculptra Session', color: '#a78bfa' },
      { day: 'Thursday', time: '4:00 PM', serviceName: 'PDO Thread Lift', color: '#a78bfa' },
    ],

    emailFollowup: null,
    missedCall: null,
    instagramDM: null,
  },

  {
    id: 18,
    name: 'Maria C.',
    phone: '(773) 555-0107',
    email: 'maria.c@email.com',
    source: 'Website Form',
    service: 'PRP',
    status: 'Interested',
    date: 'Today 8:15 AM',
    estimatedValue: 0,
    booked: false,

    appointment: {
      day: 'Friday',
      time: '11:30 AM',
      serviceName: 'PRP Treatment',
      color: '#4ade80',
    },

    conversation: null,
    emailFollowup: null,
    missedCall: null,
    instagramDM: null,
  },
]
