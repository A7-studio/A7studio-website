# 0007. Reliability story revamp

**Date**: 2026-11-15
**Status**: Proposed

## Summary

This enhancement rewrites the site around one idea from Samuel's own bio: he builds the parts of a product that have to keep working when the network does not. That covers payments, ledgers and mobile apps for people on low cost phones and patchy data. The hero, a new "How I work" section, one "what had to keep working" line on each work story, and the offers are reworded to tell that story in the first person. No new page, dependency or design change is needed. It builds on specs 0004 and 0006 and changes only the words and the order of a few blocks.

## Context

Spec 0006 made the site a showcase of work, products, learning and offers. It says what Samuel has shipped and built, but it does not say what makes his work distinct. The hero today reads "Senior Software Engineer building mobile, fintech & AI products." Many engineers could write that line.

On 2026-11-15 Samuel supplied a bio that names the distinct part: payments, ledgers and mobile apps that keep working on low cost phones and slow networks. His projects back it up: M Pesa STK Push and anonymous USSD tipping for people without smartphones (Kakitoo), a mobile payments app for Telkom Kenya (T-Kash), ledger integrity and retries (Boya), and embedded finance mini apps for banks in Nigeria (Alvin).

The bio also mentions Napili, where Samuel leads architecture and engineering. Napili is not on the site today. He told us on 2026-11-15 that Napili is also where an RFP for an NGO project was submitted. That bid is not shipped work and stays off the site.

If nothing changes, the site keeps selling "a senior engineer" when the stronger, truer pitch is a specific one that suits his freelance offers and the later consultancy.

## Requirements

**User stories**:
- As a recruiter, I want one line that says what is special about Samuel's experience, so that I can match him to a role fast.
- As a founder or NGO, I want to see proof that his products work for people with weak phones and networks, so that I can trust him with mine.
- As Samuel, I want the story told in one voice across hero, stories and offers, so that the site does not read as a list of unrelated products.

**Acceptance criteria**:
- **AC-1 (Hero)**: the `h1` and subhead state the reliability idea in the first person or neutral voice, and name mobile, payments and AI. The title "Senior Software Engineer" stays visible on the first screen. The availability line is unchanged. The actions stay: Download CV, Work with me, See my work.
- **AC-2 (How I work)**: the home page gains one short "How I work" section after the employer strip and before selected work. It has one heading, one lead of at most two lines, and three or four short points, each tied to a project that proves it (for example USSD tipping, ledger retries, low end phones, embedded in bank apps). Every point links to its work story or project.
- **AC-3 (Story lines)**: each work story gains one line, "What had to keep working", written from facts Samuel supplied. It appears on the story page and, shortened, on the tile when it fits. A story with no supplied fact leaves the line out.
- **AC-4 (Offers)**: the four offers are reworded so that each says what keeps working (for example payments that survive retries, apps for patchy data). No prices. Proof links stay valid. The AI offer keeps its "New" label.
- **AC-5 (Experience)**: if Samuel confirms Napili as a current role, it becomes the top timeline row with his confirmed title and dates. Without that confirmation no Napili row is added.
- **AC-6 (Honest claims)**: every claim in the new copy comes from the bio, the CV, or a fact Samuel states in chat. The only figures allowed are the two BeatBnk ones from spec 0004. "Six years" appears only if Samuel confirms it. The RFP, the NGO and any client under a bid are never named.
- **AC-7 (Voice and AI wording)**: copy uses "I". The retired claims, the AI wording rules and the "we" ban from specs 0004 and 0006 still pass in `check:static`.
- **AC-8 (Metadata)**: the home page title, meta description, Open Graph text and Person structured data match the new headline. The static check fails if the old headline survives in any of them.
- **AC-9 (Quality)**: the changed pages still meet the UI and UX rules in spec 0006 at 375, 768 and 1280 pixels in both themes. The first screen shows the headline, availability and both actions without scrolling at 375 pixels.

## Options considered

### Option 1: Reword in place (chosen)
Change the hero, add one section, add one line per story, and reword the offers. Keep every route and component.

**Pros**:
- Small change that ships in steps.
- Reuses the content files and checks from spec 0006.
- The story appears on every page a visitor lands on.

**Cons**:
- The home page gets one more section, so each section must stay short.

### Option 2: A dedicated About page
Put the story on `/about` and leave the home page as it is.

**Pros**:
- Room for the full bio.

**Cons**:
- Recruiters rarely click through, so the distinct pitch stays hidden.
- It adds a page to keep in step with the home page.

### Option 3: Rebuild around case studies only
Drop the hero pitch and let the stories speak.

**Pros**:
- Fully evidence based.

**Cons**:
- A visitor has to read three stories to learn what Samuel is about.

## Decision

**Chosen option**: Option 1: Reword in place.

The reliability idea goes in the hero, one new section, the stories and the offers, so that a visitor meets it wherever they land.

**Implementation skills**: `ui-ux-pro-max`, `design-system` and `ui-styling` (`.agents/skills/`) for the new section's layout. The design source is `docs/design.md` and the tokens in `src/styles.css`.

## Rationale

A specific claim is easier to trust and to remember than a general one, and the bio already points at real projects that prove it. The first person voice matches the freelance stage and does not claim a team. Keeping Napili and the RFP off the site until they are confirmed protects the honesty rule that spec 0004 set.

## Feature design

**Headline options** (Samuel picks one; recommendation first):

1. "Senior Software Engineer shipping mobile and fintech products, now building with AI." Closest to the current line and keeps the AI story honest.
2. "I build the parts of a product that keep working when the network doesn't." Strongest and most distinct, but drops the title from the `h1`, so the title moves to the line above it.

The subhead then names payments, ledgers and mobile apps for low cost phones and patchy data, and jobmigo and A7Studio as today.

**Home order after this change**: hero, employer strip, How I work, selected work, products, experience, learning, work with me, contact.

**Content model changes**:

| File | Change |
|---|---|
| `src/content/work.ts` | New optional `keptWorking` string per project. |
| `src/content/offers.ts` | Reworded `lines` per offer. |
| `src/content/experience.ts` | Napili row, only after confirmation. |
| `src/content/principles.ts` (new) | `{ id, title, line, proof }` for the How I work points. |
| `src/routes/index.tsx` | Hero text, the new section, title and meta. |
| `src/routes/work.$slug.tsx`, `src/components/WorkShell.tsx` | Render `keptWorking`. |
| `scripts/check-static-output.mjs` | Section list, old headline banned, proof links valid. |

**Value sourcing**:

| Displayed value | Source |
|---|---|
| Reliability idea, project facts | Samuel's bio, pasted 2026-11-15 |
| Kakitoo (M Pesa STK Push, anonymous USSD) | Bio |
| T-Kash for Telkom Kenya | Bio, and existing story |
| Alvin mini apps in Nigerian bank apps | Samuel, 2026-11-14 |
| BeatBnk 35% and 60% | Samuel, 2026-11-14 |
| Napili title and dates | Not yet supplied |
| "More than six years" | Bio, to be confirmed before use |

**Edge cases**: a story with no `keptWorking` shows no line; the new section has no empty state because its content is fixed; if Napili stays unconfirmed the timeline is unchanged.

**Security and privacy**: copy only. No new data, form or dependency. Client names under a bid are never published.

**Critical test scenarios**:
- First screen at 375 and 1280 pixels shows the headline, availability and both actions. Verifies **AC-1**, **AC-9**.
- The How I work points each link to a live page. Verifies **AC-2**.
- Each story with `keptWorking` shows the line, and a story without it does not. Verifies **AC-3**.
- No price text, valid proof links, "New" label on the AI offer. Verifies **AC-4**.
- A scratch "35%" outside BeatBnk, "AI expert", or the old headline makes `check:static` fail. Verifies **AC-6**, **AC-7**, **AC-8**.

## Build plan

Build approach is Journey: hero first, then the section, then the stories and offers.

1. Hero, title and meta, Person structured data, **AC-1**, **AC-8**.
2. `principles.ts` and the How I work section, **AC-2**.
3. `keptWorking` on the story model and views, with the lines Samuel supplies, **AC-3**.
4. Reword the offers, **AC-4**.
5. Napili row, only if confirmed, **AC-5**.
6. Extend `check:static`, **AC-6**, **AC-7**, **AC-8**.
7. Quality pass at three widths and both themes, **AC-9**.
8. Update `docs/design.md`, spec 0006 amendment note, and the scope.

## Consequences

**Positive**: one distinct story across the site; the offers and stories support each other; the consultancy stage inherits a clear position.
**Negative**: one more home section; the new lines need facts only Samuel has.
**Neutral**: no dependency, route or backend change.

## Follow-up

- [ ] Samuel to pick the headline (option 1 or 2).
- [ ] Samuel to confirm his Napili title and dates, and whether Napili may be shown.
- [ ] Samuel to supply or approve a "what had to keep working" line per story.
- [ ] Samuel to confirm "more than six years" before it is used.
- [ ] Add the NGO project as a work story only after it is won, shipped and cleared to publish.
- [ ] Carried over: CV PDF, Giraffe Spotter Play link, Chupachap role label, Fueling Brains and Missing Voices categories.

## References

- `docs/specs/0004-recruiter-first-home-restructure.md`, `0006-portfolio-showcase-revamp.md`, `docs/design.md`, `docs/scope/scope.md`.
