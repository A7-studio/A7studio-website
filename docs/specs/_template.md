# Spec Template (Summary)

Specifications in this directory are written and owned by `/architect`.
The canonical, always current template lives with the installed skill:

```text
.agents/skills/architect/spec-template.md
```

This file is a human readable summary. If the two ever disagree, the skill
template wins and this summary should be updated.

## File naming

- Single file spec: `NNNN-kebab-case-title.md`
- Directory spec (heavier decisions): `NNNN-kebab-case-title/` with
  `index.md` (the build spec) and `rationale.md` (the decision record)

## Status lifecycle

```text
Proposed → In Progress → Accepted
```

- `Assumed`: the feature was built before the decision was deliberated.
  The spec owes ratification by `/architect` and does not block `done`.
- `Superseded`: replaced by a newer spec, kept for history.

## What a spec contains

A spec serves two audiences:

- **Build spec** (read by `/develop`, checked by `/check verify`):
  Requirements (the acceptance criteria are the contract), Decision,
  the design section (Feature design, Proposed stack, or Standard
  definition), Build plan, Consequences.
- **Decision record** (the why, for humans): Summary, Context, Options
  considered, Rationale, References.

One decision per spec. Split sprawling decisions into an umbrella spec with
child specs rather than letting one file grow without bound.

