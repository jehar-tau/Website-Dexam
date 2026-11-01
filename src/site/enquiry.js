const values = (options) => new Set(options.map(([value]) => value));

export const enquiryOptions = {
  role: [
    ["student", "I am the student"],
    ["parent", "I am a parent or guardian"],
  ],
  education: [
    ["class-10-or-below", "Class 10 or below"],
    ["class-11", "Class 11"],
    ["class-12", "Class 12"],
    ["graduate", "Graduate / undergraduate student"],
    ["postgraduate", "Postgraduate student"],
    ["parent-answering", "Parent answering for a student"],
    ["other", "Another stage"],
  ],
  exam: [
    ["nid", "NID DAT"],
    ["uceed", "UCEED"],
    ["nift", "NIFT"],
    ["nata", "NATA"],
    ["ceed", "CEED"],
    ["not-sure", "Not sure yet"],
  ],
  targetYear: [
    ["2027", "2027"],
    ["2028", "2028"],
    ["2029-later", "2029 or later"],
    ["not-sure", "Not sure yet"],
  ],
  mode: [
    ["pune-classroom", "Pune classroom"],
    ["ask-online", "I need to ask about online availability"],
    ["not-sure", "Not sure yet"],
  ],
  programme: [
    ["end-to-end", "End-to-end preparation"],
    ["studio-interview", "Studio test & interview prep"],
    ["test-series", "Test series / mock tests"],
    ["not-sure", "Help me choose a programme"],
  ],
  preferredTime: [
    ["morning", "Morning · 9 am–12 pm"],
    ["afternoon", "Afternoon · 12–4 pm"],
    ["evening", "Evening · 4–7 pm"],
  ],
};

const allowed = Object.fromEntries(
  Object.entries(enquiryOptions).map(([key, options]) => [key, values(options)]),
);

export const emptyEnquiry = {
  name: "",
  phone: "",
  location: "",
  role: "",
  education: "",
  exam: "",
  targetYear: "",
  mode: "",
  programme: "",
  preferredTime: "",
  guidance: "",
  feeAcknowledged: false,
};

export function initialEnquiry(searchParams) {
  const form = { ...emptyEnquiry };
  const query = {
    role: searchParams.get("audience"),
    exam: searchParams.get("exam"),
    programme: ({ "one-year": "end-to-end", "two-year": "end-to-end", portfolio: "studio-interview" })[searchParams.get("programme")] || searchParams.get("programme"),
  };
  for (const [key, value] of Object.entries(query)) {
    if (allowed[key].has(value)) form[key] = value;
  }
  if (searchParams.get("interest") === "test-series")
    form.programme = "test-series";
  return form;
}

export function validateEnquiry(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[0-9]{10}$/.test(form.phone.replace(/[\s-]/g, "")))
    errors.phone = "Enter a valid 10-digit number.";
  if (form.location.trim().length < 2)
    errors.location = "Please enter your city or area.";
  for (const key of [
    "role",
    "education",
    "exam",
    "targetYear",
    "mode",
    "programme",
    "preferredTime",
  ]) {
    if (!allowed[key].has(form[key])) errors[key] = "Choose one option.";
  }
  if (form.guidance.trim().length < 15)
    errors.guidance = "Tell us what guidance you need in at least 15 characters.";
  if (!form.feeAcknowledged)
    errors.feeAcknowledged = "Please acknowledge the programme information before continuing.";
  return errors;
}

const attributionKeys = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_content", "utmContent"],
  ["utm_term", "utmTerm"],
];

export function campaignAttribution(searchParams) {
  return Object.fromEntries(
    attributionKeys
      .map(([queryKey, outputKey]) => [
        outputKey,
        (searchParams.get(queryKey) || "").trim().slice(0, 160),
      ])
      .filter(([, value]) => value),
  );
}

export function enquiryMeasurement(form, attribution = {}) {
  return {
    formVersion: "qualified-counselling-v1",
    audience: form.role,
    exam: form.exam,
    targetYear: form.targetYear,
    mode: form.mode,
    programme: form.programme,
    ...attribution,
  };
}

export function emitEnquirySuccess(detail) {
  if (Array.isArray(window.dataLayer))
    window.dataLayer.push({ event: "submit_enquiry", ...detail });
  window.dispatchEvent(
    new CustomEvent("dexam:submit_enquiry", { detail }),
  );
}
