import React, { useState } from 'react'
import { Star, CheckCircle2, Clock, ChevronDown, ChevronUp } from 'lucide-react'

const reviews = [
  {
    name: 'Jessica L.',
    rating: 2,
    text: 'I had to wait too long for my appointment. The treatment was okay but the wait was frustrating.',
    aiResponse: 'Hi Jessica, thank you for sharing your feedback. We sincerely apologize for the wait during your visit — this is not the experience we aim for at Intu Med Spa. We\'d love to make it right. Please call us at (630) 225-7323 so we can address this personally.',
    status: 'Response Posted',
    time: '12m ago',
  },
  {
    name: 'Emily R.',
    rating: 5,
    text: 'Absolutely love Intu Med Spa! Got my Botox done and the results are amazing. Staff was so professional and welcoming!',
    aiResponse: "Thank you so much, Emily! We're thrilled you love your results! Our team works hard to make every visit special. We can't wait to see you again! 💚",
    status: 'Response Posted',
    time: '1h ago',
  },
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'Best HydraFacial I\'ve ever had. My skin literally glowed for two weeks. Will definitely be back!',
    aiResponse: 'Sarah, this made our day! A glowing review for a glowing face 😊 Thank you for trusting Intu Med Spa. See you for your next session!',
    status: 'Response Posted',
    time: '3h ago',
  },
  {
    name: 'Mark D.',
    rating: 3,
    text: 'Decent experience but the parking was a bit of a hassle. The treatment itself was good.',
    aiResponse: "Hi Mark, thank you for the honest feedback! We understand parking can be tricky — there's a public lot just behind the building that's often more available. We hope to see you back for another treatment!",
    status: 'Response Posted',
    time: '5h ago',
  },
  {
    name: 'Ana G.',
    rating: 5,
    text: "Dr. Kim is amazing! My weight loss journey has been incredible with their GLP-1 program. Down 18 lbs in 2 months!",
    aiResponse: "Ana, that's incredible — congratulations on 18 lbs! 🎉 We're so proud of your progress and honored to support your journey. See you at your next check-in!",
    status: 'Response Posted',
    time: '8h ago',
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={s <= rating ? 'text-[#f59e0b] fill-[#f59e0b]' : 'text-[#333333]'}
        />
      ))}
    </div>
  )
}

export default function Reviews({ simReviews = [] }) {
  const [expanded, setExpanded] = useState({})

  const toggle = (i) => setExpanded((p) => ({ ...p, [i]: !p[i] }))

  const allReviews = [...simReviews, ...reviews]
  const avgRating = (allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length).toFixed(1)
  const fiveStars = allReviews.filter((r) => r.rating === 5).length

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl text-white tracking-wide">Review Management</h2>
          <p className="text-[#4a6560] text-sm mt-0.5">AI monitors and responds to every Google review.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#8BBCAD]/10 border border-[#8BBCAD]/30 rounded-xl px-4 py-2">
          <Clock size={13} className="text-[#8BBCAD]" />
          <span className="text-[#8BBCAD] font-mono text-xs font-bold">AI AUTO-RESPONDS WITHIN 2 MINUTES</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Avg Rating', value: avgRating, sub: 'out of 5' },
          { label: '5-Star Reviews', value: fiveStars, sub: 'this month' },
          { label: 'Response Rate', value: '100%', sub: 'all reviews' },
          { label: 'Avg Response Time', value: '1.8m', sub: 'faster than 99%' },
        ].map((s) => (
          <div key={s.label} className="bg-[#131918] border border-[#1E2B28] rounded-xl p-4 text-center">
            <div className="font-display text-3xl text-white">{s.value}</div>
            <div className="text-[#4a6560] font-mono text-[10px] mt-0.5">{s.label}</div>
            <div className="text-[#3a5550] font-mono text-[9px]">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Review cards */}
      <div className="space-y-3">
        {allReviews.map((review, i) => (
          <div
            key={i}
            className={`bg-[#131918] border rounded-xl p-5 transition-colors ${
              review.isNew
                ? 'border-[#8BBCAD]/40'
                : review.rating <= 2
                  ? 'border-red-500/30 hover:border-red-500/50'
                  : 'border-[#1E2B28] hover:border-[#333333]'
            }`}
          >
            {review.isNew && (
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#8BBCAD]" />
                <span className="font-mono text-[9px] text-[#8BBCAD] tracking-widest">NEW REVIEW — AI RESPONDED AUTOMATICALLY</span>
              </div>
            )}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                    review.rating <= 2 ? 'bg-red-500/30' : 'bg-[#1E2B28]'
                  }`}
                >
                  {review.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm">{review.name}</span>
                    <span className="text-[#3a5550] font-mono text-[10px]">{review.time}</span>
                    {/* Google G */}
                    <span className="text-[10px] bg-[#1e1e1e] border border-[#333] rounded px-1.5 py-0.5 text-[#888]">Google</span>
                  </div>
                  <div className="mt-1"><StarRating rating={review.rating} /></div>
                  <p className="text-[#cccccc] text-sm mt-2 leading-relaxed">{review.text}</p>
                </div>
              </div>
              <span className={`flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full border flex-shrink-0 ml-4 ${
                review.status === 'Response Posted'
                  ? 'bg-[#8BBCAD]/10 text-[#8BBCAD] border-[#8BBCAD]/30'
                  : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
              }`}>
                <CheckCircle2 size={10} />
                {review.status}
              </span>
            </div>

            {/* AI Response */}
            <div className="mt-3">
              <button
                onClick={() => toggle(i)}
                className="flex items-center gap-1.5 text-[#4a6560] hover:text-[#8BBCAD] font-mono text-[10px] transition-colors"
              >
                {expanded[i] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {expanded[i] ? 'HIDE AI RESPONSE' : 'VIEW AI RESPONSE'}
              </button>
              {expanded[i] && (
                <div className="mt-2 bg-[#0D1110] border border-[#8BBCAD]/20 border-l-2 border-l-[#8BBCAD] rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#8BBCAD] flex items-center justify-center">
                      <span className="text-[#0D1110] text-[8px] font-bold">AI</span>
                    </div>
                    <span className="text-[#8BBCAD] font-mono text-[9px]">INTU MED SPA · OWNER RESPONSE</span>
                  </div>
                  <p className="text-[#cccccc] text-sm leading-relaxed">{review.aiResponse}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
