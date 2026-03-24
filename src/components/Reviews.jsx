import React, { useState } from 'react'
import { Star, CheckCircle2, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../lib/utils'

const reviews = [
  { name: 'Jessica L.', rating: 2, text: 'I had to wait too long for my appointment. The treatment was okay but the wait was frustrating.', aiResponse: 'Hi Jessica, thank you for sharing your feedback. We sincerely apologize for the wait during your visit — this is not the experience we aim for at Naturelle Med Spa. We\'d love to make it right. Please call us at (773) 592-9781 so we can address this personally.', status: 'Response Posted', time: '12m ago' },
  { name: 'Emily R.', rating: 5, text: 'Absolutely love Naturelle Med Spa! Got my neuromodulators done and the results look so natural. Staff was incredibly professional and made me feel so comfortable!', aiResponse: "Thank you so much, Emily! We're thrilled you love your natural-looking results! Our team takes pride in personalized care. We can't wait to see you again!", status: 'Response Posted', time: '1h ago' },
  { name: 'Sarah M.', rating: 5, text: 'Had a PRP facial and my skin has never looked better. The glow lasted for weeks! The whole experience was so relaxing and personalized.', aiResponse: 'Sarah, this made our day! We love that your natural glow is shining through! Thank you for trusting Naturelle Med Spa. See you for your next session!', status: 'Response Posted', time: '3h ago' },
  { name: 'Mark D.', rating: 3, text: 'Decent experience but the parking was a bit of a hassle. The Sculptra treatment itself was excellent though.', aiResponse: "Hi Mark, thank you for the honest feedback! We're glad you loved the Sculptra results. Regarding parking — there's additional parking around the back of the building on Liberty Dr. We hope to see you again!", status: 'Response Posted', time: '5h ago' },
  { name: 'Ana G.', rating: 5, text: 'Got my dermal fillers done here and the results are perfection! So natural — exactly what I wanted. Already booked my next appointment!', aiResponse: "Ana, we love hearing this! Natural-looking results are our specialty. Thank you for trusting Naturelle Med Spa with your look. Can't wait for your next visit!", status: 'Response Posted', time: '8h ago' },
]

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={13} className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'} />
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-3xl text-white tracking-tight">Review Management</h2>
          <p className="text-zinc-500 text-sm mt-0.5">AI monitors and responds to every Google review.</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-xl px-4 py-2">
          <Clock size={13} className="text-primary" />
          <span className="text-primary font-mono text-xs font-bold">AI AUTO-RESPONDS WITHIN 2 MINUTES</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Avg Rating', value: avgRating, sub: 'out of 5' },
          { label: '5-Star Reviews', value: fiveStars, sub: 'this month' },
          { label: 'Response Rate', value: '100%', sub: 'all reviews' },
          { label: 'Avg Response Time', value: '1.8m', sub: 'faster than 99%' },
        ].map((s) => (
          <div key={s.label} className="bg-surface-1 border border-white/10 rounded-xl p-4 text-center">
            <div className="font-semibold text-3xl text-white tracking-tight">{s.value}</div>
            <div className="text-zinc-500 font-mono text-[10px] mt-0.5">{s.label}</div>
            <div className="text-zinc-600 font-mono text-[9px]">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {allReviews.map((review, i) => (
          <div key={i} className={cn('bg-surface-1 border rounded-xl p-5 transition-colors',
            review.isNew ? 'border-primary/40' : review.rating <= 2 ? 'border-red-500/30 hover:border-red-500/50' : 'border-white/10 hover:border-white/20'
          )}>
            {review.isNew && (
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-primary" />
                <span className="font-mono text-[9px] text-primary tracking-widest">NEW REVIEW — AI RESPONDED AUTOMATICALLY</span>
              </div>
            )}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0', review.rating <= 2 ? 'bg-red-500/30' : 'bg-surface-2')}>
                  {review.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm">{review.name}</span>
                    <span className="text-zinc-600 font-mono text-[10px]">{review.time}</span>
                    <span className="text-[10px] bg-surface-2 border border-white/10 rounded px-1.5 py-0.5 text-zinc-400">Google</span>
                  </div>
                  <div className="mt-1"><StarRating rating={review.rating} /></div>
                  <p className="text-zinc-300 text-sm mt-2 leading-relaxed">{review.text}</p>
                </div>
              </div>
              <span className={cn('flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full border flex-shrink-0 ml-4',
                review.status === 'Response Posted' ? 'bg-primary/10 text-primary border-primary/30' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
              )}>
                <CheckCircle2 size={10} />{review.status}
              </span>
            </div>

            <div className="mt-3">
              <button onClick={() => toggle(i)} className="flex items-center gap-1.5 text-zinc-500 hover:text-primary font-mono text-[10px] transition-colors">
                {expanded[i] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {expanded[i] ? 'HIDE AI RESPONSE' : 'VIEW AI RESPONSE'}
              </button>
              {expanded[i] && (
                <div className="mt-2 bg-background border border-primary/20 border-l-2 border-l-primary rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">AI</span>
                    </div>
                    <span className="text-primary font-mono text-[9px]">NATURELLE MED SPA · OWNER RESPONSE</span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{review.aiResponse}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
