"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowClockwiseIcon,
  ChatTextIcon,
  CheckIcon,
  CloudCheckIcon,
  CloudSlashIcon,
  DeviceMobileIcon,
  LaptopIcon,
  DeviceTabletIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { visuals } from "../content";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

// Steps through `durations` (ms per phase) on a loop while the element is on
// screen. Reduced motion parks on the final phase.
function useLoop(durations: readonly number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (reduce) setStill(true);
        else setVisible(e.isIntersecting);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % durations.length), durations[phase]);
    return () => clearTimeout(t);
  }, [visible, phase, durations]);

  return { ref, phase: still ? durations.length - 1 : phase, still };
}

const reveal = (on: boolean) =>
  cn(
    "transition-all duration-700",
    EASE,
    on ? "translate-y-0 opacity-100 blur-0" : "pointer-events-none translate-y-2 opacity-0 blur-sm",
  );

// Shared shell: a dark frosted panel that reads on any photo.
function Panel({ title, aside, children }: { title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="summit-mono rounded-2xl border border-(--summit-panel-line) bg-(--summit-panel) p-4 text-(--summit-cream) shadow-[0_32px_80px_-24px_rgb(0_0_0_/_0.6)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-4 text-xs text-(--summit-cream-muted)">
        <span className="flex items-center gap-2">
          <span className="flex gap-1" aria-hidden>
            <span className="size-2 rounded-full bg-(--summit-cream)/20" />
            <span className="size-2 rounded-full bg-(--summit-cream)/20" />
            <span className="size-2 rounded-full bg-(--summit-cream)/20" />
          </span>
          {title}
        </span>
        {aside}
      </div>
      {children}
    </div>
  );
}

/* 1. Tidewater: events stream in, one times out, retries and lands. */

const EVENT_PHASES = [1400, 1300, 1500, 1700, 1600, 1800] as const;
const ROW = 40;

export function EventsVisual() {
  const v = visuals.events;
  const { ref, phase } = useLoop(EVENT_PHASES);
  // phase 1: flaky arrives (pending) · 2: timeout · 3: retrying · 4: delivered · 5: next arrives
  const flakyIn = phase >= 1;
  const nextIn = phase >= 5;
  const delivered = (phase >= 4 ? 1 : 0) + (nextIn ? 1 : 0);

  const rows = [
    ...(nextIn ? [{ key: v.next.id, kind: "ok" as const, ...v.next }] : []),
    ...(flakyIn ? [{ key: v.flaky.id, kind: "flaky" as const, id: v.flaky.id, name: v.flaky.name, ms: v.flaky.ms }] : []),
    ...v.rows.map((r) => ({ key: r.id, kind: "ok" as const, ...r })),
  ].slice(0, 5);

  return (
    <div ref={ref}>
      <Panel
        title={v.title}
        aside={
          <span className="tabular-nums">
            {(v.counter + delivered).toLocaleString("en-US")} {v.counterLabel}
          </span>
        }
      >
        <div className="relative overflow-hidden" style={{ height: ROW * 5 }}>
          {rows.map((row, slot) => {
            const flaky = row.kind === "flaky";
            const state = !flaky ? "ok" : phase === 1 ? "pending" : phase === 2 ? "fail" : phase === 3 ? "retry" : "ok";
            return (
              <div
                key={row.key}
                className={cn(
                  "absolute inset-x-0 flex h-9 items-center gap-3 rounded-lg px-2 text-xs transition-all duration-700",
                  EASE,
                  state === "fail" && "bg-red-500/15",
                  state === "retry" && "bg-amber-400/10",
                  flaky && state === "ok" && phase === 4 && "bg-emerald-400/10",
                )}
                style={{ transform: `translateY(${slot * ROW}px)` }}
              >
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full transition-colors duration-700",
                    state === "ok" && "bg-emerald-400",
                    state === "pending" && "bg-(--summit-cream)/40",
                    state === "fail" && "bg-red-400",
                    state === "retry" && "bg-amber-300",
                  )}
                />
                <span className="w-16 shrink-0 text-(--summit-cream-muted)">{row.id}</span>
                <span className="min-w-0 flex-1 truncate">{row.name}</span>
                <span className="w-28 shrink-0 text-right tabular-nums">
                  {state === "pending" && <span className="text-(--summit-cream-muted)">sending</span>}
                  {state === "fail" && <span className="text-(--summit-bad)">503 · {v.flaky.failMs}</span>}
                  {state === "retry" && (
                    <span className="inline-flex items-center gap-1 text-(--summit-warn)">
                      <ArrowClockwiseIcon size={12} className="animate-spin [animation-duration:1.6s]" />
                      {v.flaky.retry}
                    </span>
                  )}
                  {state === "ok" && <span className="text-(--summit-ok)">200 · {row.ms}</span>}
                </span>
              </div>
            );
          })}
        </div>
        <p className={cn("mt-3 flex items-center gap-2 text-xs text-(--summit-ok)", reveal(phase === 4))}>
          <CheckIcon size={12} weight="bold" />
          {v.flaky.id} {v.flaky.note}
        </p>
      </Panel>
    </div>
  );
}

/* 2. Fieldbook: a slot gets picked, booked, and the reminder text goes out. */

const BOOKING_PHASES = [1500, 1300, 1600, 2600] as const;

export function BookingVisual() {
  const v = visuals.booking;
  const { ref, phase } = useLoop(BOOKING_PHASES);
  // phase 1: target highlighted · 2: booked · 3: text sent
  const [td, tt] = v.target;
  const isBooked = (d: number, t: number) => v.booked.some(([bd, bt]) => bd === d && bt === t);

  return (
    <div ref={ref}>
      <Panel title={v.title} aside={<span>{v.booked.length + (phase >= 2 ? 1 : 0)} of 15 booked</span>}>
        <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] gap-1.5 text-xs">
          <span />
          {v.days.map((d) => (
            <span key={d} className="pb-1 text-center text-(--summit-cream-muted)">
              {d}
            </span>
          ))}
          {v.times.map((time, t) => (
            <div key={time} className="contents">
              <span className="flex items-center pr-2 text-(--summit-cream-muted) tabular-nums">{time}</span>
              {v.days.map((day, d) => {
                const target = d === td && t === tt;
                const taken = isBooked(d, t) || (target && phase >= 2);
                return (
                  <span
                    key={day}
                    className={cn(
                      "relative h-9 rounded-md border transition-all duration-700",
                      EASE,
                      taken ? "border-transparent bg-(--summit-copper)" : "border-(--summit-cream)/15 bg-(--summit-cream)/5",
                      target && phase === 1 && "scale-105 border-(--summit-copper) bg-(--summit-copper)/25",
                    )}
                  >
                    {target && phase === 1 && (
                      <span className="summit-ping absolute inset-0 rounded-md border border-(--summit-copper)" />
                    )}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        <div className="relative mt-4 h-20">
          <div className={cn("absolute inset-x-0 top-0 rounded-xl bg-(--summit-cream)/10 p-3 text-xs", reveal(phase === 1 || phase === 2))}>
            <p className="text-(--summit-cream)">
              {phase >= 2 ? "Booked" : "Booking"} · {v.days[td]} {v.times[tt]}
            </p>
            <p className="mt-1 text-(--summit-cream-muted)">
              {v.who} · {v.order}
            </p>
          </div>
          <div
            className={cn(
              "absolute inset-x-0 top-0 flex items-start gap-2 rounded-xl bg-emerald-400/15 p-3 text-xs text-(--summit-ok)",
              reveal(phase === 3),
            )}
          >
            <ChatTextIcon size={16} className="mt-0.5 shrink-0" />
            <p>{v.sms}</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* 3. Quiet: a note is written offline, then catches up on every device. */

const NOTE_PHASES = [3600, 1400, 700, 700, 2200] as const;
const DEVICE_ICONS = [DeviceMobileIcon, LaptopIcon, DeviceTabletIcon];

export function NotesVisual() {
  const v = visuals.notes;
  const { ref, phase, still } = useLoop(NOTE_PHASES);
  const [typed, setTyped] = useState(0);

  // Types the note during phase 0; every later phase shows it whole.
  useEffect(() => {
    if (phase !== 0 || still) return;
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(v.body.length, n + 2);
      setTyped(n);
      if (n >= v.body.length) clearInterval(id);
    }, 48);
    return () => clearInterval(id);
  }, [phase, still, v.body.length]);

  const shown = phase === 0 && !still ? typed : v.body.length;
  // phase 1: syncing · 2..4: devices light up one by one
  const synced = Math.max(0, phase - 1);
  const online = phase >= 1;

  return (
    <div ref={ref}>
      <Panel
        title={v.title}
        aside={
          <span className={cn("flex items-center gap-1 transition-colors duration-700", online ? "text-(--summit-ok)" : "text-(--summit-warn)")}>
            {online ? <CloudCheckIcon size={14} /> : <CloudSlashIcon size={14} />}
            {phase === 0 ? v.offline : synced >= 3 ? v.synced : v.syncing}
          </span>
        }
      >
        <p className="min-h-20 font-sans text-base leading-relaxed text-(--summit-cream)">
          {v.body.slice(0, shown)}
          {phase === 0 && !still && <span className="summit-caret ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-(--summit-cream)" />}
        </p>
        <ul className="mt-4 grid grid-cols-3 gap-2 text-xs">
          {v.devices.map((device, i) => {
            const Icon = DEVICE_ICONS[i % DEVICE_ICONS.length];
            const on = synced > i;
            return (
              <li
                key={device}
                className={cn(
                  "flex flex-col gap-2 rounded-xl border p-2 transition-all duration-700",
                  EASE,
                  on ? "border-(--summit-ok)/40 bg-emerald-400/10" : "border-(--summit-cream)/10 bg-(--summit-cream)/5 text-(--summit-cream-muted)",
                )}
              >
                <span className="flex items-center justify-between">
                  <Icon size={16} />
                  <CheckIcon size={12} weight="bold" className={cn("text-(--summit-ok)", reveal(on))} />
                </span>
                <span className="truncate">{device}</span>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}

export const workVisuals = {
  events: EventsVisual,
  booking: BookingVisual,
  notes: NotesVisual,
};
