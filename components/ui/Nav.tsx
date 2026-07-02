'use client'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const style: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 48px', mixBlendMode: 'difference',
  }

  return (
    <nav style={style}>
      <div style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.02em', color: '#fff', opacity: show ? 1 : 0, transition: 'opacity 1s' }}>
        Pradeep Kumar Voruganti
      </div>
      <a href="mailto:Vorugantipradeep2331@gmail.com" style={{ fontSize: '13px', fontWeight: 400, color: '#fff', textDecoration: 'none', opacity: show ? 1 : 0, transition: 'opacity 1s', letterSpacing: '0.01em' }}>
        Work Together →
      </a>
    </nav>
  )
}
