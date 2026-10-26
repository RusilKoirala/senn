"use client";

import { useRef, useState } from "react";
import { ArrowUpIcon, XIcon } from "@phosphor-icons/react";
import ScrollVelocity from "../components/ScrollVelocity";
import { Container } from "../components/ui";
import { brand, footer } from "../content";

export function Footer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [legal, setLegal] = useState<"privacy" | "terms">("privacy");
  const show = (type: "privacy" | "terms") => { setLegal(type); dialog.current?.showModal(); };
  return (
    <footer className="overflow-hidden bg-(--contour-ink) pt-12 pb-8 text-(--contour-white) sm:pt-16">
      <div className="overflow-hidden" aria-hidden>
        <ScrollVelocity texts={[footer.marquee]} velocity={24} gap={64} fontSize="var(--contour-marquee-size)" fontWeight={500} separator={<span className="inline-block size-6 rounded-full bg-(--contour-cobalt) sm:size-10" />} fadeEdges={false} draggable={false} numCopies={4} />
      </div>
      <Container className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-(--contour-white)/15 pt-6 text-xs text-(--contour-white)/60">
        <p>© {footer.copyright} / {brand.sampleLabel}</p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-6">
          <a href={`mailto:${brand.email}`} className="transition-colors duration-700 hover:text-(--contour-white)">{footer.emailLabel}</a>
          <button type="button" onClick={() => show("privacy")} className="transition-colors duration-700 hover:text-(--contour-white)">{footer.privacyLabel}</button>
          <button type="button" onClick={() => show("terms")} className="transition-colors duration-700 hover:text-(--contour-white)">{footer.termsLabel}</button>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors duration-700 hover:text-(--contour-white)">{footer.back}<ArrowUpIcon size={14} /></a>
        </nav>
      </Container>
      <dialog ref={dialog} className="contour-dialog" aria-labelledby="contour-legal-title">
        <div className="flex items-start justify-between gap-6">
          <h2 id="contour-legal-title" className="text-2xl font-medium tracking-[-0.03em]">{legal === "privacy" ? footer.privacyTitle : footer.termsTitle}</h2>
          <button type="button" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-(--contour-ice) transition-colors duration-700 hover:bg-(--contour-mist)" aria-label={footer.close} onClick={() => dialog.current?.close()}><XIcon size={18} /></button>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-(--contour-muted)">{legal === "privacy" ? footer.privacyText : footer.termsText}</p>
      </dialog>
    </footer>
  );
}
