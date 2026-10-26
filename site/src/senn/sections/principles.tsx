"use client";

import ScrollReveal from "../components/ScrollReveal";
import { principles } from "../content";

export function Principles() {
  return (
    <section id="principles" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 font-mono text-xs text-(--senn-muted)">{principles.eyebrow}</p>
        <ol className="border-t border-(--senn-line)">
          {principles.items.map((p, i) => (
            <li
              key={p.statement}
              className="grid gap-x-8 gap-y-2 border-b border-(--senn-line) py-10 md:grid-cols-[3rem_minmax(0,2fr)_minmax(0,1fr)] md:items-baseline"
            >
              <span className="font-mono text-xs text-(--senn-muted)">{String(i + 1).padStart(2, "0")}</span>
              {/* Words go from muted to white as the statement scrolls into place. */}
              <ScrollReveal
                baseOpacity={0.2}
                baseRotation={0}
                blurStrength={4}
                stagger={0.08}
                effect="fade"
                mode="scrub"
                containerClassName="my-0!"
                textClassName="text-4xl! leading-tight! font-semibold! tracking-[-0.04em] md:text-5xl!"
              >
                {p.statement}
              </ScrollReveal>
              <p className="max-w-sm text-base text-pretty text-(--senn-muted)">{p.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
