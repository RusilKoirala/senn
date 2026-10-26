"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, PaperPlaneTiltIcon, SparkleIcon, TrayIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { inbox } from "../content";

// Types the draft once the mockup scrolls into view, then shows it as approved.
function useDraft(text: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setTimeout(() => setCount(text.length));
      return () => clearTimeout(timer);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let i = 0;
        const tick = () => {
          i = Math.min(text.length, i + 2 + Math.round(Math.random() * 2));
          setCount(i);
          if (i < text.length) timer = setTimeout(tick, 28);
          else timer = setTimeout(() => setApproved(true), 1400);
        };
        timer = setTimeout(tick, 1200);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [text]);

  return { ref, typed: text.slice(0, count), done: count >= text.length, approved };
}

export function InboxMockup({ className }: { className?: string }) {
  const { ref, typed, done, approved } = useDraft(inbox.draft);
  const active = inbox.tickets.find((t) => t.active)!;

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-white/70 bg-white/55 p-2 shadow-[0_32px_80px_-24px_rgb(6_60_70_/_0.45)] backdrop-blur-2xl",
        className,
      )}
    >
      {/* Outer rounded-3xl (24px) with 8px gap → inner rounded-2xl (16px) */}
      <div className="grid overflow-hidden rounded-2xl border border-(--cove-line) bg-white text-left md:grid-cols-[180px_260px_1fr]">
        <aside className="hidden flex-col gap-1 border-r border-(--cove-line) bg-neutral-50 p-3 md:flex">
          <p className="flex items-center gap-2 px-2 pt-1 pb-3 text-sm font-semibold">
            <TrayIcon size={16} weight="duotone" /> Support
          </p>
          {inbox.folders.map((f) => (
            <span
              key={f.label}
              className={cn(
                "flex items-center justify-between rounded-lg px-2 py-2 text-xs",
                f.active ? "bg-white font-semibold shadow-sm" : "text-(--cove-muted)",
              )}
            >
              {f.label}
              <span className="font-mono text-xs">{f.count}</span>
            </span>
          ))}
        </aside>

        <ul className="hidden flex-col border-r border-(--cove-line) md:flex">
          {inbox.tickets.map((t) => (
            <li
              key={t.subject}
              className={cn(
                "flex flex-col gap-1 border-b border-(--cove-line) p-3",
                t.active && "bg-teal-50/60",
              )}
            >
              <span className="flex items-center justify-between text-xs">
                <span className="font-semibold">{t.name}</span>
                <span className="font-mono text-(--cove-muted)">{t.time}</span>
              </span>
              <span className="truncate text-xs font-medium">{t.subject}</span>
              <span className="truncate text-xs text-(--cove-muted)">{t.preview}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 p-4 md:p-6">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">{active.subject}</p>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-(--cove-muted)">
              {active.tag}
            </span>
          </div>
          <p className="rounded-xl bg-neutral-50 p-3 text-xs text-(--cove-muted) md:text-sm">
            {inbox.message}
          </p>

          <div className="rounded-xl border border-teal-600/20 bg-teal-50/40 p-3">
            <p className="mb-2 flex items-center gap-1 text-xs font-semibold text-(--cove-sea)">
              <SparkleIcon size={14} weight="fill" /> Cove draft
            </p>
            <p className="min-h-24 text-xs text-pretty md:text-sm">
              {typed}
              {!done && <span className="cove-caret ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-(--cove-ink)" />}
            </p>
            <p
              className={cn(
                "mt-2 font-mono text-xs text-(--cove-muted) transition-opacity duration-700",
                done ? "opacity-100" : "opacity-0",
              )}
            >
              {inbox.draftMeta}
            </p>
          </div>

          <div className="flex items-center justify-end gap-2">
            <span className="rounded-lg px-3 py-2 text-xs font-medium text-(--cove-muted)">Edit</span>
            <span
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                approved ? "bg-(--cove-sea)" : "bg-(--cove-ink)",
                done && !approved && "scale-[1.04]",
              )}
            >
              {approved ? (
                <>
                  <CheckIcon size={14} weight="bold" /> Sent
                </>
              ) : (
                <>
                  <PaperPlaneTiltIcon size={14} weight="fill" /> Approve and send
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
