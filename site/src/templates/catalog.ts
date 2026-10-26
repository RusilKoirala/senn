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
  // For the "make it yours" agent prompt: the scoping class and CSS variable prefix
  // the template uses, and anything specific an agent must know about it.
  brandClass?: string;
  agentNotes?: string[];
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
    brandClass: "cove",
    agentNotes: [
      "The product mockups (the inbox in the hero and the four looping benefit visuals) read their text from `inbox` and `visuals` in content.ts. Rewrite them so they show my product doing its job, with realistic specific details.",
      "`howItWorks.trail` holds points traced along the path in the valley photo. If you replace that photo, retrace the points (x% and y% of the image) so the drawn line still follows a path, road or river in the new photo.",
      "Headlines are arrays of lines in content.ts (one entry per line). Keep each line short enough to stay on one line at desktop width.",
      "Text sits on the empty sky of each photo. When choosing replacement photos, keep a calm, empty area at the top.",
    ],
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
