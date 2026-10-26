"use client";

import AnimatedContent from "../components/AnimatedContent";
import { Container, SmallHeading, TechIcon } from "../components/ui";
import { stack } from "../content";

export function Stack() {
  return (
    <Container id="stack">
      <SmallHeading>{stack.title}</SmallHeading>
      <AnimatedContent distance={16} blur={4} duration={0.7} stagger={0.03} threshold={0.05} className="flex flex-wrap gap-3">
        {stack.items.map((tech) => (
          <div key={tech.name} className="group relative">
            <span
              tabIndex={0}
              aria-label={tech.name}
              className="flex size-13 items-center justify-center rounded-xl border border-dashed border-(--margin-line) bg-(--margin-card) transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-(--margin-fg)/25 focus-visible:ring-2 focus-visible:ring-(--margin-fg) focus-visible:outline-none in-data-[theme=dark]:bg-white/95"
            >
              <TechIcon icon={tech.icon} name="" size={24} />
            </span>
            <span
              role="tooltip"
              className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 translate-y-1 rounded-md bg-(--margin-fg) px-2 py-1 text-xs whitespace-nowrap text-(--margin-bg) opacity-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
            >
              {tech.name}
            </span>
          </div>
        ))}
      </AnimatedContent>
    </Container>
  );
}
