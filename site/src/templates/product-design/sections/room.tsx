"use client";

import Image from "next/image";
import { Container, Label, Reveal } from "../components/ui";
import { roomSection } from "../content";

export function Room() {
  return (
    <section id="room" className="contour-section bg-(--contour-white)" aria-labelledby="contour-room-title">
      <Container>
        <Reveal distance={32}>
          <div className="contour-plane aspect-[4/5] sm:aspect-[16/9]">
            <Image src={roomSection.image.src} alt={roomSection.image.alt} fill sizes="(min-width: 1280px) 1280px, 100vw" className="contour-photo object-[72%_50%] sm:object-center" placeholder="blur" />
          </div>
          <p className="contour-label mt-4 text-(--contour-muted)">{roomSection.caption}</p>
        </Reveal>
        <Reveal className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-24">
          <div><Label className="text-(--contour-cobalt)">{roomSection.label}</Label><h2 id="contour-room-title" className="contour-title mt-6">{roomSection.title.map(line => <span className="block" key={line}>{line}</span>)}</h2></div>
          <p className="max-w-md text-base leading-relaxed text-(--contour-muted) sm:text-lg lg:self-end">{roomSection.description}</p>
        </Reveal>
      </Container>
    </section>
  );
}
