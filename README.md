# Henry Hung — personal website

Source for [henryhung.dev](https://henryhung.dev), Henry Hung's product-management portfolio and résumé.

The site presents four product case studies, with an emphasis on how customer evidence becomes a product decision, a working system, and a measurable outcome. It is built as a static Astro site and deployed through Cloudflare Pages from the `main` branch of this repository.

## What is live

- `/` — introduction, career proof points, and an interactive portfolio explorer
- `/resume` — web résumé with experience before education, a desktop scroll-progress timeline, and a downloadable PDF
- `/work/[slug]` — one long-form case study for each project in `src/content/projects/`
- `/henry-hung-resume.pdf` — downloadable résumé PDF

Current projects:

1. AI-native customer service agent
2. Insurance agent co-pilot
3. Requirements extraction agent
4. HBS Section Website

The first three describe anonymized client work. Their interfaces are sanitized or recreated; no client names, logos, proprietary data, or original production screens appear on the site. The Section Website links to a public demo that uses fictional data and the password `demo`.

## Current design direction

The visual system is an **editorial product narrative**, evolved from the original Broadsheet concept:

- a light-blue page and panel palette, with deep navy type and accents;
- a large system-sans hero headline for clarity, paired with Bodoni Moda display headings, Newsreader body copy, and IBM Plex Mono metadata;
- square corners, strong rules, and flat color instead of shadows, gradients, or decorative card treatments;
- product evidence presented as **Human signal → Product move → Result**;
- restrained interaction that improves navigation without obscuring content.

The homepage portfolio uses an accessible tabbed explorer. Route imports are the source of truth for what ships.

See [portfolio-design-spec.md](./portfolio-design-spec.md) for the detailed design, interaction, responsive, and accessibility decisions.

## Technology

- [Astro](https://astro.build/) 7, using static output
- Astro content collections with Zod validation
- Vanilla JavaScript for tabs, mobile navigation, and timeline progress
- Component-scoped CSS plus shared tokens in `src/styles/global.css`
- Self-hosted fonts through `@fontsource`
- Cloudflare Pages for hosting and custom-domain delivery

There is intentionally no client framework and no animation or UI dependency.

## Local development

Requirements: Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

The default local URL is `http://localhost:4321`. Repository-specific contributor guidance lives in [AGENTS.md](./AGENTS.md).

Useful commands:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate the production site in `dist/` |
| `npm run preview` | Preview the generated site locally |
| `npm run astro -- --help` | Show Astro CLI help |

Before pushing a content or layout change, run at least `npm run build` and check both desktop and mobile layouts.

## Repository map

```text
public/
  images/                         Sanitized product screens and portrait
  favicon.svg                     Navy HH favicon
  henry-hung-resume.pdf           Public downloadable résumé
src/
  components/                     Reusable Astro UI and interaction components
  content/projects/               Canonical project and case-study copy
  layouts/BaseLayout.astro        Shared document shell and metadata
  pages/index.astro               Homepage composition
  pages/resume.astro              Web résumé content
  pages/work/[slug].astro         Static case-study route
  styles/global.css               Global tokens and base styles
  content.config.ts               Project-content schema
portfolio-design-spec.md          Current visual and interaction specification
```

Generated folders such as `dist/` and `.astro/` are build artifacts, not authoring sources.

## Updating content

### Project and case-study copy

Each Markdown file in `src/content/projects/` drives three surfaces from one source:

1. the homepage project explorer;
2. the corresponding `/work/[slug]` case study;
3. project ordering and next-project navigation.

The schema is defined in `src/content.config.ts`. Common fields include:

- `order`, `title`, `descriptor`
- `problem` and `built` for homepage summaries
- `metric` and `metricCaption`
- `caseStudyProblem`, `caseStudyBuilt`, `standfirst`, `decisions`, and `outcome`
- `screenshot` and `screenshotAlt`
- `tag: "Client anonymized"` to enable confidentiality labels
- `demoUrl` and `demoNote` for public demos

Keep quantified claims consistent across the Markdown files, `src/pages/resume.astro`, and the public PDF. Use “percentage points” for absolute changes in a rate and “percent” for relative changes.

### Résumé

The web résumé is authored directly in `src/pages/resume.astro`. The downloadable PDF at `public/henry-hung-resume.pdf` is a separate asset and must be updated independently when résumé content changes.

### Images

Public images live in `public/images/` and are referenced by root-relative paths such as `/images/assistant-mockup.webp`. Client-work screens must stay sanitized and generic. Preserve meaningful `screenshotAlt` text in the associated project Markdown even though the visual wrapper prevents duplicate alternative text.

## Accessibility and fallbacks

- The project explorer uses native tab/tabpanel semantics, arrow-key navigation, roving focus, and a polite live region.
- With JavaScript disabled, all portfolio panels are shown in sequence rather than hidden behind inactive tabs.
- Motion is limited to short state transitions and image scale; reduced-motion preferences disable those transitions.
- The mobile menu is a real button with `aria-expanded`, Escape-key support, and 44px touch targets.
- The résumé timeline is decorative (`aria-hidden`) and hidden below 1024px; résumé content never depends on it.
- Visible focus styles, semantic headings, real links/buttons, and descriptive labels are required throughout.

## Deployment

Cloudflare Pages is connected to this GitHub repository and the `henryhung.dev` custom domain. A push to the production branch triggers a new build and deployment.

Recommended Cloudflare settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22.12.0` or newer |

Deployment checklist:

1. Confirm `git status` contains only intended changes.
2. Run `npm run build`.
3. Inspect `/`, `/resume`, and every `/work/*` page on desktop and mobile.
4. Verify external links and the Section Website demo note/password.
5. Commit and push to `main`.
6. Confirm the Cloudflare deployment succeeds and spot-check [henryhung.dev](https://henryhung.dev).

## Editorial guardrails

- Keep client identities and identifying details out of code, copy, filenames, image metadata, and alt text.
- Distinguish prototypes, projections, and measured production outcomes precisely.
- Explain product judgment and tradeoffs rather than presenting a feature inventory.
- Prefer concrete numbers with their testing context.
- Keep the voice direct and specific; avoid generic portfolio language and unsupported superlatives.
