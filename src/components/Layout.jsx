import { NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { waLink } from '../config.js'
import LeadModal from './LeadModal.jsx'
import { useCms } from '../cms.jsx'

const navItems = [
  ['Home', '/'],
  ['About', '/about'],
  ['Courses', '/courses'],
  ['Exams', '/exams'],
  ['Guide', '/guide'],
  ['Papers', '/papers'],
  ['Results', '/results'],
  ['Contact', '/contact'],
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout({ children }) {
  const cms = useCms()
  const whatsapp = cms.link('whatsapp', waLink)
  const { pathname } = useLocation()
  // The Papers tab stays highlighted on per-exam paper pages
  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname === to || (to === '/papers' && pathname.startsWith('/papers/'))

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ScrollToTop />

      <div className="announce">
        New batch starting soon —{' '}
        <a href={whatsapp} target="_blank" rel="noreferrer">reserve a free evaluation session</a>
      </div>

      <div className="nav-wrap">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <span className="nav-logo-word">DEX<span style={{ color: 'var(--yellow)' }}>A</span>M</span>
            <span className="nav-logo-sub">Design Exam Academy</span>
          </Link>
          <nav className="nav-links">
            {navItems.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={'nav-link' + (isActive(to) ? ' nav-link--active' : '')}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div style={{ flex: 1 }}>{children}</div>

      <footer className="dark-band">
        <div className="container" style={{ paddingTop: 36, paddingBottom: 30, display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ minWidth: 220 }}>
            <div className="nav-logo-word" style={{ fontSize: 20, marginBottom: 8 }}>
              DEX<span style={{ color: 'var(--yellow)' }}>A</span>M
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,.6)', maxWidth: 280 }}>
              Design Exam Academy · Pallazo Building, 101, Amanora Park Town, Pune. Coaching for NID DAT, UCEED, NIFT, NATA &amp; CEED.
            </p>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'var(--yellow)' }}>
              Taught by designers. Built for designers.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span className="footer-heading">Explore</span>
              <Link className="footer-link" to="/courses">Courses</Link>
              <Link className="footer-link" to="/exams">Exam guide</Link>
              <Link className="footer-link" to="/guide">Parent guide</Link>
              <Link className="footer-link" to="/papers">Previous year papers</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span className="footer-heading">Contact</span>
              <a className="footer-link" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp +91 98342 26279</a>
              <Link className="footer-link" to="/contact">Book counselling</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span className="footer-heading">Legal</span>
              <Link className="footer-link" to="/privacy">Privacy policy</Link>
              <Link className="footer-link" to="/terms">Terms &amp; conditions</Link>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}>
          <div className="container" style={{ paddingTop: 14, paddingBottom: 14, fontSize: 12, color: 'rgba(255,255,255,.45)' }}>
            © 2026 DEXAM · Design Exam Academy · designexam.com
          </div>
        </div>
      </footer>

      <LeadModal />
    </div>
  )
}
