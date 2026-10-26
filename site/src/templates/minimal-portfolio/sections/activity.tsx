"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import CountUp from "../components/CountUp";
import { Container, SmallHeading } from "../components/ui";
import { activity } from "../content";

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const LEVELS = [
  "bg-(--margin-fg)/[0.06]",
  "bg-(--margin-fg)/[0.16]",
  "bg-(--margin-fg)/[0.3]",
  "bg-(--margin-fg)/[0.46]",
  "bg-(--margin-fg)/[0.66]",
];

// Deterministic pseudo random numbers, so server and client draw the same grid.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Day = { date: Date; count: number; level: number };

// 53 weeks ending on `endDate`, quieter on weekends, with a few busy streaks.
function generateActivity(endDate: string, seed: number) {
  const rand = mulberry32(seed);
  const end = new Date(`${endDate}T12:00:00Z`);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 52 * 7 - end.getUTCDay());
  const weeks: Day[][] = [];
  let streak = 0;
  for (let w = 0; w < 53; w++) {
    const week: Day[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + w * 7 + d);
      if (date > end) break;
      if (rand() < 0.04) streak = 5 + Math.floor(rand() * 8);
      const weekend = d === 0 || d === 6;
      const base = rand() * (weekend ? 3 : 7) + (streak > 0 ? 6 : 0);
      streak = Math.max(0, streak - 1);
      const count = rand() < (weekend ? 0.45 : 0.15) ? 0 : Math.round(base);
      const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4;
      week.push({ date, count, level });
    }
    weeks.push(week);
  }
  return weeks;
}

const month = (d: Date) => d.toLocaleString("en", { month: "short", timeZone: "UTC" }).toUpperCase();

export function Activity() {
  const weeks = useMemo(() => generateActivity(activity.endDate, activity.seed), []);
  const total = weeks.flat().reduce((sum, d) => sum + d.count, 0);

  // A label wherever a new month starts, skipping ones too close together.
  const labels: { text: string; week: number }[] = [];
  weeks.forEach((week, i) => {
    const m = month(week[0].date);
    const last = labels[labels.length - 1];
    if ((!last || last.text !== m) && (!last || i - last.week >= 3)) labels.push({ text: m, week: i });
  });

  return (
    <Container>
      <SmallHeading>{activity.title}</SmallHeading>
      <div className="overflow-x-auto pb-1">
        <div className="w-full" style={{ minWidth: weeks.length * STEP - GAP }}>
          <div className="relative mb-2 h-4 text-xs font-medium tracking-wider text-(--margin-secondary)">
            {labels.map((l) => (
              <span key={`${l.text}${l.week}`} className="absolute" style={{ left: `${l.week / weeks.length * 100}%` }}>
                {l.text}
              </span>
            ))}
          </div>
          <div className="grid" style={{ gap: GAP, gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }} role="img" aria-label={`${total} ${activity.label}`}>
            {weeks.map((week, w) => (
              <div key={w} className="flex flex-col" style={{ gap: GAP }}>
                {week.map((day) => (
                  <span
                    key={day.date.toISOString()}
                    title={`${day.count} on ${day.date.toLocaleDateString("en", { month: "short", day: "numeric", timeZone: "UTC" })}`}
                    className={cn("block aspect-square w-full rounded-[3px]", LEVELS[day.level])}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs text-(--margin-secondary)">{activity.note}</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-(--margin-secondary)">
        <p>
          <span className="font-semibold text-(--margin-fg) tabular-nums">
            <CountUp to={total} separator="," duration={1.6} />
          </span>{" "}
          {activity.label}
        </p>
        <p className="flex items-center gap-1 text-xs">
          Less
          {LEVELS.map((l) => (
            <span key={l} className={cn("size-3 rounded-[3px]", l)} />
          ))}
          More
        </p>
      </div>
    </Container>
  );
}
