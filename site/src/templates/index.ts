import type { ComponentType } from "react";
import DeveloperPortfolio from "./developer-portfolio/page";
import MinimalPortfolio from "./minimal-portfolio/page";
import ModernSaas from "./modern-saas/page";

export type SennTemplate = {
  slug: string;
  name: string;
  description: string;
  Page: ComponentType;
};

// Templates are added here one at a time as each is finished.
export const templates: SennTemplate[] = [
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
