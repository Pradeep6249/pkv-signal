'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
const Globe = dynamic(() => import('../three/Globe'), { ssr: false })

export default function SceneClosing() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current?.querySelectorAll('.rev,.line-draw').forEach(el => el.classList.add('on'))
    }, { threshold: 0.2 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="scene" id="s-closing" style={{ background: '#000', flexDirection: 'column', textAlign: 'center', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle globe in background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.15 }}>
        <Globe />
      </div>

      {/* Radial glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(41,151,255,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 2 }} />

      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="rev" style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.24em', color: '#424245', textTransform: 'uppercase', marginBottom: '40px' }}>Pradeep Kumar Voruganti</div>

        <div className="rev d1" style={{
          fontSize: 'clamp(72px,14vw,200px)', fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 1,
          background: 'linear-gradient(180deg,#fff 0%,rgba(245,245,247,0.65) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          userSelect: 'none',
        }}>Let&rsquo;s build<br />something.</div>

        <div className="line-draw" style={{ margin: '64px auto', maxWidth: '400px', width: '100%' }} />

        <div className="rev d3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
          <p style={{ fontSize: 'clamp(14px,1.5vw,18px)', fontWeight: 300, color: '#86868b', letterSpacing: '-0.01em', lineHeight: 1.6 }}>
            Fraud · Payments · Risk · Data Science · AI
          </p>

          <a href="mailto:Vorugantipradeep2331@gmail.com" className="work-btn">
            Work Together <span style={{ transition: 'transform 0.3s' }}>→</span>
          </a>

          <a href="mailto:Vorugantipradeep2331@gmail.com" style={{ fontSize: '13px', fontWeight: 400, color: '#424245', textDecoration: 'none', letterSpacing: '0.01em', transition: 'color 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.color = '#fff')}
            onMouseOut={e => (e.currentTarget.style.color = '#424245')}>
            Vorugantipradeep2331@gmail.com
          </a>

          <a href="tel:+17084877486" style={{ fontSize: '13px', fontWeight: 400, color: '#424245', textDecoration: 'none', letterSpacing: '0.01em', transition: 'color 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.color = '#fff')}
            onMouseOut={e => (e.currentTarget.style.color = '#424245')}>
            (708) 487-7486
          </a>

          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            {['LinkedIn', 'Chicago, IL', 'Open to Relocation'].map((l, i) => (
              <>
                {i > 0 && <span key={`dot-${i}`} style={{ color: '#424245', fontSize: '12px' }}>·</span>}
                <span key={l} style={{ fontSize: '12px', color: '#424245', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</span>
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
