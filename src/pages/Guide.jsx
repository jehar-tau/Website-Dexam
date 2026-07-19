import { useNavigate } from 'react-router-dom'
import { waLink } from '../config.js'
import { guideInterests, guideGlance, guideEligibility, guidePattern, guideCalendar } from '../data.js'

export default function Guide() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="dark-band">
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="eyebrow eyebrow--yellow">Parent &amp; student guide</div>
          <h1 className="h-hero" style={{ maxWidth: 760 }}>
            Design &amp; architecture entrance, explained for parents.
          </h1>
          <p style={{ margin: '0 0 26px', fontSize: 16, lineHeight: 1.65, color: 'rgba(255,255,255,.75)', maxWidth: 640 }}>
            A parent-friendly roadmap for B.Des and B.Arch admissions. The goal is not just to clear an entrance exam — it's to choose the right creative career path and prepare with confidence.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <div style={{ flex: '1 1 300px', minWidth: 260, background: 'rgba(246,80,9,.14)', border: '1px solid rgba(246,80,9,.45)', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orange-soft)', marginBottom: 6 }}>Design path</div>
              <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 19, color: '#fff', marginBottom: 6 }}>NID DAT · NIFT · UCEED</div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,.75)' }}>
                B.Des programs in product, communication, fashion, textile, UX, animation and related areas.
              </p>
            </div>
            <div style={{ flex: '1 1 300px', minWidth: 260, background: 'rgba(242,183,42,.12)', border: '1px solid rgba(242,183,42,.45)', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 6 }}>Architecture path</div>
              <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 19, color: '#fff', marginBottom: 6 }}>NATA</div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,.75)' }}>
                B.Arch programs in architecture, space, buildings, climate, construction and urban context.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1 */}
      <div className="container" style={{ paddingTop: 48 }}>
        <div className="eyebrow">Step 1</div>
        <h2 className="h-block">Start with the child, not the exam.</h2>
        <p style={{ margin: '0 0 20px', fontSize: 14.5, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 640 }}>
          We don't force a child into one exam on day one. First build drawing, observation and aptitude foundations — then map the right exams to the student's strengths.
        </p>
        <div className="card" style={{ overflow: 'hidden' }}>
          {guideInterests.map((g) => (
            <div key={g.enjoys} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', padding: '15px 20px', borderBottom: '1px solid var(--line-soft)', alignItems: 'center' }}>
              <span style={{ flex: '2 1 260px', minWidth: 220, fontSize: 14, lineHeight: 1.5 }}>{g.enjoys}</span>
              <span className="pill-tag" style={{ flex: 'none' }}>{g.path}</span>
              <span style={{ flex: '1 1 180px', fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>{g.exams}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 2 */}
      <div className="container" style={{ paddingTop: 48 }}>
        <div className="eyebrow">Step 2</div>
        <h2 className="h-block" style={{ marginBottom: 20 }}>Which exam is for what?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 14 }}>
          {guideGlance.map((g) => (
            <div key={g.exam} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 19 }}>{g.exam}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)' }}>{g.years}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{g.usedFor}</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--muted)' }}>{g.bestFor}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: '16px 0 0', fontSize: 13.5, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 720 }}>
          All these exams test observation, visual thinking, creativity, spatial ability, reasoning and time management. One foundation course can branch into exam-specific practice for each.
        </p>
      </div>

      {/* Step 3 */}
      <div className="container" style={{ paddingTop: 48 }}>
        <div className="eyebrow">Step 3</div>
        <h2 className="h-block">Eligibility and maths requirement</h2>
        <p style={{ margin: '0 0 20px', fontSize: 14.5, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 640 }}>
          For pure design, Commerce and Arts students also have strong options. For architecture, maths and science eligibility must be checked early.
        </p>
        <div className="card" style={{ overflow: 'hidden' }}>
          {guideEligibility.map((g) => (
            <div key={g.exam} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', padding: '16px 20px', borderBottom: '1px solid var(--line-soft)' }}>
              <span style={{ flex: 'none', width: 88, fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 16 }}>{g.exam}</span>
              <span style={{ flex: '2 1 280px', minWidth: 220, fontSize: 13.5, lineHeight: 1.55, color: 'var(--slate)' }}>{g.streams}</span>
              <span style={{ flex: '1 1 200px', minWidth: 180, fontSize: 13, lineHeight: 1.55, color: 'var(--muted)' }}>
                <b style={{ color: 'var(--orange)' }}>Maths:</b> {g.maths}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 4 */}
      <div className="container" style={{ paddingTop: 48 }}>
        <div className="eyebrow">Step 4</div>
        <h2 className="h-block" style={{ marginBottom: 20 }}>Pattern, stages and weightage</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 14 }}>
          {guidePattern.map((g) => (
            <div key={g.exam} className="card--dark" style={{ padding: 20 }}>
              <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 18, color: 'var(--yellow)', marginBottom: 8 }}>{g.exam}</div>
              <p style={{ margin: '0 0 10px', fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,.85)' }}>{g.stages}</p>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'rgba(255,255,255,.6)' }}>{g.balance}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="container" style={{ paddingTop: 48 }}>
        <div className="eyebrow">Planning · 2027 admission cycle</div>
        <h2 className="h-block">When do these exams happen in 2027?</h2>
        <p style={{ margin: '0 0 20px', fontSize: 14.5, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 680 }}>
          Design and architecture exams for 2027 admission run between December 2026 and June 2027, with application forms opening as early as September 2026. Serious preparation should start before the entrance season — don't wait for board exams to finish.
        </p>
        <div className="card" style={{ overflow: 'hidden' }}>
          {guideCalendar.map((g, i) => (
            <div key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', padding: '14px 20px', borderBottom: '1px solid var(--line-soft)', alignItems: 'center' }}>
              <span style={{ flex: 'none', width: 88, fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 15 }}>{g.exam}</span>
              <span style={{ flex: '1 1 200px', minWidth: 170, fontSize: 13.5, color: 'var(--slate)' }}>{g.stage}</span>
              <span style={{ flex: 'none', fontSize: 12.5, fontWeight: 700, color: 'var(--orange)' }}>{g.time}</span>
            </div>
          ))}
        </div>
        <p style={{ margin: '14px 0 0', fontSize: 12.5, color: 'var(--gray)' }}>
          Dates above are the expected 2027-cycle schedule based on official notifications and last year's calendar (as of July 2026) — always confirm the final dates on each exam's official website.
        </p>
      </div>

      {/* CTA */}
      <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ background: 'var(--orange)', borderRadius: 16, padding: 'clamp(28px,4vw,44px)' }}>
          <h2 style={{ margin: '0 0 10px', fontSize: 'clamp(22px,3vw,30px)', color: '#fff', textWrap: 'pretty' }}>
            The next step: a short evaluation, not a commitment.
          </h2>
          <p style={{ margin: '0 0 20px', fontSize: 14.5, lineHeight: 1.6, color: 'rgba(255,255,255,.9)', maxWidth: 640 }}>
            Let us understand the student's current drawing level, aptitude comfort and interest areas. You'll leave with an honest recommendation — even if it's not us.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <button className="btn btn--ink" onClick={() => navigate('/contact')}>Book an evaluation session</button>
            <a className="btn btn--white" href={waLink} target="_blank" rel="noreferrer">WhatsApp DEXAM</a>
          </div>
        </div>
      </div>
    </div>
  )
}
