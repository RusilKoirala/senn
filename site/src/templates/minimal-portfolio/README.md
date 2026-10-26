# Minimal portfolio (Margin)

A compact developer portfolio on graph paper. A landscape banner, overlapping avatar, live timezone comparison, a featured project, a compact work index, experience, activity, and a green contact panel in a 720px column.

Preview: `/t/minimal-portfolio`. Gallery viewer: `/templates/minimal-portfolio`.

## Content and purpose

Lina Ortega is a fictional full stack engineer in Valencia. The projects, employers, outcomes, contact details, and activity are sample content. The primary action is to book an introductory call; email is the fallback. The audience is a founder or engineering lead checking work before getting in touch.

Page order: header → hero → tech stack → projects → experience → activity → contact → footer. This is a compact portfolio rather than a sales landing page: the work and experience answer questions about skills and fit, without adding a pricing section, FAQ, or a separate sales tagline.

## Sections

| Section | Surface | Motion | Details |
|---|---|---|---|
| Header | Frosted graph paper | ShinyText | Section tracking, theme toggle, mobile dock |
| Hero | Landscape banner | SplitText, RotatingText | Initials avatar, timezones, email copy, availability |
| Stack | Graph paper | AnimatedContent | Technology tiles with keyboard tooltips |
| Experience | Graph paper | AnimatedContent | Employer marks, technology chips, outcomes |
| Projects | Featured card and work index | SpotlightCard | One large project, three numbered entries with cropped mockup covers |
| Activity | Graph paper | CountUp | Seeded sample data, horizontally scrollable on phones |
| Contact | Green ink panel | ShinyText | Large email link, availability, always visible personal note below |
| Footer | Graph paper | ShinyText | Name and social links |

## Customize

1. Start in `content.ts`. Replace the fictional name, contact information, calendar, socials, companies, and projects. Default social destinations are examples and must be replaced before using this as your own portfolio.
2. Replace `assets/banner.jpg` with your own photograph and adjust `hero.banner.alt` and `hero.banner.position` for its subject. The current banner is supplied with this template.
3. Import a portrait into `content.ts` and set `person.avatar`; leave it `null` for initials.
4. Project covers are React components in `components/project-covers.tsx`. Edit their sample UI text or replace them with screenshots. Set each project's links to your own destinations.
5. Activity is illustrative, clearly labeled sample data. Replace `generateActivity` in `sections/activity.tsx` with your own data, then remove the sample note. The template needs no GitHub API key.
6. Colors, graph cell size, width, and easing live in `theme.css`. Theme choice persists in the template's own `margin-theme` storage key.

The folder is self contained. Install dependencies listed in the registry, retain `LICENSE`, and supply the usual Next.js app layout, metadata, favicon, and Tailwind setup in the host project.

## Visual direction

Geist for interface text and Geist Mono for data. Warm ivory or charcoal graph paper, green ink, a notebook gutter rule, a rounded square monogram, larger personal typography, numbered project entries, and restrained motion. All styles are scoped to `.margin`.

Intentional deviations from the standard landing page rules: retain graph lines, a left aligned personal heading, the compact sticky header and mobile dock, a featured project with a compact work index, and the small personal quote. Project mockups remain static after their entrance; there are no automatic story loops. These choices preserve the requested portfolio composition.

## Validation

Run `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm registry`, and `pnpm build` from `site/`. Inspect at desktop and phone sizes in both themes. Check section links, email copying, theme persistence, activity scrolling, and reduced motion.
