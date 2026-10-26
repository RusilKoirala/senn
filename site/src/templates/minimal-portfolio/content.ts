// All copy, links and images for the Margin template. Edit this file first.
// Images live in ./assets and are imported, so the template folder carries its own
// assets: installing it copies only these files.

import banner from "./assets/banner.jpg";

export const person = {
  name: "Lina Ortega",
  initials: "LO",
  email: "hola@linaortega.dev",
  calendar: "mailto:hola@linaortega.dev?subject=Book%20a%20call",
  location: "Valencia, Spain",
  // IANA zone for the "my time / your time" widget.
  timeZone: "Europe/Madrid",
  bio: "Full stack engineer building developer tools and small, fast web apps. I care about the boring details: good defaults, clear errors and pages that load before you blink.",
  // Optional: import a photo from ./assets and set it here. Initials show until then.
  avatar: null as null | import("next/image").StaticImageData,
};

export const nav = {
  links: [
    { label: "Stack", href: "#stack" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
};

export const hero = {
  introduction: "Independent engineer",
  availability: "Available for thoughtful projects",
  banner: {
    src: banner,
    alt: "Sunlit rock formations above a grassy path under a blue sky",
    position: "50% 52%",
  },
  // Cycles under the name.
  titles: ["Full stack engineer", "Building developer tools", "Writing about Postgres", "Open source maintainer"],
  primaryCta: { label: "Book a call", href: person.calendar },
  secondaryCta: { label: "Email me" },
  // Icon names map to Phosphor icons in sections/hero.tsx.
  socials: [
    { name: "GitHub", href: "https://github.com", icon: "github" },
    { name: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
    { name: "X", href: "https://x.com", icon: "x" },
    { name: "Email", href: "mailto:hola@linaortega.dev", icon: "mail" },
  ],

} as const;

// `icon` is a Simple Icons slug (simpleicons.org).
export const stack = {
  title: "Tools I reach for",
  items: [
    { name: "TypeScript", icon: "typescript" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextdotjs" },
    { name: "Node.js", icon: "nodedotjs" },
    { name: "Go", icon: "go" },
    { name: "Python", icon: "python" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "SQLite", icon: "sqlite" },
    { name: "Redis", icon: "redis" },
    { name: "Docker", icon: "docker" },
    { name: "Tailwind CSS", icon: "tailwindcss" },
    { name: "Vercel", icon: "vercel" },
    { name: "Figma", icon: "figma" },
  ],
};

export const experience = {
  eyebrow: "02 / The journey",
  title: "A little background",
  items: [
    {
      company: "Norte Labs",
      role: "Software engineer",
      period: "Mar 2024 to now",
      location: "Remote · Valencia",
      // Letter tile shown in place of a logo.
      mark: "N",
      markColor: "#2f6f5e",
      tech: [
        { name: "TypeScript", icon: "typescript" },
        { name: "Next.js", icon: "nextdotjs" },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "Redis", icon: "redis" },
      ],
      details: [
        "Rebuilt the billing dashboard used by 3,100 teams. Median load time went from 4.2s to 0.9s.",
        "Moved background jobs from cron to a Postgres backed queue, with retries and a replay screen for support.",
        "Run the weekly frontend review and wrote the team's accessibility checklist.",
      ],
    },
    {
      company: "HackUPC 2025",
      role: "First place, developer tools track",
      period: "Oct 2025",
      location: "Barcelona",
      mark: "H",
      markColor: "#b4532a",
      tech: [
        { name: "Python", icon: "python" },
        { name: "SQLite", icon: "sqlite" },
        { name: "React", icon: "react" },
      ],
      details: [
        "Built the first version of Lantern in 36 hours with two friends: semantic search over a folder of markdown notes.",
        "Demoed it running fully offline on a 2019 laptop, which is what won the judges over.",
      ],
    },
  ],
};

// `cover` picks the mockup drawn in components/project-covers.tsx.
export const projects = {
  eyebrow: "01 / Selected work",
  title: "Built to be used",
  featuredLabel: "In focus",
  actionLabel: "Talk about this project",
  items: [
    {
      title: "Lantern",
      category: "Developer tools",
      year: "2026",
      note: "Private by design. No cloud required.",
      description: "Offline semantic search for your notes. Point it at a folder of markdown and ask questions in plain words.",
      tech: [
        { name: "Python", icon: "python" },
        { name: "SQLite", icon: "sqlite" },
        { name: "Ollama", icon: "ollama" },
      ],
      website: "mailto:hola@linaortega.dev?subject=Tell%20me%20about%20Lantern",
      repo: null as string | null,
      cover: "search",
      tint: "#e9efe9",
    },
    {
      title: "Tally",
      category: "Everyday utilities",
      year: "2025",
      note: "Less arithmetic. More time together.",
      description: "Split trip expenses with friends, even with no signal. Settles up in the fewest possible payments.",
      tech: [
        { name: "React", icon: "react" },
        { name: "Expo", icon: "expo" },
        { name: "SQLite", icon: "sqlite" },
      ],
      website: "mailto:hola@linaortega.dev?subject=Tell%20me%20about%20Tally",
      repo: null as string | null,
      cover: "balances",
      tint: "#f3ece4",
    },
    {
      title: "Pulse",
      category: "Infrastructure",
      year: "2025",
      note: "Small enough to understand at 3am.",
      description: "Uptime checks and a public status page for small teams. One binary, one Postgres, no surprise bills.",
      tech: [
        { name: "Go", icon: "go" },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "Docker", icon: "docker" },
      ],
      website: "mailto:hola@linaortega.dev?subject=Tell%20me%20about%20Pulse",
      repo: null as string | null,
      cover: "uptime",
      tint: "#e8edf3",
    },
    {
      title: "Driftwood",
      category: "Publishing",
      year: "2024",
      note: "Your words stay in your repository.",
      description: "A git based CMS for static sites. Edit markdown in the browser, it opens a pull request for you.",
      tech: [
        { name: "Next.js", icon: "nextdotjs" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Vercel", icon: "vercel" },
      ],
      website: "mailto:hola@linaortega.dev?subject=Tell%20me%20about%20Driftwood",
      repo: null as string | null,
      cover: "editor",
      tint: "#efeae2",
    },
  ],
  moreCta: { label: "See everything on GitHub", href: "https://github.com" },
} as const;

export const activity = {
  title: "GitHub activity",
  note: "Sample activity · replace with your GitHub data",
  // The heatmap is drawn from a fixed seed so it looks real without an API call.
  // Swap in your own data by replacing `generateActivity` in sections/activity.tsx.
  endDate: "2026-10-24",
  seed: 7,
  label: "contributions in the last year",
};

export const quote = {
  text: "The best part of shipping something small is seeing it become part of someone else’s day.",
  author: "A note to myself",
  contact: {
    title: "Open to freelance work",
    headline: "Something on your mind?",
    text: "An idea, a tricky problem, or a small thing worth making. I’d love to hear about it.",
    reply: "Usually back in your inbox within a day.",
    cta: { label: "Say hola", href: "mailto:hola@linaortega.dev" },
  },
};

export const footer = {
  note: "Made with care in Valencia",
  socials: [
    { name: "GitHub", href: "https://github.com", icon: "github" },
    { name: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
    { name: "X", href: "https://x.com", icon: "x" },
  ],
} as const;
