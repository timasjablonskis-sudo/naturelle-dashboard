import React from 'react'
import { CheckCircle, PhoneMissed, Instagram, Mail, Star } from 'lucide-react'
import { cn } from '../lib/utils'

const icons = {
  instagram: Instagram,
  missed:    PhoneMissed,
  booked:    CheckCircle,
  email:     Mail,
  review:    Star,
}

const colors = {
  instagram: '#f472b6',
  missed:    '#f59e0b',
  booked:    '#059669',
  email:     '#a78bfa',
  review:    '#f59e0b',
}

export default function SimToast({ toasts }) {
  return (
    <div className="fixed top-16 md:top-20 right-2 left-2 md:left-auto md:right-5 z-50 flex flex-col gap-2 pointer-events-none md:w-[300px]">
      {toasts.map((t) => {
        const Icon = icons[t.type] || CheckCircle
        const color = colors[t.type] || '#059669'
        return (
          <div
            key={t.id}
            className={cn(
              'flex items-start gap-3 bg-surface-1 border rounded-xl px-4 py-3 shadow-2xl pointer-events-auto',
              t.exiting ? 'toast-exit' : 'toast-enter'
            )}
            style={{ borderColor: color + '40' }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: color + '18' }}>
              <Icon size={14} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold leading-tight">{t.title}</div>
              <div className="text-zinc-400 text-[11px] mt-0.5 leading-snug">{t.body}</div>
            </div>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 animate-pulse" style={{ background: color }} />
          </div>
        )
      })}
    </div>
  )
}
