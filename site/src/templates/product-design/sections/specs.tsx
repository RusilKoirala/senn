"use client";

import CountUp from "../components/CountUp";
import { Container, Label, Reveal } from "../components/ui";
import { specs } from "../content";

// A measured side elevation. Letters on the drawing match the figures beside it.
function Drawing() {
  return (
    <svg aria-hidden viewBox="0 0 420 460" fill="none" className="w-full text-(--contour-ink)">
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M120 386V92a36 36 0 0 1 36-36h128" />
        <rect x="270" y="46" width="128" height="16" rx="8" />
        <rect x="64" y="386" width="120" height="30" rx="8" />
        <circle cx="160" cy="380" r="5" />
      </g>
      <g stroke="#1645ed" strokeWidth="1.5">
        <path d="M30 56v360M24 56h12M24 416h12" />
        <path d="M120 20h278M120 14v12M398 14v12" />
        <path d="M64 434h120M64 428v12M184 428v12" />
        <path d="M270 80h128M270 74v12M398 74v12" />
      </g>
      <g fill="#1645ed" fontSize="14" fontWeight="600">
        <text x="8" y="240">A</text>
        <text x="254" y="12">B</text>
        <text x="119" y="456">C</text>
        <text x="328" y="104">D</text>
      </g>
    </svg>
  );
}

export function Specs() {
  const { drawing } = specs;
  const figures = [
    { key: "A", label: drawing.labels.height, value: drawing.height },
    { key: "B", label: drawing.labels.reach, value: drawing.reach },
    { key: "C", label: drawing.labels.base, value: drawing.base },
    { key: "D", label: drawing.labels.head, value: drawing.head },
  ];
  return (
    <section id="specifications" className="contour-section bg-(--contour-white)" aria-labelledby="contour-specs-title">
      <Container>
        <Reveal><Label className="text-(--contour-cobalt)">{specs.label}</Label><h2 id="contour-specs-title" className="contour-title mt-6">{specs.title.map(line => <span className="block" key={line}>{line}</span>)}</h2></Reveal>
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-24">
          <Reveal distance={32}>
            <div className="rounded-3xl bg-(--contour-ice) p-8 sm:p-12"><div className="mx-auto max-w-sm"><Drawing /></div></div>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {figures.map(figure => <div key={figure.key}><dt className="contour-label text-(--contour-muted)"><span className="mr-2 text-(--contour-cobalt)">{figure.key}</span>{figure.label}</dt><dd className="mt-1 text-2xl font-medium tracking-[-0.04em] tabular-nums"><CountUp to={figure.value} duration={1.2} /><span className="ml-1 text-sm tracking-normal text-(--contour-muted)">{drawing.unit}</span></dd></div>)}
            </dl>
          </Reveal>
          <div>
            <Reveal stagger={0.05} distance={16}>
              <dl>
                {specs.rows.map(row => <div key={row.label} className="grid gap-1 border-t border-(--contour-rule) py-4 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6"><dt className="text-sm text-(--contour-muted)">{row.label}</dt><dd className="text-base font-medium">{row.value}</dd></div>)}
              </dl>
            </Reveal>
            <p className="contour-label mt-6 max-w-md leading-relaxed text-(--contour-muted)">{specs.note}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
