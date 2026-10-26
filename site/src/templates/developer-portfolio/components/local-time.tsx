"use client";

import { useEffect, useState } from "react";

// Live clock in the person's own time zone. Renders a stable placeholder on the
// server so hydration never mismatches, then ticks every second.
export function LocalTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const text = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(now)
    : "--:--:--";

  return (
    <time suppressHydrationWarning className={className} dateTime={now?.toISOString()}>
      {text}
    </time>
  );
}
