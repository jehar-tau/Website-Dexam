export default function Results() {
  return (
    <div className="container" style={{ paddingTop: 52, paddingBottom: 64 }}>
      <div className="eyebrow">Results</div>
      <h1 className="h-page">Where DEXAM students go.</h1>
      <p className="lede lede--lg" style={{ maxWidth: 600, marginBottom: 32 }}>
        Verified student outcomes and work will be added here only with the student’s permission and supporting records.
      </p>
      <div className="card card--soft" style={{ padding: 28, maxWidth: 760 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 22 }}>Evidence before claims</h2>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--muted)' }}>
          We are reviewing past results, student work and consent records. Until that review is complete, DEXAM will not publish placeholder testimonials, unverified selection claims or identifiable student work.
        </p>
      </div>
    </div>
  )
}
