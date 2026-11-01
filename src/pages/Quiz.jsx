import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import Challenge from "../assessment/Challenges.jsx";
import { Artwork, Icon, C } from "../assessment/Graphics.jsx";
import {
  tasks,
  chapters,
  clone,
  buildReport,
  VERSION,
} from "../assessment/model.mjs";
import "../assessment/lab.css";

const STORAGE = `dexam-${VERSION}`;
const DetailedReport = import.meta.env.DEV
  ? lazy(() => import("../assessment/DetailedReport.jsx"))
  : null;
const chapterIcons = ["sun", "spark", "edit", "grid", "heart", "share"];
const practices = {
  Balance:
    "Make five compositions from three shapes. Change the size of one shape and rebalance the others.",
  Observation:
    "Study a simple pattern, hide it, and recreate it. Compare the small differences in spacing and direction.",
  Colour:
    "Build a five-swatch palette in greyscale first. Add hue only after the lightness steps are distinct.",
  Typography:
    "Set the same short word in three typefaces. Adjust the spaces until the word feels like one unit.",
  Hierarchy:
    "Design a poster with one headline, one date and one shape. Check it at thumbnail size.",
  "Spatial reasoning":
    "Arrange a small room, then rotate the seating. Check clearance, facing and the path through it.",
  Usability:
    "Find three controls that are hard to tap. Redesign their hit areas and check them at phone size.",
  "Visual systems":
    "Build a family of six icons using one stroke weight, corner radius and spacing system.",
  Adaptation:
    "Repeat a composition at half its original size. Keep the message clear with fewer elements.",
};

function readSaved() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE));
    return data?.version === VERSION ? data : null;
  } catch {
    return null;
  }
}

function Brand() {
  return (
    <a className="lab-brand" href="/" aria-label="DEXAM home">
      DEX<span>A</span>M<i>DESIGN EXAM ACADEMY</i>
    </a>
  );
}

function Thumb({ kind, index = 0 }) {
  if (kind === "balance")
    return (
      <svg viewBox="0 0 160 110">
        <path
          d="M80 7v20M25 29h110M45 29v25m77-25v32"
          stroke={C.ink}
          strokeWidth="2"
        />
        <circle cx="45" cy="74" r="22" fill={C.orange} />
        <circle cx="122" cy="77" r="16" fill={C.green} />
        <circle cx="80" cy="29" r="4" fill={C.ink} />
      </svg>
    );
  if (kind === "tangram")
    return (
      <svg viewBox="0 0 160 110">
        <path d="m80 10 45 45-45 45-45-45Z" fill="#dae3c8" />
        <path d="M80 10v45H35Z" fill={C.orange} />
        <path d="M80 55h45l-45 45Z" fill={C.green} />
        <path d="M20 75h35l-35 35Z" fill={C.yellow} />
        <path d="M115 5h35v35Z" fill={C.blue} />
      </svg>
    );
  if (["chart", "perspective", "route"].includes(kind))
    return (
      <svg viewBox="0 0 160 110">
        <path d="M25 15v80h115" stroke="#b9c6a8" fill="none" />
        <path
          d="M30 80Q60 15 90 65T140 25"
          fill="none"
          stroke={C.orange}
          strokeWidth="3"
        />
        <path
          d="M30 55Q70 90 100 35T140 60"
          fill="none"
          stroke={C.green}
          strokeWidth="3"
          strokeDasharray="6 4"
        />
      </svg>
    );
  if (["flow", "responsive", "touch"].includes(kind))
    return (
      <svg viewBox="0 0 160 110">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${20 + i * 45} 20)`}>
            <rect width="34" height="70" rx="5" fill="white" stroke="#a8bd97" />
            <rect
              x="5"
              y="15"
              width="24"
              height="25"
              rx="3"
              fill={[C.orange, C.yellow, C.lime][i]}
            />
            <path d="M5 48h24m-24 6h16" stroke="#b1c09d" strokeWidth="2" />
            <rect x="5" y="61" width="24" height="4" rx="2" fill={C.green} />
          </g>
        ))}
      </svg>
    );
  if (["anomaly", "tiles", "icons"].includes(kind))
    return (
      <svg viewBox="0 0 160 110">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g
            key={i}
            transform={`translate(${35 + (i % 3) * 42} ${34 + Math.floor(i / 3) * 42})`}
          >
            <rect
              x="-16"
              y="-16"
              width="32"
              height="32"
              rx="7"
              fill="#dce6cb"
            />
            <path
              d="M-7 5V-6H7"
              fill="none"
              stroke={i === 4 ? C.orange : C.green}
              strokeWidth="3"
              transform={`rotate(${i === 4 ? 135 : 45})`}
            />
          </g>
        ))}
      </svg>
    );
  if (["sequence", "spacing"].includes(kind))
    return (
      <svg viewBox="0 0 160 110">
        {[28, 45, 63, 80].map((h, i) => (
          <rect
            key={i}
            x={20 + i * 32}
            y={90 - h}
            width="22"
            height={h}
            rx="3"
            fill={[C.green, C.blue, C.orange, C.yellow][i]}
          />
        ))}
      </svg>
    );
  if (["hue", "saturation", "harmony"].includes(kind))
    return (
      <div className="lab-thumb-wheel">
        <i />
      </div>
    );
  if (kind === "paint")
    return (
      <svg viewBox="0 0 160 110">
        <rect width="160" height="110" fill="#e6e7d3" />
        <rect y="80" width="160" height="30" fill="#d9c4a3" />
        <path d="M47 34h30l-5 15q38 42-10 45T51 49Z" fill={C.orange} />
        <path d="M93 66h49q-3 30-25 30T93 66" fill={C.green} />
        <circle cx="115" cy="60" r="12" fill={C.yellow} />
        <path d="M62 35V10" stroke={C.green} strokeWidth="3" />
      </svg>
    );
  if (["kerning", "reading", "alignment"].includes(kind))
    return (
      <div
        className="lab-thumb-type"
        style={{ letterSpacing: index % 2 ? "-.08em" : ".08em" }}
      >
        Aa<span>TYPE &amp; SPACE</span>
      </div>
    );
  if (["poster", "capstone", "crop"].includes(kind))
    return <Artwork miniature />;
  if (kind === "room")
    return (
      <svg viewBox="0 0 160 110">
        <rect
          x="20"
          y="10"
          width="120"
          height="90"
          fill="#e5d8c4"
          stroke={C.green}
          strokeWidth="3"
        />
        <ellipse cx="80" cy="57" rx="38" ry="29" fill="#cdd4b8" />
        <rect x="38" y="27" width="49" height="22" rx="6" fill={C.green} />
        <ellipse cx="80" cy="64" rx="20" ry="13" fill="#b68b65" />
        <rect x="115" y="33" width="8" height="40" rx="2" fill={C.ink} />
      </svg>
    );
  if (kind === "curve")
    return (
      <svg viewBox="0 0 160 110">
        <path
          d="M25 85C20 5 140 5 135 85"
          fill="none"
          stroke={C.orange}
          strokeWidth="4"
        />
        <path d="M25 85 20 5M135 85 140 5" stroke={C.green} />
        {[
          [20, 5],
          [140, 5],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="4" fill="#fff" stroke={C.green} />
        ))}
      </svg>
    );
  if (kind === "order")
    return (
      <div className="lab-thumb-swatches">
        {[22, 35, 48, 61, 74].map((l) => (
          <i key={l} style={{ background: `hsl(155 22% ${l}%)` }} />
        ))}
      </div>
    );
  return (
    <svg viewBox="0 0 160 110">
      <circle
        cx={50 + (index % 3) * 10}
        cy="46"
        r="27"
        fill={index % 2 ? C.green : C.orange}
      />
      <rect
        x="78"
        y="38"
        width="41"
        height="41"
        rx={index % 3 ? 6 : 20}
        fill={C.yellow}
        transform="rotate(15 98 58)"
      />
      <path d="M30 88h100" stroke={C.green} strokeWidth="2" />
      <circle cx="119" cy="25" r="9" fill={C.blue} />
    </svg>
  );
}

function Library({ answers, onChoose, onClose }) {
  return (
    <div
      className="lab-library"
      role="dialog"
      aria-modal="true"
      aria-label="All 30 challenges"
    >
      <header>
        <div>
          <span className="lab-eyebrow">THE CHALLENGE COLLECTION</span>
          <h2>A playground for your design instinct.</h2>
        </div>
        <button
          className="lab-icon-button"
          onClick={onClose}
          aria-label="Close challenge collection"
        >
          <Icon name="close" />
        </button>
      </header>
      <p>Jump into any challenge. Your work stays saved.</p>
      <div className="lab-library-grid">
        {tasks.map((t, i) => (
          <button
            key={t.id}
            onClick={() => onChoose(i)}
            className="lab-library-card"
          >
            <div className="lab-library-art">
              <Thumb kind={t.kind} index={i} />
              {answers[t.id]?.submitted && (
                <b>
                  <Icon name="check" size={13} />
                </b>
              )}
            </div>
            <span>
              {String(t.id).padStart(2, "0")}
              <i>{t.dimension === 2 ? "Colour" : chapters[t.chapter]}</i>
            </span>
            <strong>{t.title}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

function Landing({ answers, onStart, onLibrary }) {
  const completed = Object.values(answers).filter((a) => a.submitted).length;
  return (
    <div className="lab-landing">
      <header className="lab-top">
        <Brand />
        <span className="lab-top-label">THE DESIGN INSTINCT TEST</span>
        <a href="/">
          Back to academy <Icon name="arrow" size={15} />
        </a>
      </header>
      <section className="lab-landing-hero">
        <div className="lab-hero-copy">
          <span className="lab-eyebrow">
            <i /> THINK WITH YOUR HANDS
          </span>
          <h1>
            Have an eye
            <br />
            for <em>design?</em>
          </h1>
          <p>
            Move. Match. Colour. Create.
            <br />
            30 little experiments to discover how you see.
          </p>
          <button className="lab-button lab-button-orange" onClick={onStart}>
            {completed ? "Continue your assessment" : "Find my design instinct"}
            <Icon name="arrow" />
          </button>
          <div className="lab-hero-foot">
            <span>Free score &amp; feedback</span>
            <i />
            <span>No drawing skills needed</span>
          </div>
        </div>
        <div className="lab-hero-collage">
          <div className="lab-art-caption">AN EXERCISE IN SEEING</div>
          <div className="lab-hero-poster">
            <Artwork />
          </div>
          <div className="lab-floating-palette">
            {["#244c3b", "#e7ebcf", "#edc668", "#ef633d"].map((c) => (
              <i key={c} style={{ background: c }} />
            ))}
          </div>
          <div className="lab-floating-note">
            <Icon name="spark" size={25} />
            <span>
              Less theory.
              <br />
              <b>More discovery.</b>
            </span>
          </div>
          <span className="lab-collage-no">01—30</span>
        </div>
      </section>
      <section className="lab-landing-stats">
        {[
          ["30", "hands-on challenges"],
          ["25–40", "minutes of exploration"],
          ["9", "abilities to discover"],
          ["₹0", "to see your score"],
        ].map(([n, s]) => (
          <div key={n}>
            <b>{n}</b>
            <span>{s}</span>
          </div>
        ))}
      </section>
      <section className="lab-sneak">
        <div className="lab-section-heading">
          <div>
            <span className="lab-eyebrow">A LITTLE TASTE</span>
            <h2>
              Less reading. More <em>doing.</em>
            </h2>
          </div>
          <button className="lab-text" onClick={onLibrary}>
            Explore all 30 challenges <Icon name="arrow" size={17} />
          </button>
        </div>
        <div className="lab-sneak-grid">
          {[0, 8, 10, 15, 19].map((i) => (
            <button key={i} onClick={() => onStart(i)}>
              <div>
                <Thumb kind={tasks[i].kind} index={i} />
                <span>
                  <Icon name="arrow" size={18} />
                </span>
              </div>
              <small>
                {String(i + 1).padStart(2, "0")} /{" "}
                {
                  ["BALANCE", "COLOUR", "TYPE", "SHAPE", "SPACE"][
                    [0, 8, 10, 15, 19].indexOf(i)
                  ]
                }
              </small>
              <strong>{tasks[i].title}</strong>
            </button>
          ))}
        </div>
      </section>
      <footer className="lab-landing-footer">
        <span>Designed to reveal where you are—and where you can grow.</span>
        <b>Design is a skill. Your eye is just the beginning.</b>
      </footer>
    </div>
  );
}

function Report({ answers, onReturn, onRestart, onDetailed }) {
  const report = useMemo(() => buildReport(answers), [answers]);
  const strongest = report.ranked[0],
    weakest = report.ranked.at(-1),
    full = report.count === 30;
  const title = !full
    ? "Your profile is taking shape."
    : report.overall >= 80
      ? "You have a sharp visual instinct."
      : report.overall >= 60
        ? "You have a foundation to build on."
        : "Your design journey starts here.";
  return (
    <main className="lab-report">
      <header className="lab-top">
        <Brand />
        <span className="lab-top-label">YOUR DESIGN PROFILE</span>
        <button className="lab-text" onClick={onReturn}>
          Back to challenges <Icon name="arrow" size={16} />
        </button>
      </header>
      <section className="lab-report-hero">
        <div>
          <span className="lab-eyebrow">
            {full
              ? "YOUR ASSESSMENT IS COMPLETE"
              : `${report.count} OF 30 CHALLENGES COMPLETED`}
          </span>
          <h1>{title}</h1>
          <p>Your current strengths, measured through what you made.</p>
        </div>
        <div className="lab-report-score" style={{ "--score": report.overall }}>
          <div>
            <b>{report.overall}</b>
            <span>/100</span>
            <small>{full ? "DESIGN READINESS" : "PARTIAL SCORE"}</small>
          </div>
        </div>
      </section>
      <div className="lab-report-grid">
        <section className="lab-report-free">
          <div className="lab-section-heading">
            <h2>Your creative fingerprint.</h2>
            <span>{report.count} pieces of evidence</span>
          </div>
          <div className="lab-report-bars">
            {report.scores.map((d) => (
              <div key={d.name}>
                <span>{d.name}</span>
                <i>
                  <b style={{ width: `${d.score || 0}%` }} />
                </i>
                <strong>{d.score ?? "—"}</strong>
              </div>
            ))}
          </div>
          <div className="lab-evidence-note">
            Unfinished skills remain unscored. These are task-rubric scores;
            career predictions require a calibrated study.
          </div>
          <div className="lab-findings">
            <article>
              <Icon name="spark" />
              <span>A STRENGTH TO BUILD ON</span>
              <h3>{strongest?.name || "Start exploring"}</h3>
              <p>
                {strongest
                  ? `You scored ${strongest.score}/100 across ${strongest.count} ${strongest.count === 1 ? "challenge" : "challenges"}. Your strongest result was “${[...strongest.items].sort((a, b) => b.score - a.score)[0].title}”`
                  : "Complete a challenge to see an evidence-based finding."}
              </p>
            </article>
            <article>
              <Icon name="edit" />
              <span>YOUR NEXT PRACTICE</span>
              <h3>{weakest?.name || "Make a first attempt"}</h3>
              <p>
                {weakest
                  ? practices[weakest.name]
                  : "Try a visual challenge and discover what to work on."}
              </p>
            </article>
          </div>
          <button className="lab-text" onClick={onRestart}>
            Start a fresh attempt <Icon name="rotate" size={16} />
          </button>
          {import.meta.env.DEV && (
            <div style={{ marginTop: 24 }}>
              <button className="lab-button" onClick={onDetailed} disabled={!full}>
                Preview detailed report <Icon name="arrow" size={16} />
              </button>
              <p className="lab-evidence-note">
                Local review preview. Paid report delivery is not enabled.
              </p>
            </div>
          )}
        </section>
        <aside className="lab-report-paid">
          <span className="lab-eyebrow">A LITTLE MORE, COMING SOON</span>
          <div className="lab-document-art">
            <Icon name="download" size={30} />
            <span>
              YOUR
              <br />
              DESIGN DNA.
            </span>
            <i />
            <i />
            <i />
          </div>
          <h2>
            A clearer picture.
            <br />A personal way forward.
          </h2>
          <ul>
            <li>Your personal practice priorities</li>
            <li>What to study &amp; notice every day</li>
            <li>A 4-week making plan</li>
            <li>Downloadable personal report</li>
          </ul>
          <button
            className="lab-button lab-button-orange"
            disabled
          >
            <Icon name="lock" size={17} /> Detailed report coming soon
          </button>
          <small>
            Your score and skill feedback are free. The downloadable report is
            in preparation.
          </small>
        </aside>
      </div>
    </main>
  );
}

export default function Quiz() {
  const saved = useRef(readSaved()),
    [answers, setAnswers] = useState(saved.current?.answers || {}),
    [step, setStep] = useState(saved.current?.step || 0),
    [view, setView] = useState(() =>
      import.meta.env.DEV && typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("report") === "detailed"
        ? "detailed"
        : "landing",
    ),
    [library, setLibrary] = useState(false),
    [history, setHistory] = useState({}),
    [help, setHelp] = useState(false);
  const task = tasks[step],
    entry = answers[task.id],
    value = entry?.value || task.initial,
    completed = Object.values(answers).filter((a) => a.submitted).length;
  const headingRef = useRef(null);
  useEffect(() => {
    document.title = "Design Instinct Test · DEXAM";
    return () => {
      document.title = "DEXAM · Design Exam Academy";
    };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE,
          JSON.stringify({ version: VERSION, answers, step }),
        );
      } catch {}
    }, 300);
    return () => clearTimeout(timer);
  }, [answers, step]);
  useEffect(() => {
    setHelp(false);
    if (view === "test") headingRef.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [step, view]);
  const change = (next) => {
    setHistory((h) => ({
      ...h,
      [task.id]: [...(h[task.id] || []), clone(value)].slice(-60),
    }));
    setAnswers((a) => ({
      ...a,
      [task.id]: {
        value: next,
        submitted: false,
        changes: (a[task.id]?.changes || 0) + 1,
        trace: [
          ...(a[task.id]?.trace || []),
          { at: Date.now(), state: clone(next) },
        ].slice(-400),
      },
    }));
  };
  const undo = () => {
    const states = history[task.id] || [];
    if (!states.length) return;
    setAnswers((a) => ({
      ...a,
      [task.id]: { ...a[task.id], value: states.at(-1), submitted: false },
    }));
    setHistory((h) => ({ ...h, [task.id]: states.slice(0, -1) }));
  };
  const choose = (i) => {
    if (i === 28 && !answers[29] && answers[21]) {
      setAnswers((a) => ({
        ...a,
        29: {
          value: clone(a[21].value),
          submitted: false,
          changes: 0,
          trace: [],
        },
      }));
    }
    setStep(typeof i === "number" ? i : 0);
    setView("test");
    setLibrary(false);
  };
  const next = () => {
    setAnswers((a) => ({
      ...a,
      [task.id]: { ...a[task.id], value: clone(value), submitted: true },
    }));
    if (step === 27 && !answers[29] && answers[21]) {
      setAnswers((a) => ({
        ...a,
        29: {
          value: clone(a[21].value),
          submitted: false,
          changes: 0,
          trace: [],
        },
      }));
    }
    if (step === 29) setView("report");
    else setStep(step + 1);
  };
  const restart = () => {
    setAnswers({});
    setHistory({});
    setStep(0);
    setView("landing");
  };
  return (
    <div className="design-lab">
      {view === "landing" ? (
        <Landing
          answers={answers}
          onStart={(i) => choose(typeof i === "number" ? i : step)}
          onLibrary={() => setLibrary(true)}
        />
      ) : view === "detailed" && import.meta.env.DEV ? (
        <Suspense fallback={<main className="lab-report"><p>Preparing your report…</p></main>}>
          <DetailedReport
            answers={answers}
            onBack={() => setView("report")}
          />
        </Suspense>
      ) : view === "report" ? (
        <Report
          answers={answers}
          onReturn={() => setView("test")}
          onRestart={restart}
          onDetailed={() => setView("detailed")}
        />
      ) : (
        <>
          <header className="lab-top">
            <Brand />
            <div className="lab-session-name">
              <span>DESIGN INSTINCT TEST</span>
              <b>Try. Adjust. Trust your eye.</b>
            </div>
            <div className="lab-header-actions">
              <span className="lab-saved">
                <i /> Saved on this device
              </span>
              <button
                className="lab-icon-button"
                onClick={() => setLibrary(true)}
                aria-label="Open all 30 challenges"
              >
                <Icon name="grid" />
              </button>
              <button
                className="lab-icon-button"
                onClick={() => setView("landing")}
                aria-label="Exit to assessment home"
              >
                <Icon name="close" />
              </button>
            </div>
          </header>
          <div className="lab-workspace">
            <aside className="lab-rail">
              <span className="lab-eyebrow">YOUR EXPLORATION</span>
              <nav aria-label="Assessment chapters">
                {chapters.map((name, c) => (
                  <div
                    key={name}
                    className={`lab-chapter ${task.chapter === c ? "active" : ""}`}
                  >
                    <button onClick={() => choose(c * 5)}>
                      <span>
                        <Icon name={chapterIcons[c]} size={18} />
                      </span>
                      <strong>{name}</strong>
                      <small>
                        {
                          tasks.filter(
                            (t) => t.chapter === c && answers[t.id]?.submitted,
                          ).length
                        }
                        /5
                      </small>
                    </button>
                    <div className="lab-chapter-dots">
                      {tasks
                        .filter((t) => t.chapter === c)
                        .map((t) => (
                          <button
                            key={t.id}
                            aria-label={`Challenge ${t.id}: ${t.title}`}
                            title={t.title}
                            className={`${step === t.id - 1 ? "current" : ""} ${answers[t.id]?.submitted ? "done" : ""}`}
                            onClick={() => choose(t.id - 1)}
                          >
                            {answers[t.id]?.submitted ? (
                              <Icon name="check" size={10} />
                            ) : (
                              String(t.id).padStart(2, "0")
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </nav>
              <div className="lab-rail-bottom">
                <b>
                  {completed}
                  <span> / 30</span>
                </b>
                <i>
                  <span style={{ width: `${(completed / 30) * 100}%` }} />
                </i>
                <button onClick={() => setView("report")}>
                  View my progress <Icon name="arrow" size={15} />
                </button>
              </div>
            </aside>
            <main className="lab-task-area">
              <div className="lab-task-topline">
                <span>
                  <i /> {chapters[task.chapter]}
                </span>
                <button onClick={() => setLibrary(true)}>
                  Browse challenges <Icon name="grid" size={13} />
                </button>
              </div>
              <div className="lab-task-title">
                <div>
                  <span className="lab-task-number">
                    EXPERIMENT {String(task.id).padStart(2, "0")} / 30
                  </span>
                  <h1 tabIndex="-1" ref={headingRef}>
                    {task.title}
                  </h1>
                  <p>{task.hint}</p>
                </div>
                <button
                  className="lab-help"
                  aria-label="Show keyboard controls"
                  onClick={() => setHelp(!help)}
                >
                  ?
                </button>
              </div>
              {help && (
                <div className="lab-help-note">
                  Drag objects with your mouse or finger. You can also focus an
                  object with Tab and move it with arrow keys. Hold Shift for
                  bigger steps. Use the sliders for precise changes.
                </div>
              )}
              <div className={`lab-experiment lab-kind-${task.kind}`}>
                <div className="lab-canvas-label">
                  <span>
                    <i />
                    {["paint", "poster", "capstone", "room"].includes(task.kind)
                      ? "YOUR CANVAS"
                      : "INTERACTIVE WORKSPACE"}
                  </span>
                  <span>{entry?.changes ? "EDITED" : "MAKE YOUR MOVE"}</span>
                </div>
                <Challenge
                  key={task.id}
                  task={task}
                  value={value}
                  onChange={change}
                />
                <div className="lab-canvas-footer">
                  <span>
                    Explore freely. Your result is saved when you continue.
                  </span>
                  <div>
                    <button
                      onClick={undo}
                      disabled={!history[task.id]?.length}
                      aria-label="Undo last change"
                    >
                      <Icon name="undo" size={16} />
                    </button>
                    <button
                      onClick={() => change(clone(task.initial))}
                      aria-label="Reset challenge"
                    >
                      <Icon name="rotate" size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <footer className="lab-task-navigation">
                <button
                  className="lab-text"
                  disabled={step === 0}
                  onClick={() => setStep(step - 1)}
                >
                  <Icon name="back" size={17} /> Back
                </button>
                <span>
                  {entry?.submitted ? (
                    <>
                      <Icon name="check" size={14} /> Response saved
                    </>
                  ) : entry?.changes ? (
                    "Looking good? Save your response."
                  ) : (
                    "Take a moment. Explore the possibilities."
                  )}
                </span>
                <button
                  className="lab-button"
                  disabled={!entry?.changes}
                  onClick={next}
                >
                  {step === 29 ? "See my results" : "Save & continue"}
                  <Icon name="arrow" size={18} />
                </button>
              </footer>
            </main>
          </div>
        </>
      )}
      {library && (
        <Library
          answers={answers}
          onChoose={choose}
          onClose={() => setLibrary(false)}
        />
      )}
    </div>
  );
}
