"use client";

import Image from "next/image";
import CountUp from "../components/CountUp";
import { Container, Label, Reveal } from "../components/ui";
import { details, finishes } from "../content";

export function Details() {
  const product = finishes[0];
  return (
    <section id="details" className="contour-section bg-(--contour-white)" aria-labelledby="contour-details-title">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-24">
        <Reveal distance={32} className="lg:sticky lg:top-24 lg:self-start">
          <div className="contour-plane aspect-[4/5]">
            <Image src={product.image.src} alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="contour-photo origin-[50%_76%] scale-[2.4]" />
          </div>
          <p className="contour-label mt-4 text-(--contour-muted)">{details.imageCaption}</p>
        </Reveal>
        <div>
          <Reveal>
            <Label className="text-(--contour-cobalt)">{details.label}</Label>
            <h2 id="contour-details-title" className="contour-title mt-6">{details.title.map(line => <span className="block" key={line}>{line}</span>)}</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-(--contour-muted)">{details.description}</p>
          </Reveal>
          <Reveal stagger={0.12} distance={32} className="mt-12">
            <ol>
              {details.steps.map((step, index) => <li key={step.title} className="grid grid-cols-[48px_minmax(0,1fr)] gap-4 border-t border-(--contour-rule) py-8"><span className="contour-label pt-1 text-(--contour-cobalt)">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">{step.title}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-(--contour-muted) sm:text-base">{step.text}</p></div></li>)}
            </ol>
          </Reveal>
          <dl className="grid grid-cols-2 gap-6 border-t border-(--contour-rule) pt-8">
            {details.figures.map(figure => <div key={figure.label}><dt className="contour-label text-(--contour-muted)">{figure.label}</dt><dd className="mt-2 text-5xl font-medium tracking-[-0.05em] tabular-nums sm:text-6xl"><CountUp to={figure.value} duration={1.4} /><span className="ml-2 text-xl tracking-normal text-(--contour-muted)">{figure.unit}</span></dd></div>)}
          </dl>
        </div>
      </Container>
    </section>
  );
}
