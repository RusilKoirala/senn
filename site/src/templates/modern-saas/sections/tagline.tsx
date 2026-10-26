"use client";

import ScrollExpand from "../components/ScrollExpand";
import ScrollReveal from "../components/ScrollReveal";
import { tagline } from "../content";

export function Tagline() {
  return (
    <section aria-label="Why teams choose Cove">
      {/* Large tagline, words go from muted to full ink one at a time. */}
      <div className="mx-auto max-w-[680px] px-4 pt-16 pb-24 md:max-w-4xl md:pt-24 md:pb-32">
        {tagline.lines.map((line) => (
          <ScrollReveal
            key={line}
            baseOpacity={0.28}
            baseRotation={0}
            blurStrength={6}
            stagger={0.08}
            effect="fade"
            mode="scrub"
            containerClassName="my-0! text-center"
            textClassName="cove-display text-4xl! leading-tight! font-normal! sm:text-5xl! md:text-7xl!"
          >
            {line}
          </ScrollReveal>
        ))}
      </div>

      <ScrollExpand
        src={tagline.image.src.src}
        alt={tagline.image.alt}
        title={tagline.lead}
        className="cove-expand"
        useWindowScroll
        startWidth={46}
        startHeight={54}
        startRadius={24}
        mediaZoom={1.15}
        scrollDistance={1.1}
        holdDistance={0.4}
        smoothing={0.12}
        overlayScrim={0.4}
      >
        <p className="cove-display text-5xl text-white [text-shadow:0_2px_32px_rgb(0_0_0_/_0.35)] md:text-8xl">{tagline.payoff.time}</p>
        <p className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-sm text-white [text-shadow:0_1px_12px_rgb(0_0_0_/_0.5)] md:text-base">
          {tagline.payoff.stats.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
      </ScrollExpand>
    </section>
  );
}
