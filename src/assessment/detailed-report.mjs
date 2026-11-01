import {
  buildReport,
  dimensions,
  tasks,
  VERSION,
  luminance,
  clone,
} from "./model.mjs";
import { buildCoachingProfile } from "./coaching.mjs";

export const REPORT_VERSION = "discovery-report-v2";
export const skillNotes = {
  Balance: {
    meaning:
      "How you distribute weight, find a centre and make space between objects.",
    practice:
      "Make five compositions from three shapes. Enlarge one shape, then rebalance the others without adding anything.",
    check:
      "View each composition small and upside down. Explain where the visual weight sits.",
  },
  Observation: {
    meaning:
      "How accurately you notice a visual exception and continue a sequence.",
    practice:
      "Look at a simple pattern for 30 seconds, hide it, then recreate it. Compare direction, spacing and order.",
    check:
      "Circle the differences before trying again. Keep the two versions side by side.",
  },
  Colour: {
    meaning:
      "How you match hue and intensity, order values and build separation within a palette.",
    practice:
      "Build five lightness steps in greyscale. Add hue afterwards, keeping a clear focal object and a restrained palette.",
    check:
      "Remove the colour again. Can you still distinguish the objects and the focal point?",
  },
  Typography: {
    meaning:
      "How you judge letter spacing, shared edges and readable text proportions.",
    practice:
      "Set one short word in three typefaces. Adjust letter spacing by eye, then set a short paragraph in two column widths.",
    check:
      "Read at actual size. Look for uneven word gaps, crowded lines and a difficult return to the next line.",
  },
  Hierarchy: {
    meaning:
      "How you establish a leading message and frame a subject with useful surrounding space.",
    practice:
      "Make three posters using one headline, a date and one image. Give each version a different focal point.",
    check:
      "Show each for three seconds. Ask someone what they noticed first and what they read next.",
  },
  "Spatial reasoning": {
    meaning:
      "How you transform shapes, judge perspective and arrange objects in space.",
    practice:
      "Arrange a small room in two ways. Draw the path through it, rotate the seating and check what faces what.",
    check:
      "Check the entrance, usable clearances and sightlines. Ask someone to trace a route without moving furniture.",
  },
  Usability: {
    meaning:
      "How you make targets, routes, groups and action sequences easier to use.",
    practice:
      "Find three controls that are difficult to tap. Redraw their touch areas, simplify their sequence and test on a phone.",
    check:
      "Ask another person to complete the action. Watch where they hesitate without explaining the interface.",
  },
  "Visual systems": {
    meaning:
      "How you keep related elements consistent and carry a layout across formats.",
    practice:
      "Draw six icons with one stroke, corner treatment and spacing system. Place the same card on three screen widths.",
    check:
      "Compare the family together. Check whether one icon or screen breaks the rules you chose.",
  },
  Adaptation: {
    meaning:
      "How you respond to a narrower space and bring several layout decisions together.",
    practice:
      "Repeat a composition at half its original width. Remove what you can while keeping the message and controls clear.",
    check:
      "Compare the versions at actual size. Check fit, separation and reading order, then ask for feedback.",
  },
};

// These describe the implemented rubric, including its limits. They do not
// convert a geometric match into a claim about talent or career suitability.
const rubrics = {
  balance: [
    "Reference match",
    "Placement relative to the model's balance point.",
    "Try a heavier-looking shape and compare the distance needed to rebalance it.",
    "This is a simplified weight model, not a complete model of visual balance.",
  ],
  centre: [
    "Reference match",
    "Distance from the triangle's reference centre.",
    "Compare the empty space around the dot before moving it again.",
    "One geometric centre does not represent every optical-centering problem.",
  ],
  spacing: [
    "Constraint checks",
    "Variation between the visible edge-to-edge gaps.",
    "Judge the empty gaps rather than the distances between shape centres.",
    "Equal gaps are this exercise's brief; intentionally uneven spacing can work elsewhere.",
  ],
  anomaly: [
    "Reference match",
    "Whether the selected tile is the exception in this pattern.",
    "Describe the repeated rule, then check one tile at a time.",
    "A single puzzle is a small sample of observation.",
  ],
  sequence: [
    "Reference match",
    "How many of the four tiles continue the reference sequence.",
    "Track orientation and spacing separately, then combine the rules.",
    "The exercise has one defined continuation; other pattern problems can be ambiguous.",
  ],
  hue: [
    "Reference match",
    "Angular difference from the reference hue on the colour wheel.",
    "Match the hue first, then compare intensity and lightness separately.",
    "Display settings, lighting and colour vision can affect a colour-matching result.",
  ],
  saturation: [
    "Reference match",
    "Difference from the reference saturation.",
    "Compare how vivid the inner circles look without judging their size or background.",
    "This is one colour in one context, and the display affects perception.",
  ],
  order: [
    "Reference match",
    "How far each swatch is from its position in the lightness sequence.",
    "Compare neighbouring swatches in greyscale before checking the whole sequence.",
    "This checks an ordered sequence, not whether a palette suits a real brief.",
  ],
  paint: [
    "Design proxy",
    "Coverage, lightness range, palette reuse and contrast between two defined regions.",
    "Choose a focal object, use lightness to separate it, then repeat a supporting colour.",
    "The formula does not judge mood, originality or artistic quality. It currently favours 3-5 distinct colours.",
  ],
  harmony: [
    "Reference match",
    "How close the outer hues are to the defined evenly spaced colour trio.",
    "Keep the three steps around the wheel equal, then compare the result.",
    "This tests a specified colour relationship, not a universal rule for beautiful palettes.",
  ],
  kerning: [
    "Design proxy",
    "Letter positions relative to a reference optical-spacing arrangement.",
    "Compare the shapes of the empty spaces, rather than making every numerical gap equal.",
    "A different typeface or acceptable optical solution needs its own expert-reviewed reference.",
  ],
  alignment: [
    "Constraint checks",
    "How closely the three blocks share the reference left edge.",
    "Choose one invisible edge and let all three blocks follow it.",
    "This checks one alignment brief, not the quality of every typographic arrangement.",
  ],
  reading: [
    "Design proxy",
    "Line-height ratio, column-width ratio and text size against the exercise's targets.",
    "Read at actual size. Adjust line spacing and column width together.",
    "The targets are simplified; reading comfort also depends on typeface, content and the reader.",
  ],
  poster: [
    "Design proxy",
    "Headline containment, scale and separation between its lines.",
    "Keep the headline contained and readable, then check the date and focal point at thumbnail size.",
    "This structural formula cannot judge originality or the complete visual hierarchy.",
  ],
  crop: [
    "Design proxy",
    "Horizontal framing and zoom relative to a reference composition.",
    "Keep the cyclist visible and compare the space in front of the direction of travel.",
    "Alternative good crops can differ from the single reference; vertical movement is not scored.",
  ],
  tangram: [
    "Reference match",
    "Piece positions and rotations against the silhouette, allowing identical pieces to swap.",
    "Solve one edge of the silhouette first, then rotate the remaining pieces into the gaps.",
    "This is a geometric assembly task, not a measure of general creative ability.",
  ],
  rotation: [
    "Reference match",
    "Angular difference from the reference orientation.",
    "Track one distinctive edge while you turn the object.",
    "One rotation is a limited sample of spatial reasoning.",
  ],
  perspective: [
    "Reference match",
    "Distance from the perspective construction's reference vanishing point.",
    "Extend the street edges in your mind and compare where they converge.",
    "The model uses a fixed construction, not a full perspective-drawing evaluation.",
  ],
  curve: [
    "Reference match",
    "Control-handle distances from the reference curve's handle positions.",
    "Check the tangent at each endpoint before adjusting the middle of the curve.",
    "It compares handle positions rather than measuring the full visible curve.",
  ],
  room: [
    "Design proxy",
    "Seating/TV direction, centre-to-centre distances, close-object pairs and the entrance zone.",
    "Trace the walking path first. Check the seating and TV direction before refining the furniture.",
    "Clearance and collisions are approximate. The rubric does not use resized furniture footprints or judge interior style.",
  ],
  touch: [
    "Constraint checks",
    "Target size, separation and whether the row fits the available width.",
    "Keep touch areas comfortable, separate and inside the screen; test the actual phone-sized result.",
    "The 44-unit exercise target is a rubric choice, not a complete accessibility certification.",
  ],
  chart: [
    "Constraint checks",
    "Line-style variety plus colour separation.",
    "Give every route a distinguishable line pattern, then check without colour.",
    "Style variety is a proxy; the formula is not a full colour-vision or chart-accessibility audit.",
  ],
  flow: [
    "Reference match",
    "How many screens occupy their position in the defined photo-sharing sequence.",
    "Find the starting action and completion state, then connect the steps between them.",
    "Real products can support more than one valid flow.",
  ],
  route: [
    "Constraint checks",
    "Sampled obstacle avoidance and total path length.",
    "Find a clear route first. Remove unnecessary turns only after the path is safe.",
    "Collision checks sample the path; this is not a production navigation or safety model.",
  ],
  group: [
    "Design proxy",
    "Distance within each intended family compared with distance between families.",
    "Reduce the space inside each family and increase the space between families.",
    "The formula knows the intended families; it does not infer all perceptual grouping cues.",
  ],
  responsive: [
    "Design proxy",
    "Image size, text scale and gap relative to the reference responsive setup.",
    "Inspect every width at actual size. Keep the content hierarchy consistent as space changes.",
    "Fixed reference ratios do not represent every good responsive layout.",
  ],
  icons: [
    "Reference match",
    "Stroke weight and corner radius relative to the neighbouring icons.",
    "Compare the family together. Adjust stroke and corner treatment as a pair.",
    "This checks two properties, not the clarity or meaning of an entire icon set.",
  ],
  tiles: [
    "Reference match",
    "Each tile's rotation relative to the continuous-line reference.",
    "Follow the line across one join at a time, then check the entire loop.",
    "It measures the specified pattern, not general systems-thinking ability.",
  ],
  capstone: [
    "Design proxy",
    "Headline containment, scale and line spacing in the final poster.",
    "Check the poster at thumbnail size, then make one change to improve its reading order.",
    "The score uses the structural poster formula. Accent hue, originality and audience response are not scored.",
  ],
};

const angle = (a, b) => Math.abs(((a - b + 540) % 360) - 180);
const fixed = (x, n = 0) => Number(x.toFixed(n));
function describe(t, v) {
  switch (t.kind) {
    case "hue":
      return [
        `Your hue ended ${fixed(angle(v.hue, 212))}° from the reference.`,
      ];
    case "saturation":
      return [
        `Your saturation ended ${fixed(Math.abs(v.saturation - 67))} percentage points from the reference.`,
      ];
    case "anomaly":
      return [
        v.selected === 17
          ? "You identified the exception in the pattern."
          : "The tile you selected was not the defined exception.",
      ];
    case "sequence":
    case "flow":
      return [
        `${v.order.filter((x, i) => x === i).length} of ${v.order.length} elements finished in their reference positions.`,
      ];
    case "order":
      return [
        `${v.order.filter((x, i) => x === i).length} of 6 swatches finished in their reference positions. The penalty also reflects how far a misplaced swatch moved.`,
      ];
    case "paint":
      return [
        `You painted ${v.painted.length} of 6 regions using ${new Set(v.colors).size} distinct colours.`,
        `The lightness range was ${fixed((Math.max(...v.colors.map(luminance)) - Math.min(...v.colors.map(luminance))) * 100)} percentage points.`,
      ];
    case "harmony":
      return [
        `The two outer hues ended ${fixed(angle(v.a, 138))}° and ${fixed(angle(v.b, 258))}° from their reference positions.`,
      ];
    case "alignment":
      return [
        `The widest difference between the three left edges was ${fixed(Math.max(...v.xs) - Math.min(...v.xs))} canvas units.`,
      ];
    case "reading":
      return [
        `Your line-height ratio was ${fixed(v.leading / v.size, 2)}; the exercise reference is 1.6.`,
        `Your column was ${fixed(v.width / v.size, 1)} text-size units wide; the reference is 28.`,
      ];
    case "touch":
      return [
        `Your targets were ${fixed(v.size)} units wide; ${v.size >= 44 ? "they met" : "they were below"} the exercise's 44-unit target.`,
        `${v.gap >= v.size + 8 ? "The minimum separation was met" : "The targets did not meet the minimum separation"}; the row ${v.gap * 3 + v.size <= (t.compact ? 230 : 360) ? "fit" : "overflowed"} the available width.`,
      ];
    case "chart":
      return [
        `You used ${new Set(v.styles).size} distinct line styles across three routes.`,
      ];
    case "icons":
      return [
        `Your stroke was ${v.stroke} and your corner radius was ${v.radius}; the reference values are 3 and 14.`,
      ];
    case "rotation":
      return [
        `The object ended ${fixed(angle(v.r, 45))}° from the reference orientation.`,
      ];
    case "tiles":
      return [
        `${v.rotations.filter((r, i) => angle(r, [90, 180, 0, 270][i]) === 0).length} of 4 tiles ended at their reference rotations.`,
      ];
    case "room":
      return [
        `Your saved arrangement contains ${v.items.length} furniture pieces. Direction, distance and approximate clearance checks contribute to its score.`,
      ];
    case "poster":
    case "capstone":
      return [
        `Your headline scale was ${fixed(v.scale, 2)}×; containment, scale and line separation contribute to the score.`,
        ...(t.kind === "capstone"
          ? ["Your accent hue was saved but did not affect this task's score."]
          : []),
      ];
    default:
      return [
        "This score was recalculated from your final submitted arrangement using the rule described below.",
      ];
  }
}

export function scoreLabel(score) {
  return score === null
    ? "Not measured"
    : score >= 85
      ? "Build on this"
      : score >= 60
        ? "Keep practising"
        : "Focus here";
}

export function buildDetailedReport(answers) {
  const base = buildReport(answers);
  const evidence = base.evidence.map((t) => {
    const [method, measures, next, limit] = rubrics[t.kind];
    const value = clone(answers[t.id].value);
    return {
      id: t.id,
      title: t.title,
      kind: t.kind,
      skill: dimensions[t.dimension],
      score: t.score,
      label: scoreLabel(t.score),
      method,
      measures,
      next,
      limit,
      observations: describe(t, value),
      value,
    };
  });
  const skills = base.scores.map((s) => ({
    name: s.name,
    score: s.score,
    count: s.count,
    possible: tasks.filter((t) => dimensions[t.dimension] === s.name).length,
    label: scoreLabel(s.score),
    ...skillNotes[s.name],
    evidence: evidence.filter((t) => t.skill === s.name),
  }));
  for (const skill of skills) {
    const ordered = [...skill.evidence].sort((a, b) => a.score - b.score);
    skill.focus = ordered.slice(0, 2);
    const lowest = ordered[0],
      highest = ordered.at(-1);
    skill.pattern = !lowest
      ? "There is no submitted evidence in this area yet."
      : ordered.length === 1
        ? `This area currently rests on one challenge: “${lowest.title}” (${lowest.score}/100).`
        : highest.score === lowest.score
          ? `Both the lowest and highest results in this area were ${lowest.score}/100 across ${ordered.length} challenges.`
          : `Your results varied: “${highest.title}” scored ${highest.score}/100, while “${lowest.title}” scored ${lowest.score}/100. Review those individual decisions alongside the average.`;
  }
  const ranked = skills
    .filter((s) => s.score !== null)
    .sort((a, b) => b.score - a.score);
  const priorities = [...ranked].reverse().slice(0, 3);
  const plan = priorities.map((s, i) => ({
    week: i + 1,
    skill: s.name,
    title: [
      "Separate the ingredients.",
      "Make one decision at a time.",
      "Build a repeatable habit.",
    ][i],
    exercise: s.practice,
    check: s.check,
    cadence:
      "Four 20-minute sessions: observe, make two versions, compare, then revise after feedback.",
    revisit: s.focus.map((t) => t.id),
    focus: s.focus.map((t) => ({
      id: t.id,
      title: t.title,
      score: t.score,
      next: t.next,
    })),
  }));
  if (plan.length)
    plan.push({
      week: 4,
      skill: "Bring it together",
      title: "One small brief. Two versions.",
      exercise:
        "Make a poster for a real local event. Include a headline, a date and one image. Make a second version after another person reviews it.",
      check:
        "Compare focal point, lightness, letter spacing and reading order. Keep both versions and explain three changes. Revisit the same assessment tasks to compare your own work, allowing for familiarity with them.",
      cadence:
        "Two making sessions, one feedback session and one revision session, about 20 minutes each.",
      revisit: [14, 30],
    });
  const report = {
    reportVersion: REPORT_VERSION,
    assessmentVersion: VERSION,
    overall: base.overall,
    count: base.count,
    complete: base.count === tasks.length,
    skills,
    evidence,
    strengths: ranked.slice(0, 3),
    priorities,
    plan,
    scoring:
      "Each submitted challenge receives a score from 0 to 100. Challenge scores are averaged within each skill and rounded. The overall score is the rounded, equally weighted average of the measured skill scores. Unsubmitted answers and unmeasured skills are excluded.",
    generation:
      "Generated locally from saved responses by versioned scoring rules and a fixed feedback library. No AI model or external report service is called. The same saved responses and scoring version produce the same report.",
    limitation:
      "These exercise rubrics have not been validated as a career or admissions assessment. The score is not a percentile, a probability of success or a measure of innate talent. Open design tasks use simplified proxies and need expert calibration. Consider your interests, sustained practice, student work and mentor feedback when exploring a design career.",
  };
  report.coaching = buildCoachingProfile(report);
  return report;
}
