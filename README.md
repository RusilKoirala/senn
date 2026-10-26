# Senn

Beautiful landing pages. Zero design headaches. Completely free.

Senn is a small collection of complete, open source landing page templates for Next.js, built with Tailwind CSS, shadcn/ui and React Bits. Every template is one self contained folder: sections, copy, theme and images. Preview it, copy it into your project, make it yours.

## Templates

| Template | Status |
| --- | --- |
| Modern SaaS | Live |
| Creative agency portfolio | In progress |
| AI startup | In progress |
| Minimal product launch | In progress |
| Developer portfolio | In progress |

## Use a template

In your Next.js project:

```bash
npx senn@latest add modern-saas
```

It copies the template into `src/templates/modern-saas`, installs its packages, and tells you how to render it. Needs Next.js 15 or newer, React 19 and Tailwind CSS v4.

Then let your coding agent (Claude Code, Cursor, Codex…) turn it into your own product's page:

```bash
npx senn@latest skill modern-saas
```

Other commands: `npx senn@latest list`. See [cli/README.md](cli/README.md).

## Run the site locally

```bash
cd site
pnpm install
pnpm dev
```

Open http://localhost:3000. Templates render on their own at `/t/<template>`.

## Contributing

Bug reports, fixes and new templates are welcome. Anyone can submit a template; the collection is curated, so the ones that fit get added. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE). Use the templates in personal and commercial work, no attribution needed.
