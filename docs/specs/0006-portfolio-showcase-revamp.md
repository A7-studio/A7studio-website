# 0006. Portfolio showcase revamp and jobmigo page

**Date**: 2026-11-12
**Status**: Accepted

## Summary

This enhancement turns A7Studio from a recruiter page into a personal showcase that can grow in three stages: a portfolio of shipped work and experience today, a home for the AI powered products and learning Samuel is doing next, and later a consultancy. It keeps the current look and evolves it. It adds a product page for jobmigo at `/jobmigo`, publishes the Lab with dated learning notes, adds four freelance offers backed by real work, and sets modern UI and UX rules that the build must meet. It amends specs 0004 and 0005.

## Context

Samuel has worked mainly as a software engineer inside other businesses and shipped many products there. His next step is AI engineering: building AI powered applications, starting with jobmigo, an AI powered job search and application assistant. He also wants freelance work based on his experience, and later an agency.

What exists today (read from the code on 2026-11-12):

- The home page (`src/routes/index.tsx`) is built for recruiters: hero, employer strip, four work stories, experience timeline, Now cards, two offers, contact.
- `/work` and five story pages exist. Every cover is text only, because no screenshots are in `public/`.
- The Lab (`/lab`, spec 0005) is built but empty, so it is invisible. Spec 0005 kept Samuel's assistant off the site until designs exist. Samuel has now decided (2026-11-12) to show jobmigo as "Building", text only.
- "Work with me" lists two cards and has no freelance offers.
- `docs/product.md` is still an empty template, so the product direction is written down nowhere.
- The jobmigo app itself will be hosted apart from this site. Only the product page lives here.

The gap is not the visual style. The gap is that the site tells one story (hire me) and has no place for products, learning, or freelance offers.

## Requirements

**User stories**:
- As a recruiter, I want to see what Samuel has shipped and where, so that I can judge his experience quickly.
- As a founder or business, I want to see what Samuel can build for me and proof that he has done it, so that I can decide to make contact.
- As any visitor, I want to see what Samuel is building and learning in AI, with honest status, so that I can trust the AI claim.
- As Samuel, I want the site to grow into a consultancy later by changing content, not by rebuilding.

**Acceptance criteria**:
- **AC-1 (Positioning)**: the hero says what Samuel builds (mobile, fintech and AI powered products), names him and A7Studio, and keeps the availability line. The title stays "Senior Software Engineer". The first screen has one primary action (Download CV), one secondary action (Work with me), and one text link (See my work).
- **AC-2 (Home order)**: the home page reads in this order: hero, employer strip, selected work, products, experience, learning, work with me, contact. Each section has one heading, one short lead, and one way forward.
- **AC-3 (Honest AI wording)**: AI is described only as what is true today: building jobmigo, using AI tools daily, and studying. The words "AI expert" and "AI specialist" never appear, and "AI Engineer" is never used as his title. `check:static` fails if they do. Named courses appear only after Samuel supplies their names.
- **AC-4 (jobmigo page)**: `/jobmigo` is a prerendered product page with name, status "Building", the tagline "An AI powered job search and application assistant.", any chapters Samuel has written, the dated build log, and a contact action. A link to the app appears only when the entry has a confirmed `url`. No screenshots appear until `screensCleared` is true.
- **AC-5 (One page per product)**: an entry with its own path has exactly one public page. For jobmigo that is `/jobmigo`, and `/lab/jobmigo` shows the not found state. The Lab tile, home tile, sitemap and canonical all point to `/jobmigo`.
- **AC-6 (Lab is live)**: `/lab` is public, linked in the header, drawer and home page, and lists products first and learning notes second.
- **AC-7 (Learning notes)**: a note has a date, a title, a topic and a short body. Notes show newest first on `/lab`, and the three newest show in the home learning section with a link to the rest. A note can be linked to by its anchor. With no notes, the notes block is left out, not shown empty.
- **AC-8 (Offers)**: "Work with me" shows the hiring card first (full time or contract role), then four freelance offers: Mobile app build, Payments and fintech, Web app build, AI powered features. Each offer has a title, two or three lines on what the client gets, and links to the work that proves it. The AI offer carries a "New" label and links to jobmigo. No prices appear. The contact topics gain "Freelance project".
- **AC-9 (Screens for own products)**: Kakitoo and Chupachap show real screenshots once Samuel exports them and sets `screensCleared: true`. Employer work stays text only. Every image has alt text, width and height, loads lazily below the fold, is WebP or AVIF, and is at most 200 KB.
- **AC-10 (Voice)**: all copy uses "I". No "we", "our team" or agency wording appears. Stage three (consultancy) adds no page or section in this build.
- **AC-11 (Navigation)**: the header has at most five links (Work, Lab, Experience, Work with me, Contact) plus the theme button and one action button. The same links are in the mobile drawer. Every link text says where it goes.
- **AC-12 (UI and UX quality)**: every page meets the rules in "UI and UX rules" below, at 375, 768 and 1280 pixels wide, in light and dark themes.
- **AC-13 (Static output and search)**: `/jobmigo` and `/lab` are prerendered with their own title, description, canonical and sitemap line. The home page carries Person structured data (JSON-LD) with name, job title, site and LinkedIn. `check:static` enforces these, the retired claims from spec 0004, and the draft gate from spec 0005.
- **AC-14 (Product record)**: `docs/product.md` is filled in with the three stage direction, users, and what is out of scope.

## Options considered

### Option 1: Evolve the current site in place (chosen)
Keep the routes, tokens and components. Reorder the home page, publish the Lab, add `/jobmigo`, notes and offers as typed content.

**Pros**: smallest change, reuses specs 0003 to 0005, no new dependency, every step ships alone.
**Cons**: `index.tsx` is long and needs careful edits; the look changes by degree, not dramatically.

### Option 2: Rebuild as a multi page studio site
New pages for About, Services, Products and Notes with a new visual style.

**Pros**: looks like an agency from day one.
**Cons**: an agency voice with no clients or team is not honest yet; a recruiter must click to find basics; weeks of work during a job search.

### Option 3: Split into two sites
A personal CV site and a separate studio site.

**Pros**: each site has one audience.
**Cons**: two sites to keep alive, split search value, and the work stories would be copied.

## Decision

**Chosen option**: Option 1: Evolve the current site in place.

Decisions I made for you, each with the runner up:
- **Home lead**: recruiters first, freelance second (you had no preference). It matches the job search, and flipping the two hero actions later is a small content change. Runner up: equal weight.
- **jobmigo URL**: one page at `/jobmigo` rendered from the Lab entry, not two pages. Two pages with the same story split search value and double the upkeep. Runner up: a pitch page plus a build log page.
- **Notes**: a list on `/lab` with anchors, not one page per note. Short notes do not need their own pages yet. Runner up: `/lab/notes/<slug>` pages, worth adding when notes grow long.
- **Offers**: typed content with proof links and no prices. Prices invite haggling before a conversation. Runner up: "from" prices, once you have done three paid projects.
- **Nav label**: keep "Lab". It covers products and notes. Runner up: "Products".
- **Agency stage**: nothing visible now. The trigger to start it is in Follow up.

**Implementation skills**: `ui-ux-pro-max`, `design-system` and `ui-styling` (`.agents/skills/`) may inform layout. The design source is `docs/design.md` and the tokens in `src/styles.css` (your choice: evolve the current look).

## Rationale

A visitor trusts shown work more than stated skill. The site already has honest work stories, so the fastest way to a credible AI and freelance story is to add evidence beside them: a product in progress, dated notes, and offers that link to proof. Keeping "I" and one site protects trust while there is no team, and the typed content files mean stage three is mostly new entries. Leading with recruiters keeps the job search working while the rest grows.

## Feature design

**Three stages** (only the first two are built here):

| Stage | The site is | Leads with | Trigger to move on |
|---|---|---|---|
| 1. Portfolio (now) | Samuel's work and experience | Work, experience, CV | Shipped by this spec |
| 2. Builder and freelancer | Plus products, notes, offers | Same, with Lab and offers visible | Shipped by this spec |
| 3. Consultancy (later) | A studio with clients | Offers and client results | Three paid client projects, or a second person |

**Home page composition**:

| # | Section | Shows | Way forward |
|---|---|---|---|
| 1 | Hero | Availability, what he builds, one line of proof, actions | Download CV, Work with me |
| 2 | Employer strip | Six companies and one stack line | none |
| 3 | Selected work | Four story tiles with status pills | See all projects |
| 4 | Products | jobmigo tile (Building) and later products | See the lab |
| 5 | Experience | Dated timeline | none |
| 6 | Learning | Three focus cards and the three newest notes | All notes |
| 7 | Work with me | Hiring card, then four offers | Contact |
| 8 | Contact | Email, LinkedIn, WhatsApp, topics | Send |

The Now section becomes Learning. The "Paused" note stays as one line.

**Content model changes**:

| File | Change |
|---|---|
| `src/content/lab.ts` | `LabEntry` gains optional `path` (for example `/jobmigo`). New `LabNote { id, date, title, topic, body }` and `notes` list. `hasLab` is true when there is a published entry or a note. New helper `entryHref(entry)` returns `path` or `/lab/<slug>`. The jobmigo entry is added. |
| `src/content/lab.drafts.ts` | Unchanged. Drafts still never ship. |
| `src/content/offers.ts` (new) | `Offer { id, title, lines, proof: slugs or paths, label? }` and the hiring card text. |
| `src/content/work.ts` | A Chupachap story (text from its existing description), and covers and images for Kakitoo and Chupachap once supplied. |
| `src/routes/jobmigo.tsx` (new) | Renders the shared Lab entry view for the entry whose `path` is `/jobmigo`. |
| `src/components/LabParts.tsx` | The entry page body moves here as a shared view used by `/lab/$slug` and `/jobmigo`. |

**Value sourcing**:

| Displayed value | Source |
|---|---|
| Hero wording, AI wording | Samuel, 2026-11-12: builds jobmigo, uses AI tools daily, studies AI |
| jobmigo name, tagline, status | Samuel, 2026-11-12. Tagline is his own description |
| jobmigo chapters and build log dates | Samuel writes them. Empty chapters are left out. `updated` is the publish date |
| jobmigo app link | `url` on the entry, only once the app is live |
| Notes | Samuel writes each note in `lab.ts`. Claude may draft from facts he states |
| Offer titles | Samuel's four picks, 2026-11-12 |
| Offer proof links | Mobile: BeatBnk, Giraffe Spotter, Kakitoo. Payments: Boya, Alvin, T-Kash. Web: Alvin, Chupachap. AI: jobmigo |
| Screenshots | Samuel exports to `public/work/<slug>/`, gated by `screensCleared` |
| Structured data | Name and title from the hero, site URL from `SITE_URL`, LinkedIn from the contact section |
| Prerender list, sitemap | Derived from `lab.ts` paths, plus manual lines in `public/sitemap.xml` |

**UI and UX rules** (the build is checked against these):

- **Accessibility**: WCAG 2.2 AA. Text contrast at least 4.5 to 1, large text and control borders at least 3 to 1. Visible focus on every control. One `h1` per page and no skipped heading levels. Skip link, landmarks, and alt text on every image.
- **Touch and pointer**: targets at least 44 by 44 pixels on phone widths. Hover is never the only way to learn something.
- **Hierarchy**: one primary action per screen. Section leads are at most two lines on desktop. Body text is at least 16 pixels with lines of 45 to 75 characters.
- **Layout**: mobile first. No horizontal scroll at 375 pixels. Grids use the shared classes, with no inline styles (the offers grid has one today).
- **Motion**: under 300 milliseconds, and off when the visitor asks for reduced motion.
- **Speed**: Largest Contentful Paint under 2.5 seconds, layout shift under 0.1, interaction delay under 200 milliseconds, measured on the built site with phone throttling. Images follow AC-9.
- **States**: every list has a rule for empty (left out), and every tile shows a status. Not found pages offer a way back.
- **Themes**: light and dark both pass the contrast rule, and the first paint matches the saved theme.
- **Honesty in the interface**: status pills, dates on notes and logs, and no numbers that Samuel has not supplied.

**Edge cases**: no notes yet (block left out, Lab still shows jobmigo); jobmigo with no chapters (page shows name, status, tagline and contact, which is acceptable for "Building"); a visitor opens `/lab/jobmigo` (not found with a link to the Lab); an offer's proof link points to a story that was removed (`check:static` fails); screenshots supplied but over the size budget (`check:static` fails).

**Security and privacy**: the site stays static and read only. `/jobmigo` collects nothing, so it needs no privacy policy; the separately hosted app owns sign in and user data. Screens must never show personal job data. No new dependency.

**Critical test scenarios**:
- First screen at 375 and 1280 pixels shows the positioning, availability and the two actions above the fold. Verifies **AC-1**, **AC-12**.
- Home sections appear in the stated order with one heading each. Verifies **AC-2**.
- `/jobmigo` renders with its metadata and sitemap line; `/lab/jobmigo` is not found; tiles link to `/jobmigo`. Verifies **AC-4**, **AC-5**, **AC-13**.
- Add a scratch note, confirm order and anchor, then remove it and confirm the block is gone. Verifies **AC-6**, **AC-7**.
- Each offer links to live pages; the AI offer shows "New"; no price text. Verifies **AC-8**.
- A scratch "AI expert" string, a "we" agency phrase, or an oversized image makes `check:static` fail. Verifies **AC-3**, **AC-9**, **AC-10**.
- Keyboard pass, both themes, reduced motion, contrast spot checks, and a Lighthouse run on the built site. Verifies **AC-11**, **AC-12**.

## Build plan

Build approach is Journey: finish the visitor path from the hero to proof to products to contact, in order. Each step can ship alone.

1. Fill in `docs/product.md` with the three stages, **AC-14**.
2. Hero and header: new positioning, two actions and a text link, five nav links, **AC-1**, **AC-11**.
3. Lab content: add `path`, `notes`, `entryHref`, and the jobmigo entry; share the entry view; add `/jobmigo`; make `/lab/jobmigo` not found; prerender list and sitemap, **AC-4**, **AC-5**, **AC-6**, **AC-13**.
4. Home Products section and Learning section (replacing Now), with notes on `/lab`, **AC-2**, **AC-7**.
5. `offers.ts` and the new Work with me section; add the contact topic; remove the inline grid style, **AC-8**.
6. Chupachap story; image slots for Kakitoo and Chupachap, shown once Samuel supplies cleared files, **AC-9**.
7. Person structured data on the home page, **AC-13**.
8. Extend `check:static`: AI wording, agency wording, `/jobmigo` page and sitemap line, offer proof links, image format and size, **AC-3**, **AC-9**, **AC-10**, **AC-13**.
9. Quality pass against the UI and UX rules at three widths and both themes, **AC-12**.
10. Update `docs/design.md`, add amendment notes to specs 0004 and 0005, and update the scope.

## Consequences

**Positive**: the site shows work, products, learning and offers in one honest story; the AI claim has evidence; the consultancy stage needs content, not a rebuild.
**Negative**: the home page gets longer, so each section must stay short; the jobmigo page will be thin until Samuel writes its chapters; notes look stale if he stops writing.
**Neutral**: no dependency, backend, form or analytics change. Lead capture stays in scope item 6.

## Follow-up

- [ ] Samuel to write the "What I'm learning" chapter for jobmigo, and more build log entries. The first chapters and log entry were drafted from the public README at github.com/A7-studio/jobmigo on 2026-11-12, so Samuel should read them.
- [x] Chupachap screenshot captured from chupachap.co.ke on 2026-11-12 and marked cleared. Samuel to confirm his role and that he is happy to publish it.
- [ ] Kakitoo screenshot: the site shows a loading overlay in a headless capture, so none was taken. Samuel to export a clean screen.
- [ ] Samuel to name the AI courses he is taking, if he wants them shown.
- [ ] Samuel to supply the public CV PDF (carried over from spec 0004).
- [ ] Add the app link to jobmigo when the app is live, and a redirect plan when it gets its own domain.
- [ ] Start stage three (services pages, "we" voice, client results) after three paid client projects or a second person joins.
- [ ] Consider social share images (Open Graph) once screenshots exist.

## References

- `docs/specs/0003-work-case-studies-showcase.md`, `0004-recruiter-first-home-restructure.md`, `0005-lab-and-product-showcase.md`, `docs/design.md`, `docs/scope/scope.md`.
- Practices applied: WCAG 2.2 AA, Core Web Vitals thresholds.
