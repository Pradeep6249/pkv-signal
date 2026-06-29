'use client'
import { useEffect, useRef } from 'react'

function useReveal(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { ref.current?.querySelectorAll('.rev,.slide-left').forEach(el => el.classList.add('on')) } }, { threshold: 0.15 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
}

export default function SceneScale() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} className="scene" id="s-scale" style={{ background: '#000', flexDirection: 'column', textAlign: 'center', gap: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div className="rev" style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1 }}>Millions of transactions.</div>
        <div className="rev d1" style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#86868b', lineHeight: 1 }}>Milliseconds to decide.</div>
        <div className="rev d2" style={{ fontSize: 'clamp(72px,13vw,180px)', fontWeight: 900, letterSpacing: '-0.05em', color: '#fff', lineHeight: 1, margin: '40px 0' }}>
          1,500,000<span style={{ color: '#ff375f' }}>+</span>
        </div>
        <div className="rev d3" style={{ fontSize: 'clamp(15px,1.8vw,22px)', fontWeight: 300, color: '#86868b', letterSpacing: '-0.01em' }}>per day. every day. no room for error.</div>
        <div className="rev d4" style={{ fontSize: 'clamp(20px,2.5vw,34px)', fontWeight: 700, color: '#ff375f', letterSpacing: '-0.02em', marginTop: '24px' }}>Most systems miss the signal.</div>
      </div>
    </section>
  )
}
