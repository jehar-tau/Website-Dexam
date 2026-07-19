import { aboutPoints } from '../data.js'
import ImageSlot from '../components/ImageSlot.jsx'

export default function About() {
  return (
    <div>
      <div className="dark-band">
        <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="eyebrow eyebrow--yellow">About DEXAM</div>
          <h1 className="h-hero" style={{ maxWidth: 720 }}>
            A studio built around how design exams actually test students.
          </h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: 'rgba(255,255,255,.75)', maxWidth: 640 }}>
            DEXAM — Design Exam Academy — prepares students in Pune for NID DAT, UCEED, NIFT, NATA and CEED. We train observation, creativity, visual reasoning and communication, not just drawing technique.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 48, display: 'flex', flexWrap: 'wrap', gap: 36, alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 380px', minWidth: 280 }}>
          <h2 style={{ margin: '0 0 14px', fontSize: 26 }}>How we work</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {aboutPoints.map((a) => (
              <div key={a.num} style={{ display: 'flex', gap: 14, background: '#fff', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '16px 18px' }}>
                <span style={{ fontFamily: "'Zilla Slab',serif", fontWeight: 600, fontSize: 14, color: 'var(--orange)', flex: 'none', paddingTop: 2 }}>{a.num}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{a.title}</div>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'var(--muted)' }}>{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 340px', minWidth: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ height: 260 }}>
            <ImageSlot slotId="about-studio" src="/assets/about/studio.jpg" radius={14} placeholder="Drop a photo of the DEXAM studio / classroom" />
          </div>
          <div style={{ height: 200 }}>
            <ImageSlot slotId="about-student-work" src="/assets/about/student-work.jpg" radius={14} placeholder="Drop a photo of student work" />
          </div>
        </div>
      </div>
    </div>
  )
}
