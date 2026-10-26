"use client";
import { AsteriskIcon } from "@phosphor-icons/react";
import ScrollReveal from "../components/ScrollReveal";
import { Container, Label } from "../components/ui";
import { why } from "../content";
export function Why() {
  return <section className="assembly-section" aria-label={why.label}><Container><AsteriskIcon size={40} weight="bold" className="mb-10 text-(--assembly-orange)" /><div className="max-w-4xl">{why.lines.map(line => <ScrollReveal key={line} baseOpacity={0.32} baseRotation={0} blurStrength={0} effect="fade" mode="scrub" containerClassName="my-0!" textClassName="text-4xl! font-medium! tracking-[-0.055em]! leading-tight! sm:text-5xl! lg:text-6xl!">{line}</ScrollReveal>)}</div><Label className="mt-8 text-(--assembly-muted)">{why.note}</Label></Container></section>;
}
