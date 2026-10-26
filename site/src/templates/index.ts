import type { ComponentType } from "react";
import DesignConference from "./design-conference/page";
import DeveloperPortfolio from "./developer-portfolio/page";
import MinimalPortfolio from "./minimal-portfolio/page";
import ModernSaas from "./modern-saas/page";

export type SennTemplate = {
  slug: string;
  name: string;
  description: string;
  Page: ComponentType;
  noindex?: boolean;
};

// Templates are added here one at a time as each is finished.
export const templates: SennTemplate[] = [
  { slug: "design-conference", name: "Design conference", description: "Assembly: a bold poster inspired design conference with a working programme and personal agenda.", Page: DesignConference, noindex: true },
  {
    slug: "modern-saas",
    name: "Modern SaaS",
    description: "Cove: a calm, photographic SaaS page with editorial serif headlines.",
    Page: ModernSaas,
  },
  {
    slug: "developer-portfolio",
    name: "Developer portfolio",
    description: "Summit: a dusk toned portfolio for an independent engineer, with projects shown working on photographs.",
    Page: DeveloperPortfolio,
  },
  {
    slug: "minimal-portfolio",
    name: "Minimal portfolio",
    description: "Margin: a quiet one column portfolio on graph paper, with a banner, projects and GitHub activity.",
    Page: MinimalPortfolio,
  },
];

export function getTemplate(slug: string) {
  return templates.find((t) => t.slug === slug);
}
