"use client";

import Image from "next/image";
import SplitText from "../components/SplitText";
import { Container, Label, PrimaryLink, Reveal } from "../components/ui";
import { brand, finishes, hero } from "../content";

export function Hero() {
  const product = finishes[0];
  return (
    <section id="top" aria-labelledby="contour-headline" className="pt-8 pb-16 sm:pt-12 lg:pt-16 lg:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-[680px]">
          <div className="flex flex-wrap items-center gap-3">
            <Label>{hero.index}</Label>
            <span className="contour-label rounded-full bg-(--contour-white) px-3 py-1 text-(--contour-muted)">{brand.sampleLabel}</span>
          </div>
          <h1 id="contour-headline" className="contour-headline mt-8 text-5xl text-(--contour-cobalt) max-[359px]:text-4xl sm:text-7xl">
            {hero.headline.map((line, index) => <span key={line} className="block whitespace-nowrap"><SplitText text={line} className="-mb-3 pb-3" tag="span" splitType="words" effect="rise" trigger="load" from={{ opacity: 0, y: 48 }} to={{ opacity: 1, y: 0 }} delay={90 + index * 40} duration={1.2} ease="contour" textAlign="left" /></span>)}
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-(--contour-muted) sm:text-lg">{hero.description}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"><PrimaryLink href={hero.ctaHref}>{hero.cta}</PrimaryLink><a href={hero.secondaryHref} className="contour-link">{hero.secondary}</a></div>
          </Reveal>
        </div>
        <Reveal distance={32} delay={0.15}>
          <div className="contour-plane aspect-square">
            <Image src={product.image.src} alt={product.image.alt} fill priority sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 100vw" className="contour-photo" placeholder="blur" />
            <p className="contour-label absolute top-6 left-6 text-(--contour-muted)">{brand.model} / {product.name}</p>
          </div>
          <dl className="mt-6 grid grid-cols-3 gap-4">
            {hero.details.map(item => <div key={item.label} className="border-t border-(--contour-rule) pt-4"><dt className="contour-label text-(--contour-muted)">{item.label}</dt><dd className="mt-1 text-sm font-medium sm:text-base">{item.text}</dd></div>)}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
