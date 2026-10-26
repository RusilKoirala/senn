"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, AsteriskIcon } from "@phosphor-icons/react";
import ShinyText from "../components/ShinyText";
import { useAgenda } from "../components/agenda-provider";
import { Container } from "../components/ui";
import { event, navigation } from "../content";

export function Header() {
  const { selected } = useAgenda();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [open]);
  useEffect(() => {
    const closeAtDesktop = (change: MediaQueryListEvent) => { if (change.matches) { menu.current?.close(); setOpen(false); } };
    const media = window.matchMedia("(min-width: 768px)");
    media.addEventListener("change", closeAtDesktop);
    return () => media.removeEventListener("change", closeAtDesktop);
  }, []);
  const close = () => { menu.current?.close(); setOpen(false); trigger.current?.focus(); };
  const reveal = () => { menu.current?.showModal(); setOpen(true); };
  const links = [...navigation.links, { label: navigation.agenda, href: "#agenda" }];
  return (
    <header className="sticky top-0 z-40 border-b border-(--assembly-rule) bg-(--assembly-paper)">
      <Container className="flex h-20 items-center justify-between gap-6">
        <a href="#top" aria-label={`${event.name} ${event.edition}`} className="flex items-center gap-2"><AsteriskIcon size={26} weight="bold" /><span className="text-xl font-bold tracking-[-0.06em]"><ShinyText text={event.name.toUpperCase()} color="#181818" shineColor="#f14b28" trigger="hover" speed={1.2} /></span><span className="assembly-mono ml-2 hidden text-xs sm:inline">{event.edition}</span></a>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-medium md:flex">{navigation.links.map(link => <a key={link.href} href={link.href} className="underline-offset-4 transition-colors duration-500 hover:text-(--assembly-orange) hover:underline">{link.label}</a>)}</nav>
        <div className="flex items-center gap-4"><a href="#agenda" className="group flex items-center gap-3 border-b border-(--assembly-ink) pb-1 text-sm font-semibold"><span className="hidden sm:inline">{navigation.agenda}</span><span className="assembly-mono text-xs" aria-label={`${selected.length} ${navigation.agenda}`}>[{selected.length.toString().padStart(2, "0")}]</span><ArrowUpRightIcon size={18} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a><button ref={trigger} type="button" aria-label={navigation.menuOpen} aria-expanded={open} aria-controls="assembly-menu" onClick={reveal} className="relative flex size-10 items-center justify-center md:hidden"><span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} /><span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} /></button></div>
      </Container>
      <dialog ref={menu} id="assembly-menu" className="assembly-menu" aria-label="Navigation" onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
        <div className="flex items-center justify-between"><span className="text-xl font-bold tracking-tight">{event.name.toUpperCase()}</span><button type="button" className="relative size-10" aria-label={navigation.menuClose} onClick={close}><span className="absolute inset-x-2 top-1/2 h-px rotate-45 bg-current" /><span className="absolute inset-x-2 top-1/2 h-px -rotate-45 bg-current" /></button></div>
        <nav aria-label="Mobile navigation" className="my-auto flex flex-col gap-6">{links.map((link, index) => <a key={link.href} href={link.href} onClick={close} className="assembly-details-copy flex items-center justify-between text-4xl font-semibold tracking-tight" style={{ animationDelay: `${index * 70}ms` }}>{link.label}<ArrowUpRightIcon size={30} /></a>)}</nav>
        <p className="assembly-mono text-sm">{event.dateLabel} / {event.city}</p>
      </dialog>
    </header>
  );
}
