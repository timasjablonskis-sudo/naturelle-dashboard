import React, { useEffect, useRef } from 'react'

export default function InteractiveBackground() {
  const gridRef = useRef(null)
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const currentRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const animate = () => {
      // Smooth lerp toward mouse
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.06
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.06

      if (gridRef.current) {
        const tx = currentRef.current.x * 20
        const ty = currentRef.current.y * 20
        gridRef.current.style.transform = `translate(${tx}px, ${ty}px)`
        gridRef.current.style.setProperty('--glow-x', `${currentRef.current.x * 100}%`)
        gridRef.current.style.setProperty('--glow-y', `${currentRef.current.y * 100}%`)
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

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
      {/* Parallax grid */}
      <div
        ref={gridRef}
        style={{
          position: 'absolute',
          inset: '-40px',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          willChange: 'transform',
        }}
      />
      {/* Subtle radial vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196,104,138,0.04) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
