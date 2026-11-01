import test from "node:test";
import assert from "node:assert/strict";
import { tasks, clone, buildReport } from "./model.mjs";
import { buildDetailedReport } from "./detailed-report.mjs";
import { buildCoachingProfile } from "./coaching.mjs";

const complete = () =>
  Object.fromEntries(
    tasks.map((t) => [t.id, { submitted: true, value: clone(t.initial) }]),
  );

test("detailed feedback preserves every score from the assessment engine", () => {
  const answers = complete();
  const base = buildReport(answers),
    detailed = buildDetailedReport(answers);
  assert.equal(detailed.overall, base.overall);
  assert.equal(detailed.count, 30);
  assert.equal(detailed.complete, true);
  for (const item of detailed.evidence) {
    assert.equal(item.score, base.evidence.find((t) => t.id === item.id).score);
    assert.ok(
      item.measures && item.limit && item.next && item.observations.length,
    );
    assert.ok(
      ["Reference match", "Constraint checks", "Design proxy"].includes(
        item.method,
      ),
    );
  }
});

test("empty and partial attempts do not invent skill findings or responses", () => {
  const empty = buildDetailedReport({});
  assert.equal(empty.evidence.length, 0);
  assert.equal(empty.plan.length, 0);
  assert.ok(empty.skills.every((s) => s.score === null));
  assert.equal(empty.coaching.plan.length, 0);
  assert.equal(empty.coaching.priorities.length, 0);
  const partial = buildDetailedReport({
    6: { submitted: true, value: { hue: 212 } },
    7: { submitted: false, value: { saturation: 67 } },
  });
  assert.equal(partial.complete, false);
  assert.equal(partial.coaching.plan.length, 0);
  assert.deepEqual(
    partial.evidence.map((t) => t.id),
    [6],
  );
  assert.equal(partial.skills.filter((s) => s.score !== null).length, 1);
  assert.equal(partial.skills[2].count, 1);
  assert.equal(partial.skills[2].possible, 5);
});

test("overall score weights skills equally despite unequal question counts", () => {
  const report = buildDetailedReport({
    4: { submitted: true, value: { selected: 17 } },
    5: { submitted: true, value: { order: [0, 1, 2, 3] } },
    6: { submitted: true, value: { hue: 228 } },
  });
  assert.equal(report.skills[1].score, 100);
  assert.equal(report.skills[2].score, 80);
  assert.equal(report.overall, 90);
});

test("practice priorities follow this attempt and evidence links stay in their skill", () => {
  const report = buildDetailedReport(complete());
  const measured = report.skills.filter((s) => s.score !== null);
  const low = [...measured]
    .sort((a, b) => a.score - b.score)
    .map((s) => s.score)
    .slice(0, 3);
  assert.deepEqual(
    report.priorities.map((s) => s.score),
    low,
  );
  assert.deepEqual(
    report.plan.slice(0, 3).map((w) => w.skill),
    report.priorities.map((s) => s.name),
  );
  assert.equal(report.plan.length, 4);
  for (const skill of measured) {
    assert.equal(
      skill.focus[0].score,
      Math.min(...skill.evidence.map((t) => t.score)),
    );
    assert.ok(skill.pattern.includes("/100"));
  }
  for (const week of report.plan.slice(0, 3))
    for (const id of week.revisit)
      assert.equal(report.evidence.find((t) => t.id === id).skill, week.skill);
});

test("report is deterministic, leaves answers intact and does not infer from timing", () => {
  const answers = complete(),
    before = JSON.stringify(answers);
  const first = buildDetailedReport(answers);
  assert.equal(JSON.stringify(answers), before);
  const changed = clone(answers);
  for (const entry of Object.values(changed)) {
    entry.changes = 456;
    entry.trace = [{ at: 1, state: { x: 900 } }];
  }
  assert.deepEqual(buildDetailedReport(changed), first);
  assert.deepEqual(buildDetailedReport(clone(answers)), first);
});

test("reported target checks expose narrow-screen overflow without inventing an accessibility pass", () => {
  const report = buildDetailedReport({
    29: { submitted: true, value: { size: 44, gap: 80 } },
  });
  assert.ok(
    report.evidence[0].observations.some((t) => t.includes("overflowed")),
  );
  assert.ok(
    report.evidence[0].limit.includes(
      "not a complete accessibility certification",
    ),
  );
});

test("saved work is an independent copy and draft work is never exported", () => {
  const answers = complete();
  answers[9].submitted = false;
  const report = buildDetailedReport(answers);
  assert.ok(!report.evidence.some((t) => t.id === 9));
  report.evidence.find((t) => t.id === 20).value.items[0].x = 999;
  assert.notEqual(answers[20].value.items[0].x, 999);
});

test("coaching targets the actual colour subskills and includes a usable daily routine", () => {
  const answers = complete();
  answers[6].value = { hue: 212 };
  answers[7].value = { saturation: 67 };
  answers[8].value = { order: [5, 4, 3, 2, 1, 0] };
  answers[9].value = {
    colors: ["#243b32", "#fffaf1", "#243b32", "#ef633d", "#edc668", "#386451"],
    painted: [0, 1, 2, 3, 4, 5],
  };
  answers[10].value = { a: 18, b: 18 };
  const report = buildDetailedReport(answers);
  const colour = report.skills.find((s) => s.name === "Colour");
  const coaching = buildCoachingProfile({ ...report, priorities: [colour] });
  assert.deepEqual(coaching.priorities[0].focusTopics, [
    "ordering lightness",
    "colour relationships",
  ]);
  assert.ok(
    coaching.priorities[0].study.some((s) => s.includes("Value and lightness")),
  );
  assert.ok(coaching.priorities[0].study.some((s) => s.includes("triadic")));
  assert.equal(
    coaching.dailyLoop.reduce((n, s) => n + s.minutes, 0),
    10,
  );
  assert.ok(coaching.priorities[0].notice.includes("shop sign"));
  const full = buildDetailedReport(complete()).coaching;
  assert.equal(full.plan.length, 4);
  assert.ok(
    full.plan.every((w) => w.study.length && w.make && w.output && w.check),
  );
});

test("a strong area receives stretch guidance rather than an invented deficit", () => {
  const report = buildDetailedReport(complete());
  const source = report.skills[2];
  const skill = {
    ...source,
    score: 100,
    evidence: source.evidence.map((t) => ({ ...t, score: 100 })),
    focus: source.focus.map((t) => ({ ...t, score: 100 })),
  };
  const result = buildCoachingProfile({ ...report, priorities: [skill] })
    .priorities[0];
  assert.equal(result.stretch, true);
  assert.ok(result.diagnosis.includes("consistent"));
  assert.ok(!result.diagnosis.includes("least consistent"));
});
