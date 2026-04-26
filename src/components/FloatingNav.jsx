import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, MessageSquare, PhoneMissed,
  Instagram, Zap, BarChart2, Mail, Search,
  TrendingDown, CalendarDays, Star, CreditCard
} from 'lucide-react'
import { cn } from '../lib/utils'

const NAV_ITEMS = [
  { id: 'dashboard',     label: 'Dashboard',     Icon: LayoutDashboard },
  { id: 'revenue',       label: 'Revenue Gap',   Icon: TrendingDown },
  { id: 'leads',         label: 'Leads',         Icon: Users },
  { id: 'conversations', label: 'Chat',          Icon: MessageSquare },
  { id: 'missed',        label: 'Missed Calls',  Icon: PhoneMissed },
  { id: 'instagram',     label: 'Instagram',     Icon: Instagram },
  { id: 'automations',   label: 'Automations',   Icon: Zap },
  { id: 'reviews',       label: 'Reviews',       Icon: Star },
  { id: 'appointments',  label: 'Appointments',  Icon: CalendarDays },
  { id: 'analytics',     label: 'Analytics',     Icon: BarChart2 },
  { id: 'email',         label: 'Email',         Icon: Mail },
  { id: 'plans',         label: 'Plans',         Icon: CreditCard },
]

export default function FloatingNav({ active, setActive, onCommandOpen }) {
  const [hovered, setHovered] = useState(null)

  return (
    <nav aria-label="Main navigation" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.1 }}
        className="flex items-center gap-0.5 md:gap-1 px-2 md:px-3 py-2 md:py-2.5 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        style={{
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          background: 'rgba(9,9,11,0.80)',
        }}
      >
        {/* Cmd+K trigger */}
        <button
          onClick={onCommandOpen}
          aria-label="Open command palette (Cmd+K)"
          className="relative hidden md:flex flex-col items-center gap-1 px-2.5 py-2 rounded-xl cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group"
        >
          <Search size={16} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
          <span className="text-[8px] font-mono text-zinc-600">⌘K</span>
        </button>

        <div className="w-px h-6 bg-white/10 mx-1 hidden md:block" />

        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id
          const isHovered = hovered === id

          return (
            <div
              key={id}
              className="relative"
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-[60] pointer-events-none"
                  >
                    <div className="bg-surface-1/95 border border-white/10 rounded-lg px-2.5 py-1 whitespace-nowrap">
                      <span className="text-white text-[11px] font-mono tracking-wide">{label}</span>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white/10" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon button */}
              <motion.button
                onClick={() => setActive(id)}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={cn(
                  'relative flex flex-col items-center gap-1 px-1.5 py-1.5 md:px-2.5 md:py-2 rounded-xl cursor-pointer border-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                )}
              >
                {/* Active glow background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-xl bg-primary/15"
                    style={{ boxShadow: '0 0 16px rgba(5,150,105,0.25)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon
                  size={18}
                  className={cn(
                    'relative z-10 transition-colors duration-200',
                    isActive ? 'text-white' : 'text-zinc-500'
                  )}
                />
                {/* Active dot indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavDot"
                    className="w-1 h-1 rounded-full bg-primary"
                    style={{ boxShadow: '0 0 6px rgba(5,150,105,0.8)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && <div className="w-1 h-1" />}
              </motion.button>
            </div>
          )
        })}
      </motion.div>
    </nav>
  )
}
