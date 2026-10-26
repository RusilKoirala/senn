// Copy and links for senn's own site. Templates live in src/templates/.

// TODO: point at the real repository once it is public.
export const links = {
  github: "https://github.com",
  templates: "#templates",
};

export const nav = {
  items: [
    { label: "Templates", href: "#templates" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Principles", href: "#principles" },
  ],
  cta: { label: "Star on GitHub", href: links.github },
};

export const hero = {
  badge: "Open source · MIT · Free forever",
  headline: ["Beautiful landing pages.", "Zero design headaches."],
  subheadline:
    "Complete landing pages, designed with care and built with Next.js, Tailwind CSS, shadcn/ui and React Bits. Preview them live, make them yours, ship them today.",
  command: "npx senn@latest add modern-saas",
  primaryCta: { label: "Browse templates", href: links.templates },
  proof: ["1 template live", "4 in the works", "0 paywalls"],
};

export const gallery = {
  eyebrow: "The collection",
  headline: ["Few templates.", "Each one finished."],
  subheadline: "No kits of parts. Every template is a whole page with its own look, its own motion and its own story.",
  featured: {
    slug: "modern-saas",
    name: "Modern SaaS",
    codename: "Cove",
    href: "/t/modern-saas",
    description:
      "A calm, photographic page for a support product. Editorial serif headlines over landscape photography, a scroll drawn onboarding trail and a sticky benefits story.",
    tags: ["Light", "Photography", "Editorial serif", "Scroll stories"],
    facts: [
      { value: "9", label: "sections" },
      { value: "12", label: "React Bits components" },
      { value: "100%", label: "responsive" },
    ],
    command: "npx senn@latest add modern-saas",
  },
  upcoming: [
    { name: "Creative agency portfolio", vibe: "Expressive, editorial, oversized type" },
    { name: "AI startup", vibe: "Futuristic, glowing, alive" },
    { name: "Minimal product launch", vibe: "Quiet, focused, generous whitespace" },
    { name: "Developer portfolio", vibe: "Loud, kinetic, playful" },
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  headline: ["From blank page", "to live page."],
  steps: [
    {
      title: "Pick a template",
      description: "Browse the collection and try every page live, animations and all, before you commit to anything.",
    },
    {
      title: "Make it yours",
      description: "Colors, fonts and radius live in one theme file. Every word and image lives in one content file.",
    },
    {
      title: "Ship it",
      description: "One command copies clean source into your project. No runtime dependency, no lock in. You own every line.",
    },
  ],
  // TextType cycles through these in the terminal.
  commands: [
    "npx senn@latest add modern-saas",
    "npx senn@latest init my-landing --template modern-saas",
    "npx senn@latest list",
  ],
  output: [
    "✓ Copied 24 files to src/templates/modern-saas",
    "✓ Installed gsap, motion, @phosphor-icons/react",
    "✓ Ready at /t/modern-saas",
  ],
};

export const principles = {
  eyebrow: "Principles",
  items: [
    { statement: "Quality over quantity.", detail: "A handful of exceptional pages beats a thousand forgettable ones." },
    { statement: "Free, forever.", detail: "No paywalls, no pro tier, no email gate. MIT licensed." },
    { statement: "Complete pages, not parts.", detail: "Hero to footer, with the motion and the copy already worked out." },
    { statement: "Every page has its own face.", detail: "No shared look across templates. Each one is designed from scratch." },
  ],
};

export const footer = {
  marquee: ["Next.js", "Tailwind CSS", "shadcn/ui", "React Bits", "Open source", "Free forever"],
  tagline: "Beautiful landing pages, completely free.",
  links: [
    { label: "Templates", href: "#templates" },
    { label: "How it works", href: "#how-it-works" },
    { label: "GitHub", href: links.github },
  ],
  copyright: "© 2026 Senn. MIT License.",
};
