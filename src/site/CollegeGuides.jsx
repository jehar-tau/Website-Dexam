import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Art, Icon } from "./Art.jsx";
import { PageHero, SectionTitle, ArrowLink, Cta } from "./components.jsx";
import {
  admissionsSources as sources,
  REVIEWED_ON,
} from "./admissions-sources.js";
import {
  designColleges,
  puneDesignColleges,
  scoreAcceptingColleges,
  previousResultSharing,
  architectureRankings,
  puneArchitectureColleges,
  degreeRoutes,
} from "./college-data.js";
import "./guides.css";

export function OfficialSource({ id, children }) {
  const source = sources[id];
  return (
    <a
      className="dea-guide-source"
      href={source.url}
      target="_blank"
      rel="noreferrer"
    >
      {children || source.name}
      <Icon name="arrow" size={14} />
    </a>
  );
}
export function GuideReview({ children }) {
  return (
    <div className="dea-guide-review">
      <span>REVIEWED {REVIEWED_ON.toUpperCase()}</span>
      <p>
        {children ||
          "Admission years and source editions are shown below. Check the official notice before submitting an application."}
      </p>
    </div>
  );
}
const guideLinks = [
  [
    "/design-careers",
    "Find a design discipline",
    "Explore the work, the study level and named programmes.",
    "product",
  ],
  [
    "/design-degrees",
    "Degrees & durations",
    "Compare NID, NIFT, UCEED, CEED and architecture routes.",
    "build",
  ],
  [
    "/design-colleges",
    "20 design colleges in India",
    "Build a shortlist across public and private campuses.",
    "papers",
  ],
  [
    "/design-colleges/pune",
    "Design colleges in Pune",
    "Explore Pune, PCMC and nearby campus locations.",
    "map",
  ],
  [
    "/design-colleges/uceed-nid",
    "Where your score can travel",
    "Read verified UCEED/NID score policies and their conditions.",
    "target",
  ],
  [
    "/architecture-colleges",
    "Architecture colleges in India",
    "Read the NIRF 2025 top 20 with admission-route guidance.",
    "space",
  ],
  [
    "/architecture-colleges/pune",
    "5 architecture colleges in Pune",
    "A local shortlist, with ownership and source notes.",
    "space",
  ],
];
export function CollegeGuideLinks({ compact = false }) {
  const { pathname } = useLocation();
  const related = guideLinks.filter(
    ([to]) => to !== pathname.replace(/\/$/, ""),
  );
  const links = compact
    ? related.filter(([to]) => to !== "/design-careers").slice(0, 3)
    : related;
  return (
    <section className="dea-wrap dea-section dea-guide-links">
      <SectionTitle
        eyebrow="MAKE A MORE INFORMED CHOICE"
        title={
          <>
            Find your field.
            <br />
            <em>Then find your place.</em>
          </>
        }
      />
      <div className="dea-guide-link-grid">
        {links.map(([to, title, text, art]) => (
          <Link to={to} key={to}>
            <Art kind={art} />
            <h3>{title}</h3>
            <p>{text}</p>
            <span>
              Explore the guide <Icon name="arrow" size={15} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
function CollegeDirectory({ items, noun = "colleges" }) {
  const [search, setSearch] = useState(""),
    [sector, setSector] = useState("All");
  const visible = items.filter(
    (c) =>
      (sector === "All" || c.sector.startsWith(sector)) &&
      `${c.name} ${c.location} ${c.programme} ${c.route}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="dea-guide-tools">
        <label>
          Search {noun}
          <input
            type="search"
            value={search}
            placeholder="A college, city or entrance route…"
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <label>
          Institution type
          <select aria-label="Institution type" value={sector} onChange={(e) => setSector(e.target.value)}>
            <option>All</option>
            {[
              ...new Set(
                items.map((c) =>
                  c.sector.startsWith("Public")
                    ? "Public"
                    : c.sector.startsWith("Government-aided")
                      ? "Government-aided"
                      : "Private",
                ),
              ),
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="dea-guide-count" role="status">
        {visible.length} {noun} shown
      </p>
      <div className="dea-college-grid">
        {visible.map((c) => (
          <article className="dea-college-card" key={c.name}>
            <span className="dea-guide-tag">{c.sector}</span>
            <p className="dea-college-location">{c.location}</p>
            <h2>{c.name}</h2>
            <p>{c.note}</p>
            <dl>
              <div>
                <dt>PROGRAMMES</dt>
                <dd>{c.programme}</dd>
              </div>
              <div>
                <dt>ADMISSION ROUTE</dt>
                <dd>{c.route}</dd>
              </div>
            </dl>
            <OfficialSource id={c.source} />
          </article>
        ))}
      </div>
      {!visible.length && (
        <div className="dea-guide-empty">
          <h2>A different search might help.</h2>
          <p>Try a city, programme or college name.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSector("All");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}

export function DesignCollegeDirectory({ pune = false }) {
  return (
    <>
      <PageHero
        eyebrow={
          pune ? "DESIGN COLLEGES · PUNE & PCMC" : "DESIGN COLLEGES · INDIA"
        }
        title={
          pune ? (
            <>
              A design future.
              <br />
              <em>A little closer to home.</em>
            </>
          ) : (
            <>
              20 places to explore.
              <br />
              <em>Your own way to choose.</em>
            </>
          )
        }
        description={
          pune
            ? "Explore ten public and private design options in Pune, PCMC and the surrounding district. Read the campus location as carefully as the college name."
            : "An editorial shortlist of 20 design colleges and campuses in India, spanning NIDs, IITs, NIFTs and private institutions."
        }
        art={pune ? "map" : "papers"}
      />
      <section className="dea-wrap dea-section-first dea-section">
        <GuideReview>
          {pune
            ? "Pune region includes city campuses, PCMC, Alandi, Lavale and Loni Kalbhor. This is an unranked local directory."
            : "Selection considers published design programmes, identifiable admission routes, geographic range and a mix of public and private options. The alphabetical order carries no quality rank."}
        </GuideReview>
        <div className="dea-guide-callout">
          <Art kind={pune ? "map" : "target"} />
          <div>
            <h2>
              {pune
                ? "Yes, there is a public design option."
                : "A useful shortlist starts with your work."}
            </h2>
            <p>
              {pune
                ? "RT-MSSU is government-established and lists Pune design programmes. A private college affiliated to a public university is still a private college. Confirm the specific campus and programme."
                : "Compare student projects, studios, course structure, the exact award and the complete admission process. This selection covers undergraduate and integrated pathways; it is not a national league table."}
            </p>
            {pune && <OfficialSource id="mssu" />}
          </div>
        </div>
        <CollegeDirectory
          key={pune ? "pune" : "india"}
          items={pune ? puneDesignColleges : designColleges}
        />
      </section>
      <CollegeGuideLinks />
      <Cta />
    </>
  );
}

export function ScoreRoutes() {
  const [exam, setExam] = useState("All");
  const items = scoreAcceptingColleges.filter(
    (c) => exam === "All" || c.exams.includes(exam),
  );
  return (
    <>
      <PageHero
        eyebrow="UCEED & NID · PRIVATE COLLEGE ROUTES"
        title={
          <>
            One score.
            <br />
            <em>More doors to explore.</em>
          </>
        }
        description="Some private colleges consider national design-test scores. Read the admission year, the accepted test and any extra selection stages before you apply."
        art="target"
      />
      <section className="dea-wrap dea-section dea-section-first">
        <GuideReview />
        <div className="dea-guide-callout">
          <Art kind="papers" />
          <div>
            <h2>Three different steps to keep in view.</h2>
            <p>
              Register for the entrance exam. Apply separately to your chosen
              college. Complete that college’s portfolio, interview or other
              requirements. IIT/IIITDM joint allocation and a private college’s
              score policy are separate admission processes.
            </p>
            <OfficialSource id="uceedBrochure" />
          </div>
        </div>
        <div className="dea-guide-filter" aria-label="Accepted score filter">
          {["All", "UCEED", "NID DAT"].map((e) => (
            <button
              key={e}
              type="button"
              aria-pressed={exam === e}
              onClick={() => setExam(e)}
            >
              {e}
            </button>
          ))}
        </div>
        <p className="dea-guide-count" role="status">
          {items.length} published policies shown
        </p>
        <div className="dea-score-grid">
          {items.map((c) => (
            <article className="dea-college-card" key={c.name}>
              <span className="dea-guide-tag">{c.cycle}</span>
              <p className="dea-college-location">{c.location}</p>
              <h2>{c.name}</h2>
              <div className="dea-guide-tags">
                {c.exams.map((e) => (
                  <span key={e}>{e}</span>
                ))}
              </div>
              <p>{c.note}</p>
              <OfficialSource id={c.source} />
            </article>
          ))}
        </div>
        <aside className="dea-guide-clarification">
          <h2>When a policy needs a direct question.</h2>
          <p>
            Anant’s 2027 page mentions ADEPT/UCEED in its process diagram, while
            its note says ADEPT is mandatory and refers to UCEED for
            scholarships. Ask Anant to clarify a test exemption before relying
            on one.
          </p>
          <OfficialSource id="anant" />
        </aside>
        <details className="dea-guide-reference">
          <summary>Earlier result-sharing references · UCEED 2026</summary>
          <p>
            The UCEED 2027 brochure includes a list explicitly headed “Result
            Sharing Institutes (UCEED 2026)”. The following are selected names
            from that historical list. Confirm their current intake policy
            directly.
          </p>
          <ul>
            {previousResultSharing.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <OfficialSource id="uceedBrochure" />
        </details>
      </section>
      <CollegeGuideLinks />
      <Cta />
    </>
  );
}

export function DesignDegrees() {
  return (
    <>
      <PageHero
        eyebrow="DESIGN & ARCHITECTURE · DEGREES & DURATIONS"
        title={
          <>
            Know the route.
            <br />
            <em>See the years ahead.</em>
          </>
        }
        description="Compare undergraduate, integrated and postgraduate programmes. An entrance exam is a route into a programme; each institute sets its degree and admission conditions."
        art="build"
      />
      <section className="dea-wrap dea-section dea-section-first">
        <GuideReview>
          Design admission sources include the 2027–28 NID and NIFT publications
          and UCEED/CEED 2027. Architecture guidance uses the verified NATA 2026
          and JoSAA 2026 sources; check new intake notices.
        </GuideReview>
        <div className="dea-guide-callout" id="nid-integrated">
          <Art kind="build" />
          <div>
            <span className="dea-small-label">NID · 2027–28</span>
            <h2>The 5.5-year pathway is in the handbook.</h2>
            <p>
              NID calls it the Professional Education Master of Design
              (Integrated Pathway), entered after school. The
              Ahmedabad/Gandhinagar/Bengaluru offering lists 15 disciplines
              across five streams. Its specialised 2.5-year M.Des remains a
              separate route.
            </p>
            <p>
              Use each campus’s published award and exit rules when comparing it
              with a B.Des followed by a separate master’s.
            </p>
            <OfficialSource id="nidIntegrated" />
            <OfficialSource id="nidMasters" />
          </div>
        </div>
        <div className="dea-degree-grid">
          {degreeRoutes.map((d) => (
            <article key={d.name} className="dea-degree-card">
              <span className="dea-small-label">{d.name}</span>
              <h2>{d.duration}</h2>
              <h3>{d.award}</h3>
              <p className="dea-degree-entry">{d.entry}</p>
              <p>{d.text}</p>
              <OfficialSource id={d.source} />
            </article>
          ))}
        </div>
        <aside className="dea-guide-clarification">
          <h2>Same field. Different entry level.</h2>
          <p>
            Integrated programmes start after school. A specialised M.Des
            usually requires an eligible prior qualification. NIFT design,
            fashion technology and management awards also have different
            eligibility rules. Confirm your exact programme before choosing an
            exam.
          </p>
          <ArrowLink to="/design-careers">
            Explore disciplines and study levels
          </ArrowLink>
        </aside>
      </section>
      <CollegeGuideLinks />
      <Cta />
    </>
  );
}

export function ArchitectureColleges({ pune = false }) {
  return (
    <>
      <PageHero
        eyebrow={
          pune
            ? "ARCHITECTURE · PUNE & PCMC"
            : "ARCHITECTURE & PLANNING · NIRF 2025"
        }
        title={
          pune ? (
            <>
              Five local possibilities.
              <br />
              <em>A place to build from.</em>
            </>
          ) : (
            <>
              20 architecture colleges.
              <br />
              <em>Read the route, too.</em>
            </>
          )
        }
        description={
          pune
            ? "Five architecture colleges to research in Pune and PCMC, with location, ownership and admission-source notes. A local editorial shortlist."
            : "The first 20 institutions in the official NIRF 2025 Architecture and Planning table. The ranking edition and admission route matter when building your shortlist."
        }
        art="space"
      />
      <section className="dea-wrap dea-section dea-section-first">
        <GuideReview>
          {pune
            ? "Selection considers a published B.Arch offering, a Pune/PCMC location and accessible institutional information. The five colleges are unranked; compare studio work, fit and current CoA approval."
            : "Ranks below reproduce the 2025 edition verified for this guide. NIRF evaluates Architecture and Planning at institution level; it does not establish eligibility or allocate B.Arch seats."}
        </GuideReview>
        <div className="dea-guide-callout">
          <Art kind="space" />
          <div>
            <h2>NATA is one architecture route.</h2>
            <p>
              B.Arch is a five-year degree. NATA qualification is followed by
              the relevant state or university application process. IIT
              architecture uses JEE Advanced plus AAT; the NIT/SPA route uses
              JEE Main Paper 2A and the applicable counselling process.
            </p>
            <OfficialSource id="coa" />
            <OfficialSource id="aat" />
            <OfficialSource id="josaa" />
          </div>
        </div>
        {pune ? (
          <>
            <CollegeDirectory items={puneArchitectureColleges} />
            <aside className="dea-guide-clarification">
              <h2>Aided and government-run are different.</h2>
              <p>
                The CET Cell’s published seat matrix classifies BKPS as
                government-aided. An SPPU affiliation or CoA recognition by
                itself does not mean that a college is government-run. Verify
                current approval and your admission category before applying.
              </p>
              <OfficialSource id="bkpsStatus" />
              <OfficialSource id="coaInstitutes" />
            </aside>
          </>
        ) : (
          <>
            <div className="dea-ranking-heading">
              <h2>NIRF 2025 · first 20</h2>
              <OfficialSource id="nirf">
                Read the official rank table
              </OfficialSource>
            </div>
            <div
              className="dea-guide-table-wrap"
              tabIndex="0"
              role="region"
              aria-label="NIRF 2025 architecture ranking table"
            >
              <table className="dea-guide-table">
                <caption>
                  Architecture and Planning · NIRF 2025. Route guidance is
                  separate from the rank.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Institution</th>
                    <th scope="col">City</th>
                    <th scope="col">Admission route to check</th>
                  </tr>
                </thead>
                <tbody>
                  {architectureRankings.map((c) => (
                    <tr key={c.rank}>
                      <td>{c.rank}</td>
                      <th scope="row">{c.name}</th>
                      <td>{c.location}</td>
                      <td>{c.route}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="dea-guide-note">
              The IIT/NIT/SPA route labels refer to established admission
              systems. The other institutions’ current notices determine their
              accepted tests and selection processes. This table does not treat
              every ranked college as a NATA option.
            </p>
            <ArrowLink to="/architecture-colleges/pune">
              Explore five architecture colleges around Pune
            </ArrowLink>
          </>
        )}
      </section>
      <CollegeGuideLinks />
      <Cta />
    </>
  );
}
