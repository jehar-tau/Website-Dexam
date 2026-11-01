import assert from "node:assert/strict";
import test from "node:test";
import {
  campaignAttribution,
  emptyEnquiry,
  enquiryMeasurement,
  initialEnquiry,
  validateEnquiry,
} from "./enquiry.js";

const params = (value = "") => new URLSearchParams(value);

test("paid campaign context preselects only supported choices", () => {
  assert.deepEqual(
    initialEnquiry(
      params("audience=parent&exam=uceed&programme=two-year"),
    ),
    {
      ...emptyEnquiry,
      role: "parent",
      exam: "uceed",
      programme: "two-year",
    },
  );
  assert.equal(initialEnquiry(params("exam=anything")).exam, "");
  assert.equal(
    initialEnquiry(params("interest=test-series")).programme,
    "test-series",
  );
});

test("qualification requires deliberate intent fields", () => {
  const errors = validateEnquiry(emptyEnquiry);
  for (const key of [
    "name",
    "phone",
    "location",
    "role",
    "education",
    "exam",
    "targetYear",
    "mode",
    "programme",
    "preferredTime",
    "guidance",
    "feeAcknowledged",
  ])
    assert.ok(errors[key], `Expected ${key} validation`);
});

test("a complete counselling request passes validation", () => {
  assert.deepEqual(
    validateEnquiry({
      name: "Fictional student",
      phone: "9000000000",
      location: "Pune",
      role: "student",
      education: "class-12",
      exam: "nid",
      targetYear: "2027",
      mode: "pune-classroom",
      programme: "one-year",
      preferredTime: "evening",
      guidance: "I need a preparation plan for NID DAT.",
      feeAcknowledged: true,
    }),
    {},
  );
});

test("measurement and attribution exclude contact details", () => {
  const attribution = campaignAttribution(
    params(
      "utm_source=google&utm_medium=cpc&utm_campaign=march2027_nid&utm_content=faculty_reel&gclid=private-click-id",
    ),
  );
  assert.deepEqual(attribution, {
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "march2027_nid",
    utmContent: "faculty_reel",
  });
  const measurement = enquiryMeasurement(
    {
      ...emptyEnquiry,
      name: "Private name",
      phone: "9000000000",
      guidance: "Private question",
      role: "parent",
      exam: "uceed",
      targetYear: "2028",
      mode: "pune-classroom",
      programme: "two-year",
    },
    attribution,
  );
  assert.equal(measurement.name, undefined);
  assert.equal(measurement.phone, undefined);
  assert.equal(measurement.guidance, undefined);
  assert.equal(measurement.exam, "uceed");
  assert.equal(measurement.utmSource, "google");
});
