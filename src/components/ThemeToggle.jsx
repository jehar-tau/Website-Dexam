import { useSyncExternalStore } from "react";

const STORAGE_KEY = "dexam-theme";
const EVENT = "dexam-theme-change";

function preference() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content", theme === "dark" ? "#12251f" : "#faf9f3",
  );
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange) {
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  const sync = () => apply(preference() || (system.matches ? "dark" : "light"));
  const storage = (event) => {
    if (event.key === STORAGE_KEY || event.key === null) sync();
  };
  system.addEventListener("change", sync);
  window.addEventListener("storage", storage);
  window.addEventListener(EVENT, onChange);
  return () => {
    system.removeEventListener("change", sync);
    window.removeEventListener("storage", storage);
    window.removeEventListener(EVENT, onChange);
  };
}

const snapshot = () => document.documentElement.dataset.theme || "light";
const serverSnapshot = () => "light";

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, snapshot, serverSnapshot) === "dark";
  return (
    <button
      className="dea-theme-toggle"
      type="button"
      role="switch"
      aria-label="Dark mode"
      aria-checked={dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => {
        const next = dark ? "light" : "dark";
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // The switch still works when browser storage is unavailable.
        }
        apply(next);
      }}
    >
      <svg className="dea-theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 14a8.7 8.7 0 0 1-10.5-10.5A8.8 8.8 0 1 0 20.5 14Z" />
        <path d="M17 3v4m-2-2h4" />
      </svg>
      <svg className="dea-theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
    </button>
  );
}
