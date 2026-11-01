import {
  additionalDisciplines,
  collegeProgrammes,
} from "./discipline-programmes.js";
const offer = (institution, level, campus, source, programme) => ({
  institution,
  level,
  campus,
  source,
  ...(programme ? { programme } : {}),
});
const N = (id, name, family, text, mastersCampus, integratedCampus) => ({
  id,
  name,
  family,
  text,
  offers: [
    ...(integratedCampus
      ? [offer("NID", "Integrated", integratedCampus, "nidIntegrated")]
      : []),
    ...(mastersCampus
      ? [offer("NID", "Postgraduate", mastersCampus, "nidMasters")]
      : []),
  ],
});

// Programme/campus labels follow the amended 2027 handbooks, which take
// precedence over older NID academic pages. Explanations are DEXAM's own copy.
export const designDisciplines = [
  N(
    "product",
    "Product Design",
    "Objects & mobility",
    "Shape useful everyday objects through form, materials, ergonomics and prototypes.",
    "Ahmedabad",
    "Ahmedabad",
  ),
  N(
    "ceramic-glass",
    "Ceramic & Glass Design",
    "Objects & mobility",
    "Explore how heat, material and making turn clay and glass into functional or expressive objects.",
    "Ahmedabad",
    "Ahmedabad",
  ),
  N(
    "transportation",
    "Transportation & Automobile Design",
    "Objects & mobility",
    "Work on vehicles and mobility experiences, balancing movement, proportion, people and context.",
    "Gandhinagar",
    "Gandhinagar",
  ),
  N(
    "animation",
    "Animation Film Design",
    "Communication & media",
    "Build moving stories through characters, timing, visual sequences and sound.",
    "Ahmedabad",
    "Ahmedabad",
  ),
  N(
    "film-video",
    "Film & Video Communication",
    "Communication & media",
    "Use the moving image to communicate a story, an observation or a point of view.",
    "Ahmedabad",
    "Ahmedabad",
  ),
  N(
    "communication",
    "Graphic Design",
    "Communication & media",
    "Make ideas readable through typography, images, identities, publications and visual systems.",
    "Ahmedabad",
    "Ahmedabad",
  ),
  N(
    "exhibition",
    "Exhibition Design",
    "Space & environments",
    "Create spatial stories through displays, objects, wayfinding and visitor journeys.",
    "Ahmedabad",
    "Ahmedabad",
  ),
  N(
    "space",
    "Furniture & Interior Design",
    "Space & environments",
    "Connect furniture, materials and human scale with how people use an interior.",
    "Ahmedabad",
    "Ahmedabad",
  ),
  N(
    "retail",
    "Design for Retail Experience",
    "Space & environments",
    "Shape the experience of discovering, choosing and interacting with products in retail spaces.",
    "Bengaluru",
    "Bengaluru",
  ),
  N(
    "textile",
    "Textile Design",
    "Fashion & materials",
    "Explore fibres, surfaces, patterns, colour and textile processes across different uses.",
    "Gandhinagar",
    "Ahmedabad",
  ),
  N(
    "apparel",
    "Apparel Design",
    "Fashion & materials",
    "Develop clothing through form, fit, material, movement and the lives of the people wearing it.",
    "Gandhinagar",
    "Gandhinagar",
  ),
  N(
    "lifestyle-accessory",
    "Lifestyle Accessory Design",
    "Fashion & materials",
    "Design wearable and everyday accessories through an understanding of use, material and culture.",
    "Gandhinagar",
    "Gandhinagar",
  ),
  N(
    "digital-game",
    "Digital Game Design",
    "Digital & experience",
    "Create playable worlds through rules, interaction, storytelling and player experience.",
    "Bengaluru",
    "Bengaluru",
  ),
  N(
    "interaction",
    "Interaction Design",
    "Digital & experience",
    "Research how people use systems, then prototype clearer, more useful interactions.",
    "Bengaluru",
    "Bengaluru",
  ),
  N(
    "information",
    "Information Design",
    "Communication & media",
    "Turn complex information into understandable structures, visualisations and experiences.",
    "Bengaluru",
    "Bengaluru",
  ),
  N(
    "photography",
    "Photography Design",
    "Communication & media",
    "Use photography as a way to observe, research and construct visual narratives.",
    "Ahmedabad",
  ),
  N(
    "toy-game",
    "Toy & Game Design",
    "Objects & mobility",
    "Explore play, learning, rules and physical objects for different ages and contexts.",
    "Gandhinagar",
  ),
  N(
    "new-media",
    "New Media Design",
    "Digital & experience",
    "Experiment with emerging media, technology and interactive forms of expression.",
    "Bengaluru",
  ),
  N(
    "design-futures",
    "Design Trends and Futures",
    "Strategy & society",
    "Investigate change and imagine possible futures for products, services and societies.",
    "Gandhinagar",
  ),
  N(
    "design-education",
    "Design Education",
    "Strategy & society",
    "Explore how design is taught, learned and practised. This NID M.Des has additional eligibility requirements.",
    "Gandhinagar",
  ),
  N(
    "strategic-management",
    "Strategic Design Management",
    "Strategy & society",
    "Connect design research and organisational strategy to decisions about products, services and businesses.",
    "Gandhinagar",
  ),
  N(
    "universal",
    "Universal Design",
    "Strategy & society",
    "Investigate barriers and develop more inclusive products, services and environments.",
    "Bengaluru",
  ),
  {
    id: "moving-images",
    name: "Design for Moving Images",
    family: "Communication & media",
    text: "Bring film and animation together to develop stories and communication through motion.",
    offers: [
      offer("NID Madhya Pradesh", "Integrated", "Bhopal", "nidIntegrated"),
    ],
  },
  {
    id: "product-innovation",
    name: "Product Design & Innovation",
    family: "Objects & mobility",
    text: "Explore problems, generate alternatives and develop useful product propositions through making and testing.",
    offers: [
      offer("NID Haryana", "Integrated", "Kurukshetra", "nidIntegrated"),
    ],
  },
  {
    id: "strategic-communication",
    name: "Strategic Communication Design",
    family: "Communication & media",
    text: "Connect a communication goal with audiences, messages, visual language and media choices.",
    offers: [
      offer("NID Haryana", "Integrated", "Kurukshetra", "nidIntegrated"),
    ],
  },
  {
    id: "digital-experience",
    name: "Digital Experience & Interaction Design",
    family: "Digital & experience",
    text: "Explore connected digital experiences through user research, interfaces and interactive prototypes.",
    offers: [
      offer("NID Haryana", "Integrated", "Kurukshetra", "nidIntegrated"),
    ],
  },
  {
    id: "textile-innovation",
    name: "Textile Innovation & Material Design",
    family: "Fashion & materials",
    text: "Investigate textile possibilities through materials, processes and experimental surface development.",
    offers: [
      offer("NID Haryana", "Integrated", "Kurukshetra", "nidIntegrated"),
    ],
  },
  {
    id: "fashion-apparel-lifestyle",
    name: "Fashion, Apparel & Lifestyle Design",
    family: "Fashion & materials",
    text: "Explore clothing and lifestyle products in relation to materials, people and changing contexts.",
    offers: [
      offer("NID Haryana", "Integrated", "Kurukshetra", "nidIntegrated"),
    ],
  },
  {
    id: "digital-futures",
    name: "Digital Design Futures",
    family: "Digital & experience",
    text: "Investigate how changing digital technologies could shape experiences and future design practice.",
    offers: [offer("NID Haryana", "Postgraduate", "Kurukshetra", "nidMasters")],
  },
  {
    id: "creative-leadership",
    name: "Creative Leadership",
    family: "Strategy & society",
    text: "Explore how creative practice can guide collaboration, organisations and change.",
    offers: [offer("NID Haryana", "Postgraduate", "Kurukshetra", "nidMasters")],
  },
  {
    id: "experience",
    name: "Experience Design",
    family: "Digital & experience",
    text: "Look across touchpoints to shape how people encounter and use a product, service or environment.",
    offers: [
      offer("NID Madhya Pradesh", "Postgraduate", "Bhopal", "nidMasters"),
    ],
  },
  {
    id: "care",
    name: "Design for Care",
    family: "Strategy & society",
    text: "Explore care-related needs and relationships through attentive, people-centred design inquiry.",
    offers: [
      offer("NID Madhya Pradesh", "Postgraduate", "Bhopal", "nidMasters"),
    ],
  },
  ...[
    [
      "fashion",
      "Fashion Design",
      "Develop clothing concepts through visual research, silhouettes, materials and collections.",
    ],
    [
      "accessory",
      "Accessory Design",
      "Explore accessories through function, craft, materials and relationships with the body.",
    ],
    [
      "fashion-communication",
      "Fashion Communication",
      "Communicate fashion through imagery, graphics, environments, styling and media.",
    ],
    [
      "fashion-interiors",
      "Fashion Interiors",
      "Explore textile-led interior experiences through surfaces, materials, furnishings and spatial expression.",
    ],
    [
      "knitwear",
      "Knitwear Design",
      "Develop knitted garments and products through structure, texture, technology and form.",
    ],
    [
      "leather",
      "Leather Design",
      "Explore leather products through material understanding, construction, function and styling.",
    ],
  ].map(([id, name, text]) => ({
    id,
    name,
    text,
    family: "Fashion & materials",
    offers: [
      offer(
        "NIFT",
        "Undergraduate",
        "Campus availability varies",
        "niftProspectus",
      ),
    ],
  })),
  {
    id: "ai-design",
    name: "AI-Enabled Design",
    family: "Digital & experience",
    text: "Explore AI as a design medium, considering human needs, responsible use and how intelligent systems behave.",
    offers: [
      offer("MIT Institute of Design", "Postgraduate", "Pune", "mitidAI"),
    ],
  },
  {
    id: "immersive",
    name: "Immersive Media Design",
    family: "Digital & experience",
    text: "Build experiences that involve presence, space and interaction across immersive media.",
    offers: [
      offer(
        "MIT Institute of Design",
        "Postgraduate",
        "Pune",
        "mitidImmersive",
      ),
    ],
  },
  {
    id: "automotive-clay",
    name: "Automotive Clay Sculpting",
    family: "Objects & mobility",
    text: "Translate vehicle forms into physical and digital models through specialist sculpting practice.",
    offers: [offer("MIT Institute of Design", "Diploma", "Pune", "mitidClay")],
  },
  {
    id: "computation",
    name: "Creative and Applied Computation",
    family: "Digital & experience",
    text: "Use code and computational thinking as creative tools for systems, expression and interaction.",
    offers: [
      offer(
        "Srishti Manipal",
        "Undergraduate",
        "Bengaluru",
        "srishtiComputation",
      ),
    ],
  },
  {
    id: "service-systems",
    name: "Business Service and Systems Design",
    family: "Strategy & society",
    text: "Explore relationships across services, organisations and systems, using research and design to propose change.",
    offers: [
      offer("Srishti Manipal", "Undergraduate", "Bengaluru", "srishtiSystems"),
    ],
  },
  {
    id: "human-centred",
    name: "Human Centered Design",
    family: "Strategy & society",
    text: "Investigate people's activities and contexts to develop thoughtful design responses through research and prototyping.",
    offers: [
      offer("Srishti Manipal", "Undergraduate", "Bengaluru", "srishtiHuman"),
    ],
  },
];

// Additional routes into an existing field; keep each institute's programme name.
const add = (id, ...offers) =>
  designDisciplines.find((d) => d.id === id).offers.push(...offers);
for (const id of [
  "product",
  "transportation",
  "communication",
  "interaction",
  "textile",
  "apparel",
])
  add(id, offer("NID Madhya Pradesh", "Integrated", "Bhopal", "nidIntegrated"));
add(
  "space",
  offer("NID Haryana", "Integrated", "Kurukshetra", "nidIntegrated"),
);
add(
  "textile",
  offer("NID Madhya Pradesh", "Postgraduate", "Bhopal", "nidMasters"),
  offer(
    "NIFT",
    "Undergraduate",
    "Campus availability varies",
    "niftProspectus",
  ),
);
add(
  "interaction",
  offer(
    "MIT Institute of Design",
    "Undergraduate",
    "Pune",
    "mitid",
    "User Experience Design",
  ),
  offer(
    "MIT Institute of Design",
    "Postgraduate",
    "Pune",
    "mitid",
    "User Experience Design",
  ),
);
add(
  "information",
  offer(
    "MIT Institute of Design",
    "Postgraduate",
    "Pune",
    "mitidInformation",
    "Information Design & Data Visualization",
  ),
);
add(
  "strategic-management",
  offer(
    "MIT Institute of Design",
    "Postgraduate",
    "Pune",
    "mitid",
    "Design Management",
  ),
);
// Broad undergraduate degrees are not invented specialisation lists.
designDisciplines.push(...additionalDisciplines);
for (const [institution, campus] of [
  ["IIT Bombay · IDC School of Design", "Mumbai"],
  ["IIT Delhi", "New Delhi"],
  ["IIT Guwahati", "Guwahati"],
  ["IIT Hyderabad", "Hyderabad"],
  ["IIT Indore", "Indore"],
  ["IIT Roorkee", "Roorkee"],
  ["IIITDM Jabalpur", "Jabalpur"],
])
  add(
    "multidisciplinary",
    offer(
      institution,
      "Undergraduate",
      campus,
      "uceedBrochure",
      "B.Des · broad undergraduate design programme",
    ),
  );
for (const college of collegeProgrammes) {
  for (const { field, note, ...programme } of college.programmes) {
    add(field, {
      ...offer(
        college.institution,
        programme.level,
        college.campus,
        college.source,
        programme.programme,
      ),
      ...(note ? { note } : {}),
    });
  }
}

export const disciplineInstitutions = [
  ...new Set(
    designDisciplines.flatMap((d) => d.offers.map((o) => o.institution)),
  ),
].sort((a, b) => a.localeCompare(b));

// Every active filter must match the same programme example. Returned offers
// also drive the card, so a postgraduate label cannot leak into an UG-only view.
export function matchingDisciplineOffers(
  discipline,
  {
    search = "",
    family = "All",
    level = "All",
    school = "All",
    institution = "All",
  } = {},
) {
  if (family !== "All" && family !== discipline.family) return [];
  const query = search.trim().toLocaleLowerCase();
  const fieldMatches =
    `${discipline.name} ${discipline.family} ${discipline.text}`
      .toLocaleLowerCase()
      .includes(query);
  return discipline.offers.filter(
    (o) =>
      (level === "All" || o.level === level) &&
      (institution === "All" || o.institution === institution) &&
      (school === "All" ||
        (school === "NID" && o.institution.startsWith("NID")) ||
        (school === "NIFT" && o.institution === "NIFT") ||
        (school === "IITs" && o.institution.startsWith("IIT ")) ||
        (school === "Symbiosis" &&
          o.institution === "Symbiosis Institute of Design") ||
        (school === "Mumbai region" && /Mumbai|Thane/i.test(o.campus))) &&
      (fieldMatches ||
        `${o.institution} ${o.campus} ${o.programme || ""}`
          .toLocaleLowerCase()
          .includes(query)),
  );
}

export const disciplineFamilies = [
  ...new Set(designDisciplines.map((d) => d.family)),
];
