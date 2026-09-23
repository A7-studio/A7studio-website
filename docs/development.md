# Development Workflow

This project uses an agentic software development workflow based on the JS Mastery Skills.

The purpose of this workflow is to make development:

- structured
- repeatable
- traceable
- testable
- reviewable
- progressively safer

Agents should not treat the conversation as the primary source of project knowledge. Important decisions, requirements, specifications, and discoveries should be persisted in the repository.

---

# 1. Core Principles

## 1.1 Repository First

The repository is the source of truth.

Important project knowledge should live in:

- `AGENTS.md`
- `docs/product.md`
- `docs/architecture.md`
- `docs/design.md`
- `docs/scope/`
- `docs/specs/`
- `docs/decisions/`
- source code
- tests
- configuration

Do not rely on information existing only in the current conversation.

---

## 1.2 Understand Before Implementing

Agents should understand the problem before modifying code.

For non-trivial work:

1. Understand the requirement.
2. Read the relevant documentation.
3. Search the existing codebase.
4. Identify existing patterns.
5. Determine architectural impact.
6. Create or consult a specification.
7. Produce an implementation plan.
8. Implement.
9. Verify.
10. Test.
11. Review.
12. Document and synchronize project state.

---

## 1.3 Search Before Creating

Before creating a new:

- component
- hook
- utility
- service
- API handler
- schema
- database abstraction
- state-management abstraction
- validation utility
- design-system primitive

search the existing codebase.

Prefer reusing or extending an existing pattern over creating a new one.

Duplicate abstractions should only be introduced when there is a documented reason.

---

## 1.4 Small, Coherent Changes

Prefer small, focused changes.

A change should generally:

- solve one problem
- affect the smallest reasonable surface area
- avoid unrelated refactoring
- avoid unnecessary dependency changes
- preserve existing behavior outside the intended scope

Large changes should be decomposed into smaller independently verifiable steps where practical.

---

## 1.5 Documentation Is Part of Development

Documentation is not an afterthought.

If implementation changes an important assumption about:

- architecture
- product behavior
- design
- security
- data
- dependencies
- development workflow

the relevant documentation must be updated.

If the decision is significant or difficult to reverse, create an Architecture Decision Record in:

```text
docs/decisions/
```

---

# 2. Project Knowledge Hierarchy

When determining how to implement something, use the following hierarchy:

```text
1. Security constraints
2. Product requirements
3. Architecture
4. Design system
5. Existing project patterns
6. Feature specification
7. Agent implementation preference
```

Agent preferences must not override documented project constraints.

If two project documents conflict:

1. identify the conflict
2. do not silently choose one
3. determine which source is authoritative
4. update the documentation if necessary
5. then proceed

---

# 3. JS Mastery Workflow

This project uses the JS Mastery Skills as the primary development workflow.

The standard lifecycle is:

```text
/scope
   ↓
/architect
   ↓
scaffold
   ↓
/audit
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

Bug investigation uses:

```text
/debug
```

The exact commands may vary depending on the installed agent and available skills, but the workflow principles remain the same.

The living plan lives in `docs/scope/` and is owned by `/scope`. The other skills scan it to find features, their status, and the next step.

## 3.1 Workflow Tiers

The pipeline above describes full rigor. The skills scale it per feature through workflow tiers:

| Tier | What runs after `/develop` |
|------|----------------------------|
| Prototype | nothing beyond the build's own self check |
| Alpha | `/check verify` |
| Beta | `/check verify` + `/test` |
| GA | adds `/check review` + `/document` |

`/scope` recommends and records one project default tier on the scope header `**Workflow:**` line. Any feature can carry its own override tag (for example `· GA` beside its heading). Follow the effective tier instead of running every stage for every feature.

---

# 4. Greenfield Project Workflow

A new project should not begin with arbitrary feature implementation.

The recommended sequence is:

```text
Project Idea
     ↓
/scope
     ↓
/architect
     ↓
Scaffold
     ↓
/audit
     ↓
Feature Development
```

---

## 4.1 Scope

Use:

```text
/scope
```

to establish the product direction.

The scope should clarify:

- product purpose
- problem being solved
- target users
- primary workflows
- MVP boundaries
- non-goals
- major constraints
- success criteria

The scope should not attempt to specify every implementation detail.

Product decisions belong in product documentation.

---

## 4.2 Architecture

Use:

```text
/architect
```

to determine how the product should be implemented.

Architecture should consider:

- application structure
- frontend architecture
- backend architecture
- data architecture
- API boundaries
- authentication
- authorization
- state management
- validation
- error handling
- testing
- deployment
- observability
- security
- dependency boundaries

Important architectural decisions should be recorded in:

```text
docs/architecture.md
```

or as an ADR in:

```text
docs/decisions/
```

---

## 4.3 Scaffold

Once the architecture is established, scaffold the application.

The scaffold should establish:

- framework
- language
- package manager
- source structure
- testing infrastructure
- linting
- formatting
- environment configuration
- build system
- development commands

Do not add unnecessary application features during scaffolding.

---

## 4.4 Audit

After the project has been scaffolded, run:

```text
/audit
```

The audit should verify that:

- project documentation exists
- architecture is represented correctly
- project conventions are clear
- `AGENTS.md` contains the required project context
- tooling is configured correctly
- important guardrails exist
- documentation and implementation are not obviously inconsistent

The audit should identify missing guardrails before significant feature development begins.

---

# 5. Feature Development Workflow

Every non-trivial feature should follow:

```text
Requirement
    ↓
/architect
    ↓
Specification
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

---

# 6. Feature Specification

Feature specifications live in:

```text
docs/specs/
```

Specifications are owned by `/architect`. The canonical, always current template is `.agents/skills/architect/spec-template.md`; `docs/specs/_template.md` is a summary copy for humans.

Spec status lifecycle:

```text
Proposed → In Progress → Accepted
```

Two further statuses exist: `Assumed` (the feature was built before the decision was deliberated; the spec owes ratification by `/architect`) and `Superseded` (replaced by a newer spec).

Specifications are the canonical record for technical and feature decisions. ADRs in `docs/decisions/` are reserved for rare project level decisions that sit outside the feature pipeline, such as changing this workflow itself. When in doubt, write a spec.

A feature specification should establish:

- problem
- user story
- requirements
- acceptance criteria
- technical considerations
- data requirements
- API requirements
- security considerations
- accessibility requirements
- UI states
- testing requirements
- non-goals

The specification should answer:

> What does success look like?

before implementation begins.

---

# 7. Architecture Before Implementation

For a non-trivial feature, use:

```text
/architect
```

before:

```text
/develop
```

The architecting phase should determine:

- affected modules
- affected data
- affected APIs
- affected UI
- dependencies
- architectural risks
- testing strategy
- migration requirements

The resulting specification should be treated as the implementation contract.

If implementation reveals that the specification is incorrect or incomplete:

1. stop at the relevant boundary
2. identify the issue
3. update the specification
4. update architecture if necessary
5. continue implementation

Do not silently redesign the feature during implementation.

---

# 8. Implementation

Use:

```text
/develop
```

to implement the approved specification.

Implementation should:

- follow the architecture
- follow existing patterns
- reuse existing abstractions
- minimize unrelated changes
- maintain type safety
- maintain accessibility
- maintain security boundaries
- include appropriate tests

The implementation should not introduce new architecture merely because it appears convenient.

---

# 9. Verification

After implementation, use:

```text
/check verify
```

Verification should establish that the feature actually behaves as required.

Verification should test acceptance criteria and important user workflows.

Where applicable, verify:

- happy path
- validation
- error handling
- loading behavior
- empty states
- permissions
- authentication
- responsive behavior
- accessibility
- integration behavior
- persistence
- external API behavior

Verification is different from simply checking whether the code compiles.

---

# 10. Testing

Use:

```text
/test
```

after implementation and verification.

Tests should be derived from:

- acceptance criteria
- documented requirements
- public behavior
- important failure modes
- regression risks

Prefer testing behavior over implementation details.

Use the appropriate testing level:

```text
Unit
  ↓
Integration
  ↓
End-to-End
```

Not every feature requires every testing level.

Testing should be proportional to the risk and scope of the change.

---

# 11. Code Review

After verification and tests, use:

```text
/check review
```

The review should evaluate the implementation independently from the original implementation process.

Review for:

### Correctness

Does the implementation satisfy the specification?

### Architecture

Does it respect project boundaries?

### Maintainability

Is the solution unnecessarily complex?

### Duplication

Did it introduce another abstraction that already exists?

### Security

Are authentication, authorization, validation, and data handling safe?

### Testing

Are the tests meaningful, behavior focused, and proportional to the risk of the change?

### Accessibility

Does the change maintain the documented accessibility expectations?

### Scope

Does the change avoid unrelated modifications and unnecessary complexity?

---

# 12. Documentation

After review, use:

```text
/document
```

to produce the human facing record of the change:

- pull request description
- changelog entry
- release note
- postmortem, when an incident occurs

Documentation is written from the real commit history and diff, never from memory or intention.

---

# 13. Synchronization

The final step of the workflow is:

```text
/sync
```

Synchronization keeps durable project knowledge aligned with what the repository actually shows:

- `AGENTS.md` files reflect new conventions
- the scope in `docs/scope/` reflects what actually shipped
- spec status lines reflect feature progress
- stale specifications are flagged for `/architect`

Synchronization makes surgical updates only. It never rewrites curated documentation; it flags anything that needs a human decision.

---

# 14. Git Conventions

Commits follow Conventional Commits with a one line subject and no body:

```text
feat(auth): add session persistence
```

Do not add `Co-Authored-By` or any other tool attribution trailers. The reasoning behind a change belongs in the specification and the pull request, not the commit message.

Feature work happens on branches prefixed with `feat/` (`fix/` or `refine/` for other change types), never directly on the default branch.

Pushing and opening pull requests always require explicit confirmation.
