# 0003. Work case studies showcase

**Date**: 2026-11-04
**Status**: Accepted

## Summary

This enhancement turns the nine text cards under Selected Work into a visual work index at `/work` and a story page for each project at `/work/<slug>`, in the style of napilistudios.co/work. Each story has four short chapters (Brief, My part, The build, Result) and screenshots that appear only after you mark them cleared. It amends spec 0001, which allowed no images and only one route. The first build covers three stories: Kakitoo, T-Kash, and Giraffe Spotter.

## Context

Spec 0001 and 0002 built a one page site whose work section is nine typographic cards. Visitors see names, tags, and a paragraph, but no product and no story. The reference site shows covers on an index page, then a case study page that explains the problem, the decisions, and the outcome with screens between the chapters.

Most of Samuel's projects were built inside employers or for their clients. Screens may contain real user data or fall under an NDA, so each project needs a clearance decision before images ship. Spec 0001 also forbids unverified metrics and unconfirmed facts, and requires one route and no images. Those rules must be relaxed on purpose, not bypassed.

The site is statically prerendered with TanStack Start. The Vite config uses `crawlLinks: false`, so any new page must be listed for prerendering explicitly. `src/routes/index.tsx` is about 1,600 lines and holds the project data inline.

## Requirements

**User stories**:
- As a recruiter or founder, I want to see what Samuel built and what he personally owned, so that I can judge fit quickly.
- As a visitor, I want to open one project and read its story with real screens, so that the work feels real.
- As Samuel, I want an uncleared screenshot to be impossible to publish by accident, so that I protect employers and users.

**Acceptance criteria**:
- **AC-1 (Work index)**: `/work` lists all nine existing projects as a grid with a cover, title, company or context line, and year, with the existing category filters. Projects that have a story link to it. Projects without a story are shown but are not links.
- **AC-2 (Case study page)**: `/work/<slug>` shows a header (outcome line, company or relationship label, role, year, stack, optional outside link), four chapters in order (Brief, My part, The build, Result), a link to the next story, and a contact call to action.
- **AC-3 (Images only when cleared)**: images render only when the story has `screensCleared: true`. Each image has alt text, width, and height. A story without images or without clearance renders a complete text layout with a typographic cover.
- **AC-4 (Clearance guard)**: `pnpm run check:static` fails if a story lists images while `screensCleared` is false, if an image file or alt text is missing, or if a page is not in the prerender list.
- **AC-5 (Static output)**: `/work` and each story slug are prerendered to static HTML. An unknown slug shows the site's not found state.
- **AC-6 (Metadata)**: each page has its own title, description, and canonical URL. `og:image` is set only from a cleared cover. A `sitemap.xml` lists the home page, `/work`, and every story.
- **AC-7 (Home and navigation)**: the home page Selected Work section becomes a short teaser of up to four story covers with a link to `/work`. The header and mobile drawer link to `/work`. All existing home anchors and contact actions still work.
- **AC-8 (Accessibility and performance)**: semantic landmarks and one `h1` per page, keyboard operable filters and links, visible focus, reduced motion respected, light and dark themes supported, readable from phone width up, no layout shift from images, and below the fold images load lazily.
- **AC-9 (Content integrity)**: no new runtime dependency, no backend, content lives in a typed file, employer facing wording stays neutral, and a Result chapter includes a figure only when Samuel has confirmed it.

## Options considered

### Option 1: Separate pages with typed static content
`/work` index and `/work/$slug` pages, all prerendered, with content in a typed file.

**Pros**:
- Shareable links, per page metadata, and the closest match to the reference.
- Fits the existing static build and adds no dependency.

**Cons**:
- Needs an explicit prerender list and a second route level.
- Spec 0001 rules about one route and no images must be relaxed.

### Option 2: Expandable stories on the home page
Keep one route and expand each card in place.

**Pros**:
- No routing change.

**Cons**:
- Long stories crowd the page, and nothing can be linked or indexed.

### Option 3: Modal or drawer
Open a story over the home page.

**Pros**:
- Fast browsing.

**Cons**:
- Weak for sharing and search, and harder to make accessible.

## Decision

**Chosen option**: Option 1: Separate pages with typed static content

Add `/work` and `/work/$slug` as prerendered routes, move project content to `src/content/work.ts`, and gate every image behind a `screensCleared` flag that the static check enforces.

**Implementation skills**: `ui-ux-pro-max` and `design-system` (`.agents/skills/`) may inform layout and tokens. Design source is the existing `docs/design.md` and `src/styles.css` tokens.

## Rationale

Case studies need their own URLs to be shared with recruiters and clients, and a static prerender keeps the site fast and free of a backend. A typed content file gives each story one clear shape, lets the build check enforce the clearance rule, and stops `index.tsx` from growing further. A flag plus a build check is cheap, and it turns your own review into something the build can verify.

## Feature design

**Content model** (`src/content/work.ts`, one entry per project):

| Field | Type | Required | Notes |
|---|---|---|---|
| `slug` | string | yes | URL segment, unique, kebab case |
| `title` | string | yes | Project first title, as today |
| `contextLabel` | string | yes | Company or relationship line, employer neutral |
| `relationship` | `own` / `employer` / `client` | yes | Drives the label wording |
| `year` | string | yes | Shown on cards and headers |
| `categories` | existing category list | yes | Reuses `all`, `mobile`, `frontend`, `fintech` |
| `outcomeLine` | string | yes | One sentence headline |
| `role` | string | story only | What Samuel did |
| `stack` | string list | yes | Existing tags |
| `url` | string | no | Only a confirmed destination |
| `story` | object or absent | no | Absent means summary only, not a link |
| `story.screensCleared` | boolean | story only | Default false |
| `story.cover` | image | no | Needs cleared flag to render |
| `story.chapters` | four chapters | story only | Brief, My part, The build, Result |
| `chapter.headline`, `chapter.body` | strings | yes | Short text |
| `chapter.images` | image list | no | Each has `src`, `alt`, `width`, `height` |
| `story.credits` | string | no | Optional |

**State**: filter selection on `/work` (local React state). No other state.

**API surface**: none. No server function, form, or fetch.

**Value sourcing**:

| Action | Value displayed | Source |
|---|---|---|
| Render card and header | title, context, year, categories, stack, outside link | Existing `projects` data moved into `work.ts`; links only if already confirmed |
| Render story text | chapter headlines and bodies | Written by Samuel in `work.ts`; drafts may reuse existing confirmed descriptions, new claims must be supplied by Samuel |
| Render images | `src`, `alt`, `width`, `height` | `public/work/<slug>/*.webp` exported by Samuel, values in `work.ts` |
| Decide to render images | clearance | `story.screensCleared` set by Samuel |
| Next story link | following story slug | Next entry in `work.ts` order that has a story, wrapping to the first |
| Page metadata | title, description, canonical, `og:image` | Derived from story fields; `og:image` from a cleared cover only; canonical `https://a7studio.dev/work/<slug>` |
| Prerender list and sitemap | page paths | Derived from the slugs of entries with a story |
| Result figures | numbers | Only text Samuel confirms; none invented |

**Edge cases**:
- Unknown slug: not found state.
- Missing cover or uncleared: typographic cover built from title and category.
- Missing image file: caught by `check:static`, never shipped.
- Story with no Result text: Result chapter is omitted, not filled.
- Reduced motion: no scroll or hover animation required to read content.

**Security model**: public, read only, no input, no secrets. The privacy risk is leaked customer or employer data in images, handled by the clearance flag, alt text review, and Samuel's own check of every screenshot before export.

**Visual design**: use `docs/design.md` and the `src/styles.css` tokens (near black canvas, green accent, Space Grotesk, DM Mono labels, light and dark themes). Pattern from the reference only: large cover grid, outcome line, numbered chapters with images between them, credits, next project. Add the new component styles near the work styles. Update `docs/design.md` to record the new components.

**Critical test scenarios**:
- Happy path: open `/work`, filter, open Kakitoo, read four chapters, follow the next link. Verifies **AC-1**, **AC-2**.
- Clearance: set an image on an uncleared story and confirm `check:static` fails; clear it and confirm images render with alt text and no layout shift. Verifies **AC-3**, **AC-4**, **AC-8**.
- Static output: build, then check `/work` and each slug exist as HTML and unknown slug is handled. Verifies **AC-5**.
- Metadata and sitemap: inspect canonical, `og:image` presence only for cleared covers, and sitemap entries. Verifies **AC-6**.
- Home and nav: teaser links to `/work`, drawer and header link work, old anchors still scroll. Verifies **AC-7**.
- Accessibility: keyboard only pass, reduced motion, light and dark, phone width. Verifies **AC-8**.
- Integrity: `package.json` has no new dependency and copy has no unconfirmed figures. Verifies **AC-9**.

## Build plan

Build approach is Journey, so finish the visitor path (index, then a story, then home) in order.

1. Add `src/content/work.ts` with the typed model and move the nine existing projects into it, unchanged in wording, **AC-1**, **AC-9**.
2. Add `/work` with the cover grid and filters, plus typographic covers, **AC-1**, **AC-3**, **AC-8**.
3. Add `/work/$slug` with the four chapter template, next link, call to action, and not found state, using Kakitoo draft text from confirmed facts, **AC-2**, **AC-5**.
4. Add T-Kash and Giraffe Spotter stories as text first drafts for Samuel to edit, **AC-2**, **AC-9**.
5. Wire images from `public/work/<slug>/` behind `screensCleared`, with dimensions, lazy loading, and alt text, **AC-3**, **AC-8**.
6. Add per page metadata, explicit prerender list, and `public/sitemap.xml`, **AC-5**, **AC-6**.
7. Replace the home Selected Work grid with the teaser, add header and drawer links, **AC-7**.
8. Extend `scripts/check-static-output.mjs` for pages, clearance, image files, alt text, and sitemap; relax the 0001 "no images" wording, **AC-4**, **AC-6**.
9. Update `docs/design.md`, spec 0001 (amendment note), and scope, **AC-9**.

## Consequences

**Positive**:
- Visitors see the products and read the story, which is the main proof the site lacked.
- Clearance becomes a checked rule instead of a habit.
- Project content leaves the 1,600 line route file.

**Negative / tradeoffs**:
- More pages to write, and story quality depends on Samuel supplying honest text and cleared screens.
- A new route level and an explicit prerender list add upkeep per project.
- The existing home copy and static check still assert figures such as 40%, 60%, and 85%. Those are not touched here and stay a separate verification item.

**Neutral**:
- No backend, analytics, or new dependency is introduced.

## Follow-up

- [ ] Samuel to confirm the Result figures (40%, 35%, 60%, 85%) before any appear in a story, or remove them from the home copy and the static check.
- [ ] Samuel to export WebP screenshots for cleared projects and set `screensCleared`.
- [ ] Decide later whether Boya, BeatBnk, and Alvin get stories once clearance is known.
- [ ] Consider an image optimisation script if exporting WebP by hand becomes a chore.

## References

**Project sources**:
- `docs/specs/0001-portfolio-product-lab.md`, `docs/specs/0002-career-positioning-and-runway-lab.md`, `docs/design.md`, `docs/scope/scope.md`, `vite.config.ts`, `scripts/check-static-output.mjs`.

**Reference site**:
- https://napilistudios.co/work and https://napilistudios.co/work/galcare, used for layout pattern only.
