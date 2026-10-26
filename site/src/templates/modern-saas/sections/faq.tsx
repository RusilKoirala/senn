"use client";

import { useId, useState } from "react";
import { ArrowRightIcon, PlusIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import AnimatedContent from "../components/AnimatedContent";
import SplitText from "../components/SplitText";
import { faq } from "../content";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

// FAQPage structured data for search and answer engines.
const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
});

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section id="faq" className="px-4 py-24 md:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA }} />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <header className="flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start">
          <span className="text-sm font-medium text-(--cove-sea)">{faq.eyebrow}</span>
          <h2 className="cove-display cove-ink-fade text-4xl leading-none sm:text-6xl md:text-7xl">
            {/* SplitText's root is inline-block; the wrapper forces one line per entry. */}
            {faq.headline.map((line) => (
              <span key={line} className="block pb-1">
                <SplitText text={line} tag="span" splitType="words" effect="blur" trigger="view" delay={80} duration={1.2} textAlign="left" />
              </span>
            ))}
          </h2>
          <p className="mt-2 max-w-sm text-base text-pretty text-(--cove-muted)">{faq.contact.text}</p>
          <a href={faq.contact.cta.href} className="group flex w-max items-center gap-2 text-base font-semibold">
            {faq.contact.cta.label}
            <ArrowRightIcon size={16} className={cn("transition-transform duration-700 group-hover:translate-x-1", EASE)} />
          </a>
        </header>

        <AnimatedContent distance={40} blur={6} duration={1} stagger={0.08} threshold={0.15} className="border-t border-(--cove-line)">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-(--cove-line)">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={cn(
                      "group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--cove-sea)",
                      EASE,
                      isOpen ? "text-(--cove-ink)" : "text-(--cove-ink)/70 hover:text-(--cove-ink)",
                    )}
                  >
                    <span className="cove-display text-2xl leading-tight text-balance md:text-3xl">{item.q}</span>
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-700",
                        EASE,
                        isOpen
                          ? "rotate-45 border-(--cove-ink) bg-(--cove-ink) text-white"
                          : "border-(--cove-line) group-hover:border-(--cove-ink)/30",
                      )}
                    >
                      <PlusIcon size={16} weight="bold" />
                    </span>
                  </button>
                </h3>
                {/* grid-rows 0fr → 1fr animates to the answer's natural height. */}
                <div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  className={cn("grid transition-all duration-700", EASE, isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pr-16 pb-6 text-base text-pretty text-(--cove-muted) md:text-lg">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </AnimatedContent>
      </div>
    </section>
  );
}
