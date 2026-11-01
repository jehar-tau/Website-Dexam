import { articles, exams, site } from "./content.js";

const base = [
  [
    "/",
    "Design entrance coaching in Pune",
    "Design entrance preparation for curious minds. Explore DEXAM programmes, a free design aptitude assessment, exam guides and previous year papers.",
  ],
  [
    "/courses",
    "Design entrance preparation programmes",
    "Explore end-to-end design entrance preparation, studio test and interview prep, or standalone test series. Meet DEXAM in Pune to choose your programme.",
  ],
  [
    "/about",
    "A design academy for curious minds",
    "Meet DEXAM’s mentors and explore an approach to design entrance preparation built around observation, ideas, making and feedback.",
  ],
  [
    "/exams",
    "Explore NID, UCEED, NIFT, NATA and CEED",
    "Compare design and architecture exam routes, understand the skills to practise and find official admission information.",
  ],
  [
    "/resources",
    "Free design preparation resources",
    "Explore design practice notes, a visual aptitude assessment and previous year papers for NID, UCEED, NIFT, NATA and CEED.",
  ],
  [
    "/papers",
    "Design entrance previous year papers",
    "Explore available previous year papers and samples for NID DAT, UCEED, NIFT, NATA and CEED, plus a practical paper-review method.",
  ],
  [
    "/design-careers",
    "Explore the world of design careers",
    "Explore design disciplines at NID, IITs, Symbiosis, NMIMS, BITS Design School, FDDI and more. Compare exact programme names, study levels, campuses and sources.",
  ],
  [
    "/design-degrees",
    "NID, NIFT, UCEED and NATA: degrees and course durations",
    "Compare NID’s 5.5-year integrated pathway, M.Des, NIFT degrees, UCEED B.Des, CEED postgraduate study and five-year architecture programmes.",
  ],
  [
    "/design-colleges",
    "20 design colleges in India: public and private options",
    "Explore an editorial shortlist of 20 design colleges and campuses in India, with locations, admission routes and official sources.",
  ],
  [
    "/design-colleges/pune",
    "Design colleges in Pune: government and private options",
    "Compare ten design options in Pune, PCMC and Pune district, including RT-MSSU, MIT ID, SID, MIT-WPU and FLAME, with programme sources.",
  ],
  [
    "/design-colleges/uceed-nid",
    "Private colleges accepting UCEED and NID scores",
    "Read verified UCEED and NID score policies, 2027 admission examples, extra selection stages and clearly labelled earlier result-sharing references.",
  ],
  [
    "/architecture-colleges",
    "Top 20 architecture colleges in India: NIRF 2025",
    "Explore the official NIRF 2025 Architecture and Planning top 20, with cities and guidance on NATA, JEE and college admission routes.",
  ],
  [
    "/architecture-colleges/pune",
    "5 architecture colleges in Pune: B.Arch options",
    "Research five Pune and PCMC architecture colleges, including BKPS, BNCA, Bharati Vidyapeeth, Sinhgad and D Y Patil Akurdi, with source notes.",
  ],
  [
    "/guide",
    "A design career guide for students and parents",
    "A practical starting point for exploring design, understanding entrance routes and choosing a sustainable preparation timeline.",
  ],
  [
    "/design-coaching-pune",
    "Design entrance coaching in Amanora, Pune",
    "Explore DEXAM at Amanora Park Town, Pune. Find the studio, meet the preparation approach and arrange a counselling conversation.",
  ],
  [
    "/mock-tests",
    "Mock tests and design practice",
    "Explore DEXAM’s standalone test-series programme, free visual practice and previous year papers. Ask the team about exam options, schedules and access.",
  ],
  [
    "/results",
    "Design learning and visible progress",
    "Explore how observation, idea generation, communication and responses to feedback make progress visible in design preparation.",
  ],
  [
    "/contact",
    "Talk design with DEXAM",
    "Ask a course question, request free counselling or arrange a visit to Design Exam Academy at Amanora Park Town, Pune.",
  ],
  [
    "/student-access",
    "Your DEXAM learning space",
    "Find guidance on DEXAM student access and explore free resources while planning your design learning journey.",
  ],
  [
    "/privacy",
    "Privacy policy",
    "Read the DEXAM privacy policy and information about the collection and use of details shared through the website.",
  ],
  [
    "/terms",
    "Terms and conditions",
    "Read the terms and conditions for using the DEXAM website and academy services.",
  ],
];
export const routeMetadata = Object.fromEntries(
  [
    ...base,
    ...exams.map((e) => [
      `/exams/${e.id}`,
      `${e.name} preparation guide`,
      e.intro,
    ]),
    ...exams.map((e) => [
      `/papers/${e.id}`,
      `${e.name} previous year papers and samples`,
      `Explore the ${e.name} paper archive, available year papers and samples, and a practical method for reviewing your attempts.`,
    ]),
    ...articles.map((a) => [`/resources/${a.slug}`, a.title, a.summary]),
  ].map(([path, title, description]) => [path, { path, title, description }]),
);
export const publicPaths = [...Object.keys(routeMetadata), "/quiz"];
export function canonicalFor(path = "/") {
  const normalized = path.replace(/\/+$/, "") || "/";
  return site.origin + (normalized === "/" ? "/" : normalized + "/");
}
export function metadataFor(path) {
  return (
    routeMetadata[path.replace(/\/$/, "") || "/"] || {
      path,
      title: "Page not found",
      description:
        "Find your way back to DEXAM courses, exam guides and free design preparation resources.",
      noindex: true,
    }
  );
}
const organization = {
  "@type": "EducationalOrganization",
  "@id": `${site.origin}/#academy`,
  name: site.name,
  url: site.origin,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "101, Pallazo Building, Amanora Park Town",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411028",
    addressCountry: "IN",
  },
};

const website = {
  "@type": "WebSite",
  "@id": `${site.origin}/#website`,
  url: `${site.origin}/`,
  name: "DEXAM",
  alternateName: ["Design Exam Academy", "designexam.com"],
};

const pageLabels = {
  "/courses": "Programmes",
  "/about": "About",
  "/exams": "Exams",
  "/resources": "Resources",
  "/papers": "Previous year papers",
  "/design-careers": "Design careers",
  "/guide": "Design career guide",
  "/design-coaching-pune": "Design coaching Pune",
  "/mock-tests": "Mock tests",
  "/results": "Learning progress",
  "/contact": "Contact",
  "/student-access": "Student access",
  "/privacy": "Privacy policy",
  "/terms": "Terms and conditions",
};

export function breadcrumbsFor(path = "/") {
  const normalized = path.replace(/\/+$/, "") || "/";
  if (normalized === "/") return [];

  const examGuide = normalized.match(/^\/exams\/([^/]+)$/)?.[1];
  if (examGuide) {
    const exam = exams.find(({ id }) => id === examGuide);
    if (exam)
      return [
        ["DEXAM", "/"],
        ["Exams", "/exams"],
        [exam.name, normalized],
      ];
  }

  const paperArchive = normalized.match(/^\/papers\/([^/]+)$/)?.[1];
  if (paperArchive) {
    const exam = exams.find(({ id }) => id === paperArchive);
    if (exam)
      return [
        ["DEXAM", "/"],
        ["Resources", "/resources"],
        ["Previous year papers", "/papers"],
        [exam.name, normalized],
      ];
  }

  const articleSlug = normalized.match(/^\/resources\/([^/]+)$/)?.[1];
  if (articleSlug) {
    const article = articles.find(({ slug }) => slug === articleSlug);
    if (article)
      return [
        ["DEXAM", "/"],
        ["Resources", "/resources"],
        [article.title, normalized],
      ];
  }

  if (normalized === "/quiz")
    return [
      ["DEXAM", "/"],
      ["Resources", "/resources"],
      ["Design Instinct Test", normalized],
    ];

  if (normalized === "/papers")
    return [
      ["DEXAM", "/"],
      ["Resources", "/resources"],
      ["Previous year papers", normalized],
    ];

  return [
    ["DEXAM", "/"],
    [pageLabels[normalized] || metadataFor(normalized).title, normalized],
  ];
}

function breadcrumbData(path) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalFor(path)}#breadcrumb`,
    itemListElement: breadcrumbsFor(path).map(([name, item], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: canonicalFor(item),
    })),
  };
}

export function structuredDataFor(path = "/") {
  const normalized = path.replace(/\/+$/, "") || "/";
  if (normalized === "/") {
    return {
      "@context": "https://schema.org",
      "@graph": [website, organization],
    };
  }
  return {
    "@context": "https://schema.org",
    ...breadcrumbData(normalized),
  };
}
