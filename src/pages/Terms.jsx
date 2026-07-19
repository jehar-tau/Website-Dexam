const sections = [
  [null, 'These Terms & Conditions constitute an electronic record under the Information Technology Act, 2000 and the rules made thereunder, and do not require a physical or digital signature. They govern your use of designexam.com and the coaching services offered by DEXAM — Design Exam Academy, Pallazo Building, 101, Amanora Park Town, Pune, Maharashtra, India. By using this website, submitting a form, or enrolling in a course, you agree to these terms and to our Privacy Policy.'],
  ['1. Services', 'DEXAM provides coaching, study material, mock tests and guidance for design and architecture entrance examinations including NID DAT, UCEED, NIFT, NATA and CEED. Free resources such as previous year papers, the design career quiz and study plans are provided for personal, non-commercial use only.'],
  ['2. No guarantee of results', 'Admission to any college depends on the student\'s own performance and the policies of the examination bodies and institutions. Past results, selection numbers and testimonials shown on this website are illustrative of previous batches and do not guarantee any rank, score or admission. The design career quiz and fit score are indicative guidance tools, not professional aptitude certifications.'],
  ['3. Enrolment, fees and refunds', 'Course enrolment is confirmed only after payment of the applicable fees as communicated at the time of admission. Fees, batch timings and course contents may be revised prospectively. Refunds, if any, are governed by the fee policy shared with you at enrolment; unless stated otherwise in writing, fees for classes already conducted are non-refundable.'],
  ['4. Intellectual property', 'All content on this website and in DEXAM study material — including notes, question banks, solutions, videos and branding — is the property of DEXAM or its licensors. You may not copy, redistribute, resell or publish it without our written permission. Names of examinations and institutions (NID, IIT Bombay, NIFT, CoA, etc.) belong to their respective owners; DEXAM is an independent coaching academy and is not affiliated with them.'],
  ['5. Communications', 'By submitting your contact details on this website, you consent to being contacted by DEXAM on WhatsApp, phone, SMS or email regarding the material you requested, counselling, courses and exam updates, in accordance with the Telecom Commercial Communications Customer Preference Regulations (TRAI). This consent applies even if your number is registered under DND/NCPR. You may opt out at any time as described in our Privacy Policy.'],
  ['6. Acceptable use', 'You agree not to misuse this website — including submitting false information, attempting to disrupt or gain unauthorised access to it, or scraping its content — and to comply with the Information Technology Act, 2000 and all other applicable Indian laws while using it. We may suspend access or services for misuse of these terms.'],
  ['7. Limitation of liability', 'The website and free resources are provided “as is”. To the maximum extent permitted by law, DEXAM is not liable for indirect or consequential losses arising from use of the website, and our total liability in relation to any paid course is limited to the fees you paid for that course. Exam dates, patterns and syllabi mentioned on this site may change; always verify with the official examination body.'],
  ['8. Governing law, grievances and contact', 'These terms are governed by the laws of India, with courts at Pune, Maharashtra having exclusive jurisdiction. Complaints or grievances regarding the website or these terms may be addressed to our Grievance Officer at DEXAM — Design Exam Academy, Pallazo Building, 101, Amanora Park Town, Pune, or on WhatsApp at +91 98342 26279. We may update these terms from time to time; continued use of the website means you accept the updated terms.'],
]

export default function Terms() {
  return (
    <div>
      <div className="dark-band">
        <div className="container container--narrow" style={{ paddingTop: 44, paddingBottom: 48 }}>
          <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1.12, color: '#fff' }}>Terms &amp; Conditions</h1>
          <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,.65)' }}>designexam.com · Last updated: 17 July 2026</p>
        </div>
      </div>
      <div className="container container--narrow legal-body" style={{ paddingTop: 40, paddingBottom: 64, display: 'flex', flexDirection: 'column', gap: 26 }}>
        {sections.map(([title, text], i) => (
          <div key={i}>
            {title && <h2>{title}</h2>}
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
