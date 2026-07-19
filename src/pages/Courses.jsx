import { useNavigate } from 'react-router-dom'
import { waLink } from '../config.js'
import { courses, courseIncluded, admissionPath } from '../data.js'

export default function Courses() {
  const navigate = useNavigate()
  return (
    <div className="container" style={{ paddingTop: 52, paddingBottom: 64 }}>
      <div className="eyebrow">Courses</div>
      <h1 className="h-page">Pick the track that matches your timeline.</h1>
      <p className="lede lede--lg" style={{ maxWidth: 620, marginBottom: 32 }}>
        Start small and step up when you're confident. Every track covers drawing, observation, visual aptitude and exam direction for NID, UCEED, NIFT, NATA and CEED. Fee details are shared personally during counselling.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 18 }}>
        {courses.map((c) => (
          <div key={c.name} className="card card--r14" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: c.headBg, padding: '22px 22px 18px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: c.headTag, marginBottom: 6 }}>{c.for}</div>
              <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 23, color: c.headText }}>{c.name}</div>
            </div>
            <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              <p style={{ margin: '0 0 4px', fontSize: 13.5, lineHeight: 1.55, color: 'var(--muted)' }}>{c.desc}</p>
              {c.points.map((p) => (
                <div key={p} className="check-row" style={{ fontSize: 13.5, gap: 9, lineHeight: 1.45 }}>
                  <span className="tick">✓</span><span>{p}</span>
                </div>
              ))}
              <div style={{ flex: 1 }} />
              <button className="btn btn--ink btn--hover-orange" style={{ marginTop: 8, fontSize: 14, padding: 13 }} onClick={() => navigate('/contact')}>
                Enquire about this track
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 36 }}>
        <div className="card card--r14" style={{ flex: '1 1 380px', minWidth: 280, padding: 24 }}>
          <h2 style={{ margin: '0 0 14px', fontSize: 21 }}>What is included</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {courseIncluded.map((t) => (
              <div key={t} className="check-row"><span className="tick">✓</span><span>{t}</span></div>
            ))}
          </div>
        </div>
        <div className="card--dark" style={{ flex: '1 1 380px', minWidth: 280, borderRadius: 14, padding: 24 }}>
          <h2 style={{ margin: '0 0 14px', fontSize: 21, color: '#fff' }}>Simple admission path</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {admissionPath.map((a) => (
              <div key={a.num} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 600, fontSize: 13, color: 'var(--yellow)', flex: 'none', paddingTop: 1 }}>{a.num}</span>
                <span style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,.85)' }}>{a.text}</span>
              </div>
            ))}
          </div>
          <a className="btn btn--orange btn--block" style={{ marginTop: 18, fontSize: 14, padding: 13 }} href={waLink} target="_blank" rel="noreferrer">
            Start with a counselling session
          </a>
        </div>
      </div>
      <p style={{ margin: '22px 0 0', fontSize: 13, lineHeight: 1.6, color: 'var(--gray)', maxWidth: 640 }}>
        Parent note: our pricing is designed to make the first step easy — a small evaluation session first, a low-risk trial next, and the full plan only after the student and parent are confident about the exam path.
      </p>
    </div>
  )
}
