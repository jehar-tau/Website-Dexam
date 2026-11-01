import assert from "node:assert/strict";
import test from "node:test";
import {
  breadcrumbsFor,
  canonicalFor,
  publicPaths,
  structuredDataFor,
} from "./routes.js";

test("homepage identifies the site and educational organization", () => {
  const data = structuredDataFor("/");
  assert.equal(data["@context"], "https://schema.org");
  assert.deepEqual(
    data["@graph"].map((node) => node["@type"]),
    ["WebSite", "EducationalOrganization"],
  );
  assert.equal(data["@graph"][0].name, "DEXAM");
  assert.equal(data["@graph"][1].address.addressLocality, "Pune");
});

test("nested routes describe their real information hierarchy", () => {
  assert.deepEqual(breadcrumbsFor("/exams/nid"), [
    ["DEXAM", "/"],
    ["Exams", "/exams"],
    ["NID DAT", "/exams/nid"],
  ]);
  assert.deepEqual(breadcrumbsFor("/papers/uceed"), [
    ["DEXAM", "/"],
    ["Resources", "/resources"],
    ["Previous year papers", "/papers"],
    ["UCEED", "/papers/uceed"],
  ]);
  assert.deepEqual(breadcrumbsFor("/papers"), [
    ["DEXAM", "/"],
    ["Resources", "/resources"],
    ["Previous year papers", "/papers"],
  ]);
  assert.equal(
    breadcrumbsFor("/resources/drawing-vs-design").at(-1)[0],
    "Good at drawing? Curious about design?",
  );
});

test("every public route emits canonical structured data", () => {
  for (const path of publicPaths) {
    const data = structuredDataFor(path);
    assert.equal(data["@context"], "https://schema.org");
    if (path === "/") continue;
    assert.equal(data["@type"], "BreadcrumbList");
    assert.equal(data.itemListElement.at(-1).item, canonicalFor(path));
    assert.deepEqual(
      data.itemListElement.map((item) => item.position),
      data.itemListElement.map((_, index) => index + 1),
    );
  }
});
