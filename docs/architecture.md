# Architecture

## Architecture Status

Status: Draft

> This document is the system-level architectural source of truth.
>
> For a new project, establish the initial architecture before substantial application implementation begins.
>
> Keep unresolved architectural questions under `Open Architectural Questions` rather than silently assuming an answer.

---

## 1. Architecture Overview

Describe the overall architecture of the application.

Include:

- Major runtime components
- Major system boundaries
- Primary data flow
- External systems
- Important architectural principles

```text
<High-level architecture diagram or description>
```

### Architectural Principles

-
-
-

---

## 2. Technology Stack

Document the technologies selected for the project.

### Frontend

**Framework:**

**Language:**

**UI / Component System:**

**Styling:**

**State Management:**

**Data Fetching:**

### Backend

**Runtime:**

**Framework:**

**Language:**

**API Style:**

### Database

**Database:**

**ORM / Query Layer:**

**Migration Strategy:**

### Authentication

**Provider / Strategy:**

### Infrastructure

**Hosting:**

**Deployment:**

**Storage:**

**Observability:**

### Testing

**Unit:**

**Integration:**

**End-to-End:**

### Tooling

**Package Manager:**

**Formatter:**

**Linter:**

**Build Tool:**

---

## 3. Runtime Boundaries

Describe the major runtime environments.

For example:

```text
Browser
   ↓
Web Application
   ↓
API
   ↓
Database
```

Document:

- Where code executes
- Which boundaries are trusted
- Which boundaries are untrusted
- How communication occurs

---

## 4. Application Boundaries

Describe the major applications or deployable units.

Examples:

- Web application
- API
- Worker
- CLI
- Background jobs
- Admin application

For each boundary document:

### `<Application>`

**Responsibility:**

**Owns:**

**Consumes:**

**Exposes:**

**Dependencies:**

---

## 5. Module Boundaries

Describe how the codebase is divided into modules.

Document:

- Module responsibilities
- Allowed dependencies
- Forbidden dependencies
- Ownership boundaries

Example:

```text
Presentation
     ↓
Application
     ↓
Domain
     ↓
Infrastructure
```

### Dependency Rules

-
-
-

---

## 6. Data Flow

Describe how data moves through the system.

Document:

- User input
- Validation
- Application logic
- Persistence
- External services
- Response transformation

Example:

```text
User
 ↓
UI
 ↓
Validation
 ↓
Application/API
 ↓
Domain Logic
 ↓
Persistence
```

---

## 7. State Management

Document where application state lives.

Classify state where useful:

- Local UI state
- Server state
- URL state
- Form state
- Session state
- Persistent client state
- Domain state

### Rules

-
-
-

---

## 8. API Conventions

Document how application boundaries communicate.

### API Style

Examples:

- REST
- RPC
- GraphQL
- Server functions

### Request Conventions

-

### Response Conventions

-

### Error Format

-

### Validation

-

### Authentication

-

### Authorization

-

### Versioning

-

---

## 9. Data Access

Describe how application code accesses persistent data.

Document:

- Data ownership
- Repository/query patterns
- ORM usage
- Transactions
- Caching
- Connection management

### Rules

-
-
-

---

## 10. Authentication

Document how users authenticate.

Include:

- Authentication mechanism
- Session strategy
- Token strategy
- Session storage
- Account lifecycle
- Logout
- Password recovery where applicable
- Multi-factor authentication where applicable

### Trust Boundary

Describe what is trusted after authentication and what still requires authorization.

---

## 11. Authorization

Document how permissions are enforced.

Include:

- Roles
- Permissions
- Resource ownership
- Policy enforcement
- Server-side authorization

### Rules

- Authorization must be enforced at the appropriate trusted boundary.
- Client-side permissions must not be treated as authoritative.
-

---

## 12. Validation

Document validation responsibilities.

### Client Validation

Used for:

- User feedback
- Form usability
- Early error detection

### Server Validation

Used for:

- Trust boundaries
- Data integrity
- Security

### External Data

All external input should be treated as untrusted until validated.

---

## 13. Error Handling

Document the error strategy.

Include:

- Domain errors
- Validation errors
- Authentication errors
- Authorization errors
- Infrastructure errors
- Unexpected errors
- User-facing error handling
- Logging

### Rules

-
-
-

---

## 14. Security

Document important security boundaries.

Include:

- Authentication
- Authorization
- Secrets
- Sensitive data
- External input
- Trust boundaries
- Encryption
- Rate limiting
- Logging
- Security headers
- Dependency security

### Security Constraints

-
-
-

---

## 15. Testing Strategy

Document the testing layers.

### Unit Tests

Responsible for:

-

### Integration Tests

Responsible for:

-

### End-to-End Tests

Responsible for:

-

### Runtime Verification

Responsible for:

-

### Testing Principles

- Test behavior rather than implementation details.
- Preserve regression coverage.
- Do not weaken tests to make implementation pass.

---

## 16. Deployment

Document how the application reaches production.

Include:

- Build process
- Environments
- Deployment platform
- Environment variables
- Database migrations
- Rollbacks
- Monitoring
- Logging

### Environments

| Environment | Purpose                     | Deployment |
| ----------- | --------------------------- | ---------- |
| Development | Local development           |            |
| Staging     | Pre-production verification |            |
| Production  | Live application            |            |

---

## 17. Dependency Rules

Document important dependency constraints.

Examples:

- Domain code must not depend on UI code.
- Shared modules must not depend on feature modules.
- Infrastructure dependencies should remain behind appropriate boundaries.

### Rules

-
-
-

---

## 18. Performance

Document important performance requirements.

Include:

- Performance-sensitive paths
- Caching
- Database indexing
- Rendering strategy
- Network considerations
- Background processing

### Requirements

-
-

---

## 19. Observability

Document how the application is observed.

Include:

- Logging
- Error tracking
- Metrics
- Tracing
- Health checks
- Alerts

### Requirements

-
-

---

## 20. Architectural Constraints

List decisions that agents and developers should not violate without explicitly revisiting the architecture.

Examples:

-
-
-

---

## 21. Open Architectural Questions

Record unresolved architectural questions here.

| Question | Impact | Owner | Status |
| -------- | ------ | ----- | ------ |
|          |        |       |        |

Do not silently resolve an important architectural question through implementation.

When resolved:

1. Update the relevant architecture section.
2. Create a decision record when appropriate.
3. Remove or close the question.

---

## 22. Architecture Decisions

Significant decisions should be recorded in:

```text
docs/decisions/
```

Examples:

```text
ADR-001-authentication-strategy.md
ADR-002-database-selection.md
ADR-003-state-management.md
```

The architecture document should contain the **current state**.

Decision records preserve the reasoning and historical context.

---

## 23. Architecture Change Process

When a proposed change affects system-level architecture:

1. Identify the affected boundary.
2. Describe the current architecture.
3. Describe the proposed architecture.
4. Identify alternatives.
5. Evaluate consequences.
6. Create a decision record when appropriate.
7. Update `docs/architecture.md`.
8. Implement the change.
9. Run `/audit` when appropriate.

The architecture document must describe the architecture that actually exists, not an intended future architecture.

---

## 24. Architecture Completeness

Before substantial application implementation begins, the following should be established:

- [ ] Architecture overview
- [ ] Technology stack
- [ ] Runtime boundaries
- [ ] Application boundaries
- [ ] Module boundaries
- [ ] Data flow
- [ ] State management
- [ ] API conventions
- [ ] Data access
- [ ] Authentication
- [ ] Authorization
- [ ] Validation
- [ ] Error handling
- [ ] Security
- [ ] Testing strategy
- [ ] Deployment
- [ ] Dependency rules
- [ ] Architectural constraints
- [ ] Open questions documented

Not every project will require detailed answers for every section.

However, sections that are relevant to the project should contain actual decisions rather than remaining generic placeholders.
