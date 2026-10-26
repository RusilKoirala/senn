// Template metadata, with no components imported, so the gallery and the viewer can
// read it without bundling every template page.

export type TemplateMeta = {
  slug: string;
  name: string;
  status: "live" | "soon";
  description: string;
  codename?: string;
  kind?: "product" | "portfolio" | "event";
  previewNoindex?: boolean;
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
    slug: "product-design",
    name: "Product design",
    codename: "Contour",
    previewNoindex: true,
    status: "live",
    description:
      "A physical product page in cobalt and cool white. Large object photography, measured drawings and a working finish selector with share link and specification download.",
    tags: ["Light", "Product photography", "Finish selector", "React Bits"],
    sections: 10,
    dependencies: ["gsap", "@gsap/react", "motion", "@phosphor-icons/react"],
    brandClass: "contour",
    agentNotes: [
      "Contour and the C01 desk light are fictional. Replace every specification, dimension, finish, contact and legal detail with verified information, then remove the sample labels. Add real pricing and a purchase destination before selling anything.",
      "Finishes live in `finishes` in content.ts. Each has an id, name, code, swatch colour, note and photograph. The selector, the share link (?finish=<id>) and the downloaded specification all read from this list, so add or remove finishes there.",
      "The measured drawing in sections/specs.tsx reads `specs.drawing`. Keep the figures and `specs.rows` in sync, and redraw the SVG paths if the product's shape changes.",
      "Photographs live in assets/ (cobalt.jpg, graphite.jpg, room.jpg). Replace them with real product photography of every finish, shot on the same backdrop and framing so the finish crossfade lines up. Update alt text in content.ts. Sources are documented in assets/IMAGE_SOURCES.md.",
      "Preserve REACT_BITS_LICENSE and THIRD_PARTY_NOTICES.md. React Bits components retain their upstream MIT + Commons Clause terms; Senn's MIT license does not relicense them.",
      "The demo is noindex in Senn. Add Product or Offer structured data in the host app only once the product, price and availability are real.",
    ],
  },
  {
    slug: "design-conference",
    name: "Design conference",
    codename: "Assembly",
    kind: "event",
    previewNoindex: true,
    status: "live",
    description:
      "A bold event poster in vermilion, paper and black ink. An interactive two track programme, speaker roster and personal agenda with calendar export.",
    tags: ["Event", "Poster typography", "React Bits", "Agenda builder"],
    sections: 9,
    dependencies: ["gsap", "@gsap/react", "motion", "@phosphor-icons/react"],
    brandClass: "assembly",
    agentNotes: [
      "Assembly, its speakers and Harbor Hall are fictional. Replace all event, venue and speaker details with verified information, then remove the sample labels. Supply a real contact address and ticket provider before announcing a real event.",
      "Sessions use explicit ISO timestamps with UTC offsets. Update event.timeZone, every session start/end, programme breaks, all date labels, calendarDomain, calendarFile and storageKey together. The planner rejects overlapping sessions and exports only the visitor's selected sessions as a timezone correct .ics file.",
      "Programme filters include shared sessions in both tracks. Keep speaker IDs and session IDs connected. Biographies expand in place; their links return to the correct programme row.",
      "The two generated venue images live in assets/hall.jpg and assets/venue.jpg. Replace them with real event photography, updating alt text and object positions in content.ts. The original generation prompts are documented in assets/IMAGE_SOURCES.md.",
      "Preserve REACT_BITS_LICENSE and THIRD_PARTY_NOTICES.md. React Bits components retain their upstream MIT + Commons Clause terms; Senn's MIT license does not relicense them. The project owner confirmed redistribution permission for this template.",
      "The demo is noindex in Senn. Add real metadata and optional Event structured data in the host app only after the date, location, organiser and booking details are verified. Downloading the agenda does not reserve admission.",
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
