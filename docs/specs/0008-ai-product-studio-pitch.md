# 0008. AI product studio pitch

**Date**: 2026-11-27
**Status**: Accepted

## Summary

This enhancement turns the home page from a CV into a sales pitch. Founders with an idea and teams that want AI features should see what Samuel can build for them, how he works, and proof that he ships. jobmigo becomes the lead example of an AI powered app built end to end. His experience stays on the site as proof. Recruiters still find everything, but lower on the page and on the work and experience pages. No new backend or dependency is needed.

## Context

Specs 0004 to 0007 built a recruiter first site: the hero is a job title, the first action is "See my work", and the experience timeline sits in the middle of the home page. That suits a job search. Samuel now builds AI powered applications and wants freelance clients and founders as well.

A founder reads a page differently from a recruiter. They want to know: can this person build my idea, how fast, how will we work, and has he done it before. Today the site answers "who is Samuel", not "what can he build for me". The offers sit near the bottom, and jobmigo is a small tile.

Limits that still hold: jobmigo is not in production yet; the voice stays "I" (no agency "we" until stage three in `docs/product.md`); no prices; no claim without a source; AI is described as what is true today.

## Requirements

**User stories**:
- As a founder with an idea, I want to see what Samuel can build, how he works and what it costs me in time, so that I can decide to talk to him.
- As a business owner, I want examples of AI features he has built, so that I trust him with mine.
- As a recruiter, I still want his experience and a way to ask for a CV, without hunting.

**Acceptance criteria**:
- **AC-1 (Pitch hero)**: the hero speaks to founders and teams: what Samuel builds (AI powered apps, plus the mobile, web and payments parts around them), for whom, and one proof line. Primary action "Tell me about your idea" (mailto with a short brief template). Secondary "See what I have built". "Hiring? Request a CV" stays as a text link. The availability line covers both freelance projects and roles.
- **AC-2 (What I can build)**: a section with three or four build types, each with what the client gets and the proof that backs it. For example: an AI powered MVP (jobmigo), AI features in an existing product (Boya AI code review and reconciliation, Giraffe Spotter photo matching), mobile and payments apps (Kakitoo, Boya, Alvin). This replaces "Work with me" as the main offer block.
- **AC-3 (jobmigo case study)**: jobmigo is shown as a product case study near the top: the problem, what it does, how it is built (LLM evaluation, retrieval, evaluation tests), what works today and what does not. The status "Building, not yet in production" stays visible. One or two cleared screenshots.
- **AC-4 (How I work with you)**: a short process with three to five steps, from a first call to a working version, with what the client gets at each step. Time frames appear only if Samuel confirms them.
- **AC-5 (Proof)**: the selected work and a compact experience strip stay on the home page, framed as proof ("Shipped for Boya, Alvin, BeatBnk..."). The full timeline moves lower or behind "See full experience".
- **AC-6 (Idea intake)**: the contact section asks for the idea: a topic list led by "AI powered app", "Add AI to my product", "Mobile or payments app", "Hiring". It stays a mailto with a prefilled brief (problem, users, deadline). No form backend (that is scope item 6).
- **AC-7 (Honesty)**: no client outcome, timeline or price that Samuel has not supplied. The words "AI expert", "AI specialist" and "AI agency" stay banned. The voice stays "I". `check:static` enforces these.
- **AC-8 (Search and sharing)**: title, meta description and Open Graph text pitch AI powered apps for founders and teams. A share image (Open Graph) with the name and pitch line.
- **AC-9 (Quality)**: the UI and UX rules from spec 0006 at 375, 768 and 1280 pixels in both themes, and both hero actions visible on the first screen at 1280×800.

## Options considered

### Option 1: Pitch first home page (recommended)
Reorder and reword the home page around the founder. Keep every route.

**Pros**: one site, small change, the experience still proves the pitch.
**Cons**: recruiters scroll further to the timeline.

### Option 2: Separate `/build` pitch page
Keep the home page for recruiters and add a sales page.

**Pros**: each audience gets a focused page.
**Cons**: founders rarely land on a deep link; two pitches to keep in step.

### Option 3: Rebrand as a studio with "we"
**Cons**: there is no team yet; it breaks the honesty rule in `docs/product.md`.

## Decision

**Chosen option**: Option 1: Pitch first home page, pending Samuel's answers to the open decisions below.

## Feature design

**Home order**: hero (pitch), what I can build, jobmigo case study, how I work with you, selected work (proof), experience strip, learning, contact (idea intake).

**Hero draft** (to confirm): "I build AI powered apps for founders and teams, from the first idea to something people use." Subhead: "I have shipped payments, mobile and web products for six years. Now I build AI products like jobmigo." Keep the stack line under the hero for search and recruiters.

**Content model changes**: `offers.ts` becomes build types with proof; new `process.ts` for the steps; the jobmigo Lab entry gains a short problem and features block for the home case study; contact topics change.

**Open decisions for Samuel**:
1. Lead audience: founders first (recommended) or equal weight with recruiters.
2. Main action: email with a brief (works today) or a booking link such as Cal.com (needs an account).
3. Time frames in the process: none, or ones you confirm (for example "a first working version in four to six weeks").
4. jobmigo screenshots: which screens are ready and cleared.
5. Small projects: whether to list a "starter" option (for example a one week prototype).

**Security and privacy**: still static. The mailto collects nothing on the site. Screenshots must not show personal job data.

**Critical test scenarios**: first screen shows the pitch and both actions at three widths; every build type links to live proof; jobmigo status is visible; the mailto opens with the brief template; banned words and unsupplied figures fail `check:static`.

## Build plan

1. Hero, title, meta and share image, **AC-1**, **AC-8**.
2. What I can build section from `offers.ts`, **AC-2**.
3. jobmigo case study block, **AC-3**.
4. How I work with you from `process.ts`, **AC-4**.
5. Reorder proof and experience strip, **AC-5**.
6. Contact topics and brief template, **AC-6**.
7. Extend `check:static`, **AC-7**.
8. Visual check at three widths and both themes, **AC-9**; update `docs/product.md`, `docs/design.md` and scope.

## Consequences

**Positive**: the site sells what Samuel builds next, with real proof behind it; the consultancy stage gets a head start.
**Negative**: recruiters scroll further; the pitch leans on jobmigo before it is in production, so its status must stay honest.
**Neutral**: no backend, dependency or route change.

## Decisions taken (2026-11-27)

- Lead audience: founders first (Samuel).
- Main action: email with a brief, since it works today (recommended default, no booking account yet).
- Time frames: none until Samuel confirms them.
- jobmigo screenshots: the existing cleared home page screenshot only.
- No starter offer for now.
- The spec 0007 principles section stays as "Built to keep working." below selected work; the hiring card moves to the experience section.

## References

- `docs/product.md`, `docs/specs/0006-portfolio-showcase-revamp.md`, `0007-reliability-story-revamp.md`, `docs/scope/scope.md`.

## Amendment, 2026-11-27: stack direction

Samuel approved a new intro: full-stack engineer building AI-powered apps, in TypeScript and Python, with React Native and React on the front and Python behind the AI. This replaces "full-stack and Flutter engineer" in the hero, meta text and structured data, puts React Native and Python (FastAPI) in the pills and stack line (reversing the 2026-11-24 FastAPI removal, on Samuel's word), and leads the mobile card with React Native. Flutter stays in the stack line and experience. No years of Python are claimed. Later the same day Samuel asked to keep Flutter up front: the intro, meta description and job title say full-stack and Flutter engineer, and the mobile card leads with Flutter.
