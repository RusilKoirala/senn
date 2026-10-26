// All copy, links and images for the Summit template. Edit this file first.
// Images live in ./assets and are imported, so the template folder carries its own
// assets: installing it copies only these files.

import moss from "./assets/moss.jpg";
import river from "./assets/river.jpg";
import summit from "./assets/summit.jpg";
import wildflowers from "./assets/wildflowers.jpg";

export const person = {
  name: "Sana Ferreira",
  monogram: "SF",
  role: "Product engineer",
  city: "Porto",
  // IANA zone for the live local time in the hero and footer.
  timeZone: "Europe/Lisbon",
  utc: "UTC+0",
  email: "hello@sanaferreira.dev",
  calendar: "https://cal.com/sanaferreira/intro",
};

export const nav = {
  links: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Working together", href: "#faq" },
  ],
  cta: { label: "Book a call", href: "#contact" },
};

export const hero = {
  image: {
    src: summit,
    alt: "A jagged snow capped mountain glowing copper at sunset under a pale evening sky",
  },
  status: "Booking projects from January 2027",
  // Line one ends with the rotating word; line two is static.
  lead: "I build",
  rotating: ["backends", "sync engines", "payment flows", "internal tools"],
  close: "that survive launch day.",
  subheadline:
    "I'm Sana Ferreira, a product engineer in Porto. Nine years of APIs, queues and dashboards for small teams that ship every week.",
  primaryCta: { label: "Book a 20 minute call", href: "#contact" },
  secondaryCta: { label: "See selected work", href: "#work" },
  facts: [
    { value: "23", label: "client teams" },
    { value: "9 yrs", label: "in production" },
    { value: "3,412", label: "stars on Quiet" },
  ],
};

export const tagline = {
  eyebrow: "How I work",
  // Each line lights up word by word as the reader scrolls.
  lines: ["I like the unglamorous parts.", "Retries, migrations, the 3am page.", "That is where products break."],
};

// `visual` picks the mini UI in components/work-visuals.tsx.
export const work = {
  eyebrow: "Selected work",
  headline: ["Three projects,", "still running."],
  note: "Scroll sideways through the work",
  projects: [
    {
      slug: "tidewater",
      title: "Tidewater",
      client: "Kelp Pay",
      years: "2024 to 2025",
      role: "Lead engineer",
      summary:
        "A webhook relay and retry queue for a payments startup. Every charge event reaches the ledger, even when the ledger is having a bad day.",
      stat: { value: 2.4, decimals: 1, suffix: "M", label: "events a day, none lost since March 2025" },
      stack: ["Go", "Postgres", "Redis Streams", "Fly.io"],
      links: [
        { label: "Case study", href: "#work" },
        { label: "Architecture notes", href: "#work" },
      ],
      image: { src: river, alt: "A river winding through a deep green valley lit by golden evening light" },
      visual: "events",
      // "light" switches the panels to frosted white for pale photos.
      tone: "dark",
    },
    {
      slug: "fieldbook",
      title: "Fieldbook",
      client: "Ventoso Flower Co.",
      years: "2024",
      role: "Solo build",
      summary:
        "Pickup booking for a flower farm that sells to 140 florists. Slots, stem counts and a text the day before, so nobody drives out to an empty field.",
      stat: { value: 4.1, decimals: 1, suffix: "%", label: "no shows, down from 18.3%" },
      stack: ["Next.js", "TypeScript", "Supabase", "Twilio"],
      links: [
        { label: "Live site", href: "#work" },
        { label: "Case study", href: "#work" },
      ],
      image: { src: wildflowers, alt: "Rolling green hills covered in red, yellow and white wildflowers under a blue sky" },
      visual: "booking",
      tone: "dark",
    },
    {
      slug: "quiet",
      title: "Quiet",
      client: "Open source",
      years: "2023 to now",
      role: "Author and maintainer",
      summary:
        "An offline first notes app. Write on a train with no signal, and every device catches up the moment one of them finds the network.",
      stat: { value: 3412, decimals: 0, suffix: "", label: "GitHub stars, 61 contributors" },
      stack: ["React Native", "SQLite", "Yjs", "Expo"],
      links: [
        { label: "GitHub", href: "#work" },
        { label: "App Store", href: "#work" },
      ],
      image: { src: moss, alt: "Two smooth pale stones resting on soft green moss against a cream background" },
      visual: "notes",
      tone: "light",
    },
  ],
} as const;

export const moreWork = {
  eyebrow: "More work",
  text: "Smaller tools and client builds. Hover a row for the short version.",
  githubCta: { label: "Everything on GitHub", href: "#more" },
  items: [
    {
      text: "Ledgerline",
      meta: "2023",
      marquee: "Invoice PDF API · 1.2M PDFs rendered · Node and Puppeteer",
      link: "#more",
    },
    {
      text: "Porchlight",
      meta: "2023",
      marquee: "Open source status page · used by 380 teams · Go and SQLite",
      link: "#more",
    },
    {
      text: "Kiln",
      meta: "2022",
      marquee: "Image optimising CLI · cuts page weight by 61% · Rust",
      link: "#more",
    },
    {
      text: "Harbor Admin",
      meta: "2022",
      marquee: "Back office for a freight company · 9 depots · Rails and Hotwire",
      link: "#more",
    },
  ],
};

export const experience = {
  eyebrow: "Experience",
  headline: ["Nine years,", "three chapters."],
  roles: [
    {
      years: "2024 to now",
      company: "Independent",
      title: "Product engineer for hire",
      text: "Short, focused projects for Kelp Pay, Ventoso Flower Co. and Arcade Health. I join the team chat, ship in week one and leave the docs behind.",
      stat: { value: 7, decimals: 0, suffix: "", label: "products shipped" },
    },
    {
      years: "2020 to 2024",
      company: "Brightline Logistics",
      title: "Senior backend engineer",
      text: "Moved 212 cron jobs onto a proper queue, rebuilt tracking for 9 depots and wrote the on call guide the team still uses.",
      stat: { value: 6, decimals: 0, suffix: " min", label: "median time to fix a page, down from 41" },
    },
    {
      years: "2017 to 2020",
      company: "Maré Studio",
      title: "Full stack developer",
      text: "Client sites, shop backends and one booking engine that three restaurants in Porto still run every night.",
      stat: { value: 34, decimals: 0, suffix: "", label: "client launches" },
    },
  ],
};

export const toolbox = {
  eyebrow: "Toolbox",
  text: "What I reach for first. I'll happily learn yours.",
  rows: [
    ["Go", "TypeScript", "Postgres", "Redis", "Node", "Next.js"],
    ["React Native", "SQLite", "Fly.io", "Terraform", "Supabase", "Grafana"],
  ],
};

export const kindWords = {
  eyebrow: "Kind words",
  image: { src: summit, alt: "Copper lit rock faces of a mountain at dusk" },
  quotes: [
    {
      quote: "Sana deleted more code than she wrote, and our pager went quiet for the first time in a year.",
      name: "Inês Barros",
      role: "CTO, Kelp Pay",
      result: "Pages per week: 14 to 2",
    },
    {
      quote: "She spent a morning in the packing shed before writing a line. Fieldbook fits how we actually work.",
      name: "Tom Achterberg",
      role: "Founder, Ventoso Flower Co.",
      result: "Booked online: 91% of pickups",
    },
    {
      quote: "Clear updates every Friday, no surprises, and a handover doc our juniors still read.",
      name: "Priya Raman",
      role: "Engineering lead, Arcade Health",
      result: "Shipped 2 weeks early",
    },
  ],
};

export const faq = {
  eyebrow: "Working together",
  headline: ["Rates, timezones", "and the fine print."],
  items: [
    {
      q: "Can one person really carry this?",
      a: "For the projects I take, yes. I scope work so one senior engineer can own it end to end, and I'll tell you on the first call if your project needs a team instead.",
    },
    {
      q: "What do you charge?",
      a: "From €740 a day, billed weekly. For a well defined project I can quote a fixed price after a paid half day of scoping.",
    },
    {
      q: "How much overlap do we get?",
      a: "I work 9:00 to 17:30 in Porto (UTC+0). That covers a full day with Europe and four hours with the US East Coast.",
    },
    {
      q: "What does the first week look like?",
      a: "Day one: access and a walk through your code. By Friday you get a small change in production and a written plan for the rest.",
    },
    {
      q: "Who owns the code?",
      a: "You do, from the first commit. Everything lives in your repositories, with docs and a recorded handover at the end.",
    },
    {
      q: "Do you take small fixes?",
      a: "Yes, in blocks of three days. Good for a slow query, a flaky deploy or a migration that keeps getting pushed back.",
    },
  ],
};

export const contact = {
  image: { src: moss, alt: "Two smooth pale stones resting on soft green moss" },
  headline: ["Have something", "that needs to hold up?"],
  text: "Tell me what you're building. You'll get a straight answer on whether I can help, usually within a day.",
  primaryCta: { label: "Book a 20 minute call", href: "https://cal.com/sanaferreira/intro" },
  emailLabel: "Or write to",
  reassurance: "Replies within one working day",
};

export const footer = {
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Bluesky", href: "https://bsky.app" },
  ],
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Imprint", href: "#imprint" },
  ],
  note: "Designed and built in Porto",
};

// Text for the looping mini UIs on each project photo (components/work-visuals.tsx).
// Rewrite them so they show your own projects doing their job.
export const visuals = {
  events: {
    title: "kelp-ledger / webhooks",
    counterLabel: "delivered today",
    counter: 2418903,
    rows: [
      { id: "evt_7Kq2", name: "refund.created", ms: "38ms" },
      { id: "evt_7Kp9", name: "charge.succeeded", ms: "41ms" },
      { id: "evt_7Kn4", name: "payout.paid", ms: "52ms" },
      { id: "evt_7Km1", name: "charge.succeeded", ms: "36ms" },
    ],
    // Fails once, retries, lands.
    flaky: { id: "evt_7Kr8", name: "charge.succeeded", failMs: "timeout", retry: "retry 1 in 2s", ms: "44ms", note: "delivered on attempt 2" },
    next: { id: "evt_7Ks3", name: "invoice.paid", ms: "39ms" },
  },
  booking: {
    title: "Pickups · week 19",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    times: ["09:00", "12:00", "16:00"],
    // [day, time] pairs already taken.
    booked: [
      [0, 0], [0, 2], [1, 1], [2, 0], [2, 1], [3, 0], [4, 2],
    ],
    target: [3, 1],
    who: "Marta Quintas",
    order: "24 peony stems",
    sms: "Ventoso: see you Thursday at 12:00. Gate code 4471.",
  },
  notes: {
    title: "Trail notes",
    body: "Water at km 14. The ridge path is closed after the bridge, take the lower trail.",
    offline: "Offline · saved on this phone",
    syncing: "Back online · syncing",
    devices: ["Pixel 8", "MacBook Air", "iPad mini"],
    synced: "Synced to 3 devices",
  },
};
