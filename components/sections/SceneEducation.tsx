'use client'
import { useEffect, useRef } from 'react'

export default function SceneEducation() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current?.querySelectorAll('.rev').forEach(el => el.classList.add('on'))
    }, { threshold: 0.15 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="scene" id="s-education" style={{ background: '#050505', flexDirection: 'column', textAlign: 'center', minHeight: '70vh' }}>
      <div className="rev" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', color: '#424245', textTransform: 'uppercase', marginBottom: '28px' }}>Education</div>
      <div className="rev d1" style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.2, color: '#fff', maxWidth: '760px' }}>
        M.S. Business Intelligence &amp; Analytics
      </div>
      <div className="rev d2" style={{ fontSize: '15px', fontWeight: 300, color: '#86868b', marginTop: '20px', letterSpacing: '-0.01em' }}>
        Stevens Institute of Technology · Hoboken, NJ · 2023–2024 · GPA 3.5/4.0
      </div>
      <div className="rev d3" style={{ fontSize: '13px', fontWeight: 400, color: '#424245', marginTop: '16px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        Machine Learning · Experimental Design · AI Technologies
      </div>
    </section>
  )
}
