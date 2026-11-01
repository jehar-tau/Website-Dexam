import test from "node:test";
import assert from "node:assert/strict";
import {
  designDisciplines,
  matchingDisciplineOffers,
} from "./discipline-data.js";
import { admissionsSources } from "./admissions-sources.js";
import {
  designColleges,
  puneDesignColleges,
  architectureRankings,
  puneArchitectureColleges,
  scoreAcceptingColleges,
  degreeRoutes,
} from "./college-data.js";

test("NID catalogue follows the amended 2027 handbooks across study levels", () => {
  assert.equal(
    designDisciplines.filter((d) =>
      d.offers.some((o) => o.institution === "NID" && o.level === "Integrated"),
    ).length,
    15,
  );
  assert.equal(
    designDisciplines.filter((d) =>
      d.offers.some(
        (o) => o.institution === "NID" && o.level === "Postgraduate",
      ),
    ).length,
    22,
  );
  assert.equal(
    designDisciplines.filter((d) =>
      d.offers.some((o) => o.institution.startsWith("NID")),
    ).length,
    32,
  );
  for (const [id, campus] of [
    ["photography", "Ahmedabad"],
    ["textile", "Gandhinagar"],
    ["new-media", "Bengaluru"],
  ])
    assert.ok(
      designDisciplines
        .find((d) => d.id === id)
        .offers.some(
          (o) =>
            o.institution === "NID" &&
            o.level === "Postgraduate" &&
            o.campus === campus,
        ),
    );
  for (const name of [
    "Design Trends and Futures",
    "Design Education",
    "Design for Care",
    "Creative Leadership",
  ])
    assert.ok(designDisciplines.some((d) => d.name === name));
});
test("all published facts resolve to an HTTPS source and discipline IDs stay unique", () => {
  assert.equal(
    new Set(designDisciplines.map((d) => d.id)).size,
    designDisciplines.length,
  );
  const facts = [
    ...designDisciplines.flatMap((d) => d.offers),
    ...designColleges,
    ...puneDesignColleges,
    ...architectureRankings,
    ...puneArchitectureColleges,
    ...scoreAcceptingColleges,
    ...degreeRoutes,
  ];
  for (const fact of facts)
    assert.ok(
      admissionsSources[fact.source]?.url.startsWith("https://"),
      `Source missing: ${fact.source}`,
    );
});
test("college lists preserve rank editions and ownership distinctions", () => {
  assert.equal(designColleges.length, 20);
  assert.ok(designColleges.every((c) => !("rank" in c)));
  assert.equal(
    puneDesignColleges.find((c) => c.name.startsWith("RT-MSSU")).sector,
    "Public",
  );
  assert.equal(
    puneArchitectureColleges.find((c) => c.name.startsWith("BKPS")).sector,
    "Government-aided",
  );
  assert.equal(puneArchitectureColleges.length, 5);
  assert.deepEqual(
    architectureRankings.map((c) => c.rank),
    Array.from({ length: 20 }, (_, i) => i + 1),
  );
  assert.ok(architectureRankings.every((c) => c.year === 2025));
  assert.deepEqual(
    architectureRankings.slice(0, 3).map((c) => c.name),
    ["IIT Roorkee", "NIT Calicut", "IIT Kharagpur"],
  );
  assert.equal(architectureRankings[19].name, "BMS College of Architecture");
});
test("score policies do not turn old references or another test into a current NID waiver", () => {
  const mit = scoreAcceptingColleges.find(
    (c) => c.name === "MITAOE School of Design",
  );
  assert.ok(mit.cycle.startsWith("2026 reference"));
  assert.deepEqual(mit.exams, ["UCEED"]);
  assert.deepEqual(
    scoreAcceptingColleges.find((c) => c.name === "Vishwakarma University")
      .exams,
    ["UCEED"],
  );
  assert.ok(
    scoreAcceptingColleges
      .find((c) => c.name === "MIT-WPU")
      .note.includes("drawing test"),
  );
  assert.ok(admissionsSources.uceedBrochure.name.includes("labelled 2026"));
});

test("IIT undergraduate programmes remain broad while named streams stay postgraduate", () => {
  const broad = designDisciplines.find((d) => d.id === "multidisciplinary");
  const ug = matchingDisciplineOffers(broad, {
    school: "IITs",
    level: "Undergraduate",
  });
  assert.equal(ug.length, 6);
  assert.ok(ug.some((o) => o.institution === "IIT Indore"));
  const bombay = designDisciplines.flatMap((d) =>
    matchingDisciplineOffers(d, {
      institution: "IIT Bombay · IDC School of Design",
      level: "Postgraduate",
    }),
  );
  assert.equal(bombay.length, 5);
  assert.ok(
    bombay.some((o) => o.programme === "M.Des · Mobility and Vehicle Design"),
  );
  assert.equal(
    matchingDisciplineOffers(
      designDisciplines.find((d) => d.id === "product"),
      {
        institution: "IIT Bombay · IDC School of Design",
        level: "Undergraduate",
      },
    ).length,
    0,
  );
});

test("college and level filters match the same offer and keep original programme names", () => {
  const product = designDisciplines.find((d) => d.id === "product");
  const nid = matchingDisciplineOffers(product, {
    school: "NID",
    level: "Undergraduate",
  });
  assert.deepEqual(nid, []);
  const bits = matchingDisciplineOffers(product, {
    institution: "BITS Design School",
    level: "Undergraduate",
  });
  assert.equal(
    bits[0].programme,
    "B.Des (Hons.) · Physical Product Design pathway",
  );
  assert.equal(
    matchingDisciplineOffers(product, {
      school: "NID",
      search: "Physical Product",
    }).length,
    0,
  );
  assert.equal(designDisciplines.filter((d) => d.id === "product").length, 1);
});

test("Symbiosis retains seven undergraduate specialisations and its separate UX master's", () => {
  const fields = designDisciplines.filter(
    (d) =>
      matchingDisciplineOffers(d, {
        school: "Symbiosis",
        level: "Undergraduate",
      }).length,
  );
  assert.equal(fields.length, 7);
  const masters = designDisciplines.flatMap((d) =>
    matchingDisciplineOffers(d, { school: "Symbiosis", level: "Postgraduate" }),
  );
  assert.equal(masters.length, 1);
  assert.equal(masters[0].programme, "M.Des · User Experience Design");
});

test("distinct qualifications and campus scope survive grouping", () => {
  const vfx = designDisciplines.find((d) => d.id === "animation-vfx");
  assert.equal(
    matchingDisciplineOffers(vfx, {
      institution: "NMIMS · School of Design",
    })[0].programme,
    "B.Sc · Animation & VFX",
  );
  const retail = designDisciplines.find((d) => d.id === "retail-merchandising");
  assert.ok(retail.offers.some((o) => o.programme.startsWith("BBA")));
  assert.ok(retail.offers.some((o) => o.programme.startsWith("MBA")));
  assert.equal(
    matchingDisciplineOffers(
      designDisciplines.find((d) => d.id === "footwear"),
      { school: "Mumbai region" },
    ).length,
    0,
  );
  const ai = designDisciplines.find((d) => d.id === "ai-design");
  assert.equal(
    matchingDisciplineOffers(ai, {
      institution: "Unitedworld Institute of Design",
      level: "Undergraduate",
    })[0].programme,
    "B.Design (Hons.) · AI in Creative Design",
  );
});

test("every expanded programme is source-backed and no identical programme is duplicated", () => {
  assert.equal(designDisciplines.length, 55);
  const offers = designDisciplines.flatMap((d) => d.offers);
  for (const name of [
    "BITS Design School",
    "FDDI",
    "NMIMS · School of Design",
    "ATLAS ISDI",
    "Pearl Academy",
    "UPES · School of Design",
    "Anant National University",
    "IIT Jodhpur",
  ])
    assert.ok(
      offers.some((o) => o.institution === name),
      name,
    );
  for (const d of designDisciplines) {
    const keys = d.offers.map(
      (o) => `${o.institution}|${o.level}|${o.campus}|${o.programme || ""}`,
    );
    assert.equal(new Set(keys).size, keys.length, d.id);
  }
});
