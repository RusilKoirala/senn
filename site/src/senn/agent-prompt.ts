import type { TemplateMeta } from "@/templates/catalog";

// The instructions a visitor pastes into their coding agent (Claude Code, Cursor,
// Codex…) to turn a template into their own product's page. Built from the catalog
// so every template gets a tailored version.

function steps(t: TemplateMeta) {
  const dir = `src/templates/${t.slug}`;
  const brand = t.brandClass ?? "brand";
  const notes = (t.agentNotes ?? []).map((n) => `- ${n}`).join("\n");

  return `The template lives in \`${dir}/\`:
- \`content.ts\`: every word, number, link and image, plus the data the product mockups show. Most of the work happens here.
- \`theme.css\`: colors and motion as CSS variables on the \`.${brand}\` class.
- \`page.tsx\`: loads the fonts and puts the sections in order.
- \`assets/\`: the template's photos, imported in content.ts.
- \`sections/\` and \`components/\`: layout and animation. Leave these alone unless I ask.

Steps:
1. Before editing anything, ask me what you need to know in one short list: product name, what it does in one sentence, who it is for, the one action I want visitors to take (sign up, book a demo, join a waitlist…), three or four benefits, real proof (numbers, customer quotes, logos), common questions with answers, brand colors and font preference. Never invent statistics or testimonials. If I don't have something yet, leave a clear TODO in content.ts.
2. Rewrite \`content.ts\` for my product. Keep the same structure and field names. Write specific, plain copy: concrete outcomes and real numbers, no filler, no buzzwords, sentence case headings.
3. Rebrand: change the wordmark in content.ts, rename the \`.${brand}\` class and the \`--${brand}-*\` variables to my brand, and rename the page component.
4. Update the colors in \`theme.css\` to my brand. Check that text stays readable on every photo, in both light and dark areas.
5. Replace the photos in \`assets/\` with mine, or ask me for them. Keep the imports in content.ts in sync.
6. If the page isn't rendered yet, render it on my home route: import the default export of \`${dir}/page.tsx\` in \`app/page.tsx\`.
7. Keep every section, layout and animation. Don't add dependencies.
8. Run the dev server and check the page at desktop and phone widths: no text overflowing, no single word alone on a heading's last line, every link and button pointing somewhere real.

Notes for this template:
${notes}`;
}

export function agentPrompt(t: TemplateMeta) {
  return `I'm using the "${t.name}" landing page template from Senn (open source, MIT). Turn it into the landing page for my own product.

${steps(t)}`;
}

export function agentSkill(t: TemplateMeta) {
  return `---
name: senn-${t.slug}
description: Turn the Senn "${t.name}" landing page template into the landing page for the user's own product. Use when the user asks to customize, rebrand or adapt this template, or to make it theirs.
---

# Make the Senn "${t.name}" template yours

${steps(t)}
`;
}

export const skillPath = (t: TemplateMeta) => `.claude/skills/senn-${t.slug}/SKILL.md`;
