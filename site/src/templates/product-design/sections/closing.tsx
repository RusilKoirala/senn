"use client";

import SplitText from "../components/SplitText";
import { Container, PrimaryLink } from "../components/ui";
import { closing } from "../content";

export function Closing() {
  return (
    <section className="contour-section bg-(--contour-cobalt) text-(--contour-white)" aria-labelledby="contour-closing-title">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[680px]">
          <h2 id="contour-closing-title" className="contour-headline text-5xl max-[359px]:text-4xl sm:text-7xl">
            {closing.headline.map((line, index) => <span key={line} className="block whitespace-nowrap"><SplitText text={line} className="-mb-3 pb-3" tag="span" splitType="words" effect="rise" trigger="view" from={{ opacity: 0, y: 48 }} to={{ opacity: 1, y: 0 }} delay={90 + index * 40} duration={1.2} ease="contour" textAlign="left" /></span>)}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-(--contour-pale) sm:text-lg">{closing.description}</p>
        </div>
        <div className="shrink-0"><PrimaryLink href={closing.ctaHref} light>{closing.cta}</PrimaryLink></div>
      </Container>
    </section>
  );
}
