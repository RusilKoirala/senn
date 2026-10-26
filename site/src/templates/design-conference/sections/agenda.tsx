"use client";
import { useState } from "react";
import { ArrowDownIcon, ArrowUpRightIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import CountUp from "../components/CountUp";
import ClickSpark from "../components/ClickSpark";
import { useAgenda } from "../components/agenda-provider";
import { Container, Label, Reveal } from "../components/ui";
import { agendaCopy, event, venue } from "../content";
import { createCalendar } from "../lib/agenda";
import { localTime } from "../lib/format";

export function Agenda() {
  const { selected, loaded, storageError, remove, clear } = useAgenda();
  const [exported, setExported] = useState<string | null>(null);
  const [exportError, setExportError] = useState(false);
  const signature = selected.map(session => session.id).join(",");
  const downloaded = exported !== null && exported === signature;
  const download = () => {
    setExportError(false);
    try {
      const calendar = createCalendar(selected, { name: `${event.name} ${event.edition}`, venue: venue.name, city: event.city, domain: event.calendarDomain });
      const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar;charset=utf-8" }));
      const link = document.createElement("a"); link.href = url; link.download = event.calendarFile;
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setExported(signature);
    } catch { setExportError(true); }
  };
  return <section id="agenda" className="assembly-section bg-(--assembly-orange)" aria-labelledby="assembly-agenda-title"><Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-24"><Reveal><Label>{agendaCopy.label}</Label><h2 id="assembly-agenda-title" className="assembly-title mt-6 max-w-lg lg:text-7xl!">{agendaCopy.title.map(line => <span className="block" key={line}>{line}</span>)}</h2><p className="mt-6 max-w-sm text-base leading-relaxed">{agendaCopy.description}</p><p className="assembly-mono mt-10 text-xs">{agendaCopy.note}</p></Reveal><div className="assembly-agenda-ticket min-w-0"><div className="flex items-center justify-between gap-6 border-b border-dashed border-(--assembly-rule) p-6"><div><p className="text-xl font-bold tracking-tight">{event.name.toUpperCase()}</p><p className="assembly-mono mt-2 text-xs text-(--assembly-muted)">{event.shortDate} / {event.city}</p></div><div className="text-right"><p className="text-4xl font-semibold tracking-tight tabular-nums" aria-live="polite"><CountUp to={selected.length} duration={0.5} trigger="load" /></p><p className="assembly-mono mt-1 text-xs text-(--assembly-muted)">{agendaCopy.count}</p></div></div><div className="p-6">{!loaded ? <div className="min-h-40" role="status"><p className="text-sm text-(--assembly-muted)">{agendaCopy.loading}</p><div aria-hidden className="mt-5 space-y-3"><div className="h-3 w-3/4 bg-(--assembly-rule)" /><div className="h-3 w-1/2 bg-(--assembly-rule)" /></div></div> : selected.length ? <><ol className="divide-y divide-(--assembly-rule)">{selected.map(session => <li key={session.id} className="flex items-start gap-4 py-4 first:pt-0"><p className="assembly-mono mt-1 w-12 shrink-0 text-xs">{localTime(session.start)}</p><div className="min-w-0 flex-1"><p className="text-sm font-semibold leading-relaxed">{session.title}</p><p className="mt-1 text-xs text-(--assembly-muted)">{session.room} / {session.speaker}</p></div><button type="button" onClick={() => remove(session.id)} aria-label={`${agendaCopy.remove}: ${session.title}`} className="flex size-8 shrink-0 items-center justify-center transition-colors duration-500 hover:bg-(--assembly-orange)"><XIcon size={16} /></button></li>)}</ol><button type="button" onClick={clear} className="mt-4 text-xs text-(--assembly-muted) underline underline-offset-4 hover:text-(--assembly-ink)">{agendaCopy.clear}</button></> : <div className="py-5"><p className="text-2xl font-medium tracking-tight">{agendaCopy.emptyTitle}</p><p className="mt-3 max-w-xs text-sm leading-relaxed text-(--assembly-muted)">{agendaCopy.emptyText}</p><a href="#programme" className="mt-6 inline-flex items-center gap-3 text-sm font-semibold underline underline-offset-4">{agendaCopy.browse}<ArrowUpRightIcon size={16} /></a></div>}<ClickSpark sparkColor="#f14b28" sparkSize={5} sparkCount={6} duration={500} easing="spring" className="mt-8"><button type="button" disabled={!loaded || selected.length === 0} onClick={download} className="assembly-button w-full justify-between!">{downloaded ? agendaCopy.downloaded : agendaCopy.download}{downloaded ? <CheckIcon size={20} /> : <ArrowDownIcon size={20} />}</button></ClickSpark><p className="assembly-mono mt-4 text-xs leading-relaxed text-(--assembly-muted)">{agendaCopy.privacy}</p>{exportError && <p role="alert" className="mt-4 text-sm font-medium">{agendaCopy.downloadError}</p>}{downloaded && <p role="status" className="sr-only">{agendaCopy.downloaded}</p>}{storageError && <p role="status" className="mt-4 text-xs leading-relaxed text-(--assembly-muted)">{storageError}</p>}</div></div></Container></section>;
}
