import test from "node:test";
import assert from "node:assert/strict";
import { designDisciplines } from "./discipline-data.js";
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
