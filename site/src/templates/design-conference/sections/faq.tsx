"use client";
import { PlusIcon } from "@phosphor-icons/react";
import { Container, Label, Reveal } from "../components/ui";
import { faq } from "../content";
export function Faq() {
  return <section id="questions" className="assembly-section border-t border-(--assembly-rule)" aria-labelledby="assembly-faq-title"><Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-24"><Reveal><Label>{faq.label}</Label><h2 id="assembly-faq-title" className="assembly-title mt-6 max-w-sm">{faq.title}</h2></Reveal><div className="assembly-faq">{faq.items.map((item, i) => <details key={item.question}><summary className="group flex items-start justify-between gap-6 py-6 text-lg font-medium tracking-tight"><span><span className="assembly-mono mr-4 text-xs text-(--assembly-muted)">{String(i + 1).padStart(2, "0")}</span>{item.question}</span><PlusIcon size={20} className="assembly-plus mt-1 shrink-0" /></summary><p className="assembly-details-copy max-w-lg pb-6 text-sm leading-relaxed text-(--assembly-muted) sm:pl-8">{item.answer}</p></details>)}</div></Container></section>;
}
