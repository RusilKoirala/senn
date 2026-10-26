"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// A real, scrollable page rendered at desktop size (1440 × 900) and scaled down to
// fit, inside browser chrome. The iframe only loads once it is near the viewport.
const W = 1440;
const H = 900;

export function TemplatePreview({ src, title, className }: { src: string; title: string; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(box);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setLoad(true);
        io.disconnect();
      },
      // Only when actually on screen: the embedded page runs its own WebGL effects, and
      // browsers cap live WebGL contexts, so loading early can knock out the hero's.
      { threshold: 0.15 },
    );
    io.observe(box);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-(--senn-line) bg-(--senn-surface)", className)}>
      <div className="flex items-center gap-3 border-b border-(--senn-line) px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto max-w-full truncate rounded-full bg-white/5 px-4 py-1 font-mono text-xs text-(--senn-muted)">
          {src}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs text-(--senn-live)">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-(--senn-live)" />
            <span className="relative size-1.5 rounded-full bg-(--senn-live)" />
          </span>
          Live
        </span>
      </div>
      <div ref={boxRef} className="relative w-full bg-white" style={{ aspectRatio: `${W} / ${H}` }}>
        {load && scale > 0 && (
          <iframe
            src={src}
            title={title}
            loading="lazy"
            // Phones get a still preview (scrolling a scaled iframe there traps the page).
            className="absolute top-0 left-0 origin-top-left border-0 max-md:pointer-events-none"
            style={{ width: W, height: H, transform: `scale(${scale})` }}
          />
        )}
      </div>
    </div>
  );
}
