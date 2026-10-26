"use client";

import ScrollReveal from "../components/ScrollReveal";
import { Container, Label } from "../components/ui";
import { tagline } from "../content";

// A small line drawing of the light, set beside the tagline as a quiet signature.
function Silhouette() {
  return (
    <svg aria-hidden viewBox="0 0 120 160" fill="none" className="h-24 w-auto text-(--contour-pale) sm:h-32">
      <path d="M30 140V34a20 20 0 0 1 20-20h34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="94" cy="16" rx="24" ry="6" stroke="currentColor" strokeWidth="4" />
      <ellipse cx="34" cy="146" rx="24" ry="7" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

export function Tagline() {
  return (
    <section className="contour-section bg-(--contour-cobalt) text-(--contour-white)" aria-label={tagline.lines.join(" ")}>
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[680px]">
          <Label className="mb-8 text-(--contour-pale)">{tagline.label}</Label>
          {tagline.lines.map(line => <ScrollReveal key={line} baseOpacity={0.3} baseRotation={0} blurStrength={0} effect="fade" mode="scrub" containerClassName="my-0!" textClassName="text-3xl! text-balance min-[400px]:text-4xl! font-medium! tracking-[-0.05em]! leading-tight! sm:text-5xl! lg:text-6xl!">{line}</ScrollReveal>)}
        </div>
        <Silhouette />
      </Container>
    </section>
  );
}
