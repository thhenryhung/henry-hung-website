# Henry Hung — portfolio design spec

Hand-off for building the site in Astro. Direction: **Broadsheet** — light, editorial, understated. Reference comps live in the Design canvas (`Main.dc.html`, `A-Mobile.dc.html`, `CS-Agent.dc.html`, `CS-Agent-Mobile.dc.html`).

Design intent, so judgment calls go the right way: this is a document, not a landing page. Rules and type size carry the hierarchy; there are no cards, shadows, rounded corners, gradients or animation. The four outcome metrics are the loudest thing on the page after the name. Nothing bounces, fades in or parallaxes.

---

## Palette

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FAF8F3` | Page background |
| `--panel` | `#F4F1E8` | Diagram frames, inset blocks |
| `--placeholder` | `#E8E4DA` | Portrait placeholder fill |
| `--ink` | `#14120E` | Headings, heavy rules, primary text |
| `--text` | `#3D3830` | Body copy |
| `--text-soft` | `#4A453C` | Lead paragraphs, metric captions |
| `--text-muted` | `#6B6355` | Italic project descriptors |
| `--meta` | `#6E6757` | Mono labels, captions, eyebrows |
| `--rule` | `#DCD6C8` | Hairline rules, borders |
| `--accent` | `#1B3A6B` | Links, metrics, index numbers, diagram highlights |
| `--accent-hover` | `#0E2547` | Link hover |

Diagram-only strokes: `#9A9284` (secondary structure), `#C7C0B0` (faint fill lines). Decorative; not held to text contrast.

Accent alternates tried in the comps, if you ever want to swap: oxblood `#7A2E28`, olive `#3B4A2F`, pure ink `#14120E`. One accent only — never two at once.

Contrast: `--meta` on `--paper` is ~5.3:1, which holds at 10px. Do not lighten it. Anything lighter than `--meta` is decoration, never text.

No dark mode. Light only.

---

## Typography

Three families, loaded from Google Fonts. In Astro, self-host them with `@fontsource` or `astro-font` rather than the CDN link used in the comps — it removes a render-blocking request and the layout shift on the Bodoni headline.

| Role | Family | Weights |
|---|---|---|
| Display | Bodoni Moda (optical size axis) | 600 |
| Body | Newsreader (optical size axis) | 400, plus italic 400 |
| Meta | IBM Plex Mono | 400 |

Fallbacks: `'Bodoni Moda', Didot, serif` · `'Newsreader', Georgia, serif` · `'IBM Plex Mono', monospace`.

**Desktop scale**

| Style | Size / line-height | Family | Notes |
|---|---|---|---|
| Hero h1 | 46 / 1.16, `-0.012em` | Display 600 | "systems and people" in `--accent` |
| Case-study h1 | 44 / 1.14, `-0.012em` | Display 600 | |
| Footer h2 | 46 / 1.1 | Display 600 | |
| Section h2 | 32 / 1.2 | Display 600 | |
| Case-study section h2 | 30 / 1.2 | Display 600 | Numbered: "01 — The problem" |
| Project h3 | 26 / 1.25 | Display 600 | |
| Decision h3 | 23 / 1.3 | Display 600 | |
| Metric, project | 42 / 1.0 | Display 600 | `--accent` |
| Metric, rail | 44 / 1.0 | Display 600 | `--accent` |
| Metric, band | 34 / 1.0 | Display 600 | `--accent` |
| Pull quote | 24 / 1.4 | Display 600 | |
| Lead paragraph | 19–20 / 1.6 | Body 400 | `--text-soft` |
| Prose | 17 / 1.68–1.72 | Body 400 | `--text` |
| Project copy | 16 / 1.58 | Body 400 | `--text` |
| Project descriptor | 16 / 1.45 italic | Body italic | `--text-muted` |
| Caption | 15 / 1.5 | Body 400 | `--text-soft` |
| Nav / inline link | 11, `0.14em`, uppercase | Mono | |
| Field label / eyebrow | 10, `0.14em`, uppercase | Mono | `--meta` |
| Wordmark | 11, `0.16em`, uppercase | Mono | |

**Mobile overrides** (≤480px): hero h1 → 28 / 1.2; section h2 → 28; case-study h2 → 27; project h3 → 23; decision h3 → 22; metric → 36; band metric → 34; prose → 17; project copy → 16; lead → 17–18. Mono sizes do not change.

Measure caps at 640px for lead paragraphs, 660–680px for prose, 560px for project copy. Never let a line of 17px prose run past ~90 characters.

---

## Spacing

4px base. Used steps: **4, 8, 12, 14, 16, 18, 22, 24, 30, 36, 44, 52, 56, 72, 88**. Round to these rather than inventing values.

Page gutter: 88px desktop, 24px mobile. Column gap between content and right/rail column: 56px desktop (44px inside project rows). Section top padding: 44–56px. Project rows: 30px vertical padding, separated by a 1px `--rule`.

**Rule system**, which carries most of the hierarchy:

- 2px `--ink` — section openers (under "Portfolio"), the top of every metric block, the footer's top edge, the top of the case-study rail blocks. Means "a new thing starts here."
- 1px `--rule` — row separators, field separators, the masthead's bottom edge. Means "these are siblings."

No border radius anywhere except the mobile menu button (2px). No shadows.

---

## Components

| Component | Notes |
|---|---|
| `Masthead` | Wordmark left, mono nav right (Portfolio / Background / Contact). 1px bottom rule. On mobile the nav collapses to a 44×44 button — implement as a real `<button>` with `aria-label` and `aria-expanded`. |
| `Hero` | Portrait figure left (212×258 desktop, 152×186 mobile, with a mono caption), headline and lead paragraph right. Stacks on mobile, portrait first. |
| `PortraitFigure` | `<figure>` + `<figcaption>`. Currently a placeholder block; swap for a real image and drop the caption. |
| `ProjectRow` | Index number (mono, accent, 44px column) · title, italic descriptor, Problem and Built labelled blocks, case-study link · right column with diagram then metric block. Collapses to a single column on mobile in that source order. |
| `MetricBlock` | 2px `--ink` top rule, metric in display accent, caption in `--text-soft`, mono context line. Used on the homepage, in the case-study rail, and as a three-up band. |
| `DiagramFrame` | 1px `--rule` border, `--panel` fill, inline SVG inside. 300×168 desktop, 342×190 mobile. |
| `FactList` | `<dl>` of mono label + serif value, 2px rule above the first item, 1px between. Used in the Background rail, the case-study rail, and the footer contact table. |
| `SectionHeader` | Display h2 left, mono descriptor right, 2px `--ink` rule beneath. |
| `CaseStudyRail` | Sticky `<aside>` — back link, at-a-glance `FactList`, `MetricBlock`, section nav. Becomes a two-column fact grid above the article on mobile. |
| `MetricBand` | Three cells divided by 1px rules, 2px above and 1px below. Stacks to three rows on mobile. |
| `DecisionBlock` | Mono "Decision 0N" in accent, display h3, then Chose / Over / Because rows — an 84px mono label column on desktop, labels stacked above the text on mobile. |
| `PullQuote` | 2px `--accent` left border, display quote, mono `<cite>`. |
| `SiteFooter` | 2px `--ink` top rule. Left: "Get in touch" + positioning line. Right: contact `FactList` (email, LinkedIn, GitHub). Bottom bar: location and languages in mono. |

Markup rules the comps follow and the build should keep: real `<a>`, `<button>`, `<dl>`/`<dt>`/`<dd>`, `<figure>`, `<blockquote>`/`<cite>`; never a clickable `<div>`. Every SVG gets `role="img"` and a descriptive `aria-label`. Touch targets ≥44px.

---

## Page layouts

**Homepage** (`/`) — masthead; hero; Portfolio section with four `ProjectRow`s; Background (prose left at 660px, `FactList` rail right at 300px: Now / Previously / Education / Languages); `SiteFooter`. Section nav is same-page anchors. Only project 01 links out for now; wire the rest as the case studies are written.

**Case study** (`/work/[slug]`) — masthead; two columns, 300px sticky rail and 748px article; article runs eyebrow → h1 → standfirst → `MetricBand` → 01 Problem (with `PullQuote`) → 02 What I built (with `DiagramFrame`) → 03 Key decisions (three `DecisionBlock`s) → 04 Outcome; footer with back link and next-case-study link. On mobile the rail's facts become a two-column grid above the article and the architecture diagram switches to a vertical variant — the horizontal one is illegible at 342px, so ship two SVGs, not one scaled.

Content collection: one entry per project with `title`, `descriptor`, `problem`, `built`, `metric`, `metricCaption`, `context`, `role`, `team`, `scope`, `research`, `diagram`. The homepage row and the case-study rail both read from it.

Breakpoints: single desktop layout to 1024px, single-column below 768px, mobile type scale below 480px. Container max 1280px.

---

## Before launch

Placeholders in the comps, all deliberate:

- Portrait — currently a grey "HH" block in the hero.
- LinkedIn and GitHub URLs — shown as `linkedin.com/in/[handle]`.
- Email — set to `thhenryhung@gmail.com`; swap if you get a custom domain.
- Footer positioning line — one sentence on the role, timing and kind of team you want. The page has no other direct ask.
- Case study: the interview pull quote, the "Over" and "Because" halves of decisions 01 and 02, all of decision 03, and how the 10% was measured (eval set, baseline, period). An unqualified percentage reads as marketing to a senior PM interviewer.
- Architecture diagram — replace with the real one, or a redacted screen if the client allows it.

Client work stays anonymized throughout: no logos, no client names, no identifiable screenshots.
