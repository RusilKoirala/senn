"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { Container, Label, Reveal } from "../components/ui";
import { faq } from "../content";

export function Faq() {
  return (
    <section id="questions" className="contour-section border-t border-(--contour-rule) bg-(--contour-white)" aria-labelledby="contour-faq-title">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-24">
        <Reveal className="lg:sticky lg:top-24 lg:self-start"><Label className="text-(--contour-cobalt)">{faq.label}</Label><h2 id="contour-faq-title" className="contour-title mt-6 max-w-md">{faq.title}</h2></Reveal>
        <Reveal stagger={0.06} distance={24} className="contour-faq">
          {faq.items.map(item => <details key={item.question}><summary className="flex items-start justify-between gap-6 py-6 text-lg font-medium tracking-[-0.02em] transition-colors duration-700 hover:text-(--contour-cobalt)">{item.question}<PlusIcon size={20} className="contour-plus mt-1 shrink-0" /></summary><p className="contour-details-copy max-w-lg pb-6 text-base leading-relaxed text-(--contour-muted)">{item.answer}</p></details>)}
        </Reveal>
      </Container>
    </section>
  );
}
