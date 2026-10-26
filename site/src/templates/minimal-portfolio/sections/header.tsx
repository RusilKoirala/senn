"use client";

import { useEffect, useState } from "react";
import { BriefcaseIcon, EnvelopeSimpleIcon, HouseIcon, MoonIcon, SquaresFourIcon, SunIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ShimmerLabel } from "../components/shimmer-label";
import { useMarginTheme } from "../components/theme-shell";
import { nav, person } from "../content";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

function ThemeToggle() {
  const { theme, toggle } = useMarginTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex size-8 items-center justify-center rounded-full text-(--margin-secondary) transition-colors duration-500 hover:bg-(--margin-muted) hover:text-(--margin-fg) focus-visible:ring-2 focus-visible:ring-(--margin-fg) focus-visible:outline-none active:scale-95"
    >
      <SunIcon
        size={18}
        className={cn("absolute transition-all duration-700", EASE, dark ? "scale-50 rotate-90 opacity-0" : "opacity-100")}
      />
      <MoonIcon
        size={18}
        className={cn("absolute transition-all duration-700", EASE, dark ? "opacity-100" : "scale-50 -rotate-90 opacity-0")}
      />
    </button>
  );
}

// Highlights the section currently in view.
function useActiveSection() {
  const [active, setActive] = useState<string>("#top");
  useEffect(() => {
    const els = ["#top", ...nav.links.map((l) => l.href)]
      .map((href) => document.querySelector(href))
      .filter((el): el is Element => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    // The last section may never reach the narrow tracking band on a tall screen.
    const footer = document.querySelector(".margin footer");
    const end = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive("#contact");
    });
    if (footer) end.observe(footer);
    return () => {
      io.disconnect();
      end.disconnect();
    };
  }, []);
  return active;
}

const DOCK_ICONS: Record<string, typeof HouseIcon> = {
  "#stack": SquaresFourIcon,
  "#experience": BriefcaseIcon,
  "#projects": SquaresFourIcon,
  "#contact": EnvelopeSimpleIcon,
};

export function Header() {
  const active = useActiveSection();

  return (
    <>
      <header className="margin-glass sticky top-0 z-50 w-full border-b border-(--margin-line)">
        <div className="margin-container flex h-14 items-center justify-between gap-4">
          <a href="#top" className="margin-mono text-lg font-bold tracking-tight transition-opacity hover:opacity-70">
            <ShimmerLabel text={person.initials} />
          </a>
          <div className="flex items-center gap-3 sm:gap-5">
            <nav aria-label="Main" className="hidden items-center gap-5 text-sm font-medium sm:flex">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  className={cn(
                    "transition-colors duration-500 hover:text-(--margin-fg)",
                    active === link.href ? "font-semibold text-(--margin-fg)" : "text-(--margin-secondary)",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="hidden h-4 w-px bg-(--margin-line) sm:block" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Phones: a floating dock instead of the top links. */}
      <nav aria-label="Sections" className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4 sm:hidden">
        <div className="margin-glass flex items-center gap-1 rounded-full border border-(--margin-line) p-1.5 shadow-[0_8px_24px_rgb(0_0_0_/_0.08)]">
          <a
            href="#top"
            aria-label="Top"
            aria-current={active === "#top" ? "true" : undefined}
            className="flex size-10 items-center justify-center rounded-full text-(--margin-secondary)"
          >
            <HouseIcon size={20} />
          </a>
          {nav.links.map((link) => {
            const Icon = DOCK_ICONS[link.href] ?? SquaresFourIcon;
            const on = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "flex h-10 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-medium transition-all duration-500",
                  EASE,
                  on ? "bg-(--margin-fg) text-(--margin-bg)" : "text-(--margin-secondary)",
                )}
              >
                <Icon size={18} />
                {on && <span className="hidden min-[360px]:inline">{link.label}</span>}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
