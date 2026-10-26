"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import ShinyText from "../components/ShinyText";
import { Container } from "../components/ui";
import { person, quote } from "../content";

export function Quote() {
  return (
    <Container id="contact">
      <div className="rounded-2xl bg-[#203e2e] p-6 text-[#f1f3e9] sm:p-8">
        <p className="flex items-center gap-2 text-xs text-[#c1d5b7]"><span className="size-1.5 rounded-full bg-[#c1d5b7]" />{quote.contact.title}</p>
        <h2 className="mt-6 max-w-md text-3xl font-medium tracking-tight sm:text-4xl">{quote.contact.headline}</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#c7d1c4]">{quote.contact.text}</p>
        <a href={quote.contact.cta.href} className="group mt-8 flex w-fit max-w-full items-center gap-4 rounded-sm text-lg font-medium underline decoration-[#729079] underline-offset-8 transition-colors duration-500 hover:text-[#c1d5b7] sm:text-2xl">
          <span className="break-all">{person.email}</span><ArrowUpRightIcon size={24} className="shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
        <p className="mt-6 text-xs"><ShinyText text={quote.contact.reply} color="#c7d1c4" shineColor="#ffffff" speed={4} delay={4} /></p>
      </div>
      <figure className="mt-6 flex gap-4 px-1">
        <span aria-hidden className="text-4xl leading-none text-(--margin-accent)">&ldquo;</span>
        <div><blockquote className="max-w-xl text-sm leading-relaxed text-(--margin-secondary)"><p>{quote.text}</p></blockquote><figcaption className="margin-mono mt-3 text-xs text-(--margin-secondary)">{quote.author}</figcaption></div>
      </figure>
    </Container>
  );
}
