"use client";

import { ArrowUpRightIcon, PlusIcon } from "@phosphor-icons/react";
import { useAgenda } from "../components/agenda-provider";
import DecryptedText from "../components/DecryptedText";
import { Container, Label, Reveal } from "../components/ui";
import { people } from "../content";

export function People() {
  const { setTrack } = useAgenda();
  return (
    <section id="people" className="assembly-section bg-(--assembly-ink) text-(--assembly-paper)" aria-labelledby="assembly-people-title">
      <Container>
        <Reveal><Label className="text-(--assembly-orange)">{people.label}</Label><div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-end"><h2 id="assembly-people-title" className="assembly-title">{people.title.map(line => <span className="block" key={line}>{line}</span>)}</h2><p className="max-w-sm text-sm leading-relaxed text-(--assembly-paper)/65 lg:justify-self-end">{people.description}</p></div></Reveal>
        <Reveal className="assembly-roster mt-12" stagger={0.04} distance={16}>
          {people.speakers.map((speaker, index) => <details key={speaker.id} id={`speaker-${speaker.id}`}><summary className="group grid items-center gap-x-6 gap-y-3 py-6 sm:grid-cols-[40px_minmax(0,1fr)_190px_24px] sm:py-8"><span className="assembly-mono hidden text-xs text-(--assembly-paper)/45 sm:block">{String(index + 1).padStart(2, "0")}</span><span className="flex items-center justify-between gap-4 text-3xl font-medium tracking-[-0.05em] sm:block sm:text-4xl lg:text-5xl">{speaker.name}<PlusIcon size={22} className="assembly-plus shrink-0 text-(--assembly-orange) sm:hidden" /></span><span className="assembly-mono text-xs text-(--assembly-paper)/60"><DecryptedText text={speaker.role} animateOn="hover" speed={35} maxIterations={5} useOriginalCharsOnly /></span><PlusIcon size={22} className="assembly-plus hidden text-(--assembly-orange) sm:block" /></summary><div className="assembly-details-copy grid gap-6 pb-8 sm:grid-cols-[40px_minmax(0,1fr)_214px]"><div className="hidden sm:block" /><p className="max-w-xl text-sm leading-relaxed text-(--assembly-paper)/70">{speaker.bio}</p><div><p className="assembly-mono text-xs text-(--assembly-orange)">{speaker.topic}</p><a href={`#session-${speaker.sessionId}`} onClick={() => setTrack("All")} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold underline underline-offset-4">{people.sessionLink}<ArrowUpRightIcon size={14} /></a></div></div></details>)}
        </Reveal>
        <p className="assembly-mono mt-5 text-xs text-(--assembly-paper)/45">{people.sampleNote}</p>
      </Container>
    </section>
  );
}
