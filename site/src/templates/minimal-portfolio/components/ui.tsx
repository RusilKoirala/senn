import Image from "next/image";
import { cn } from "@/lib/utils";
import typescript from "../assets/tech/typescript.svg";
import react from "../assets/tech/react.svg";
import nextdotjs from "../assets/tech/nextdotjs.svg";
import nodedotjs from "../assets/tech/nodedotjs.svg";
import go from "../assets/tech/go.svg";
import python from "../assets/tech/python.svg";
import postgresql from "../assets/tech/postgresql.svg";
import sqlite from "../assets/tech/sqlite.svg";
import redis from "../assets/tech/redis.svg";
import docker from "../assets/tech/docker.svg";
import tailwindcss from "../assets/tech/tailwindcss.svg";
import vercel from "../assets/tech/vercel.svg";
import figma from "../assets/tech/figma.svg";
import ollama from "../assets/tech/ollama.svg";
import expo from "../assets/tech/expo.svg";

const techIcons: Record<string, import("next/image").StaticImageData> = { typescript, react, nextdotjs, nodedotjs, go, python, postgresql, sqlite, redis, docker, tailwindcss, vercel, figma, ollama, expo };

// The narrow centred column everything sits in, 18 grid cells wide on desktop.
export function Container({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn("margin-container scroll-mt-24", className)}>
      {children}
    </section>
  );
}

export function Eyebrowed({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="margin-mono text-xs tracking-wide text-(--margin-accent)">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

export function SmallHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-xs font-bold tracking-[0.2em] text-(--margin-secondary) uppercase">{children}</h2>;
}

// Bundled Simple Icons logos. White tiles preserve their contrast in dark mode.
export function TechIcon({ icon, name, size = 16 }: { icon: string; name: string; size?: number }) {
  return (
    <Image
      src={techIcons[icon]}
      alt={name}
      width={size}
      height={size}
      unoptimized
      className="shrink-0"
      style={{ width: size, height: size }}
    />
  );
}
