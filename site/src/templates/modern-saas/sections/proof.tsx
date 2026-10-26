"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import CountUp from "../components/CountUp";
import FoldText from "../components/FoldText";
import SplitText from "../components/SplitText";
import { proof } from "../content";

export function Proof() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(0);
  const quote = proof.testimonials[active];

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The active name's progress line is a CSS animation; when it finishes, the next
  // quote takes over. Pausing it (hover, off screen) pauses the rotation too.
  const playing = inView && !hovered;
  const next = () => setActive((i) => (i + 1) % proof.testimonials.length);

  return (
    <section id="proof" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <header className="flex max-w-3xl flex-col gap-4">
          <span className="text-sm font-medium text-(--cove-sea)">{proof.eyebrow}</span>
          <h2 className="cove-display cove-ink-fade text-4xl leading-none sm:text-6xl md:text-7xl">
            {/* SplitText's root is inline-block; the wrapper forces one line per entry. */}
            {proof.headline.map((line) => (
              <span key={line} className="block pb-1">
                <SplitText text={line} tag="span" splitType="words" effect="blur" trigger="view" delay={80} duration={1.2} textAlign="left" />
              </span>
            ))}
          </h2>
        </header>

        <dl className="mt-16 grid border-y border-(--cove-line) md:grid-cols-3 md:divide-x md:divide-(--cove-line)">
          {proof.stats.map((s, i) => (
            <div
              key={s.label}
              className={cn("flex flex-col gap-2 py-8 md:px-8", i === 0 && "md:pl-0", i > 0 && "border-t border-(--cove-line) md:border-t-0")}
            >
              <dt className="order-2 text-sm text-(--cove-muted)">{s.label}</dt>
              <dd className="cove-display order-1 text-7xl leading-none tabular-nums lg:text-8xl">
                <CountUp to={s.value} decimals={s.decimals} duration={2} />
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-(--cove-muted)">{proof.statsNote}</p>
      </div>

      <div className="mt-24 px-4 md:mt-32">
        <div
          ref={panelRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative isolate mx-auto flex min-h-[640px] max-w-[1400px] flex-col justify-between gap-12 overflow-hidden rounded-3xl p-6 text-white md:h-[88svh] md:max-h-[880px] md:p-12"
        >
          <Image src={proof.image.src} alt={proof.image.alt} fill sizes="(min-width: 1400px) 1400px, 100vw" className="-z-10 object-cover object-bottom" />

          {/* The sky here is pale, so the quote is set in ink; white is kept for the names on the grass. */}
          <figure className="flex max-w-5xl flex-col gap-6 text-(--cove-ink)">
            <span aria-hidden className="cove-display -mb-8 text-9xl leading-none text-(--cove-sea) md:-mb-12">
              &ldquo;
            </span>
            <blockquote className="cove-display min-h-[3.3em] text-4xl text-balance md:text-6xl">
              {seen && (
                <FoldText
                  key={active}
                  text={quote.quote}
                  splitBy="word"
                  hinge="top"
                  foldStyle="paper"
                  duration={0.9}
                  stagger={0.05}
                  fontSize="inherit"
                  fontWeight={400}
                  style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
                />
              )}
            </blockquote>
            {/* Frosted pill: on short screens this line can land on the dark hills. */}
            <p
              key={`r${active}`}
              className="cove-swap flex w-max max-w-full items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3 py-1.5 font-mono text-xs text-(--cove-ink) shadow-sm backdrop-blur-md md:text-sm"
            >
              <CheckCircleIcon size={16} weight="fill" className="text-(--cove-sea)" /> {quote.result}
            </p>
          </figure>

          <nav aria-label="Choose a testimonial" className="grid gap-4 border-t border-white/40 sm:grid-cols-3">
            {proof.testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "relative flex flex-col gap-1 pt-4 text-left [text-shadow:0_1px_12px_rgb(0_0_0_/_0.35)] transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                  i === active ? "opacity-100" : "opacity-60",
                )}
              >
                {i === active && (
                  <span
                    key={active}
                    aria-hidden
                    onAnimationEnd={next}
                    className="cove-progress absolute -top-px left-0 h-0.5 w-full bg-white"
                    style={{ animationDuration: `${proof.interval}ms`, animationPlayState: playing ? "running" : "paused" }}
                  />
                )}
                <span className="text-base font-semibold">{t.name}</span>
                <span className="text-sm text-white/80">
                  {t.role}, {t.company}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
