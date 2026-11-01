const sections = [
  [null, 'These Terms & Conditions constitute an electronic record under the Information Technology Act, 2000 and the rules made thereunder, and do not require a physical or digital signature. They govern your use of designexam.com and the coaching services offered by DEXAM — Design Exam Academy, Pallazo Building, 101, Amanora Park Town, Pune, Maharashtra, India. By using this website, submitting a form, or enrolling in a course, you agree to these terms and to our Privacy Policy.'],
  ['1. Services', 'DEXAM provides coaching, study material, mock tests and guidance for design and architecture entrance examinations including NID DAT, UCEED, NIFT, NATA and CEED. Free resources such as previous year papers, the design career quiz and study plans are provided for personal, non-commercial use only.'],
  ['2. No guarantee of results', 'Admission to any college depends on the student\'s own performance and the policies of the examination bodies and institutions. Past results, selection numbers and testimonials shown on this website are illustrative of previous batches and do not guarantee any rank, score or admission. The design career quiz and fit score are indicative guidance tools, not professional aptitude certifications.'],
  ['3. Enrolment, fees and refunds', 'Course enrolment is confirmed only after payment of the applicable fees as communicated at the time of admission. Fees, batch timings and course contents may be revised prospectively. Refunds, if any, are governed by the fee policy shared with you at enrolment; unless stated otherwise in writing, fees for classes already conducted are non-refundable.'],
  ['4. Intellectual property and permitted use', 'DEXAM owns, or uses with permission, the original expression and compilation of content created for this website and its services, including original text, lesson material, question banks, solutions, photographs, videos, graphics, page layouts, branding and software. Unless a resource expressly says otherwise, we give you a limited, revocable, non-transferable right to view it and to use an explicitly downloadable free resource for your own personal, non-commercial study. You may not reproduce, republish, mirror, adapt, translate, distribute, sell, license, publicly display, create a competing resource from, or remove rights notices from DEXAM content without prior written permission. This clause does not claim ownership of facts, ideas, official examination material or third-party marks, and does not restrict any use permitted by applicable law, including applicable statutory exceptions. Names and marks of examinations and institutions (NID, IIT Bombay, NIFT, CoA, etc.) belong to their respective owners; DEXAM is an independent coaching academy and is not affiliated with them.'],
  ['5. Communications', 'By submitting your contact details on this website, you consent to being contacted by DEXAM on WhatsApp, phone, SMS or email regarding the material you requested, counselling, courses and exam updates, in accordance with the Telecom Commercial Communications Customer Preference Regulations (TRAI). This consent applies even if your number is registered under DND/NCPR. You may opt out at any time as described in our Privacy Policy.'],
  ['6. Acceptable use, automated access and data extraction', 'You must not submit false information; probe, disrupt or gain unauthorised access to the website or any account; bypass access controls, rate limits or technical protections; use bots, crawlers, scrapers or other automated means to copy, monitor, extract or compile our content or user data; mirror the website; build a dataset, search product, commercial service or machine-learning training corpus from DEXAM content; or reproduce the website\'s distinctive design or software without prior written permission. General-purpose search engines may crawl public pages only to create ordinary search listings when they honour our robots instructions and do not expose protected material. We may block automated access, suspend services and pursue available remedies for misuse. You remain responsible for complying with the Information Technology Act, 2000 and all other applicable laws.'],
  ['7. Limitation of liability', 'The website and free resources are provided “as is”. To the maximum extent permitted by law, DEXAM is not liable for indirect or consequential losses arising from use of the website, and our total liability in relation to any paid course is limited to the fees you paid for that course. Exam dates, patterns and syllabi mentioned on this site may change; always verify with the official examination body.'],
  ['8. Permissions, enforcement and contact', 'For permission to reuse DEXAM content, email inquiry@designexam.com with the exact material, intended use, audience, duration and channels. Permission is valid only when DEXAM confirms it in writing and may include conditions or a licence fee. We may use technical and legal measures to protect our website and content, including blocking access, requesting removal, preserving evidence and pursuing remedies available under law. Nothing in these terms limits lawful statutory rights or exceptions.'],
  ['9. Governing law and grievances', 'These terms are governed by the laws of India, with courts at Pune, Maharashtra having exclusive jurisdiction. Complaints or grievances regarding the website or these terms may be addressed to our Grievance Officer at DEXAM — Design Exam Academy, Pallazo Building, 101, Amanora Park Town, Pune, by email at inquiry@designexam.com, or on WhatsApp at +91 98342 26279. We may update these terms from time to time; the date above identifies the current version.'],
]

export default function Terms() {
  return (
    <div>
      <div className="dark-band">
        <div className="container container--narrow" style={{ paddingTop: 44, paddingBottom: 48 }}>
          <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1.12, color: '#fff' }}>Terms &amp; Conditions</h1>
          <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,.65)' }}>designexam.com · Last updated: 1 November 2026</p>
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
