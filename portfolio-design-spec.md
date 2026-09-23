# Henry Hung portfolio — current design and product specification

This document describes the site that currently ships. It supersedes the original light-paper Broadsheet handoff and the later flip-book, navy-theme, and runner-character experiments.

Last reconciled with the implementation: September 2026.

## 1. Product context

The primary audience is a hiring manager, recruiter, product leader, or collaborator who needs to understand three things quickly:

1. what Henry has built;
2. how he makes product decisions;
3. whether the outcomes are credible.

The site should feel authored and editorial, not like a generic portfolio template. Its organizing idea is:

> **People → decision → system → outcome**

On the homepage, that becomes the more concrete sequence **Human signal → Product move → Result**. Long-form case studies then make the tradeoffs and evidence visible.

This is not a marketing landing page. Avoid inflated claims, excessive animation, ornamental dashboards, and UI patterns that compete with the work itself.

## 2. Current information architecture

### Homepage (`/`)

1. Sticky masthead: wordmark, Portfolio, Resume, and “Let's talk” call to action
2. Hero: introduction, product thesis, three career-context bullets, primary actions, and portrait
3. Four proof points: products, interviews, team size, and projected users
4. Portfolio heading and positioning descriptor
5. Interactive project explorer with four projects
6. Contact footer

There is deliberately no separate Background section; the résumé owns that information.

### Résumé (`/resume`)

1. Name, current positioning, and PDF download
2. Experience before Education
3. Technical and Personal sections
4. Contact footer

A slim timeline rail appears on desktop. It fills with scroll progress and marks McKinsey, Harvard Business School, and the University of Pennsylvania. It is supporting navigation texture, not the content itself.

### Case study (`/work/[slug]`)

1. Back link and case-study number
2. Title and standfirst
3. Three headline metrics
4. The problem
5. What I built, including a sanitized product screen or conceptual visual
6. Key decisions using Chose / Over / Because
7. Outcome and reflection
8. Confidentiality note for client work
9. Previous context through “Back to portfolio” and a next-case-study link

Case studies use a centered reading column rather than the earlier sticky side rail.

## 3. Visual identity

### Direction

The current direction is **editorial product narrative**: structured like a well-designed report, but with the clarity and hierarchy of a modern product interface.

The system keeps the strongest parts of the original Broadsheet idea—rules, typography, measured prose, and typographic hierarchy—while using a more distinctive blue palette and a clearer sans-serif hero.

### Shape and depth

- Square corners by default
- No drop shadows
- No gradients
- No glass cards beyond the masthead's restrained translucent backdrop
- Flat panels separated by color and one-pixel rules
- Two-pixel rules only for major section openings
- Buttons are rectangular and compact, not pill-shaped

### Color tokens

The site currently has one light-blue theme. There is no active light/dark toggle.

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#E9EFF5` | Page background |
| `--panel` | `#D8E4EF` | Primary inset/project panel |
| `--panel-strong` | `#C9D9E8` | Screen wells and stronger inset areas |
| `--placeholder` | `#C5D4E2` | Neutral image placeholder |
| `--ink` | `#122036` | Headings and strongest rules |
| `--text` | `#26384D` | Body copy |
| `--text-soft` | `#41536A` | Supporting copy |
| `--text-muted` | `#5C6E83` | Descriptors and secondary labels |
| `--meta` | `#587087` | Mono metadata |
| `--rule` | `#C2D0DE` | Hairlines and separators |
| `--accent` | `#173F78` | Links, calls to action, metrics, active states |
| `--accent-hover` | `#0E2B55` | Link and button hover |
| `--diagram-line` | `#758DA6` | Diagram structure |
| `--diagram-faint` | `#B7C6D5` | Secondary diagram lines |

Do not introduce a second accent color casually. Product screenshots may contain their own generic interface colors, but the surrounding site chrome remains within this palette.

### Typography

| Role | Family | Use |
| --- | --- | --- |
| Primary hero | System sans (`-apple-system`, BlinkMacSystemFont, Segoe UI) | The main product thesis; optimized for readability and immediacy |
| Display | Bodoni Moda 600 | Intro line, page and section headings, metrics |
| Body | Newsreader 400/600 and italic | Long-form reading, descriptions, résumé copy |
| Meta | IBM Plex Mono 400 | Navigation, eyebrows, labels, controls, notes |

Fonts are self-hosted through `@fontsource`; do not replace them with remote Google Fonts.

Key live sizes:

- hero headline: `clamp(42px, 5vw, 68px)`, 1.08 line height;
- hero intro: 34px Bodoni;
- proof metrics: 40px Bodoni;
- portfolio project title: 40px desktop, 34px mobile;
- case-study title: 48px desktop, 34px mobile;
- résumé name: 48px desktop, 34px mobile;
- base body: 18px / 1.68;
- metadata: 11–12px uppercase with wide tracking.

Body measures should stay near 640–680px. Avoid long, full-width prose.

### Spacing and container

Spacing is tokenized on a four-pixel-derived scale in `src/styles/global.css`. Reuse `--space-1` through `--space-15`; do not add one-off values without a clear visual need.

- maximum container width: 1280px;
- desktop side gutter: 88px;
- mobile side gutter: 24px;
- major section spacing: 44–72px;
- minimum interactive target: 44px where practical.

## 4. Core components and behavior

### Masthead

- Sticky at the top with a subtle blurred paper background
- “Henry Hung” is prominent at the upper left
- Desktop navigation shows Portfolio, Resume, and a filled “Let's talk” CTA
- At 768px and below, navigation becomes a menu button and stacked mobile menu
- Menu state is expressed with `aria-expanded`; Escape closes it and returns focus

### Hero

- Copy leads; portrait supports it
- Main headline uses sans-serif because the earlier serif headline was difficult to scan
- Three bullets give specific career context
- Two actions point to Portfolio and Résumé
- Proof points provide immediate evidence beneath the introduction
- Mobile stacks copy before portrait and changes the proof grid from four columns to two

### Portfolio explorer

The earlier 3D flip-book has been superseded by a tabbed explorer. The explorer is faster to scan, easier to maintain, and more reliable across screen sizes.

- Desktop: a left project index and a large selected-project panel
- Mobile: four compact numbered tabs above the panel
- Content pattern: Human signal, Product move, Result
- Right-hand visual: sanitized screenshot, conceptual requirements visual, or simple diagram
- Hover may apply a restrained 1.025 image scale
- Primary action opens the detailed case study; Section J also exposes its live demo

Accessibility requirements:

- `role="tablist"`, `role="tab"`, and `role="tabpanel"` are paired correctly;
- only the active tab is in the tab order;
- arrow keys cycle through tabs; Home and End jump to the bounds;
- a polite live region announces selection;
- without JavaScript, tab controls disappear and all project panels render sequentially;
- reduced-motion removes transitions.

### Product visuals

Customer-service and insurance co-pilot visuals are sanitized mock screens supplied for this portfolio. The requirements-agent visual is a generic reconstruction. Section J uses a screenshot of its fictional-data demo.

- Never add client names, logos, brand palettes, customer records, or identifying copy.
- Keep the “Sanitized screen example to protect client confidentiality” label on client-work visuals.
- Prefer realistic product structure over decorative abstraction.
- Treat image filenames and alt text as public information.

### Case studies

- Reading width is capped at 760px inside a 940px container
- The first screen prioritizes title, standfirst, and metrics
- Each section has a numbered heading
- Decisions use Chose / Over / Because to foreground judgment and tradeoffs
- Mockups sit within flat framed panels
- A confidentiality note appears after the outcome
- The footer links back to the portfolio and forward to the next case study

### Résumé timeline

- Desktop only (`min-width: 1024px`)
- One-pixel rail with an accent fill based on scroll position
- Square dots align with three timeline stops
- Decorative and `aria-hidden`; the underlying résumé remains linear and complete
- Reduced-motion removes its height transition
- Mobile receives the same content with no rail

### Footer and contact

The footer is the single contact destination. It uses icon-supported email, LinkedIn, and GitHub links and omits placeholder positioning copy and the old language list in the bottom-right corner.

## 5. Responsive model

Primary breakpoints:

- `1024px`: portfolio and résumé timeline refinements
- `768px`: single-column page structures, mobile navigation, horizontal project tabs
- `480px`: smaller display type and compact spacing

Mobile is not a scaled desktop layout. Specific behavior:

- hero becomes one column;
- proof metrics become a 2×2 grid;
- portfolio project names collapse to numbered tabs;
- project visual moves below project copy;
- case-study entry navigation and footer links stack;
- résumé download action moves below the name;
- timeline rail is removed.

Every visual change should be checked at a narrow mobile width and a desktop width before shipping.

## 6. Content model and editorial rules

Project data lives in `src/content/projects/*.md` and is validated by `src/content.config.ts`. The collection is the canonical source for homepage summaries and case-study detail.

The same story should remain consistent across three places:

1. project Markdown;
2. the web résumé in `src/pages/resume.astro`;
3. `public/henry-hung-resume.pdf`.

Editorial principles:

- Start with a real user or organizational problem.
- State Henry's role and ownership precisely.
- Separate measured prototype results from projections and strategy outcomes.
- Attach context to every prominent metric.
- Use “percentage points” for an absolute rate change.
- Include what was chosen, what was rejected, and why.
- End with a reflection or what would change next time.
- Keep prose specific enough that it could not describe any generic AI product.

## 7. Privacy and confidentiality

Client work remains anonymized everywhere, including source code and media metadata.

Allowed:

- broad industry or company-size descriptions;
- generic role labels;
- sanitized or reconstructed screens;
- aggregated prototype metrics whose use has been approved.

Not allowed:

- client or bank names;
- client logos or recognizable brand colors;
- real customer names, policy numbers, balances, or conversations;
- original internal screenshots;
- confidential architecture, prompts, documents, or datasets;
- wording that implies a prototype result was a production outcome.

Section J is a personal project. Its public portfolio demo uses fictional data and is intentionally separate from any private live roster.

## 8. Technical and accessibility guardrails

- Keep the site statically generated and dependency-light.
- Prefer Astro components, semantic HTML, scoped CSS, and small vanilla scripts.
- Do not add a client framework for isolated interactions.
- Preserve visible focus styles and logical heading order.
- Use real links and buttons; never make a `div` the only control.
- Maintain no-JavaScript access to portfolio content.
- Respect `prefers-reduced-motion` for all nonessential transitions.
- Keep decorative visuals out of the accessibility tree and give meaningful product visuals descriptive labels.
- Avoid hiding substantive content behind hover-only or motion-only interactions.

## 9. Implementation history

The current homepage imports `PortfolioExplorer.astro`. Earlier flip-book, dark-theme, background-section, and case-study-rail experiments are preserved in Git history, not in the active component directory. This keeps the public repository focused on the implementation that actually ships.

Before editing or documenting a component, trace its imports from `src/pages/`. The current route composition is the source of truth; old commits are design history, not specification.

## 10. Definition of done

A site change is ready when:

1. project and résumé claims remain consistent;
2. `npm run build` succeeds;
3. homepage, résumé, and all case studies work at desktop and mobile widths;
4. keyboard navigation, focus states, and no-JavaScript portfolio fallback still work;
5. reduced-motion behavior remains restrained;
6. external links, demo details, screenshots, and confidentiality labels are correct;
7. no client-identifying content has entered copy, assets, metadata, or code.
