import { useEffect, useState } from "react";
import {
  enableAnalytics,
  leadEventParams,
  revokeAnalytics,
} from "../analytics.js";

const STORAGE_KEY = "dexam-analytics-consent-v1";

function readConsent() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState(readConsent);
  const [open, setOpen] = useState(() => readConsent() === null);

  useEffect(() => {
    const showPreferences = () => setOpen(true);
    window.addEventListener("dexam:open-privacy-settings", showPreferences);
    return () =>
      window.removeEventListener("dexam:open-privacy-settings", showPreferences);
  }, []);

  useEffect(() => {
    if (consent === "accepted") enableAnalytics();
    if (consent !== "accepted") revokeAnalytics();
  }, [consent]);

  useEffect(() => {
    if (consent !== "accepted") return;
    const onEnquiry = (event) => {
      if (typeof window.gtag !== "function") return;
      window.gtag("event", "generate_lead", leadEventParams(event.detail));
    };
    window.addEventListener("dexam:submit_enquiry", onEnquiry);
    return () => window.removeEventListener("dexam:submit_enquiry", onEnquiry);
  }, [consent]);

  const choose = (value) => {
    const withdrawing = consent === "accepted" && value === "rejected";
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // If preferences cannot be stored, do not enable analytics.
      value = "rejected";
    }
    if (value !== "accepted") revokeAnalytics();
    setConsent(value);
    setOpen(false);
    if (withdrawing) window.location.reload();
  };

  if (!open) return null;

  return (
    <section
      className="dea-analytics-consent"
      aria-label="Analytics preferences"
    >
      <div className="dea-analytics-consent__copy">
        <strong>Help us make the site more useful?</strong>
        <p>
          Optional Google Analytics measures page views, scrolls, and clicks to
          other sites. We never send names, phone numbers, email addresses, or
          form notes to Analytics. Analytics is for adults only. If you’re
          under 18, choose “Reject optional analytics”; the tag will not load.
        </p>
        <a href="/privacy">Read our privacy policy</a>
      </div>
      <div className="dea-analytics-consent__actions">
        <button type="button" onClick={() => choose("rejected")}>
          Reject optional analytics
        </button>
        <button type="button" onClick={() => choose("accepted")}>
          I’m 18+ — allow analytics
        </button>
      </div>
    </section>
  );
}
