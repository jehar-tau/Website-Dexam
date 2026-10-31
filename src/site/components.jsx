import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Art, Icon } from "./Art.jsx";
import { site } from "./content.js";

export function ArrowLink({ to, children, className = "" }) {
  return (
    <Link className={`dea-text-link ${className}`} to={to}>
      {children}
      <Icon name="arrow" size={17} />
    </Link>
  );
}
export function Button({
  to,
  children,
  orange = false,
  light = false,
  ...props
}) {
  return (
    <Link
      to={to}
      className={`dea-button ${orange ? "dea-button-orange" : ""} ${light ? "dea-button-light" : ""}`}
      {...props}
    >
      {children}
      <Icon name="arrow" size={18} />
    </Link>
  );
}
export function Eyebrow({ children }) {
  return (
    <span className="dea-eyebrow">
      <i />
      {children}
    </span>
  );
}
export function Breadcrumbs({ items = [] }) {
  return (
    <nav className="dea-breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map(([title, url], i) => (
        <span key={title}>
          <i>/</i>
          {url ? (
            <Link to={url}>{title}</Link>
          ) : (
            <b aria-current="page">{title}</b>
          )}
        </span>
      ))}
    </nav>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  art,
  children,
  breadcrumbs = [],
}) {
  return (
    <section className={`dea-page-hero dea-wrap ${art ? "has-art" : ""}`}>
      <Breadcrumbs items={breadcrumbs.length ? breadcrumbs : [[eyebrow]]} />
      <div className="dea-page-hero-copy">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {children}
      </div>
      {art && (
        <div className="dea-page-hero-art">
          <Art kind={art} />
          <span>SEE A LITTLE DIFFERENTLY.</span>
        </div>
      )}
    </section>
  );
}
export function SectionTitle({ eyebrow, title, to, link }) {
  return (
    <div className="dea-section-title">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
      </div>
      {to && <ArrowLink to={to}>{link || "Explore more"}</ArrowLink>}
    </div>
  );
}
export function Cta({
  title = (
    <>
      Your next chapter
      <br />
      starts with a <em>conversation.</em>
    </>
  ),
  description = "Bring your questions. We’ll help you connect your interests, your timeline and a sensible next step.",
}) {
  return (
    <section className="dea-cta dea-wrap">
      <div className="dea-cta-drawing">
        <Art kind="curve" />
      </div>
      <div>
        <Eyebrow>A SMALL FIRST STEP</Eyebrow>
        <h2>{title}</h2>
        <p>{description}</p>
        <Button to="/contact" orange>
          Let’s talk design
        </Button>
        <span className="dea-cta-foot">
          Free counselling · Students &amp; parents welcome
        </span>
      </div>
      <span className="dea-cta-star">✳</span>
    </section>
  );
}
export function Faq({ items, title = "A few things you might be wondering." }) {
  return (
    <section className="dea-faq-section dea-wrap">
      <div>
        <Eyebrow>GOOD QUESTIONS</Eyebrow>
        <h2>{title}</h2>
        <p>
          Still curious about something?
          <br />
          <ArrowLink to="/contact">Ask us directly</ArrowLink>
        </p>
      </div>
      <div className="dea-faq-list">
        {items.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span>+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function ProgrammeCard({ programme: p, index = 0 }) {
  return (
    <article className={`dea-programme-card programme-${index}`}>
      <div className="dea-programme-art">
        <Art kind={p.art} />
        <span>{p.duration.toUpperCase()} / A CREATIVE EDUCATION</span>
      </div>
      <div className="dea-programme-copy">
        <span className="dea-small-label">{p.label}</span>
        <h3>{p.name}</h3>
        <p>{p.for}</p>
        <div className="dea-programme-price">
          <b>{p.price}</b>
          <span>programme fee</span>
        </div>
        <ul>
          {p.points.map((point) => (
            <li key={point}>
              <Icon name="check" size={14} />
              {point}
            </li>
          ))}
        </ul>
        <Button to={`/contact?programme=${p.id}`} orange={index === 0}>
          Explore this programme
        </Button>
      </div>
    </article>
  );
}
export function ExamCard({ exam: e }) {
  return (
    <Link to={`/exams/${e.id}`} className={`dea-exam-card tone-${e.color}`}>
      <div>
        <span>{e.degree}</span>
        <Icon name="arrow" size={18} />
      </div>
      <Art kind={e.art} />
      <h3>{e.name}</h3>
      <p>{e.subtitle}</p>
    </Link>
  );
}
export function ArticleCard({ article: a }) {
  return (
    <Link className="dea-article-card" to={`/resources/${a.slug}`}>
      <div
        className={`dea-article-art tone-${a.art === "sketch" ? "peach" : a.art === "portfolio" ? "sand" : "sage"}`}
      >
        <Art kind={a.art} />
        <span>
          <Icon name="arrow" size={18} />
        </span>
      </div>
      <small>
        {a.category} <i>·</i> {a.minutes} MIN READ
      </small>
      <h3>{a.title}</h3>
      <p>{a.summary}</p>
    </Link>
  );
}
export function PageMeta({ title, description, path = "/", noindex = false }) {
  useEffect(() => {
    document.title = `${title} | DEXAM`;
    const meta = (selector, attribute, value) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(
          attribute,
          selector.includes("property")
            ? selector.match(/property="([^"]+)"/)[1]
            : selector.match(/name="([^"]+)"/)[1],
        );
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    meta('meta[name="description"]', "name", description);
    meta('meta[property="og:title"]', "property", `${title} | DEXAM`);
    meta('meta[property="og:description"]', "property", description);
    meta('meta[property="og:url"]', "property", site.origin + path);
    meta(
      'meta[name="robots"]',
      "name",
      noindex ? "noindex,follow" : "index,follow",
    );
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = site.origin + path;
  }, [title, description, path, noindex]);
  return null;
}
