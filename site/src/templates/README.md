# Templates

Each template is a self-contained folder that the `npx senn-ui` CLI can copy into a user's project as is.

```
src/templates/<slug>/
  README.md        # design direction and notes
  content.ts       # ALL copy, links, images (what users edit first)
  theme.css        # template tokens: colors, radius, fonts (CSS variables)
  page.tsx         # composes the sections; default export
  sections/        # hero.tsx, benefits.tsx, how-it-works.tsx, proof.tsx, faq.tsx, cta.tsx, …
  components/      # template-only pieces (React Bits installs land in src/components and get moved here)
  assets/          # this template's images, imported in content.ts (never in public/)
```

Rules:
- Only import from `@/components/ui` (shadcn), `@/lib/utils`, and the template's own folder. No cross-template imports.
- Everything a template needs ships inside its folder, images included, so the CLI copies one folder and nothing else.
- Register the template in `src/templates/index.ts`. Live previews render at `/t/<slug>`.
