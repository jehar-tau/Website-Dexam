// Original teaching prompts. References are optional further study, not scoring
// authorities. Keep diagnosis tied to submitted evidence, never to personality.
const sources = {
  colour: {
    title: "Explore colour relationships",
    publisher: "Adobe Color",
    href: "https://color.adobe.com/create/color-wheel",
  },
  contrast: {
    title: "See how contrast changes readability",
    publisher: "W3C WAI",
    href: "https://www.w3.org/WAI/perspectives/contrast.html",
  },
  type: {
    title: "Look closely at letter spacing",
    publisher: "Practical Typography",
    href: "https://practicaltypography.com/kerning.html",
  },
  reading: {
    title: "Compare line-spacing examples",
    publisher: "Practical Typography",
    href: "https://practicaltypography.com/line-spacing.html",
  },
  grouping: {
    title: "Explore figure, ground and grouping",
    publisher: "OpenStax",
    href: "https://openstax.org/books/psychology-2e/pages/5-6-gestalt-principles-of-perception",
  },
  usability: {
    title: "Study everyday interface decisions",
    publisher: "W3C WAI",
    href: "https://www.w3.org/WAI/tips/designing/",
  },
  process: {
    title: "Make, test and improve an idea",
    publisher: "Design Council",
    href: "https://www.designcouncil.org.uk/resources/the-double-diamond/",
  },
};

const curriculum = {
  Balance: {
    title: "Make the empty space work.",
    art: "balance",
    why: "Visual weight and breathing room help a composition feel deliberate and guide where someone looks.",
    study: [
      "Visual weight: how size, darkness and position affect emphasis.",
      "Negative space and optical centring: judge the gaps as well as the objects.",
    ],
    notice:
      "Look at a shop window or a shelf. Find the heaviest-looking object. Notice how the empty space and smaller objects balance it.",
    today:
      "Arrange three household objects on a table. Make one arrangement feel calm and another feel energetic. Photograph both from the same position.",
    reflect:
      "Where does your eye land first? What changes if you remove one object?",
    brief:
      "Make six thumbnail compositions using one circle, one rectangle and one triangle. Vary their size and position; choose two to refine.",
    output:
      "Six small studies and two revised compositions, with one sentence explaining each choice.",
    check:
      "Show the two versions to someone. Ask what draws their eye and whether any element feels stranded. Use the response to make one revision.",
    resources: [sources.grouping],
  },
  Observation: {
    title: "Notice the rule behind the detail.",
    art: "pattern",
    why: "Careful looking helps you recognise structure, spot exceptions and describe a design decision precisely.",
    study: [
      "Repetition and variation: identify what stays constant.",
      "Figure and ground, similarity and proximity: how a scene becomes groups.",
    ],
    notice:
      "On your usual route, choose a gate, pavement or railing. Describe its repeating rule and find one exception you would normally miss.",
    today:
      "Look at a pattern for 30 seconds, hide it, and sketch it from memory. Compare the direction, spacing and number of parts.",
    reflect: "Which detail did you assume instead of actually seeing?",
    brief:
      "Collect five everyday patterns. Reconstruct three with simple shapes, then introduce one intentional variation in each.",
    output:
      "A page of five observed patterns and three annotated reconstructions.",
    check:
      "Compare each reconstruction against its source. Mark specific differences and correct them before adding detail.",
    resources: [sources.grouping],
  },
  Colour: {
    title: "See lightness before choosing colour.",
    art: "colour",
    why: "Lightness creates separation and emphasis. Colour relationships help a palette feel intentional once that structure is clear.",
    study: [
      "Hue, saturation and value: name which property you are changing.",
      "Lightness contrast, colour relationships and a dominant/supporting/accent palette.",
    ],
    notice:
      "Choose a shop sign, food packet or street poster. Squint at it, then view a photo in greyscale. Notice which part still stands out.",
    today:
      "Find five surfaces around you, from darkest to lightest. Sketch five matching grey swatches before adding any hue.",
    reflect:
      "Did the brightest colour also look lightest in greyscale? What made the focal point stand out?",
    brief:
      "Build a five-step greyscale study. Apply two different colour relationships to the same small poster while keeping its light/dark structure.",
    output: "One value study and two palette versions of the same poster.",
    check:
      "Remove the colour from both versions. Ask someone what they see first. Revise until your intended focal point remains clear.",
    resources: [sources.colour, sources.contrast],
  },
  Typography: {
    title: "Give the words a clearer rhythm.",
    art: "type",
    why: "Spacing, alignment and readable proportions make text easier to follow before a reader notices the typeface.",
    study: [
      "Optical letter spacing, shared edges and consistent margins.",
      "Line spacing and line length: compare them at the size people will actually read.",
    ],
    notice:
      "Read a menu, medicine carton or bus-stop sign. Notice where you hesitate. Follow the left edges and compare the gaps between letters and lines.",
    today:
      "Photograph two signs using similar words. Trace the text edges and circle any gap that looks unusually tight or wide.",
    reflect:
      "Which version is easier to read, and which specific spacing decision helps?",
    brief:
      "Set a short menu in two layouts using one typeface. Change alignment, letter spacing and paragraph spacing one at a time.",
    output:
      "Two menu layouts and one revised version, shown at actual reading size.",
    check:
      "Ask someone to find one item and its price. Note where their eyes pause, then revise spacing or alignment and try again.",
    resources: [sources.type, sources.reading],
  },
  Hierarchy: {
    title: "Give the eye a clear first step.",
    art: "layout",
    why: "A clear focal point and reading order help someone find the message without searching through every element.",
    study: [
      "Scale, contrast and position as tools for emphasis.",
      "Framing, cropping and space around a subject.",
    ],
    notice:
      "Look at three posters on your way somewhere. Give each a three-second glance. Notice the first thing you read, then the second.",
    today:
      "Sketch a poster you just saw as only three blocks: headline, image and details. Change one block to make the message clearer.",
    reflect:
      "Could you identify the event and the next action without reading everything?",
    brief:
      "Design a poster for a small event using a headline, a date and one image. Make three thumbnail layouts and refine two.",
    output:
      "Three thumbnails, two poster versions and a note about the intended reading order.",
    check:
      "Show a version for three seconds. Ask what someone remembers first and what action they would take. Compare that with your intention.",
    resources: [sources.grouping, sources.process],
  },
  "Spatial reasoning": {
    title: "Think through the space, then draw it.",
    art: "space",
    why: "Orientation, depth and clear routes help you move from a flat sketch to a usable arrangement.",
    study: [
      "Silhouette, rotation and perspective: compare the same object from different views.",
      "Sightlines, movement routes and usable clearance around objects.",
    ],
    notice:
      "Walk into a café or waiting room. Trace the path from the entrance to a seat. Notice a useful sightline and one awkward obstruction.",
    today:
      "Sketch one chair from the front, side and above. Then sketch where you would place it in a small room and draw the route past it.",
    reflect:
      "What changes when you rotate the chair? Which part of the route becomes easier or harder?",
    brief:
      "Draw two arrangements of one small room. Mark the entrance, walking route and sightlines; make a simple folded-paper model to compare them.",
    output: "Two annotated room plans and a quick paper model.",
    check:
      "Ask someone to trace a journey through both plans. Compare their route with yours and revise the crowded area.",
    resources: [sources.process],
  },
  Usability: {
    title: "Make the next action easier.",
    art: "interface",
    why: "Good design helps a person recognise an action, reach it and understand what happens next.",
    study: [
      "Grouping, action order and visible feedback.",
      "Comfortable targets, clear labels and information that works without colour alone.",
    ],
    notice:
      "Watch yourself use a ticket machine, payment screen or lift panel. Notice the moment you search, hesitate or tap twice.",
    today:
      "Write down one small frustration from an everyday interaction. Sketch a simpler sequence and label the action at each step.",
    reflect:
      "Could another person understand the next action without you explaining it?",
    brief:
      "Redesign a three-step everyday interaction on paper. Test it with another person, observe their hesitation and revise one step.",
    output:
      "A three-step paper prototype, a short observation note and one revision.",
    check:
      "Give someone a goal and let them try the prototype. Record where they pause; check whether your revision removes that hesitation.",
    resources: [sources.usability, sources.process],
  },
  "Visual systems": {
    title: "Let related things feel related.",
    art: "pattern",
    why: "A small set of consistent rules helps many elements feel like one family, even as the format changes.",
    study: [
      "Shared stroke, shape, corner treatment and spacing.",
      "Responsive hierarchy: keep the message clear while changing the layout.",
    ],
    notice:
      "Find a family of icons on a station sign or an app. Compare their stroke, corners and empty space. Notice which one feels different.",
    today:
      "Sketch four icons for familiar objects using one stroke weight and one corner style. Compare them as a group.",
    reflect:
      "Could someone recognise that the icons belong together without a shared colour?",
    brief:
      "Create six icons and one information card. Adapt the card to a phone, a tablet and a poster using the same visual rules.",
    output:
      "A six-icon family and three versions of one card, with the rules written beside them.",
    check:
      "Look at all versions together. Ask someone to identify an outlier, then check whether it breaks one of your stated rules.",
    resources: [sources.usability, sources.grouping],
  },
  Adaptation: {
    title: "Keep the message as the space changes.",
    art: "layout",
    why: "Adapting a design means protecting its purpose while rethinking scale, fit and what can be removed.",
    study: [
      "Content priority, containment and readable proportions.",
      "Simplification: preserve the essential message and usable actions.",
    ],
    notice:
      "Compare the same announcement on a phone and a large display. Notice what moves, shrinks or disappears and whether the main message survives.",
    today:
      "Redraw a small poster at half its width. Keep its headline, important detail and action easy to find.",
    reflect:
      "What did you remove, and did the message become clearer or weaker?",
    brief:
      "Adapt one event announcement into a poster, a phone card and a square tile. Keep the same message across all three.",
    output:
      "Three formats of one announcement and a short explanation of what changed.",
    check:
      "Show each at actual size. Ask someone to find the same information in every version and revise the least clear one.",
    resources: [sources.usability, sources.process],
  },
};

const topics = {
  balance: "visual weight",
  centre: "optical centring",
  spacing: "negative space",
  anomaly: "noticing exceptions",
  sequence: "pattern recognition",
  hue: "matching hues",
  saturation: "judging saturation",
  order: "ordering lightness",
  paint: "building a palette",
  harmony: "colour relationships",
  kerning: "optical letter spacing",
  alignment: "shared alignment",
  reading: "reading comfort",
  poster: "message hierarchy",
  crop: "framing",
  tangram: "assembling silhouettes",
  rotation: "mental rotation",
  perspective: "perspective",
  curve: "curve control",
  room: "spatial planning",
  touch: "touch area and fit",
  chart: "communicating without colour",
  flow: "action sequencing",
  route: "route clarity",
  group: "grouping",
  responsive: "layout consistency",
  icons: "family resemblance",
  tiles: "pattern continuity",
  capstone: "combining layout decisions",
};

const specificStudy = {
  anomaly: "Pattern rules: compare repeated details and explain an exception.",
  sequence:
    "Visual sequences: track changes in orientation, spacing and order.",
  order: "Value and lightness: build a smooth progression from dark to light.",
  harmony:
    "Complementary, analogous and triadic relationships on a colour wheel.",
  hue: "Hue: compare the colour family independently of lightness and intensity.",
  saturation: "Saturation: distinguish intensity from lightness.",
  paint:
    "Palette roles: use lightness to separate a focal point from its surroundings.",
  kerning: "Optical spacing: compare the shapes of the spaces between letters.",
  alignment: "Alignment: use a shared edge to organise separate text blocks.",
  reading: "Reading rhythm: compare line length and leading at actual size.",
  poster: "Hierarchy: use scale, position and contrast to lead the eye.",
  crop: "Framing: compare the subject, its direction and the space around it.",
  tangram:
    "Silhouettes: break an outline into shapes and compare their orientations.",
  rotation: "Mental rotation: track a distinctive edge across different views.",
  perspective:
    "Perspective: compare converging edges and a shared vanishing point.",
  curve:
    "Curves: connect endpoint tangents to the direction of control handles.",
  balance: "Visual weight: compare the effect of size, darkness and distance.",
  centre: "Optical centring: compare the surrounding empty space.",
  spacing:
    "Negative space: compare visible gaps between differently sized objects.",
  room: "Spatial planning: check facing, sightlines and a clear route through the room.",
  touch:
    "Touch area and fit: keep actions easy to reach and separate at phone size.",
  chart:
    "Redundant cues: distinguish information using shape, labels or patterns as well as colour.",
  flow: "Action sequencing: make the starting point, next step and completion clear.",
  route: "Route clarity: remove obstructions before shortening a journey.",
  group:
    "Proximity: distinguish spacing within a family from spacing between families.",
  responsive:
    "Responsive layout: preserve the message across different widths.",
  icons: "Icon families: keep stroke, corners and internal space consistent.",
  tiles:
    "Pattern continuity: follow how a line connects across neighbouring parts.",
  capstone:
    "Composition: combine readable scale, containment and a clear focal point.",
};

const observationTitles = {
  Balance: "Look between the objects.",
  Observation: "Find the small exception.",
  Colour: "Let a shop sign teach you.",
  Typography: "Read the spaces, too.",
  Hierarchy: "Give a poster three seconds.",
  "Spatial reasoning": "Follow the path through.",
  Usability: "Notice the hesitation.",
  "Visual systems": "Find the family resemblance.",
  Adaptation: "Watch what changes.",
};

const join = (items) =>
  items.length < 2
    ? items[0] || ""
    : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

export function buildCoachingProfile(report) {
  const priorities = report.priorities.map((skill, index) => {
    const guide = curriculum[skill.name];
    const focus = skill.focus;
    const strongest = [...skill.evidence].sort((a, b) => b.score - a.score)[0];
    const focusTopics = [...new Set(focus.map((t) => topics[t.kind]))];
    const stretch = skill.score >= 85;
    const diagnosis =
      skill.count === 1
        ? `This completed activity suggests exploring ${join(focusTopics)}. More activities will help refine the direction.`
        : stretch
          ? `Your decisions in this area were consistent in this attempt. Use ${join(focusTopics)} to stretch into a less familiar brief.`
          : strongest?.score >= 85 && focus[0]?.score < 85
            ? `You were more consistent with ${topics[strongest.kind]}. The next practice opportunity is ${join(focusTopics)}.`
            : `The least consistent decisions in this area involved ${join(focusTopics)}. Give these focused practice before adding complexity.`;
    return {
      ...guide,
      skill: skill.name,
      order: index + 1,
      stretch,
      diagnosis,
      evidenceNote:
        skill.count < 2
          ? "This is a provisional suggestion based on one completed activity."
          : "These suggestions describe this attempt and can change as you practise.",
      focusTopics,
      observationTitle: observationTitles[skill.name],
      resources: guide.resources.map((r) => ({ ...r })),
      study: [
        ...new Set(focus.map((t) => specificStudy[t.kind]).filter(Boolean)),
      ],
    };
  });
  const strengths = report.strengths.slice(0, 2).map((s) => s.name);
  const plan = report.complete
    ? priorities.map((p, i) => ({
        week: i + 1,
        skill: p.skill,
        title: p.title,
        study: p.study,
        notice: p.notice,
        make: p.brief,
        output: p.output,
        check: p.check,
        rhythm:
          "Try the daily 10-minute loop. On two days, spend another 20 minutes making and revising your weekly piece.",
      }))
    : [];
  if (plan.length)
    plan.push({
      week: 4,
      skill: "Bring it together",
      title: "One real brief. A thoughtful revision.",
      study: [
        "A simple design process: observe, define the problem, explore alternatives and test.",
      ],
      notice:
        "Choose a real communication problem at home, college or in your neighbourhood. Speak to one person who would use the design.",
      make: "Create one useful poster, menu or phone screen. Make two alternatives, ask for feedback and revise the clearer direction.",
      output:
        "A one-page brief, two alternatives, one revised design and three notes explaining what you changed.",
      check:
        "Ask someone to use the design without a walkthrough. Compare what they notice and do with your intention. Keep the first and final versions together.",
      rhythm:
        "Two 20-minute making sessions, a short feedback conversation and a 20-minute revision session.",
    });
  return {
    intro: priorities.length
      ? `${report.complete ? "Build" : "Begin building"} more consistency in ${join(priorities.map((p) => p.skill.toLowerCase()))}. Keep drawing on your more consistent areas: ${join(strengths.map((s) => s.toLowerCase()))}.`
      : "Complete a few activities to see a practice direction grounded in your own work.",
    priorities,
    strengths,
    plan,
    firstStep: priorities[0] || null,
    dailyLoop: [
      {
        minutes: 3,
        title: "Look with a question.",
        action:
          "Choose one real example connected to your current focus. Describe the decision before judging whether you like it.",
      },
      {
        minutes: 5,
        title: "Make one small change.",
        action:
          "Sketch, rearrange or recolour a quick version. Change one thing so you can see what caused the difference.",
      },
      {
        minutes: 2,
        title: "Leave yourself a note.",
        action:
          "Write what changed, what became clearer and one thing to try tomorrow. Keep the original beside the revision.",
      },
    ],
    reflection: [
      "What did I notice today that I normally overlook?",
      "Which design decision helped or confused me?",
      "What would I change, and how could I check that it helped?",
    ],
    progress:
      "Keep a small before-and-after folder. At the end of each week, explain one decision you now make more deliberately and ask someone to critique the work. Look for clearer choices and useful revisions; a higher repeat-test score alone can also reflect familiarity.",
    processResource: sources.process,
  };
}
