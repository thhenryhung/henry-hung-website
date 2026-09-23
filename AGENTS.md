# Repository guidance

This is the source for Henry Hung's portfolio at `henryhung.dev`. It is an Astro static site deployed through Cloudflare Pages.

## Development

Use Node.js 22.12 or newer. Install dependencies with `npm install` and verify production output with:

```sh
npm run build
```

When starting the dev server, use background mode:

```
npx astro dev --background
```

Manage the background server with `npx astro dev stop`, `npx astro dev status`, and `npx astro dev logs`.

Check both desktop and mobile layouts for any visual change. The main responsive breakpoints are 1024px, 768px, and 480px.

## Sources of truth

- `src/pages/` determines which components are live.
- `src/content/projects/*.md` is the canonical project and case-study content.
- `src/content.config.ts` defines the project schema.
- `src/styles/global.css` defines shared design tokens.
- `portfolio-design-spec.md` describes the current visual and interaction direction.
- `public/henry-hung-resume.pdf` is a separate public asset; it does not update automatically when `src/pages/resume.astro` changes.

Trace imports from `src/pages/` before modifying a component. The live homepage uses `PortfolioExplorer.astro`; earlier flip-book and theme-switching experiments are retained only in Git history. The current site has one light-blue theme.

## Content and privacy

Client work must remain anonymized. Do not add client names, logos, identifying colors, real customer data, original internal screenshots, or confidential technical details to code, copy, asset names, metadata, or alt text. Preserve the sanitized-screen labels on client project visuals.

Keep claims consistent across project Markdown, the web résumé, and the downloadable PDF. Distinguish prototype results, projections, and production outcomes. Use “percentage points” for an absolute change in a rate.

## Interaction guardrails

- Keep the site dependency-light: Astro, semantic HTML, scoped CSS, and small vanilla scripts are preferred.
- Preserve keyboard access, visible focus states, and reduced-motion behavior.
- The portfolio must remain readable without JavaScript; inactive panels expand into a static list in the no-JS fallback.
- Mobile behavior is intentional, not a scaled desktop view.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
