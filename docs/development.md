# Development Workflow

## Purpose

This project uses an agentic development workflow built around the JS Mastery Skills.

The workflow combines:

- Product requirements
- Project architecture
- Design language
- Feature scope
- Feature specifications
- Decision records
- Agent-driven implementation
- Automated verification
- Human review
- Project knowledge synchronization

The objective is to create a development process that is:

- Repeatable
- Traceable
- Testable
- Reviewable
- Appropriate to the maturity of the feature
- Progressively safer as the product approaches production

This document describes how the project uses the installed skills.

It does not attempt to duplicate the implementation details of those skills.

---

# 1. Development Principles

## 1.1 Repository First

The repository is the primary source of project knowledge.

Important decisions should not exist only in:

- Chat history
- Agent context
- Developer memory
- Temporary prompts

When knowledge becomes important to future development, record it in the appropriate project document.

---

## 1.2 Understand Before Implementing

Implementation should begin with understanding.

Before writing code:

1. Identify the requirement.
2. Identify the relevant scope item.
3. Read the relevant project documentation.
4. Search the repository.
5. Identify existing patterns.
6. Determine architectural implications.
7. Determine the appropriate rigor level.
8. Create or consult the feature specification.
9. Plan the implementation.

---

## 1.3 Search Before Creating

Agents should search for existing solutions before creating new:

- Components
- Hooks
- Utilities
- Services
- API handlers
- Schemas
- State abstractions
- Validation logic
- Database helpers
- UI patterns

The goal is not maximum reuse.

The goal is **canonical reuse**.

If an existing abstraction is the correct place for the behavior, extend it.

If extending it would make the abstraction incoherent, create a new boundary.

---

## 1.4 Small Coherent Changes

Prefer changes that:

- Have one clear purpose
- Are easy to review
- Are easy to test
- Minimize unrelated risk

Avoid combining:

- Feature work
- Large refactors
- Dependency migrations
- Formatting changes
- Architecture changes

unless they are genuinely part of the same change.

---

## 1.5 Documentation Is Part of Development

Documentation should evolve with the implementation.

When implementation changes project knowledge, update the appropriate documentation.

The objective is to avoid:

```text
Documentation
      ≠
Implementation
```

The desired state is:

```text
Documentation
      =
Implementation
```

---

# 2. Project Knowledge Hierarchy

When sources disagree, use this order:

1. Security constraints
2. Product requirements
3. Architecture
4. Design language
5. Development workflow
6. Feature scope
7. Feature specifications
8. Existing implementation patterns
9. Agent preference

Conflicts should be surfaced rather than silently resolved.

---

# 3. Greenfield Lifecycle

A new project has an additional responsibility that feature work does not:

> Establish the system-level architecture before substantial implementation begins.

The greenfield lifecycle is:

```text
/scope
   ↓
/architect
   ↓
Establish Project Architecture
   ↓
Scaffold
   ↓
/audit
```

Each stage has a different responsibility.

---

## 3.1 `/scope`

The scope stage establishes **what the product intends to build**.

It should establish:

- Initial product scope
- Features
- User value
- Priorities
- Non-goals
- Dependencies
- Feature rigor
- Initial lifecycle status

Scope information lives under:

```text
docs/scope/
```

Scope should not be used as a substitute for architecture.

---

## 3.2 `/architect`

The architect stage translates scoped features into implementation-ready specifications.

It should establish:

- User intent
- Functional requirements
- Non-functional requirements
- Acceptance criteria
- UI states
- Data requirements
- API requirements
- Security considerations
- Accessibility
- Testing expectations
- Technical considerations

Feature specifications live under:

```text
docs/specs/
```

### Important distinction

`/architect` does not replace project-level architecture.

The feature architecting process answers:

> How should this feature behave and fit into the system?

The project architecture answers:

> How is the entire application structured?

---

## 3.3 Establish Project Architecture

Before substantial application code is generated, establish:

```text
docs/architecture.md
```

This document is the source of truth for the system-level architecture.

At minimum, establish:

- Architecture overview
- Technology stack
- Runtime boundaries
- Application boundaries
- Module boundaries
- Data flow
- State management
- API conventions
- Data access
- Authentication
- Authorization
- Validation
- Error handling
- Security
- Testing strategy
- Deployment
- Dependency rules
- Architectural constraints

The architecture can initially be marked:

```text
Status: Draft
```

but it should contain the actual architectural direction rather than remaining a blank template.

If an architectural question has not been resolved, record it under:

```text
Open Architectural Questions
```

Do not silently invent an answer.

---

## 3.4 Architecture Before Scaffold

Scaffolding should implement an established architectural direction.

The desired sequence is:

```text
Product Scope
     ↓
Feature Understanding
     ↓
Project Architecture
     ↓
Application Scaffold
```

This does not mean every implementation detail must be decided in advance.

The architecture should establish the important boundaries and technology choices while allowing implementation details to emerge during development.

---

## 3.5 `/audit`

After scaffolding, `/audit` verifies the relationship between:

```text
Documentation
     ↕
Implementation
```

The audit should consider:

### Project Context

Is the project documentation present and useful?

### Architecture

Does `docs/architecture.md` describe the actual project?

### Stack

Does the implementation use the documented technologies?

### Boundaries

Do application and module boundaries match the architecture?

### Dependencies

Do dependency directions follow the documented rules?

### Data

Does actual data flow match the documented model?

### Security

Do authentication, authorization, validation, and trust boundaries match the documented architecture?

### Testing

Does the actual testing setup reflect the documented strategy?

### Workflow

Are the project instructions compatible with the installed skills?

Audit findings should become improvements to the project's guardrails where appropriate.

---

# 4. Workflow Rigor

The project does not use one fixed development pipeline.

Instead, work is performed according to an appropriate rigor level.

## Prototype

Primary objective:

> Learn quickly.

Typical characteristics:

- Minimal implementation
- Basic validation
- Limited automated testing
- Fast iteration
- Temporary implementation may be acceptable

Avoid unnecessary production ceremony.

---

## Alpha

Primary objective:

> Establish reliable core behavior.

Typical expectations:

- Defined feature scope
- Appropriate architecture
- Feature specification
- Basic behavioral tests
- Runtime verification for important paths
- Important decisions documented

---

## Beta

Primary objective:

> Reduce regression and operational risk.

Typical expectations:

- Clear specification
- Architectural alignment
- Behavioral tests
- Runtime verification
- Review
- Security consideration
- Documentation
- Project knowledge synchronization

---

## GA

Primary objective:

> Establish production-level reliability.

Typical expectations:

- Complete requirements
- Stable architecture
- Strong behavioral coverage
- Runtime verification
- Independent review
- Security review where appropriate
- Documentation
- Synchronized project knowledge
- Automated quality gates

A feature can move between levels as the product matures.

---

# 5. Feature Development Workflow

The typical feature workflow is:

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

Not every feature requires every stage.

The rigor level determines the required depth.

---

# 6. Feature Specification

A feature should have a clear specification before substantial implementation.

A specification should define:

- Problem
- User story
- Functional requirements
- Non-functional requirements
- Acceptance criteria
- UI states
- Data requirements
- API requirements
- Security considerations
- Accessibility
- Non-goals
- Testing requirements

The specification is a contract for behavior.

It should not become an unnecessarily detailed implementation script.

---

# 7. Scope Management

Scope documents answer:

> What are we building, why are we building it, and where is it in the product lifecycle?

Scope documents live under:

```text
docs/scope/
```

They should track:

- Feature
- Purpose
- Priority
- Rigor
- Status
- Specification
- Dependencies
- Notes

The lifecycle should reflect the actual state of the feature.

Avoid marking work complete simply because code exists.

---

# 8. Project Architecture vs Feature Architecture

These are related but separate concerns.

## Project Architecture

Located at:

```text
docs/architecture.md
```

Defines system-level structure.

Examples:

- Frontend/backend boundary
- Database strategy
- Authentication strategy
- Module boundaries
- API conventions
- Deployment model

## Feature Architecture

Captured through:

```text
docs/specs/
```

and, where appropriate:

```text
docs/decisions/
```

Defines how an individual feature fits within the system.

Examples:

- Which modules own the feature
- Required data flow
- API behavior
- UI state
- New architectural decisions required by the feature

The relationship is:

```text
Project Architecture
        ↓
Feature Architecture
        ↓
Implementation
```

A feature should not silently introduce a second architecture.

If a feature requires changing the project architecture, update `docs/architecture.md` and record the significant decision when appropriate.

---

# 9. Architecture Before Implementation

Before implementing a meaningful feature, determine whether it affects:

- Module boundaries
- Data flow
- State management
- API boundaries
- Authentication
- Authorization
- Persistence
- Infrastructure
- External integrations

If the feature introduces a significant architectural decision, record it under:

```text
docs/decisions/
```

---

# 10. Implementation

Implementation should:

- Follow the specification
- Follow the architecture
- Reuse established patterns
- Respect the design system
- Keep changes focused
- Validate external data
- Preserve security boundaries
- Avoid unnecessary abstractions

Implementation should solve the defined problem rather than expand the product.

---

# 11. Verification

Verification answers:

> Does the implemented feature actually work?

Use `/check verify` where runtime verification is appropriate.

Verification may include:

- Starting the application
- Exercising the primary user journey
- Testing important alternate states
- Checking error behavior
- Checking permissions
- Checking authentication
- Checking responsive behavior
- Checking important UI interactions

Verification is distinct from compilation.

A project compiling successfully does not prove the feature works.

---

# 12. Testing

Testing answers:

> Can the important behavior be checked repeatedly?

Tests should focus on behavior.

Prefer testing:

- User-visible outcomes
- Domain behavior
- API behavior
- Important data transformations
- Regression cases

Avoid tests that become tightly coupled to incidental implementation details.

Tests should be appropriate to the feature's rigor level.

---

# 13. Code Review

Code review answers:

> Is this implementation appropriate, safe, maintainable, and aligned with the project?

Use `/check review` where appropriate.

Review should consider:

### Correctness

Does the implementation satisfy the requirement?

### Architecture

Does it fit the documented architecture?

### Maintainability

Is the implementation understandable?

### Duplication

Does it introduce unnecessary parallel abstractions?

### Security

Does it introduce new trust boundaries or sensitive behavior?

### Performance

Does it introduce unnecessary expensive work?

### Testing

Are important behavioral paths covered?

### Scope

Does it contain unrelated changes?

---

# 14. Documentation

Use `/document` when implementation changes project knowledge.

Documentation may need to update:

- Product behavior
- Architecture
- Feature specifications
- Decisions
- Developer guidance
- Operational information

Documentation should describe the implementation that actually exists.

Do not document an intended architecture that the code does not implement.

---

# 15. Synchronization

Use `/sync` to reconcile project knowledge after meaningful changes.

Synchronization should ensure that:

- Scope reflects implementation status
- Specifications reflect actual behavior
- Architecture reflects actual boundaries
- Decisions remain accurate
- Project context remains useful to future agents

The repository should remain understandable to an agent that has never seen the original conversation.

---

# 16. Bug-Fix Workflow

For bugs:

```text
/debug
   ↓
/test
   ↓
/check verify
   ↓
/sync
```

The debugging process should establish:

1. What is broken?
2. How can it be reproduced?
3. What behavior is expected?
4. Where does the failure originate?
5. What is the smallest correct fix?
6. What regression test should be added?

Do not immediately rewrite the surrounding system.

---

# 17. UI Development

For UI work:

1. Read `docs/design.md`.
2. Search for existing components.
3. Reuse design primitives.
4. Implement required states.
5. Consider accessibility.
6. Consider responsive behavior.
7. Verify the actual user journey.

Important UI states commonly include:

- Loading
- Empty
- Error
- Success
- Disabled
- Partial data
- Permission denied
- Offline where applicable

---

# 18. API and Data Development

For API and data changes:

1. Identify the owning boundary.
2. Define input and output behavior.
3. Validate external input.
4. Define error behavior.
5. Consider authorization.
6. Consider persistence implications.
7. Add appropriate tests.
8. Verify the real integration where required.

Do not trust client-provided authorization information.

---

# 19. Security

Security should be considered throughout development.

Never:

- Commit secrets
- Expose credentials
- Disable authentication to simplify development
- Bypass authorization
- Trust unvalidated external input
- Log sensitive information unnecessarily
- Store secrets in source code

Security-sensitive changes should receive additional review appropriate to their risk.

Security requirements should eventually be enforced through tooling where practical.

---

# 20. Dependency Management

Before adding a dependency:

1. Search the existing project.
2. Check whether an existing dependency already provides the capability.
3. Determine whether the dependency is necessary.
4. Consider maintenance and security.
5. Check compatibility with the architecture.
6. Add only what is justified.

Avoid dependency accumulation.

---

# 21. Database Changes

Database changes should consider:

- Schema ownership
- Migration strategy
- Existing data
- Backwards compatibility
- Validation
- Indexing
- Performance
- Rollback or recovery
- Test data

A database change that affects production data should receive appropriate review before implementation.

---

# 22. Environment and Configuration

Environment-specific values should not be hardcoded.

Use the project's environment configuration mechanism.

Document required variables appropriately.

Provide an `.env.example` once environment configuration exists.

Never commit actual secrets.

---

# 23. Git Workflow

Git should preserve a clear history of coherent work.

Prefer:

- Focused branches
- Focused commits
- Clear commit messages
- Small reviewable changes

Do not combine unrelated work into a single change.

The exact Git conventions are provided by the installed JS Mastery workflow and should remain consistent with its configuration.

---

# 24. Automated Quality Gates

The template intentionally starts with minimal tooling.

Once the application stack has been selected, appropriate automated checks should be introduced.

Potential gates include:

```text
Formatting
    ↓
Lint
    ↓
Typecheck
    ↓
Unit / Integration Tests
    ↓
Build
    ↓
Secret Scan
```

Not every project requires every gate immediately.

The project should add enforcement where it provides meaningful value.

---

# 25. From Rules to Guardrails

Repeated failures should become increasingly difficult to reproduce.

Use this progression:

```text
Instruction
     ↓
Documented Convention
     ↓
Tooling
     ↓
Automated Check
     ↓
CI Enforcement
```

For example:

```text
"Avoid any"
      ↓
ESLint rule
      ↓
CI lint check
```

or:

```text
"Don't commit secrets"
      ↓
Secret scanner
      ↓
CI enforcement
```

Do not build speculative tooling.

Build guardrails in response to real project needs.

---

# 26. Continuous Improvement

The development workflow itself should evolve.

When the team or agents repeatedly encounter a problem:

1. Identify the failure.
2. Determine why the existing workflow did not prevent it.
3. Decide whether the fix belongs in documentation, tooling, or CI.
4. Implement the smallest useful guardrail.
5. Update the relevant documentation.

The goal is a system that becomes safer through use.

---

# 27. Definition of Done

The definition of done depends on the feature's rigor level.

At minimum:

- Requirements are satisfied.
- Scope is correct.
- Architecture is respected.
- Existing patterns were considered.
- Relevant states are handled.
- Appropriate tests exist.
- Appropriate runtime verification is complete.
- Documentation is updated where necessary.
- No unrelated changes remain.

For Beta and GA work, additionally expect:

- Appropriate review
- Security consideration
- Stronger regression coverage
- Synchronized project knowledge
- Automated quality gates where available

---

# 28. Standard Workflow Summary

The overall development model is:

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

The stages are adaptive.

A small prototype should not carry the same process burden as a production-critical feature.

The workflow exists to help the team answer five questions:

1. **What are we building?**
2. **Why are we building it?**
3. **How should it fit into the system?**
4. **How do we know it works?**
5. **How do we keep the project understandable afterward?**

The objective is not process for its own sake.

The objective is to make the **correct path easy and the incorrect path difficult**.
