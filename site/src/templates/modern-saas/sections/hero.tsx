import Image from "next/image";
import { ArrowRightIcon, StarIcon } from "@phosphor-icons/react/ssr";
import Noise from "../components/Noise";
import SplitText from "../components/SplitText";
import StarBorder from "../components/StarBorder";
import { InboxMockup } from "../components/inbox-mockup";
import { hero } from "../content";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden px-4 pt-40 pb-24 md:pt-48 md:pb-32">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-bottom [mask-image:linear-gradient(to_bottom,#000_88%,transparent)]"
      />
      <Noise opacity={0.035} fps={12} className="-z-10" />

      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <a
          href={hero.announcement.href}
          className="cove-rise group mb-8 flex items-center gap-2 rounded-full border border-(--cove-line) bg-white/70 py-1 pr-3 pl-1 text-sm backdrop-blur-md transition-colors duration-700 hover:bg-white"
        >
          <span className="rounded-full bg-(--cove-ink) px-2 py-0.5 text-xs font-semibold text-white">
            {hero.announcement.tag}
          </span>
          <span className="text-(--cove-muted)">{hero.announcement.text}</span>
          <ArrowRightIcon
            size={14}
            className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
          />
        </a>

        <h1 className="cove-display cove-ink-fade max-w-[680px] text-4xl leading-none sm:text-6xl md:max-w-none md:text-7xl lg:text-8xl">
          {/* SplitText's root is inline-block; the wrapper forces one line per entry. */}
          {hero.headline.map((line) => (
            <span key={line} className="block pb-2">
              <SplitText
                text={line}
                tag="span"
                splitType="words"
                effect="blur"
                trigger="load"
                delay={90}
                duration={1.4}
              />
            </span>
          ))}
        </h1>

        <p
          className="cove-rise mt-6 max-w-[680px] text-base text-balance text-(--cove-muted) md:text-lg"
          style={{ animationDelay: "500ms" }}
        >
          {hero.subheadline}
        </p>

        <div
          className="cove-rise mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
          style={{ animationDelay: "650ms" }}
        >
          <StarBorder
            as="a"
            href={hero.primaryCta.href}
            theme="dark"
            radius={999}
            duration={5}
            glow={0.9}
            className="text-base font-semibold transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] active:scale-[0.98]"
          >
            {hero.primaryCta.label}
          </StarBorder>
          <a
            href={hero.secondaryCta.href}
            className="group flex items-center gap-2 text-base font-semibold"
          >
            {hero.secondaryCta.label}
            <ArrowRightIcon
              size={16}
              className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
            />
          </a>
        </div>

        <p
          className="cove-rise mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-(--cove-muted)"
          style={{ animationDelay: "800ms" }}
        >
          <span className="flex items-center gap-1 text-(--cove-ink)">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} size={14} weight="fill" />
            ))}
            <span className="ml-1 font-semibold">{hero.proof.rating}</span>
          </span>
          <span>from {hero.proof.reviews}</span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <span>{hero.proof.teams}</span>
        </p>

        <InboxMockup className="cove-rise mt-16 w-full max-w-5xl md:mt-24 [animation-delay:950ms]" />
      </div>
    </section>
  );
}
