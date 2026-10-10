# 0001. Portfolio and product lab one page site

**Date**: 2026-10-06
**Status**: In Progress

## Summary

This spec defines a one page A7Studio portfolio for visitors to understand the studio, browse selected work and lab projects, and connect through LinkedIn. TanStack Start is a full stack React framework that can prerender this page as static HTML, with server features available if a real backend need appears later. The page follows the visual direction in `design/code.html`, while its content comes only from confirmed scope and worktree facts.

## Context

The planned page introduces A7Studio and Samuel Gichu, presents selected work and product lab entries, and lets visitors follow confirmed project links or connect on LinkedIn. Visitors include people considering relevant roles and selected client work. The current worktree has no application source, dependencies, project images, or hosting provider. The project root declares pnpm 11.5.2.

The scope confirms the project names and that Good Call is an upcoming personal finance app. The reference contains additional descriptions, biography, metrics, project status, email, and URLs that are not all confirmed in the worktree. The page must not turn those reference details into facts. The design language file is a blank template, so the supplied HTML file is the visual source while the scope and confirmed facts govern content.

There is no dynamic data, visitor data collection, or backend behavior for this page. Future server routes or application data are possible, but their requirements are not known. A7Studio's canonical URL is confirmed as `https://a7studio.dev/`. The confirmed LinkedIn profile URL and Kakitoo URL are present in `design/code.html`.

## Requirements

**User stories**:
- As a recruiter or hiring manager, I want to understand Samuel Gichu's engineering capabilities in mobile, frontend, fintech, and AI-assisted products so that I can evaluate him for remote roles and contract work.
- As a potential client or collaborator, I want to inspect selected work, active lab experiments, and work-with-me service areas so that I can reach out with relevant opportunities.
- As a visitor, I want fast access to Samuel's CV, LinkedIn, GitHub, and email contact links.

**Acceptance criteria**:
- **AC-1 (Hero)**: Introduces A7Studio as Samuel Gichu's engineering lab for mobile, web, fintech, and AI-assisted product work, with clear lead generation CTAs ("Start a Project / Discuss Role", "Explore Work", "View CV") and concise confirmed experience signals.
- **AC-2 (About Samuel)**: Highlights Samuel's background as Senior Product Engineer (7+ years across Flutter, React, TypeScript, API-driven architectures, MCP and AI-assisted engineering) and his location in Nairobi, Kenya (open to worldwide remote roles and contracts).
- **AC-3 (Selected Work - Project-First Titles)**: Uses concise shipped project or capability titles instead of long company names, and displays the company as secondary contextual metadata.
- **AC-4 (In The Lab)**: Demonstrates current experiments and product builds: Kakitoo (privacy-first tipping platform, linking to `https://kakitoo.com`), Good Call (upcoming personal finance app), and AI assisted engineering experiments.
- **AC-5 (Work With Me - Lead Conversion)**: Structures 4 clear collaboration offerings with high-intent lead triggers for prospective clients and hiring managers: Senior Remote Engineering Roles, 0-to-1 Product Sprints, Fintech & Payments Integration, and AI-Native Product Tooling.
- **AC-6 (Contact / CV & Inbound Leads)**: Provides multiple low-friction lead capture channels: direct email (`kibochas@gmail.com` / `hello@a7studio.io`), direct WhatsApp / phone (`+254 728 370 802`), LinkedIn (`https://www.linkedin.com/in/samuel-gichu-a29695b9/`), an interactive inquiry intent selector, and a full CV viewer/download option matching Samuel's CV.
- **AC-7 (Navigation & UX)**: Includes sleek header with smooth anchor navigation to all key sections, working mobile menu with keyboard/escape accessibility, and dark mode aesthetic aligned with `design/code.html`.
- **AC-8 (Performance & Accessibility)**: Prerendered static HTML, fast load time, semantic landmarks, high contrast ratios, visible focus indicators, and responsive down to mobile devices.

## Options considered

### Option 1: TanStack Start with static prerendering

Build the single page in TanStack Start with React and TypeScript, prerender the public route, and leave server features unused until needed.

**Pros**:
- The static launch can be served as generated HTML.
- TanStack Start builds on TanStack Router and provides a path to server rendering, server functions, and public server routes if later requirements justify them.
- TypeScript supports typed routes and future server interfaces.

**Cons**:
- It adds framework setup and concepts that a static one page site does not need today.
- Hosting that later uses server features must support the selected server runtime.
- TanStack Start is currently documented as a release candidate, so its API and tooling may change before a stable release.

### Option 2: TanStack Router with Vite

Build the page as a client side React app using TanStack Router and Vite, without TanStack Start's full stack server layer.

**Pros**:
- Offers typed routing and a smaller server surface for a frontend only app.
- Fits a static hosting model and provides routing capabilities if more client routes arrive.

**Cons**:
- The current single page does not need a router.
- Backend behavior later requires a separate server framework or service, adding a boundary and deployment decision.
- Initial page rendering and metadata handling need separate decisions.

### Option 3: Plain static page without TanStack

Build the page as static HTML and CSS without a React framework.

**Pros**:
- Has the least setup and operating complexity for a single static page.
- Does not tie the page to a framework before dynamic requirements exist.

**Cons**:
- Does not satisfy the requested TanStack direction.
- Future backend behavior would require a framework or server transition.

## Decision

**Chosen option**: Option 1: TanStack Start with static prerendering

Use TanStack Start for a React and TypeScript application, prerender the one public page, and do not set up backend services for this feature. If future requirements add app owned backend behavior, use Start server functions for application calls and server routes for public HTTP APIs. Supabase is a future provider preference only. This feature adds no Supabase package, credentials, database, or service configuration.

**Implementation skills**: None. No TanStack community skill is installed or referenced by project guidance.

## Rationale

The current page is a small, static portfolio, so plain static HTML or TanStack Router would involve less setup. You also want TanStack in view because server functionality may be useful later. TanStack Start is a full stack React framework built on TanStack Router. It supports static prerendering and includes server functions and public server routes, so the page can ship without a server while preserving those options. Start being in release candidate status is a real maintenance risk; implementation should use the currently supported official setup and check its release status before locking package versions.

The Supabase preference does not justify an unused service. The page has no persistent or private data. Choosing a database, authentication, or deployment provider now would add configuration and operational work without helping a visitor. Keep those decisions for a feature with a concrete data or backend requirement.

## Feature design

**Data model sketch**:

There is no database model. Portfolio content is a typed static list in the page module.

| Entry group | Required values | Optional value | Confirmed entries |
|---|---|---|---|
| Selected work | Name | Link only after its destination is confirmed in the worktree | BeatBnk, Boya, mb96, SYNTAX, alvin.finance, Chupachap, Telkom |
| Product lab | Name and status label | Confirmed outbound link | Kakitoo with `https://kakitoo.com`, Good Call labeled as upcoming, AI assisted experiments |
| Contact | Label and confirmed destination | None | LinkedIn with `https://www.linkedin.com/in/samuel-gichu-a29695b9/` |

The entries have no persistent identifiers, relationships, lifecycle, status, description, or role claims. The typed list is the only source for project card names, categories, and confirmed links.

**State transitions**:

The mobile navigation has two UI states: closed and open. The menu control toggles between them. Selecting a section link or pressing Escape closes an open menu. No other page data has state.

**API surface**:

None. The page has no API, server function, form submission, database call, or external data fetch.

**Value sourcing**:

| Action | Value produced or displayed | Source |
|---|---|---|
| Render page identity | A7Studio and Samuel Gichu | Confirmed by the scope and visual reference names |
| Render selected work | Seven project names and selected work grouping | User confirmed names in this design conversation and scope |
| Render product lab | Kakitoo, Good Call upcoming project, AI assisted experiments | Scope and user confirmed lab list |
| Render Kakitoo link | `https://kakitoo.com` | Existing link in `design/code.html`, confirmed by user |
| Render LinkedIn contact | Profile URL | Existing link in `design/code.html`, confirmed by user |
| Render page metadata | Page title, neutral description, canonical URL, LinkedIn social URL | Confirmed page identity, page purpose, and `https://a7studio.dev/` |
| Render responsive navigation | Work, Lab, and Contact anchors | Named page sections in this spec |

**Key invariants**:
- Every displayed factual project detail and outbound URL must be confirmed in the current worktree before it is added.
- Project entries without a confirmed URL remain non interactive.
- Good Call is always labeled as an upcoming project until more details are confirmed.
- The page does not claim a role, project status, description, metric, availability, or result that has not been confirmed.
- Portfolio content remains static. The page makes no application data request.
- There is exactly one public page route for this feature.

**Security model**:

The page is public and read only. It has no user accounts, private data, visitor input, analytics, tracking, or secrets. The browser navigates directly to the confirmed LinkedIn and Kakitoo links. No compliance scope is introduced.

**Configuration required**:

None. No environment variables, credentials, database, hosting provider, analytics service, or external font service is selected for this feature.

**Visual design**:

- Source: `design/code.html` for visual direction and `docs/scope/scope.md` for content and scope. The reference supplies a dark palette, green accent, restrained grid, and bold type. Its unsupported claims and sample data are not content sources.
- Composition: navigation, introduction, selected work, product lab, contact, footer. The path follows Journey 1 from introduction to proof to contact.
- Components: page specific navigation, selected work cards, lab cards, and footer. Do not create a general component library for one page.
- Layout: one column on narrow screens, two columns on wide screens. Project names and labels remain readable without relying on card images.
- Assets and type: typographic cards and CSS shapes only. Use a system font stack; do not request images or fonts from external services.
- Motion and interaction: minimal feedback only. Respect reduced motion. Use native section anchors without forced smooth scrolling. The mobile menu closes on section selection and Escape.
- Accessibility: semantic landmarks and headings, keyboard operable menu, visible focus, sufficient text contrast, and accessible menu state.
- Metadata: page title, neutral page description, canonical URL `https://a7studio.dev/`, and the confirmed LinkedIn profile as social identity. Do not include an image URL until an approved image exists. Do not include structured data describing unverified projects or biography.

**Critical test scenarios**:
- Happy path: load the prerendered page and find the studio introduction, all seven selected work names, all three lab entries, and the LinkedIn link, verifies **AC-1**, **AC-2**, **AC-3**, **AC-5**, and **AC-6**.
- Mobile navigation: use the menu by keyboard and touch, navigate to each section, close with Escape, and confirm the menu state and focus are visible, verifies **AC-4** and **AC-7**.
- Responsive and accessible page: inspect narrow and wide layouts, keyboard focus, contrast, and reduced motion behavior, verifies **AC-7**.
- Link safety: confirm Kakitoo and LinkedIn use the confirmed same tab destinations and that entries with no URL are not links, verifies **AC-2**, **AC-3**, and **AC-8**.
- Metadata: inspect generated page metadata for the canonical URL and neutral description, and confirm no missing image or unverified project claims are published, verifies **AC-5**.
- Static behavior: serve the generated page without a backend and confirm no API, server function, analytics, or external font request is required, verifies **AC-6** and **AC-8**.

## Build plan

The scope records Journey as the build approach, so complete the single visitor journey in order rather than splitting disconnected layers.

1. Scaffold TanStack Start with React and TypeScript using the root pnpm version, configure static prerendering for the single public page, and add Tailwind CSS v4 with its Vite plugin, satisfies **AC-6**.
2. Build the page shell, responsive section navigation, neutral introduction, and semantic section landmarks, satisfies **AC-1**, **AC-4**, and **AC-7**.
3. Add the typed static project entries and selected work and lab cards, ensuring unconfirmed project URLs and facts are absent, satisfies **AC-2**, **AC-3**, and **AC-8**.
4. Add the LinkedIn contact path, footer, and confirmed page metadata, then check the generated page for unsupported claims and missing asset references, satisfies **AC-5** and **AC-8**.
5. Verify mobile and desktop layout, menu keyboard behavior, reduced motion and focus access, outbound links, metadata, and static output without backend calls, satisfies **AC-1** through **AC-8**.

## Consequences

**Positive**:
- Visitors can follow a direct path from studio introduction to project names and confirmed contact links.
- Static project content has no database or service dependency.
- Prerendering provides static HTML while retaining a future server boundary in the chosen framework.
- Unsupported reference claims, links, and assets do not become published content.

**Negative / tradeoffs**:
- TanStack Start adds setup and framework maintenance for a page that could be served as plain HTML.
- The future server option requires a server capable deployment if server features are later used. No host is selected here.
- Static project content requires a code change and rebuild when names or confirmed links change.
- The framework is currently documented as a release candidate, which creates upgrade and compatibility risk.

**Neutral**:
- Supabase is a future provider preference, not a dependency or infrastructure decision for this page.
- Project descriptions, contribution details, additional URLs, biography, and social preview artwork remain absent until verified and supplied.

## Follow-up

- [ ] Consider a TanStack Start community skill before implementation. Optional guidance could document framework specific route, prerender, and server conventions.
- [ ] Choose a hosting provider only when deployment requirements are known. It must support static output, and it must support the chosen server runtime if future server features are deployed.
- [ ] Revisit the Supabase preference if a future feature introduces persistent application data. Define that feature's data, security, and deployment requirements before adding the provider.

## References

**Project sources**:
- `AGENTS.md`, repository workflow and engineering constraints.
- `docs/scope/scope.md`, portfolio requirements, Journey build approach, and Alpha verification level.
- `design/code.html`, visual direction and existing Kakitoo and LinkedIn destinations.
- `package.json`, root package manager version.

**Practices & standards**:
- Progressive enhancement and static delivery for content that needs no request time data.
- Semantic HTML and keyboard operability for public page controls.

**Links**:
- TanStack Start overview: https://tanstack.com/start/latest/docs/framework/react/overview
- TanStack Start static prerendering: https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering
- TanStack Router overview: https://tanstack.com/router/v1/docs/framework/react/overview
- Tailwind CSS Vite installation: https://tailwindcss.com/docs/installation/using-vite
