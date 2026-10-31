import { useLead } from "../lead-context.jsx";
import { useEffect, useRef } from "react";
import { waLink } from "../config.js";
import { examData } from "../data.js";

function Field({ label, error, errorMsg, children }) {
  return (
    <div>
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="field-error">{errorMsg}</span>}
    </div>
  );
}

export default function LeadModal() {
  const lead = useLead();
  const {
    modalPaper,
    formDone,
    downloaded,
    fields,
    errors,
    submitting,
    submissionError,
  } = lead;
  const dialog = useRef(null);
  useEffect(() => {
    if (!modalPaper) return;
    const previous = document.activeElement;
    dialog.current?.querySelector("input,button")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        lead.closeModal();
      }
      if (event.key !== "Tab") return;
      const controls = [
        ...(dialog.current?.querySelectorAll(
          'button:not(:disabled),input,a[href],[tabindex="0"]',
        ) || []),
      ];
      if (!controls.length) return;
      const first = controls[0],
        last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (previous?.isConnected) previous.focus();
    };
  }, [modalPaper]);
  if (!modalPaper) return null;

  const exam = examData.find((e) => e.id === modalPaper.examId);
  const introLabel = modalPaper.paper
    ? `${exam ? exam.name : ""} · ${modalPaper.paper.label} — fill this once to unlock your downloads.`
    : "Fill this once to unlock all paper downloads.";
  const downloadLabel = !modalPaper.paper
    ? "Browse unlocked papers"
    : downloaded
      ? "✓ Downloading PDF…"
      : `Download ${exam ? exam.name : ""} ${modalPaper.paper.label} paper`;

  const input = (key, props = {}) => (
    <input
      className={"field-input" + (errors[key] ? " field-input--error" : "")}
      value={fields[key]}
      aria-label={
        key === "name"
          ? "Student or parent name"
          : key === "phone"
            ? "Phone number"
            : "City or area"
      }
      aria-invalid={!!errors[key]}
      inputMode={key === "phone" ? "tel" : undefined}
      onChange={(e) => lead.setField(key, e.target.value)}
      {...props}
    />
  );

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) lead.closeModal();
      }}
    >
      <div
        className="modal-box"
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Get your previous year paper"
      >
        {!formDone ? (
          <div style={{ padding: "24px 24px 26px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 4,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 21, lineHeight: 1.2 }}>
                Get your previous year paper
              </h3>
              <button
                aria-label="Close paper form"
                type="button"
                onClick={lead.closeModal}
                style={{
                  cursor: "pointer",
                  fontSize: 20,
                  color: "var(--gray)",
                  lineHeight: 1,
                  padding: 2,
                  background: "none",
                  border: 0,
                }}
              >
                ✕
              </button>
            </div>
            <p
              style={{
                margin: "0 0 16px",
                fontSize: 13,
                color: "var(--muted)",
              }}
            >
              {introLabel}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Field
                label="Student / parent name *"
                error={errors.name}
                errorMsg="Please enter a name"
              >
                {input("name", { placeholder: "Full name" })}
              </Field>
              <Field
                label="Phone number *"
                error={errors.phone}
                errorMsg="Enter a valid 10-digit phone number"
              >
                {input("phone", { placeholder: "10-digit mobile number" })}
              </Field>
              <Field
                label="Location *"
                error={errors.location}
                errorMsg="Please enter your city or area"
              >
                {input("location", { placeholder: "e.g. Hadapsar, Pune" })}
              </Field>
              <button
                className="btn btn--orange"
                style={{ marginTop: 2 }}
                onClick={lead.submitForm}
                disabled={submitting}
              >
                {submitting
                  ? "Sending your request…"
                  : "Unlock previous year papers"}
              </button>
              {submissionError && (
                <p className="field-error" role="alert">
                  {submissionError}
                </p>
              )}
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  lineHeight: 1.5,
                  color: "var(--gray)",
                  textAlign: "center",
                }}
              >
                We’ll use these details for your paper request and preparation
                guidance. Under 18? Please complete this with a parent or
                guardian.
              </p>
            </div>
          </div>
        ) : (
          <div style={{ padding: "30px 26px", textAlign: "center" }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: "rgba(30,138,76,.12)",
                color: "var(--green)",
                fontSize: 26,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 14px",
              }}
            >
              ✓
            </div>
            <h3 style={{ margin: "0 0 8px", fontSize: 22 }}>
              Your download is ready
            </h3>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "var(--muted)",
              }}
            >
              Thank you! We'll also keep you posted on important exam dates,
              preparation guidance and counselling — on WhatsApp.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button className="btn btn--green" onClick={lead.downloadNow}>
                {downloadLabel}
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  border: "1.5px solid var(--ink)",
                  color: "var(--ink)",
                  fontWeight: 600,
                  fontSize: 14,
                  textAlign: "center",
                  padding: 12,
                  borderRadius: 8,
                  display: "block",
                }}
              >
                Get guidance on WhatsApp
              </a>
              <span
                onClick={lead.closeModal}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--gray)",
                  cursor: "pointer",
                  padding: 6,
                }}
              >
                Back to papers
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
