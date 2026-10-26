"use client";

import type { ReactNode } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import AnimatedContent from "./AnimatedContent";
import Magnet from "./Magnet";
import { cn } from "@/lib/utils";

gsap.registerPlugin(CustomEase);
CustomEase.create("assembly", "0.32,0.72,0,1");
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("assembly-container", className)}>{children}</div>;
}
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("assembly-mono text-xs tracking-wide", className)}>{children}</p>;
}
export function Reveal({ children, className, stagger = 0, distance = 24 }: { children: ReactNode; className?: string; stagger?: number; distance?: number }) {
  return <AnimatedContent distance={distance} duration={0.85} initialOpacity={1} ease="assembly" threshold={0.08} stagger={stagger} className={className}>{children}</AnimatedContent>;
}
export function PrimaryLink({ children, href, light = false, className, onClick }: { children: ReactNode; href: string; light?: boolean; className?: string; onClick?: () => void }) {
  return <Magnet padding={12} maxOffset={4} magnetStrength={5} wrapperClassName="inline-block" innerClassName="h-full"><a href={href} onClick={onClick} className={cn("assembly-button group", light && "assembly-button-light", className)}>{children}<ArrowUpRightIcon size={20} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></Magnet>;
}
