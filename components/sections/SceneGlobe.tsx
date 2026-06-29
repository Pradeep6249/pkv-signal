'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
const Globe = dynamic(() => import('../three/Globe'), { ssr: false })

export default function SceneGlobe() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current?.querySelectorAll('.rev').forEach(el => el.classList.add('on'))
    }, { threshold: 0.1 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="scene" id="s-globe" style={{ background: '#000', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Globe fills background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Globe />
      </div>
      {/* Overlay text */}
      <div style={{ position: 'relative', zIndex: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', maxWidth: '1160px', padding: '0 44px', alignItems: 'center', gap: '80px' }}>
        <div>
          <div className="rev" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', color: '#2997ff', textTransform: 'uppercase', marginBottom: '24px' }}>National Scale</div>
          <div className="rev d1" style={{ fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#fff', marginBottom: '28px' }}>
            300+ financial<br />institutions.<br />One network.
          </div>
          <div className="rev d2" style={{ fontSize: '17px', fontWeight: 300, color: '#86868b', lineHeight: 1.75, letterSpacing: '-0.01em', maxWidth: '420px' }}>
            At NPCI — India&rsquo;s national payments infrastructure — every transaction in the network passed through the same detection systems. Built to catch what humans miss.
          </div>
        </div>
        <div className="rev d2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
          {[
            { n: '1.5M+', d: 'Daily transactions analyzed' },
            { n: '300+', d: 'Financial institutions monitored' },
            { n: '20+', d: 'Behavioral signals engineered' },
            { n: '80%', d: 'Manual effort eliminated' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#000', padding: '28px 24px' }}>
              <div style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>
                {s.n.replace(/[+%M]/g, '')}<span style={{ color: '#2997ff', fontSize: '20px' }}>{s.n.replace(/[0-9.]/g, '')}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#86868b', marginTop: '6px', lineHeight: 1.5 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
