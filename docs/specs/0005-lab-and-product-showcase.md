# 0005. Lab and product showcase

**Date**: 2026-11-06
**Status**: Accepted

> **Amended during build (2026-11-06)**: a `published` flag alone cannot keep text out of the client bundle, because the whole content file is bundled. A scratch test found a hidden entry's name inside a built JavaScript file. The gate is now structural: `src/content/lab.ts` holds only published entries and ships, while unpublished entries live in `src/content/lab.drafts.ts`, which no route may import. Publishing means moving an entry from `lab.drafts.ts` to `lab.ts`. The `published` field is removed, and `check:static` scans every built file, JavaScript included. Read AC-1, AC-2, AC-8 and the content model with this in mind.

> **Amended by [0006](0006-portfolio-showcase-revamp.md)** (2026-11-12): jobmigo is published as the first entry, with its own page at `/jobmigo` (a new optional `path` field). Learning notes and a `repo` link are added.

## Summary

This enhancement adds a Lab to A7Studio: a public build log at `/lab` with one page per product at `/lab/<slug>`. The first entry will be Career OS, the AI powered job assistant Samuel is building, but it stays off the site until he marks it published. Each entry tells what the product is and why, its stack and architecture, what Samuel is learning, and cleared screenshots. Later entries can carry confirmed revenue. The site stays a professional profile first and grows into a showcase of products and their stories. It amends spec 0004, which removed the lab and kept Career OS off the site.

## Context

Samuel is job hunting and building Career OS to learn. He wants to document it publicly, but he told us (2026-11-06) that Career OS and Career Ops stay off the site until he has designs and a build plan. Career Ops is a separate local tool and is never shown. Longer term, A7Studio should show products built, their stories, and any revenue made, with only confirmed figures (spec 0003 and Samuel's rule for this site).

The site is statically prerendered with TanStack Start and `crawlLinks: false`, so each page must be listed for prerendering. Spec 0003 already solved a similar problem: content in a typed file, a flag that gates what is public, and a build check that enforces it.

## Requirements

**User stories**:
- As a recruiter, I want to read how Samuel builds a real product with AI, so that I can judge how he thinks and learns.
- As Samuel, I want to prepare Lab entries in the repo without any of them appearing until I publish, so that Career OS stays private until the designs are ready.
- As a visitor, I want any revenue shown to be real and dated, so that I can trust it.

**Acceptance criteria**:
- **AC-1 (Gate)**: a Lab entry appears on the site only when it is in `entries` in `lab.ts`. A draft in `lab.drafts.ts` has no page, no sitemap line, no home teaser, and its name and slug appear nowhere in built output, JavaScript bundles included.
- **AC-2 (Empty state)**: with no published entries, the Lab does not exist publicly: no `/lab` route output, no nav link, no home section, no sitemap line.
- **AC-3 (Lab index)**: with at least one published entry, `/lab` lists entries as covers with name, status label (Planned, Building, Live, Paused), tagline and last updated date. The home page shows a short Lab teaser and the header and drawer link to `/lab`.
- **AC-4 (Product page)**: `/lab/<slug>` shows name, status, tagline, then chapters: What it does and why, Stack and architecture, What I'm learning, and a dated build log (newest first). A chapter with no text is omitted, not filled.
- **AC-5 (Screens)**: screenshots appear only when the entry has `screensCleared: true`, with alt text, width and height, as in spec 0003. Screens must not show personal job data.
- **AC-6 (Revenue)**: revenue is shown only when the entry has `revenue` with an amount, currency, period and as of date, all supplied by Samuel. It renders as "<amount> <period>, as of <date>". No estimate, projection or placeholder is ever rendered. A product without `revenue` shows nothing about money.
- **AC-7 (Static output)**: published entries are prerendered with their own title, description, canonical URL and sitemap line. An unknown slug shows the not found state.
- **AC-8 (Build check)**: `check:static` fails if a draft's name or slug appears in any built file, if app code imports `lab.drafts`, if a published entry has revenue missing a field, if an uncleared entry lists images, or if a published page is missing from the sitemap.
- **AC-9 (Quality)**: accessibility, themes, phone width, reduced motion and no new dependency, as in spec 0003.

## Options considered

### Option 1: Typed content with a `published` gate, `/lab` routes (chosen)
Same pattern as `/work`: `src/content/lab.ts`, `/lab` and `/lab/$slug`, a flag, and a build check.

**Pros**: reuses a proven pattern, no dependency, Career OS can sit ready and stay private.
**Cons**: unpublished entry text lives in the repo (the repo is the only place it shows), and one more route group to prerender.

### Option 2: A single home section, no pages
**Pros**: least work.
**Cons**: a build log and a growing product showcase do not fit in one section, and nothing is linkable.

### Option 3: A separate blog or CMS
**Pros**: easy to publish often.
**Cons**: new dependency and moving parts for one author, against the minimal change rule.

## Decision

**Chosen option**: Option 1: Typed content with a `published` gate, `/lab` routes.

Keep entry text for unpublished products out of the repository until Samuel is ready to publish, if the repository is public. The gate prevents accidental publishing from the built site, but not from a public git history.

**Implementation skills**: `ui-ux-pro-max` and `design-system` (`.agents/skills/`) may inform layout. Design source is `docs/design.md` and the `src/styles.css` tokens.

## Rationale

The site must serve a job search today and a product showcase later. A flag keeps the structure ready without exposing Career OS early, and a build check turns Samuel's privacy decision into something the build enforces. Revenue is the highest risk claim, so it needs a dated, supplied figure or it does not render at all.

## Feature design

**Content model** (`src/content/lab.ts`):

| Field | Type | Required | Notes |
|---|---|---|---|
| `slug` | string | yes | URL segment |
| `name` | string | yes | Product name |
| `status` | `Planned` / `Building` / `Live` / `Paused` | yes | Shown as a pill |
| `tagline` | string | yes | One sentence |
| `updated` | ISO date | yes | Last log date, shown on the index |
| `why`, `stack`, `learning` | chapter text | no | Omitted when empty |
| `log` | list of `{ date, title, body }` | no | Newest first |
| `screensCleared`, `cover`, `images` | as in spec 0003 | no | Gate images |
| `revenue` | `{ amount, currency, period, asOf }` | no | All four required together, supplied by Samuel |
| `url` | string | no | Only a confirmed destination |

**Value sourcing**:

| Displayed value | Source |
|---|---|
| Name, tagline, status, chapters, log | Written by Samuel in `lab.ts`; Claude may draft from facts he states in chat |
| Last updated | Latest `log` date, else `updated` |
| Images | Exported by Samuel under `public/lab/<slug>/`, gated by `screensCleared` |
| Revenue | Samuel only, with `asOf` date; never derived or estimated |
| Prerender list, sitemap, nav, home teaser | Derived from entries with `published: true` |

**State**: none beyond rendering. No backend or form.

**Edge cases**: no published entries (AC-2); published entry with no log (chapters only); unknown slug (not found); revenue present but incomplete (build fails).

**Security and privacy**: public and read only. Entry text is not secret once pushed to a public repo; Samuel decides when to add Career OS text. Never show personal job data, employer names from applications, or tokens in screenshots.

**Critical test scenarios**:
- Empty state: build with no published entries and confirm no `/lab` output, link, section or sitemap line. Verifies **AC-1**, **AC-2**.
- Publish: set a scratch entry to published and confirm index, page, teaser, nav, sitemap and metadata. Verifies **AC-3**, **AC-4**, **AC-7**.
- Gate leak: leave an entry unpublished and confirm its name appears nowhere in `dist`. Verifies **AC-1**, **AC-8**.
- Revenue: incomplete revenue fails the check; complete revenue renders with its date. Verifies **AC-6**, **AC-8**.
- Images and quality passes as in spec 0003. Verifies **AC-5**, **AC-9**.

## Build plan

Build approach is Journey: finish the visitor path from the home teaser to the index to a product page in order.

1. Add `src/content/lab.ts` with the types and an empty `entries` list, plus derived `publishedEntries`, **AC-1**, **AC-2**.
2. Add `/lab` and `/lab/$slug` routes and a shared component, with chapters, log, images and revenue rendering, **AC-3** to **AC-6**.
3. Prerender list and sitemap derived from published entries; routes emit nothing when empty, **AC-2**, **AC-7**.
4. Home teaser, header and drawer link, shown only when entries are published, **AC-3**.
5. Extend `check:static` for gate, revenue and sitemap rules, **AC-8**.
6. Verify with a scratch published entry that is then removed, **AC-1** to **AC-9**.
7. Update `docs/design.md`, specs 0004 amendment note, and scope.

## Consequences

**Positive**: Samuel can start documenting Career OS privately in `lab.drafts.ts` and publish by moving the entry; the site is ready to grow into a product showcase.
**Negative**: the work ships with no visible change until the first entry is published; one more route group to maintain.
**Neutral**: no dependency, backend or analytics.

## Follow-up

- [ ] Samuel to decide when Career OS has designs and a build plan, then write its entry and set `published: true`.
- [ ] Decide whether the repository is public before adding unpublished entry text.
- [ ] Revisit revenue display once a product earns money.

## References

- `docs/specs/0003-work-case-studies-showcase.md` (gate and build check pattern), `docs/specs/0004-recruiter-first-home-restructure.md`, `docs/design.md`, `docs/scope/scope.md`.
