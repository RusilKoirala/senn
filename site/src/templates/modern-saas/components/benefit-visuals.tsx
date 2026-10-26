"use client";

import { useEffect, useRef, useState } from "react";
import {
  AppStoreLogoIcon,
  ChatCircleIcon,
  CheckIcon,
  EnvelopeSimpleIcon,
  InstagramLogoIcon,
  SparkleIcon,
  TimerIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { visuals } from "../content";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

// Steps through `durations` (ms per phase) on a loop while the element is on
// screen. Reduced motion parks on the final phase.
function useLoop(durations: number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (reduce) setStill(true);
      else setVisible(e.isIntersecting);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % durations.length), durations[phase]);
    return () => clearTimeout(t);
  }, [visible, phase, durations]);

  return { ref, phase: still ? durations.length - 1 : phase };
}

// Animates a number toward `to` over `ms`.
function Tween({ to, ms = 700, decimals = 1 }: { to: number; ms?: number; decimals?: number }) {
  const [value, setValue] = useState(to);
  const from = useRef(to);

  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const v = a + (to - a) * (1 - Math.pow(1 - t, 3));
      setValue(v);
      from.current = v;
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);

  return <>{value.toFixed(decimals)}</>;
}

const reveal = (on: boolean) =>
  cn(
    "transition-all duration-700",
    EASE,
    on ? "translate-y-0 opacity-100 blur-0" : "translate-y-2 opacity-0 blur-sm",
  );

/* 1. A ticket arrives, the timer runs, the draft writes itself, it ships unedited. */
const DRAFT_STEPS = [900, 1200, 700, 700, 700, 1400, 2000];
const DRAFT_TIMES = [0, 2.4, 4.6, 6.5, 8.2, 9.1, 9.1];

export function DraftVisual() {
  const { ref, phase } = useLoop(DRAFT_STEPS);
  const d = visuals.draft;
  const linesShown = Math.max(0, Math.min(d.lines.length, phase - 1));

  return (
    <div ref={ref} className="grid h-full gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className={cn("flex flex-col justify-center gap-2 rounded-xl border border-(--cove-line) bg-white p-3", reveal(true))}>
        <span className="flex items-center gap-2 text-xs text-(--cove-muted)">
          <EnvelopeSimpleIcon size={14} /> New ticket
        </span>
        <span className="text-sm font-semibold">{d.ticket.name}</span>
        <span className="text-xs text-(--cove-muted)">{d.ticket.subject}</span>
      </div>

      <div className="relative flex flex-col gap-2 rounded-xl border border-teal-600/20 bg-teal-50/50 p-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs font-semibold text-(--cove-sea)">
            <SparkleIcon size={14} weight="fill" /> Cove draft
          </span>
          <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 font-mono text-xs tabular-nums shadow-sm">
            <TimerIcon size={12} />
            <Tween to={phase === 0 ? 0 : DRAFT_TIMES[phase]} />s
          </span>
        </div>
        <div className="flex flex-col gap-1">
          {d.lines.map((line, i) => (
            <div key={line} className="relative h-5">
              <span
                className={cn(
                  "absolute inset-y-1 left-0 rounded-full bg-teal-900/10 transition-all duration-700",
                  EASE,
                  i < linesShown ? "w-0 opacity-0" : phase >= 1 ? "w-11/12 animate-pulse" : "w-0",
                )}
              />
              <span className={cn("absolute inset-0 truncate text-xs md:text-sm", reveal(i < linesShown))}>
                {line}
              </span>
            </div>
          ))}
        </div>
        <span
          className={cn(
            "mt-auto flex w-max items-center gap-1 rounded-full bg-(--cove-sea) px-2 py-1 text-xs font-semibold text-white",
            reveal(phase >= 5),
          )}
        >
          <CheckIcon size={12} weight="bold" /> {d.result}
        </span>
      </div>
    </div>
  );
}

/* 2. A stiff opener gets struck out, rewritten, approved, and Cove learns from it. */
const APPROVE_STEPS = [1200, 900, 1100, 700, 2600];

export function ApproveVisual() {
  const { ref, phase } = useLoop(APPROVE_STEPS);
  const a = visuals.approve;

  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-3">
      <div className="flex flex-col gap-2 rounded-xl border border-(--cove-line) bg-white p-3 text-xs md:text-sm">
        <p className="relative">
          <span
            className={cn(
              "transition-all duration-700",
              EASE,
              phase >= 1 ? "text-(--cove-muted) line-through decoration-red-500/70" : "",
              phase >= 2 && "hidden",
            )}
          >
            {a.before}
          </span>
          <span className={cn("rounded bg-teal-100 px-1", reveal(phase >= 2), phase < 2 && "hidden")}>
            {a.after}
          </span>
        </p>
        <p className="text-(--cove-muted)">{a.body}</p>
        <span
          className={cn(
            "mt-1 flex w-max items-center gap-1 self-end rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all duration-500",
            EASE,
            phase >= 4 ? "bg-(--cove-sea)" : "bg-(--cove-ink)",
            phase === 3 && "scale-95",
          )}
        >
          {phase >= 4 ? (
            <>
              <CheckIcon size={12} weight="bold" /> Approved by Dana
            </>
          ) : (
            "Approve"
          )}
        </span>
      </div>
      <span
        className={cn(
          "flex w-max max-w-full items-center gap-1 rounded-full border border-(--cove-line) bg-white px-3 py-1 text-xs text-(--cove-muted) shadow-sm",
          reveal(phase >= 4),
        )}
      >
        <SparkleIcon size={12} weight="fill" className="shrink-0 text-(--cove-sea)" />
        <span className="truncate">{a.learned}</span>
      </span>
    </div>
  );
}

/* 3. Messages land from four channels in arrival order, then sort themselves by urgency. */
const CHANNEL_ICONS = {
  email: EnvelopeSimpleIcon,
  chat: ChatCircleIcon,
  instagram: InstagramLogoIcon,
  appstore: AppStoreLogoIcon,
};
const URGENCY = ["bg-neutral-300", "bg-amber-300", "bg-amber-500", "bg-red-500"];
const CHANNEL_STEPS = [400, 450, 450, 450, 1300, 2600];
const ROW = 44;

export function ChannelsVisual() {
  const { ref, phase } = useLoop(CHANNEL_STEPS);
  const rows = visuals.channels;
  const sorted = rows
    .map((r, i) => ({ r, i }))
    .sort((x, y) => y.r.urgency - x.r.urgency || x.i - y.i)
    .map((x) => x.i);
  const sortedNow = phase >= 5;

  return (
    <div ref={ref} className="flex h-full items-center">
      <div className="relative w-full" style={{ height: rows.length * ROW }}>
        {rows.map((row, i) => {
          const Icon = CHANNEL_ICONS[row.channel as keyof typeof CHANNEL_ICONS];
          const slot = sortedNow ? sorted.indexOf(i) : i;
          const shown = phase >= i + 1;
          return (
            <div
              key={row.who}
              className={cn(
                "absolute inset-x-0 flex h-10 items-center gap-2 rounded-xl border border-(--cove-line) bg-white px-3 text-xs transition-all duration-700",
                EASE,
                shown ? "opacity-100" : "opacity-0",
              )}
              style={{ transform: `translateY(${slot * ROW + (shown ? 0 : 12)}px)` }}
            >
              <Icon size={16} weight="duotone" className="shrink-0" />
              <span className="shrink-0 font-semibold">{row.who}</span>
              <span className="truncate text-(--cove-muted)">{row.text}</span>
              <span className={cn("ml-auto size-2 shrink-0 rounded-full", URGENCY[row.urgency])} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 4. Hourly volume grows, one hour spikes, Cove raises the alert. */
const SPIKE_STEPS = [700, 1100, 900, 2800];

export function SpikeVisual() {
  const { ref, phase } = useLoop(SPIKE_STEPS);
  const s = visuals.spike;
  const max = Math.max(...s.counts);

  return (
    <div ref={ref} className="grid h-full items-end gap-3 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div className="flex h-full min-h-32 items-end gap-2 rounded-xl border border-(--cove-line) bg-white p-3">
        {s.counts.map((c, i) => {
          const spike = i === s.spikeIndex;
          return (
            <div key={s.hours[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <div className="relative flex w-full flex-1 items-end">
                <span
                  className={cn(
                    "w-full rounded-md transition-all duration-1000",
                    EASE,
                    spike && phase >= 2 ? "bg-red-500" : "bg-teal-700/25",
                  )}
                  style={{ height: phase >= 1 ? `${(c / max) * 100}%` : "4%", transitionDelay: `${i * 60}ms` }}
                />
                {spike && phase >= 2 && (
                  <span
                    className="absolute left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-red-500"
                    style={{ bottom: `${(c / max) * 100}%` }}
                  >
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-500" />
                  </span>
                )}
              </div>
              <span className="font-mono text-xs text-(--cove-muted)">{s.hours[i]}</span>
            </div>
          );
        })}
      </div>
      <div
        className={cn(
          "flex flex-col gap-2 self-center rounded-xl border border-red-500/20 bg-red-50 p-3 text-xs md:text-sm",
          reveal(phase >= 3),
        )}
      >
        <span className="flex items-center gap-1 font-semibold text-red-600">
          <WarningCircleIcon size={14} weight="fill" /> Spike detected
        </span>
        <span className="text-pretty">{s.alert}</span>
        <span className="w-max rounded-full bg-white px-2 py-0.5 text-xs text-(--cove-muted)">
          Grouped into 1 thread
        </span>
      </div>
    </div>
  );
}
