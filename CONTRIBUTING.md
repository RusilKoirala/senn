# Contributing to Senn

Thanks for helping. Senn is a small collection of finished landing pages, so the bar is quality over quantity. This guide covers how to run the project, how templates are structured, and how to send a change.

## Ways to help

- **Report a bug:** something broken, misaligned, inaccessible or slow. Use the bug report issue form.
- **Improve a template:** fix a layout on some screen size, sharpen an animation, improve accessibility or performance.
- **Suggest a template:** open a template request issue. Please don't start a whole new template without discussing it in an issue first.
- **Improve the site:** the gallery, the template pages, the docs.

## Run it locally

You need Node.js 20 or newer and [pnpm](https://pnpm.io).

```bash
cd site
pnpm install
pnpm dev
```

- Gallery: http://localhost:3000
- A template on its own: http://localhost:3000/t/modern-saas
- A template's page and live viewer: http://localhost:3000/templates/modern-saas

## Project structure

```
site/
  src/
    app/                    routes
    senn/                   the Senn site itself (gallery, template pages, viewer)
      previews/             template screenshots shown in the gallery
    templates/
      catalog.ts            template metadata (name, status, tags, packages)
      index.ts              maps each slug to its page
      <template>/           one self contained template
    components/ui/          shadcn/ui primitives
    lib/utils.ts            cn() helper
```

## How a template is built

Every template is one folder that can be copied into another project as is:

```
src/templates/<template>/
  README.md        design direction and notes
  content.ts       every word, link, number and image (people edit this first)
  theme.css        colors, fonts and motion as CSS variables, scoped to one class
  page.tsx         loads fonts and composes the sections
  sections/        one file per section
  components/      React Bits components and template specific pieces
  assets/          the template's images, imported in content.ts
```

Rules:

- **Self contained.** Import only from `@/components/ui`, `@/lib/utils` and the template's own folder. No imports between templates, and no images in `public/`.
- **Content lives in `content.ts`.** No hard coded copy inside sections.
- **Styles are scoped.** Template tokens live under the template's own class in `theme.css`, so templates never affect each other or the site.
- **Real copy.** No lorem ipsum, no placeholder brands, no made up round numbers.
- **Responsive.** Check 375, 768, 1440×768 and 1440×900. No horizontal scroll, no single word alone on a heading's last line.
- **Accessible.** Semantic HTML, alt text, visible focus states, `prefers-reduced-motion` respected.
- **Light on weight.** Images under about 2560px wide and compressed. Heavy WebGL effects should fail gracefully.
- **React Bits components** are added through the shadcn registry (`pnpm dlx shadcn@latest add @react-bits/<Name>-TS-TW`) and moved into the template's `components/` folder unchanged.

When a template is ready, register it in `src/templates/index.ts` and `src/templates/catalog.ts`, then add a 16:10 screenshot to `src/senn/previews/` and map it in `src/senn/previews/index.ts`.

## Before you open a pull request

```bash
cd site
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

- Keep pull requests small and focused on one change.
- Add before and after screenshots (desktop and mobile) for anything visual.
- Say how you tested it.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
