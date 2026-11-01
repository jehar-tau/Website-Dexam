import { useEffect, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { Art, HeroCollage, Icon } from "./Art.jsx";
import {
  PageHero,
  Button,
  ArrowLink,
  Eyebrow,
  SectionTitle,
  Cta,
  Faq,
  ProgrammeCard,
  ExamCard,
  ArticleCard,
} from "./components.jsx";
import {
  site,
  programmes,
  exams,
  disciplines,
  articles,
  faqs,
} from "./content.js";
import { mentors, examPapers, driveDownloadUrl } from "../data.js";
import { useLead } from "../lead-context.jsx";
import { waLink } from "../config.js";
import { submitToGoogleSheet } from "../cms.jsx";
import { CampusPathways } from "./CampusPathways.jsx";
import {
  campaignAttribution,
  emitEnquirySuccess,
  enquiryMeasurement,
  enquiryOptions,
  initialEnquiry,
  validateEnquiry,
} from "./enquiry.js";

export function Home() {
  return (
    <>
      <section className="dea-home-hero dea-wrap">
        <div className="dea-home-copy">
          <Eyebrow>DESIGN ENTRANCE PREPARATION · PUNE</Eyebrow>
          <h1>
            For the ones
            <br />
            who see things
            <br />
            <em>differently.</em>
          </h1>
          <p>
            Curious minds become thoughtful designers.
            <br />
            Let’s turn the way you see into the things you make.
          </p>
          <div className="dea-hero-actions">
            <Button to="/courses" orange>
              Find your starting point
            </Button>
            <ArrowLink to="/quiz">Try your design instinct</ArrowLink>
          </div>
          <div className="dea-hero-reassurance">
            <span>Learn with designers</span>
            <i />
            <span>Build through practice</span>
          </div>
        </div>
        <HeroCollage />
      </section>
      <div className="dea-exam-ribbon">
        <div className="dea-wrap">
          <span>YOUR NEXT POSSIBILITY</span>
          {exams.map((e) => (
            <Link key={e.id} to={`/exams/${e.id}`}>
              {e.name}
              <small>{e.degree}</small>
            </Link>
          ))}
        </div>
      </div>
      <CampusPathways />
      <section className="dea-wrap dea-section">
        <SectionTitle
          eyebrow="A DIFFERENT KIND OF PREPARATION"
          title={
            <>
              Less theory.
              <br className="dea-mobile-break" /> More <em>discovery.</em>
            </>
          }
          to="/about"
          link="Inside the DEXAM approach"
        />
        <div className="dea-discovery-grid">
          {[
            [
              "01",
              "Look a little closer.",
              "Train your eye to notice the extraordinary in everyday things.",
              "geometry",
              "/quiz",
            ],
            [
              "02",
              "Make a little mess.",
              "Sketch, question, build and find out what your ideas can become.",
              "sketch",
              "/resources/build-a-design-practice",
            ],
            [
              "03",
              "Find your own way.",
              "Get thoughtful feedback that helps you see your next step.",
              "curve",
              "/about",
            ],
          ].map(([n, title, text, art, to]) => (
            <Link key={n} to={to} className="dea-discovery-card">
              <div>
                <Art kind={art} />
                <span>{n}</span>
                <i>
                  <Icon name="arrow" size={18} />
                </i>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="dea-fit-band">
        <div className="dea-wrap">
          <div className="dea-fit-art">
            <Art kind="poster" />
            <span className="dea-fit-stamp">
              TRUST
              <br />
              YOUR EYE.<i>✳</i>
            </span>
          </div>
          <div className="dea-fit-copy">
            <Eyebrow>A LITTLE SELF-DISCOVERY</Eyebrow>
            <h2>
              Have an eye
              <br />
              for <em>design?</em>
            </h2>
            <p>
              Move shapes. Match colours. Make space.
              <br />
              30 hands-on experiments to explore your creative instinct.
            </p>
            <div className="dea-fit-facts">
              <span>
                <b>30</b> visual challenges
              </span>
              <span>
                <b>9</b> abilities to explore
              </span>
              <span>
                <b>₹0</b> instant score
              </span>
            </div>
            <Button to="/quiz">Find my design instinct</Button>
            <small>No drawing skills needed. Just curiosity.</small>
          </div>
        </div>
      </section>
      <section className="dea-wrap dea-section">
        <SectionTitle
          eyebrow="YOUR PACE. YOUR PATH."
          title={
            <>
              A little direction.
              <br />A world of <em>possibility.</em>
            </>
          }
          to="/courses"
          link="Compare the programmes"
        />
        <div className="dea-programme-grid">
          {programmes.map((p, i) => (
            <ProgrammeCard key={p.id} programme={p} index={i} />
          ))}
        </div>
        <p className="dea-fee-note">
          Programme fees shown as confirmed. Ask us about current batches,
          applicable taxes, payment options and enrolment terms.
        </p>
      </section>
      <section className="dea-disciplines-section dea-wrap">
        <SectionTitle
          eyebrow="WHAT COULD YOU DESIGN?"
          title={
            <>
              There’s more than
              <br />
              one way to be <em>creative.</em>
            </>
          }
          to="/design-careers"
          link="Explore the design world"
        />
        <div className="dea-discipline-strip">
          {disciplines.slice(0, 4).map((d) => (
            <Link key={d.id} to={`/design-careers#${d.id}`}>
              <Art kind={d.art} />
              <span>
                {d.name}
                <Icon name="arrow" size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="dea-studio-band">
        <div className="dea-wrap">
          <div>
            <Eyebrow>A STUDIO. A CONVERSATION. A NEW WAY OF SEEING.</Eyebrow>
            <h2>
              Taught by designers.
              <br />
              <em>Built around you.</em>
            </h2>
            <p>
              At our Pune studio, drawing meets thinking. Ideas meet feedback.
              And a small question can turn into a much bigger possibility.
            </p>
            <div className="dea-studio-links">
              <ArrowLink to="/about">Meet your mentors</ArrowLink>
              <ArrowLink to="/design-coaching-pune">
                Find our Pune studio
              </ArrowLink>
            </div>
          </div>
          <Art kind="space" />
        </div>
      </section>
      <section className="dea-wrap dea-section">
        <SectionTitle
          eyebrow="FIELD NOTES FOR CURIOUS MINDS"
          title={
            <>
              A little reading.
              <br />A lot to <em>think about.</em>
            </>
          }
          to="/resources"
          link="All free resources"
        />
        <div className="dea-article-grid">
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
      <Faq items={faqs.slice(0, 4)} />
      <Cta />
    </>
  );
}

export function Courses() {
  return (
    <>
      <PageHero
        eyebrow="OUR PROGRAMMES"
        title={
          <>
            Make room for
            <br />
            your <em>creative future.</em>
          </>
        }
        description="Two clear paths. The same thoughtful foundation. Choose a timeline that gives your ideas room to grow."
        art="build"
      />
      <section className="dea-wrap dea-section dea-section-first">
        <div className="dea-programme-grid">
          {programmes.map((p, i) => (
            <ProgrammeCard key={p.id} programme={p} index={i} />
          ))}
        </div>
        <p className="dea-fee-note">
          Programme fees shown as confirmed. Applicable taxes, instalments,
          batch schedules and enrolment terms are confirmed during counselling.
        </p>
      </section>
      <section className="dea-wrap dea-section">
        <SectionTitle
          eyebrow="HOW THE LEARNING UNFOLDS"
          title={
            <>
              First, a foundation.
              <br />
              Then, your <em>direction.</em>
            </>
          }
        />
        <div className="dea-process-grid">
          {[
            [
              "01",
              "Learn to see.",
              "Observe, draw, question and find visual relationships.",
            ],
            [
              "02",
              "Learn to think.",
              "Explore alternatives, constraints and the people behind a problem.",
            ],
            [
              "03",
              "Learn to make.",
              "Turn ideas into sketches, compositions, models and clear stories.",
            ],
            [
              "04",
              "Bring it to the exam.",
              "Practise your chosen route, review the gaps and refine your approach.",
            ],
          ].map(([n, title, text]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="dea-wrap dea-additional">
        <SectionTitle
          eyebrow="MORE WAYS TO LEARN · IN PREPARATION"
          title={
            <>
              A focused next step,
              <br />
              when you <em>need it.</em>
            </>
          }
        />
        <div>
          {[
            [
              "Test series & mock tests",
              "Timed practice, review and an All-India test-series experience.",
              "papers",
              "/mock-tests",
            ],
            [
              "Portfolio & studio guidance",
              "A clearer process for developing, presenting and discussing your work.",
              "portfolio",
              "/resources/portfolio-that-shows-thinking",
            ],
          ].map(([title, text, art, to]) => (
            <article key={title}>
              <Art kind={art} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
                <ArrowLink to={to}>Explore the next step</ArrowLink>
              </div>
            </article>
          ))}
        </div>
        <p className="dea-fee-note">
          Separate product availability, fees and access periods will be
          confirmed before enrolment.
        </p>
      </section>
      <Faq items={[faqs[0], faqs[1], faqs[4]]} />
      <Cta />
    </>
  );
}

export function Exams() {
  return (
    <>
      <PageHero
        eyebrow="EXPLORE THE EXAMS"
        title={
          <>
            Different doors.
            <br />
            Your own <em>way in.</em>
          </>
        }
        description="Start with the kind of work you want to do. Then understand the exam, the programme and the preparation that connects them."
        art="geometry"
      />
      <section className="dea-wrap dea-section dea-section-first">
        <div className="dea-exam-grid">
          {exams.map((e) => (
            <ExamCard key={e.id} exam={e} />
          ))}
        </div>
      </section>
      <section className="dea-wrap dea-note-panel">
        <Icon name="spark" size={25} />
        <div>
          <h2>Choose a direction before chasing a deadline.</h2>
          <p>
            Eligibility to take an exam and eligibility for a particular
            institute can differ. Each guide links to the official source for
            current rules, stages and dates.
          </p>
          <ArrowLink to="/guide">Read the student &amp; parent guide</ArrowLink>
        </div>
      </section>
      <Cta />
    </>
  );
}

export function ExamGuide() {
  const { examId } = useParams(),
    exam = exams.find((e) => e.id === examId);
  if (!exam) return <Navigate to="/exams" replace />;
  return (
    <>
      <PageHero
        eyebrow={`${exam.name} PREPARATION`}
        title={
          <>
            {exam.name}.<br />
            <em>{exam.subtitle}</em>
          </>
        }
        description={exam.intro}
        art={exam.art}
        breadcrumbs={[["Exams", "/exams"], [exam.name]]}
      >
        <div className="dea-hero-actions">
          <Button to={`/papers/${exam.id}`}>Explore past papers</Button>
          <ArrowLink to="/contact">Discuss your exam path</ArrowLink>
        </div>
      </PageHero>
      <section className="dea-wrap dea-exam-details">
        <aside>
          <span className="dea-small-label">THE FOCUS</span>
          <h2>{exam.focus}</h2>
          <div className="dea-tags">
            {exam.skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <a
            href={exam.source}
            target="_blank"
            rel="noreferrer"
            className="dea-source-link"
          >
            Current official information <Icon name="arrow" size={15} />
            <small>{exam.sourceName}</small>
          </a>
        </aside>
        <div>
          <Eyebrow>A PREPARATION MINDSET</Eyebrow>
          <h2>
            Practise the thinking.
            <br />
            <em>Not just the answer.</em>
          </h2>
          {exam.steps.map((s, i) => (
            <div className="dea-numbered-step" key={s}>
              <span>0{i + 1}</span>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="dea-wrap dea-exercise">
        <div>
          <Eyebrow>TRY A LITTLE DESIGN THINKING</Eyebrow>
          <h2>
            One brief.
            <br />
            <em>Many possibilities.</em>
          </h2>
          <p>{exam.practice}</p>
          <ArrowLink to="/quiz">Try the interactive assessment</ArrowLink>
        </div>
        <Art kind={exam.art} />
      </section>
      <section className="dea-wrap dea-section">
        <SectionTitle
          eyebrow="KEEP EXPLORING"
          title={
            <>
              Build your <em>next session.</em>
            </>
          }
        />
        <div className="dea-three-links">
          <Link to={`/papers/${exam.id}`}>
            <Icon name="download" />
            <h3>Past papers</h3>
            <p>Understand the questions. Then review your response.</p>
          </Link>
          <Link to="/resources/review-a-previous-year-paper">
            <Icon name="edit" />
            <h3>Practise with purpose</h3>
            <p>A simple method for getting more from each attempt.</p>
          </Link>
          <Link to="/courses">
            <Icon name="spark" />
            <h3>A guided programme</h3>
            <p>Bring the fundamentals into a consistent preparation plan.</p>
          </Link>
        </div>
      </section>
      <Cta />
    </>
  );
}

export function Careers() {
  return (
    <>
      <PageHero
        eyebrow="THE WORLD OF DESIGN"
        title={
          <>
            What if curiosity
            <br />
            became your <em>craft?</em>
          </>
        }
        description="Design has many forms. Explore the questions different designers ask—and try a small experiment of your own."
        art="product"
      />
      <section className="dea-wrap dea-career-list">
        {disciplines.map((d, i) => (
          <article id={d.id} key={d.id}>
            <div
              className={`dea-career-art tone-${["sage", "peach", "sand", "pink", "blue"][i]}`}
            >
              <Art kind={d.art} />
            </div>
            <div>
              <span className="dea-small-label">
                0{i + 1} / {d.name.toUpperCase()}
              </span>
              <h2>{d.question}</h2>
              <p>{d.text}</p>
              <div className="dea-small-exercise">
                <b>TRY THIS</b>
                <p>{d.exercise}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="dea-wrap dea-note-panel">
        <Icon name="heart" size={27} />
        <div>
          <h2>You don’t need a label to start exploring.</h2>
          <p>
            Notice the work you enjoy returning to, the problems you like
            solving and how you respond to feedback. An assessment can be a
            useful starting point for a conversation.
          </p>
          <ArrowLink to="/quiz">Explore your design instinct</ArrowLink>
        </div>
      </section>
      <Cta />
    </>
  );
}

export function Resources() {
  const [search, setSearch] = useState(""),
    [filter, setFilter] = useState("All");
  const matches = (text) => text.toLowerCase().includes(search.toLowerCase());
  return (
    <>
      <PageHero
        eyebrow="THE FREE RESOURCE LIBRARY"
        title={
          <>
            Feed your curiosity.
            <br />
            <em>Find your next question.</em>
          </>
        }
        description="Previous year papers, practice notes and thoughtful starting points for your design journey."
        art="papers"
      />
      <section className="dea-wrap dea-resource-library">
        <div className="dea-resource-tools">
          <div className="dea-filter-tabs">
            {["All", "Papers", "Design notes", "Interactive"].map((f) => (
              <button
                className={filter === f ? "active" : ""}
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="dea-search">
            <span>Search resources</span>
            <input
              aria-label="Search resources"
              placeholder="A topic, an exam, a question…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span aria-hidden="true">⌕</span>
          </label>
        </div>
        {(filter === "All" || filter === "Interactive") &&
          matches(
            "design instinct interactive assessment test colour shapes",
          ) && (
            <Link to="/quiz" className="dea-resource-feature">
              <div>
                <Eyebrow>LESS READING. MORE DOING.</Eyebrow>
                <h2>
                  Test your
                  <br />
                  <em>design instinct.</em>
                </h2>
                <p>30 visual experiments. A new perspective on how you see.</p>
                <span className="dea-text-link">
                  Step into the playground <Icon name="arrow" size={18} />
                </span>
              </div>
              <Art kind="geometry" />
            </Link>
          )}
        {(filter === "All" || filter === "Papers") && (
          <>
            <SectionTitle
              eyebrow="A LITTLE EXAM FAMILIARITY"
              title={
                <>
                  Meet the <em>past papers.</em>
                </>
              }
              to="/papers"
              link="Browse the paper archive"
            />
            <div className="dea-paper-mini-grid">
              {exams
                .filter((e) => matches(e.name + " " + e.degree + " papers"))
                .map((e) => (
                  <Link key={e.id} to={`/papers/${e.id}`}>
                    <span>{e.name}</span>
                    <small>
                      {examPapers[e.id]?.length || 0} papers &amp; samples
                    </small>
                    <Icon name="arrow" size={16} />
                  </Link>
                ))}
            </div>
          </>
        )}
        {(filter === "All" || filter === "Design notes") && (
          <>
            <SectionTitle
              eyebrow="FIELD NOTES"
              title={
                <>
                  Small reads.
                  <br />
                  <em>Useful perspectives.</em>
                </>
              }
            />
            <div className="dea-article-grid">
              {articles
                .filter((a) =>
                  matches([a.title, a.summary, a.category, a.slug].join(" ")),
                )
                .map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
            </div>
          </>
        )}
        {search &&
          filter === "Design notes" &&
          !articles.some((a) =>
            matches([a.title, a.summary, a.category, a.slug].join(" ")),
          ) && (
            <p className="dea-empty">
              No notes found. Try “drawing”, “practice” or “portfolio”.
            </p>
          )}
      </section>
      <Cta />
    </>
  );
}

export function Article() {
  const { slug } = useParams(),
    a = articles.find((a) => a.slug === slug);
  if (!a) return <NotFound />;
  return (
    <>
      <PageHero
        eyebrow={a.category}
        title={a.title}
        description={a.summary}
        art={a.art}
        breadcrumbs={[["Resources", "/resources"], [a.title]]}
      >
        <span className="dea-reading-time">
          {a.minutes} MIN READ · DEXAM PRACTICE NOTES
        </span>
      </PageHero>
      <article className="dea-wrap dea-editorial">
        <aside>
          <span className="dea-small-label">IN THIS NOTE</span>
          {a.sections.map(([title], i) => (
            <a key={title} href={`#note-${i}`}>
              0{i + 1} {title}
            </a>
          ))}
          <ArrowLink to="/quiz">Try your design instinct</ArrowLink>
        </aside>
        <div>
          {a.sections.map(([title, text], i) => (
            <section key={title} id={`note-${i}`}>
              <span>0{i + 1}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
          <div className="dea-editorial-end">
            <Icon name="spark" size={25} />
            <p>
              The most useful next step is usually a small experiment.
              <br />
              <b>Make something. Then look at it again.</b>
            </p>
          </div>
        </div>
      </article>
      <section className="dea-wrap dea-section">
        <SectionTitle
          eyebrow="KEEP A QUESTION OPEN"
          title={
            <>
              A little more <em>perspective.</em>
            </>
          }
        />
        <div className="dea-article-grid">
          {a.related.map((s) => (
            <ArticleCard key={s} article={articles.find((b) => b.slug === s)} />
          ))}
        </div>
      </section>
      <Cta />
    </>
  );
}

export function Papers() {
  return (
    <>
      <PageHero
        eyebrow="THE PAPER ARCHIVE"
        title={
          <>
            Get to know
            <br />
            <em>the questions.</em>
          </>
        }
        description="Previous year papers and samples for NID DAT, UCEED, NIFT, NATA and CEED. Attempt, reflect and make your next session more useful."
        art="papers"
      />
      <section className="dea-wrap dea-section dea-section-first">
        <div className="dea-paper-grid">
          {exams.map((e) => (
            <Link
              key={e.id}
              to={`/papers/${e.id}`}
              className={`dea-paper-card tone-${e.color}`}
            >
              <Art kind={e.art} />
              <div>
                <span className="dea-small-label">
                  {examPapers[e.id]?.length || 0} PAPERS &amp; SAMPLES
                </span>
                <h2>{e.name}</h2>
                <p>{e.focus}</p>
                <span className="dea-text-link">
                  Open the archive <Icon name="arrow" size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="dea-wrap dea-note-panel">
        <Icon name="edit" size={26} />
        <div>
          <h2>The review is where the learning happens.</h2>
          <p>
            Give every timed attempt a little time for reflection. Name the
            mistake, rebuild one answer, and choose one thing to practise next.
          </p>
          <ArrowLink to="/resources/review-a-previous-year-paper">
            A better way to review a paper
          </ArrowLink>
        </div>
      </section>
      <Cta />
    </>
  );
}

export function PaperArchive() {
  const { examId } = useParams(),
    e = exams.find((e) => e.id === examId),
    lead = useLead(),
    [search, setSearch] = useState("");
  if (!e) return <Navigate to="/papers" replace />;
  const papers = (examPapers[e.id] || []).filter((p) =>
    p.label.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHero
        eyebrow={`${e.name} PAPER ARCHIVE`}
        title={
          <>
            {e.name}.<br />
            <em>A little familiarity.</em>
          </>
        }
        description="Explore the available papers and samples. Follow the instructions on each paper, and leave time to review your decisions."
        art="papers"
        breadcrumbs={[
          ["Resources", "/resources"],
          ["Papers", "/papers"],
          [e.name],
        ]}
      />
      <section className="dea-wrap dea-archive-layout">
        <div>
          <div className="dea-archive-heading">
            <h2>Choose your paper.</h2>
            <input
              aria-label="Find a paper by year"
              placeholder="Find a year or sample…"
              value={search}
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </div>
          <div className="dea-paper-table">
            {papers.map((p) => (
              <div className="dea-paper-row" key={p.id}>
                <span className="dea-file-icon">
                  <Icon name="download" size={19} />
                </span>
                <div>
                  <strong>{p.label}</strong>
                  <span>{e.name} · PDF resource</span>
                </div>
                {lead.isUnlocked(p.id) ? (
                  <div className="dea-paper-actions">
                    {p.keyFileId && (
                      <a
                        href={driveDownloadUrl(p.keyFileId)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Answer key
                      </a>
                    )}
                    <button
                      className="dea-button"
                      onClick={() => lead.openDownload(e.id, p)}
                    >
                      Download <Icon name="download" size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    className="dea-unlock-button"
                    onClick={() => lead.openUnlock(e.id, p)}
                  >
                    Get paper <Icon name="arrow" size={15} />
                  </button>
                )}
              </div>
            ))}
            {!papers.length && (
              <p className="dea-empty">
                No papers match that search. Try a different year.
              </p>
            )}
          </div>
          <p className="dea-fee-note">
            One short form unlocks the available downloads on this device. Paper
            labels distinguish year papers from samples; formats can change.
          </p>
        </div>
        <aside className="dea-archive-aside">
          <Art kind={e.art} />
          <h3>
            Understand the exam.
            <br />
            Then practise it.
          </h3>
          <p>
            Explore the skills behind {e.name} and check the current official
            requirements.
          </p>
          <ArrowLink to={`/exams/${e.id}`}>Read the exam guide</ArrowLink>
          <a
            className="dea-source-link"
            href={e.source}
            target="_blank"
            rel="noreferrer"
          >
            Official source <Icon name="arrow" size={14} />
          </a>
        </aside>
      </section>
      <Cta />
    </>
  );
}

export function About() {
  return (
    <>
      <PageHero
        eyebrow="A DIFFERENT KIND OF DESIGN ACADEMY"
        title={
          <>
            A place for
            <br />
            <em>curious minds.</em>
          </>
        }
        description="We believe preparation becomes more meaningful when students learn to observe, question and make. DEXAM brings that thinking into design entrance coaching in Pune."
        art="space"
      />
      <section className="dea-wrap dea-about-manifesto">
        <span>OUR POINT OF VIEW</span>
        <h2>
          Drawing is a skill.
          <br />
          Thinking is a practice.
          <br />
          <em>Curiosity is a good beginning.</em>
        </h2>
        <p>
          A beautifully drawn answer is only the beginning. We help students
          notice the problem, explore the possibilities and communicate a
          decision. The work becomes clearer through doing—and through
          thoughtful feedback.
        </p>
      </section>
      <section className="dea-wrap dea-section">
        <SectionTitle
          eyebrow="THE PEOPLE IN YOUR CORNER"
          title={
            <>
              Designers first.
              <br />
              <em>Mentors, always.</em>
            </>
          }
        />
        <div className="dea-mentor-grid">
          {mentors.map((m, i) => (
            <article key={m.name}>
              <div className={`dea-mentor-visual mentor-${i}`}>
                <Art kind={["product", "portfolio", "poster"][i]} />
                <span>
                  {m.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </span>
              </div>
              <h3>{m.name}</h3>
              <small>{m.creds}</small>
              <p>{m.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="dea-wrap dea-section">
        <SectionTitle
          eyebrow="THE DEXAM LOOP"
          title={
            <>
              Try. Review.
              <br />
              <em>See it differently.</em>
            </>
          }
        />
        <div className="dea-process-grid">
          {[
            [
              "01",
              "Observe.",
              "Notice the details and the context around a problem.",
            ],
            [
              "02",
              "Explore.",
              "Sketch alternatives. Test an assumption. Ask another question.",
            ],
            [
              "03",
              "Make.",
              "Turn your idea into something another person can understand.",
            ],
            [
              "04",
              "Reflect.",
              "Use specific feedback to make a better next attempt.",
            ],
          ].map(([n, h, p]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <Cta />
    </>
  );
}

export function Guide() {
  return (
    <>
      <PageHero
        eyebrow="FOR STUDENTS & PARENTS"
        title={
          <>
            Big possibilities.
            <br />
            <em>Small, sensible steps.</em>
          </>
        }
        description="You don’t have to know the whole route before starting. Begin with interests, explore the options, and make the next decision with a little more clarity."
        art="build"
      />
      <section className="dea-wrap dea-guide-paths">
        {[
          [
            "Still exploring?",
            "Start with the work, not the college name.",
            "Try a few design disciplines, a short visual assessment and some small projects. Notice what you enjoy returning to.",
            "Explore the design world",
            "/design-careers",
            "geometry",
          ],
          [
            "Choosing an exam?",
            "Connect the discipline with the degree.",
            "Compare the kind of work, programme level, current eligibility and selection process. Then build a preparation plan.",
            "Understand the exam routes",
            "/exams",
            "papers",
          ],
          [
            "Ready for structure?",
            "Choose a timeline you can sustain.",
            "Look at school commitments, your current foundation and the entrance cycle you are targeting. Discuss the trade-offs together.",
            "Compare our programmes",
            "/courses",
            "target",
          ],
        ].map(([tag, h, p, label, to, art]) => (
          <article key={tag}>
            <Art kind={art} />
            <div>
              <Eyebrow>{tag}</Eyebrow>
              <h2>{h}</h2>
              <p>{p}</p>
              <ArrowLink to={to}>{label}</ArrowLink>
            </div>
          </article>
        ))}
      </section>
      <section className="dea-wrap dea-guide-comparison">
        <SectionTitle
          eyebrow="A QUICK ORIENTATION"
          title={
            <>
              Know which door
              <br />
              <em>you’re opening.</em>
            </>
          }
        />
        <div className="dea-comparison-scroll">
          <table>
            <caption>Design and architecture exam routes</caption>
            <thead>
              <tr>
                <th>Route</th>
                <th>Direction</th>
                <th>A useful question to ask</th>
                <th>Explore</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((e) => (
                <tr key={e.id}>
                  <th scope="row">{e.name}</th>
                  <td>{e.degree}</td>
                  <td>{e.subtitle}</td>
                  <td>
                    <Link to={`/exams/${e.id}`}>
                      Read guide <Icon name="arrow" size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="dea-fee-note">
          Programme and institute requirements vary. Follow the official links
          in each guide for current eligibility and selection rules.
        </p>
      </section>
      <Faq items={faqs} />
      <Cta />
    </>
  );
}

export function Pune() {
  return (
    <>
      <PageHero
        eyebrow="DESIGN ENTRANCE COACHING IN PUNE"
        title={
          <>
            A creative corner
            <br />
            <em>in Amanora.</em>
          </>
        }
        description="Come with an interest, a sketchbook or a question. Explore design entrance preparation with DEXAM in Amanora Park Town, Pune."
        art="map"
      />
      <section className="dea-wrap dea-location-grid">
        <div>
          <Eyebrow>COME SAY HELLO</Eyebrow>
          <h2>
            Make space for
            <br />
            <em>a studio visit.</em>
          </h2>
          <p>{site.address}</p>
          <p>
            Next to Wisdom World School. Contact us to arrange a visit and
            confirm current batch timings before travelling.
          </p>
          <div className="dea-hero-actions">
            <Button to="/contact" orange>
              Plan a conversation
            </Button>
            <a
              href={site.maps}
              className="dea-text-link"
              target="_blank"
              rel="noreferrer"
            >
              Open directions <Icon name="arrow" size={17} />
            </a>
          </div>
        </div>
        <div className="dea-location-card">
          <Art kind="space" />
          <span>AMANORA · HADAPSAR · PUNE</span>
        </div>
      </section>
      <section className="dea-wrap dea-section">
        <SectionTitle
          eyebrow="A CONVERSATION WORTH HAVING"
          title={
            <>
              Bring your questions.
              <br />
              <em>Leave with a next step.</em>
            </>
          }
        />
        <div className="dea-three-links">
          <article>
            <h3>Your interests</h3>
            <p>What you like noticing, making and figuring out.</p>
          </article>
          <article>
            <h3>Your timeline</h3>
            <p>
              School, the entrance cycle and a sustainable practice routine.
            </p>
          </article>
          <article>
            <h3>Your exam path</h3>
            <p>
              The programme level, the skills and the official requirements.
            </p>
          </article>
        </div>
      </section>
      <Cta />
    </>
  );
}

export function MockTests() {
  return (
    <>
      <PageHero
        eyebrow="MOCK TESTS & TEST SERIES"
        title={
          <>
            Practice that leads
            <br />
            to a new <em>perspective.</em>
          </>
        }
        description="A dedicated mock-test and All-India test-series experience is in preparation. Start exploring your visual thinking and build a better paper-review routine today."
        art="practice"
      />
      <section className="dea-wrap dea-feature-pair">
        <Link to="/quiz">
          <Art kind="geometry" />
          <span className="dea-small-label">AVAILABLE NOW · FREE</span>
          <h2>
            Your design instinct,
            <br />
            <em>in action.</em>
          </h2>
          <p>
            30 hands-on challenges in colour, composition, space and visual
            thinking.
          </p>
          <span className="dea-text-link">
            Start exploring <Icon name="arrow" size={16} />
          </span>
        </Link>
        <Link to="/papers">
          <Art kind="papers" />
          <span className="dea-small-label">THE PAPER ARCHIVE</span>
          <h2>
            A little closer
            <br />
            <em>to the exam.</em>
          </h2>
          <p>
            Explore previous year papers, samples and a more useful way to
            review your work.
          </p>
          <span className="dea-text-link">
            Browse the papers <Icon name="arrow" size={16} />
          </span>
        </Link>
      </section>
      <section className="dea-wrap dea-note-panel">
        <Icon name="lock" size={25} />
        <div>
          <h2>A dedicated practice space is coming together.</h2>
          <p>
            Separate test-series dates, fees, access periods and release details
            will be shared once confirmed. Ask the team about current
            availability.
          </p>
          <ArrowLink to="/contact?interest=test-series">
            Ask about the test series
          </ArrowLink>
        </div>
      </section>
      <Cta />
    </>
  );
}

export function Results() {
  return (
    <>
      <PageHero
        eyebrow="PROGRESS & STUDENT WORK"
        title={
          <>
            Look for the growth.
            <br />
            <em>Not just the grade.</em>
          </>
        }
        description="The clearest evidence of learning is often a better question, a clearer sketch or a more thoughtful decision. Here is how to look at your own progress."
        art="portfolio"
      />
      <section className="dea-wrap dea-section dea-section-first">
        <div className="dea-process-grid">
          {[
            [
              "01",
              "A sharper eye.",
              "You notice proportions, relationships and details you used to miss.",
            ],
            [
              "02",
              "More possibilities.",
              "You explore alternatives before committing to a first idea.",
            ],
            [
              "03",
              "Clearer communication.",
              "Another person can understand the purpose and logic of your work.",
            ],
            [
              "04",
              "Better next attempts.",
              "Feedback becomes a specific decision in the next version.",
            ],
          ].map(([n, h, p]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="dea-wrap dea-note-panel">
        <Icon name="heart" size={25} />
        <div>
          <h2>Student work deserves its own story.</h2>
          <p>
            Published projects and outcomes need the student’s permission and
            the context behind the work. Ask us during counselling about the
            review process and how progress is discussed with students and
            parents.
          </p>
          <ArrowLink to="/contact">Talk about the learning process</ArrowLink>
        </div>
      </section>
      <Cta />
    </>
  );
}

export function StudentAccess() {
  return (
    <>
      <PageHero
        eyebrow="YOUR LEARNING SPACE"
        title={
          <>
            A place to practise.
            <br />
            <em>A way to keep growing.</em>
          </>
        }
        description="DEXAM’s student platform brings course learning, assignments and practice into a dedicated space. Access is connected to your enrolment."
        art="interface"
      />
      <section className="dea-wrap dea-note-panel">
        <Icon name="lock" size={26} />
        <div>
          <h2>Already part of DEXAM?</h2>
          <p>
            Contact your mentor or the academy team for your current
            student-access link and enrolment details.
          </p>
          <a
            className="dea-text-link"
            href={waLink}
            target="_blank"
            rel="noreferrer"
          >
            Ask for your student access <Icon name="arrow" size={16} />
          </a>
        </div>
      </section>
      <section className="dea-wrap dea-section">
        <SectionTitle
          eyebrow="EXPLORING FIRST?"
          title={
            <>
              There’s plenty
              <br />
              <em>to begin with.</em>
            </>
          }
        />
        <div className="dea-three-links">
          <Link to="/quiz">
            <h3>Design Instinct</h3>
            <p>Explore your visual thinking through 30 interactions.</p>
          </Link>
          <Link to="/resources">
            <h3>Free resources</h3>
            <p>Find practice notes, guides and previous year papers.</p>
          </Link>
          <Link to="/courses">
            <h3>Programmes</h3>
            <p>Explore one-year and two-year preparation paths.</p>
          </Link>
        </div>
      </section>
      <Cta />
    </>
  );
}

function SelectField({ name, label, value, onChange, options, error }) {
  return (
    <label htmlFor={`enquiry-${name}`}>
      {label}
      <select
        id={`enquiry-${name}`}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${name}` : undefined}
        required
      >
        <option value="">Choose one</option>
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
      {error && (
        <span className="dea-form-error" id={`error-${name}`}>
          {error}
        </span>
      )}
    </label>
  );
}

export function Contact() {
  const [params] = useSearchParams(),
    [form, setForm] = useState(() => initialEnquiry(params)),
    [errors, setErrors] = useState({}),
    [status, setStatus] = useState("idle");
  const programme = programmes.find((p) => p.id === form.programme);
  const submit = async (ev) => {
    ev.preventDefault();
    if (status === "sending") return;
    const errs = validateEnquiry(form);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    setStatus("sending");
    try {
      const attribution = campaignAttribution(params);
      const result = await submitToGoogleSheet("counselling", {
        ...form,
        formVersion: "qualified-counselling-v1",
        programme: programme?.name || form.programme,
        feeAcknowledged: form.feeAcknowledged ? "yes" : "no",
        ...attribution,
        ...(params.get("interest") ? { interest: params.get("interest") } : {}),
      });
      if (!result.configured) throw new Error("Unconfigured");
      emitEnquirySuccess(enquiryMeasurement(form, attribution));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };
  const set = (key) => (ev) => {
    const value =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status === "error") setStatus("idle");
  };
  return (
    <>
      <PageHero
        eyebrow="A CONVERSATION, NOT A COMMITMENT"
        title={
          <>
            Let’s talk
            <br />
            <em>possibilities.</em>
          </>
        }
        description="Review the programmes first, then tell us which exam, year and learning route you are considering. The extra detail helps us respond usefully."
      />
      <section className="dea-wrap dea-contact-layout">
        <div className="dea-contact-info">
          <Art kind="map" />
          <h2>
            Come curious.
            <br />
            <em>We’ll take it from there.</em>
          </h2>
          <dl>
            <div>
              <dt>CALL OR WHATSAPP</dt>
              <dd>
                <a href={waLink} target="_blank" rel="noreferrer">
                  {site.phone}
                  <Icon name="arrow" size={16} />
                </a>
              </dd>
            </div>
            <div>
              <dt>FIND OUR STUDIO</dt>
              <dd>
                {site.address}
                <a href={site.maps} target="_blank" rel="noreferrer">
                  Open directions <Icon name="arrow" size={15} />
                </a>
              </dd>
            </div>
            <div>
              <dt>WRITE TO US</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
          </dl>
          <p className="dea-fee-note">
            Please arrange a visit with the team so we can confirm current
            timings.
          </p>
        </div>
        <div className="dea-enquiry-card">
          {status === "sent" ? (
            <div className="dea-enquiry-sent">
              <span>
                <Icon name="check" size={30} />
              </span>
              <h2>
                Your request
                <br />
                <em>is on its way.</em>
              </h2>
              <p>
                Thank you for reaching out. The academy team can follow up using
                the details you shared.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="dea-button"
              >
                Continue on WhatsApp <Icon name="arrow" size={17} />
              </a>
            </div>
          ) : (
            <>
              <Eyebrow>BOOK FREE COUNSELLING</Eyebrow>
              <h2>
                Start with
                <br />
                <em>a clear fit.</em>
              </h2>
              <p>
                This form is for students and parents actively exploring design
                entrance preparation. It takes about two minutes.
              </p>
              <div className="dea-form-prices" aria-label="Programme fees">
                <span>
                  <b>One year</b>
                  ₹73,535
                </span>
                <span>
                  <b>Two years</b>
                  ₹1,13,557
                </span>
              </div>
              {programme && (
                <div className="dea-form-interest">
                  You’re exploring: <strong>{programme.name}</strong>
                </div>
              )}
              <form onSubmit={submit} noValidate>
                {[
                  ["name", "Your name", "Student or parent name"],
                  ["phone", "Phone / WhatsApp", "10-digit mobile number"],
                  ["location", "Where are you based?", "City or neighbourhood"],
                ].map(([key, label, placeholder]) => (
                  <label key={key} htmlFor={`enquiry-${key}`}>
                    {label}
                    <input
                      id={`enquiry-${key}`}
                      type={key === "phone" ? "tel" : "text"}
                      inputMode={key === "phone" ? "tel" : undefined}
                      autoComplete={
                        key === "name"
                          ? "name"
                          : key === "phone"
                            ? "tel"
                            : "address-level2"
                      }
                      value={form[key]}
                      onChange={set(key)}
                      aria-invalid={!!errors[key]}
                      aria-describedby={
                        errors[key] ? `error-${key}` : undefined
                      }
                      placeholder={placeholder}
                    />
                    {errors[key] && (
                      <span className="dea-form-error" id={`error-${key}`}>
                        {errors[key]}
                      </span>
                    )}
                  </label>
                ))}
                <SelectField
                  name="role"
                  label="Who is completing this form?"
                  value={form.role}
                  onChange={set("role")}
                  options={enquiryOptions.role}
                  error={errors.role}
                />
                <SelectField
                  name="education"
                  label="Current education stage"
                  value={form.education}
                  onChange={set("education")}
                  options={enquiryOptions.education}
                  error={errors.education}
                />
                <SelectField
                  name="exam"
                  label="Primary exam interest"
                  value={form.exam}
                  onChange={set("exam")}
                  options={enquiryOptions.exam}
                  error={errors.exam}
                />
                <SelectField
                  name="targetYear"
                  label="Target exam year"
                  value={form.targetYear}
                  onChange={set("targetYear")}
                  options={enquiryOptions.targetYear}
                  error={errors.targetYear}
                />
                <SelectField
                  name="mode"
                  label="Learning route"
                  value={form.mode}
                  onChange={set("mode")}
                  options={enquiryOptions.mode}
                  error={errors.mode}
                />
                <SelectField
                  name="programme"
                  label="What are you considering?"
                  value={form.programme}
                  onChange={set("programme")}
                  options={enquiryOptions.programme}
                  error={errors.programme}
                />
                <label htmlFor="enquiry-guidance">
                  What guidance do you need right now?
                  <textarea
                    id="enquiry-guidance"
                    value={form.guidance}
                    onChange={set("guidance")}
                    aria-invalid={!!errors.guidance}
                    aria-describedby={
                      errors.guidance ? "error-guidance" : undefined
                    }
                    placeholder="For example: I am in Class 12 and need help planning NID DAT preparation."
                    rows="4"
                  />
                  {errors.guidance && (
                    <span className="dea-form-error" id="error-guidance">
                      {errors.guidance}
                    </span>
                  )}
                </label>
                <SelectField
                  name="preferredTime"
                  label="Preferred time for a call"
                  value={form.preferredTime}
                  onChange={set("preferredTime")}
                  options={enquiryOptions.preferredTime}
                  error={errors.preferredTime}
                />
                <label
                  className="dea-form-check"
                  htmlFor="enquiry-fee-acknowledged"
                >
                  <input
                    id="enquiry-fee-acknowledged"
                    type="checkbox"
                    checked={form.feeAcknowledged}
                    onChange={set("feeAcknowledged")}
                    aria-invalid={!!errors.feeAcknowledged}
                    aria-describedby={
                      errors.feeAcknowledged
                        ? "error-feeAcknowledged"
                        : undefined
                    }
                  />
                  <span>
                    I reviewed the published one-year and two-year fees above.
                    I understand that test-series, portfolio and other terms are
                    confirmed separately.
                  </span>
                </label>
                {errors.feeAcknowledged && (
                  <span
                    className="dea-form-error"
                    id="error-feeAcknowledged"
                  >
                    {errors.feeAcknowledged}
                  </span>
                )}
                <button
                  type="submit"
                  className="dea-button dea-button-orange"
                  disabled={status === "sending"}
                >
                  {status === "sending"
                    ? "Sending your request…"
                    : "Start the conversation"}
                  <Icon name="arrow" size={17} />
                </button>
                {status === "error" && (
                  <p role="alert" className="dea-form-error">
                    We couldn’t send your request. Your details are still
                    here—please retry, or contact us on WhatsApp.
                  </p>
                )}
                <p className="dea-form-note">
                  By submitting, you ask DEXAM to contact you about this
                  enquiry. We also record non-sensitive campaign labels when
                  present so we can measure which source produced a useful
                  enquiry. If you’re under 18, please complete this with a
                  parent or guardian. <Link to="/privacy">Privacy policy</Link>
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="A SMALL DETOUR"
        title={
          <>
            That page took
            <br />
            <em>a different turn.</em>
          </>
        }
        description="Let’s get you back to a useful starting point."
        art="curve"
      />
      <section className="dea-wrap dea-error-actions">
        <Button to="/">Back to the beginning</Button>
        <ArrowLink to="/resources">Explore the resources</ArrowLink>
      </section>
    </>
  );
}
