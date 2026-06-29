'use client'
import { useEffect, useRef } from 'react'

const systems = [
  { num:'01', name:'Detection Engine', desc:'Behavior-based modeling that identifies anomalies before they become losses. Velocity signals, temporal patterns, interaction irregularities — all engineered by hand.', tech:'XGBoost · Logistic Regression · Feature Engineering' },
  { num:'02', name:'Risk Layer', desc:'Real-time scoring infrastructure that weighs probability against cost. Precision-recall optimization running at transaction speed, 24/7.', tech:'Gradient Boosting · Scikit-learn · SHAP Explainability' },
  { num:'03', name:'Decision System', desc:'Balancing fraud prevention against user experience. Every block is a tradeoff. Every pass is a calculated risk. No guessing allowed.', tech:'Causal Inference · Threshold Optimization · Model Validation' },
  { num:'04', name:'Experimentation Layer', desc:'A/B testing frameworks with hypothesis testing, variance analysis, and causal inference. Every strategy change validated before it scales.', tech:'A/B Testing · Statistical Inference · Hypothesis Testing' },
  { num:'05', name:'Intelligence Surface', desc:'Executive dashboards and automated reporting that make complex fraud systems legible to decision-makers. Translating signal into action.', tech:'Tableau · Power BI · Streamlit · Python Automation' },
  { num:'', name: '', desc: '', tech: '', isBlank: true },
]

export default function SceneSystem() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    ref.current.querySelectorAll('.sys-item,.rev').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="scene" id="s-system" style={{ background: '#050505', flexDirection: 'column', alignItems: 'flex-start', padding: '130px clamp(24px,8vw,160px)', minHeight: '100vh', justifyContent: 'center' }}>
      <div className="rev" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', color: '#424245', textTransform: 'uppercase', marginBottom: '80px' }}>System architecture</div>
      <div className="sys-grid">
        {systems.map((s, i) => (
          s.isBlank ? (
            <div key={i} className={`sys-item d${Math.min(i+1,6)}`} style={{ background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(36px,4vw,56px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1 }}>End-to-end.</div>
                <div style={{ fontSize: '14px', color: '#86868b', marginTop: '12px', lineHeight: 1.6 }}>From raw transaction data<br />to executive decision.</div>
              </div>
            </div>
          ) : (
            <div key={i} className={`sys-item d${Math.min(i+1,6)}`}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#2997ff', letterSpacing: '0.18em', marginBottom: '32px' }}>{s.num}</div>
              <div style={{ fontSize: 'clamp(18px,2vw,24px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#fff', marginBottom: '14px', lineHeight: 1.2 }}>{s.name}</div>
              <div style={{ fontSize: '14px', fontWeight: 400, color: '#86868b', lineHeight: 1.75, letterSpacing: '-0.01em' }}>{s.desc}</div>
              <div style={{ marginTop: '24px', fontSize: '11px', fontWeight: 500, color: '#424245', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.tech}</div>
            </div>
          )
        ))}
      </div>
    </section>
  )
}
