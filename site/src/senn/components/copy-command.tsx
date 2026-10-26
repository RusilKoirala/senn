"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function CopyCommand({ command, className }: { command: string; className?: string }) {
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
        "flex items-center gap-3 rounded-full border border-(--senn-line) bg-(--senn-surface)/80 py-1.5 pr-1.5 pl-4 font-mono text-sm backdrop-blur-md",
        className,
      )}
    >
      <span className="text-(--senn-muted) select-none">$</span>
      <code className="min-w-0 truncate select-all">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy command"}
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--senn-raised) text-(--senn-ink) transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-(--senn-ink) hover:text-(--senn-bg) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--senn-ink) active:scale-95"
      >
        {copied ? <CheckIcon size={14} weight="bold" /> : <CopyIcon size={14} />}
      </button>
    </div>
  );
}
