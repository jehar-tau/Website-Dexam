import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../assessment/Graphics.jsx";
import { mentors } from "./mentor-data.js";
import "./mentors.css";

export function MentorPoster({ mentor, priority = false }) {
  return (
    <div className={`dea-mentor-poster poster-${mentor.theme}`}>
      <div className="dea-mentor-poster-furniture" aria-hidden="true">
        <span>DEXAM / THE PEOPLE IN YOUR CORNER</span>
        <span>DESIGN MENTOR <i /></span>
      </div>
      <div className="dea-mentor-poster-name" aria-hidden="true">
        <span>{mentor.firstName}</span>
        <b>{mentor.surname}</b>
      </div>
      <div className="dea-mentor-poster-lines" aria-hidden="true" />
      <img
        src={mentor.photo}
        width="1024"
        height="1536"
        alt={`Editorial portrait of ${mentor.name}.`}
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : "auto"}
        decoding="async"
      />
      <span className="dea-mentor-poster-field" aria-hidden="true">{mentor.discipline}</span>
    </div>
  );
}

export function HeroMentors() {
  const [active, setActive] = useState("siddhant-modi");
  const mentor = mentors.find(m => m.id === active);
  return (
    <div className="dea-hero-collage dea-hero-mentors">
      <div className="dea-mentor-hero-stage">
        <span className="dea-mentor-paper-back" aria-hidden="true" />
        <article className="dea-mentor-hero-card" id="hero-mentor-card" aria-label="Featured mentor">
          <MentorPoster mentor={mentor} priority />
          <div className="dea-mentor-hero-caption" aria-live="polite" aria-atomic="true">
            <span className="dea-mentor-kicker">LEARN WITH A DESIGNER</span>
            <h2>
              <Link to={`/about#mentor-${mentor.id}`}>
                {mentor.name} <Icon name="arrow" size={20} />
              </Link>
            </h2>
            <p className="dea-mentor-hero-company">{mentor.company} <span>· {mentor.role}</span></p>
            <div className="dea-mentor-hero-education">
              <span>National Institute of Design</span>
              <span>{mentor.id === "siddhant-modi" ? "Sir J. J. Institute of Applied Art" : mentor.background}</span>
            </div>
          </div>
        </article>
      </div>
      <div className="dea-mentor-switcher" role="group" aria-label="Meet our mentors">
        {mentors.map(m => (
          <button
            key={m.id}
            type="button"
            aria-label={`Show ${m.name}`}
            aria-pressed={m.id === active}
            aria-controls="hero-mentor-card"
            onClick={() => setActive(m.id)}
          >
            <span aria-hidden="true">{m.id === active ? "●" : "○"}</span>
            {m.firstName}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MentorDirectory() {
  return (
    <>
      <p className="dea-mentor-intro">Four designers. Different starting points. A shared curiosity about how things work.</p>
      <div className="dea-mentor-grid dea-mentor-directory">
        {mentors.map((mentor, index) => (
          <article className="dea-mentor-card" id={`mentor-${mentor.id}`} key={mentor.id}>
            <MentorPoster mentor={mentor} />
            <div className="dea-mentor-card-copy">
              <span className="dea-mentor-kicker">{String(index + 1).padStart(2, "0")} / {mentor.discipline}</span>
              <h3>{mentor.name}</h3>
              <p className="dea-mentor-position">{mentor.role}<strong>{mentor.company}</strong></p>
              <dl className="dea-mentor-credentials">
                {mentor.credentials.map(c => (
                  <div key={c.institute}>
                    <dt>{c.institute}</dt>
                    <dd>{c.qualification}</dd>
                  </div>
                ))}
              </dl>
              <p className="dea-mentor-bio">{mentor.bio}</p>
              <a className="dea-mentor-profile" href={mentor.linkedin} target="_blank" rel="noreferrer" aria-label={`${mentor.name} on LinkedIn`}>
                View LinkedIn profile <Icon name="arrow" size={17} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
