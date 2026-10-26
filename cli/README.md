# senn-ui

Add [Senn](https://github.com/rusilkoirala/senn)'s open source landing page templates to your Next.js project.

```bash
npx senn-ui@latest add modern-saas
```

This copies the template into `src/templates/modern-saas` (sections, copy, theme and images), installs the packages it needs, and creates `src/lib/utils.ts` if you don't have one yet. Then render it on any route:

```tsx
import Template from "@/templates/modern-saas/page";

export default function Home() {
  return <Template />;
}
```

## Available templates

| Template | Install |
| --- | --- |
| Cove · Modern SaaS | `npx senn-ui@latest add modern-saas` |
| Summit · Developer portfolio | `npx senn-ui@latest add developer-portfolio` |
| Margin · Minimal portfolio | `npx senn-ui@latest add minimal-portfolio` |

## Commands

| Command | What it does |
| --- | --- |
| `npx senn-ui@latest add <template>` | Add a template to your project |
| `npx senn-ui@latest skill <template>` | Add an agent skill to `.claude/skills/` that turns the template into your own product's page |
| `npx senn-ui@latest list` | List templates |

## Options

| Option | |
| --- | --- |
| `--dir <path>` | Put the template somewhere else |
| `--force`, `-f` | Overwrite without asking |
| `--no-install` | Skip installing packages |

## Requirements

Next.js 15 or newer, React 19, Tailwind CSS v4, and the `@/` import alias in `tsconfig.json`. Works with npm, pnpm, yarn and bun.

## License

MIT

## Verify a local release

From the repository, run `pnpm --dir site check`. This regenerates the registry, checks CLI installs into both root and `src` projects, checks lint, and builds the website.

The public CLI reads the registry and source files from the repository’s `main` branch. New or changed templates become publicly installable after those files are committed and pushed there. Deploy the website from the same revision so its gallery and setup instructions match the registry.
