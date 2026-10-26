"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { CopyCommand } from "../components/copy-command";
import DecryptedText from "../components/DecryptedText";
import SplitText from "../components/SplitText";
import SpotlightCard from "../components/SpotlightCard";
import { TemplatePreview } from "../components/template-preview";
import { gallery } from "../content";

export function Gallery() {
  const t = gallery.featured;

  return (
    <section id="templates" className="px-4 py-24 md:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <header className="flex max-w-3xl flex-col gap-4">
          <span className="font-mono text-xs text-(--senn-muted)">{gallery.eyebrow}</span>
          <h2 className="senn-ink-fade text-4xl leading-none font-semibold tracking-[-0.04em] sm:text-6xl">
            {gallery.headline.map((line) => (
              <span key={line} className="block pb-1">
                <SplitText text={line} tag="span" splitType="words" effect="blur" trigger="view" delay={80} duration={1.2} textAlign="left" />
              </span>
            ))}
          </h2>
          <p className="max-w-[560px] text-base text-pretty text-(--senn-muted) md:text-lg">{gallery.subheadline}</p>
        </header>

        <article className="grid gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-center">
          {/* Card rounded-3xl (24) with 8px padding → preview rounded-2xl (16) */}
          <SpotlightCard theme="dark" spotlightColor="rgba(255, 255, 255, 0.12)" className="p-2!">
            <TemplatePreview src={t.href} title={`${t.name} template, live preview`} />
          </SpotlightCard>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 font-mono text-xs text-(--senn-muted)">
              <span>01</span>
              <span className="rounded-full border border-(--senn-line) px-2 py-0.5">{t.codename}</span>
            </div>
            <h3 className="text-4xl leading-none font-semibold tracking-[-0.04em]">{t.name}</h3>
            <p className="text-base text-pretty text-(--senn-muted)">{t.description}</p>
            <ul className="flex flex-wrap gap-2">
              {t.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-(--senn-muted)">
                  {tag}
                </li>
              ))}
            </ul>
            <dl className="grid grid-cols-3 gap-4 border-y border-(--senn-line) py-4">
              {t.facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <dt className="order-2 text-xs text-(--senn-muted)">{f.label}</dt>
                  <dd className="order-1 text-2xl font-semibold tracking-tight">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-3">
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-max items-center gap-2 rounded-full bg-white px-5 py-2.5 text-base font-semibold text-black transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] active:scale-[0.98]"
              >
                Open live preview
                <ArrowUpRightIcon
                  size={16}
                  weight="bold"
                  className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <CopyCommand command={t.command} />
            </div>
          </div>
        </article>

        <div>
          <p className="mb-4 font-mono text-xs text-(--senn-muted)">In the works</p>
          <ol className="border-t border-(--senn-line)">
            {gallery.upcoming.map((u, i) => (
              <li
                key={u.name}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 border-b border-(--senn-line) py-6 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)_auto]"
              >
                <span className="font-mono text-xs text-(--senn-muted)">{String(i + 2).padStart(2, "0")}</span>
                <span className="text-2xl font-semibold tracking-tight md:text-3xl">
                  <DecryptedText
                    text={u.name}
                    animateOn="view"
                    sequential
                    revealDirection="start"
                    speed={40}
                    encryptedClassName="text-(--senn-muted)"
                  />
                </span>
                <span className="col-start-2 text-sm text-(--senn-muted) md:col-start-auto">{u.vibe}</span>
                <span className="col-start-2 w-max rounded-full border border-(--senn-line) px-2 py-0.5 font-mono text-xs text-(--senn-muted) md:col-start-auto">
                  Soon
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
