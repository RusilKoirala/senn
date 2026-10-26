# senn

Add [Senn](https://github.com/rusilkoirala/senn)'s open source landing page templates to your Next.js project.

```bash
npx senn@latest add modern-saas
```

This copies the template into `src/templates/modern-saas` (sections, copy, theme and images), installs the packages it needs, and creates `src/lib/utils.ts` if you don't have one yet. Then render it on any route:

```tsx
import Template from "@/templates/modern-saas/page";

export default function Home() {
  return <Template />;
}
```

## Commands

| Command | What it does |
| --- | --- |
| `npx senn@latest add <template>` | Add a template to your project |
| `npx senn@latest skill <template>` | Add an agent skill to `.claude/skills/` that turns the template into your own product's page |
| `npx senn@latest list` | List templates |

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
