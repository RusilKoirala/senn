"use client";

import { useEffect, useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import GlassSurface from "../components/GlassSurface";
import { nav, person } from "../content";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
const STAGGER = ["delay-100", "delay-150", "delay-200", "delay-250", "delay-300"];

export function Nav() {
  const [open, setOpen] = useState(false);
  // Ink while the nav floats over the pale sky, cream once the page turns dark.
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sky = document.getElementById("summit-sky");
    if (!sky) return;
    const io = new IntersectionObserver(([entry]) => setDark(!entry.isIntersecting), {
      rootMargin: "0px 0px -92% 0px",
    });
    io.observe(sky);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const light = dark || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between px-4 md:px-8">
        <a
          href="#top"
          aria-label={`${person.name}, back to top`}
          className={cn(
            "summit-rise summit-mono flex size-11 items-center justify-center rounded-full border text-sm font-medium transition-colors duration-700",
            EASE,
            light
              ? "border-(--summit-cream)/25 text-(--summit-cream) hover:bg-(--summit-cream)/10"
              : "border-(--summit-ink)/20 text-(--summit-ink) hover:bg-(--summit-ink)/5",
          )}
        >
          {person.monogram}
        </a>

        <GlassSurface
          width="auto"
          height="auto"
          borderRadius={999}
          backgroundOpacity={light ? 0.12 : 0.3}
          brightness={light ? 20 : 70}
          blur={12}
          greenOffset={0}
          blueOffset={0}
          distortionScale={-80}
          className="summit-rise w-max"
        >
          <nav aria-label="Main" className="flex items-center gap-6 py-1.5 pr-1.5 pl-5">
            <ul className="hidden items-center gap-6 md:flex">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-700",
                      EASE,
                      light
                        ? "text-(--summit-cream-muted) hover:text-(--summit-cream)"
                        : "text-(--summit-ink-muted) hover:text-(--summit-ink)",
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
                "group hidden items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-700 hover:scale-[1.03] active:scale-[0.98] md:inline-flex",
                EASE,
                light ? "bg-(--summit-cream) text-(--summit-ink)" : "bg-(--summit-ink) text-(--summit-cream)",
              )}
            >
              {nav.cta.label}
              <ArrowUpRightIcon
                size={14}
                weight="bold"
                className={cn("transition-transform duration-700 group-hover:rotate-45", EASE)}
              />
            </a>
            <span className={cn("text-sm font-medium md:hidden", light ? "text-(--summit-cream)" : "text-(--summit-ink)")}>
              Menu
            </span>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "relative z-10 -ml-4 flex size-10 items-center justify-center rounded-full md:hidden",
                light ? "text-(--summit-cream)" : "text-(--summit-ink)",
              )}
            >
              <span
                className={cn(
                  "absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-700",
                  EASE,
                  open ? "rotate-45" : "-translate-y-1",
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-700",
                  EASE,
                  open ? "-rotate-45" : "translate-y-1",
                )}
              />
            </button>
          </nav>
        </GlassSurface>
      </div>

      <div
        className={cn(
          "fixed inset-0 -z-10 flex flex-col justify-center gap-4 bg-black/80 px-8 backdrop-blur-3xl transition-opacity duration-700 md:hidden",
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
              "summit-display text-5xl text-(--summit-cream) transition-all duration-700",
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
