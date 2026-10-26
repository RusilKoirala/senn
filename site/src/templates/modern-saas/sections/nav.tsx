"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import GlassSurface from "../components/GlassSurface";
import { brand, nav } from "../content";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
const STAGGER = ["delay-100", "delay-150", "delay-200", "delay-250", "delay-300"];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <GlassSurface
        width="auto"
        height="auto"
        borderRadius={999}
        backgroundOpacity={0.35}
        brightness={60}
        blur={12}
        className="cove-rise mt-6 w-max"
      >
        <nav aria-label="Main" className="flex items-center gap-6 py-2 pr-2 pl-6">
          <a href={brand.href} className="cove-display text-2xl leading-none">
            {brand.name}
          </a>
          <ul className="hidden items-center gap-6 md:flex">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "text-sm font-medium text-(--cove-muted) transition-colors duration-700 hover:text-(--cove-ink)",
                    EASE,
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={nav.cta.href}
            className={cn(
              "hidden rounded-full bg-(--cove-ink) px-4 py-2 text-sm font-semibold text-white transition-transform duration-700 hover:scale-[1.03] active:scale-[0.98] md:inline-flex",
              EASE,
            )}
          >
            {nav.cta.label}
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 flex size-10 items-center justify-center rounded-full md:hidden"
          >
            <span
              className={cn(
                "absolute h-0.5 w-5 rounded-full bg-(--cove-ink) transition-transform duration-700",
                EASE,
                open ? "rotate-45" : "-translate-y-1",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 rounded-full bg-(--cove-ink) transition-transform duration-700",
                EASE,
                open ? "-rotate-45" : "translate-y-1",
              )}
            />
          </button>
        </nav>
      </GlassSurface>

      <div
        className={cn(
          "fixed inset-0 -z-10 flex flex-col justify-center gap-6 bg-white/80 px-8 backdrop-blur-3xl transition-opacity duration-700 md:hidden",
          EASE,
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        {[...nav.links, nav.cta].map((link, i) => (
          <a
            key={link.href + link.label}
            href={link.href}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className={cn(
              "cove-display text-5xl transition-all duration-700",
              EASE,
              open ? cn("translate-y-0 opacity-100", STAGGER[i]) : "translate-y-12 opacity-0",
            )}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
