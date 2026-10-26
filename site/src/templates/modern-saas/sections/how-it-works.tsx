"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import CountUp from "../components/CountUp";
import SplitText from "../components/SplitText";
import { howItWorks } from "../content";

gsap.registerPlugin(ScrollTrigger);

const { image, trail, steps } = howItWorks;
// SVG space matches the photo: 100 wide, 100 / ratio tall.
const H = 100 / image.ratio;
const P = trail.map(([x, y]) => [x, (y / 100) * H] as const);

// Catmull-Rom through the traced points, as cubic Béziers, so the line bends like the trail.
const TRAIL_D = P.reduce((d, p, i) => {
  if (i === 0) return `M${p[0]} ${p[1]}`;
  const p0 = P[i - 2] ?? P[i - 1];
  const p1 = P[i - 1];
  const p3 = P[i + 1] ?? p;
  const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6];
  const c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6];
  return `${d} C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p[0]} ${p[1]}`;
}, "");

// Where each step sits along the trail (0 to 1), measured on the traced polyline.
const STEP_AT = (() => {
  const acc = [0];
  for (let i = 1; i < P.length; i++) {
    acc.push(acc[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  }
  const total = acc[acc.length - 1];
  return steps.map((s) => acc[s.at] / total);
})();

type SceneHandle = { draw: (t: number) => void };

// The photo plus the trail overlay, sized like object-cover but anchored to the
// bottom (only white sky gets cropped), so overlay percentages stay on the trail.
function TrailScene({
  reached,
  showNotes,
  onReady,
  zoom = 1.15,
}: {
  reached: number;
  showNotes: boolean;
  onReady: (h: SceneHandle) => void;
  zoom?: number;
}) {
  const lineRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);

  const draw = useCallback((t: number) => {
    const line = lineRef.current;
    const head = headRef.current;
    if (!line || !head) return;
    const len = line.getTotalLength();
    line.style.strokeDashoffset = `${len * (1 - t)}`;
    const pt = line.getPointAtLength(len * t);
    head.setAttribute("cx", `${pt.x}`);
    head.setAttribute("cy", `${pt.y}`);
    head.style.opacity = t > 0.001 && t < 0.999 ? "1" : "0";
  }, []);

  useEffect(() => {
    const line = lineRef.current;
    if (line) line.style.strokeDasharray = `${line.getTotalLength()}`;
    onReady({ draw });
  }, [draw, onReady]);

  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2"
      // Cover size × zoom: zooming in only crops more sky, since the box is bottom anchored.
      style={{ width: `calc(max(100cqw, 100cqh * ${image.ratio}) * ${zoom})`, aspectRatio: image.ratio }}
    >
      <Image src={image.src} alt={image.alt} fill sizes="120vw" className="object-cover" />
      <svg viewBox={`0 0 100 ${H}`} className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <path d={TRAIL_D} fill="none" stroke="white" strokeOpacity={0.45} strokeWidth={0.16} strokeDasharray="0.5 0.8" strokeLinecap="round" />
        <path
          ref={lineRef}
          d={TRAIL_D}
          fill="none"
          stroke="white"
          strokeWidth={0.32}
          strokeLinecap="round"
          className="[filter:drop-shadow(0_0_6px_rgb(255_255_255_/_0.9))]"
        />
        <circle ref={headRef} r={0.55} fill="white" className="[filter:drop-shadow(0_0_8px_white)]" />
      </svg>

      {steps.map((s, i) => {
        const [x, y] = trail[s.at];
        const on = reached >= i;
        return (
          <div key={s.title} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
            <span
              className={cn(
                "absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-xs font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                on
                  ? "scale-100 bg-white text-(--cove-ink) shadow-[0_0_0_6px_rgb(255_255_255_/_0.35),0_8px_24px_rgb(0_0_0_/_0.25)]"
                  : "scale-75 bg-white/40 text-transparent",
              )}
            >
              {i + 1}
            </span>
            {showNotes && (
              <div
                className={cn(
                  "absolute top-0 w-60 rounded-2xl border border-white/60 bg-white/80 p-3 shadow-[0_16px_40px_-16px_rgb(20_50_20_/_0.45)] backdrop-blur-xl transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  s.side === "left" ? "right-6" : "left-6",
                  NOTE_ALIGN[s.align][on ? 0 : 1],
                  on ? "opacity-100 blur-0" : "opacity-0 blur-md",
                )}
              >
                <StepNote step={s} active={on} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Vertical placement of a note against its marker: [shown, hidden] (hidden drifts in from 16px).
const NOTE_ALIGN = {
  above: ["-translate-y-[85%]", "-translate-y-[calc(85%-16px)]"],
  center: ["-translate-y-1/2", "-translate-y-[calc(50%-16px)]"],
  below: ["-translate-y-[15%]", "-translate-y-[calc(15%-16px)]"],
} as const;

// Compact note that sits on the photo; the marker already carries the step number.
function StepNote({ step, active }: { step: (typeof steps)[number]; active: boolean }) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <h3 className="cove-display text-xl leading-tight">{step.title}</h3>
      <p className="text-xs text-pretty text-(--cove-muted)">{step.description}</p>
      <p className="mt-1 flex items-baseline gap-2 border-t border-(--cove-line) pt-2">
        <span className="cove-display text-xl tabular-nums">
          <CountUp to={step.stat.value} separator="," duration={1.6} startWhen={active} />
          {step.stat.suffix}
        </span>
        <span className="text-xs text-(--cove-muted)">{step.stat.label}</span>
      </p>
    </div>
  );
}

function StepBody({ step, index, active }: { step: (typeof steps)[number]; index: number; active: boolean }) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <span className="font-mono text-xs text-(--cove-muted)">Step {index + 1}</span>
      <h3 className="cove-display text-3xl leading-none">{step.title}</h3>
      <p className="text-sm text-pretty text-(--cove-muted)">{step.description}</p>
      <p className="mt-2 flex items-baseline gap-2 border-t border-(--cove-line) pt-3">
        <span className="cove-display text-3xl tabular-nums">
          <CountUp to={step.stat.value} separator="," duration={1.6} startWhen={active} />
          {step.stat.suffix}
        </span>
        <span className="text-xs text-(--cove-muted)">{step.stat.label}</span>
      </p>
    </div>
  );
}

function Heading({ className }: { className?: string }) {
  return (
    <header className={cn("flex flex-col items-center gap-4 text-center", className)}>
      <span className="text-sm font-medium text-(--cove-sea)">{howItWorks.eyebrow}</span>
      <h2 className="cove-display cove-ink-fade text-5xl leading-none md:text-7xl">
        <span className="block">
          <SplitText text={howItWorks.headline} tag="span" splitType="words" effect="blur" trigger="view" delay={90} duration={1.2} />
        </span>
      </h2>
      <p className="max-w-[680px] text-base text-balance text-(--cove-muted) md:text-lg">{howItWorks.subheadline}</p>
    </header>
  );
}

// One heading shared by both layouts: SplitText must never split a copy hidden with
// display: none (it drops the word spaces, which then show after a resize).
// Desktop (lg): the stage pins while scrolling draws the trail and reveals each step.
// Mobile: a framed scene draws itself once, with the steps listed below.
export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const pinned = useRef<SceneHandle | null>(null);
  const framed = useRef<SceneHandle | null>(null);
  const [reached, setReached] = useState(-1);
  const [seen, setSeen] = useState(false);
  const onPinnedReady = useCallback((h: SceneHandle) => {
    pinned.current = h;
  }, []);
  const onFramedReady = useCallback((h: SceneHandle) => {
    framed.current = h;
    h.draw(0);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const apply = (p: number) => {
      const t = Math.min(1, p / 0.85); // finish drawing a little early, then hold
      pinned.current?.draw(t);
      setReached(STEP_AT.filter((at) => t >= at - 0.02).length - 1);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => apply(self.progress),
    });
    apply(st.progress);
    return () => st.kill();
  }, []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setSeen(true);
      const tween = { t: 0 };
      gsap.to(tween, {
        t: 1,
        duration: 2.4,
        ease: "power2.inOut",
        onUpdate: () => framed.current?.draw(tween.t),
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" aria-label={howItWorks.eyebrow} className="relative lg:h-[320svh]">
      {/* On lg the heading gets its own white band and the photo fills the rest, fading in
          at its top edge, so hills never run into the type on short, wide screens. */}
      <div className="flex flex-col gap-12 px-4 py-24 lg:sticky lg:top-0 lg:h-svh lg:gap-0 lg:overflow-hidden lg:px-0 lg:py-0">
        <Heading className="shrink-0 lg:px-4 lg:pt-28 lg:pb-6" />

        <div className="relative hidden min-h-0 flex-1 [container-type:size] [mask-image:linear-gradient(to_bottom,transparent,#000_18%)] lg:block">
          <TrailScene reached={reached} showNotes onReady={onPinnedReady} zoom={1.05} />
        </div>

        <div ref={frameRef} className="relative aspect-[4/5] overflow-hidden rounded-3xl [container-type:size] sm:aspect-[4/3] lg:hidden">
          <TrailScene reached={seen ? steps.length - 1 : -1} showNotes={false} onReady={onFramedReady} zoom={1.6} />
        </div>
        <ol className="flex flex-col gap-10 lg:hidden">
          {steps.map((s, i) => (
            <li key={s.title}>
              <StepBody step={s} index={i} active={seen} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
