import { useNavigate } from 'react-router-dom'
import { waLink } from '../config.js'

// The interactive Design Career Quiz lives in its own Claude Design file
// ("Design Career Quiz.dc.html") and will be ported here next.
export default function Quiz() {
  const navigate = useNavigate()
  return (
    <div className="container" style={{ paddingTop: 52, paddingBottom: 64 }}>
      <div className="eyebrow">Design career quiz</div>
      <h1 className="h-page">Find your design fit.</h1>
      <p className="lede lede--lg" style={{ maxWidth: 620 }}>
        Answer a few quick questions about what you enjoy and how you think — we'll point you toward the design or architecture path (and exam) that fits you best.
      </p>
      <div className="card card--r14" style={{ padding: 'clamp(28px,4vw,44px)', textAlign: 'center', maxWidth: 640 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 24 }}>The quiz is coming online soon.</h2>
        <p style={{ margin: '0 0 22px', fontSize: 14.5, lineHeight: 1.6, color: 'var(--muted)' }}>
          Until then, a DEXAM counsellor can walk you through the same questions in a free 15-minute session — and you'll get an honest recommendation at the end.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <button className="btn btn--orange" onClick={() => navigate('/contact')}>Book free counselling</button>
          <a className="btn btn--ink" href={waLink} target="_blank" rel="noreferrer">WhatsApp DEXAM</a>
        </div>
      </div>
    </div>
  )
}
