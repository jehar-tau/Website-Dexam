import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { waLink } from '../config.js'
import { examData, paperYears, howToUse } from '../data.js'
import { useLead } from '../lead-context.jsx'

export default function ExamPapers() {
  const { examId } = useParams()
  const navigate = useNavigate()
  const lead = useLead()
  const exam = examData.find((e) => e.id === examId)
  if (!exam) return <Navigate to="/papers" replace />

  return (
    <div>
      <div className="dark-band">
        <div className="container" style={{ paddingTop: 36, paddingBottom: 44 }}>
          <Link to="/papers" style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.7)', marginBottom: 16 }}>
            ← All previous year papers
          </Link>
          <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(26px,3.5vw,40px)', lineHeight: 1.12, color: '#fff' }}>
            {exam.name} previous year papers
          </h1>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,.75)', maxWidth: 620 }}>{exam.sub}</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 36, paddingBottom: 64, display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 460px', minWidth: 300 }}>
          <p style={{ margin: '0 0 24px', fontSize: 14.5, lineHeight: 1.65, color: 'var(--slate)' }}>{exam.intro}</p>

          <h2 style={{ margin: '0 0 14px', fontSize: 22 }}>Year-wise papers</h2>
          <div className="card" style={{ overflow: 'hidden', marginBottom: 10 }}>
            {paperYears.map((year) => {
              const unlocked = lead.isUnlocked(exam.id, year)
              return (
                <div key={year} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px', borderBottom: '1px solid var(--line-soft)' }}>
                  <span style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 17, width: 48 }}>{year}</span>
                  <span style={{ flex: 1, fontSize: 13, color: 'var(--muted)' }}>{exam.paperType}</span>
                  {unlocked ? (
                    <button
                      className="btn btn--green"
                      style={{ fontSize: 13, padding: '9px 14px', borderRadius: 7, whiteSpace: 'nowrap' }}
                      onClick={() => lead.openDownload(exam.id, year)}
                    >
                      ↓ Download
                    </button>
                  ) : (
                    <button
                      style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)', background: 'transparent', border: '1.5px solid var(--orange)', padding: '8px 14px', borderRadius: 7, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--orange)' }}
                      onClick={() => lead.openUnlock(exam.id, year)}
                    >
                      🔒 Unlock
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          <p style={{ margin: '0 0 32px', fontSize: 12, color: 'var(--gray)', lineHeight: 1.5 }}>
            One quick form unlocks your downloads. We'll also send exam updates on WhatsApp.
          </p>

          <h2 style={{ margin: '0 0 12px', fontSize: 22 }}>What to notice in these papers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 32 }}>
            {exam.notice.map((text) => (
              <div key={text} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', background: '#fff', border: '1px solid var(--line-soft)', borderRadius: 9, padding: '13px 15px' }}>
                <span style={{ color: 'var(--orange)', fontWeight: 700, flex: 'none' }}>✏</span>
                <span style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--slate)' }}>{text}</span>
              </div>
            ))}
          </div>

          <h2 style={{ margin: '0 0 8px', fontSize: 22 }}>How to use previous year papers</h2>
          <p style={{ margin: '0 0 14px', fontSize: 13.5, lineHeight: 1.6, color: 'var(--muted)' }}>
            Don't just read them — solve under timed conditions, then review for idea quality, drawing clarity, originality and presentation.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 9 }}>
            {howToUse.map((h) => (
              <div key={h.num} className="card--dark" style={{ borderRadius: 9, padding: '14px 15px' }}>
                <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 600, fontSize: 12, color: 'var(--yellow)', marginBottom: 5 }}>{h.num}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#fff', lineHeight: 1.35 }}>{h.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '1 1 300px', minWidth: 280, maxWidth: 400, position: 'sticky', top: 82, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--orange)', borderRadius: 14, padding: '24px 22px' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 21, lineHeight: 1.2, color: '#fff' }}>
              Not sure how to solve these questions?
            </h2>
            <p style={{ margin: '0 0 16px', fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,.9)' }}>
              DEXAM helps students decode past papers, improve drawing speed and build design thinking with expert guidance.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <button className="btn btn--ink" style={{ fontSize: 14, padding: 13 }} onClick={() => navigate('/contact')}>
                Book free paper analysis session
              </button>
              <a className="btn btn--white" style={{ fontSize: 13.5, padding: 12 }} href={waLink} target="_blank" rel="noreferrer">
                WhatsApp DEXAM
              </a>
            </div>
          </div>
          <div className="card card--r14" style={{ padding: '20px 22px' }}>
            <h2 style={{ margin: '0 0 10px', fontSize: 16 }}>Related reading</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {exam.blogs.map((title) => (
                <span key={title} style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--orange)', cursor: 'pointer' }}>
                  {title} →
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
