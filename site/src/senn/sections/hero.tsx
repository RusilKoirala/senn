"use client";

import { ArrowDownIcon } from "@phosphor-icons/react";
import { CopyCommand } from "../components/copy-command";
import DarkVeil from "../components/DarkVeil";
import ShinyText from "../components/ShinyText";
import SplitText from "../components/SplitText";
import { WebGLFallback } from "../components/webgl-fallback";
import { hero } from "../content";

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-svh items-center overflow-hidden px-4 pt-32 pb-24">
      <WebGLFallback className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]">
        <DarkVeil color="#d4d4d4" speed={0.4} brightness={0.7} mouseInteraction mouseStrength={0.3} opacity={0.8} />
      </WebGLFallback>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <span className="senn-rise mb-8 rounded-full border border-(--senn-line) bg-black/40 px-3 py-1 text-xs backdrop-blur-md">
          <ShinyText text={hero.badge} color="#9b9b9b" shineColor="#ffffff" speed={3} />
        </span>

        <h1 className="senn-ink-fade text-3xl leading-none font-semibold tracking-[-0.045em] min-[400px]:text-4xl sm:text-6xl lg:text-7xl xl:text-8xl">
          {/* SplitText's root is inline-block; the wrapper forces one line per entry. */}
          {hero.headline.map((line) => (
            <span key={line} className="block pb-2">
              <SplitText text={line} tag="span" splitType="words" effect="blur" trigger="load" delay={80} duration={1.3} className="text-balance" />
            </span>
          ))}
        </h1>

        <p
          className="senn-rise mt-6 max-w-[680px] text-base text-balance text-(--senn-muted) md:text-lg"
          style={{ animationDelay: "500ms" }}
        >
          {hero.subheadline}
        </p>

        <div
          className="senn-rise mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "650ms" }}
        >
          <a
            href={hero.primaryCta.href}
            className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-base font-semibold text-black transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] active:scale-[0.98]"
          >
            {hero.primaryCta.label}
            <ArrowDownIcon
              size={16}
              weight="bold"
              className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0.5"
            />
          </a>
          <CopyCommand command={hero.command} className="max-w-full" />
        </div>

        <p
          className="senn-rise mt-8 flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-xs text-(--senn-muted)"
          style={{ animationDelay: "800ms" }}
        >
          {hero.proof.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
