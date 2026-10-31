import test from "node:test";
import assert from "node:assert/strict";
import { tasks, scoreTask, buildReport, clone } from "./model.mjs";

test("all 30 exercises have finite bounded scoring rules", () => {
  assert.equal(tasks.length, 30);
  assert.equal(new Set(tasks.map((t) => t.id)).size, 30);
  for (const task of tasks) {
    const score = scoreTask(task, clone(task.initial));
    assert.ok(Number.isFinite(score) && score >= 0 && score <= 100, task.title);
  }
});

test("matching and geometric accuracy improve with the actual response", () => {
  const solutions = {
    1: { x: 652 },
    2: { x: 400, y: 282 },
    4: { selected: 17 },
    5: { order: [0, 1, 2, 3] },
    6: { hue: 212 },
    7: { saturation: 67 },
    8: { order: [0, 1, 2, 3, 4, 5] },
    10: { a: 138, b: 258 },
    11: { xs: [210, 320, 422, 555] },
    12: { xs: [220, 220, 220] },
    13: { leading: 28.8, width: 504, size: 18 },
    14: { x: 310, y: 160, scale: 1.18 },
    15: { x: -190, y: 0, zoom: 1.15 },
    17: { r: 45 },
    18: { x: 400, y: 155 },
    19: { a: { x: 200, y: 100 }, b: { x: 600, y: 100 } },
    23: { order: [0, 1, 2, 3, 4] },
    27: { stroke: 3, radius: 14 },
    28: { rotations: [90, 180, 0, 270] },
  };
  for (const [id, value] of Object.entries(solutions)) {
    const task = tasks[Number(id) - 1];
    assert.equal(scoreTask(task, value), 100, task.title);
    assert.ok(
      scoreTask(task, task.initial) < scoreTask(task, value),
      task.title,
    );
  }
});

test("identical tangram pieces are interchangeable", () => {
  const pieces = [
    { x: 330, y: 210, r: 180 },
    { x: 470, y: 210, r: 270 },
    { x: 330, y: 350, r: 90 },
    { x: 470, y: 350, r: 0 },
  ];
  assert.equal(scoreTask(tasks[15], { pieces }), 100);
  assert.equal(scoreTask(tasks[15], { pieces: [...pieces].reverse() }), 100);
  assert.ok(scoreTask(tasks[15], tasks[15].initial) < 100);
});

test("turning the television away lowers the room score", () => {
  const value = {
    items: [
      { x: 300, y: 160, r: 0, s: 1 },
      { x: 300, y: 290, r: 0, s: 1 },
      { x: 300, y: 440, r: 180, s: 1 },
      { x: 600, y: 160, r: 0, s: 1 },
      { x: 590, y: 400, r: 0, s: 1 },
    ],
  };
  const turned = clone(value);
  turned.items[2].r = 0;
  assert.ok(scoreTask(tasks[19], value) > scoreTask(tasks[19], turned));
});

test("touch targets penalize overlap and overflow at small widths", () => {
  const good = { size: 44, gap: 52 };
  assert.equal(scoreTask(tasks[28], good), 100);
  assert.ok(scoreTask(tasks[28], { size: 60, gap: 35 }) < 100);
  assert.ok(scoreTask(tasks[28], { size: 44, gap: 80 }) < 100);
});

test("line styles preserve differentiation in greyscale", () => {
  const same = { styles: [0, 0, 0], colors: ["#ef633d", "#ef633d", "#ef633d"] };
  assert.ok(
    scoreTask(tasks[21], { ...same, styles: [0, 1, 2] }) >
      scoreTask(tasks[21], same),
  );
});

test("a path through the obstacles scores below a clear route", () => {
  const blocked = { points: [{ x: 400, y: 250 }] };
  const clear = {
    points: [
      { x: 245, y: 370 },
      { x: 400, y: 370 },
      { x: 400, y: 205 },
      { x: 570, y: 205 },
    ],
  };
  assert.ok(scoreTask(tasks[23], clear) > scoreTask(tasks[23], blocked));
});

test("reports exclude drafts and never invent scores for unmeasured skills", () => {
  const empty = buildReport({});
  assert.equal(empty.count, 0);
  assert.ok(empty.scores.every((d) => d.score === null));
  const report = buildReport({
    6: { submitted: true, value: { hue: 212 } },
    7: { submitted: false, value: { saturation: 67 } },
  });
  assert.equal(report.count, 1);
  assert.equal(report.scores[2].score, 100);
  assert.equal(report.scores[0].score, null);
  assert.equal(report.overall, 100);
});
