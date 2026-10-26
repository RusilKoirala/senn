import type { StaticImageData } from "next/image";
import developerPortfolio from "./developer-portfolio.jpg";
import modernSaas from "./modern-saas.jpg";
import minimalPortfolio from "./minimal-portfolio.jpg";
import designConference from "./design-conference.jpg";

// Screenshots of live templates, by slug. Templates without one show as "soon".
export const previews: Record<string, StaticImageData> = {
  "modern-saas": modernSaas,
  "developer-portfolio": developerPortfolio,
  "minimal-portfolio": minimalPortfolio,
  "design-conference": designConference,
};
