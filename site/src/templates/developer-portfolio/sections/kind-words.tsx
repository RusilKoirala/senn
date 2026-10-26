"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import DecryptedText from "../components/DecryptedText";
import { kindWords } from "../content";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
const SECONDS_PER_QUOTE = 9;

export function KindWords() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [hover, setHover] = useState(false);
  const quote = kindWords.quotes[active];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setOnScreen(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const next = () => setActive((i) => (i + 1) % kindWords.quotes.length);

  return (
    <section
      ref={ref}
      aria-label={kindWords.eyebrow}
      className="px-4 py-12 md:px-8 md:py-16"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative isolate mx-auto flex min-h-[640px] max-w-7xl flex-col justify-between overflow-hidden rounded-3xl p-6 md:min-h-[720px] md:p-12">
        <Image
          src={kindWords.image.src}
          alt={kindWords.image.alt}
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="-z-20 scale-125 object-cover object-[50%_90%]"
        />
        {/* Flat dim so the cream type reads on the copper rock. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#131209]/55" />

        <p className="summit-mono text-sm text-(--summit-copper)">{kindWords.eyebrow}</p>

        <figure className="my-12 max-w-4xl">
          <span aria-hidden className="summit-display block text-8xl leading-none text-(--summit-copper)">
            &ldquo;
          </span>
          <blockquote key={active} className="summit-display text-3xl leading-tight text-balance md:text-5xl">
            {seen ? (
              <DecryptedText
                text={quote.quote}
                animateOn="view"
                sequential
                speed={14}
                revealDirection="start"
                useOriginalCharsOnly
                encryptedClassName="text-(--summit-copper)"
              />
            ) : (
              <span className="opacity-0">{quote.quote}</span>
            )}
          </blockquote>
          <figcaption key={`r${active}`} className="summit-swap mt-8">
            <span className="summit-mono inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-(--summit-cream) backdrop-blur-md">
              {quote.result}
            </span>
          </figcaption>
        </figure>

        {/* Names as credits. The active one runs a timer line that moves to the next quote. */}
        <ul className="grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-3">
          {kindWords.quotes.map((q, i) => {
            const on = i === active;
            return (
              <li key={q.name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={cn(
                    "group flex w-full flex-col gap-1 text-left transition-opacity duration-700 focus-visible:outline-none",
                    EASE,
                    on ? "opacity-100" : "opacity-50 hover:opacity-80",
                  )}
                >
                  <span className="relative mb-3 block h-px w-full overflow-hidden bg-white/15">
                    {on && (
                      <span
                        className="summit-progress absolute inset-0 bg-(--summit-cream)"
                        style={{
                          animationDuration: `${SECONDS_PER_QUOTE}s`,
                          animationPlayState: onScreen && !hover ? "running" : "paused",
                        }}
                        onAnimationEnd={next}
                      />
                    )}
                  </span>
                  <span className="text-base font-semibold group-focus-visible:underline">{q.name}</span>
                  <span className="text-sm text-(--summit-cream-muted)">{q.role}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
