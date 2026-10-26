"use client";

import { Fragment } from "react";
import { ArrowDownIcon, ArrowUpRightIcon, CheckIcon, PlusIcon } from "@phosphor-icons/react";
import { useAgenda } from "../components/agenda-provider";
import ClickSpark from "../components/ClickSpark";
import { Container, Label, Reveal } from "../components/ui";
import { programme, sessions } from "../content";
import { duration, localTime } from "../lib/format";

export function Programme() {
  const { selected, toggle, loaded, track, setTrack } = useAgenda();
  const times = [...new Set(sessions.map(session => session.start))];
  const visible = sessions.filter(session => track === "All" || session.track === track || session.track === "All");
  return (
    <section id="programme" className="assembly-section" aria-labelledby="assembly-programme-title">
      <Container>
        <Reveal><Label>{programme.label}</Label><div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end"><h2 id="assembly-programme-title" className="assembly-title max-w-xl">{programme.title}</h2><p className="max-w-md text-sm leading-relaxed text-(--assembly-muted)">{programme.description}</p></div></Reveal>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-5 sm:mt-12"><div role="group" aria-label={programme.filtersLabel} className="flex flex-wrap gap-2">{programme.tracks.map(filter => <button key={filter} type="button" aria-pressed={track === filter} onClick={() => setTrack(filter)} className={`border px-3 py-2 text-sm font-medium transition-colors duration-500 ${track === filter ? "border-(--assembly-ink) bg-(--assembly-ink) text-(--assembly-paper)" : "border-(--assembly-rule) hover:border-(--assembly-ink) hover:bg-(--assembly-orange)"}`}>{filter}<span className="assembly-mono ml-2 text-xs opacity-70">{sessions.filter(session => filter === "All" || session.track === filter || session.track === "All").length}</span></button>)}</div><p className="assembly-mono text-xs text-(--assembly-muted)">{programme.allTimes}</p></div>
        <div aria-hidden className="assembly-mono mt-8 hidden grid-cols-[160px_minmax(0,1fr)_120px] gap-8 border-b border-(--assembly-ink) pb-4 text-xs md:grid"><span>{programme.timeHeading}</span><span>{programme.sessionHeading}</span><span className="text-right">{programme.selectionHeading}</span></div>
        <div className="mt-6 border-t border-(--assembly-ink) md:mt-0 md:border-t-0">
          {times.map(start => {
            const group = visible.filter(session => session.start === start);
            if (!group.length) return null;
            const pause = programme.breaks.find(item => item.after === localTime(group[0].end));
            return <Fragment key={start}>{group.map(session => {
              const on = selected.some(saved => saved.id === session.id);
              return <article key={session.id} id={`session-${session.id}`} data-selected={on} className="assembly-session grid gap-5 border-b border-(--assembly-rule) px-0 py-6 sm:py-8 md:grid-cols-[160px_minmax(0,1fr)_120px] md:gap-8 md:px-3">
                <div className="assembly-mono flex flex-wrap items-center justify-between gap-3 text-xs md:block"><div><p className="text-sm"><time dateTime={session.start}>{localTime(session.start)}</time> — <time dateTime={session.end}>{localTime(session.end)}</time></p><p className="mt-2 text-(--assembly-muted)">{duration(session)} {programme.duration} / {session.room}</p></div><p className="text-(--assembly-muted) md:mt-6">{session.track === "All" ? programme.sharedTrack : session.track}</p></div>
                <div className="min-w-0"><h3 className="max-w-xl text-xl font-semibold leading-snug tracking-tight sm:text-2xl">{session.title}</h3><p className="mt-2 max-w-xl text-sm leading-relaxed text-(--assembly-muted)">{session.takeaway}</p><p className="mt-3 text-sm font-medium">{session.speaker}</p><details className="mt-4"><summary className="flex w-fit items-center gap-2 text-xs text-(--assembly-muted) transition-colors duration-500 hover:text-(--assembly-ink)">{programme.about}<ArrowDownIcon size={12} className="assembly-plus" /></summary><div className="assembly-details-copy mt-4 max-w-xl border-l border-(--assembly-orange) pl-4"><p className="text-sm leading-relaxed text-(--assembly-muted)">{session.description}</p>{session.speakerId && <a href={`#speaker-${session.speakerId}`} onClick={() => { const biography = document.getElementById(`speaker-${session.speakerId}`); if (biography instanceof HTMLDetailsElement) biography.open = true; }} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold underline underline-offset-4">{programme.biography}<ArrowUpRightIcon size={12} /></a>}</div></details></div>
                <div className="self-start md:justify-self-end"><ClickSpark sparkColor="#f14b28" sparkCount={6} sparkSize={4} sparkRadius={18} duration={450} glow={0} easing="spring"><button type="button" disabled={!loaded} aria-pressed={on} aria-label={`${on ? programme.remove : programme.add}: ${session.title}`} onClick={() => toggle(session)} className="assembly-session-toggle px-3 text-xs font-medium md:min-w-28">{on ? <CheckIcon size={16} weight="bold" /> : <PlusIcon size={16} />}<span>{on ? programme.added : programme.add}</span></button></ClickSpark></div>
              </article>;
            })}{pause && <div className="assembly-mono flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-(--assembly-rule) py-5 text-xs text-(--assembly-muted) md:px-3"><span className="w-40 shrink-0">{pause.time}</span><span>{pause.label}</span></div>}</Fragment>;
          })}
        </div>
      </Container>
    </section>
  );
}
