import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Graphics.jsx";
import { buildDetailedReport } from "./detailed-report.mjs";
import "./detailed-report.css";

const sections = [
  ["focus", "Focus areas"],
  ["daily", "Everyday habits"],
  ["plan", "Your plan"],
  ["overview", "At a glance"],
];

function PracticeArt({ kind }) {
  return (
    <svg className="dr-practice-art" viewBox="0 0 320 150" aria-hidden="true">
      <rect
        x="40"
        y="15"
        width="238"
        height="120"
        rx="3"
        fill="#fffdf5"
        transform="rotate(-4 160 75)"
      />
      {kind === "colour" ? (
        <>
          {["#243b32", "#50674e", "#829573", "#b5c4a0", "#e8ecd8"].map(
            (fill, i) => (
              <rect
                key={fill}
                x={65 + i * 39}
                y={39 + i * 3}
                width="30"
                height="66"
                rx="2"
                fill={fill}
              />
            ),
          )}
          <path d="M68 122h176" stroke="#386451" strokeWidth="1.5" />
        </>
      ) : kind === "type" ? (
        <>
          <path
            d="M72 32v90M72 117h165"
            stroke="#b5c4a0"
            strokeDasharray="3 4"
          />
          <text
            x="82"
            y="91"
            fill="#162824"
            fontFamily="'Zilla Slab',Georgia,serif"
            fontSize="62"
          >
            See.
          </text>
          <path d="M87 108h123" stroke="#ef633d" strokeWidth="3" />
        </>
      ) : kind === "space" || kind === "interface" ? (
        <>
          <rect
            x="85"
            y="35"
            width="150"
            height="83"
            fill="#eef1df"
            stroke="#386451"
            strokeWidth="2"
          />
          <rect x="98" y="49" width="48" height="52" rx="3" fill="#386451" />
          <rect x="157" y="49" width="61" height="15" rx="2" fill="#edc668" />
          <path
            d="M160 81h58m-58 10h40m-40 10h50"
            stroke="#829573"
            strokeWidth="3"
          />
          <circle cx="234" cy="117" r="12" fill="#ef633d" />
        </>
      ) : kind === "pattern" ? (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x={77 + (i % 4) * 43}
              y={38 + Math.floor(i / 4) * 30}
              width="22"
              height="22"
              rx={i === 6 ? 11 : 2}
              fill={i === 6 ? "#ef633d" : i % 2 ? "#b5c4a0" : "#386451"}
            />
          ))}
        </>
      ) : (
        <>
          <circle cx="113" cy="77" r="30" fill="#ef633d" />
          <rect x="171" y="44" width="43" height="69" fill="#386451" />
          <path d="m230 110 24-42 24 42Z" fill="#edc668" />
          <path d="M68 122h211" stroke="#829573" strokeWidth="1.5" />
        </>
      )}
      <circle cx="270" cy="28" r="8" fill="#edc668" />
      <path
        d="m26 94 5 8 9-2-6 8 3 8-9-3-6 7 1-10-8-4 9-2Z"
        fill="none"
        stroke="#386451"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export default function DetailedReport({
  answers,
  onBack,
  exportMode = false,
}) {
  const report = useMemo(() => buildDetailedReport(answers), [answers]);
  const { coaching } = report;
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const heading = useRef(null);
  useEffect(() => {
    if (!exportMode) heading.current?.focus({ preventScroll: true });
  }, [exportMode]);
  const saveCopy = async () => {
    setSaving(true);
    setSaveError("");
    try {
      const { createPracticePdf } = await import("./practice-pdf.mjs");
      const bytes = await createPracticePdf(report);
      const url = URL.createObjectURL(
        new Blob([bytes], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "dexam-personal-practice-plan.pdf";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("A4 report download failed:", error);
      setSaveError(
        "The copy could not be created. Your saved attempt is unchanged. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };
  return (
    <main className={`dr-report ${exportMode ? "dr-export" : ""}`}>
      <header className="dr-topbar">
        <a
          className="lab-brand"
          href="https://designexam.com/"
          aria-label="DEXAM home"
        >
          DEX<span>A</span>M<i>DESIGN EXAM ACADEMY</i>
        </a>
        <span className="dr-preview-label">YOUR PERSONAL PRACTICE GUIDE</span>
        {!exportMode && (
          <button className="dr-quiet-button" onClick={onBack}>
            <Icon name="back" size={16} /> Back to your score
          </button>
        )}
      </header>
      <div className="dr-wrap">
        <section className="dr-hero">
          <div>
            <span className="dr-eyebrow">
              <i />
              {report.complete
                ? "A LITTLE DIRECTION FOR YOUR NEXT CHAPTER"
                : "YOUR PROFILE IS STILL TAKING SHAPE"}
            </span>
            <h1 ref={heading} tabIndex="-1">
              A clearer way
              <br />
              <em>to grow.</em>
            </h1>
            <p>{coaching.intro}</p>
            <div className="dr-result-chip">
              <span className="dr-big-score">
                {report.overall}
                <small>/100</small>
              </span>
              <span>
                {report.complete
                  ? "Your starting point"
                  : "Partial starting point"}
                <small>{report.count} of 30 activities completed</small>
              </span>
            </div>
            <a className="dr-primary-button" href="#dr-focus">
              See my next steps <Icon name="arrow" size={16} />
            </a>
          </div>
          <aside className="dr-first-step">
            <span className="dr-eyebrow">START WITH TEN MINUTES</span>
            <PracticeArt kind={coaching.firstStep?.art || "balance"} />
            <h2>Today, notice this.</h2>
            <p>
              {coaching.firstStep?.notice ||
                "Choose an object you use every day. Notice one decision about its shape, spacing or colour. Complete the activities to get a personal practice direction."}
            </p>
            <span className="dr-first-foot">
              Your everyday world is a design classroom.
            </span>
          </aside>
        </section>
        {!exportMode && (
          <nav className="dr-section-nav" aria-label="Report sections">
            {sections.map(([id, label], i) => (
              <a href={`#dr-${id}`} key={id}>
                <span>0{i + 1}</span>
                {label}
                <Icon name="arrow" size={14} />
              </a>
            ))}
          </nav>
        )}

        <section id="dr-focus" className="dr-section">
          <div className="dr-section-heading">
            <div>
              <span className="dr-eyebrow">01 / YOUR NEXT STEPS</span>
              <h2>
                What to strengthen.
                <br />
                <em>And how to start.</em>
              </h2>
            </div>
            <p>
              Three focused directions from your work. Learn a little, try it in
              the real world, then make something you can compare.
            </p>
          </div>
          <div className="dr-focus-list">
            {coaching.priorities.map((p) => (
              <article className="dr-focus-card" key={p.skill}>
                <div className="dr-focus-heading">
                  <span className="dr-focus-index">0{p.order}</span>
                  <div>
                    <span className="dr-eyebrow">
                      {p.skill} /{" "}
                      {p.stretch ? "YOUR NEXT STRETCH" : "PRACTISE NEXT"}
                    </span>
                    <h3>{p.title}</h3>
                  </div>
                </div>
                <div className="dr-focus-body">
                  <div>
                    <h4>What your work suggests</h4>
                    <p>{p.diagnosis}</p>
                    <h4>Why this matters</h4>
                    <p>{p.why}</p>
                    <span className="dr-evidence-note">{p.evidenceNote}</span>
                  </div>
                  <div className="dr-study-card">
                    <h4>Study these ideas</h4>
                    <ul>
                      {p.study.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <details open={exportMode}>
                      <summary>
                        A place to start <Icon name="plus" size={14} />
                      </summary>
                      {p.resources.map((r) => (
                        <a
                          key={r.href}
                          href={r.href}
                          target={exportMode ? undefined : "_blank"}
                          rel="noreferrer"
                        >
                          <span>
                            {r.title}
                            <small>{r.publisher}</small>
                          </span>
                          <Icon name="arrow" size={14} />
                        </a>
                      ))}
                    </details>
                  </div>
                </div>
                <div className="dr-try-today">
                  <Icon name="edit" size={19} />
                  <div>
                    <span className="dr-eyebrow">ONE SMALL EXPERIMENT</span>
                    <p>{p.today}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!coaching.priorities.length && (
            <p className="dr-empty">
              Complete an activity to receive a practice suggestion based on
              your work.
            </p>
          )}
          {!!coaching.strengths.length && (
            <aside className="dr-strength-note">
              <Icon name="spark" size={23} />
              <div>
                <span className="dr-eyebrow">KEEP BUILDING ON</span>
                <h3>{coaching.strengths.join(" & ")}</h3>
                <p>
                  These were relatively more consistent areas in this attempt.
                  Bring the same careful looking and willingness to adjust into
                  your practice.
                </p>
              </div>
            </aside>
          )}
        </section>

        <section id="dr-daily" className="dr-section">
          <div className="dr-section-heading">
            <div>
              <span className="dr-eyebrow">02 / NOTICE A LITTLE MORE</span>
              <h2>
                A design habit.
                <br />
                <em>Hidden in your everyday.</em>
              </h2>
            </div>
            <p>
              A sign on your way home. A menu. A shelf. Use familiar things to
              practise seeing design decisions more deliberately.
            </p>
          </div>
          <div className="dr-observation-grid">
            {coaching.priorities.map((p) => (
              <article className="dr-observation" key={p.skill}>
                <span className="dr-eyebrow">NOTICE / {p.skill}</span>
                <PracticeArt kind={p.art} />
                <h3>{p.observationTitle}</h3>
                <p>{p.notice}</p>
                <div>
                  <span>ASK YOURSELF</span>
                  <p>{p.reflect}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="dr-routine-heading">
            <h3>A ten-minute loop.</h3>
            <p>
              A quick sketch or a phone note is enough. Keep the original and
              what you changed.
            </p>
          </div>
          <div className="dr-routine">
            {coaching.dailyLoop.map((step) => (
              <article key={step.minutes}>
                <span>
                  {step.minutes}
                  <small>MIN</small>
                </span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.action}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="dr-journal">
            <Icon name="edit" size={22} />
            <div>
              <h3>Leave yourself three lines.</h3>
              <p>At the end of the day, write:</p>
              <ol>
                {coaching.reflection.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="dr-plan" className="dr-section">
          <div className="dr-section-heading">
            <div>
              <span className="dr-eyebrow">03 / MAKE ROOM FOR PRACTICE</span>
              <h2>
                Four weeks.
                <br />
                <em>Something to show for them.</em>
              </h2>
            </div>
            <p>
              {report.complete
                ? "The first three weeks follow your practice priorities. In week four, bring them together in one small, real brief."
                : "Complete the remaining activities for a four-week plan. The daily observations above are a provisional starting point."}
            </p>
          </div>
          <div className="dr-plan-list">
            {coaching.plan.map((w) => (
              <details
                className="dr-week"
                key={w.week}
                open={exportMode || w.week === 1}
              >
                <summary>
                  <span className="dr-week-number">0{w.week}</span>
                  <span>
                    <small>
                      WEEK {w.week} / {w.skill}
                    </small>
                    <h3>{w.title}</h3>
                  </span>
                  <Icon name="plus" size={18} />
                </summary>
                <div className="dr-week-body">
                  <div>
                    <h4>Learn & notice</h4>
                    <ul>
                      {w.study.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <p>{w.notice}</p>
                    <span className="dr-week-rhythm">{w.rhythm}</span>
                  </div>
                  <div>
                    <h4>Make this</h4>
                    <p>{w.make}</p>
                    <div className="dr-deliverable">
                      <span>BY THE END OF THE WEEK</span>
                      <p>{w.output}</p>
                    </div>
                    <h4>Check your progress</h4>
                    <p>{w.check}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
          <aside className="dr-progress-note">
            <span className="dr-eyebrow">
              <Icon name="leaf" size={18} /> HOW TO SEE YOUR PROGRESS
            </span>
            <p>{coaching.progress}</p>
          </aside>
        </section>

        <section id="dr-overview" className="dr-section">
          <div className="dr-section-heading">
            <div>
              <span className="dr-eyebrow">
                04 / YOUR PERFORMANCE, AT A GLANCE
              </span>
              <h2>
                A quick look
                <br />
                <em>at the skill areas.</em>
              </h2>
            </div>
            <p>
              A snapshot to help you place the guidance above. Your practice and
              the work you make will tell a fuller story over time.
            </p>
          </div>
          <div className="dr-skill-snapshot">
            {report.skills.map((s) => (
              <div className="dr-skill-mini" key={s.name}>
                <div>
                  <span>{s.name}</span>
                  <strong>
                    {s.score ?? "—"}
                    {s.score !== null && <small>/100</small>}
                  </strong>
                </div>
                <div className="dr-bar" aria-hidden="true">
                  <span style={{ width: `${s.score ?? 0}%` }} />
                </div>
                <small>{s.label}</small>
              </div>
            ))}
          </div>
          <p className="dr-caption">
            The labels are prototype feedback bands, rather than comparisons
            with other students. Unmeasured areas remain blank.
          </p>
        </section>

        <section className="dr-takeaway dr-section">
          <PracticeArt kind="layout" />
          <div>
            <span className="dr-eyebrow">START SMALL. KEEP THE WORK.</span>
            <h2>
              Your next step
              <br />
              <em>is something you make.</em>
            </h2>
            <p>
              Choose one observation for tomorrow. Keep a small record of what
              you tried and ask for thoughtful feedback when you have something
              to share.
            </p>
            {!exportMode && (
              <button
                className="dr-primary-button"
                onClick={saveCopy}
                disabled={saving || !report.complete}
              >
                <Icon name="download" size={17} />
                {saving ? "Preparing your PDF…" : "Download A4 report"}
              </button>
            )}
            {saveError && (
              <p className="dr-error" role="alert">
                {saveError}
              </p>
            )}
            <p className="dr-caption">
              A five-page A4 PDF with your complete practice plan. Ready to save
              or print at actual size.
            </p>
          </div>
        </section>
        <section id="dr-method" className="dr-method">
          <details open={exportMode}>
            <summary>
              About this report <Icon name="plus" size={15} />
            </summary>
            <p>{report.generation}</p>
            <p>
              Practice directions are selected from the less consistent
              decisions within your measured skill areas. They are suggestions
              for further learning, and do not diagnose your personality or
              predict your future career.
            </p>
            <p>{report.scoring}</p>
            <p>{report.limitation}</p>
            <span className="dr-version">
              {report.assessmentVersion} / {report.reportVersion} · Local review
              preview
            </span>
          </details>
        </section>
        <footer className="dr-footer">
          <span>
            Keep the curiosity.
            <br />
            <em>Build the practice.</em>
          </span>
          <span>DEXAM / DESIGN EXAM ACADEMY</span>
        </footer>
      </div>
    </main>
  );
}
