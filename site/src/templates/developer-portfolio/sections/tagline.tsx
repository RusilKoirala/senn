"use client";

import ScrollReveal from "../components/ScrollReveal";
import { tagline } from "../content";

export function Tagline() {
  return (
    <section aria-label={tagline.eyebrow} className="px-4 pt-24 pb-24 md:px-8 md:pt-40 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <p className="summit-mono mb-8 text-sm text-(--summit-copper)">{tagline.eyebrow}</p>
        {/* Words go from muted to full cream one at a time as the reader scrolls. */}
        {tagline.lines.map((line) => (
          <ScrollReveal
            key={line}
            baseOpacity={0.2}
            baseRotation={0}
            blurStrength={6}
            stagger={0.08}
            effect="fade"
            mode="scrub"
            containerClassName="my-0!"
            textClassName="summit-display text-4xl! leading-none! font-semibold! pb-2 sm:text-5xl! md:text-7xl!"
          >
            {line}
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
