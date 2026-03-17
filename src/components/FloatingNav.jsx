import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, MessageSquare, PhoneMissed,
  Instagram, Zap, BarChart2, Mail
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard',     label: 'Dashboard',    Icon: LayoutDashboard },
  { id: 'leads',         label: 'Leads',         Icon: Users },
  { id: 'conversations', label: 'Chat',          Icon: MessageSquare },
  { id: 'missed',        label: 'Missed Calls',  Icon: PhoneMissed },
  { id: 'instagram',     label: 'Instagram',     Icon: Instagram },
  { id: 'automations',   label: 'Automations',   Icon: Zap },
  { id: 'analytics',     label: 'Analytics',     Icon: BarChart2 },
  { id: 'email',         label: 'Email',         Icon: Mail },
]

export default function FloatingNav({ active, setActive }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
      }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '10px 16px',
          borderRadius: 9999,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          background: 'rgba(10,10,10,0.80)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id
          const isHovered = hovered === id

          return (
            <div
              key={id}
              style={{ position: 'relative' }}
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
                    style={{
                      position: 'absolute',
                      bottom: 'calc(100% + 10px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(15,15,15,0.95)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 8,
                      padding: '4px 10px',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      zIndex: 60,
                    }}
                  >
                    <span style={{ color: '#fff', fontSize: 11, fontFamily: 'Space Mono, monospace', letterSpacing: '0.05em' }}>
                      {label}
                    </span>
                    {/* Arrow */}
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: '5px solid rgba(255,255,255,0.12)',
                    }} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon button */}
              <motion.button
                onClick={() => setActive(id)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '8px 10px',
                  borderRadius: 12,
                  background: isActive ? 'rgba(212,175,55,0.1)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <Icon
                  size={18}
                  style={{
                    color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.45)',
                    filter: isActive ? 'drop-shadow(0 0 6px rgba(212,175,55,0.7))' : 'none',
                    transition: 'color 0.2s, filter 0.2s',
                  }}
                />
                {/* Active dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavDot"
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 9999,
                      background: '#D4AF37',
                      boxShadow: '0 0 6px rgba(212,175,55,0.8)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && <div style={{ width: 4, height: 4 }} />}
              </motion.button>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
