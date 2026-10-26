"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Hides a WebGL effect if its context is lost (GPU reset, too many contexts, blocked
// WebGL). A lost canvas can paint solid white, which would hide white text on top.
export function WebGLFallback({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fail = () => setFailed(true);
    // webglcontextlost doesn't bubble, but a capture listener on an ancestor still sees it.
    el.addEventListener("webglcontextlost", fail, true);
    // It may already have been lost before this effect ran.
    const check = setTimeout(() => {
      const canvas = el.querySelector("canvas");
      const gl = canvas?.getContext("webgl2") ?? canvas?.getContext("webgl");
      if (gl?.isContextLost()) fail();
    }, 1500);
    return () => {
      el.removeEventListener("webglcontextlost", fail, true);
      clearTimeout(check);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={cn(className, failed && "hidden")}>
      {children}
    </div>
  );
}
