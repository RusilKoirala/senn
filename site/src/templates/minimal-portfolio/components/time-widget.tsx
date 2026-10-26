"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const fmt = (timeZone: string, d: Date) =>
  new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true, timeZone }).format(d);

const offset = (timeZone: string, d: Date) =>
  new Intl.DateTimeFormat("en", { timeZone, timeZoneName: "shortOffset" })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName")?.value;

// "My time" against the visitor's own time. Renders nothing on the server.
export function TimeWidget({ timeZone, className }: { timeZone: string; className?: string }) {
  const [state, setState] = useState<{ now: Date; visitor: string } | null>(null);

  useEffect(() => {
    const tick = () => setState({ now: new Date(), visitor: Intl.DateTimeFormat().resolvedOptions().timeZone });
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  if (!state) return <div className={cn("h-8", className)} />;

  const same = offset(state.visitor, state.now) === offset(timeZone, state.now);
  const mine = fmt(timeZone, state.now);

  return (
    <div className={cn("min-w-0 text-right text-xs text-(--margin-secondary) tabular-nums", className)}>
      {same ? (
        <p className="leading-tight">
          <span className="font-semibold text-(--margin-fg)">{mine}</span>
          <span className="mx-1">·</span>
          same time as you
        </p>
      ) : (
        <div className="space-y-1 leading-tight">
          <p>
            <span className="tracking-wide uppercase">Your</span>{" "}
            <span className="font-semibold text-(--margin-fg)">{fmt(state.visitor, state.now)}</span>
          </p>
          <p>
            <span className="tracking-wide uppercase">My</span> <span className="font-semibold text-(--margin-fg)">{mine}</span>
          </p>
        </div>
      )}
    </div>
  );
}
