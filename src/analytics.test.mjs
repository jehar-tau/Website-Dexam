import assert from "node:assert/strict";
import test from "node:test";
import { GA4_MEASUREMENT_ID, leadEventParams } from "./analytics.js";

test("GA4 uses the property measurement ID created for designexam.com", () => {
  assert.equal(GA4_MEASUREMENT_ID, "G-ZC3W71HWLF");
});

test("lead events include only allow-listed non-contact context", () => {
  assert.deepEqual(
    leadEventParams({
      name: "Private student name",
      phone: "9000000000",
      email: "private@example.com",
      location: "Pune",
      guidance: "Private counselling note",
      role: "student",
      education: "class-12",
      exam: "uceed",
      targetYear: "2028",
      programme: "test-series",
      utmSource: "google",
    }),
    { exam: "uceed", programme: "test-series", target_year: "2028" },
  );
});

test("lead events discard values outside the supported form choices", () => {
  assert.deepEqual(
    leadEventParams({
      exam: "private-value",
      programme: "other",
      targetYear: "2030",
    }),
    {},
  );
});
