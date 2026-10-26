// All copy, links and images for the Cove template. Edit this file first.
// Images live in ./assets and are imported, so the template folder carries its own
// assets: installing it copies only these files.

import alpine from "./assets/alpine.jpg";
import canyon from "./assets/canyon.jpg";
import cove from "./assets/cove.jpg";
import grass from "./assets/grass.jpg";
import meadow from "./assets/meadow.jpg";
import valley from "./assets/valley.jpg";

export const brand = {
  name: "cove",
  href: "#top",
};

export const nav = {
  links: [
    { label: "Product", href: "#benefits" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Customers", href: "#proof" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Start free trial", href: "#start" },
};

export const hero = {
  image: {
    src: cove,
    alt: "A calm turquoise cove between rocky cliffs under a bright white sky",
  },
  announcement: { tag: "New", text: "Cove now drafts in 31 languages", href: "#benefits" },
  // Each entry renders on its own line.
  headline: ["Clear your support queue", "before your coffee cools."],
  subheadline:
    "Cove reads every ticket, drafts a reply in your team's voice, and waits for one click to send. Small teams answer 3.4× faster without hiring.",
  primaryCta: { label: "Start 14 day free trial", href: "#start" },
  secondaryCta: { label: "See a live inbox", href: "#benefits" },
  proof: { rating: "4.8", reviews: "612 reviews", teams: "Used by 1,240 support teams" },
};

// Icon names map to Phosphor icons in sections/logos.tsx.
export const logos = {
  label: "Support teams at 1,240 companies send calmer replies with Cove",
  items: [
    { name: "Larkspur Plants", icon: "leaf" },
    { name: "Quillo", icon: "feather" },
    { name: "Brightwell Dental", icon: "tooth" },
    { name: "Halcyon Coffee", icon: "coffee" },
    { name: "Tidewater Supply", icon: "waves" },
    { name: "Kestrel Bikes", icon: "bicycle" },
    { name: "Mapleworks", icon: "tree" },
    { name: "Northpine Studio", icon: "mountains" },
  ],
} as const;

export const tagline = {
  // ScrollReveal lights these up word by word as the reader scrolls.
  lines: ["Your customers wait less.", "Your team stops drowning.", "Nobody works the weekend."],
  image: {
    src: alpine,
    alt: "A quiet alpine valley at sunset with a small stone house and wildflowers",
  },
  // Sits on the small photo frame, fades out as it opens.
  lead: "Now picture Monday morning.",
  // Fades in once the photo has opened to full bleed.
  payoff: {
    time: "Monday, 9:04 am.",
    stats: ["Queue: 0", "Drafts approved: 47", "Coffee: still warm"],
  },
};

export const benefits = {
  eyebrow: "Product",
  headline: ["A calmer inbox,", "one draft at a time."],
  subheadline:
    "Cove does the reading, the digging and the first draft. Your team keeps the judgment.",
  // The sticky photo panel the mini UIs float on.
  image: {
    src: meadow,
    alt: "A green meadow with a lake and a small cabin under a blue sky full of clouds",
  },
  // visual keys map to animated mini UIs in components/benefit-visuals.tsx
  items: [
    {
      visual: "draft",
      title: "Replies drafted in 9 seconds",
      description:
        "Cove reads the thread, the order history and your help center, then writes a reply in your team's voice.",
      stat: { value: "71.4%", label: "of drafts sent unedited" },
    },
    {
      visual: "approve",
      title: "Nothing goes out without a human",
      description: "Every draft waits for a yes. Each edit teaches Cove your tone a little better.",
      stat: { value: "0", label: "replies sent without approval" },
    },
    {
      visual: "channels",
      title: "Every channel, one calm queue",
      description: "Email, live chat, Instagram DMs and App Store reviews land in one inbox, sorted by urgency.",
      stat: { value: "4", label: "channels, one queue" },
    },
    {
      visual: "spike",
      title: "Spot what is breaking first",
      description:
        "Cove groups similar tickets and flags spikes before your status page or your Slack catches up.",
      stat: { value: "6.3 min", label: "average time to flag a spike" },
    },
  ],
} as const;

export const howItWorks = {
  eyebrow: "How it works",
  headline: "Live before lunch.",
  subheadline: "Three steps. No migration, no engineer, no new tab for your team to learn.",
  image: {
    src: valley,
    alt: "A winding path through green hills toward a bright horizon",
    // The photo's own aspect ratio, so the trail overlay lines up with it.
    ratio: valley.width / valley.height,
  },
  // The trail in the photo, as [x%, y%] of the image, from the foreground to the horizon.
  trail: [
    [45.9, 99], [45.7, 95.1], [45.2, 92.1], [46.9, 89], [50.75, 86.5], [54.6, 84.3],
    [56.5, 82.3], [56.3, 81.3], [54.6, 80.3], [51.2, 78.9], [47.4, 77.7], [44.5, 76.7],
    [43.5, 75.2], [45.8, 73.6], [47.9, 73.9], [45.9, 72.4], [42.8, 71.1], [40.2, 68.8],
    [37.3, 66.4], [35.8, 64.7], [38.3, 63],
  ] as [number, number][],
  steps: [
    {
      at: 2, // index into trail
      side: "left", // which side of the marker the note sits on
      align: "above", // note above, centred on, or below its marker
      title: "Connect your inbox",
      description: "Gmail, Zendesk, Intercom or Help Scout. Nothing to migrate.",
      stat: { value: 4, suffix: " min", label: "average setup" },
    },
    {
      at: 6,
      side: "right",
      align: "center",
      title: "Cove learns your voice",
      description: "It reads your recent replies and your help center articles.",
      stat: { value: 2000, suffix: "", label: "past replies studied" },
    },
    {
      at: 20,
      side: "left",
      align: "below",
      title: "Approve and send",
      description: "Review each draft with one click. Edit when you want, skip when you don't.",
      stat: { value: 12, suffix: " min", label: "to your first approved reply" },
    },
  ],
} as const;

export const proof = {
  eyebrow: "Customers",
  headline: ["Calmer teams,", "in their own words."],
  stats: [
    { value: 3.4, decimals: 1, suffix: "×", label: "faster first reply" },
    { value: 71.4, decimals: 1, suffix: "%", label: "of drafts sent unedited" },
    { value: 11.5, decimals: 1, suffix: " hrs", label: "saved per agent each week" },
  ],
  statsNote: "Median across 1,240 teams, measured over their first 90 days.",
  image: {
    src: grass,
    alt: "Tall grass on rolling hills under a wide pale blue sky",
  },
  // Rotates every `interval` ms; picking a name jumps to that quote.
  interval: 8000,
  testimonials: [
    {
      quote: "We closed a 600 ticket backlog in two days. I keep waiting for the catch.",
      name: "Priya Raman",
      role: "Head of Support",
      company: "Larkspur Plants",
      result: "600 ticket backlog cleared in 2 days",
    },
    {
      quote: "It writes like Dana on her best day, and Dana approves every one.",
      name: "Tomás Herrera",
      role: "Founder",
      company: "Quillo",
      result: "First reply time down from 6h 12m to 41m",
    },
    {
      quote: "Our Monday mornings used to be triage. Now they are coffee.",
      name: "Amara Okafor",
      role: "CX Lead",
      company: "Brightwell Dental",
      result: "Weekend shifts dropped from 3 people to 0",
    },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  headline: ["Questions,", "answered."],
  contact: {
    text: "Something we missed? A person from our team replies within 2 hours.",
    cta: { label: "Talk to a human", href: "#start" },
  },
  // Objections first: safety, then switching cost, then data.
  items: [
    {
      q: "Does Cove ever reply without asking?",
      a: "No. Every draft waits for a person to approve it. You can turn on autopilot for specific tags, like order status, but it's off until you switch it on.",
    },
    {
      q: "What if a draft is wrong?",
      a: "Edit it or discard it. Cove shows the sources it used for every draft, so you can see exactly why it wrote what it wrote, and each edit makes the next draft closer.",
    },
    {
      q: "Do we have to leave our helpdesk?",
      a: "No. Cove works inside Zendesk, Intercom, Help Scout and Gmail. Your team keeps the tools, views and shortcuts they already know.",
    },
    {
      q: "Is our data used to train models?",
      a: "Never. Your tickets stay in your workspace, are encrypted at rest, and are deleted 30 days after you cancel.",
    },
    {
      q: "How long does setup take?",
      a: "Most teams send their first approved draft within 12 minutes. There is nothing to migrate and no engineer needed.",
    },
    {
      q: "Which languages does Cove write in?",
      a: "31, including Spanish, German, Japanese and Brazilian Portuguese. Cove replies in the language the customer wrote in.",
    },
    {
      q: "What happens after the trial?",
      a: "Plans start at $29 per agent per month. If you don't upgrade, your account pauses. No surprise charges, no card needed to start.",
    },
    {
      q: "Can we cancel anytime?",
      a: "Yes, in two clicks from settings. You can export every draft and reply before you go.",
    },
  ],
};

export const finalCta = {
  image: {
    src: canyon,
    alt: "Sunlight pouring through hazy air between two tall green canyon walls",
  },
  eyebrow: "Start today",
  headline: ["Your queue,", "finally quiet."],
  subheadline: "Connect your inbox in 4 minutes and approve your first draft before your coffee cools.",
  // Same primary action as the hero.
  primaryCta: hero.primaryCta,
  secondaryCta: { label: "Book a 15 minute walkthrough", href: "#faq" },
  reassurance: ["14 day free trial", "No credit card", "Cancel anytime"],
};

export const footer = {
  tagline: "Calm support for small teams.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Drafting", href: "#benefits" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Customers", href: "#proof" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help center", href: "/help" },
        { label: "Security", href: "/security" },
        { label: "Changelog", href: "/changelog" },
      ],
    },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  status: "All systems normal",
  copyright: "© 2026 Cove Labs, Inc.",
  socials: [
    { label: "Cove on X", icon: "x", href: "https://x.com" },
    { label: "Cove on LinkedIn", icon: "linkedin", href: "https://www.linkedin.com" },
    { label: "Cove on GitHub", icon: "github", href: "https://github.com" },
  ],
  // The footer closes on the photo the page opened with.
  wordmark: { text: "cove", image: cove },
} as const;

export const visuals = {
  draft: {
    ticket: { name: "Kenji Watanabe", subject: "Can I change my delivery address?" },
    lines: [
      "Hi Kenji, congrats on the move.",
      "Your parcel hasn't left our warehouse yet, so",
      "I've updated it to 48 Alder Lane, Portland.",
    ],
    seconds: 9.1,
    result: "Sent unedited",
  },
  approve: {
    before: "Dear valued customer,",
    after: "Hi Harriet,",
    body: "SPRING15 runs until Sunday. I've reapplied it to your cart.",
    learned: "Learned: Dana says Hi, never Dear",
  },
  channels: [
    { channel: "email", who: "Marisol O.", text: "Charged twice", urgency: 3 },
    { channel: "chat", who: "Theo B.", text: "Where is my order?", urgency: 2 },
    { channel: "instagram", who: "@lunawears", text: "Love the new drop", urgency: 0 },
    { channel: "appstore", who: "App Store", text: "★★ App crashes on login", urgency: 3 },
  ],
  spike: {
    hours: ["6", "7", "8", "9", "10", "11"],
    counts: [4, 6, 9, 38, 14, 7],
    spikeIndex: 3,
    alert: "38 customers mentioned checkout since 9:14 am",
  },
};

export const inbox = {
  folders: [
    { label: "Needs approval", count: 7, active: true },
    { label: "All tickets", count: 24 },
    { label: "Sent today", count: 61 },
    { label: "Snoozed", count: 3 },
  ],
  tickets: [
    {
      name: "Marisol Ortega",
      subject: "Charged twice for order #48213",
      preview: "Hi, I just noticed two charges of $64.90 on my card...",
      time: "9:41",
      tag: "Billing",
      active: true,
    },
    {
      name: "Kenji Watanabe",
      subject: "Can I change my delivery address?",
      preview: "I moved last week and the parcel is still going to...",
      time: "9:38",
      tag: "Shipping",
    },
    {
      name: "Harriet Lowe",
      subject: "Discount code not working",
      preview: "SPRING15 says expired but your email says it runs...",
      time: "9:22",
      tag: "Promo",
    },
  ],
  message:
    "Hi, I just noticed two charges of $64.90 on my card for order #48213. Can you refund one of them? Thanks, Marisol",
  draft:
    "Hi Marisol, you're right, our payment provider ran your card twice at 8:12 this morning. I've refunded the duplicate $64.90 and you'll see it back on your card within 3 to 5 business days. Sorry for the scare. Dana",
  draftMeta: "Drafted in 9s · Sources: Stripe, Shopify order #48213",
};
