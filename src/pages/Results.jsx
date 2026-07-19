import { testimonials } from '../data.js'
import ImageSlot from '../components/ImageSlot.jsx'

export default function Results() {
  return (
    <div className="container" style={{ paddingTop: 52, paddingBottom: 64 }}>
      <div className="eyebrow">Results</div>
      <h1 className="h-page">Where DEXAM students go.</h1>
      <p className="lede lede--lg" style={{ maxWidth: 600, marginBottom: 32 }}>
        Selections, portfolios and stories from students who prepared with us. Replace these placeholders with your real results and photos.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14, marginBottom: 36 }}>
        {testimonials.map((t) => (
          <div key={t.result} className="card card--soft" style={{ padding: '22px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>{t.result}</div>
            <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.6, color: 'var(--slate)', fontStyle: 'italic' }}>"{t.quote}"</p>
            <div style={{ fontWeight: 700, fontSize: 13.5 }}>{t.name}</div>
          </div>
        ))}
      </div>
      <h2 style={{ margin: '0 0 14px', fontSize: 22 }}>Student work</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14 }}>
        {[1, 2, 3].map((n) => (
          <div key={n} style={{ height: 220 }}>
            <ImageSlot slotId={`work-${n}`} src={`/assets/work/work-${n}.jpg`} radius={12} placeholder="Drop student work photo" />
          </div>
        ))}
      </div>
    </div>
  )
}
