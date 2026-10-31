import { build } from "vite";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { publicPaths, metadataFor, organization } from "../src/site/routes.js";
import { site } from "../src/site/content.js";

const root = new URL("../", import.meta.url);
await build({
  root: fileURLToPath(root),
  logLevel: "warn",
  build: {
    ssr: "src/entry-server.jsx",
    outDir: ".build-ssr",
    emptyOutDir: true,
    minify: false,
  },
});
const { render } = await import(
  new URL("../.build-ssr/entry-server.js", import.meta.url)
);
const template = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const path of publicPaths) {
  const meta =
    path === "/quiz"
      ? {
          title: "Design Instinct Test",
          description:
            "Explore how you see through 30 hands-on design challenges. A free design aptitude assessment from DEXAM.",
        }
      : metadataFor(path);
  const canonical = site.origin + (path === "/" ? "/" : path);
  let html = template
    .replace(
      /<title>.*?<\/title>/s,
      `<title>${escape(meta.title)} | DEXAM</title>`,
    )
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escape(meta.description)}" />`,
    );
  const schema =
    path === "/"
      ? organization
      : {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "DEXAM",
              item: site.origin + "/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: meta.title,
              item: canonical,
            },
          ],
        };
  html = html.replace(
    "</head>",
    `<link rel="canonical" href="${canonical}"/><meta name="robots" content="index,follow"/><meta property="og:type" content="website"/><meta property="og:title" content="${escape(meta.title)} | DEXAM"/><meta property="og:description" content="${escape(meta.description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:site_name" content="DEXAM — Design Exam Academy"/><meta name="theme-color" content="#faf9f3"/><script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script></head>`,
  );
  // Keep the saved assessment fully client-side; its state belongs to the visitor's device.
  if (path !== "/quiz")
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root" data-prerender-path="${path}">${render(path)}</div>`,
    );
  const directory = new URL(
    `../dist${path === "/" ? "/" : path + "/"}`,
    import.meta.url,
  );
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html);
}
await writeFile(
  new URL("../dist/sitemap.xml", import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPaths.map((path) => `<url><loc>${site.origin}${path}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  new URL("../dist/robots.txt", import.meta.url),
  `User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: ${site.origin}/sitemap.xml\n`,
);
console.log(
  `Pre-rendered ${publicPaths.length - 1} public pages; prepared ${publicPaths.length} direct-entry routes and sitemap.`,
);
