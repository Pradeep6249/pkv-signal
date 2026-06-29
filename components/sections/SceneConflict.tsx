'use client'
import { useEffect, useRef } from 'react'

export default function SceneConflict() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.querySelectorAll('.rev,.slide-left').forEach(el => el.classList.add('on')) })
    }, { threshold: 0.08 })
    ref.current.querySelectorAll('.conflict-block').forEach(b => io.observe(b))
    return () => io.disconnect()
  }, [])

  const blocks = [
    { kicker: 'The Problem', text: <>Fraud doesn&rsquo;t look like fraud.<br /><span style={{ color: '#86868b' }}>It looks exactly like a real customer.</span></> },
    { kicker: 'The Cost', text: <>Block too much — <span style={{ color: '#86868b' }}>you lose customers.</span><br />Block too little — <span style={{ color: '#86868b' }}>you lose trust.</span></> },
    { kicker: 'The Constraint', text: <>Zero room for guessing.<br /><span style={{ color: '#86868b' }}>Every decision needs a system behind it.</span></> },
  ]

  return (
    <section ref={ref} className="scene" id="s-conflict" style={{ background: '#000', alignItems: 'flex-start', padding: '130px clamp(24px,8vw,160px)', minHeight: '160vh', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
      {blocks.map((b, i) => (
        <div key={i} className="conflict-block" style={{ marginBottom: i < blocks.length - 1 ? '120px' : 0, width: '100%' }}>
          <div className="rev" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', color: '#424245', textTransform: 'uppercase', marginBottom: '24px' }}>{b.kicker}</div>
          <div className="rev d1" style={{ fontSize: 'clamp(28px,4.5vw,64px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.12, color: '#fff', maxWidth: '900px' }}>{b.text}</div>
        </div>
      ))}
    </section>
  )
}
