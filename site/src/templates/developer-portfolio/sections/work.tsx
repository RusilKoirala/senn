"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import CountUp from "../components/CountUp";
import SplitText from "../components/SplitText";
import { workVisuals } from "../components/work-visuals";
import { work } from "../content";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

// Desktop: the section pins and vertical scrolling slides the plates sideways.
// Phones: the plates simply stack.
export function Work() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const dist = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * dist.get());

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      const d = mq.matches ? Math.max(0, el.scrollWidth - window.innerWidth) : 0;
      dist.set(d);
      setDistance(d);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, [dist]);

  return (
    <section
      id="work"
      ref={wrap}
      className="relative"
      style={distance ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:overflow-hidden">
        <header className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pt-8 pb-12 md:px-8 lg:flex-row lg:items-end lg:justify-between lg:pt-28 lg:pb-8">
          <div>
            <p className="summit-mono mb-4 text-sm text-(--summit-copper)">{work.eyebrow}</p>
            <h2 className="summit-display text-4xl leading-none sm:text-6xl lg:text-7xl">
              {work.headline.map((line) => (
                <span key={line} className="block pb-1">
                  <SplitText text={line} tag="span" splitType="words" effect="blur" trigger="view" delay={80} duration={1.2} textAlign="left" />
                </span>
              ))}
            </h2>
          </div>
          <p className="summit-mono hidden items-center gap-3 text-sm text-(--summit-cream-muted) lg:flex">
            {work.note}
            <span className="relative block h-px w-24 overflow-hidden bg-(--summit-line)">
              <motion.span className="absolute inset-0 origin-left bg-(--summit-copper)" style={{ scaleX: scrollYProgress }} />
            </span>
          </p>
        </header>

        <motion.div
          ref={track}
          style={{ x }}
          className="flex flex-col gap-16 px-4 pb-24 md:px-8 lg:min-h-0 lg:flex-1 lg:flex-row lg:gap-6 lg:pb-8 lg:pl-[max(32px,calc((100vw-1280px)/2+32px))]"
        >
          {work.projects.map((project, i) => (
            <Plate key={project.slug} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

type Project = (typeof work.projects)[number];

function Plate({ project, index }: { project: Project; index: number }) {
  const Visual = workVisuals[project.visual];
  return (
    <article className="flex flex-col gap-6 lg:relative lg:h-full lg:w-[min(1120px,84vw)] lg:shrink-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:absolute lg:inset-0 lg:aspect-auto">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 84vw, 100vw"
          className="object-cover"
        />
        <div
          className={cn(
            "absolute inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:right-8 sm:w-[440px] lg:right-10",
            project.tone === "light" && "summit-light",
          )}
        >
          <Visual />
        </div>
      </div>

      {/* Phones: the details sit under the photo. Desktop: a frosted panel on it. */}
      <div
        className={cn(
          "text-(--summit-cream) lg:absolute lg:bottom-6 lg:left-6 lg:w-[420px] lg:rounded-2xl lg:border lg:border-(--summit-panel-line) lg:bg-(--summit-panel) lg:p-6 lg:backdrop-blur-xl",
          project.tone === "light" && "summit-light-lg",
        )}
      >
        <p className="summit-mono flex flex-wrap gap-x-3 text-xs text-(--summit-cream-muted)">
          <span className="text-(--summit-copper)">
            {String(index + 1).padStart(2, "0")} / {String(work.projects.length).padStart(2, "0")}
          </span>
          <span>{project.client}</span>
          <span>{project.years}</span>
        </p>
        <h3 className="summit-display mt-3 text-4xl leading-none lg:text-5xl">{project.title}</h3>
        <p className="mt-1 text-sm text-(--summit-cream-muted)">{project.role}</p>
        <p className="mt-4 text-base text-pretty text-(--summit-cream)/85 lg:text-sm">{project.summary}</p>

        <div className="mt-6 flex items-end gap-4 border-t border-(--summit-line) pt-4">
          <span className="summit-display text-4xl leading-none tabular-nums">
            <CountUp
              to={project.stat.value}
              decimals={project.stat.decimals}
              separator=","
              duration={1.8}
              suffix={project.stat.suffix}
            />
          </span>
          <span className="pb-1 text-xs text-pretty text-(--summit-cream-muted)">{project.stat.label}</span>
        </div>

        <ul className="summit-mono mt-4 flex flex-wrap gap-2 text-xs">
          {project.stack.map((tool) => (
            <li key={tool} className="rounded-full border border-(--summit-line) px-2 py-1 text-(--summit-cream-muted)">
              {tool}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {project.links.map((link) => (
            <a key={link.label} href={link.href} className="group inline-flex items-center gap-1 text-sm font-semibold">
              {link.label}
              <ArrowUpRightIcon
                size={14}
                weight="bold"
                className={cn("transition-transform duration-700 group-hover:rotate-45", EASE)}
              />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
