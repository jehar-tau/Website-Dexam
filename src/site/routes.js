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
    "Explore the DEXAM one-year and two-year preparation programmes, confirmed programme fees, learning approach and counselling in Pune.",
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
    "Discover product, communication, interaction, fashion and spatial design through useful questions and small creative exercises.",
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
    "Explore free visual practice and previous year papers while DEXAM prepares its separate mock-test and All-India test-series offerings.",
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
export const organization = {
  "@context": "https://schema.org",
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
