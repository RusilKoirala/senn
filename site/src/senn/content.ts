// Copy and links for senn's own site. Template metadata lives in src/templates/catalog.ts.

// TODO: set to the public repository URL before launch.
export const repo = "https://github.com";

export const links = {
  github: repo,
  contribute: `${repo}/issues`,
  templateCode: (slug: string) => `${repo}/tree/main/site/src/templates/${slug}`,
};

export const addCommand = (slug: string) => `npx senn@latest add ${slug}`;

export const openSource = {
  title: "Open source",
  body: "Free landing page templates. MIT licensed.",
  actions: [
    { label: "Star on GitHub", href: repo, primary: true },
    { label: "Contribute", href: `${repo}/issues` },
  ],
};

export const footer = "© 2026 Senn · MIT License";
