const sections = [
  [null, 'This Privacy Policy is published in accordance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (“SPDI Rules”), and the Digital Personal Data Protection Act, 2023 (“DPDP Act”). It explains how DEXAM — Design Exam Academy (“DEXAM”, “we”, “us”), operating the website designexam.com from Pallazo Building, 101, Amanora Park Town, Pune, Maharashtra, India, collects, uses and protects your personal data when you use our website, download study material, take our design career quiz, or enquire about our coaching programmes. DEXAM is the “data fiduciary” for this data under the DPDP Act.'],
  ['1. Information we collect', 'We collect information you voluntarily provide through our forms, including: student name, parent name, phone / WhatsApp number, email address, city or area, student class, and the exam(s) you are interested in. If you take our design career quiz, we also record your quiz responses and score to prepare your study plan.\n\nWe also automatically collect limited technical data — such as device type, browser, pages visited and approximate location — through cookies and similar technologies.'],
  ['2. Purpose, consent and how we use your data', 'We process your personal data only for the purposes for which you provide it and with your consent, as required under the DPDP Act: to send you the study material, past papers or study plan you requested; to respond to enquiries and schedule counselling sessions; to contact you on WhatsApp, phone or email about our courses and exam updates; to improve our website and courses; and to comply with legal obligations. Submitting a form on this website constitutes your consent to this processing. You may withdraw consent at any time (see “Your rights” below). We do not sell your personal data to anyone.'],
  ['3. Cookies and advertising', 'We use cookies and tracking tools, including the Meta (Facebook) Pixel and similar analytics and advertising tools, to measure how visitors use our site and to show you relevant advertisements on platforms such as Facebook and Instagram. These tools may collect information about your device and browsing behaviour on our site. You can control cookies through your browser settings and manage ad preferences in your Meta account settings.'],
  ['4. Sharing and transfer of data', 'We share personal data only with: service providers (data processors) who help us run our website, messaging and advertising — for example WhatsApp Business, email providers, and Meta Platforms for ad measurement — under obligations to protect it; and government authorities where required under Indian law. Some service providers may store data on servers outside India; we share data with them only where permitted under the DPDP Act. Our team members access your data only to serve you.'],
  ['5. Data retention and security', 'We retain your personal data only for as long as needed to serve the purpose for which it was collected or as required under Indian law, after which it is deleted. As required under the SPDI Rules and the DPDP Act, we use reasonable security practices and technical and organisational safeguards to protect your data, though no method of transmission over the internet is completely secure.'],
  ['6. Your rights', 'Under the DPDP Act you have the right to: access a summary of the personal data we hold about you; request correction, updation or erasure of your data; withdraw your consent at any time; nominate a person to exercise your rights; and raise a grievance with us and, if unresolved, with the Data Protection Board of India. You may opt out of marketing messages at any time by replying “STOP” on WhatsApp or using the unsubscribe link in emails. To exercise these rights, contact our Grievance Officer using the details below; we will respond within the timelines prescribed under applicable law.'],
  ['7. Children\'s data', 'Our programmes are aimed at school and college students. In line with the DPDP Act, where a student is below 18 years of age, we collect and process their personal data only with the verifiable consent of a parent or lawful guardian, and we do not use children\'s data for behavioural tracking or targeted advertising directed at children. Parents or guardians should make, or supervise, all form submissions for minors.'],
  ['8. Grievance Officer, changes and contact', 'In accordance with the Information Technology Act, 2000 and the DPDP Act, grievances and data requests may be addressed to our Grievance Officer: DEXAM — Design Exam Academy, Pallazo Building, 101, Amanora Park Town, Pune, Maharashtra, or on WhatsApp at +91 98342 26279. We may update this policy from time to time; the latest version will always be available on this page.'],
]

export default function Privacy() {
  return (
    <div>
      <div className="dark-band">
        <div className="container container--narrow" style={{ paddingTop: 44, paddingBottom: 48 }}>
          <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1.12, color: '#fff' }}>Privacy Policy</h1>
          <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,.65)' }}>designexam.com · Last updated: 17 July 2026</p>
        </div>
      </div>
      <div className="container container--narrow legal-body" style={{ paddingTop: 40, paddingBottom: 64, display: 'flex', flexDirection: 'column', gap: 26 }}>
        {sections.map(([title, text], i) => (
          <div key={i}>
            {title && <h2>{title}</h2>}
            {text.split('\n\n').map((para, j) => (
              <p key={j} style={j > 0 ? { marginTop: 8 } : undefined}>{para}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
