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
      {/* Static grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Blue orb — top left */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
        }}
      />
      {/* Emerald orb — mid right */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '10%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
