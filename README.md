# agentic-web-template

A reusable foundation for building web applications with an agentic
software development workflow, built on the
[JS Mastery skills](https://github.com/jsmastery-pro/skills).

The template deliberately ships **no application stack**. Each derived
project chooses its framework, language tooling, and services through the
workflow itself, so the same template works for any web project.

## What is inside

- `AGENTS.md` — project rules every AI agent reads (with a `CLAUDE.md`
  pointer for Claude Code)
- `.agents/skills/` — the vendored JS Mastery workflow skills
  (`/scope`, `/architect`, `/audit`, `/develop`, `/check`, `/test`,
  `/document`, `/sync`, `/debug`), pinned in `skills-lock.json`
- `docs/` — living project knowledge:
  - `product.md`, `architecture.md`, `design.md` — guided skeletons
  - `development.md` — the workflow contract
  - `scope/` — the living plan (created by `/scope`)
  - `specs/` — feature and decision specifications (owned by `/architect`)
  - `decisions/` — ADRs for rare project level decisions
  - `reviews/` — output of `/check review`

## Adopting this template

1. Create a new repository from this template (or clone and re-initialize
   git history).
2. Rename the package in `package.json` (`"name"`) and update the README
   title.
3. Fill in `docs/product.md` (or let `/scope` interview you and draft it).
4. Run `/scope` to produce the living plan in `docs/scope/`.
5. Run `/architect` to choose the stack and foundational architecture. This
   is where the technology decisions happen, recorded in
   `docs/architecture.md` and a spec.
6. Scaffold the application from that decision.
7. Run `/audit` so project context and guardrails are captured from the
   real scaffold (lint, format, typecheck, tests, CI).

From there, every feature follows the pipeline in `docs/development.md`:
`/architect` → `/develop` → verify, test, review (scaled by the feature's
workflow tier) → `/document` → `/sync`.

## Conventions worth knowing

- **Workflow tiers** (`Prototype`, `Alpha`, `Beta`, `GA`) scale how much
  process each feature gets. `/scope` records the project default; features
  can override it.
- **Git**: Conventional Commits, one line subjects, feature branches
  (`feat/`). This project does **not** use `Co-Authored-By` or other tool
  attribution trailers.
- **Knowledge lives in the repo**, not in chat. Specs, the scope, and
  `AGENTS.md` are the durable handoff between sessions.

## Updating the skills

The vendored skills are pinned by hash in `skills-lock.json`. To update,
reinstall them from `jsmastery-pro/skills` with the same tooling that
created the lock file, review the diff, and check `docs/development.md`
still matches the workflow the skills implement.

## License

ISC. See [LICENSE](./LICENSE).
