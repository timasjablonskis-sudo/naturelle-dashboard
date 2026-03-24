import React from 'react'

export default function InteractiveBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'var(--bg-deep)',
      }}
    >
      {/* Subtle blue glow — top center */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '30%',
          width: '40%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 70%)',
        }}
      />
      {/* Purple orb — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
