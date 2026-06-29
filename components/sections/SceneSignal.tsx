'use client'
import { useEffect, useRef } from 'react'

export default function SceneSignal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current?.querySelectorAll('.rev,.line-draw').forEach(el => el.classList.add('on'))
    }, { threshold: 0.3 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="scene" id="s-signal" style={{ background: '#000', flexDirection: 'column', textAlign: 'center' }}>
      {/* Radial glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(41,151,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="rev" style={{
          fontSize: 'clamp(56px,10vw,160px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.05,
          background: 'linear-gradient(180deg,#fff 0%,#2997ff 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          filter: 'drop-shadow(0 0 80px rgba(41,151,255,0.35))',
          userSelect: 'none', textAlign: 'center',
        }}>I find the signal<br />in the noise.</div>
        <div className="line-draw" style={{ margin: '48px 0 32px' }} />
        <div className="rev d2" style={{ fontSize: 'clamp(15px,1.6vw,20px)', fontWeight: 300, color: '#86868b', maxWidth: '560px', lineHeight: 1.7, letterSpacing: '-0.01em' }}>
          3 years turning millions of payment transactions into fraud models, risk scores, and decisions leadership can trust.
        </div>
      </div>
    </section>
  )
}
