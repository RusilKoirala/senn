"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon, CodeIcon, CopyIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { TemplateMeta } from "@/templates/catalog";
import { agentPrompt, agentSkill, skillPath } from "./agent-prompt";
import { CopyCommand } from "./components/copy-command";
import { addCommand, links, skillCommand } from "./content";
import { previews } from "./previews";

type AgentTab = "prompt" | "skill";

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; the text stays selectable.
    }
  };
  return { copied, copy };
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4">
      <span className="flex size-8 items-center justify-center rounded-full border border-(--senn-line) font-mono text-xs">
        {n}
      </span>
      <div className="flex min-w-0 flex-col gap-3 pt-1">
        <h3 className="text-base font-semibold">{title}</h3>
        {children}
      </div>
    </li>
  );
}

export function TemplateDetail({ template: t }: { template: TemplateMeta }) {
  const [tab, setTab] = useState<AgentTab>("prompt");
  const { copied, copy } = useCopy();
  const preview = previews[t.slug];
  const text = tab === "prompt" ? agentPrompt(t) : agentSkill(t);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-(--senn-muted)">
        <Link href="/" className="transition-colors duration-500 hover:text-(--senn-ink)">
          Templates
        </Link>
        <span aria-hidden>/</span>
        <span className="text-(--senn-ink)">{t.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        {/* Picture on the left, stays in view while the steps scroll. */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <Link
            href={`/templates/${t.slug}/preview`}
            className="group block overflow-hidden rounded-2xl border border-(--senn-line) bg-(--senn-surface)"
          >
            {preview && (
              <Image
                src={preview}
                alt={`${t.name} template`}
                placeholder="blur"
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02]"
              />
            )}
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/templates/${t.slug}/preview`}
              className="group flex items-center gap-2 rounded-full bg-(--senn-ink) px-4 py-2 text-sm font-semibold text-(--senn-bg) transition-transform duration-500 hover:scale-[1.03] active:scale-[0.98]"
            >
              Live preview
              <ArrowRightIcon size={14} weight="bold" className="transition-transform duration-500 group-hover:translate-x-0.5" />
            </Link>
            <a
              href={links.templateCode(t.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-(--senn-line) px-4 py-2 text-sm font-semibold transition-colors duration-500 hover:bg-(--senn-surface)"
            >
              <CodeIcon size={14} weight="bold" /> Code
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <header className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.name}</h1>
            <p className="text-base text-pretty text-(--senn-muted)">{t.description}</p>
            {t.tags && (
              <ul className="flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-(--senn-surface) px-3 py-1 text-xs text-(--senn-muted)">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <section aria-label="Set up">
            <h2 className="mb-6 text-sm font-semibold text-(--senn-muted)">Set up</h2>
            <ol className="flex flex-col gap-8">
              <Step n={1} title="Download it">
                <CopyCommand command={addCommand(t.slug)} />
                {t.dependencies && (
                  <>
                    <p className="text-sm text-(--senn-muted)">
                      Or copy <code className="font-mono text-xs">src/templates/{t.slug}</code> from GitHub and install
                      its packages:
                    </p>
                    <CopyCommand command={`npm i ${t.dependencies.join(" ")}`} />
                  </>
                )}
              </Step>

              <Step n={2} title="Make it yours with your AI agent">
                <p className="text-sm text-pretty text-(--senn-muted)">
                  {tab === "prompt"
                    ? "Paste into Claude Code, Cursor, Codex or any coding agent. It asks about your product, then rewrites the copy, colors and images."
                    : "One command adds a skill your agent can use. Then just ask it to make the template yours."}
                </p>
                <div className="overflow-hidden rounded-xl border border-(--senn-line) bg-(--senn-surface)">
                  <div className="flex items-center justify-between gap-2 border-b border-(--senn-line) p-1.5">
                    <div role="tablist" aria-label="Agent instructions" className="flex gap-1">
                      {(["prompt", "skill"] as const).map((k) => (
                        <button
                          key={k}
                          type="button"
                          role="tab"
                          aria-selected={tab === k}
                          onClick={() => setTab(k)}
                          className={cn(
                            "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-500",
                            tab === k ? "bg-(--senn-bg) text-(--senn-ink) shadow-sm" : "text-(--senn-muted) hover:text-(--senn-ink)",
                          )}
                        >
                          {k === "prompt" ? "Prompt" : "Skill"}
                        </button>
                      ))}
                    </div>
                    {tab === "prompt" && (
                      <button
                        type="button"
                        onClick={() => copy(text)}
                        className="flex items-center gap-1.5 rounded-lg bg-(--senn-ink) px-3 py-1.5 text-xs font-semibold text-(--senn-bg) transition-transform duration-500 active:scale-95"
                      >
                        {copied ? <CheckIcon size={12} weight="bold" /> : <CopyIcon size={12} />}
                        {copied ? "Copied" : "Copy prompt"}
                      </button>
                    )}
                  </div>

                  {tab === "prompt" ? (
                    <pre
                      role="tabpanel"
                      className="max-h-72 overflow-auto p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-(--senn-muted)"
                    >
                      {text}
                    </pre>
                  ) : (
                    <div role="tabpanel" className="flex flex-col gap-3 p-3">
                      <CopyCommand command={skillCommand(t.slug)} />
                      <p className="px-1 text-xs text-pretty text-(--senn-muted)">
                        Adds <code className="font-mono">{skillPath(t)}</code>. Then tell your agent:{" "}
                        <span className="text-(--senn-ink)">&ldquo;make this template mine&rdquo;</span>.
                      </p>
                      {/* The file itself, for agents without skills or anyone who prefers to paste it. */}
                      <details className="group rounded-lg border border-(--senn-line)">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-xs font-semibold text-(--senn-muted) hover:text-(--senn-ink)">
                          View the file
                          <span aria-hidden className="transition-transform duration-500 group-open:rotate-180">
                            ▾
                          </span>
                        </summary>
                        <div className="relative border-t border-(--senn-line)">
                          <button
                            type="button"
                            onClick={() => copy(text)}
                            className="absolute top-2 right-2 flex items-center gap-1.5 rounded-lg bg-(--senn-ink) px-2.5 py-1 text-xs font-semibold text-(--senn-bg) active:scale-95"
                          >
                            {copied ? <CheckIcon size={12} weight="bold" /> : <CopyIcon size={12} />}
                            {copied ? "Copied" : "Copy file"}
                          </button>
                          <pre className="max-h-64 overflow-auto p-3 pt-10 font-mono text-xs leading-relaxed whitespace-pre-wrap text-(--senn-muted)">
                            {text}
                          </pre>
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              </Step>

              <Step n={3} title="Run it">
                <CopyCommand command="npm run dev" />
                <p className="text-sm text-(--senn-muted)">Then open localhost:3000.</p>
              </Step>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
