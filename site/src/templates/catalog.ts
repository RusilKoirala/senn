// Template metadata, with no components imported, so the gallery and the viewer can
// read it without bundling every template page.

export type TemplateMeta = {
  slug: string;
  name: string;
  status: "live" | "soon";
  description: string;
  codename?: string;
  tags?: string[];
  sections?: number;
  dependencies?: string[];
};

export const catalog: TemplateMeta[] = [
  {
    slug: "modern-saas",
    name: "Modern SaaS",
    codename: "Cove",
    status: "live",
    description:
      "A calm, photographic page for a software product. Editorial serif headlines over landscape photography, a scroll drawn onboarding trail and a sticky benefits story.",
    tags: ["Light", "Photography", "Editorial serif", "Scroll stories"],
    sections: 9,
    dependencies: ["gsap", "@gsap/react", "motion", "@phosphor-icons/react", "clsx", "tailwind-merge"],
  },
  {
    slug: "creative-agency",
    name: "Creative agency portfolio",
    status: "soon",
    description: "Expressive, editorial, oversized type.",
  },
  {
    slug: "ai-startup",
    name: "AI startup",
    status: "soon",
    description: "Futuristic, glowing, alive.",
  },
  {
    slug: "product-launch",
    name: "Minimal product launch",
    status: "soon",
    description: "Quiet, focused, generous whitespace.",
  },
  {
    slug: "developer-portfolio",
    name: "Developer portfolio",
    status: "soon",
    description: "Loud, kinetic, playful.",
  },
];

export const liveTemplates = catalog.filter((t) => t.status === "live");

export function getMeta(slug: string) {
  return catalog.find((t) => t.slug === slug);
}
