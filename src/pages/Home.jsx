import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { waLink } from '../config.js'
import {
  examData, heroExamNames, heroDisciplines, aiQuotes, placements,
  graduateCompanies, mentors, whyPoints,
} from '../data.js'
import ImageSlot from '../components/ImageSlot.jsx'

function Hero() {
  const navigate = useNavigate()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    heroDisciplines.forEach(({ src }) => { new Image().src = src })
    const t = setInterval(() => setTick((n) => n + 1), 2400)
    return () => clearInterval(t)
  }, [])
  const discIndex = tick % heroDisciplines.length

  return (
    <div className="dark-band">
      <div className="container" style={{ paddingTop: 64, paddingBottom: 60, display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
        <div style={{ flex: '1 1 420px', minWidth: 300 }}>
          <div style={{ display: 'inline-block', background: 'rgba(246,80,9,.18)', border: '1px solid rgba(246,80,9,.5)', color: 'var(--orange-soft)', fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 999, marginBottom: 18 }}>
            Design entrance coaching · Pune
          </div>
          <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(32px,4.5vw,40px)', lineHeight: 1.08, color: '#fff', textWrap: 'pretty' }}>
            Choose an AI-proof career and get into India's top design colleges with DEXAM.
          </h1>
          <p style={{ margin: '0 0 22px', fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,.75)', maxWidth: 540 }}>
            Calculable, maths-heavy work is being taken over by AI. What grows more valuable is what machines can't replicate: taste, style and visual expression. DEXAM prepares students for India's top design and architecture entrance exams.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {heroExamNames.map((name) => (
              <span key={name} style={{ border: '1.5px solid rgba(255,255,255,.3)', color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '.02em', padding: '7px 15px', borderRadius: 999 }}>
                {name}
              </span>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 340px', minWidth: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ position: 'relative', width: 360, height: 360, maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div key={'wave-' + tick} style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle,transparent 58%,rgba(246,80,9,.55) 63%,rgba(242,183,42,.35) 72%,transparent 78%)', animation: 'dq-wave 900ms ease-out', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.25)', background: 'rgba(255,255,255,.03)' }} />
            <div key={'disc-' + discIndex} style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', zIndex: 2, animation: 'dq-disc-fade 500ms ease-out' }}>
              <ImageSlot
                slotId={`hero-${discIndex + 1}`}
                src={heroDisciplines[discIndex].src}
                alt={heroDisciplines[discIndex].label}
                placeholder="Drop discipline illustration"
                imgStyle={{ transform: `scale(${heroDisciplines[discIndex].zoom})` }}
              />
            </div>
          </div>
          <button className="btn btn--orange" onClick={() => navigate('/quiz')}>
            Take the design career quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <Hero />

      {/* The shift: AI-proof narrative */}
      <div className="container section">
        <div className="eyebrow">The shift</div>
        <h2 className="h-section">The people building AI say it themselves.</h2>
        <p className="lede" style={{ maxWidth: 660 }}>
          Routine engineering and knowledge work is being automated fast. What the AI leaders keep pointing to as the durable human skill: taste, judgement and knowing what's worth making.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {aiQuotes.map((q) => (
            <div key={q.who} className="card--dark" style={{ borderRadius: 14, padding: '24px 22px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 600, fontSize: 38, lineHeight: 0.6, color: 'var(--yellow)', marginBottom: 14 }}>"</div>
              <p style={{ margin: '0 0 16px', fontSize: 15, lineHeight: 1.6, color: '#fff', flex: 1 }}>{q.quote}</p>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--yellow)' }}>{q.who}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>{q.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Placements proof */}
      <div className="container section">
        <div className="card card--r14" style={{ padding: 'clamp(26px,4vw,40px)', borderRadius: 16 }}>
          <div className="eyebrow">Where this career leads</div>
          <h2 style={{ margin: '0 0 22px', fontSize: 'clamp(22px,3vw,30px)', textWrap: 'pretty' }}>
            Design pays — and it's only going up.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 22 }}>
            {placements.map((p) => (
              <div key={p.num} style={{ border: '1px solid var(--line-soft)', background: 'var(--cream)', borderRadius: 12, padding: 20 }}>
                <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 34, color: 'var(--orange)', lineHeight: 1 }}>{p.num}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 8, lineHeight: 1.45 }}>{p.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 26px' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray)' }}>
              Design graduates work at
            </span>
            {graduateCompanies.map((c) => (
              <span key={c} style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 600, fontSize: 17 }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Mentors */}
      <div className="container section">
        <div className="eyebrow">Mentors</div>
        <h2 className="h-section">Learn from people who cracked these exams.</h2>
        <p className="lede" style={{ maxWidth: 620 }}>
          Design and architecture alumni who teach drawing, aptitude and design thinking the way the exams actually demand it.
        </p>
        <div className="card--dark" style={{ borderRadius: 16, padding: 'clamp(24px,3.5vw,36px)', marginBottom: 18, display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px', minWidth: 280 }}>
            <div className="eyebrow eyebrow--yellow eyebrow--sm">From your mentor</div>
            <p style={{ margin: '0 0 12px', fontFamily: "'Zilla Slab',serif", fontWeight: 500, fontSize: 'clamp(18px,2.4vw,23px)', lineHeight: 1.45, color: '#fff', textWrap: 'pretty' }}>
              "I've been where you are — unsure if your work is good enough. We built DEXAM to give students the clarity and honest feedback we wished we had while preparing."
            </p>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--yellow)' }}>Snehalkumar Shinde</div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.65)' }}>Founder · NID Alumni · Industrial Design</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {mentors.map((m) => (
            <div key={m.name} className="card card--r14" style={{ overflow: 'hidden' }}>
              <div style={{ height: 230 }}>
                <ImageSlot slotId={m.slotId} src={m.photo} alt={m.name} placeholder="Drop mentor photo" />
              </div>
              <div style={{ padding: '16px 18px 18px' }}>
                <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 18, marginBottom: 3 }}>{m.name}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)', marginBottom: 8 }}>{m.creds}</div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--muted)' }}>{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exams strip */}
      <div className="container section">
        <div className="eyebrow">Exam prep</div>
        <h2 className="h-section" style={{ marginBottom: 8 }}>What are you preparing for?</h2>
        <p className="lede">Pick your exam. We'll show you the way.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
          {examData.map((ex) => (
            <div key={ex.id} className="card card--hover" style={{ padding: '20px 18px' }} onClick={() => navigate('/exams')}>
              <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{ex.name}</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>{ex.tag}</div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: 'var(--muted)' }}>{ex.blurb}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Papers lead magnet */}
      <div className="container section">
        <div className="card--dark" style={{ borderRadius: 16, padding: 'clamp(28px,4vw,48px)', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
          <div style={{ flex: '1 1 380px', minWidth: 280 }}>
            <div className="eyebrow eyebrow--yellow">Free download</div>
            <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.15, color: '#fff', textWrap: 'pretty' }}>
              Preparing for NID, UCEED, NIFT, NATA or CEED?
            </h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,.75)' }}>
              Download previous year papers and see the type of questions asked in India's top design and architecture entrance exams.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', minWidth: 260 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {examData.map((ex) => (
                <Link
                  key={ex.id}
                  to={'/papers/' + ex.id}
                  style={{ border: '1.5px solid rgba(255,255,255,.4)', color: '#fff', fontSize: 13, fontWeight: 600, padding: '8px 15px', borderRadius: 999 }}
                >
                  {ex.name} papers
                </Link>
              ))}
            </div>
            <button className="btn btn--orange btn--block" onClick={() => navigate('/papers')}>
              View all previous year papers
            </button>
          </div>
        </div>
      </div>

      {/* Why DEXAM */}
      <div className="container section">
        <div className="eyebrow">Why DEXAM</div>
        <h2 className="h-section" style={{ marginBottom: 24 }}>Design exams need more than drawing classes.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14 }}>
          {whyPoints.map((w) => (
            <div key={w.num} className="card card--soft" style={{ padding: '22px 20px' }}>
              <div style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 600, fontSize: 14, color: 'var(--orange)', marginBottom: 8 }}>{w.num}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{w.title}</div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'var(--muted)' }}>{w.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div className="container" style={{ paddingTop: 56, paddingBottom: 64 }}>
        <div style={{ background: 'var(--orange)', borderRadius: 16, padding: 'clamp(28px,4vw,44px)', textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 10px', fontSize: 'clamp(22px,3vw,32px)', color: '#fff', textWrap: 'pretty' }}>
            Let's design your success together.
          </h2>
          <p style={{ margin: '0 auto 22px', fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,.9)', maxWidth: 560 }}>
            Not sure which exam fits your child? Book a one-on-one guidance session — we'll map interests, class and timeline to the right exam and preparation plan.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn--ink" onClick={() => navigate('/contact')}>Book free counselling</button>
            <a className="btn btn--white" href={waLink} target="_blank" rel="noreferrer">WhatsApp DEXAM</a>
          </div>
        </div>
      </div>
    </div>
  )
}
