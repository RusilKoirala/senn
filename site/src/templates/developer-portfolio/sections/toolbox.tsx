"use client";

import { ScrollVelocity } from "../components/ScrollVelocity";
import { toolbox } from "../content";

export function Toolbox() {
  return (
    <section aria-label={toolbox.eyebrow} className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto mb-12 flex max-w-7xl flex-col gap-4 px-4 md:flex-row md:items-end md:justify-between md:px-8">
        <p className="summit-mono text-sm text-(--summit-copper)">{toolbox.eyebrow}</p>
        <p className="text-base text-(--summit-cream-muted) md:text-lg">{toolbox.text}</p>
      </div>
      {/* The two lines drift in opposite directions and speed up with scrolling. */}
      <ScrollVelocity
        texts={toolbox.rows.map((row) => row.join("   ·   ") + "   ·   ")}
        velocity={40}
        numCopies={4}
        fadeEdges
        outlineAlternate
        color="#f3ede4"
        scrollerClassName="summit-velocity text-5xl! leading-tight! font-semibold! tracking-[-0.045em]! drop-shadow-none! md:text-8xl!"
      />
    </section>
  );
}
