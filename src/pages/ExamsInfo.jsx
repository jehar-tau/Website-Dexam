import { useNavigate } from 'react-router-dom'
import { examData } from '../data.js'

export default function ExamsInfo() {
  const navigate = useNavigate()
  return (
    <div className="container" style={{ paddingTop: 52, paddingBottom: 64 }}>
      <div className="eyebrow">Exam guide · 2027 admission cycle</div>
      <h1 className="h-page">Know your exam.</h1>
      <p className="lede lede--lg" style={{ marginBottom: 8, maxWidth: 660 }}>
        Each exam tests different things and opens different doors. Here's what matters for each, with the latest expected schedule for exams conducted in 2027.
      </p>
      <p style={{ margin: '0 0 32px', fontSize: 12.5, color: 'var(--gray)', maxWidth: 660 }}>
        Dates are the expected 2027-cycle schedule based on official notifications and last year's calendar (as of July 2026) — always confirm the final dates on each exam's official website.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {examData.map((ex) => (
          <div key={ex.id} className="card card--r14" style={{ padding: 'clamp(22px,3vw,30px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 23 }}>{ex.name}</span>
              <span className="pill-tag">{ex.tag}</span>
            </div>
            <p style={{ margin: '0 0 18px', fontSize: 14.5, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 760 }}>{ex.intro}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 12, marginBottom: 18 }}>
              {[
                ['2027 key dates', ex.cycle2027],
                ['Eligibility', ex.eligibility2027],
                ['Exam pattern', ex.pattern2027],
              ].map(([title, text]) => (
                <div key={title} style={{ background: 'var(--cream)', border: '1px solid rgba(13,24,38,.06)', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 6 }}>{title}</div>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--slate)' }}>{text}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, background: 'var(--ink)', borderRadius: 10, padding: '14px 16px', marginBottom: 18 }}>
              <span style={{ color: 'var(--yellow)', fontWeight: 700, flex: 'none' }}>★</span>
              <span style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,.85)' }}>
                <b style={{ color: 'var(--yellow)' }}>What's new for 2027:</b> {ex.whatsNew2027}
              </span>
            </div>
            <button className="btn btn--outline-ink" onClick={() => navigate('/contact')}>Ask about coaching</button>
          </div>
        ))}
      </div>
    </div>
  )
}
