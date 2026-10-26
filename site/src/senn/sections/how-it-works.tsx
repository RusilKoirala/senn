"use client";

import SplitText from "../components/SplitText";
import TextType from "../components/TextType";
import { howItWorks } from "../content";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-12">
          <header className="flex flex-col gap-4">
            <span className="font-mono text-xs text-(--senn-muted)">{howItWorks.eyebrow}</span>
            <h2 className="senn-ink-fade text-4xl leading-none font-semibold tracking-[-0.04em] sm:text-6xl">
              {howItWorks.headline.map((line) => (
                <span key={line} className="block pb-1">
                  <SplitText text={line} tag="span" splitType="words" effect="blur" trigger="view" delay={80} duration={1.2} textAlign="left" />
                </span>
              ))}
            </h2>
          </header>
          <ol className="flex flex-col gap-8">
            {howItWorks.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4">
                <span className="font-mono text-xs leading-8 text-(--senn-muted)">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="max-w-md text-base text-pretty text-(--senn-muted)">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="overflow-hidden rounded-2xl border border-(--senn-line) bg-(--senn-surface) shadow-[0_40px_80px_-40px_rgb(0_0_0_/_0.9)]">
          <div className="flex items-center gap-3 border-b border-(--senn-line) px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </span>
            <span className="mx-auto font-mono text-xs text-(--senn-muted)">~/my-app</span>
          </div>
          <div className="flex min-h-72 flex-col gap-3 p-6 font-mono text-sm">
            {/* div, not p: TextType renders a div. */}
            <div className="flex min-w-0 gap-2">
              <span className="text-(--senn-live)">$</span>
              <TextType
                text={[...howItWorks.commands]}
                typingSpeed={45}
                deletingSpeed={20}
                pauseDuration={2600}
                cursorStyle="block"
                startOnVisible
                className="min-w-0 break-all"
              />
            </div>
            <ul className="mt-2 flex flex-col gap-2 text-(--senn-muted)">
              {howItWorks.output.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
