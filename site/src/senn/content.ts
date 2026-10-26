// Copy and links for senn's own site. Template metadata lives in src/templates/catalog.ts.

export const repo = "https://github.com/rusilkoirala/senn";

export const links = {
  github: repo,
  contribute: `${repo}/issues`,
  templateCode: (slug: string) => `${repo}/tree/main/site/src/templates/${slug}`,
};

export const addCommand = (slug: string) => `npx senn@latest add ${slug}`;
// Downloads the template's agent skill into .claude/skills/senn-<slug>/SKILL.md.
export const skillCommand = (slug: string) => `npx senn@latest skill ${slug}`;

export const openSource = {
  title: "Open source",
  body: "Free landing page templates. MIT licensed.",
  actions: [
    { label: "Star on GitHub", href: repo, primary: true },
    { label: "Contribute", href: `${repo}/issues` },
  ],
};

export const footer = "© 2026 Senn · MIT License";
