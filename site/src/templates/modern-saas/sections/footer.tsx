"use client";

import { GithubLogoIcon, LinkedinLogoIcon, XLogoIcon } from "@phosphor-icons/react";
import MaskedHeading from "../components/MaskedHeading";
import { brand, footer } from "../content";

const SOCIAL_ICONS = { x: XLogoIcon, linkedin: LinkedinLogoIcon, github: GithubLogoIcon };

const LINK =
  "text-sm text-(--cove-muted) transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-(--cove-ink)";

export function Footer() {
  return (
    <footer className="px-4 pt-24 pb-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="flex flex-col gap-3">
            <a href={brand.href} className="cove-display w-max text-3xl leading-none">
              {brand.name}
            </a>
            <p className="max-w-xs text-sm text-(--cove-muted)">{footer.tagline}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footer.columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="flex flex-col gap-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className={LINK}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* The page closes on the photo it opened with, seen through the wordmark.
            overflow-hidden: MaskedHeading scales its photo layer to 125%, which would
            otherwise widen the page on phones. */}
        <div className="overflow-hidden">
          <MaskedHeading
            text={footer.wordmark.text}
            tag="p"
            src={footer.wordmark.image.src}
            reveal="rise"
            trigger="view"
            weight={400}
            tracking={-0.02}
            lineHeight={0.9}
            textScale={0.5}
            parallax={30}
            drift={14}
            spotlight={false}
            aria-hidden
            className="cove-display cove-wordmark select-none"
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-(--cove-line) pt-6 text-sm text-(--cove-muted) md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{footer.copyright}</span>
            {footer.legal.map((l) => (
              <a key={l.label} href={l.href} className={LINK}>
                {l.label}
              </a>
            ))}
            <span className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>
              {footer.status}
            </span>
          </div>
          <ul className="flex items-center gap-2">
            {footer.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <li key={s.icon}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-full border border-(--cove-line) text-(--cove-ink) transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-(--cove-ink)/30"
                  >
                    <Icon size={16} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
