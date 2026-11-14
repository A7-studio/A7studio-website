# 0004. Recruiter first home restructure

**Date**: 2026-11-06
**Status**: Accepted

> **Amended by [0005](0005-lab-and-product-showcase.md)** (2026-11-06): a Lab returns once an entry is published. Until then AC-4 holds: the Lab and Career OS do not appear.

> **Amended by [0006](0006-portfolio-showcase-revamp.md)** (2026-11-12): the home order, header actions, Now section and Work With Me section change. The recruiter facts, status labels and retired claims still hold.

> **Amended (2026-11-14)**: Samuel confirmed two BeatBnk figures, "raised velocity by 35%" and "cut production bugs by 60%", and wants them on the site. AC-5 still bans every other performance figure. `check:static` allows only those two phrases.

## Summary

This enhancement reorders the home page so a recruiter can answer five questions in about five seconds: who Samuel is, what he is good at, proof, availability, and how to make contact. It adds an availability line, a CV download, an experience timeline taken from his CV, and a "Now" section about his job search and learning. It removes unconfirmed figures, the Valuencer entry, and the paused lab cards. It amends specs 0001, 0002 and 0003. Career OS is out of scope and is not mentioned on the site.

## Context

Samuel's Boya contract ended in October 2026 and he is looking for work. He has paused Kakitoo, Good Call and A7Markets to focus on job applications, interviews, system design, data structures and algorithms, backend practice, and Odoo training that starts on 11 November 2026.

The current home page is built for clients and lab visitors: a "Start a Project" call to action, a lab of three products, a Work With Me section about engagement models, and several percentage claims (40%, 35%, 60%, 85%, 50%, 30%). Samuel asked that the figures stay off the site. The 2026-11-01 CV (`/Users/samuelgichu/career-ops/output/cv-samuel-gichu-remote-2026-11-01.pdf`) is now the source for roles and dates. Spec 0003 already provides `/work` and story pages, and `src/content/work.ts` holds project content.

## Requirements

**User stories**:
- As a recruiter, I want to see the role Samuel targets, his availability and his CV within the first screen, so that I can decide quickly whether to read on.
- As a recruiter, I want a timeline of where he worked, with dates and what he owned, so that I can check his experience against his CV.
- As a recruiter, I want to open real work with honest status labels, so that I can trust what is shown.
- As Samuel, I want only claims I can defend to appear, so that the site never contradicts what I say in an interview.

**Acceptance criteria**:
- **AC-1 (Hero)**: the first screen shows the title "Senior Software Engineer, Mobile & Fintech" (matching the CV), one line of positioning, an availability line ("Available now for remote roles and contracts"), a primary "Download CV" action and a secondary "Contact" action.
- **AC-1b (Title everywhere)**: the title is "Senior Software Engineer" (Samuel's decision, 2026-11-06) in the page title, meta description, keywords, `og:title`, hero, About, the CV modal and the CV file. "Senior Product Engineer" and "senior product engineer" are removed from the site, and `check:static` fails if either returns. The `impactBadge` labels such as "Mobile Product Engineering" are project category labels, not his title, and may stay.
- **AC-2 (Employer strip and timeline)**: the page shows the companies Boya, BeatBnk, Alvin Technologies, SYNTAX, mb96 and Gavtech, then an experience timeline with one row per role: company, title, dates, and two or three lines of what he owned, all drawn from the CV and facts Samuel supplied. Overlapping side products (Kakitoo) are labelled as side products.
- **AC-3 (Selected work)**: home Selected Work shows four story covers (Boya, Alvin, Giraffe Spotter, Kakitoo) and a link to `/work`. Each project carries one honest status label: Live, Company closed, Side product (paused), or Employer work.
- **AC-4 (Now section)**: a section named "Now" replaces the lab. It states that Samuel is job hunting and learning: system design, data structures and algorithms, backend refresh, and Odoo (training starts 11 November 2026, worded as learning, not a credential). Good Call and Kakitoo appear only as a one line "Paused" note. A7Markets and Career OS do not appear.
- **AC-5 (No unconfirmed figures)**: no percentage or multiplier claim about performance, coverage, bugs, velocity, deployment or adoption appears in any page, in `src/content/work.ts`, or in the CV modal. `check:static` fails if any of the retired figures is found.
- **AC-6 (Valuencer removed)**: Valuencer is absent from the home page, `/work`, the CV modal and the static check list.
- **AC-7 (CV download)**: the CV button downloads a PDF served from `public/`. `check:static` fails if the file is missing.
- **AC-8 (Calls to action)**: the header action reads "Hire me" or "Download CV" instead of "Start a Project". Work With Me is reduced to two offers, full time or contract roles, with contact options by email, LinkedIn and WhatsApp.
- **AC-9 (Stories)**: `/work` gains story pages for Boya and Alvin (text first, `screensCleared: false`), alongside the existing Kakitoo, Telkom and SYNTAX stories. Copy uses only CV facts and facts Samuel supplied, with employer neutral wording.
- **AC-10 (Quality)**: accessibility, light and dark themes, phone width, prerendering, metadata and sitemap behave as in spec 0003.

## Options considered

### Option 1: Restructure the existing home page around a career timeline
Keep the route and design system, reorder sections, add a typed experience file.

**Pros**: Smallest change, reuses spec 0003 pages, no new dependency.
**Cons**: The long `index.tsx` file needs careful editing.

### Option 2: Split into /about, /experience and /now pages
**Pros**: Each page is short.
**Cons**: A recruiter has to click to find basics, and more prerender upkeep.

### Option 3: Replace the site with a one page CV
**Pros**: Fastest to scan.
**Cons**: Loses the case studies built in 0003 and the product feel.

## Decision

**Chosen option**: Option 1: Restructure the existing home page around a career timeline.

**Implementation skills**: `ui-ux-pro-max` and `design-system` (`.agents/skills/`) may inform layout. Design source is `docs/design.md` and the `src/styles.css` tokens.

## Rationale

A recruiter checks the person before the project. Putting availability, a CV and a verifiable timeline first answers that, and the existing case studies then serve as proof. Removing numbers Samuel does not want to defend, and labelling closed or paused work plainly, protects trust more than any extra feature.

## Feature design

**Content** (typed, no backend):

| File | Holds |
|---|---|
| `src/content/experience.ts` (new) | Roles: company, title, location, start, end, summary lines, kind (`employer`, `cofounded`, `side product`) |
| `src/content/work.ts` | Stories and project cards, figures removed, Valuencer removed, Boya and Alvin stories added |

**Value sourcing**:

| Displayed value | Source |
|---|---|
| Title and positioning | CV header: Senior Software Engineer, mobile first and full stack; fintech and payments |
| Roles and dates | CV, 2026-11-01 (see table below) |
| Role summaries | CV bullets with figures removed, plus facts Samuel supplied (Temporal workflows, KYC/KYB, Stripe Connect, reconciliation, embeddable widgets) |
| Availability line | Samuel: Boya contract ended, looking for work |
| Odoo training | Samuel: starts 11 November 2026 |
| Project status labels | Samuel: BeatBnk app no longer on the Play Store; Kakitoo and Good Call paused |
| CV file | A PDF Samuel supplies at `public/samuel-gichu-cv.pdf` |

**Roles and dates** (BeatBnk's dates were inferred from the PDF layout and need Samuel's confirmation):

| Company | Title | Dates |
|---|---|---|
| Boya | Full Stack Engineer, Fintech & Payments | May 2026 to Oct 2026 |
| BeatBnk | Mobile Team Lead, Senior Flutter Engineer | Jan 2025 to May 2026 (to confirm) |
| Alvin Technologies | Senior Frontend & Mobile Engineer | Mar 2022 to Dec 2024 |
| Kakitoo | Lead Mobile Engineer (side product) | Jan 2023 to Jan 2024 |
| SYNTAX Ltd | Mobile Engineer (Flutter) | Apr 2021 to Mar 2022 |
| mb96 Ltd | Software Engineer, Mobile & Web | Sep 2019 to Apr 2021 |
| Gavtech Solutions | Co-founder | Dates to supply |

**Home order**: hero, employer strip, selected work, experience timeline, Now, contact. About, Skills and the technology matrix collapse into one "stack I ship with" line. The CV modal stays but loses figures and Valuencer.

**Edge cases**: an uncleared story keeps the typographic cover. If the CV file is missing, the build fails rather than shipping a dead button.

**Security and privacy**: the CV in `public/` is world readable and scraped by bots. It should be a public copy without the phone number, or Samuel accepts that exposure. Email and WhatsApp stay as existing contact options.

**Critical test scenarios**:
- Hero shows title, availability, CV and Contact above the fold at 375px and desktop. Verifies **AC-1**, **AC-8**.
- Timeline rows match the table and employers appear in the strip. Verifies **AC-2**.
- Static check fails on a reintroduced figure, a Valuencer mention, or a missing CV file. Verifies **AC-5**, **AC-6**, **AC-7**.
- Home teaser shows four stories and `/work` shows five story links. Verifies **AC-3**, **AC-9**.
- "Now" shows Odoo with the correct date and no A7Markets or Career OS. Verifies **AC-4**.
- Keyboard, themes, no horizontal overflow, prerender output. Verifies **AC-10**.

## Build plan

Build approach is Journey: finish the recruiter path from hero to contact in order.

1. Add `experience.ts`; strip figures and Valuencer from `work.ts`, `index.tsx` and the CV modal; replace "Senior Product Engineer" with "Senior Software Engineer" everywhere, **AC-1b**, **AC-5**, **AC-6**.
2. Rebuild the hero with availability and CV actions; add the CV file, **AC-1**, **AC-7**.
3. Add the employer strip and timeline, **AC-2**.
4. Reduce home Selected Work to four stories with status labels, **AC-3**.
5. Replace the lab with the Now section, **AC-4**.
6. Reduce Work With Me and update header actions, **AC-8**.
7. Add Boya and Alvin stories, prerender list and sitemap, **AC-9**.
8. Update `check-static-output.mjs` to forbid retired figures and Valuencer and to require the CV, **AC-5** to **AC-7**.
9. Update `docs/design.md`, specs 0001 to 0003 amendment notes and the scope, **AC-10**.

## Consequences

**Positive**: the site serves one clear goal, stays honest, and matches the CV.
**Negative**: the product lab story is gone for now, and the Work With Me pitch to clients is reduced. Both can return when Samuel resumes those products.
**Neutral**: no dependency, backend or analytics change.

## Follow-up

- [x] Tighten the desktop hero so the Download CV and Contact buttons sit above the fold at 1280x800 (found in verify; fixed 2026-11-06, buttons end at y=713).
- [ ] Replace `public/samuel-gichu-cv.pdf` with a public copy that drops Valuencer and, if wanted, the phone number.
- [ ] Samuel to confirm BeatBnk dates and supply Gavtech dates.
- [ ] Samuel to supply the public CV PDF (with or without a phone number).
- [ ] Samuel to decide whether to remove Valuencer from the CV file as well.
- [ ] Samuel to write Result chapters and export cleared screenshots when ready.
- [ ] Revisit the lab when Career OS or the paused products become public.

## References

- `docs/specs/0001-portfolio-product-lab.md`, `0002-career-positioning-and-runway-lab.md`, `0003-work-case-studies-showcase.md`, `docs/design.md`, `docs/scope/scope.md`.
- CV: `/Users/samuelgichu/career-ops/output/cv-samuel-gichu-remote-2026-11-01.pdf`.
