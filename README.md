# Senn

[![CI](https://github.com/RusilKoirala/senn/actions/workflows/ci.yml/badge.svg)](https://github.com/RusilKoirala/senn/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/senn-ui)](https://www.npmjs.com/package/senn-ui)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/RusilKoirala/senn?style=flat)](https://github.com/RusilKoirala/senn/stargazers)

Beautiful landing pages. Zero design headaches. Completely free.

You've built the product, and now it needs a page. A blank file plus a coding agent usually gets you the same centered hero and grid of cards as everyone else. Paid templates cost money and come wired into someone else's setup. Senn gives you complete, designed landing pages for Next.js that you copy into your project with one command and own outright.

| Modern SaaS | Developer portfolio | Minimal portfolio |
| --- | --- | --- |
| ![Modern SaaS](site/src/senn/previews/modern-saas.jpg) | ![Developer portfolio](site/src/senn/previews/developer-portfolio.jpg) | ![Minimal portfolio](site/src/senn/previews/minimal-portfolio.jpg) |
| `npx senn-ui@latest add modern-saas` | `npx senn-ui@latest add developer-portfolio` | `npx senn-ui@latest add minimal-portfolio` |

Built with Tailwind CSS, shadcn/ui and React Bits. Every template is one self contained folder: sections, copy, theme and images.

## Use a template

In your Next.js project:

```bash
npx senn-ui@latest add modern-saas
```

It copies the template into `src/templates/modern-saas`, installs its packages, and tells you how to render it. Needs Next.js 15 or newer, React 19 and Tailwind CSS v4.

Then let your coding agent (Claude Code, Cursor, Codex…) turn it into your own product's page:

```bash
npx senn-ui@latest skill modern-saas
```

Other commands: `npx senn-ui@latest list`. See [cli/README.md](cli/README.md).

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
