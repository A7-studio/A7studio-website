# Agent Instructions

## Purpose

This repository is a reusable foundation for building web applications with an agentic software development workflow.

The project combines:

- Project-level engineering rules
- Product and architectural documentation
- Feature specifications
- Decision records
- JS Mastery development skills
- Automated quality gates where appropriate

The goal is to make development:

- Understandable
- Repeatable
- Traceable
- Testable
- Reviewable
- Incrementally safer

The repository is intentionally **framework-agnostic**. The application stack is selected by the project and documented in `docs/architecture.md`.

---

## Source of Truth

When making decisions or implementing changes, use the following hierarchy:

1. Security and repository constraints
2. `docs/product.md`
3. `docs/architecture.md`
4. `docs/design.md`
5. `docs/development.md`
6. `docs/scope/`
7. `docs/specs/`
8. `docs/decisions/`
9. Existing project patterns
10. Agent implementation preference

If sources conflict, do not silently choose one.

Identify the conflict and resolve it through the appropriate documentation or decision record.

---

## Project Context

The following documents define the project:

| Document               | Purpose                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| `docs/product.md`      | Product purpose, users, goals, scope, and constraints                      |
| `docs/architecture.md` | Technology, boundaries, data flow, infrastructure, and architectural rules |
| `docs/design.md`       | Visual language, interaction patterns, accessibility, and UI conventions   |
| `docs/development.md`  | Development workflow and engineering process                               |
| `docs/scope/`          | Features, initiatives, lifecycle, and current implementation scope         |
| `docs/specs/`          | Detailed feature specifications                                            |
| `docs/decisions/`      | Important architectural and product decisions                              |

These documents are part of the product.

They are not optional supporting notes.

---

## Build Approach

Build approach: agentic development using JS Mastery Skills with project-level documentation and progressively enforced engineering guardrails.

The workflow should remain compatible with the installed skills under `.agents/skills/`.

Do not duplicate the responsibilities of the installed skills inside this file.

---

## Workflow

The repository uses the JS Mastery workflow as its development engine.

Typical workflows include:

### Greenfield

```text
/scope
  ↓
/architect
  ↓
Establish project architecture
  ↓
Scaffold
  ↓
/audit
```

### Feature

```text
/architect
  ↓
/develop
  ↓
/check verify
  ↓
/test
  ↓
/check review
  ↓
/document
  ↓
/sync
```

### Bug

```text
/debug
  ↓
/test
  ↓
/check verify
  ↓
/sync
```

These are **not mandatory fixed pipelines**.

The appropriate workflow is determined by the feature's scope, risk, and rigor level.

---

## Rigor Levels

Features should use an appropriate rigor level.

The project recognizes four broad levels:

### Prototype

Optimize for learning and validation.

Prefer:

- Fast implementation
- Minimal ceremony
- Basic verification
- Small experiments

Do not introduce production-level process overhead unless necessary.

### Alpha

Optimize for reliable core behavior.

Expected:

- Clear feature scope
- Appropriate architecture
- Basic behavioral tests
- Runtime verification for important paths
- Documentation of meaningful decisions

### Beta

Optimize for stability and regression prevention.

Expected:

- Stronger test coverage
- Runtime verification
- Review
- Security consideration
- Documentation
- Synchronization of project knowledge

### GA

Optimize for production reliability.

Expected:

- Full architectural alignment
- Behavioral tests
- Runtime verification
- Independent review
- Security review where relevant
- Documentation
- Synchronized project knowledge
- Automated quality gates where available

A feature may move between rigor levels as the product matures.

Do not apply GA-level process to every prototype automatically.

---

## Before Coding

Before implementing a change:

1. Understand the requirement.
2. Identify the feature or scope item.
3. Read the relevant project documentation.
4. Search the repository for existing patterns.
5. Identify existing components, utilities, services, hooks, schemas, and abstractions that may already solve the problem.
6. Determine whether a feature specification exists.
7. Determine whether architectural decisions are affected.
8. Identify security, accessibility, performance, and data implications.
9. Choose the appropriate rigor level.
10. Plan the smallest coherent implementation.

Do not start by writing code simply because the requested change appears small.

First understand where the change belongs.

---

## Greenfield Architecture

For a new project, `docs/architecture.md` must be established before substantial application implementation begins.

The architecture document is the source of truth for the system-level architecture.

It should establish, at minimum:

- Technology stack
- Runtime boundaries
- Application boundaries
- Module boundaries
- Data flow
- State management
- API conventions
- Data access strategy
- Authentication
- Authorization
- Validation
- Error handling
- Security boundaries
- Testing strategy
- Deployment approach
- Dependency rules

The architecture may initially be marked `Draft`, but it must contain the project's actual architectural direction once those decisions have been made.

Do not leave `docs/architecture.md` as an empty template while building the application.

If an important architectural decision has not yet been made, document it under `Open Architectural Questions` rather than silently assuming an answer.

---

## Architecture Responsibilities

There are three related but different levels of architectural information.

### Project Architecture

Located in:

```text
docs/architecture.md
```

Defines the system-level architecture.

It answers:

> How is the application structured as a system?

### Feature Architecture

Normally captured through:

```text
docs/specs/
```

and, when appropriate:

```text
docs/decisions/
```

It answers:

> How does this feature fit into the existing system?

### Implementation

The actual source code implements those decisions.

The relationship is:

```text
Product
   ↓
Project Architecture
   ↓
Feature Specification
   ↓
Implementation
```

Feature implementation must fit within the project architecture unless a documented architectural change is being made.

---

## Search Before Creating

Before creating a new:

- Component
- Hook
- Utility
- Service
- API handler
- Schema
- State abstraction
- Database abstraction
- Validation helper
- UI pattern
- Shared type

search the repository first.

Prefer extending or composing an existing canonical pattern when appropriate.

Create a new abstraction when:

- An existing abstraction does not satisfy the requirement
- Reuse would make the existing abstraction less coherent
- The new abstraction establishes a meaningful boundary
- The architectural documentation supports it

Avoid duplicate abstractions with slightly different names or behavior.

---

## Architecture

Implementation must respect `docs/architecture.md`.

Before introducing a new architectural pattern, determine:

- Why the existing architecture is insufficient
- Whether the change affects module boundaries
- Whether data flow changes
- Whether dependencies cross an architectural boundary
- Whether authentication or authorization changes
- Whether persistence changes
- Whether infrastructure changes

Significant architectural changes should be recorded in `docs/decisions/`.

Do not introduce framework-specific patterns merely because they are familiar.

If implementation and architecture diverge intentionally, update the architecture documentation.

---

## Design

UI work must respect `docs/design.md`.

Before creating new UI:

1. Search for an existing component or pattern.
2. Reuse existing tokens and primitives.
3. Follow established spacing, typography, color, and layout rules.
4. Preserve interaction consistency.
5. Consider loading, empty, error, disabled, and success states.
6. Consider responsive behavior.
7. Consider accessibility.

Do not introduce a second visual language for a feature.

---

## Product Scope

Product requirements are defined by `docs/product.md` and `docs/scope/`.

Do not expand a feature beyond its defined scope without documenting the change.

Avoid speculative functionality.

If implementation reveals an important product ambiguity:

1. Stop and identify the ambiguity.
2. Resolve it through the appropriate product documentation or decision record.
3. Continue implementation only after the intended behavior is clear.

---

## Specifications

Feature specifications live under `docs/specs/`.

A specification should describe:

- The problem
- User intent
- Requirements
- Acceptance criteria
- Important states
- Data requirements
- API requirements
- Security considerations
- Accessibility
- Testing expectations
- Non-goals

Specifications should describe **what the feature must accomplish**, not unnecessarily prescribe implementation details.

The architecture determines implementation.

---

## Decision Records

Important decisions live under `docs/decisions/`.

Use a decision record when a choice has meaningful consequences beyond a single implementation.

Examples:

- Choosing a database
- Choosing an authentication strategy
- Choosing a state-management approach
- Establishing an architectural boundary
- Selecting between competing infrastructure approaches
- Making a decision that future developers would reasonably question

Do not create decision records for ordinary implementation details.

---

## Minimal Change Principle

Prefer the smallest coherent change that satisfies the requirement.

Avoid:

- Unrelated refactors
- Opportunistic rewrites
- Unnecessary dependencies
- Premature abstractions
- Large architectural changes for small features
- Formatting unrelated files
- Changing existing behavior without a requirement

A clean implementation is not necessarily a large implementation.

---

## Type Safety

When the selected stack supports static typing:

- Prefer explicit types
- Avoid `any`
- Validate external data
- Do not use type assertions to hide uncertainty
- Keep domain types close to their ownership boundary
- Avoid duplicating types unnecessarily

Type safety should eventually be enforced through tooling rather than relying only on this document.

---

## Testing

Tests should verify behavior rather than implementation details.

When behavior changes:

- Add or update appropriate tests.
- Preserve existing regression coverage.
- Do not weaken or delete tests merely to make them pass.
- Prefer tests that express user or system behavior.

The appropriate testing strategy depends on the feature's rigor level.

---

## Verification

Tests and runtime verification are different.

Tests establish repeatable automated behavior.

Verification establishes that the implemented feature works in the actual application environment.

For features requiring runtime verification:

- Start the relevant application
- Exercise the important user path
- Verify expected behavior
- Verify important failure states
- Verify relevant permissions or authentication behavior
- Check the relevant UI states where applicable

Use `/check verify` for this workflow when appropriate.

---

## Security

Never:

- Commit secrets
- Expose credentials
- Disable security controls to make development easier
- Bypass authentication or authorization
- Trust client-provided authorization decisions
- Log sensitive information unnecessarily
- Store secrets in source code
- Weaken validation to bypass errors

External input must be treated as untrusted.

Security-sensitive changes require additional scrutiny appropriate to their risk.

---

## Dependencies

Before adding a dependency:

1. Check whether the project already has a suitable capability.
2. Determine whether the dependency is necessary.
3. Consider maintenance and security implications.
4. Check whether it fits the architecture.
5. Keep the dependency focused on a real requirement.

Do not add dependencies merely for convenience when a simple existing project abstraction is sufficient.

---

## Git

integration: on

Git operations performed through the development workflow should follow the conventions established by the installed JS Mastery Git workflow.

Keep commits:

- Small
- Focused
- Related to one coherent change
- Easy to review

Do not mix unrelated work into a feature commit.

---

## Documentation

Documentation is part of implementation.

When a change affects:

- Product behavior
- Architecture
- Design
- Feature scope
- Important decisions
- Developer workflow

update the relevant project documentation.

Do not allow the implementation and project knowledge to drift apart.

Use `/document` and `/sync` when appropriate.

---

## Agent Behavior

Agents should:

- Inspect before modifying.
- Search before creating.
- Reuse established patterns.
- Ask for clarification when requirements are materially ambiguous.
- Keep changes focused.
- Explain important tradeoffs.
- Preserve existing behavior unless change is intentional.
- Prefer repository evidence over assumptions.
- Update project knowledge when the implementation changes it.

Agents should not:

- Invent APIs or architecture
- Create duplicate abstractions unnecessarily
- Rewrite unrelated code
- Ignore existing project conventions
- Treat generated code as automatically correct
- Hide failures by weakening checks
- Make large changes without establishing scope

---

## Definition of Done

A change is complete when the appropriate requirements for its rigor level have been satisfied.

At minimum:

- The requirement is implemented.
- The implementation fits the documented architecture.
- Existing patterns were considered.
- Relevant states and edge cases were handled.
- Appropriate tests exist or the reason for not adding them is understood.
- Appropriate runtime verification has been completed.
- Documentation is updated when necessary.
- No unrelated changes were introduced.

For production-level work, automated quality gates should also pass.

---

## Continuous Improvement

The repository should evolve its guardrails based on real development failures.

When a repeated mistake occurs:

1. Identify the failure.
2. Determine whether documentation would prevent it.
3. Determine whether tooling could prevent it more reliably.
4. Add an automated check when practical.
5. Update the relevant documentation.

The progression should generally be:

```text
Instruction
    ↓
Convention
    ↓
Tooling
    ↓
Automated Check
    ↓
CI Enforcement
```

Do not build elaborate tooling before the problem has actually appeared.

---

## Guiding Principle

The desired development path is:

```text
Understand
   ↓
Scope
   ↓
Specify
   ↓
Establish Architecture
   ↓
Implement
   ↓
Verify
   ↓
Test
   ↓
Review
   ↓
Document
   ↓
Synchronize
```

The exact stages may vary according to feature rigor.

The goal is not process for its own sake.

The goal is to make the **correct path easy and the incorrect path difficult**.
