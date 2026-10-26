# Design conference (Assembly)

Status: complete, with website preview and registry packaging. React Bits powers the typography, entrances, marquee, counters and pointer feedback in every section.

A fictional one day gathering for designers and software makers. The page feels like a printed event poster and a useful programme: vermilion, paper, black ink, large type, a real timetable, and a personal agenda visitors can save.

## Intake

- **Event:** Assembly 2027, a fictional independent design and technology gathering in Rotterdam.
- **Audience:** designers, frontend engineers, and small product teams choosing how to spend a conference day.
- **Offer:** eight sessions across two rooms, with room for the conversations between them. Every speaker, date, venue and session is sample content.
- **Primary action:** build a personal agenda. Visitors choose sessions and download an `.ics` calendar file. This works in the browser and makes no false booking or payment claim.
- **Objections:** Is the programme relevant? Can I fit the sessions I want? Where is it? Will it work on my phone?
- **Proof:** the actual sample programme, detailed session descriptions, named speakers with clearly documented fictional biographies, and a specific venue guide. No fabricated testimonials, previous attendance numbers, sponsors or customer logos.
- **Date and place:** 14 May 2027, Rotterdam. Sample copy rather than a real announced event.

## Outline and layout

**A. Hero plus sections**, structured like an event poster followed by its programme. Give the programme visual priority over generic feature explanations. The page uses the full desktop width with a 1280px content measure, rather than a narrow portfolio column.

The landing page first answers why this day is worth attending, then helps visitors plan it. Make the event category, audience, date and place explicit in the hero. Let the session takeaways and speaker context provide evidence before the separate tagline reveal. Agenda building remains the single primary action for this demo.

| Order | Section | Surface | React Bits | Purpose and structure |
| --- | --- | --- | --- | --- |
| 1 | Header | Paper | ShinyText | Compact wordmark, Programme / People / Venue / Your agenda; a small persistent agenda count |
| 2 | Hero | Vermilion with a fresh event photograph | SplitText | Explicit event category and audience, giant left aligned headline, compact date and location rail, rectangular primary action; a wide documentary photograph sits below the main message |
| 3 | Programme | Paper and black rules | AnimatedContent | Session takeaways visible in each row, accessible track filters, aligned start and end times, speaker, duration, room and Add to agenda controls. Expanded descriptions stay within the selected row |
| 4 | People | Ink | AnimatedContent, DecryptedText | Editorial roster with large names, roles, topic labels and concise biographies connected to each session; no identical profile card grid |
| 5 | Why come | Paper | ScrollReveal | Two deliberate large lines after the programme and people: “Come for the work. / Stay for the conversations.” |
| 6 | Venue | Fresh venue photograph and paper | AnimatedContent | Oversized image opposite an arrival guide, access notes and transport details. Body text stays on its own surface |
| 7 | Good to know | Paper | AnimatedContent | Six practical questions in open, ruled rows with accessible disclosure controls |
| 8 | Your agenda | Vermilion | CountUp, ClickSpark | Calendar summary with a restrained ticket edge, selected sessions, clear empty state, remove controls and Download agenda action; label it as a personal plan |
| 9 | Footer | Ink | ShinyText, ScrollVelocity | Event identity, date, contact and legal links, and a way back to the programme |

### Hero copy

- Eyebrow: **Assembly 2027 · Design and technology gathering**
- Headline: **Good work. / Better company.**
- Introduction: “One day in Rotterdam for designers and frontend engineers. Explore interfaces, design systems and prototypes, then build a programme around your interests.”
- Event line: “14 May 2027 · Rotterdam”
- Primary CTA: **Build your agenda** → `#programme`.
- Supporting detail: “Eight sessions. Two rooms. Save your plan without an account.” The session and room counts come from the programme.

Keep the event identity, date, place and CTA readable immediately. Only the expressive headline receives the split text entrance. On mobile, place the event line above the headline and the CTA before the photograph.

### Benefits

1. Give your interfaces a clearer point of view: explore how hierarchy, language and interaction choices make a product recognisable.
2. Make decisions easier to share: sessions on component boundaries, handoff and prototypes connect design intent to implementation.
3. Leave room to talk: breaks between sessions and an open lunch interval give conversations time to continue.
4. Make the day your own: choose sessions from either room, resolve clashes and save a calendar file without creating an account.

Use these benefits in the introduction and session copy. The programme demonstrates them; they do not need a separate feature grid or a tutorial section before the timetable.

### How it works

1. Browse the programme by time or track.
2. Add sessions to your agenda; resolve any clashes.
3. Download your calendar and check the venue guide.

The controls perform these actions. They are not a looping imitation of interaction.

### Sample programme

All times are local to Rotterdam, using `Europe/Amsterdam`. Store explicit start and end times for calendar export and conflict detection. Show duration alongside each time range in the rendered programme.

| Time | Duration | Room | Session | Speaker | Track |
| --- | --- | --- | --- | --- | --- |
| 09:30–10:00 | 30 min | Main room | Opening the room | Event hosts | All |
| 10:00–11:00 | 60 min | Main room | Interfaces with a point of view | Mara Velez | Design |
| 10:00–11:00 | 60 min | Studio | The work between the components | Dev Mehta | Engineering |
| 11:15–12:15 | 60 min | Main room | Making room for a slower decision | Noa Laurent | Design |
| 11:15–12:15 | 60 min | Studio | Small systems that survive handoff | Ada Okafor | Engineering |
| 13:30–14:30 | 60 min | Main room | What a prototype can prove | Jun Park | Design |
| 14:45–15:45 | 60 min | Studio | The browser is part of the brief | Ines Rocha | Engineering |
| 16:00–16:45 | 45 min | Main room | A conversation worth continuing | Event hosts | All |

Show breaks as quiet timetable annotations, outside the selectable session list: 11:00–11:15, lunch 12:15–13:30, 14:30–14:45 and 15:45–16:00. Sessions that touch at a boundary do not clash.

### Session takeaways

Show the takeaway beneath each title without requiring expansion. Opening a row reveals its longer description and a link to the speaker biography.

| Session | Visible takeaway | Expanded description |
| --- | --- | --- |
| Opening the room | Meet the themes of the day and find your route through the two rooms. | The hosts introduce the programme, explain how to switch rooms and point out the spaces available for conversation and quiet breaks. |
| Interfaces with a point of view | Make hierarchy, language and interaction express the same product idea. | Mara walks through contrasting approaches to the same interface, showing how small choices create a recognisable voice without making common tasks harder. |
| The work between the components | Decide what belongs inside a component and what belongs between components. | Dev follows a shared interaction across component boundaries, covering state ownership, keyboard behaviour and the decisions that need to travel with the code. |
| Making room for a slower decision | Separate decisions that need evidence from decisions a team can safely reverse. | Noa introduces a practical decision record, then uses a product scenario to explore assumptions, missing evidence and the moment to stop debating and test. |
| Small systems that survive handoff | Document component decisions so another team can extend the system without starting again. | Ada connects component examples, usage guidance and ownership notes into a small handoff package, including how to explain exceptions and future changes. |
| What a prototype can prove | Choose a prototype that answers one useful question before building more. | Jun compares sketches, interactive flows and browser prototypes, showing what each can test and where apparent fidelity can give a team false confidence. |
| The browser is part of the brief | Use real layout, input and accessibility constraints to improve the design. | Ines takes an interface from a fixed composition into the browser, exploring content growth, narrow screens, focus order and the choices that emerge during implementation. |
| A conversation worth continuing | Turn the day's questions into a next step for your own work. | The hosts bring themes from both rooms together and invite participants to share an unresolved question or a small experiment they want to take back to their team. |

### People copy

The following roles and biographies are fictional sample content. Use a visible “Sample event” note in the demo, and document the fictional status alongside the editable speaker data. Do not add real employer logos, invented awards or claims of past speaking experience.

| Speaker | Role and topic | Biography |
| --- | --- | --- |
| Mara Velez | Product designer · Interface voice | Mara explores how language, hierarchy and everyday interactions give digital products a distinct character. Her session focuses on making those choices legible to a whole team. |
| Dev Mehta | Frontend engineer · Component boundaries | Dev works on the state and interaction patterns that connect reusable components. His focus is making behaviour understandable across design and engineering. |
| Noa Laurent | Design facilitator · Product decisions | Noa helps small teams turn uncertain product questions into decisions they can explain and revisit. Their session examines when discussion needs a test or a clearer record. |
| Ada Okafor | Design systems engineer · Handoff | Ada connects component implementation with the guidance teams need to use it. Her session looks at documentation, ownership and the decisions that often disappear during handoff. |
| Jun Park | Interaction designer · Prototyping | Jun uses prototypes to investigate specific questions about flows and behaviour. Their session explores how to match the prototype's level of detail to the evidence a team needs. |
| Ines Rocha | Creative developer · Design in the browser | Ines explores visual ideas through working browser interfaces. Her session treats responsive layout, keyboard use and content variation as part of the design process. |

These are fictional people and sessions created for the template. Do not present their biographies as real credentials.

### FAQ draft

- **Who is this for?** People who design and build digital products, whether they work independently or as part of a small team.
- **Can I switch rooms?** Yes. The programme lists each room; choose sessions from either track.
- **Can I save overlapping sessions?** The agenda warns about a clash and lets you decide which session to keep.
- **Where does my agenda live?** In this browser. Download the calendar file to take it elsewhere; no account is required.
- **Is the venue accessible?** The template includes an access section for step free arrival, seating, quiet space and a contact route. Replace the sample details with verified venue information before publishing a real event.
- **Where do I get a ticket?** This demo helps plan a day and does not issue tickets. An event owner can add their real ticket provider in `content.ts` without replacing the programme or calendar features.

### Final action

- Headline: **A day that fits you.**
- Empty state: “Your day is still open. Pick a session to start.”
- With selections: show the chosen session names and times, an accessible removal control, and **Download your agenda**.
- Supporting action: **Back to the programme**.

## Visual contract

- **Typography:** Manrope, with Geist Mono only for time and programme data. Headline uses the Tailwind type scale, capped at bold, with intentional mobile line breaks. No serif display, italics, handwritten type or ultra bold weight.
- **Palette:** vermilion `#f14b28`, paper `#f7f2e9`, ink `#181818`. No gradients or glows.
- **Colour pairing:** ink on vermilion has approximately 4.88:1 contrast; ink on paper has approximately 15.92:1. Use ink for body copy, metadata and control labels on vermilion. Paper on vermilion is approximately 3.26:1, so reserve that pairing for large text meeting the 3:1 threshold, not normal text. Focus indicators and control boundaries must remain clear on each surface.
- **Shape:** square photography, straight rules and mostly square controls. The agenda has a restrained ticket edge. No pill navigation, glass dashboard, rounded bento, notebook grid or initials avatar.
- **Composition:** poster first, timetable second. The hero is predominantly vermilion with large ink typography, a compact metadata rail and a wide documentary photograph below the message. At desktop sizes use `text-8xl` or `text-9xl` for the headline as the available width allows, with the headline and introduction capped at 680px inside the wider composition. On mobile start at `text-5xl` and verify the intended phrase breaks at 375px. Programme rows use aligned mono times, clear session titles, smaller visible takeaways and restrained rules. Large sections change rhythm through colour and proportion. The page does not reuse Cove’s sticky benefits panel, Summit’s sideways portfolio, or Margin’s compact notebook.
- **Motion:** headline reveal, restrained section entrances, and visible feedback when an agenda selection changes. Everything uses a shared custom easing and respects reduced motion. Text remains readable if an observer never fires. Event facts and interactive programme controls are available immediately; decorative entrances never delay browsing, selecting or downloading.
- **Photography:** two fresh editorial event images, one showing an inhabited event space and one showing the venue. Quiet areas hold any overlaid large type. No borrowed logos, faces of real named speakers, or text baked into images.

## Assets and licensing

Two original images were generated using the built-in image generation tool after approval. Source PNGs are kept locally in `docs/backgrounds/assembly-hall.png` and `docs/backgrounds/assembly-venue.png` (the project's docs folder is Git ignored). Compressed copies ship as `assets/hall.jpg` and `assets/venue.jpg`. No other template uses them. See [assets/IMAGE_SOURCES.md](assets/IMAGE_SOURCES.md) for image directions and provenance.

Original Assembly layout, copy, calendar logic and styles use Senn's MIT license. React Bits components retain their upstream MIT + Commons Clause license in `REACT_BITS_LICENSE`. The project owner confirmed redistribution permission for this template on 26 October 2026. Preserve [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and the upstream notice.

## Use and customize

Preview: `/t/design-conference`. Setup: `/templates/design-conference`.

```bash
npx senn-ui@latest add design-conference
npx senn-ui@latest skill design-conference
```

Edit `content.ts`. Update all event labels, explicit ISO session timestamps with UTC offsets, `event.timeZone`, break times, calendar domain/filename and storage key together. Keep speaker and session IDs connected. Export uses UTC instants so calendars display the correct local time on the visitor's device. Replace sample contact and access information before announcing a real event.

## Validation

- Browser checked at 1440, 375 and 320 pixels with no horizontal page overflow.
- Track filters, conflict keep/replace, adjacent time slots, selected states, reload persistence, clearing, empty download state and actual `.ics` download checked.
- Mobile navigation opens/closes, restores focus, supports Escape and locks background scrolling. Session links open the relevant biography. FAQ disclosure works with the keyboard.
- Vendored effects handle reduced motion; scoped CSS removes entrance and transition animation for that preference.
- `pnpm test:assembly` covers conflict boundaries, stale/corrupt saved data, calendar UTC conversion, selection ordering, escaping, UTF-8 folding and invalid inputs.
- Registry verification installs intact source and assets into both `app` and `src/app` projects. Typecheck and production build pass; lint has only the three existing Cove image warnings.

## Responsive and interaction contract

- At 1440px, the hero uses an offset headline and metadata rail; the programme is a wide timetable.
- At 375px, the event line moves above the heading and the CTA stays before the photograph. Navigation becomes an accessible full screen menu with a morphing toggle, and timetable rows become a natural vertical reading order: time and duration, title, takeaway, speaker and room, then the selection control. Nothing requires horizontal scrolling.
- Session details and track filters support keyboard use, selected states, visible focus and proper ARIA.
- Agenda state persists locally. Loading, empty and conflicting selections have explicit states. Export has a disabled empty state, confirmation and a retry path if download generation fails.
- The `.ics` export escapes text, uses stable event IDs and timezone correct UTC timestamps, and includes only selected sessions. It makes no network request or reservation.
- The footer’s legal and event contact destinations remain content data. A real deployment must supply real links and venue information.

## Motion context

Website context. Photography is static after its entrance. The timetable is controlled by the visitor and does not run a fake cursor or an automatic story loop. Text sections use the normal page reveal. No MP4 or GIF export is part of the template build.

## SEO

- Gallery setup page: index as “Design conference landing page template | Senn”.
- Fictional event demo: noindex. A real event owner should set their real name, date, venue, description and sharing image before indexing.
- Suggested real event title pattern: “Assembly 2027 — design and technology in Rotterdam”.
- Suggested description: “A one day gathering for people who design and build digital things. Explore the programme and build your own agenda.”
- Add Event structured data only when the event details and booking destinations are real.

## Intentional deviations

The project’s photography rule takes precedence over the flat background rule. The event uses straight editorial navigation and a timetable rather than the generic floating island and feature sequence. The primary action is programme planning; it does not simulate ticket sales. These are deliberate choices for this event product.

## Packaging and finish gate

Implemented one section at a time after approval. Keep all content, copy and destinations in `content.ts`, tokens scoped to `.assembly`, fonts loaded in `page.tsx`, and all dependencies and images inside the template boundary. Vendor React Bits components as published; no cross template imports.

Registered in both template maps with a current 16:10 production screenshot. The gallery, setup page and CLI use the same metadata and event specific customization instructions. The fictional demo and its viewer are noindex.

## Next template, after this one is finished

A physical product landing page, codename **Contour**: cobalt and cold white, object photography, an interactive finish selector and a specifications led layout. It will get its own complete brief and approval before implementation. It will not be scaffolded alongside Assembly.
