"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function CopyCommand({ command, className, kind = "command" }: { command: string; className?: string; kind?: "command" | "code" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the command stays selectable.
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-(--senn-line) bg-(--senn-surface)/80 py-1.5 pr-1.5 pl-4 font-mono text-sm backdrop-blur-md",
        className,
      )}
    >
      {kind === "command" && <span className="self-start py-1.5 text-(--senn-muted) select-none">$</span>}
      {/* Wraps instead of truncating, so long install lines stay fully visible. */}
      <code className="min-w-0 flex-1 py-1.5 break-words whitespace-pre-wrap select-all">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : kind === "code" ? "Copy code" : "Copy command"}
        className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-(--senn-raised) text-(--senn-ink) transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-(--senn-ink) hover:text-(--senn-bg) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--senn-ink) active:scale-95"
      >
        {copied ? <CheckIcon size={14} weight="bold" /> : <CopyIcon size={14} />}
      </button>
    </div>
  );
}
