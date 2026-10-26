"use client";

import AnimatedContent from "../components/AnimatedContent";
import { Container, Eyebrowed, TechIcon } from "../components/ui";
import { experience } from "../content";

export function Experience() {
  return (
    <Container id="experience">
      <Eyebrowed eyebrow={experience.eyebrow} title={experience.title} />
      <AnimatedContent distance={32} blur={6} duration={0.9} stagger={0.12} threshold={0.15} className="divide-y divide-(--margin-line)">
        {experience.items.map((item) => (
          <article key={item.company} className="py-7 first:pt-0">
            <div className="grid gap-4 sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:items-start">
              <span
                aria-hidden
                className="flex size-12 items-center justify-center rounded-xl text-2xl font-bold text-white shadow-sm"
                style={{ backgroundColor: item.markColor }}
              >
                {item.mark}
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold tracking-tight">{item.company}</h3>
                <p className="mt-1 text-sm">{item.role}</p>
              </div>
              <div className="text-sm text-(--margin-secondary) sm:min-w-40 sm:text-right">
                <p>{item.period}</p>
                <p className="mt-1">{item.location}</p>
              </div>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2">
              {item.tech.map((t) => (
                <li
                  key={t.name}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-(--margin-line) bg-(--margin-bg) px-2 py-1 text-xs font-medium"
                >
                  <span className="flex rounded-sm in-data-[theme=dark]:bg-white in-data-[theme=dark]:p-0.5">
                    <TechIcon icon={t.icon} name="" />
                  </span>
                  {t.name}
                </li>
              ))}
            </ul>

            <ul className="mt-5 space-y-2 text-sm leading-relaxed text-(--margin-secondary)">
              {item.details.map((d) => (
                <li key={d} className="flex gap-3">
                  <span aria-hidden className="mt-[0.65em] size-1.5 shrink-0 bg-(--margin-secondary)/70" />
                  <span className="text-pretty">{d}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </AnimatedContent>
    </Container>
  );
}
