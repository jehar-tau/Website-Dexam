import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { publicPaths, canonicalFor } from "../src/site/routes.js";
import { curriculum } from "../src/site/curriculum.js";

const designContract = JSON.parse(
  await readFile(
    new URL("../design-system.tokens.json", import.meta.url),
    "utf8",
  ),
);
const academyStyles = await readFile(
  new URL("../src/site/academy.css", import.meta.url),
  "utf8",
);
for (const [name, value] of Object.entries(designContract.colors)) {
  const websiteName =
    name === "--brand-paper" ? "--cream" : name.replace("--brand-", "--");
  assert.ok(
    academyStyles.includes(`${websiteName}: ${value};`),
    `Approved design token drift: ${name}`,
  );
}
for (const family of Object.values(designContract.fonts)) {
  assert.ok(
    academyStyles.includes(family),
    `Approved typeface missing: ${family}`,
  );
}

const titles = new Set(),
  descriptions = new Set();
let links = 0;
const socialImage = "https://designexam.com/assets/social/dexam-discovery-card.png";
for (const route of publicPaths) {
  const html = await readFile(
    new URL(
      `../dist${route === "/" ? "/" : route + "/"}index.html`,
      import.meta.url,
    ),
    "utf8",
  );
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(
    /<meta name="description" content="([^"]*)"/,
  )?.[1];
  assert.ok(title && !titles.has(title), `Unique title: ${route}`);
  titles.add(title);
  assert.ok(
    description && !descriptions.has(description),
    `Unique description: ${route}`,
  );
  descriptions.add(description);
  assert.ok(
    html.includes(`rel="canonical" href="${canonicalFor(route)}"`),
    `Canonical: ${route}`,
  );
  assert.ok(
    html.includes(`property="og:image" content="${socialImage}"`) &&
      html.includes('name="twitter:card" content="summary_large_image"') &&
      html.includes(`name="twitter:image" content="${socialImage}"`),
    `Social sharing metadata: ${route}`,
  );
  const schemaText = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1];
  assert.ok(schemaText, `Structured data: ${route}`);
  const schema = JSON.parse(schemaText);
  assert.equal(schema["@context"], "https://schema.org", `Schema context: ${route}`);
  if (route === "/") {
    const types = schema["@graph"]?.map((node) => node["@type"]);
    assert.deepEqual(
      types,
      ["WebSite", "EducationalOrganization"],
      "Homepage site-name and organization data",
    );
  } else {
    assert.equal(schema["@type"], "BreadcrumbList", `Breadcrumb type: ${route}`);
    assert.ok(
      schema.itemListElement.length >= 2,
      `Useful breadcrumb trail: ${route}`,
    );
    schema.itemListElement.forEach((item, index) => {
      assert.equal(item["@type"], "ListItem", `Breadcrumb item type: ${route}`);
      assert.equal(item.position, index + 1, `Breadcrumb position: ${route}`);
      assert.match(item.item, /^https:\/\/designexam\.com\//, `Breadcrumb URL: ${route}`);
    });
    assert.equal(
      schema.itemListElement.at(-1).item,
      canonicalFor(route),
      `Breadcrumb ends at canonical: ${route}`,
    );
  }
  if (route !== "/quiz") {
    assert.ok(
      !/₹|&#(?:8377|x20b9);|\bINR\s*\d/i.test(html),
      `No public fee amounts: ${route}`,
    );
    assert.ok(
      !/confirmed programme fees|The two-year journey|The one-year focus/.test(
        html,
      ),
      `No superseded course copy: ${route}`,
    );
  }
  if (route !== "/quiz") {
    assert.ok(
      html.includes(`data-prerender-path="${route}"`),
      `Hydration route identity: ${route}`,
    );
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `One H1: ${route}`);
    const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] || "";
    assert.ok(
      main.replace(/<[^>]*>/g, "").length > 200,
      `Useful HTML without JavaScript: ${route}`,
    );
    assert.ok(
      !/Placeholder —|Add a real student quote|Student name, batch year|Image coming soon/.test(
        main,
      ),
      `No placeholder proof: ${route}`,
    );
    for (const match of html.matchAll(/href="(\/[^"#?]*)[^\"]*"/g)) {
      const path = match[1].replace(/\/$/, "") || "/";
      if (path.startsWith("/assets/")) continue;
      assert.ok(
        publicPaths.includes(path),
        `Internal link ${path} on ${route}`,
      );
      links++;
    }
  }
}
const homepage = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
for (const route of ["", "/courses"]) {
  const html = await readFile(
    new URL(`../dist${route}/index.html`, import.meta.url),
    "utf8",
  );
  assert.equal(
    (html.match(/class="dea-programme-card /g) || []).length,
    3,
    `Three programmes: ${route || "/"}`,
  );
  for (const id of ["end-to-end", "studio-interview", "test-series"])
    assert.ok(
      html.includes(`/contact?programme=${id}`),
      `Programme enquiry: ${id}`,
    );
  for (const format of ["4-year", "2-year", "1-year", "30-day crash course"])
    assert.ok(html.includes(format), `End-to-end format: ${format}`);
}
const courseHtml = await readFile(
  new URL("../dist/courses/index.html", import.meta.url),
  "utf8",
);
assert.ok(
  courseHtml.includes('id="curriculum"'),
  "Curriculum is server-rendered",
);
for (const topic of curriculum.flatMap((group) => group.topics))
  assert.ok(
    courseHtml.includes(topic.title),
    `Curriculum topic: ${topic.title}`,
  );
assert.ok(
  homepage.includes("application/ld+json"),
  "Structured organisation data",
);
assert.ok(
  homepage.includes('id="campus-pathways"'),
  "Campus section is server-rendered",
);
for (const campus of ["nid", "nift", "iit-idc"]) {
  const asset = `/assets/campuses/${campus}-discovery-v1.webp`;
  assert.ok(
    homepage.includes(`src="${asset}"`),
    `Campus image is rendered: ${campus}`,
  );
  const bytes = await readFile(new URL(`../dist${asset}`, import.meta.url));
  assert.equal(
    bytes.toString("ascii", 8, 12),
    "WEBP",
    `Valid campus export: ${campus}`,
  );
  assert.ok(bytes.length < 250_000, `Campus image budget: ${campus}`);
}
const sitemap = await readFile(
  new URL("../dist/sitemap.xml", import.meta.url),
  "utf8",
);
assert.equal(
  (sitemap.match(/<url>/g) || []).length,
  publicPaths.length,
  "Every canonical public route in sitemap",
);
assert.ok(!sitemap.includes("/admin"), "Admin excluded from sitemap");
const socialCard = await readFile(
  new URL("../dist/assets/social/dexam-discovery-card.png", import.meta.url),
);
assert.equal(
  socialCard.toString("hex", 0, 8),
  "89504e470d0a1a0a",
  "Social card is a valid PNG",
);
assert.equal(socialCard.readUInt32BE(16), 1200, "Social card width is 1200px");
assert.equal(socialCard.readUInt32BE(20), 630, "Social card height is 630px");
assert.ok(socialCard.length < 500_000, "Social card stays within the 500 KB budget");
console.log(
  `PASS: ${publicPaths.length} direct routes, ${titles.size} unique titles/descriptions, ${links} internal links, three programmes without public fee amounts, server-rendered content and sitemap.`,
);
