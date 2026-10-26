# Template #1 — Modern SaaS ("Cove")

Status: **complete**: all sections built and verified at 1440×900, 1440×768 and 375×812

A light, airy SaaS landing page. Real landscape photography sits behind huge, quiet typography; every section has at least one React Bits moment. Feels calm and confident, the opposite of a busy dashboard.

## Intake (assumed for the demo product)

| Question | Answer |
|---|---|
| Product | **Cove**, a shared support inbox. AI drafts every reply in your team's voice; a human approves before anything is sent. |
| Primary action | Start a 14 day free trial (no credit card) |
| Conversion | Trial signup |
| ICP | Support leads and founders at 5 to 50 person SaaS / ecommerce teams |
| Problem | Ticket backlog grows faster than headcount; replies are slow and inconsistent |
| Top objections | 1. "AI will say something wrong to a customer" 2. "Switching helpdesks is painful" 3. "Our data will train someone's model" |
| Traffic | Search + Product Hunt + founder Twitter |
| Proof | Usage stats, three testimonials, customer logos |
| Voice | Calm, plain spoken, quietly confident |
| Direction | Light theme, landscape photography, editorial type |

## Layout: **A. Classic hero plus sections**

The product (an inbox with drafts waiting) is understood at a glance from a hero screenshot, and the audience already knows the category.

## Page outline

| # | Section | Background | React Bits | Notes |
|---|---|---|---|---|
| 0 | **Nav** (floating glass pill) | over hero | `GlassSurface` | Logo, 3 links, "Start free trial". Hamburger morphs to X on mobile. |
| 1 | **Hero** | `wow.jpeg` (the cove: white sky on top, water below) | `SplitText` (headline, word rise with blur), `StarBorder` (primary CTA), `Noise` (film grain) | Headline sits in the white sky, product mockup floats over the water. |
| 2 | **Logo strip** | white | `LogoLoop` | 8 customer wordmarks, pause on hover. |
| 3 | **Tagline reveal** | `image.jpg` (alpine sunset) | `ScrollReveal` (words light up one by one), `ScrollExpand` (photo grows to full bleed) | Tagline on white, then the photo opens: "Now picture Monday morning." → "Monday, 9:04 am. Queue: 0". |
| 4 | **Benefits** | `imag2.png` (meadow) as a sticky photo panel | `GlassSurface` (liquid glass card holding each mini UI), `SplitText` (heading) | Editorial sticky scroll: four serif benefits on the left (active one in ink), the photo panel on the right swaps the looping mini UI (`components/benefit-visuals.tsx`). A bento was tried and rejected as generic. |
| 5 | **How it works** | `wow2.jpeg` (valley with a winding trail) | `CountUp` (step stats), `SplitText` (heading) | Pinned scroll: a glowing line draws itself along the photo's trail, three markers light up with glass step notes. Mobile: framed scene draws once, steps listed below. |
| 6 | **Proof** | white stats, then `image3.jpeg` (grass under a wide sky) as a full bleed quote panel | `CountUp` (stats), `FoldText` (quote unfolds like paper), `SplitText` (heading) | Editorial: three huge serif stats between hairline rules, then one big ink pull quote in the sky, names as credits on the grass with a timer line that rotates quotes (pauses on hover). |
| 7 | **FAQ** | white | `AnimatedContent` (rows rise in, staggered), `SplitText` (heading) | Editorial: sticky serif heading + "Talk to a human" on the left; 8 questions as large serif lines between hairlines on the right, smooth grid-rows expand, plus rotates to ×. FAQPage JSON-LD included. |
| 8 | **Final CTA** (`#start`) | `wow4.jpeg` (canyon with bright haze) | `LightRays` (`lightMode`, warm gold, from the top), `SplitText`, `StarBorder` | Ink serif headline in the glow, same CTA as the hero, reassurance in a frosted pill. Target of every "Start free trial" link. |
| 9 | **Footer** | white, with `wow.jpeg` (cove) inside the wordmark as a bookend | `MaskedHeading` (cove photo through a 200px serif "cove") | Brand + tagline, 3 link columns, copyright, legal, live status dot, socials. |

## Hero copy

- **Headline:** Clear your support queue / before your coffee cools.
- **Subheadline:** Cove reads every ticket, drafts a reply in your team's voice, and waits for one click to send. Small teams answer 3.4× faster without hiring.
- **Primary CTA:** Start 14 day free trial
- **Secondary (text link, not a button):** See a live inbox
- **Proof line:** ★ 4.8 from 612 reviews · Used by 1,240 support teams

## Tagline reveal

> Your customers wait less.
> Your team stops drowning.
> Nobody works the weekend.

## Benefits

- **Replies drafted in 9 seconds.** Cove reads the thread, the customer's order history and your help center, then writes a reply your team sends unedited 71.4% of the time.
- **Nothing goes out without a human.** Every draft waits for approval. Each edit teaches Cove your tone a little better.
- **Every channel, one calm queue.** Email, live chat, Instagram DMs and App Store reviews land in one inbox, sorted by urgency.
- **Spot what is breaking first.** Cove groups similar tickets and flags spikes: "38 customers mentioned checkout since 9:14 am."

## How it works

1. **Connect your inbox.** Gmail, Zendesk, Intercom or Help Scout in under 4 minutes. No migration.
2. **Cove learns your voice.** It reads your last 2,000 replies and your help center articles.
3. **Approve and send.** Review drafts with one click. Edit when you want, skip when you don't.

## Proof

- Stats: **3.4×** faster first reply · **71.4%** of drafts sent unedited · **11.5 hours** saved per agent each week
- Testimonials:
  - "We closed a 600 ticket backlog in two days. I keep waiting for the catch." — Priya Raman, Head of Support, Larkspur Plants
  - "It writes like Dana on her best day, and Dana approves every one." — Tomás Herrera, Founder, Quillo
  - "Our Monday mornings used to be triage. Now they are coffee." — Amara Okafor, CX Lead, Brightwell Dental

## FAQ

1. **Does Cove ever reply without asking?** No. Every draft waits for a person to approve it, unless you turn on autopilot for specific tags like order status.
2. **What if a draft is wrong?** Edit it or discard it. Cove shows the sources it used, so you can see why it wrote what it wrote.
3. **Do we have to leave our helpdesk?** No. Cove works inside Zendesk, Intercom, Help Scout and Gmail.
4. **Is our data used to train models?** Never. Your tickets stay in your workspace and are deleted 30 days after you cancel.
5. **How long does setup take?** Most teams send their first approved draft within 12 minutes.
6. **Which languages does Cove write in?** 31, including Spanish, German, Japanese and Brazilian Portuguese.
7. **What happens after the trial?** Plans start at $29 per agent per month. If you don't upgrade, your account pauses. No surprise charges.
8. **Can we cancel anytime?** Yes, in two clicks from settings.

## Risk reversal

14 day free trial · No credit card · Cancel anytime

## SEO / AEO

**Index.** Evergreen product page.
- Title: `Cove — AI drafted support replies your team approves`
- Meta: `Cove drafts every support reply in your team's voice and waits for one click to send. Answer customers 3.4× faster. Free for 14 days.`
- FAQ as FAQPage schema.

## Visual direction

- **Theme:** light. Page background white; photos fade into white where their skies are white (`wow`, `wow2`, `wow4`).
- **Type:** Instrument Serif (400, upright) for display headlines, Geist for everything else. Headlines `text-6xl` to `text-8xl`, tight tracking, black → #666 text gradient.
- **Motion:** custom easing `cubic-bezier(0.32,0.72,0,1)`, 700ms+; scroll reveals via IntersectionObserver / GSAP ScrollTrigger.
- **Icons:** Phosphor.
- **Images:** web-sized copies in `./assets/` (cove, alpine, meadow, valley, grass, canyon), imported in `content.ts` and served through `next/image`.

## Design notes

- Section backgrounds are photographs.
- Every section uses at least one React Bits component.
- Two typefaces: Instrument Serif for display headlines, Geist for everything else.

## Before shipping a real site from this template

- Footer and legal links point to `/about`, `/careers`, `/contact`, `/help`, `/security`, `/changelog`, `/privacy` and `/terms`. Create those pages or change the hrefs in `content.ts`.
- Add a branded 404, a favicon and an `og:image`.
- Swap the demo product (Cove) copy, stats and testimonials in `content.ts` for real ones.
