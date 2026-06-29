'use client'
import { useEffect, useState } from 'react'

export default function Progress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div id="progress" style={{ position: 'fixed', top: 0, left: 0, height: '1px', background: '#2997ff', zIndex: 1000, width: `${pct}%`, transition: 'width 0.08s linear' }} />
}
