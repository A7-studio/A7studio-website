# Agentic Web Template

A reusable foundation for building web applications with an agentic software development workflow.

This template combines project documentation, architectural guidance, feature specifications, decision records, and JS Mastery Skills into a single development system.

---

## Philosophy

The template separates three responsibilities.

### Project Constitution

`AGENTS.md` defines the rules and constraints agents should follow.

### Project Knowledge

The `docs/` directory defines:

- What the product is
- How the system is architected
- How the product should look and behave
- What features are being built
- What individual features must do
- Why important decisions were made
- How development should happen

### Development Workflow

JS Mastery Skills provide the operational workflow used to scope, architect, develop, verify, test, review, document, and synchronize changes.

The system is therefore:

```text
Project Rules
      +
Project Knowledge
      +
Development Skills
      =
Agentic Development System
```

---

# Repository Structure

```text
.
├── AGENTS.md
├── CLAUDE.md
├── README.md
│
├── docs/
│   ├── product.md
│   ├── architecture.md
│   ├── design.md
│   ├── development.md
│   │
│   ├── scope/
│   │   └── README.md
│   │
│   ├── specs/
│   │   ├── README.md
│   │   └── _template.md
│   │
│   ├── decisions/
│   │   ├── README.md
│   │   └── _template.md
│   │
│   └── reviews/
│
├── .agents/
│   └── skills/
│
└── skills-lock.json
```

---

# Getting Started

## 1. Create a Project from the Template

Create a new repository from this template.

Rename the repository and package identity to match the new project.

The template is intentionally not tied to a specific framework.

---

## 2. Install the Development Skills

Install the JS Mastery Skills:

```bash
npx skills@latest add jsmastery-pro/skills
```

Keep the installed skills under:

```text
.agents/skills/
```

The skills provide the development workflow.

This repository provides the project-specific context and constraints.

---

# 3. Establish the Product

Complete:

```text
docs/product.md
```

Define:

- Product
- Problem
- Target users
- Primary journey
- Core features
- MVP
- Non-goals
- Success criteria
- Constraints

At this stage, focus on **what the product is**, not implementation.

---

# 4. Establish the Design Language

Complete:

```text
docs/design.md
```

Define:

- Design principles
- Brand
- Color
- Typography
- Spacing
- Layout
- Components
- Navigation
- Forms
- Feedback
- Loading states
- Empty states
- Error states
- Responsive behavior
- Accessibility
- Content guidelines

The design document establishes the visual and interaction language that future features should follow.

---

# 5. Establish Product Scope

Use:

```text
docs/scope/
```

to define the initial features and initiatives.

Then use:

```text
/scope
```

to establish and maintain the project's scope.

Scope answers:

> What are we building?

It does not answer:

> How is the entire application structured?

That is the responsibility of `docs/architecture.md`.

---

# 6. Architect the Features

Use:

```text
/architect
```

to turn scoped features into implementation-ready specifications.

Specifications live under:

```text
docs/specs/
```

They define:

- Requirements
- Acceptance criteria
- UI states
- Data requirements
- API requirements
- Security
- Accessibility
- Testing expectations
- Non-goals

---

# 7. Establish the Project Architecture

Before substantial application implementation begins, establish:

```text
docs/architecture.md
```

This is one of the most important steps in the template.

The architecture document defines the system-level structure of the application.

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

The template does not prescribe a framework.

The project should choose its stack based on product requirements and document that choice in `docs/architecture.md`.

If an architectural question remains unresolved, record it under:

```text
Open Architectural Questions
```

Do not silently make important architectural decisions through implementation.

---

# 8. Scaffold the Application

Once the initial architecture is established, scaffold the application according to that architecture.

The desired relationship is:

```text
Product
   ↓
Scope
   ↓
Feature Specifications
   ↓
Project Architecture
   ↓
Application Scaffold
```

The architecture does not need to specify every implementation detail.

It should establish the boundaries within which implementation happens.

---

# 9. Run `/audit`

After scaffolding:

```text
/audit
```

The audit should verify that the actual project and documented project context agree.

In particular, it should inspect:

### Documentation

Are the core project documents present and useful?

### Architecture

Does `docs/architecture.md` contain the actual architecture?

### Technology

Does the implementation match the documented stack?

### Boundaries

Do runtime, application, and module boundaries match?

### Dependencies

Are dependency directions consistent?

### Data

Does actual data flow match the architecture?

### Security

Do authentication, authorization, validation, and trust boundaries match?

### Testing

Does the testing setup match the documented strategy?

### Workflow

Are `AGENTS.md` and `docs/development.md` compatible with the installed skills?

Audit is the first major consistency check between the template and the real application.

---

# Development Lifecycle

## Greenfield

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

## Feature

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

## Bug

```text
/debug
   ↓
/test
   ↓
/check verify
   ↓
/sync
```

These workflows are adaptive.

The rigor level of the feature determines which stages and how much ceremony are appropriate.

---

# Rigor Levels

The template recognizes:

| Level     | Goal                        |
| --------- | --------------------------- |
| Prototype | Learn quickly               |
| Alpha     | Establish reliable behavior |
| Beta      | Reduce regression risk      |
| GA        | Production reliability      |

A prototype should not require the same process as production-critical functionality.

---

# Documentation Ownership

| Location               | Responsibility                      |
| ---------------------- | ----------------------------------- |
| `AGENTS.md`            | Project and agent constitution      |
| `docs/product.md`      | Product truth                       |
| `docs/architecture.md` | System architecture                 |
| `docs/design.md`       | Design language                     |
| `docs/development.md`  | Development workflow                |
| `docs/scope/`          | Product scope and feature lifecycle |
| `docs/specs/`          | Feature behavior and requirements   |
| `docs/decisions/`      | Important decisions                 |
| `.agents/skills/`      | Development workflow skills         |

---

# Architecture vs Feature Specification

These are intentionally separate.

```text
docs/architecture.md
        │
        │
        ▼
How is the whole system structured?
        │
        ▼
docs/specs/
        │
        │
        ▼
How should this feature behave?
        │
        ▼
Source Code
```

A feature specification must fit within the project architecture.

If a feature requires changing the architecture, update the architecture and record the significant decision where appropriate.

---

# Guardrails

The template follows a progressive guardrail model:

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

The template intentionally does not ship a large framework-specific toolchain.

Once the application stack is known, introduce appropriate:

- Formatter
- Linter
- Typechecker
- Tests
- Build checks
- Secret scanning
- CI

Guardrails should be based on real project needs rather than speculative complexity.

---

# Updating the Template

When modifying this template itself:

1. Identify the problem.
2. Determine whether it is a documentation, workflow, tooling, or CI problem.
3. Update the appropriate source of truth.
4. Run `/audit`.
5. Check that the installed skills remain compatible.
6. Review the effect on projects derived from the template.

The template is itself a product.

Its development should follow the same principles it establishes for application development.

---

# Updating JS Mastery Skills

The installed skills are tracked through the repository's skills lock file.

When updating them:

1. Review the workflow changes.
2. Run `/audit`.
3. Compare the installed workflow against `docs/development.md`.
4. Update project documentation if necessary.
5. Commit the skill and documentation changes together.

Do not update the skills while leaving the documented workflow stale.

---

# Important Principle

This template is intentionally **generic at the beginning and increasingly specific as the project evolves**.

```text
Generic Template
      ↓
Product Definition
      ↓
Scope
      ↓
Project Architecture
      ↓
Application Stack
      ↓
Tooling
      ↓
Automated Guardrails
```

The template should establish stable engineering principles without pretending to know the architecture of every application built from it.

The objective is not to create the most elaborate development process.

The objective is to create a system where:

> **The correct path is easy, project knowledge is explicit, architectural decisions are visible, and incorrect paths become increasingly difficult to take.**
