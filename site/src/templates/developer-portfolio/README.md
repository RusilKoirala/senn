# Developer portfolio ("Summit")

A dusk toned portfolio for an independent engineer. Ink type sits in the pale sky of a mountain at sunset, the dark rock melts into a warm black page, and every featured project is shown working on a photograph.

Status: **live.** All 11 sections built and in the gallery.

## Intake (assumed)

- **Person:** Sana Ferreira, an independent product engineer in Porto. Fictional. Users replace everything in `content.ts`.
- **One action:** book a 20 minute intro call. Email is the quiet fallback.
- **Audience:** founders and engineering leads at small teams who need a senior engineer for a few months.
- **Objections:** "Can one person carry this?", "Will the code outlive the contract?", "Timezones and rates?"
- **Proof:** shipped numbers per project, client quotes, years and teams.

## Layout

**B. Long form story.** A hire is a trust decision: the page walks from who she is, to work that proves it, to how working together goes.

| # | Section | Background | React Bits | Notes |
|---|---|---|---|---|
| 1 | Nav | transparent | GlassSurface | Monogram, links, "Book a call" |
| 2 | Hero | `summit.jpg` | SplitText, RotatingText, Noise | Left aligned ink headline in the sky, rotating noun, status pill, local time strip on the dark rock |
| 3 | Tagline | warm black | ScrollReveal | B11 word by word reveal, cream on black |
| 4 | Selected work | `river.jpg`, `wildflowers.jpg`, `moss.jpg` | GlassSurface, CountUp | Pinned horizontal gallery: one photo plate per project with a mini UI that acts out what it does |
| 5 | More work | warm black | FlowingMenu | Big type index rows, a marquee runs through a row on hover |
| 6 | Experience | warm black | AnimatedContent, CountUp | Editorial year rows with one measured outcome each |
| 7 | Toolbox | warm black | ScrollVelocity | Two lines of tool names that speed up with scrolling |
| 8 | Kind words | `summit.jpg` (rock crop) | DecryptedText | One large quote at a time, names as credits |
| 9 | Working together (FAQ) | warm black | AnimatedContent | Sticky heading, questions between hairlines |
| 10 | Contact | `moss.jpg` | ClickSpark, Magnet | Cream sky, ink headline, copyable email, same CTA as the hero |
| 11 | Footer | warm black | ShinyText | Name, socials, legal |

## Copy

**Hero**
- Status: "Booking projects from January 2027"
- Headline: "I build {backends · sync engines · payment flows · internal tools}" / "that survive launch day."
- Sub: "I'm Sana Ferreira, a product engineer in Porto. Nine years of APIs, queues and dashboards for small teams that ship every week."
- CTA: "Book a 20 minute call" · secondary "See selected work"
- Proof strip: "23 teams shipped" · "9 years" · "Porto, UTC+0" + live local time

**Tagline:** "I like the unglamorous parts." / "Retries, migrations, the 3am page." / "That is where products break."

**Selected work**
1. **Tidewater** (Kelp Pay, 2024 to 2025): webhook relay and retry queue. 2.4M events a day, zero lost since March 2025. Go, Postgres, Redis Streams, Fly.io. Mini UI: events stream in, one fails with a 503, retries, lands.
2. **Fieldbook** (Ventoso Flower Co., 2024): pickup booking for a flower farm. No shows fell from 18.3% to 4.1%. Next.js, Supabase, Twilio. Mini UI: a week grid, a slot gets booked, the reminder text goes out.
3. **Quiet** (open source, 2023 to now): an offline first notes app. 3,412 GitHub stars. React Native, SQLite, Yjs. Mini UI: a note is typed offline, then syncs to three devices.

**More work:** Ledgerline (invoice PDF API) · Porchlight (open source status page) · Kiln (image CLI) · Harbor Admin (logistics back office)

**Experience**
- 2024 to now · Independent · Product engineer for Kelp Pay, Ventoso Flower Co., Arcade Health
- 2020 to 2024 · Brightline Logistics · Senior backend engineer · on call median from 41 to 6 minutes
- 2017 to 2020 · Maré Studio · Full stack developer · 34 client launches

**Kind words:** Inês Barros (CTO, Kelp Pay), Tom Achterberg (founder, Ventoso Flower Co.), Priya Raman (eng lead, Arcade Health).

**FAQ:** availability, rates (from €740 a day, fixed scope on request), timezone overlap, what a first week looks like, who owns the code, small fixes vs. long projects.

**Contact:** "Have something that needs to hold up?" / "Let's talk it through." · email copy · same CTA as hero.

## SEO

Index. Title "Sana Ferreira, product engineer in Porto". Meta: "Independent product engineer building backends, sync engines and payment flows for small teams. Book a 20 minute call."

## Visual direction

- Geist for everything, set huge and tight (`-0.04em`) at semibold for display; Geist Mono for labels, data and the mini UIs.
- Ink `#131209` on the sky, cream `#f3ede4` on the warm black page, one accent: the sunset copper `#d9774b` from the rock.
- Same easing everywhere: `cubic-bezier(0.32,0.72,0,1)`.

## Deviations from the design skill

- Photography backgrounds instead of flat colour (project rule).
- Hero heading is left aligned rather than centred, so the type stays in the empty sky to the left of the peak.
- FlowingMenu (vendored as published) draws its row arrow with Hugeicons rather than Phosphor.
- Kind words is a quote on the copper rock with names as credits, and FAQ is an index with the answer set large beside it (an accordion on phones), so neither repeats Cove's layouts.
