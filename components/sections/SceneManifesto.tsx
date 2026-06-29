'use client'
import { useEffect, useRef } from 'react'

const lines = [
  { text: <>Fraud isn&rsquo;t random. <em>It&rsquo;s patterned.</em></>, n: '01' },
  { text: <>Trust isn&rsquo;t given. <em>It&rsquo;s engineered.</em></>, n: '02' },
  { text: <>Decisions aren&rsquo;t guesses. <em>They&rsquo;re systems.</em></>, n: '03' },
  { text: <>Models aren&rsquo;t magic. <em>They&rsquo;re math.</em></>, n: '04' },
  { text: <>The signal is there. <em>Most people can&rsquo;t see it.</em></>, n: '05' },
]

export default function SceneManifesto() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.mani-line,.rev').forEach((el, i) => { setTimeout(() => el.classList.add('on'), i * 80) }) } })
    }, { threshold: 0.1 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="scene" id="s-manifesto" style={{ background: '#000', flexDirection: 'column', padding: '0 clamp(24px,8vw,160px)', minHeight: '100vh', justifyContent: 'center' }}>
      <div className="rev" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', color: '#424245', textTransform: 'uppercase', marginBottom: '72px' }}>Principles</div>
      {lines.map((l, i) => (
        <div key={i} className="mani-line" style={{ transitionDelay: `${i * 0.07}s` }}>
          <span>{l.text}</span>
          <span className="hide-mob" style={{ fontSize: '13px', fontWeight: 400, color: '#424245', letterSpacing: '0.08em', marginLeft: '48px', flexShrink: 0 }}>{l.n}</span>
        </div>
      ))}
    </section>
  )
}
