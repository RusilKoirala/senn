"use client";

import AnimatedContent from "../components/AnimatedContent";
import CountUp from "../components/CountUp";
import SplitText from "../components/SplitText";
import { experience } from "../content";

export function Experience() {
  return (
    <section id="experience" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="summit-mono mb-4 text-sm text-(--summit-copper)">{experience.eyebrow}</p>
        <h2 className="summit-display mb-16 text-4xl leading-none sm:text-6xl lg:text-7xl">
          {experience.headline.map((line) => (
            <span key={line} className="block pb-1">
              <SplitText text={line} tag="span" splitType="words" effect="blur" trigger="view" delay={80} duration={1.2} textAlign="left" />
            </span>
          ))}
        </h2>

        <AnimatedContent distance={48} blur={8} duration={1.1} stagger={0.12} threshold={0.15} className="border-t border-(--summit-line)">
          {experience.roles.map((role) => (
            <article
              key={role.company}
              className="grid gap-4 border-b border-(--summit-line) py-8 md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)_minmax(0,3fr)] md:gap-8 md:py-12"
            >
              <p className="summit-mono text-sm text-(--summit-cream-muted) md:pt-3">{role.years}</p>
              <div>
                <h3 className="summit-display text-3xl leading-none md:text-5xl">{role.company}</h3>
                <p className="mt-2 text-base font-medium text-(--summit-cream)">{role.title}</p>
                <p className="mt-4 max-w-xl text-base text-pretty text-(--summit-cream-muted)">{role.text}</p>
              </div>
              <div className="flex items-end gap-3 md:flex-col md:items-start md:gap-2 md:pt-1">
                <span className="summit-display text-4xl leading-none text-(--summit-copper) tabular-nums md:text-6xl">
                  <CountUp to={role.stat.value} decimals={role.stat.decimals} duration={1.6} suffix={role.stat.suffix} />
                </span>
                <span className="pb-1 text-sm text-pretty text-(--summit-cream-muted)">{role.stat.label}</span>
              </div>
            </article>
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
}
