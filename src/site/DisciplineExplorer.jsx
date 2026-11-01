import { useState } from "react";
import { Link } from "react-router-dom";
import { Art } from "./Art.jsx";
import { PageHero, Cta } from "./components.jsx";
import {
  designDisciplines,
  disciplineFamilies,
  disciplineInstitutions,
  matchingDisciplineOffers,
} from "./discipline-data.js";
import {
  OfficialSource,
  GuideReview,
  CollegeGuideLinks,
} from "./CollegeGuides.jsx";
const familyArt = {
  "Objects & mobility": "product",
  "Communication & media": "poster",
  "Digital & experience": "interface",
  "Space & environments": "space",
  "Fashion & materials": "fashion",
  "Strategy & society": "build",
};
const levelLabel = (level) => (level === "Diploma" ? "PG diploma" : level);
export default function DisciplineExplorer() {
  const [search, setSearch] = useState(""),
    [family, setFamily] = useState("All"),
    [level, setLevel] = useState("All"),
    [school, setSchool] = useState("All"),
    [institution, setInstitution] = useState("All");
  const visible = designDisciplines
    .map((d) => ({
      ...d,
      offers: matchingDisciplineOffers(d, {
        search,
        family,
        level,
        school,
        institution,
      }),
    }))
    .filter((d) => d.offers.length);
  return (
    <>
      <PageHero
        eyebrow="DESIGN DISCIPLINES · NID & BEYOND"
        title={
          <>
            Follow your curiosity.
            <br />
            <em>Find your field.</em>
          </>
        }
        description="Explore what different designers work on, then check the programme, study level and campus. Start with a question that interests you."
        art="product"
      >
        <div className="dea-hero-actions">
          <Link className="dea-button" to="/design-degrees">
            Compare degrees & durations
          </Link>
          <Link className="dea-text-link" to="/design-colleges">
            Explore college guides
          </Link>
        </div>
      </PageHero>
      <section
        className="dea-wrap dea-section dea-section-first"
        id="disciplines"
      >
        <GuideReview>
          NID programme and campus information follows the amended 2027–28
          handbooks. College examples link to their official programme pages.
        </GuideReview>
        <div className="dea-guide-callout">
          <Art kind="interface" />
          <div>
            <h2>Different names. Shared directions.</h2>
            <p>
              Explore NID, IITs, Symbiosis, Mumbai-region schools and specialist
              institutes. Related fields sit together, with each college’s exact
              programme name inside the card.
            </p>
            <p>
              A broad degree, a specialisation and a pathway can offer different
              experiences. Compare the qualification, campus and official
              source.
            </p>
            <OfficialSource id="nidIntegrated" />
            <OfficialSource id="nidMasters" />
          </div>
        </div>
        <div className="dea-guide-filter" aria-label="Institution filter">
          {["All", "NID", "NIFT", "IITs", "Symbiosis", "Mumbai region"].map(
            (s) => (
              <button
                type="button"
                key={s}
                aria-pressed={school === s}
                onClick={() => {
                  setSchool(s);
                  setInstitution("All");
                }}
              >
                {s === "All" ? "All examples" : s}
              </button>
            ),
          )}
        </div>
        <div className="dea-guide-tools dea-discipline-tools">
          <label>
            Search disciplines
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="A field, an interest or a college…"
            />
          </label>
          <label>
            College or institute
            <select
              aria-label="College or institute"
              value={institution}
              onChange={(e) => {
                setInstitution(e.target.value);
                setSchool("All");
              }}
            >
              <option value="All">All institutions</option>
              {disciplineInstitutions.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
          <label>
            Design family
            <select
              aria-label="Design family"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
            >
              <option>All</option>
              {disciplineFamilies.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
          <label>
            Study level
            <select
              aria-label="Study level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>All</option>
              {["Undergraduate", "Integrated", "Postgraduate", "Diploma"].map(
                (l) => (
                  <option key={l} value={l}>
                    {levelLabel(l)}
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
        <p className="dea-guide-count" role="status">
          {visible.length} {visible.length === 1 ? "discipline" : "disciplines"}{" "}
          shown
        </p>
        <div className="dea-discipline-grid">
          {visible.map((d) => (
            <article className="dea-discipline-card" key={d.id} id={d.id}>
              <div className="dea-discipline-card-top">
                <Art kind={familyArt[d.family]} />
                <span className="dea-small-label">{d.family}</span>
              </div>
              <div className="dea-guide-tags">
                {[...new Set(d.offers.map((o) => o.level))].map((l) => (
                  <span key={l}>{levelLabel(l)}</span>
                ))}
              </div>
              <h2>{d.name}</h2>
              <p>{d.text}</p>
              <details>
                <summary>
                  Programmes & sources ({d.offers.length}){" "}
                  <span aria-hidden="true">+</span>
                </summary>
                <ul>
                  {d.offers.map((o, i) => (
                    <li key={`${o.institution}-${o.level}-${i}`}>
                      <strong>
                        {o.institution} · {levelLabel(o.level)}
                      </strong>
                      {o.programme && (
                        <span className="dea-discipline-programme">
                          {o.programme}
                        </span>
                      )}
                      <span>{o.campus}</span>
                      {o.note && (
                        <p className="dea-discipline-offer-note">{o.note}</p>
                      )}
                      <OfficialSource id={o.source}>
                        Official programme source
                      </OfficialSource>
                    </li>
                  ))}
                </ul>
              </details>
            </article>
          ))}
        </div>
        {!visible.length && (
          <div className="dea-guide-empty">
            <h2>Try another way in.</h2>
            <p>Search a broader interest or reset your filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFamily("All");
                setLevel("All");
                setSchool("All");
                setInstitution("All");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
        <p className="dea-guide-note">
          Related names are grouped for exploration; curricula and entry rules
          still differ. The IIT undergraduate examples are broad B.Des degrees;
          their M.Des streams are listed separately. BITS offers pathways within
          one B.Des (Hons.). FDDI’s retail examples are BBA/MBA degrees.
          Architecture has a separate professional route. This is a selected,
          source-backed catalogue, rather than every programme in India.
        </p>
      </section>
      <CollegeGuideLinks compact />
      <Cta />
    </>
  );
}
