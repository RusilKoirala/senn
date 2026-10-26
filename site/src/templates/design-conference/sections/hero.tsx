"use client";

import Image from "next/image";
import { ArrowDownRightIcon, ArrowUpRightIcon, AsteriskIcon } from "@phosphor-icons/react";
import SplitText from "../components/SplitText";
import ScrollVelocity from "../components/ScrollVelocity";
import { Container, Label, PrimaryLink } from "../components/ui";
import { event, hero } from "../content";

export function Hero() {
  return (
    <section id="top" aria-labelledby="assembly-headline">
      <div className="bg-(--assembly-orange) pt-8 sm:pt-12 lg:pt-16">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-(--assembly-ink)/35 pb-4"><Label>{event.category}</Label><span className="assembly-mono border border-current px-2 py-1 text-xs">{event.sampleLabel}</span></div>
          <div className="grid gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center lg:gap-16">
            <div>
              <p className="assembly-mono mb-6 text-xs lg:hidden">{event.dateLabel} / {event.city}</p>
              <h1 id="assembly-headline" className="assembly-headline max-w-[680px] text-5xl max-[359px]:text-4xl sm:text-7xl lg:text-8xl">{hero.headline.map((line, index) => <span key={line} className="assembly-headline-line"><SplitText text={line} tag="span" splitType="words" effect="rise" trigger="load" from={{ opacity: 1, y: 24 }} to={{ opacity: 1, y: 0 }} delay={70 + index * 20} duration={1.1} ease="assembly" textAlign="left" /></span>)}</h1>
              <div className="mt-8 grid items-end gap-6 sm:grid-cols-[minmax(0,440px)_auto] sm:gap-8"><p className="max-w-[440px] text-sm leading-relaxed sm:text-base">{hero.description}</p><div className="sm:justify-self-end"><PrimaryLink href={hero.ctaHref}>{hero.cta}</PrimaryLink></div></div>
            </div>
            <aside className="hidden border-l border-(--assembly-ink)/35 pl-8 lg:block" aria-label="Event information"><p className="assembly-mono text-sm">{event.day} / {event.month}</p><p className="mt-3 text-8xl font-medium leading-none tracking-[-0.08em]">{event.dateNumber}<ArrowUpRightIcon size={32} className="ml-1 inline-block" /></p><div className="mt-8 border-t border-(--assembly-ink)/35 pt-5"><p className="text-xl font-semibold tracking-tight">{hero.venue}</p><p className="mt-1 text-sm">{event.city}</p><p className="assembly-mono mt-6 text-xs">{hero.dateNote}</p></div></aside>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-(--assembly-ink)/35 py-4"><p className="assembly-mono text-xs">{hero.detail}</p><ArrowDownRightIcon size={24} aria-hidden /></div>
        </Container>
      </div>
      <div className="relative h-64 overflow-hidden sm:h-80 lg:h-96"><Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="100vw" className="assembly-photo" style={{ objectPosition: hero.image.position }} /><div className="absolute inset-x-0 bottom-0"><Container className="flex flex-wrap items-end justify-between gap-3 pb-5"><p className="bg-(--assembly-paper) px-3 py-2 text-xs font-medium">{hero.imageCaption}</p><p className="assembly-mono bg-(--assembly-paper) px-3 py-2 text-xs">{hero.imageCredit}</p></Container></div></div>
      <div className="overflow-hidden border-b border-(--assembly-rule) bg-(--assembly-paper) py-4" aria-hidden><ScrollVelocity texts={[hero.marquee]} velocity={32} gap={32} separator={<AsteriskIcon size={20} />} fontSize="var(--text-xl)" fontWeight={500} numCopies={5} fadeEdges={false} draggable={false} /></div>
    </section>
  );
}
