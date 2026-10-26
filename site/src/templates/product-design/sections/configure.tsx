"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDownIcon, CheckIcon, LinkSimpleIcon } from "@phosphor-icons/react";
import ClickSpark from "../components/ClickSpark";
import ShinyText from "../components/ShinyText";
import { Container, Label, Reveal } from "../components/ui";
import { brand, configure, finishes, specs } from "../content";
import { createSpecification, finishFromSearch, shareUrl } from "../lib/spec";

type Status = "idle" | "done" | "error";

export function Configure() {
  const [finishId, setFinishId] = useState(finishes[0].id);
  const [copied, setCopied] = useState<Status>("idle");
  const [saved, setSaved] = useState<Status>("idle");
  const finish = finishes.find(item => item.id === finishId) ?? finishes[0];

  // Restores the finish from ?finish= after hydration, and on back and forward.
  useEffect(() => {
    const restore = () => setFinishId(finishFromSearch(window.location.search, finishes));
    const timer = setTimeout(restore, 0);
    window.addEventListener("popstate", restore);
    return () => { clearTimeout(timer); window.removeEventListener("popstate", restore); };
  }, []);

  const choose = (id: string) => {
    setFinishId(id);
    setCopied("idle");
    setSaved("idle");
    window.history.replaceState(window.history.state, "", shareUrl(window.location.href, id));
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(shareUrl(window.location.href, finish.id)); setCopied("done"); }
    catch { setCopied("error"); }
  };
  const download = () => {
    try {
      const text = createSpecification(brand, finish, specs.rows, shareUrl(window.location.href, finish.id));
      const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
      const link = document.createElement("a"); link.href = url; link.download = brand.fileName.replace(".txt", `-${finish.id}.txt`);
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setSaved("done");
    } catch { setSaved("error"); }
  };

  const summary = [
    { label: configure.rows.model, value: `${brand.model} / ${brand.product}` },
    { label: configure.rows.finish, value: finish.name },
    { label: configure.rows.code, value: finish.code },
    { label: configure.rows.size, value: specs.rows[0].value },
  ];

  return (
    <section id="configure" className="contour-section" aria-labelledby="contour-configure-title">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-24">
          <div><Label className="text-(--contour-cobalt)">{configure.label}</Label><h2 id="contour-configure-title" className="contour-title mt-6">{configure.title.map(line => <span className="block" key={line}>{line}</span>)}</h2></div>
          <p className="max-w-md text-base leading-relaxed text-(--contour-muted)">{configure.description}</p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="contour-plane aspect-square">
            {finishes.map((item, index) => <Image key={item.id} src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 100vw" data-active={item.id === finish.id} aria-hidden={item.id !== finish.id} className="contour-photo contour-finish-image" placeholder="blur" priority={index === 0} />)}
            <p className="contour-label absolute top-6 left-6 text-(--contour-muted)">{finish.code}</p>
          </div>
          <div className="flex flex-col">
            <fieldset>
              <legend className="contour-label text-(--contour-muted)">{configure.legend}</legend>
              <div className="mt-4 grid gap-3">
                {finishes.map(item => (
                  <label key={item.id} className="contour-swatch">
                    <input type="radio" name="contour-finish" value={item.id} checked={item.id === finish.id} onChange={() => choose(item.id)} className="sr-only" />
                    <span aria-hidden className="contour-swatch-dot" style={{ background: item.swatch }} />
                    <span className="min-w-0 flex-1"><span className="block text-base font-semibold">{item.name}</span><span className="mt-1 block text-sm leading-relaxed text-(--contour-muted)">{item.note}</span></span>
                    {item.id === finish.id && <CheckIcon size={20} weight="bold" aria-hidden className="shrink-0" />}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="mt-8 rounded-3xl bg-(--contour-white) p-6">
              <p className="contour-label text-(--contour-muted)">{configure.summary}</p>
              <p className="mt-2 text-3xl font-medium tracking-[-0.04em]" aria-live="polite"><ShinyText key={finish.id} text={`${brand.model} ${finish.name}`} color="#17191c" shineColor={finish.swatch} trigger="view" speed={1.6} /></p>
              <dl className="mt-6 divide-y divide-(--contour-rule) border-y border-(--contour-rule)">
                {summary.map(row => <div key={row.label} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3 text-sm"><dt className="text-(--contour-muted)">{row.label}</dt><dd className="font-medium tabular-nums">{row.value}</dd></div>)}
              </dl>
              <div className="mt-6 grid gap-3">
                <ClickSpark sparkColor={finish.swatch} sparkSize={6} sparkCount={7} duration={500} easing="spring"><button type="button" onClick={download} className="contour-button w-full justify-between!">{saved === "done" ? configure.downloaded : configure.download}<span className="contour-button-icon">{saved === "done" ? <CheckIcon size={16} weight="bold" /> : <ArrowDownIcon size={16} weight="bold" />}</span></button></ClickSpark>
                <button type="button" onClick={copy} className="contour-button contour-button-ghost w-full">{copied === "done" ? <CheckIcon size={16} weight="bold" /> : <LinkSimpleIcon size={16} weight="bold" />}{copied === "done" ? configure.shared : configure.share}</button>
              </div>
              <div aria-live="polite">
                {copied === "error" && <p role="alert" className="mt-4 text-sm font-medium">{configure.shareError}</p>}
                {saved === "error" && <p role="alert" className="mt-4 text-sm font-medium">{configure.downloadError}</p>}
              </div>
              <p className="contour-label mt-6 text-(--contour-muted)">{configure.note}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
