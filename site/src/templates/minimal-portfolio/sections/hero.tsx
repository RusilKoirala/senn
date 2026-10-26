"use client";

import { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { CalendarBlankIcon, CheckIcon, EnvelopeSimpleIcon, GithubLogoIcon, LinkedinLogoIcon, XLogoIcon } from "@phosphor-icons/react";
import RotatingText from "../components/RotatingText";
import SplitText from "../components/SplitText";
import { TimeWidget } from "../components/time-widget";
import { hero, person } from "../content";

const ICONS = { github: GithubLogoIcon, linkedin: LinkedinLogoIcon, x: XLogoIcon, mail: EnvelopeSimpleIcon };

export function Hero() {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  const copyEmail = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <section id="top" className="margin-container scroll-mt-24 pt-6 sm:pt-10">
      <div className="flex flex-col gap-5">
        <div className="margin-corners margin-rise h-[calc(var(--margin-cell)*4)]">
          <div className="relative size-full overflow-hidden border border-(--margin-fg)/15">
            <Image src={hero.banner.src} alt={hero.banner.alt} fill priority sizes="(max-width: 640px) 100vw, 720px" className="object-cover" style={{ objectPosition: hero.banner.position }} />
          </div>
        </div>
        <TimeWidget timeZone={person.timeZone} className="-mt-2 self-end" />
        <div className="margin-rise -mt-[calc(var(--margin-cell)*3)] w-max" style={{ animationDelay: "120ms" }}>
          <div className="relative z-10 rounded-3xl bg-(--margin-bg) p-1">
            {person.avatar ? (
              <Image src={person.avatar} alt={person.name} width={96} height={96} className="size-24 rounded-[20px] object-cover" />
            ) : (
              <span aria-hidden className="margin-mono flex size-24 items-center justify-center rounded-[20px] bg-(--margin-fg) text-3xl font-medium tracking-tighter text-(--margin-bg)">{person.initials}<span className="text-(--margin-accent)">.</span></span>
            )}
          </div>
        </div>

        <div className="min-w-0">
          <p className="margin-mono text-xs text-(--margin-secondary)">{hero.introduction} <span className="mx-1 text-(--margin-accent)">/</span> {person.location}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            <SplitText text={person.name} tag="span" splitType="chars" effect="blur" trigger="load" delay={30} duration={0.9} textAlign="left" />
            <span className="text-(--margin-accent)">.</span>
          </h1>
          <div className="mt-2 h-6 text-sm text-(--margin-secondary) sm:text-base">
            <RotatingText texts={[...hero.titles]} auto={!reduceMotion} effect="blur" splitBy="words" rotationInterval={4000} staggerDuration={0.04} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} mainClassName="overflow-hidden" />
          </div>
        </div>

        <p className="margin-rise max-w-xl text-base leading-relaxed text-pretty text-(--margin-secondary)" style={{ animationDelay: "240ms" }}>{person.bio}</p>

        <div className="margin-rise flex flex-wrap items-center gap-3" style={{ animationDelay: "320ms" }}>
          <a href={hero.primaryCta.href} className="inline-flex items-center gap-2 rounded-lg bg-(--margin-fg) px-3 py-2 text-sm font-semibold text-(--margin-bg) transition-transform duration-500 hover:-translate-y-0.5">
            <CalendarBlankIcon size={16} />{hero.primaryCta.label}
          </a>
          <a href={`mailto:${person.email}`} onClick={copyEmail} className="inline-flex items-center gap-2 rounded-lg border border-(--margin-line) bg-(--margin-card) px-3 py-2 text-sm font-semibold transition-colors duration-500 hover:bg-(--margin-muted)">
            {copied ? <CheckIcon size={16} /> : <EnvelopeSimpleIcon size={16} />}<span aria-live="polite">{copied ? "Email copied" : hero.secondaryCta.label}</span>
          </a>
          <ul className="flex items-center gap-1 sm:ml-1">
            {hero.socials.filter(s => s.icon !== "mail").map(s => {
              const Icon = ICONS[s.icon];
              return <li key={s.name}><a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} title={s.name} className="flex size-9 items-center justify-center rounded-md text-(--margin-secondary) transition-colors duration-500 hover:bg-(--margin-muted) hover:text-(--margin-fg)"><Icon size={20} /></a></li>;
            })}
          </ul>
        </div>

        <p className="flex items-center gap-2 text-xs text-(--margin-secondary)"><span className="size-1.5 rounded-full bg-(--margin-accent)" />{hero.availability}</p>

      </div>
    </section>
  );
}
