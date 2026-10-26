"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import ShinyText from "../components/ShinyText";
import { Container } from "../components/ui";
import { brand, navigation } from "../content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
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
  // Marks the section in view as the current navigation item.
  useEffect(() => {
    const targets = navigation.links.map(link => document.querySelector(link.href)).filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setCurrent(`#${entry.target.id}`);
    }, { rootMargin: "-45% 0px -50% 0px" });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  const close = () => { menu.current?.close(); setOpen(false); trigger.current?.focus(); };
  const reveal = () => { menu.current?.showModal(); setOpen(true); };
  return (
    <header className="sticky top-0 z-40 bg-(--contour-ice)/90 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" aria-label={`${brand.name} home`} className="flex items-center gap-2">
          <span aria-hidden className="size-3 rounded-full bg-(--contour-cobalt)" />
          <span className="text-xl font-medium tracking-[-0.05em]"><ShinyText text={brand.name} color="#17191c" shineColor="#1645ed" trigger="hover" speed={1.2} /></span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm md:flex">
          {navigation.links.map(link => <a key={link.href} href={link.href} aria-current={current === link.href ? "true" : undefined} className="relative py-2 text-(--contour-muted) transition-colors duration-700 hover:text-(--contour-ink) aria-[current=true]:text-(--contour-ink)">{link.label}<span aria-hidden className={`absolute inset-x-0 bottom-0 h-px origin-left bg-(--contour-cobalt) transition-transform duration-700 ${current === link.href ? "scale-x-100" : "scale-x-0"}`} /></a>)}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block"><a href={navigation.ctaHref} className="contour-button contour-button-small whitespace-nowrap">{navigation.cta}</a></span>
          <button ref={trigger} type="button" aria-label={navigation.menuOpen} aria-expanded={open} aria-controls="contour-menu" onClick={reveal} className="relative flex size-10 items-center justify-center md:hidden">
            <span className={`absolute h-px w-6 bg-current transition-transform duration-700 ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span className={`absolute h-px w-6 bg-current transition-transform duration-700 ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>
      </Container>
      <dialog ref={menu} id="contour-menu" className="contour-menu" aria-label="Navigation" onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-xl font-medium tracking-[-0.05em]"><span aria-hidden className="size-3 rounded-full bg-(--contour-cobalt)" />{brand.name}</span>
          <button type="button" className="relative size-10" aria-label={navigation.menuClose} onClick={close}><span className="absolute inset-x-2 top-1/2 h-px rotate-45 bg-current" /><span className="absolute inset-x-2 top-1/2 h-px -rotate-45 bg-current" /></button>
        </div>
        <nav aria-label="Mobile navigation" className="my-auto flex flex-col gap-6">
          {navigation.links.map((link, index) => <a key={link.href} href={link.href} onClick={close} className="contour-menu-link flex items-center justify-between text-4xl font-medium tracking-[-0.045em]" style={{ animationDelay: `${100 + index * 50}ms` }}>{link.label}<ArrowRightIcon size={28} /></a>)}
        </nav>
        <a href={navigation.ctaHref} onClick={close} className="contour-button w-full">{navigation.cta}</a>
      </dialog>
    </header>
  );
}
