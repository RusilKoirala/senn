// Template metadata, with no components imported, so the gallery and the viewer can
// read it without bundling every template page.

export type TemplateMeta = {
  slug: string;
  name: string;
  status: "live" | "soon";
  description: string;
  codename?: string;
  kind?: "product" | "portfolio";
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
    dependencies: ["gsap", "@gsap/react", "motion", "@phosphor-icons/react"],
    brandClass: "cove",
    agentNotes: [
      "The product mockups (the inbox in the hero and the four looping benefit visuals) read their text from `inbox` and `visuals` in content.ts. Rewrite them so they show my product doing its job, with realistic specific details.",
      "`howItWorks.trail` holds points traced along the path in the valley photo. If you replace that photo, retrace the points (x% and y% of the image) so the drawn line still follows a path, road or river in the new photo.",
      "Headlines are arrays of lines in content.ts (one entry per line). Keep each line short enough to stay on one line at desktop width.",
      "Text sits on the empty sky of each photo. When choosing replacement photos, keep a calm, empty area at the top.",
    ],
  },
  {
    slug: "developer-portfolio",
    name: "Developer portfolio",
    codename: "Summit",
    kind: "portfolio",
    status: "live",
    description:
      "A dusk toned portfolio for an independent engineer. Bold sans headlines in a mountain sky, a pinned sideways gallery where each project runs live on a photograph.",
    tags: ["Dark", "Photography", "Bold sans", "Kinetic"],
    sections: 11,
    // FlowingMenu (vendored as published) draws its arrow with Hugeicons.
    dependencies: ["gsap", "@gsap/react", "motion", "@phosphor-icons/react", "@hugeicons/react", "@hugeicons/core-free-icons"],
    brandClass: "summit",
    agentNotes: [
      "Everything about the person (name, city, time zone, email, calendar link) lives in `person` in content.ts. The hero and footer clocks read `person.timeZone`.",
      "Each project in `work.projects` picks a looping mini UI with `visual` (events, booking or notes) whose text lives in `visuals`. Rewrite that text so the mini UIs show my projects doing their job, or build a new visual in components/work-visuals.tsx.",
      "Set a project's `tone` to \"light\" when its photo is pale, so its panels switch to frosted white with ink text.",
      "The hero and contact photos join a flat sky colour above them (`--summit-sky`, `--summit-moss-sky` in theme.css). If you replace those photos, sample the new sky colour and update the tokens.",
    ],
  },
  {
    slug: "minimal-portfolio",
    name: "Minimal portfolio",
    codename: "Margin",
    kind: "portfolio",
    status: "live",
    description:
      "A personal working notebook for an independent engineer. Warm graph paper, green ink, a featured project and a compact work index, in light and dark.",
    tags: ["Light and dark", "Graph paper", "Compact", "Developer"],
    sections: 8,
    dependencies: ["gsap", "@gsap/react", "motion", "@phosphor-icons/react"],
    brandClass: "margin",
    agentNotes: [
      "The fictional person, contact links, timezone, experience and projects live in content.ts. Replace all sample destinations with my real links. The calendar defaults to an email request; set person.calendar to my booking page if I have one.",
      "The banner is assets/banner.jpg. Adjust hero.banner.position and alt text when replacing it. Set person.avatar to an imported portrait, or leave it null for initials.",
      "Project covers are static coded mockups in components/project-covers.tsx. Replace their sample text or use my screenshots. Project mail links invite questions by default; set website and repo to real project destinations.",
      "The activity heatmap is seeded sample data, labeled as such. Replace generateActivity in sections/activity.tsx with my real GitHub data before removing the sample label.",
      "Retain the bundled LICENSE when copying or distributing this template. Technology icons are local SVGs in assets/tech.",
    ],
  },
];

export const liveTemplates = catalog.filter((t) => t.status === "live");

export function getMeta(slug: string) {
  return catalog.find((t) => t.slug === slug);
}
