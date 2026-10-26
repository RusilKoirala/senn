// Site wide search and sharing details for senn's own pages.
import type { TemplateMeta } from "@/templates/catalog";
import { repo } from "./content";

export const site = {
  name: "Senn",
  url: "https://sennui.tech",
  title: "Senn: free landing page templates for Next.js",
  description:
    "Free, open source landing page templates for Next.js, Tailwind CSS and shadcn/ui. Copy a complete, animated page into your project with one command, then make it yours with your coding agent.",
  keywords: [
    "landing page templates",
    "Next.js templates",
    "free landing page template",
    "open source templates",
    "Tailwind CSS templates",
    "shadcn/ui templates",
    "React Bits",
    "SaaS landing page",
    "portfolio template",
  ],
};

export const templateTitle = (t: TemplateMeta) => `${t.name} landing page template`;

export const templateUrl = (t: TemplateMeta) => `${site.url}/templates/${t.slug}`;

// JSON-LD for the homepage: the site itself and the list of live templates.
export function homeJsonLd(templates: TemplateMeta[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": `${site.url}/#org` },
      },
      { "@type": "Organization", "@id": `${site.url}/#org`, name: site.name, url: site.url, logo: `${site.url}/icon.svg`, sameAs: [repo] },
      {
        "@type": "ItemList",
        name: "Senn landing page templates",
        itemListElement: templates.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: templateUrl(t), name: templateTitle(t) })),
      },
    ],
  };
}

// JSON-LD for a template page: the source code it ships and where it sits on the site.
export function templateJsonLd(t: TemplateMeta, image?: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        name: `${t.codename ? `${t.codename}: ` : ""}${templateTitle(t)}`,
        description: t.description,
        url: templateUrl(t),
        codeRepository: `${repo}/tree/main/site/src/templates/${t.slug}`,
        programmingLanguage: ["TypeScript", "React"],
        runtimePlatform: "Next.js",
        license: "https://opensource.org/licenses/MIT",
        isAccessibleForFree: true,
        keywords: t.tags?.join(", "),
        ...(image ? { image: `${site.url}${image}` } : {}),
        author: { "@id": `${site.url}/#org` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Templates", item: site.url },
          { "@type": "ListItem", position: 2, name: t.name, item: templateUrl(t) },
        ],
      },
    ],
  };
}

// Inlines JSON-LD safely: "<" is escaped so the data can never close the script tag.
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
