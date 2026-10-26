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

const num = (i: number) => `Q${String(i + 1).padStart(2, "0")}`;

// Desktop: the questions are an index and the chosen answer is set large beside it.
// Phones: a plain accordion.
export function Faq() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section id="faq" className="px-4 py-24 md:px-8 md:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA }} />
      <div className="mx-auto max-w-7xl">
        <p className="summit-mono mb-4 text-sm text-(--summit-copper)">{faq.eyebrow}</p>
        <h2 className="summit-display mb-16 text-4xl leading-none sm:text-6xl lg:text-7xl">
          {faq.headline.map((line) => (
            <span key={line} className="block pb-1">
              <SplitText text={line} tag="span" splitType="words" effect="blur" trigger="view" delay={80} duration={1.2} textAlign="left" />
            </span>
          ))}
        </h2>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <AnimatedContent distance={40} blur={6} duration={1} stagger={0.08} threshold={0.15} className="border-t border-(--summit-line)">
            {faq.items.map((item, i) => {
              const isActive = active === i;
              const isOpen = open === i;
              return (
                <div key={item.q} className="border-b border-(--summit-line)">
                  {/* Desktop index row */}
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    aria-controls={`${id}-panel`}
                    className={cn(
                      "group hidden w-full items-center gap-4 py-5 text-left transition-colors duration-700 focus-visible:outline-none lg:flex",
                      EASE,
                      isActive ? "text-(--summit-cream)" : "text-(--summit-cream-muted) hover:text-(--summit-cream)",
                    )}
                  >
                    <span className={cn("summit-mono w-10 shrink-0 text-xs", isActive && "text-(--summit-copper)")}>{num(i)}</span>
                    <span className="flex-1 text-xl font-medium group-focus-visible:underline">{item.q}</span>
                    <ArrowRightIcon
                      size={18}
                      className={cn(
                        "transition-all duration-700",
                        EASE,
                        isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                      )}
                    />
                  </button>

                  {/* Phone accordion row */}
                  <h3 className="lg:hidden">
                    <button
                      type="button"
                      id={`${id}-q${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`${id}-a${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center gap-4 py-5 text-left text-lg font-medium"
                    >
                      <span className="summit-mono w-10 shrink-0 text-xs text-(--summit-copper)">{num(i)}</span>
                      <span className="flex-1">{item.q}</span>
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full border border-(--summit-line) transition-all duration-700",
                          EASE,
                          isOpen && "rotate-45 bg-(--summit-cream) text-(--summit-ink)",
                        )}
                      >
                        <PlusIcon size={14} weight="bold" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${id}-a${i}`}
                    role="region"
                    aria-labelledby={`${id}-q${i}`}
                    className={cn(
                      "grid transition-all duration-700 lg:hidden",
                      EASE,
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <p className="overflow-hidden pl-14 text-base text-pretty text-(--summit-cream-muted)">
                      <span className="block pb-6">{item.a}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </AnimatedContent>

          <div id={`${id}-panel`} aria-live="polite" className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
            <div key={active} className="summit-swap">
              <p className="summit-mono text-sm text-(--summit-copper)">{num(active)}</p>
              <p className="mt-4 text-sm text-(--summit-cream-muted)">{faq.items[active].q}</p>
              <p className="summit-display mt-6 text-4xl leading-tight text-pretty">{faq.items[active].a}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
