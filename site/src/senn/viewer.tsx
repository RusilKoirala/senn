"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowSquareOutIcon,
  CodeIcon,
  DesktopIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
} from "@phosphor-icons/react";
import type { TemplateMeta } from "@/templates/catalog";
import { CopyCommand } from "./components/copy-command";
import RubberSegment from "./components/RubberSegment";
import { ThemeToggle } from "./components/theme-toggle";
import { addCommand, links } from "./content";
import "./theme.css";

const DEVICES = {
  desktop: { label: "Desktop", width: "100%", icon: DesktopIcon },
  tablet: { label: "Tablet", width: "768px", icon: DeviceTabletIcon },
  mobile: { label: "Mobile", width: "390px", icon: DeviceMobileIcon },
} as const;

type Device = keyof typeof DEVICES;

const ICON_BUTTON =
  "flex size-9 shrink-0 items-center justify-center rounded-full border border-(--senn-line) text-(--senn-ink) transition-colors duration-500 hover:bg-(--senn-surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--senn-ink)";

// Full screen template viewer: the real page in an iframe, resizable to common widths.
export function TemplateViewer({ template }: { template: TemplateMeta }) {
  const [device, setDevice] = useState<Device>("desktop");
  const src = `/t/${template.slug}`;

  return (
    <div className="senn flex h-svh flex-col">
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-(--senn-line) px-3 md:px-4">
        <Link href="/#templates" aria-label="Back to all templates" className={ICON_BUTTON}>
          <ArrowLeftIcon size={16} />
        </Link>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-semibold">{template.name}</span>
          <span className="truncate font-mono text-xs text-(--senn-muted)">senn / {template.slug}</span>
        </div>

        <div className="mx-auto hidden md:block">
          <RubberSegment
            aria-label="Preview width"
            size="sm"
            radius={999}
            trackColor="var(--senn-raised)"
            thumbColor="var(--senn-ink)"
            textColor="var(--senn-muted)"
            activeTextColor="var(--senn-bg)"
            value={device}
            onChange={(v) => setDevice(v as Device)}
            items={(Object.keys(DEVICES) as Device[]).map((d) => {
              const Icon = DEVICES[d].icon;
              return {
                value: d,
                label: (
                  <span className="flex items-center gap-1.5 px-1">
                    <Icon size={14} /> {DEVICES[d].label}
                  </span>
                ),
              };
            })}
          />
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <CopyCommand command={addCommand(template.slug)} className="hidden lg:flex" />
          <a
            href={links.templateCode(template.slug)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the code on GitHub"
            className={ICON_BUTTON}
          >
            <CodeIcon size={16} />
          </a>
          <a href={src} target="_blank" rel="noopener noreferrer" aria-label="Open full screen" className={ICON_BUTTON}>
            <ArrowSquareOutIcon size={16} />
          </a>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 justify-center bg-(--senn-surface) md:p-4">
        <iframe
          src={src}
          title={`${template.name} template`}
          className="h-full max-w-full border-0 bg-white transition-[width] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:rounded-xl"
          style={{ width: DEVICES[device].width }}
        />
      </main>
    </div>
  );
}
