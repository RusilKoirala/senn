"use client";

import type { ReactNode } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ArrowRightIcon } from "@phosphor-icons/react";
import AnimatedContent from "./AnimatedContent";
import Magnet from "./Magnet";
import { cn } from "@/lib/utils";

gsap.registerPlugin(CustomEase);
CustomEase.create("contour", "0.22,0.68,0,1");
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("contour-container", className)}>{children}</div>;
}
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("contour-label", className)}>{children}</p>;
}
export function Reveal({ children, className, stagger = 0, distance = 64, delay = 0 }: { children: ReactNode; className?: string; stagger?: number; distance?: number; delay?: number }) {
  return <AnimatedContent distance={distance} duration={1} blur={12} initialOpacity={0} ease="contour" threshold={0.08} stagger={stagger} delay={delay} className={className}>{children}</AnimatedContent>;
}
export function PrimaryLink({ children, href, light = false, className }: { children: ReactNode; href: string; light?: boolean; className?: string }) {
  return <Magnet padding={16} maxOffset={6} magnetStrength={4} wrapperClassName="inline-block" innerClassName="h-full"><a href={href} className={cn("contour-button", light && "contour-button-light", className)}>{children}<span className="contour-button-icon"><ArrowRightIcon size={16} weight="bold" /></span></a></Magnet>;
}
