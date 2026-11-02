export const GA4_MEASUREMENT_ID = "G-ZC3W71HWLF";

const allowed = {
  exam: new Set(["nid", "uceed", "nift", "nata", "ceed", "not-sure"]),
  programme: new Set([
    "end-to-end",
    "studio-interview",
    "test-series",
    "not-sure",
  ]),
  target_year: new Set(["2027", "2028", "2029-later", "not-sure"]),
};

export function leadEventParams(detail = {}) {
  const params = {};
  if (allowed.exam.has(detail.exam)) params.exam = detail.exam;
  if (allowed.programme.has(detail.programme))
    params.programme = detail.programme;
  if (allowed.target_year.has(detail.targetYear))
    params.target_year = detail.targetYear;
  return params;
}

export function enableAnalytics(doc = document) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA4_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  if (!doc.querySelector(`script[data-dexam-ga="${GA4_MEASUREMENT_ID}"]`)) {
    const script = doc.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    script.dataset.dexamGa = GA4_MEASUREMENT_ID;
    doc.head.appendChild(script);
  }
}

export function revokeAnalytics() {
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => /^_ga(?:_|$)/.test(name));
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=designexam.com; SameSite=Lax`;
  }
}
