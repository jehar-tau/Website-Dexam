import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { waLink } from "../config.js";
import LeadModal from "./LeadModal.jsx";
import { useCms } from "../cms.jsx";
import { Icon } from "../site/Art.jsx";
import { PageMeta } from "../site/components.jsx";
import { metadataFor } from "../site/routes.js";
import { exams, site } from "../site/content.js";
import "../site/academy.css";

export default function Layout({ children }) {
  const { pathname, hash } = useLocation(),
    [menu, setMenu] = useState(false),
    cms = useCms(),
    whatsapp = cms.link("whatsapp", waLink);
  useEffect(() => {
    setMenu(false);
    document
      .querySelectorAll(".dea-nav details[open]")
      .forEach((el) => el.removeAttribute("open"));
    if (hash) {
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
    } else window.scrollTo(0, 0);
  }, [pathname, hash]);
  useEffect(() => {
    if (!menu) return;
    const close = (ev) => {
      if (ev.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);
  return (
    <div className="academy">
      <PageMeta {...metadataFor(pathname)} />
      <a className="dea-skip" href="#main-content">
        Skip to content
      </a>
      <div className="dea-announcement">
        <Link to="/quiz">
          <span>A LITTLE SELF-DISCOVERY</span> Have an eye for design? Find out
          for free. <Icon name="arrow" size={14} />
        </Link>
      </div>
      <header className="dea-header">
        <div className="dea-wrap dea-header-inner">
          <Link
            to="/"
            className="dea-brand"
            aria-label="DEXAM Design Exam Academy home"
          >
            DEX<span>A</span>M
            <i>
              DESIGN EXAM
              <br />
              ACADEMY
            </i>
          </Link>
          <button
            className="dea-menu-toggle"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            aria-controls="academy-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? (
              <Icon name="close" />
            ) : (
              <span>
                Menu <i>☰</i>
              </span>
            )}
          </button>
          <nav
            className={`dea-nav ${menu ? "is-open" : ""}`}
            id="academy-navigation"
            aria-label="Main navigation"
          >
            <NavLink to="/courses">Programmes</NavLink>
            <details>
              <summary
                className={pathname.startsWith("/exams") ? "active" : ""}
              >
                The exams <span>⌄</span>
              </summary>
              <div className="dea-nav-dropdown">
                <Link to="/exams">
                  Explore all exam routes <Icon name="arrow" size={14} />
                </Link>
                {exams.map((e) => (
                  <Link key={e.id} to={`/exams/${e.id}`}>
                    {e.name}
                    <small>{e.degree}</small>
                  </Link>
                ))}
                <Link to="/design-degrees">Degrees &amp; durations</Link>
                <Link to="/design-colleges">College guides</Link>
              </div>
            </details>
            <NavLink
              to="/resources"
              className={pathname.startsWith("/papers") ? "active" : ""}
            >
              Free resources
            </NavLink>
            <NavLink to="/about">Our studio</NavLink>
            <Link to="/student-access" className="dea-student-link">
              Student space <span>↗</span>
            </Link>
            <Link className="dea-nav-cta" to="/contact">
              Let’s talk design <Icon name="arrow" size={15} />
            </Link>
          </nav>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="dea-footer">
        <div className="dea-wrap">
          <div className="dea-footer-top">
            <div>
              <Link to="/" className="dea-brand">
                DEX<span>A</span>M
                <i>
                  DESIGN EXAM
                  <br />
                  ACADEMY
                </i>
              </Link>
              <p>
                A place for curious minds.
                <br />A preparation for creative futures.
              </p>
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="dea-footer-contact"
              >
                Let’s start a conversation <Icon name="arrow" size={17} />
              </a>
            </div>
            <div>
              <span>FIND YOUR DIRECTION</span>
              <Link to="/courses">Our programmes</Link>
              <Link to="/design-careers">The world of design</Link>
              <Link to="/design-colleges">College guides</Link>
              <Link to="/quiz">Design Instinct test</Link>
              <Link to="/guide">For students &amp; parents</Link>
              <Link to="/mock-tests">Mock tests &amp; practice</Link>
            </div>
            <div>
              <span>KEEP EXPLORING</span>
              <Link to="/resources">Free resource library</Link>
              <Link to="/papers">Previous year papers</Link>
              <Link to="/exams">Exam guides</Link>
              <Link to="/design-degrees">Degrees &amp; durations</Link>
              <Link to="/about">Meet the mentors</Link>
              <Link to="/results">Learning &amp; progress</Link>
            </div>
            <div>
              <span>COME SAY HELLO</span>
              <Link to="/design-coaching-pune">
                Amanora Park Town,
                <br />
                Hadapsar, Pune 411028
              </Link>
              <a href={whatsapp} target="_blank" rel="noreferrer">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <Link to="/contact">Plan a studio visit ↗</Link>
            </div>
          </div>
          <div className="dea-footer-word">
            Stay <em>curious.</em>
            <span>✳</span>
          </div>
          <div className="dea-footer-bottom">
            <span>
              © {new Date().getFullYear()} DEXAM · Design Exam Academy
            </span>
            <span>Independent coaching. No institutional affiliation.</span>
            <div>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
      <LeadModal />
    </div>
  );
}
