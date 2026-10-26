"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";

// Flips data-theme on <html> and remembers it. Icons swap with CSS, so the first
// render matches the server and needs no state.
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("senn-theme", next);
    } catch {
      // Storage can be blocked; the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="flex size-9 items-center justify-center rounded-full border border-(--senn-line) text-(--senn-ink) transition-colors duration-500 hover:bg-(--senn-surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--senn-ink)"
    >
      <SunIcon size={16} className="senn-sun" />
      <MoonIcon size={16} className="senn-moon" />
    </button>
  );
}

