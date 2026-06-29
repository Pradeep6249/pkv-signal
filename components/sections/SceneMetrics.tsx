'use client'
import { useEffect, useRef } from 'react'

const metrics = [
  { arrow:'↓', dir:'down', num:'80%', label:'Manual detection\neffort eliminated', sub:'Automated Pipelines' },
  { arrow:'↑', dir:'up',   num:'22%', label:'Fraud detection\neffectiveness',       sub:'Model Performance' },
  { arrow:'↓', dir:'down', num:'15%', label:'False positive\ninvestigations',        sub:'Precision Recall' },
  { arrow:'↓', dir:'down', num:'75%', label:'Manual reporting\ntime reduced',         sub:'Dashboard Automation' },
]

export default function SceneMetrics() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    ref.current.querySelectorAll('.metric-row,.rev').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="scene" id="s-metrics" style={{ background: '#000', flexDirection: 'column', alignItems: 'flex-start', padding: '0 clamp(24px,8vw,160px)', minHeight: '130vh', justifyContent: 'center' }}>
      <div className="rev" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', color: '#424245', textTransform: 'uppercase', marginBottom: '0' }}>Outcomes</div>
      {metrics.map((m, i) => (
        <div key={i} className={`metric-row d${i+1}`}>
          <div style={{ fontSize: 'clamp(48px,7vw,96px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, flexShrink: 0, color: m.dir === 'up' ? '#30d158' : '#2997ff' }}>{m.arrow}</div>
          <div style={{ fontSize: 'clamp(48px,7vw,96px)', fontWeight: 800, letterSpacing: '-0.05em', color: '#fff', lineHeight: 1, flexShrink: 0 }}>{m.num}</div>
          <div style={{ fontSize: 'clamp(16px,2vw,24px)', fontWeight: 400, color: '#86868b', letterSpacing: '-0.02em', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{m.label}</div>
          <div className="hide-mob" style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em', color: '#424245', textTransform: 'uppercase', textAlign: 'right', flexShrink: 0, lineHeight: 1.6 }}>{m.sub.replace(' ', '\n')}</div>
        </div>
      ))}
    </section>
  )
}
