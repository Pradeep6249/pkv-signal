'use client'
import { useEffect, useRef } from 'react'

export default function SceneCurrent() {
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
    <section ref={ref} className="scene" id="s-current" style={{ background: '#000', minHeight: '100vh', position: 'relative', flexDirection: 'column', alignItems: 'flex-start', padding: '130px clamp(24px,8vw,160px)', justifyContent: 'center' }}>
      <div className="rev" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', color: '#2997ff', textTransform: 'uppercase', marginBottom: '24px' }}>Currently</div>
      <div className="rev d1" style={{ fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#fff', marginBottom: '28px', maxWidth: '780px' }}>
        Data Analyst, Payments<br />at OrbisIQ Inc.
      </div>
      <div className="rev d2" style={{ fontSize: '17px', fontWeight: 300, color: '#86868b', lineHeight: 1.75, letterSpacing: '-0.01em', maxWidth: '620px', marginBottom: '56px' }}>
        Since January 2026, analyzing large-scale payment transaction data to identify fraud behaviors and emerging
        attack patterns, building fraud loss forecasting models, and turning ambiguous investigations into measurable
        business problems for Risk leadership.
      </div>
      <div className="rev d3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.07)', width: '100%', maxWidth: '900px' }}>
        {[
          { n: '5+', d: 'Executive dashboards automated' },
          { n: '75%', d: 'Manual reporting time reduced' },
          { n: '4', d: 'Cross-functional teams partnered with' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#000', padding: '28px 24px' }}>
            <div style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>
              {s.n.replace(/[+%]/g, '')}<span style={{ color: '#2997ff', fontSize: '20px' }}>{s.n.replace(/[0-9]/g, '')}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#86868b', marginTop: '6px', lineHeight: 1.5 }}>{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
