"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import FlowingMenu from "../components/FlowingMenu";
import { moreWork } from "../content";

export function MoreWork() {
  return (
    <section id="more" aria-label={moreWork.eyebrow} className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="summit-mono mb-4 text-sm text-(--summit-copper)">{moreWork.eyebrow}</p>
            <p className="max-w-md text-base text-pretty text-(--summit-cream-muted) md:text-lg">{moreWork.text}</p>
          </div>
          <a
            href={moreWork.githubCta.href}
            className="group inline-flex w-max items-center gap-1 text-base font-semibold"
          >
            {moreWork.githubCta.label}
            <ArrowUpRightIcon
              size={16}
              weight="bold"
              className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-45"
            />
          </a>
        </div>

        {/* A marquee runs through the hovered row with the project's short version. */}
        <div className="h-[360px] border-y border-(--summit-line) md:h-[520px]">
          <FlowingMenu
            items={moreWork.items}
            align="left"
            showIndex
            showArrow
            speed={56}
            textColor="#f3ede4"
            bgColor="#131209"
            marqueeBgColor="#d9774b"
            marqueeTextColor="#131209"
            borderColor="rgba(243, 237, 228, 0.1)"
            ariaLabel={moreWork.eyebrow}
          />
        </div>
      </div>
    </section>
  );
}
