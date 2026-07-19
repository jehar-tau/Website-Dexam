import { useNavigate } from 'react-router-dom'
import { waLink } from '../config.js'
import { examData } from '../data.js'
import { useLead } from '../lead-context.jsx'

const highlights = [
  'Papers for all 5 major exams',
  'For 11th, 12th & drop-year students',
  'Exam updates on WhatsApp',
  'Free guidance available',
]

export default function PapersHub() {
  const navigate = useNavigate()
  const lead = useLead()
  return (
    <div>
      <div className="dark-band">
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ display: 'inline-block', background: 'rgba(246,80,9,.18)', border: '1px solid rgba(246,80,9,.5)', color: 'var(--orange-soft)', fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 999, marginBottom: 16 }}>
            Free download
          </div>
          <h1 className="h-hero" style={{ maxWidth: 760, marginBottom: 12 }}>
            Previous year papers for NID, UCEED, NIFT, NATA &amp; CEED
          </h1>
          <p style={{ margin: '0 0 24px', fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,.75)', maxWidth: 620 }}>
            Real question papers, exam information and preparation updates for India's top design and architecture entrance exams.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
            <button className="btn btn--orange" onClick={lead.openLeadForm}>Get previous year papers</button>
            <a className="btn btn--outline-light" href={waLink} target="_blank" rel="noreferrer">Talk to a DEXAM counsellor</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 10, maxWidth: 960 }}>
            {highlights.map((h) => (
              <div key={h} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 8, padding: '12px 14px', fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,.85)' }}>
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 40, paddingBottom: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
          {examData.map((ex) => (
            <div key={ex.id} className="card card--hover" style={{ padding: '22px 20px' }} onClick={() => navigate('/papers/' + ex.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 20 }}>{ex.name}</span>
                <span className="pill-tag" style={{ padding: '3px 9px' }}>{ex.tag}</span>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: 13.5, lineHeight: 1.55, color: 'var(--muted)' }}>{ex.blurb}</p>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--orange)' }}>View {ex.name} papers →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
