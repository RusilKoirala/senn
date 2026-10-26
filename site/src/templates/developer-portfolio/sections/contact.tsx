"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRightIcon, CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import ClickSpark from "../components/ClickSpark";
import Magnet from "../components/Magnet";
import SplitText from "../components/SplitText";
import { contact, person } from "../content";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

export function Contact() {
  const [copy, setCopy] = useState<"idle" | "done" | "failed">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopy("done");
    } catch {
      setCopy("failed");
    }
    setTimeout(() => setCopy("idle"), 2400);
  };

  return (
    <section
      id="contact"
      className="relative isolate flex flex-col overflow-hidden bg-(--summit-moss-sky) text-(--summit-ink)"
    >
      <div className="mx-auto w-full max-w-7xl px-4 pt-24 md:px-8 md:pt-32">
        <h2 className="summit-display summit-ink-fade text-4xl leading-none min-[400px]:text-5xl sm:text-7xl lg:text-8xl">
          {contact.headline.map((line) => (
            <span key={line} className="block pb-2">
              <SplitText text={line} tag="span" splitType="words" effect="blur" trigger="view" delay={80} duration={1.3} textAlign="left" />
            </span>
          ))}
        </h2>
        <p className="mt-6 max-w-md text-base text-pretty text-(--summit-ink-muted) md:text-lg">{contact.text}</p>

        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
          <Magnet padding={80} magnetStrength={4} maxOffset={14}>
            <a
              href={contact.primaryCta.href}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full bg-(--summit-ink) py-2 pr-2 pl-4 text-base font-semibold text-(--summit-cream) shadow-[0_24px_48px_-24px_rgb(19_18_9_/_0.6)] transition-transform duration-700 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-(--summit-ink) focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]",
                EASE,
              )}
            >
              {contact.primaryCta.label}
              <span className="flex size-8 items-center justify-center rounded-full bg-(--summit-cream) text-(--summit-ink)">
                <ArrowUpRightIcon
                  size={16}
                  weight="bold"
                  className={cn("transition-transform duration-700 group-hover:rotate-45", EASE)}
                />
              </span>
            </a>
          </Magnet>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-(--summit-ink-muted)">{contact.emailLabel}</span>
            <ClickSpark sparkColor="#d9774b" sparkCount={10} sparkRadius={22} duration={500} className="w-max">
              <button
                type="button"
                onClick={copyEmail}
                className="group summit-mono inline-flex items-center gap-2 rounded-lg text-base font-medium focus-visible:ring-2 focus-visible:ring-(--summit-ink) focus-visible:outline-none"
              >
                {person.email}
                <span className="flex size-7 items-center justify-center rounded-full border border-(--summit-ink)/15 transition-colors duration-700 group-hover:bg-(--summit-ink)/5">
                  {copy === "done" ? <CheckIcon size={14} weight="bold" /> : <CopyIcon size={14} />}
                </span>
              </button>
            </ClickSpark>
            <span aria-live="polite" className="h-4 text-xs text-(--summit-ink-muted)">
              {copy === "done" && "Copied to your clipboard"}
              {copy === "failed" && "Copy failed. Select the address instead."}
            </span>
          </div>
        </div>
      </div>

      {/* Moss and stones rise under the copy, like the summit in the hero. */}
      <div className="relative -z-10 -mt-8 h-[48svh] w-full md:-mt-[14vw] md:h-auto md:aspect-video">
        <Image
          src={contact.image.src}
          alt={contact.image.alt}
          fill
          sizes="100vw"
          className="object-cover object-[70%_100%] [mask-image:linear-gradient(to_bottom,transparent,#000_30%)]"
        />
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/60 bg-white/80 px-3 py-1.5 text-sm font-medium whitespace-nowrap backdrop-blur-md md:bottom-12">
          {contact.reassurance}
        </p>
      </div>
    </section>
  );
}
