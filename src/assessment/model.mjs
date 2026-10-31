export const VERSION = "design-lab-v2";
export const dimensions = [
  "Balance",
  "Observation",
  "Colour",
  "Typography",
  "Hierarchy",
  "Spatial reasoning",
  "Usability",
  "Visual systems",
  "Adaptation",
];
export const chapters = [
  "Trust your eye",
  "Think in colour",
  "Give it form",
  "Work in space",
  "Design for people",
  "Connect the dots",
];
const task = (title, hint, kind, dimension, initial, extra = {}) => ({
  title,
  hint,
  kind,
  dimension,
  initial,
  ...extra,
});
export const tasks = [
  task(
    "Find the balance.",
    "Slide the little weight. Let your eye decide.",
    "balance",
    0,
    { x: 505 },
  ),
  task(
    "Find its visual centre.",
    "Move the dot until it feels centred inside the triangle.",
    "centre",
    0,
    { x: 550, y: 285 },
  ),
  task(
    "Give each shape equal breathing room.",
    "Drag the middle three. The outer two stay put.",
    "spacing",
    0,
    { xs: [160, 277, 365, 532, 640] },
  ),
  task("One tile breaks the rule.", "Tap it.", "anomaly", 1, {
    selected: null,
  }),
  task(
    "Keep the rhythm going.",
    "Swap the four loose tiles to continue the pattern.",
    "sequence",
    1,
    { order: [2, 0, 3, 1] },
  ),
  task(
    "Make the colours meet.",
    "Move around the wheel to match the centre.",
    "hue",
    2,
    { hue: 35 },
  ),
  task(
    "Same hue. Same intensity.",
    "Slide until the two inner circles look identical.",
    "saturation",
    2,
    { saturation: 25 },
  ),
  task(
    "Turn these into a smooth gradient.",
    "Swap the swatches. Dark to light.",
    "order",
    2,
    { order: [0, 4, 2, 5, 1, 3] },
  ),
  task(
    "Colour a little still life.",
    "Pick a swatch, then paint. Give the objects a clear focal point.",
    "paint",
    2,
    {
      colors: [
        "#e4e1db",
        "#dedbd5",
        "#d3d0ca",
        "#ede9e1",
        "#d8d5ce",
        "#d0cdc6",
      ],
      painted: [],
    },
  ),
  task(
    "Complete the colour chord.",
    "Rotate the two outer colours to form an evenly spaced trio.",
    "harmony",
    2,
    { a: 140, b: 175 },
  ),
  task(
    "Make the word feel right.",
    "Drag the middle letters. Judge the space, not the numbers.",
    "kerning",
    3,
    { xs: [210, 343, 400, 555] },
  ),
  task(
    "Find the invisible grid.",
    "Slide the three text blocks into alignment.",
    "alignment",
    3,
    { xs: [240, 190, 280] },
  ),
  task(
    "Make room for reading.",
    "Adjust the lines and the column.",
    "reading",
    3,
    { leading: 17, width: 650, size: 16 },
  ),
  task(
    "Let the headline lead.",
    "Move and scale the headline. Keep the date easy to find.",
    "poster",
    4,
    { x: 474, y: 350, scale: 0.7 },
  ),
  task(
    "Find the frame.",
    "Slide the image. Keep the cyclist and space to ride into.",
    "crop",
    4,
    { x: -170, y: 0, zoom: 1 },
  ),
  task(
    "Make the silhouette.",
    "Move the pieces. Select one to rotate it.",
    "tangram",
    5,
    {
      pieces: [
        { x: 150, y: 160, r: 90 },
        { x: 670, y: 165, r: 180 },
        { x: 170, y: 370, r: 270 },
        { x: 650, y: 370, r: 90 },
      ],
    },
  ),
  task(
    "A different angle. The same object.",
    "Rotate the solid until it matches the outline.",
    "rotation",
    5,
    { r: 190 },
  ),
  task(
    "Make the street believable.",
    "Drag the point where the perspective lines should meet.",
    "perspective",
    5,
    { x: 530, y: 290 },
  ),
  task(
    "Make the curve flow.",
    "Move the two handles to follow the dotted arc.",
    "curve",
    5,
    { a: { x: 220, y: 330 }, b: { x: 580, y: 330 } },
  ),
  task(
    "Make space for living.",
    "Arrange the furniture. Select, rotate, resize.",
    "room",
    5,
    {
      items: [
        { x: 265, y: 195, r: 0, s: 1 },
        { x: 460, y: 275, r: 0, s: 1 },
        { x: 570, y: 350, r: 90, s: 1 },
        { x: 585, y: 155, r: 0, s: 1 },
        { x: 280, y: 365, r: 0, s: 1 },
      ],
    },
  ),
  task(
    "Small icons. Comfortable taps.",
    "Resize the invisible touch area. Keep the targets separate.",
    "touch",
    6,
    { size: 27, gap: 42 },
  ),
  task(
    "Make every line recognisable.",
    "Style each route so it works without colour, too.",
    "chart",
    6,
    { styles: [0, 0, 0], colors: ["#ef6a47", "#ea754b", "#e57b51"] },
  ),
  task(
    "Give the action a natural order.",
    "Swap the screens into a photo-sharing flow.",
    "flow",
    6,
    { order: [2, 0, 4, 1, 3] },
  ),
  task(
    "Find a clear way through.",
    "Connect the entrance to the exit. Tap waypoints; avoid obstacles.",
    "route",
    6,
    { points: [] },
  ),
  task(
    "Show what belongs together.",
    "Move the tokens into three distinct families.",
    "group",
    6,
    {
      pieces: Array.from({ length: 9 }, (_, i) => ({
        x: 180 + (i % 3) * 210,
        y: 150 + Math.floor(i / 3) * 110,
      })),
    },
  ),
  task(
    "One card. Three screens.",
    "Set the image size and text scale. Check each width.",
    "responsive",
    7,
    { image: 190, size: 27, gap: 30 },
  ),
  task(
    "Bring the icons into one family.",
    "Tune the centre icon to match its neighbours.",
    "icons",
    7,
    { stroke: 8, radius: 3 },
  ),
  task(
    "Let the pattern continue.",
    "Rotate each tile to join the flowing line.",
    "tiles",
    7,
    { rotations: [0, 90, 180, 270] },
  ),
  task(
    "Now make it work on a smaller screen.",
    "Bring the same comfortable targets into this narrow space.",
    "touch",
    8,
    { size: 28, gap: 35 },
    { compact: true },
  ),
  task(
    "Make something worth noticing.",
    "Shape a poster for FORM. One headline. One focal point.",
    "capstone",
    8,
    { x: 300, y: 160, scale: 1, hue: 17, leading: 30 },
  ),
].map((t, i) => ({ ...t, id: i + 1, chapter: Math.floor(i / 5) }));

export const clone = (x) => JSON.parse(JSON.stringify(x));
const clamp = (x) => Math.max(0, Math.min(100, x));
const near = (a, b, range) => clamp(100 - (Math.abs(a - b) / range) * 100);
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const angle = (a, b) => Math.abs(((a - b + 540) % 360) - 180);
function posterScore(v, capstone = false) {
  // A family of valid layouts: legible, contained, separated from the date.
  // This is a structural rubric, not a judgement of aesthetic taste.
  const width = (capstone ? 200 : 225) * v.scale;
  const leading = capstone ? v.leading : 60 * v.scale;
  const overflow =
    Math.max(0, 200 - v.x) +
    Math.max(0, v.x + width - 610) +
    Math.max(0, 75 - (v.y - 65 * v.scale)) +
    Math.max(0, v.y + leading - 365);
  const legibility = clamp(100 - Math.max(0, 48 * v.scale - leading) * 3);
  return (
    Math.max(0, 100 - overflow * 0.55) * 0.45 +
    near(v.scale, 1.18, 1.1) * 0.25 +
    legibility * 0.3
  );
}
export function rgb(hex) {
  return hex
    .replace("#", "")
    .match(/.{2}/g)
    .map((v) => parseInt(v, 16) / 255);
}
export function luminance(hex) {
  return rgb(hex)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
}
const contrast = (a, b) =>
  (Math.max(luminance(a), luminance(b)) + 0.05) /
  (Math.min(luminance(a), luminance(b)) + 0.05);
export function scoreTask(t, v) {
  let score = 0;
  switch (t.kind) {
    case "balance":
      score = near((220 - 400) * 1.4 + (v.x - 400), 0, 280);
      break;
    case "centre":
      score = near(dist(v, { x: 400, y: 282 }), 0, 150);
      break;
    case "spacing": {
      const widths = [50, 85, 35, 65, 50];
      const gaps = v.xs
        .slice(1)
        .map((x, i) => x - widths[i + 1] / 2 - v.xs[i] - widths[i] / 2);
      const mean = gaps.reduce((a, b) => a + b, 0) / 4;
      score = clamp(
        100 - gaps.reduce((s, g) => s + Math.abs(g - mean), 0) * 0.8,
      );
      break;
    }
    case "anomaly":
      score = v.selected === 17 ? 100 : 0;
      break;
    case "sequence":
      score = v.order.reduce((s, x, i) => s + (x === i ? 25 : 0), 0);
      break;
    case "hue":
      score = near(angle(v.hue, 212), 0, 80);
      break;
    case "saturation":
      score = near(v.saturation, 67, 65);
      break;
    case "order":
      score = clamp(
        100 - v.order.reduce((s, x, i) => s + Math.abs(x - i), 0) * 9,
      );
      break;
    case "paint": {
      const values = v.colors.map(luminance);
      const valueRange = Math.max(...values) - Math.min(...values);
      const repeats = new Set(v.colors).size;
      score = clamp(
        (v.painted.length / 6) * 35 +
          Math.min(35, valueRange * 75) +
          (repeats >= 3 && repeats <= 5 ? 15 : 5) +
          Math.min(15, contrast(v.colors[1], v.colors[0]) * 3),
      );
      break;
    }
    case "harmony":
      score = 100 - (angle(v.a, 138) + angle(v.b, 258)) / 2;
      break;
    case "kerning":
      score = clamp(
        100 -
          [210, 320, 422, 555].reduce(
            (s, x, i) => s + Math.abs(x - v.xs[i]),
            0,
          ) *
            0.9,
      );
      break;
    case "alignment":
      score = clamp(
        100 - v.xs.reduce((s, x) => s + Math.abs(x - 220), 0) * 0.6,
      );
      break;
    case "reading":
      score =
        (near(v.leading / v.size, 1.6, 1.3) +
          near(v.width / v.size, 28, 25) +
          near(v.size, 18, 15)) /
        3;
      break;
    case "poster":
      score = posterScore(v);
      break;
    case "crop":
      score = (near(v.x, -190, 220) + near(v.zoom, 1.15, 0.8)) / 2;
      break;
    case "tangram": {
      const target = [
        { x: 330, y: 210, r: 180 },
        { x: 470, y: 210, r: 270 },
        { x: 330, y: 350, r: 90 },
        { x: 470, y: 350, r: 0 },
      ];
      const assign = (pieces, slots) =>
        !pieces.length
          ? 0
          : Math.max(
              ...slots.map(
                (p, i) =>
                  Math.max(
                    0,
                    100 -
                      dist(pieces[0], p) * 0.5 -
                      angle(pieces[0].r, p.r) * 0.3,
                  ) +
                  assign(
                    pieces.slice(1),
                    slots.filter((_, j) => i !== j),
                  ),
              ),
            );
      score = assign(v.pieces, target) / 4;
      break;
    }
    case "rotation":
      score = near(angle(v.r, 45), 0, 150);
      break;
    case "perspective":
      score = near(dist(v, { x: 400, y: 155 }), 0, 230);
      break;
    case "curve":
      score = clamp(
        100 -
          (dist(v.a, { x: 200, y: 100 }) + dist(v.b, { x: 600, y: 100 })) / 6,
      );
      break;
    case "room": {
      const [sofa, table, tv] = v.items;
      const facing =
        ((Math.atan2(tv.y - sofa.y, tv.x - sofa.x) * 180) / Math.PI +
          270 +
          360) %
        360;
      const tvFacing = (facing + 180) % 360;
      let collisions = 0;
      v.items.forEach((a, i) =>
        v.items.forEach((b, j) => {
          if (j > i && dist(a, b) < 65) collisions++;
        }),
      );
      const blocked = v.items.filter((p) => p.x < 260 && p.y > 310).length;
      score = clamp(
        25 +
          near(angle(sofa.r, facing), 0, 180) * 0.2 +
          near(angle(tv.r, tvFacing), 0, 180) * 0.15 +
          near(dist(sofa, table), 130, 190) * 0.2 +
          near(dist(sofa, tv), 280, 300) * 0.2 -
          collisions * 14 -
          blocked * 18,
      );
      break;
    }
    case "touch":
      score = clamp(
        Math.min(1, v.size / 44) * 55 +
          (v.gap >= v.size + 8 ? 25 : 0) +
          (v.gap * 3 + v.size <= (t.compact ? 230 : 360) ? 20 : 0),
      );
      break;
    case "chart": {
      const distances = v.colors.flatMap((a, i) =>
        v.colors
          .slice(i + 1)
          .map((b) => Math.hypot(...rgb(a).map((x, k) => x - rgb(b)[k]))),
      );
      score =
        (new Set(v.styles).size / 3) * 70 +
        Math.min(30, Math.min(...distances) * 80);
      break;
    }
    case "flow":
      score = v.order.reduce((s, x, i) => s + (x === i ? 20 : 0), 0);
      break;
    case "route": {
      const pts = [{ x: 140, y: 350 }, ...v.points, { x: 660, y: 150 }];
      let blocked = false,
        length = 0;
      for (let i = 1; i < pts.length; i++) {
        length += dist(pts[i], pts[i - 1]);
        for (let k = 0; k <= 60; k++) {
          const x = pts[i - 1].x + ((pts[i].x - pts[i - 1].x) * k) / 60,
            y = pts[i - 1].y + ((pts[i].y - pts[i - 1].y) * k) / 60;
          if (
            (x > 280 && x < 350 && y > 105 && y < 340) ||
            (x > 450 && x < 520 && y > 240 && y < 450)
          )
            blocked = true;
        }
      }
      score = v.points.length
        ? blocked
          ? 20
          : clamp(100 - Math.max(0, length - 640) / 8)
        : 0;
      break;
    }
    case "group": {
      let within = 0,
        between = 0;
      v.pieces.forEach((p, i) =>
        v.pieces.forEach((q, j) => {
          if (i < j) {
            if (i % 3 === j % 3) within += dist(p, q);
            else between += dist(p, q);
          }
        }),
      );
      score = clamp((between / 27 - within / 9) / 2 + 40);
      break;
    }
    case "responsive":
      score =
        (near(v.image, 115, 180) + near(v.size, 20, 20) + near(v.gap, 16, 30)) /
        3;
      break;
    case "icons":
      score = (near(v.stroke, 3, 7) + near(v.radius, 14, 22)) / 2;
      break;
    case "tiles":
      score = v.rotations.reduce(
        (s, r, i) => s + near(angle(r, [90, 180, 0, 270][i]), 0, 180) / 4,
        0,
      );
      break;
    case "capstone":
      score = posterScore(v, true);
      break;
    default:
      score = 0;
  }
  return Math.round(clamp(score));
}

export function buildReport(answers) {
  const evidence = tasks
    .filter((t) => answers[t.id]?.submitted)
    .map((t) => ({ ...t, score: scoreTask(t, answers[t.id].value) }));
  const scores = dimensions.map((name, i) => {
    const items = evidence.filter((t) => t.dimension === i);
    return {
      name,
      count: items.length,
      score: items.length
        ? Math.round(items.reduce((s, t) => s + t.score, 0) / items.length)
        : null,
      items,
    };
  });
  const measured = scores.filter((s) => s.score !== null);
  const overall = measured.length
    ? Math.round(measured.reduce((s, d) => s + d.score, 0) / measured.length)
    : 0;
  return {
    scores,
    overall,
    count: evidence.length,
    evidence,
    ranked: [...measured].sort((a, b) => b.score - a.score),
  };
}
