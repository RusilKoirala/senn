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

```bash
npx senn@latest add modern-saas
```

The CLI ships with v1. Until then, copy `site/src/templates/<template>` into your project's `src/templates/` and install the packages listed on the template's page. Needs Next.js 15 or newer, React 19 and Tailwind CSS v4.

Each template page also has a copyable prompt and skill file for your coding agent (Claude Code, Cursor, Codex…) that turns the template into the page for your own product.

## Run the site locally

```bash
cd site
pnpm install
pnpm dev
```

Open http://localhost:3000. Templates render on their own at `/t/<template>`.

## Contributing

Bug reports, fixes and template ideas are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE). Use the templates in personal and commercial work, no attribution needed.
