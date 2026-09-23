# Agent Guidelines

## Purpose

This repository is a reusable foundation for building web
applications using an agentic software development workflow.

The project uses the JS Mastery Skills workflow.

The technology stack is intentionally undecided. Each
derived project chooses its stack through `/architect` and
records it in `docs/architecture.md` and a spec.

The repository documentation and automated checks define
the project's constraints.

---

## Source of Truth

Before making changes, understand the relevant:

- `docs/product.md`
- `docs/architecture.md`
- `docs/design.md`
- `docs/development.md`
- `docs/scope/`
- `docs/specs/`
- `docs/decisions/`

Do not invent requirements that are not supported by the
project documentation.

---

## Development Workflow

Use the JS Mastery workflow:

1. `/scope`
2. `/architect`
3. scaffold
4. `/audit`
5. `/develop`
6. `/check verify`
7. `/test`
8. `/check review`
9. `/document`
10. `/sync`

Use `/debug` when investigating bugs.

The list above is the full rigor path. The skills scale it
per feature through workflow tiers (`Prototype`, `Alpha`,
`Beta`, `GA`): `/scope` records a project default tier in
`docs/scope/`, and any feature may carry its own override.
Lower tiers intentionally skip later stages such as
verification, testing, and review. Follow the effective
tier, and do not skip stages beyond what it allows without
a clear reason.

---

## Git

- integration: on
- branch prefix: feat/
- commit: per-milestone

Commit messages use a one line Conventional Commit subject
with no body. The reasoning behind a change belongs in the
specification and the pull request.

Project override: do not add `Co-Authored-By` or any other
tool attribution trailers to commits. This overrides the
default in the installed develop skill.

Never push or open a pull request without explicit
confirmation.

---

## Before Coding

Before modifying code:

1. Understand the requirement.
2. Read relevant project documentation.
3. Search the existing codebase.
4. Identify existing patterns.
5. Identify the canonical implementation.
6. Determine architectural impact.
7. Create or consult the relevant specification.

---

## Search Before Creating

Before creating a:

- component
- hook
- utility
- service
- API handler
- schema
- database abstraction
- state-management abstraction

search the existing codebase first.

Prefer extending existing patterns over introducing
new patterns.

---

## Architecture

Follow `docs/architecture.md`.

Do not introduce architectural patterns that conflict
with the documented architecture.

If a requirement requires an architectural change:

1. identify the conflict
2. explain the impact
3. update the architectural documentation or ADR
4. then implement the change

---

## Design

Follow `docs/design.md`.

Prefer existing:

- components
- tokens
- layouts
- interaction patterns
- states

Do not create duplicate design-system primitives.

---

## Code Quality

Prefer:

- simple solutions
- explicit boundaries
- strong typing
- small focused changes
- composition
- existing project conventions

Avoid:

- unnecessary abstractions
- premature optimization
- unrelated refactoring
- duplicated logic
- unexplained dependencies

---

## Type Safety

Avoid `any`.

External data must be validated at system boundaries.

Do not use type assertions to hide genuine type errors.

---

## Testing

Behavioral changes require appropriate tests.

Tests should verify behavior rather than implementation
details whenever practical.

Do not delete or weaken tests simply to make an
implementation pass.

---

## Security

Never:

- expose secrets
- bypass authentication
- bypass authorization
- trust client-controlled authorization data
- disable security checks to make tests pass

Validate untrusted input at system boundaries.

---

## Minimal Changes

Modify only what is necessary to complete the task.

Do not change unrelated files.

Do not introduce dependencies without justification.

---

## Definition of Done

A task is complete only when:

- requirements are satisfied
- architecture is respected
- existing patterns were considered
- types pass
- lint passes
- relevant tests pass
- runtime behavior is verified where appropriate
- documentation is updated when necessary
- no unrelated changes remain
