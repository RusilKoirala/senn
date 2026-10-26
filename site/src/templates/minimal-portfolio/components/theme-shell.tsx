"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "margin-theme";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

export const useMarginTheme = () => useContext(ThemeContext);

// Holds the template's own light/dark state, so it never touches the host app's theme.
export function ThemeShell({ className, children }: { className: string; children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // Restore the visitor's last choice after hydration.
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const saved = localStorage.getItem(KEY);
        if (saved === "light" || saved === "dark") setTheme(saved);
      } catch {
        // Storage can be blocked; light is fine.
      }
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const toggle = () =>
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      try {
        localStorage.setItem(KEY, next);
      } catch {
        // Ignore: the choice just won't persist.
      }
      return next;
    });

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className={className} data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
