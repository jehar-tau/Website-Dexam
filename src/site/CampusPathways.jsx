import { ArrowLink, SectionTitle } from "./components.jsx";
import "./campuses.css";

const pathways = [
  {
    id: "nid",
    name: "NID",
    description: "National Institute of Design",
    image: "/assets/campuses/nid-discovery-v1.webp",
    alt: "Illustrated NID entrance with its geometric concrete monogram and brick wall.",
    links: [["Explore NID DAT", "/exams/nid"]],
  },
  {
    id: "nift",
    name: "NIFT",
    description: "National Institute of Fashion Technology",
    image: "/assets/campuses/nift-discovery-v1.webp",
    alt: "Illustrated NIFT entrance with its sweeping canopy, orange pillars and stepped facade.",
    links: [["Explore NIFT", "/exams/nift"]],
  },
  {
    id: "iit",
    name: "IITs",
    description: "Design at the Indian Institutes of Technology",
    image: "/assets/campuses/iit-idc-discovery-v1.webp",
    alt: "Illustrated IDC design-school entrance with square columns and tall gridded windows.",
    links: [
      ["UCEED", "/exams/uceed"],
      ["CEED", "/exams/ceed"],
    ],
  },
];

export function CampusPathways() {
  return (
    <section
      id="campus-pathways"
      className="dea-campus-pathways dea-section dea-wrap"
      aria-labelledby="campus-pathways-title"
    >
      <SectionTitle
        eyebrow="AIM A LITTLE FURTHER"
        title={
          <span id="campus-pathways-title">
            Big ideas.
            <br />
            <em>Bigger possibilities.</em>
          </span>
        }
        to="/exams"
        link="Find your entrance route"
      />
      <p className="dea-campus-intro">
        Prepare for NID, NIFT and design at the IITs. A little direction today.
        A world of possibilities ahead.
      </p>
      <div className="dea-campus-grid">
        {pathways.map((campus, index) => (
          <article
            key={campus.id}
            className={`dea-campus-card dea-campus-${campus.id}`}
            aria-labelledby={`campus-${campus.id}-title`}
          >
            <div className="dea-campus-scene">
              <span className="dea-campus-number" aria-hidden="true">
                0{index + 1} / A CREATIVE FUTURE
              </span>
              <img
                src={campus.image}
                alt={campus.alt}
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="dea-campus-copy">
              <h3 id={`campus-${campus.id}-title`}>{campus.name}</h3>
              <p>{campus.description}</p>
              <div className="dea-campus-links">
                {campus.links.map(([label, to]) => (
                  <ArrowLink key={to} to={to}>
                    {label}
                  </ArrowLink>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
