import Image from "next/image";
import { ArrowDownIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Noise from "../components/Noise";
import RotatingText from "../components/RotatingText";
import SplitText from "../components/SplitText";
import { LocalTime } from "../components/local-time";
import { hero, person } from "../content";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex flex-col overflow-hidden bg-(--summit-sky) text-(--summit-ink)"
    >
      {/* The night colour sits under the bottom of the photo, so the rock melts into the page. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-30 h-1/3 bg-(--summit-night)" />
      <Noise opacity={0.04} fps={12} className="-z-10" />

      {/* The nav watches this band to know when it has left the sky. */}
      <div id="summit-sky" aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[45%]" />

      <div className="mx-auto w-full max-w-7xl px-4 pt-32 md:px-8 md:pt-40">
        <p className="summit-rise mb-8 inline-flex items-center gap-2 rounded-full border border-(--summit-ink)/10 bg-white/35 py-1 pr-3 pl-2 text-sm font-medium backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="summit-ping absolute inset-0 rounded-full bg-emerald-600" />
            <span className="relative size-2 rounded-full bg-emerald-600" />
          </span>
          {hero.status}
        </p>

        <h1 className="summit-display summit-ink-fade max-w-[680px] text-4xl leading-none min-[400px]:text-5xl sm:text-7xl md:max-w-none lg:text-8xl">
          <span className="flex flex-wrap items-baseline gap-x-[0.24em] pb-2">
            <SplitText text={hero.lead} tag="span" splitType="words" effect="blur" trigger="load" delay={90} duration={1.4} textAlign="left" />
            <span className="summit-rise text-(--summit-ember)" style={{ animationDelay: "250ms" }}>
              <RotatingText
                texts={hero.rotating}
                effect="blur"
                rotationInterval={2600}
                staggerDuration={0.02}
                splitBy="characters"
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                mainClassName="overflow-hidden pb-[0.08em]"
              />
            </span>
          </span>
          <span className="block">
            <SplitText
              text={hero.close}
              tag="span"
              splitType="words"
              effect="blur"
              trigger="load"
              delay={90}
              duration={1.4}
              textAlign="left"
              className="text-balance"
            />
          </span>
        </h1>

        <p
          className="summit-rise mt-6 max-w-md text-base text-pretty text-(--summit-ink-muted) md:text-lg"
          style={{ animationDelay: "500ms" }}
        >
          {hero.subheadline}
        </p>

        <div
          className="summit-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
          style={{ animationDelay: "650ms" }}
        >
          <a
            href={hero.primaryCta.href}
            className={`group inline-flex items-center gap-2 rounded-full bg-(--summit-ink) py-2 pr-2 pl-4 text-base font-semibold text-(--summit-cream) shadow-[0_24px_48px_-24px_rgb(19_18_9_/_0.6)] transition-transform duration-700 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-(--summit-ink) focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] ${EASE}`}
          >
            {hero.primaryCta.label}
            <span className="flex size-8 items-center justify-center rounded-full bg-(--summit-cream) text-(--summit-ink)">
              <ArrowUpRightIcon
                size={16}
                weight="bold"
                className={`transition-transform duration-700 group-hover:rotate-45 ${EASE}`}
              />
            </span>
          </a>
          <a href={hero.secondaryCta.href} className="group inline-flex items-center gap-2 text-base font-semibold">
            {hero.secondaryCta.label}
            <ArrowDownIcon
              size={16}
              weight="bold"
              className={`transition-transform duration-700 group-hover:translate-y-1 ${EASE}`}
            />
          </a>
        </div>
      </div>

      {/* The photo sits in the flow under the copy and tucks up behind it, so the peak
          always starts just below the buttons, whatever the viewport height. */}
      <div className="summit-settle relative -z-20 -mt-16 h-[60svh] w-full md:-mt-[17vw] md:h-auto md:aspect-video">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[52%_100%] [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_60%,transparent)]"
        />
      </div>

      {/* Facts strip, where the rock fades into the night. */}
      <div
        className="summit-rise absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-4 pb-6 md:px-8 md:pb-8"
        style={{ animationDelay: "950ms" }}
      >
        <div className="flex flex-col gap-6 border-t border-(--summit-line) pt-6 text-(--summit-cream) md:flex-row md:items-end md:justify-between">
          <dl className="grid grid-cols-3 gap-6 md:flex md:gap-12">
            {hero.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <dt className="order-2 text-xs text-(--summit-cream-muted) md:text-sm">{fact.label}</dt>
                <dd className="summit-display order-1 text-2xl md:text-4xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="summit-mono flex items-center gap-3 text-xs text-(--summit-cream-muted) md:text-sm">
            <span>{person.city}</span>
            <span aria-hidden>·</span>
            <LocalTime timeZone={person.timeZone} className="text-(--summit-cream) tabular-nums" />
            <span aria-hidden>·</span>
            <span>{person.utc}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
