import Image from "next/image";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/ssr";
import LightRays from "../components/LightRays";
import SplitText from "../components/SplitText";
import StarBorder from "../components/StarBorder";
import { finalCta } from "../content";

// The canyon's bright haze is the light source: rays pour down through it and the
// headline sits in the glow, in ink, like the hero's type in the sky.
export function FinalCta() {
  return (
    <section
      id="start"
      aria-label="Start your free trial"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-4 py-32"
    >
      <Image
        src={finalCta.image.src}
        alt={finalCta.image.alt}
        fill
        sizes="100vw"
        className="-z-20 object-cover [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]"
      />
      <LightRays
        raysOrigin="top-center"
        raysColor="#f2c46b"
        lightMode
        lightSpread={0.7}
        rayLength={2.2}
        intensity={1.1}
        glow={0.5}
        haze={0.3}
        followMouse
        mouseInfluence={0.08}
        cursorShadow={false}
        clickPulse={false}
        opacity={0.75}
        className="absolute! inset-0 -z-10"
      />

      <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <span className="text-sm font-medium text-(--cove-sea)">{finalCta.eyebrow}</span>
        <h2 className="cove-display cove-ink-fade text-5xl leading-none sm:text-7xl lg:text-8xl">
          {/* SplitText's root is inline-block; the wrapper forces one line per entry. */}
          {finalCta.headline.map((line) => (
            <span key={line} className="block pb-2">
              <SplitText text={line} tag="span" splitType="words" effect="blur" trigger="view" delay={90} duration={1.3} />
            </span>
          ))}
        </h2>
        <p className="max-w-[560px] text-base text-balance text-(--cove-ink)/75 md:text-lg">{finalCta.subheadline}</p>

        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <StarBorder
            as="a"
            href={finalCta.primaryCta.href}
            theme="dark"
            radius={999}
            duration={5}
            glow={0.9}
            className="text-base font-semibold transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] active:scale-[0.98]"
          >
            {finalCta.primaryCta.label}
          </StarBorder>
          <a href={finalCta.secondaryCta.href} className="group flex items-center gap-2 text-base font-semibold">
            {finalCta.secondaryCta.label}
            <ArrowRightIcon
              size={16}
              className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Frosted pill so the small reassurance line reads on any part of the photo. */}
        <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm text-(--cove-ink) backdrop-blur-md">
          {finalCta.reassurance.map((r) => (
            <li key={r} className="flex items-center gap-1">
              <CheckIcon size={14} weight="bold" className="text-(--cove-sea)" />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
