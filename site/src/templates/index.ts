import type { ComponentType } from "react";
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
];

export function getTemplate(slug: string) {
  return templates.find((t) => t.slug === slug);
}
