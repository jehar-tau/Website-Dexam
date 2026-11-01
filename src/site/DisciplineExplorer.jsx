import { useState } from "react";
import { Link } from "react-router-dom";
import { Art } from "./Art.jsx";
import { PageHero, Cta } from "./components.jsx";
import { designDisciplines, disciplineFamilies } from "./discipline-data.js";
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
    [school, setSchool] = useState("All");
  const visible = designDisciplines.filter(
    (d) =>
      (family === "All" || family === d.family) &&
      d.offers.some((o) =>
        (level === "All" || o.level === level) &&
        (school === "All" || (school === "NID"
            ? o.institution.startsWith("NID")
            : o.institution.includes(school))),
      ) &&
      `${d.name} ${d.family} ${d.text} ${d.offers.map((o) => `${o.institution} ${o.campus} ${o.programme || ""}`).join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
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
            <h2>New directions. Clear entry points.</h2>
            <p>
              The NID handbooks list 15 integrated-pathway disciplines across
              the three NID Ahmedabad campuses and 22 specialised M.Des
              disciplines, with additional regional offerings. Emerging options
              elsewhere include AI-enabled design, immersive media and creative
              computation.
            </p>
            <p>
              Integrated entry follows school; postgraduate entry requires an
              eligible earlier qualification. Open a card to check its sources.
            </p>
            <OfficialSource id="nidIntegrated" />
            <OfficialSource id="nidMasters" />
          </div>
        </div>
        <div className="dea-guide-filter" aria-label="Institution filter">
          {[
            "All",
            "NID",
            "NIFT",
            "MIT Institute of Design",
            "Srishti Manipal",
          ].map((s) => (
            <button
              type="button"
              key={s}
              aria-pressed={school === s}
              onClick={() => setSchool(s)}
            >
              {s === "All" ? "All examples" : s}
            </button>
          ))}
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
            Design family
            <select aria-label="Design family" value={family} onChange={(e) => setFamily(e.target.value)}>
              <option>All</option>
              {disciplineFamilies.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
          <label>
            Study level
            <select aria-label="Study level" value={level} onChange={(e) => setLevel(e.target.value)}>
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
          {visible.length} disciplines shown
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
                  Programmes & sources <span aria-hidden="true">+</span>
                </summary>
                <ul>
                  {d.offers.map((o, i) => (
                    <li key={`${o.institution}-${o.level}-${i}`}>
                      <strong>
                        {o.institution} · {levelLabel(o.level)}
                      </strong>
                      <span>
                        {o.campus}
                        {o.programme ? ` · ${o.programme}` : ""}
                      </span>
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
              }}
            >
              Reset filters
            </button>
          </div>
        )}
        <p className="dea-guide-note">
          Programme names can overlap, while their curriculum and entry
          requirements differ. These are documented examples, rather than every
          programme at every institution. Architecture has a separate
          professional degree route.
        </p>
      </section>
      <CollegeGuideLinks compact />
      <Cta />
    </>
  );
}
