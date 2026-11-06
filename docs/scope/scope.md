# Scope: A7Studio portfolio and product lab

A7Studio is Samuel Gichu's independent engineering portfolio and product lab. Samuel is the product minded engineer behind the work, using AI tools as part of how he builds software while staying accountable for product decisions, engineering quality, and delivery. The public site presents selected work and products in progress, and helps recruiters, founders, and businesses make contact. Career Ops remains a separate local tool.

**Build approach:** Journey (make the visitor path from introduction to proof to contact feel complete).
**Workflow:** Alpha (run `/check verify` after `/develop`). The project default level of rigor. `/architect` is the recommended first stop for a feature with a real decision, but skippable when you already know the build. Any feature can carry its own tag (e.g. `· GA`) to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Portfolio and product lab one page site | Journey 1 | done |
| 2 | A7Markets concept showcase | Journey 2 | dropped |
| 3 | Career positioning and Good Call lab refresh | Journey 2 | done |
| 4 | Career Ops application tracker | Removed | dropped |
| 5 | Product lab video spotlights | Journey 2 | dropped |
| 6 | Lead capture and private lead dashboard | Journey 3 | planned |
| 7 | AI assisted product engineering positioning | Journey 2 | dropped |
| 8 | Work case studies showcase | Journey 2 | done |
| 9 | Recruiter first home restructure | Journey 2 | done |
| 10 | Lab and product showcase (AI job assistant) | Journey 2 | done |

## Journey 1: Discover the engineer and selected work

### 1. Portfolio and product lab one page site · done
A focused page introduces Samuel and A7Studio, presents selected work and current lab projects, and gives recruiters and potential clients a clear way to make contact.
**Done when:** a visitor can understand the studio, browse BeatBnk, Boya, mb96, SYNTAX, alvin.finance, Chupachap, Telkom, and Kakitoo, see Kakitoo, Good Call, and AI systems in the lab, inspect Work With Me models, access CV highlights, and directly contact Samuel as a recruiter, business, or founder through email, LinkedIn, or WhatsApp.
| [x] Design it (spec): `/architect portfolio and product lab one page site` → [0001](../specs/0001-portfolio-product-lab.md)
- [x] Build it: `/develop portfolio and product lab one page site` · code in `src/routes/index.tsx`
  - [x] Scaffold TanStack Start with static prerendering and Tailwind, **AC-8**
  - [x] Build Hero with positioning, call-to-actions, and live status ribbon, **AC-1**
  - [x] Build About Samuel section with biography and 4 engineering pillars, **AC-2**
  - [x] Build Selected Work section with category filters and 9 project cards, **AC-3**
  - [x] Build In The Lab section with interactive Kakitoo, Good Call, and AI systems, **AC-4**
  - [x] Build Work With Me section with 4 engagement models and deliverables, **AC-5**
  - [x] Build Contact & CV section with email copy tool, LinkedIn, and CV modal, **AC-6**
  - [x] Responsive navigation with desktop links and accessible mobile drawer, **AC-7**
- [x] Verify it: Static output verification (`pnpm run check:static`) and prerender test, **AC-1** through **AC-8**

## Journey 2: Show the product lab

### 2. A7Markets concept showcase · dropped
A7Markets is no longer part of the current product lab direction. Keep this row as history so the scope records why the concept was not continued.

### 3. Career positioning and Good Call lab refresh · done
Make the portfolio easier for recruiters to scan by using realistic project titles, concise contribution focused descriptions, and a clear upcoming Good Call personal finance project in the lab.
**Done when:** a recruiter can identify Samuel's role, core product areas, and selected work quickly; each project uses a plain product or capability title; Boya includes the confirmed Stripe, ledger, money movement, and business investment work; Good Call replaces A7Markets in the lab, is labeled as upcoming, and is positioned as a product for improving spending decisions without invented implementation claims.
- [x] Design it (spec): `/architect career positioning and Good Call lab refresh` → [0002](../specs/0002-career-positioning-and-runway-lab.md)
- [x] Build it: `/develop career positioning and Good Call lab refresh` · code in `src/routes/index.tsx`
  - [x] Simplify selected work titles and descriptions around product and contribution
  - [x] Update Boya copy with confirmed fintech work
  - [x] Replace A7Markets with the upcoming Good Call personal finance app
  - [x] Tighten recruiter facing hero and lab copy without adding unsupported claims
- [x] Verify it: `/check verify career positioning and Good Call lab refresh`

### 7. AI assisted product engineering positioning · dropped
Folded into item 9. AI is described as how Samuel works, not as his title.

### 5. Product lab video spotlights · dropped
Kakitoo and Good Call are paused (2026-11-06), so there is nothing to demo. Revisit when they resume.

### 8. Work case studies showcase · done
Replace the text only work cards with a visual work index at `/work` and a story page per project (Brief, My part, The build, Result) with screenshots that show only after Samuel marks them cleared. First stories: Kakitoo, T-Kash, Giraffe Spotter.
**Done when:** a visitor can browse `/work`, open a story and read its four chapters, see cleared screenshots with no layout shift, and reach it from the home page teaser and navigation; uncleared images cannot ship, and all pages are prerendered with their own metadata and sitemap entries.
- [x] Design it (spec): `/architect work case studies showcase` → [0003](../specs/0003-work-case-studies-showcase.md)
- [x] Build it: `/develop work case studies showcase` · code in `src/content/work.ts`, `src/routes/`, `src/styles.css`
  - [x] Typed content file and `/work` index with filters and covers, **AC-1**, **AC-3**
  - [x] Story page template with Kakitoo, T-Kash, Giraffe Spotter drafts, **AC-2**, **AC-5**
  - [x] Cleared images, metadata, prerender list, sitemap, **AC-3**, **AC-6**
  - [x] Home teaser and navigation links, **AC-7**
  - [x] Static check guard and docs updates, **AC-4**, **AC-9**
- [x] Verify it: `/check verify work case studies showcase`

### 9. Recruiter first home restructure · done
Samuel is job hunting (Boya contract ended Oct 2026) and has paused Kakitoo, Good Call and A7Markets to focus on applications, interviews and study. Reorder the home page so a recruiter sees the title, availability, CV, an experience timeline, honest project labels and a "Now" section. Remove unconfirmed figures and Valuencer. Career OS is out of scope for now.
**Done when:** a recruiter can see who Samuel is, his availability, a CV download and a dated timeline within a short scroll; Boya, Alvin, Giraffe Spotter and Kakitoo open as stories; no performance figures or paused products are presented as current; `check:static` enforces this.
- [x] Design it (spec): `/architect recruiter first home restructure` → [0004](../specs/0004-recruiter-first-home-restructure.md)
- [x] Build it: `/develop recruiter first home restructure` · code in `src/routes/index.tsx`, `src/content/experience.ts`, `src/content/work.ts`
- [x] Verify it: `/check verify recruiter first home restructure`

### 10. Lab and product showcase (AI job assistant) · done
Bring the Lab back as a documented build log, starting with the AI powered job assistant Samuel is building. A7Studio stays his professional profile first, and is meant to grow into a showcase of work done and SaaS products built, each with its story and, only once confirmed, its revenue. This amends spec 0004, which removed the lab and kept Career OS off the site while the job search came first. Career OS and Career Ops stay off the site until Samuel has designs; entries are gated structurally: only entries in `lab.ts` ship, drafts live in `lab.drafts.ts`. Career Ops is a separate local tool and is never shown.
**Done when:** a visitor can open the Lab, read what the assistant is, why it is being built, its honest status and build log, and see how later products and any confirmed revenue will be shown; nothing is claimed that Samuel has not confirmed.
- [x] Design it (spec): `/architect lab and product showcase` → [0005](../specs/0005-lab-and-product-showcase.md)
- [x] Build it: `/develop lab and product showcase` · code in `src/content/lab.ts`, `src/content/lab.drafts.ts`, `src/routes/lab.*`, `src/components/LabParts.tsx`
- [x] Verify it: `/check verify lab and product showcase`

## Journey 3: Receive and review leads

### 6. Lead capture and private lead dashboard · needs a decision · Beta
Give recruiters, founders, and businesses a clear way to send an inquiry, then let Samuel review the lead and its source in a private dashboard. Keep Career Ops separate.
**Done when:** a visitor can submit an inquiry with its audience type, the private dashboard shows its details, status, and campaign source, and Google Analytics reports aggregate visits and conversions separately without receiving personal lead details. LinkedIn campaign links can be attributed without implying access to private messages.
- [ ] Design it (spec): `/architect lead capture and private lead dashboard`

## Removed from A7Studio scope

### 4. Career Ops application tracker · dropped
Career Ops already has its own local web dashboard and remains a separate tool. A7Studio will focus on showcasing product work and reviewing inbound leads, not duplicating job search workflows.

## Deferred
Out of scope for today's launch, kept for later consideration.
- Résumé download: moved into item 9 (CV supplied 2026-11-06).
- Direct LinkedIn Lead Sync API: consider only if LinkedIn Lead Gen Forms become a real source and the account has access to the separate Lead Sync program.
- Detailed career history and project outcome claims: add only after verification.

## Legend

**The decision box.** Every feature carries exactly one, the sub-task whose label ends with `(spec)`. A feature tagged `needs a decision` starts with `/architect`; otherwise it can start with `/develop`.

**Feature lifecycle:** `planned` → `in-progress` → `done`; `existing` records completed work that predates this workflow, and `dropped` keeps a record of removed scope. The first unticked box is the suggested next step. The project's Alpha workflow recommends `/check verify` after `/develop`.

**Build approach:** Journey completes one visitor experience before beginning the next. Feature order follows the visitor journey and the stated launch priorities.
