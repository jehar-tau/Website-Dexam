import { useState } from 'react'
import { waLink } from '../config.js'
import { submitToGoogleSheet } from '../cms.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', msg: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: false }))
  }

  const submit = async () => {
    const errs = {
      name: form.name.trim().length < 2,
      phone: !/^[0-9]{10}$/.test(form.phone.replace(/[\s-]/g, '')),
    }
    if (Object.values(errs).some(Boolean)) {
      setErrors(errs)
      return
    }
    try { await submitToGoogleSheet('counselling', form) } catch {}
    setDone(true)
  }

  return (
    <div className="container" style={{ paddingTop: 52, paddingBottom: 64, display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-start' }}>
      <div style={{ flex: '1 1 380px', minWidth: 280 }}>
        <div className="eyebrow">Contact</div>
        <h1 className="h-page">Talk to us.</h1>
        <p className="lede lede--lg" style={{ maxWidth: 480, marginBottom: 26 }}>
          Book a free counselling session, ask about a course, or just figure out which exam makes sense. No pressure, real answers.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card card--soft" style={{ borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 4 }}>Phone &amp; WhatsApp</div>
            <a href={waLink} target="_blank" rel="noreferrer" style={{ fontWeight: 700, fontSize: 16, color: 'var(--ink)' }}>+91 98342 26279</a>
          </div>
          <div className="card card--soft" style={{ borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 4 }}>Studio</div>
            <div style={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.5 }}>
              Pallazo Building, 101, next to Wisdom World School, Amanora Park Town, Pune 411028
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>
              Locations: Hadapsar · Kothrud · Viman Nagar · Katraj
            </div>
          </div>
          <div className="card card--soft" style={{ borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 4 }}>Email</div>
            <a href="mailto:inquiry@designexam.com" style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>inquiry@designexam.com</a>
          </div>
          <a className="btn btn--green btn--block" href={waLink} target="_blank" rel="noreferrer">Chat on WhatsApp now</a>
        </div>
      </div>

      <div style={{ flex: '1 1 360px', minWidth: 280, maxWidth: 480 }}>
        <div className="card card--r14" style={{ padding: '26px 24px' }}>
          {!done ? (
            <>
              <h2 style={{ margin: '0 0 4px', fontSize: 21 }}>Book free counselling</h2>
              <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--muted)' }}>
                We'll call or message you within one working day.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label className="field-label">Name *</label>
                  <input
                    className={'field-input' + (errors.name ? ' field-input--error' : '')}
                    style={{ padding: 12 }}
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Parent or student name"
                  />
                </div>
                <div>
                  <label className="field-label">Phone number *</label>
                  <input
                    className={'field-input' + (errors.phone ? ' field-input--error' : '')}
                    style={{ padding: 12 }}
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="field-label">What do you want to talk about?</label>
                  <textarea
                    className="field-input"
                    style={{ padding: 12, resize: 'vertical' }}
                    rows={3}
                    value={form.msg}
                    onChange={set('msg')}
                    placeholder="e.g. My daughter is in 11th and interested in NID…"
                  />
                </div>
                <button className="btn btn--orange" onClick={submit}>Request a call back</button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '18px 0' }}>
              <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(30,138,76,.12)', color: 'var(--green)', fontSize: 26, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                ✓
              </div>
              <h2 style={{ margin: '0 0 8px', fontSize: 21 }}>Request received</h2>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--muted)' }}>
                Thanks! A DEXAM counsellor will reach out within one working day.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
