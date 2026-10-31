export const site = {
  name: "DEXAM — Design Exam Academy",
  origin: "https://designexam.com",
  phone: "+91 98342 26279",
  email: "inquiry@designexam.com",
  address:
    "101, Pallazo Building, next to Wisdom World School, Amanora Park Town, Pune 411028",
  maps: "https://www.google.com/maps/search/?api=1&query=Design+Exam+Academy+Amanora+Pune",
};

export const programmes = [
  {
    id: "two-year",
    name: "The two-year journey.",
    label: "BUILD YOUR FOUNDATION",
    duration: "2 years",
    price: "₹1,13,557",
    art: "build",
    for: "For early starters who want space to explore.",
    description:
      "Make creative thinking a habit. Build a broad foundation in the first year, then bring it into focused entrance preparation.",
    points: [
      "Drawing, observation & visual thinking",
      "A gradual foundation alongside school",
      "Exam practice, review & personal feedback",
      "Portfolio habits and preparation planning",
    ],
    note: "Room to discover. Time to get good.",
  },
  {
    id: "one-year",
    name: "The one-year focus.",
    label: "BRING IT ALL TOGETHER",
    duration: "1 year",
    price: "₹73,535",
    art: "target",
    for: "For students ready for a focused preparation year.",
    description:
      "Connect the fundamentals with your exam. Practise with purpose, review your decisions, and build a consistent preparation routine.",
    points: [
      "Foundation and exam-specific preparation",
      "Timed papers and structured review",
      "Personal mentoring and study planning",
      "Studio-test & portfolio guidance where relevant",
    ],
    note: "A clear direction. A deliberate routine.",
  },
];

export const exams = [
  {
    id: "nid",
    name: "NID DAT",
    subtitle: "Think beyond the obvious.",
    degree: "B.Des / M.Des",
    art: "product",
    color: "peach",
    intro:
      "A design path built around observation, ideas, making and communicating. Explore the National Institute of Design admission process, then practise seeing everyday problems differently.",
    skills: [
      "Observation",
      "Idea generation",
      "Drawing",
      "Visual storytelling",
    ],
    practice:
      "Choose an everyday object. Draw three ways it could work better for a different user. Show the problem before you show the solution.",
    focus: "Open-ended design responses",
    source: "https://admissions.nid.edu/",
    sourceName: "NID Admissions",
    steps: [
      "Observe ordinary objects and real situations.",
      "Generate several possible answers before choosing one.",
      "Communicate an idea through drawings and concise notes.",
      "Use the current admission handbook to plan stage-specific preparation.",
    ],
  },
  {
    id: "uceed",
    name: "UCEED",
    subtitle: "See the logic in the visual.",
    degree: "Undergraduate design",
    art: "geometry",
    color: "sage",
    intro:
      "The Undergraduate Common Entrance Examination for Design opens a route to B.Des programmes at participating institutes. Preparation brings visual reasoning, observation and drawing into the same conversation.",
    skills: ["Visual reasoning", "Spatial thinking", "Observation", "Drawing"],
    practice:
      "Look at a folded package. Sketch its flat net, then fold your sketch mentally. Which edges meet? Check with a paper model.",
    focus: "Visual and analytical reasoning",
    source: "https://www.uceed.iitb.ac.in/2027/",
    sourceName: "UCEED · IIT Bombay",
    steps: [
      "Build fluency in visual and spatial problems.",
      "Develop a sketching routine alongside analytical practice.",
      "Use past papers to notice recurring demands, not memorise answers.",
      "Check exam eligibility and each institute’s admission eligibility separately.",
    ],
  },
  {
    id: "nift",
    name: "NIFT",
    subtitle: "Turn a point of view into form.",
    degree: "Fashion & design",
    art: "fashion",
    color: "pink",
    intro:
      "Explore fashion, textiles, accessories and visual communication through the NIFT route. Creative work and aptitude preparation need different kinds of practice; your chosen programme determines the route.",
    skills: ["Colour", "Composition", "Creative response", "Aptitude"],
    practice:
      "Choose a local festival. Build a six-colour palette and three small motifs inspired by its objects, movement and textures. Explain your choices visually.",
    focus: "Creative ability and aptitude",
    source: "https://www.nift.ac.in/admission",
    sourceName: "NIFT Admissions",
    steps: [
      "Understand the route for the exact programme you want.",
      "Practise colour, composition and idea development.",
      "Build a separate routine for aptitude and communication.",
      "Refer to the current official notice for selection stages and requirements.",
    ],
  },
  {
    id: "nata",
    name: "NATA",
    subtitle: "Imagine the space around you.",
    degree: "Architecture",
    art: "space",
    color: "sand",
    intro:
      "The National Aptitude Test in Architecture is part of the architecture admissions landscape. Explore space, scale and visualisation, and confirm the requirements of the colleges you are considering.",
    skills: [
      "Spatial ability",
      "Scale & proportion",
      "Visualisation",
      "Composition",
    ],
    practice:
      "Draw the same corner of your room from two viewpoints. Keep the proportions consistent and mark the route a person takes through the space.",
    focus: "Architecture aptitude",
    source: "https://www.nata.in/",
    sourceName: "NATA · Council of Architecture",
    steps: [
      "Observe buildings through proportion, rhythm and scale.",
      "Practise spatial reasoning and visual communication.",
      "Connect drawings with how people move and use a space.",
      "Verify current eligibility and the college-specific admission process.",
    ],
  },
  {
    id: "ceed",
    name: "CEED",
    subtitle: "Bring your thinking into focus.",
    degree: "Postgraduate design",
    art: "curve",
    color: "blue",
    intro:
      "The Common Entrance Examination for Design is a postgraduate design examination. It combines aptitude with design, drawing and communication, followed by institute-specific admission requirements.",
    skills: ["Design thinking", "Drawing", "Reasoning", "Communication"],
    practice:
      "Redesign a public sign for a person who does not read the local language. Test whether your symbols communicate without an explanation.",
    focus: "Aptitude and design communication",
    source: "https://www.ceed.iitb.ac.in/2027/",
    sourceName: "CEED · IIT Bombay",
    steps: [
      "Read the current eligibility rules before planning your preparation.",
      "Balance aptitude practice with drawing and written communication.",
      "Review the clarity of the idea as carefully as the finish of the sketch.",
      "Plan institute applications separately; qualifying is not an admission offer.",
    ],
  },
];

export const disciplines = [
  {
    id: "product",
    name: "Product & industrial",
    art: "product",
    question: "Why does this handle feel right?",
    text: "Think about objects, materials, manufacturing and the people who use them.",
    exercise:
      "Pick a mug. Sketch a version for someone with limited grip. What would you change first?",
  },
  {
    id: "communication",
    name: "Visual communication",
    art: "poster",
    question: "What catches your eye first?",
    text: "Shape how information feels and flows through type, colour, images and motion.",
    exercise:
      "Make a poster using only one word, one shape and two colours. Does it still have a clear focal point?",
  },
  {
    id: "interaction",
    name: "Interaction & digital",
    art: "interface",
    question: "What should happen next?",
    text: "Design useful digital experiences, from the first tap to the final result.",
    exercise:
      "Choose a confusing app screen. Remove one decision and explain what becomes easier.",
  },
  {
    id: "fashion",
    name: "Fashion & textiles",
    art: "fashion",
    question: "What can a material become?",
    text: "Explore form, movement, texture, clothing and the stories materials can tell.",
    exercise:
      "Choose three textures from your neighbourhood. Translate them into a small repeat pattern.",
  },
  {
    id: "space",
    name: "Spatial & interior",
    art: "space",
    question: "How does this room make you feel?",
    text: "Explore how people move, gather and feel in the spaces around them.",
    exercise:
      "Move one piece of furniture in a room. Notice what happens to movement, light and balance.",
  },
];

export const articles = [
  {
    slug: "design-after-class-10",
    category: "START HERE",
    title: "Design after Class 10: what should you explore?",
    art: "build",
    minutes: 5,
    summary: "Make space for curiosity before making a big career decision.",
    sections: [
      [
        "Notice what you return to.",
        "Keep a small collection of things you enjoy noticing: objects, clothes, interfaces, buildings, signs or stories. Write down why they caught your attention. The reason is more useful than a label such as “creative”.",
      ],
      [
        "Try a week of small experiments.",
        "Redesign a school timetable. Draw an object from memory, then from observation. Arrange a room on paper. Make a poster using two colours. Different exercises reveal different interests; none needs expensive software.",
      ],
      [
        "Separate your subject choice from an exam assumption.",
        "Before choosing school subjects, check the current eligibility rules for the programmes and institutes you might want later. The ability to appear for an examination and eligibility for a specific college can be different.",
      ],
      [
        "Give yourself a next experiment.",
        "Choose one skill to practise for four weeks. Keep your first and last attempts. Compare the decisions you make, the mistakes you notice and how willingly you return to the work.",
      ],
    ],
    related: ["drawing-vs-design", "build-a-design-practice"],
  },
  {
    slug: "drawing-vs-design",
    category: "DESIGN DECODED",
    title: "Good at drawing? Curious about design?",
    art: "sketch",
    minutes: 4,
    summary:
      "Drawing helps you communicate. Design asks what is worth communicating.",
    sections: [
      [
        "Drawing is one way to think.",
        "A sketch can explain a shape, a mechanism or a situation. It can be rough and still be useful. Practise making the idea understandable before worrying about a beautiful finish.",
      ],
      [
        "Design adds purpose and constraints.",
        "A well-drawn chair might still be uncomfortable. A striking poster might hide the date. Ask who will use the thing, what they need to do, and what could get in the way.",
      ],
      [
        "Try the same brief twice.",
        "Draw a water bottle. Then redesign it for a child carrying it to school. Notice which decisions change: size, opening, grip, cleaning, weight and how it fits in a bag.",
      ],
      [
        "Practise both, together.",
        "Use drawing to compare alternatives and explain trade-offs. Keep an observation sketchbook, but also add a question to each page: what would make this work better?",
      ],
    ],
    related: ["design-after-class-10", "portfolio-that-shows-thinking"],
  },
  {
    slug: "build-a-design-practice",
    category: "PRACTICE NOTES",
    title: "A small daily practice beats a blank sketchbook.",
    art: "practice",
    minutes: 5,
    summary:
      "A repeatable 20-minute routine for observation, ideas and reflection.",
    sections: [
      [
        "Five minutes: look closely.",
        "Choose an ordinary object. Notice its proportions, joints, shadows and signs of use. Draw what you can see, not the simplified symbol your memory supplies.",
      ],
      [
        "Ten minutes: make alternatives.",
        "Give the object a new user or context. Generate three possibilities. Change one constraint at a time so you can see why each alternative is different.",
      ],
      [
        "Five minutes: review a decision.",
        "Circle one successful choice and one confusing choice. Write a sentence about each. Tomorrow, revisit the confusing part with a fresh attempt.",
      ],
      [
        "Keep a weekly comparison.",
        "Save your work by date. Once a week, compare two attempts at a similar brief. Look for clearer ideas, stronger observation and more deliberate choices rather than a single “perfect” result.",
      ],
    ],
    related: ["drawing-vs-design", "review-a-previous-year-paper"],
  },
  {
    slug: "review-a-previous-year-paper",
    category: "EXAM PRACTICE",
    title: "The paper is only half the practice.",
    art: "papers",
    minutes: 4,
    summary: "Turn a timed attempt into a useful plan for the next one.",
    sections: [
      [
        "Attempt before reading an answer.",
        "Use the paper’s own instructions for timing and allowed materials. Record where you guessed or became stuck. Do not let a remembered solution stand in for a fresh attempt.",
      ],
      [
        "Name the cause of the mistake.",
        "Was it an observation error, a misunderstood instruction, a missing concept, a weak sketch or time pressure? A topic label alone does not explain what to change.",
      ],
      [
        "Rebuild one response.",
        "Choose one weak answer and try it again without the timer. Explain the decisions behind the new response. For open-ended work, compare clarity, relevance and alternatives rather than looking for one model drawing.",
      ],
      [
        "Make the next session smaller.",
        "Practise a few problems that address the cause you identified. Return to a full timed attempt later. Repeating papers without review can repeat the same mistake.",
      ],
    ],
    related: ["build-a-design-practice", "portfolio-that-shows-thinking"],
  },
  {
    slug: "portfolio-that-shows-thinking",
    category: "PORTFOLIO NOTES",
    title: "Show your thinking, not just the finished thing.",
    art: "portfolio",
    minutes: 5,
    summary: "Build a record of observations, alternatives and decisions.",
    sections: [
      [
        "Start with the question.",
        "What did you notice? Who was the work for? What constraint made the brief interesting? Give a viewer enough context to understand the choices that follow.",
      ],
      [
        "Keep the useful middle.",
        "Include selected rough sketches, alternatives and prototypes. Show a change in direction and what caused it. A portfolio is stronger when the process supports the outcome rather than decorates it.",
      ],
      [
        "Explain what you actually did.",
        "Label collaborative work and your own contribution clearly. Credit reference material. Choose a few projects you can discuss honestly and in detail instead of filling pages with unexplained outputs.",
      ],
      [
        "Check the specific submission requirements.",
        "Institutes and programmes can ask for different formats and evidence. Follow the current official brief. A general portfolio exercise is preparation, not a substitute for the required submission.",
      ],
    ],
    related: ["drawing-vs-design", "build-a-design-practice"],
  },
];

export const faqs = [
  [
    "Do I need to be good at drawing already?",
    "You can start by observing and making simple sketches. Drawing, visual reasoning and design communication improve with practice and feedback. A counselling conversation helps us understand where you are starting.",
  ],
  [
    "Which exam should I prepare for?",
    "Start with the discipline and degree you want to explore, then compare exam and institute requirements. NID DAT, UCEED, NIFT, NATA and CEED do not lead to identical programmes.",
  ],
  [
    "Can I explore before choosing a course?",
    "Yes. Try the free Design Instinct assessment, explore the guides and papers, or request a counselling conversation with a parent or guardian.",
  ],
  [
    "Where is the DEXAM studio?",
    "Our listed studio is at 101, Pallazo Building, next to Wisdom World School, Amanora Park Town, Pune 411028. Contact us to arrange a visit and confirm current batch timings.",
  ],
  [
    "Are mock tests and portfolio packages available separately?",
    "Separate mock-test, All-India test-series and portfolio/studio-test offerings are in preparation. Enquire about availability; their schedules, access and fees will be confirmed separately.",
  ],
];
