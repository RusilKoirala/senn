"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import GlassSurface from "../components/GlassSurface";
import SplitText from "../components/SplitText";
import {
  ApproveVisual,
  ChannelsVisual,
  DraftVisual,
  SpikeVisual,
} from "../components/benefit-visuals";
import { benefits } from "../content";

const VISUALS = {
  draft: DraftVisual,
  approve: ApproveVisual,
  channels: ChannelsVisual,
  spike: SpikeVisual,
};

type VisualKey = keyof typeof VISUALS;

// Photo with a liquid glass card floating on it, holding one benefit's mini UI.
function BenefitPanel({
  visual,
  index,
  className,
}: {
  visual: VisualKey;
  index: number;
  className?: string;
}) {
  const Visual = VISUALS[visual];
  return (
    <div className={cn("relative isolate flex items-center justify-center overflow-hidden rounded-3xl p-4 md:p-8", className)}>
      <Image
        src={benefits.image.src}
        alt={benefits.image.alt}
        fill
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="-z-10 object-cover"
      />
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={24}
        backgroundOpacity={0.25}
        brightness={70}
        blur={14}
        className="max-w-[520px]"
      >
        {/* Glass radius 24 with 12px padding → inner cards rounded-xl (12) */}
        <div key={visual} className="cove-swap h-80 w-full p-3 text-left sm:h-72" aria-hidden>
          <Visual />
        </div>
      </GlassSurface>
      <ol className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden>
        {benefits.items.map((b, i) => (
          <li
            key={b.visual}
            className={cn(
              "h-1 rounded-full bg-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
              i === index ? "w-8 opacity-100" : "w-2 opacity-50",
            )}
          />
        ))}
      </ol>
    </div>
  );
}

export function Benefits() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The step crossing the middle of the viewport drives the sticky panel.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="benefits" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <header className="flex max-w-3xl flex-col gap-4">
          <span className="text-sm font-medium text-(--cove-sea)">{benefits.eyebrow}</span>
          <h2 className="cove-display cove-ink-fade text-4xl leading-none sm:text-6xl md:text-7xl">
            {/* SplitText's root is inline-block; the wrapper forces one line per entry. */}
            {benefits.headline.map((line) => (
              <span key={line} className="block pb-1">
                <SplitText
                  text={line}
                  tag="span"
                  splitType="words"
                  effect="blur"
                  trigger="view"
                  delay={80}
                  duration={1.2}
                  textAlign="left"
                />
              </span>
            ))}
          </h2>
          <p className="max-w-[680px] text-base text-pretty text-(--cove-muted) md:text-lg">
            {benefits.subheadline}
          </p>
        </header>

        <div className="mt-16 grid gap-16 lg:mt-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <ol className="flex flex-col gap-16 lg:gap-0">
            {benefits.items.map((b, i) => (
              <li
                key={b.visual}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-index={i}
                className={cn(
                  "flex flex-col gap-6 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] lg:min-h-[75svh] lg:justify-center",
                  i === active ? "lg:opacity-100" : "lg:opacity-25",
                )}
              >
                <span className="font-mono text-sm text-(--cove-muted)">
                  {String(i + 1).padStart(2, "0")} / {String(benefits.items.length).padStart(2, "0")}
                </span>
                <h3 className="cove-display text-4xl leading-none text-balance md:text-5xl">{b.title}</h3>
                <p className="max-w-md text-base text-pretty text-(--cove-muted) md:text-lg">{b.description}</p>
                <p className="flex items-baseline gap-3 border-t border-(--cove-line) pt-4">
                  <span className="cove-display text-4xl">{b.stat.value}</span>
                  <span className="text-sm text-(--cove-muted)">{b.stat.label}</span>
                </p>
                <BenefitPanel visual={b.visual} index={i} className="aspect-[4/5] sm:aspect-[4/3] lg:hidden" />
              </li>
            ))}
          </ol>

          <div className="hidden lg:block">
            <BenefitPanel
              visual={benefits.items[active].visual}
              index={active}
              className="sticky top-24 h-[calc(100svh-8rem)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
