# Scope: A7Studio portfolio and product lab

A7Studio is Samuel Gichu's independent engineering portfolio and product lab. The one page site presents selected work, active product experiments, and availability for relevant roles and selected client work.

**Build approach:** Journey (make the visitor path from introduction to proof to contact feel complete).
**Workflow:** Alpha (run `/check verify` after `/develop`). The project default level of rigor. `/architect` is the recommended first stop for a feature with a real decision, but skippable when you already know the build. Any feature can carry its own tag (e.g. `· GA`) to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Portfolio and product lab one page site | Journey 1 | in-progress |
| 2 | A7Markets concept showcase | Journey 2 | dropped |
| 3 | Career positioning and Good Call lab refresh | Journey 1 | done |

## Journey 1: Discover the engineer and selected work

### 1. Portfolio and product lab one page site · in-progress
A focused page introduces Samuel and A7Studio, presents selected work and current lab projects, and gives recruiters and potential clients a clear way to make contact.
**Done when:** a visitor can understand the studio, browse BeatBnk, Boya, mb96, SYNTAX, alvin.finance, Chupachap, Telkom, and Kakitoo, see Kakitoo, Good Call, and AI systems in the lab, inspect Work With Me models, access CV highlights, and reach LinkedIn or direct email.
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

## Journey 2: Explore the A7Markets concept

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

## Deferred
Out of scope for today's launch, kept for later consideration.
- Contact enquiry form: use existing profile links for direct contact.
- Résumé download: no verified résumé file was supplied.
- Live market data, analytics, and consent controls: not needed for today's static portfolio launch.
- Detailed career history and project outcome claims: add only after verification.

## Legend

**The decision box.** Every feature carries exactly one, the sub-task whose label ends with `(spec)`. A feature tagged `needs a decision` starts with `/architect`; otherwise it can start with `/develop`.

**Feature lifecycle:** `planned` → `in-progress` → `done`; `existing` records completed work that predates this workflow, and `dropped` keeps a record of removed scope. The first unticked box is the suggested next step. The project's Alpha workflow recommends `/check verify` after `/develop`.

**Build approach:** Journey completes one visitor experience before beginning the next. Feature order follows the visitor journey and the stated launch priorities.
