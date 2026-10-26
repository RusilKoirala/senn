import type { StaticImageData } from "next/image";
import modernSaas from "./modern-saas.jpg";

// Screenshots of live templates, by slug. Templates without one show as "soon".
export const previews: Record<string, StaticImageData> = {
  "modern-saas": modernSaas,
};
