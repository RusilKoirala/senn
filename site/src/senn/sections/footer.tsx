"use client";

import ScrollVelocity from "../components/ScrollVelocity";
import { footer } from "../content";

export function Footer() {
  return (
    <footer className="overflow-hidden pt-16 pb-8">
      {/* Marquee speed follows scroll velocity. */}
      <ScrollVelocity
        texts={[footer.marquee.join("  ·  ") + "  ·  "]}
        velocity={40}
        fontSize="clamp(3rem, 8vw, 6rem)"
        fontWeight={600}
        color="rgb(255 255 255 / 0.9)"
        fadeEdges
        className="tracking-[-0.04em]"
      />

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-6 border-t border-(--senn-line) px-4 pt-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <a href="#top" className="flex w-max items-center gap-2 text-lg font-semibold tracking-tight">
            <span aria-hidden className="size-2 rounded-full bg-white" />
            senn
          </a>
          <p className="text-sm text-(--senn-muted)">{footer.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-(--senn-muted) transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="font-mono text-xs text-(--senn-muted)">{footer.copyright}</p>
      </div>
    </footer>
  );
}
