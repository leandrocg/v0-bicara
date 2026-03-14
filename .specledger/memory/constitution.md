<!--
  Sync Impact Report
  ===================
  Version change: N/A → 1.0.0
  Added principles:
    - P1: YAGNI
    - P2: MVP-First Delivery
    - P3: Short-Lived Feature Branches
    - P4: Narrow Scope by Default
    - P5: Mobile-First UX
    - P6: Accessibility Matters
    - P7: Conventional Commits
    - P8: Seed Data for E2E Testing
  Templates requiring updates:
    - .specledger/templates/plan-template.md — ⚠ Constitution Check
      section uses generic placeholders; will align on first
      /specledger.plan run
    - .specledger/templates/spec-template.md — ✅ already supports
      prioritized user stories and MVP structure
    - .specledger/templates/tasks-template.md — ✅ already organizes
      by user story with independent testability
  Follow-up TODOs: none
-->

# Project Constitution: Bicara

**Project**: Bicara — Indonesian language learning app
**Constitution Version**: 1.1.0
**Ratification Date**: 2026-03-14
**Last Amended**: 2026-03-14

---

## Preamble

Bicara is a children's Indonesian language learning application.
This constitution defines the non-negotiable principles that govern
all feature specifications, implementation plans, and task
generation. Every spec, plan, and task MUST be validated against
these principles before work begins.

---

## Principles

### P1: YAGNI — You Aren't Gonna Need It

Don't build what isn't needed right now. Every feature, abstraction,
configuration option, or infrastructure choice MUST be justified by
a current, concrete requirement — not a hypothetical future one.

**Rules**:
- Specs MUST NOT include requirements prefixed with "in the future"
  or "eventually we might need."
- No premature abstractions: if a pattern is used once, inline it.
  Extract only when duplication is proven (3+ occurrences).
- No speculative configuration or feature flags for uncommitted
  functionality.

**Rationale**: Unused code is a maintenance burden. Building for
imagined futures delays real delivery and increases complexity.

---

### P2: MVP-First Delivery

Every feature MUST have a clearly identified MVP (Minimum Viable
Product) path. Specifications and tasks MUST distinguish P1 (MVP)
from nice-to-haves. Ship P1 first, iterate later.

**Rules**:
- Every spec MUST mark user stories with priority levels (P1, P2,
  P3). P1 stories define the MVP.
- Task generation MUST produce a checkpoint after P1 completion
  that results in a shippable, demonstrable increment.
- P2+ stories MUST NOT block P1 delivery. If they do, re-scope.
- Implementation MUST NOT begin on P2 stories until P1 is merged
  and verified.

**Rationale**: Delivering a working MVP early validates assumptions,
unblocks feedback, and prevents wasted effort on features that may
change after real usage.

---

### P3: Short-Lived Feature Branches

Feature branches MUST be scoped to merge within 1–3 days. If a
feature can't ship that fast, it MUST be broken into smaller
independent slices.

**Rules**:
- A feature branch MUST address a single spec or a single user
  story from a spec.
- If a plan produces more than ~10 implementation tasks, consider
  splitting into multiple branches.
- Branches that remain open longer than 3 days SHOULD be flagged
  for re-scoping.
- Each branch MUST leave the codebase in a deployable state when
  merged.

**Rationale**: Long-lived branches accumulate merge conflicts, defer
integration risk, and make code review harder. Small, frequent
merges keep the project moving.

---

### P4: Narrow Scope by Default

Specs MUST resist scope creep. Each feature branch solves ONE
problem well. If a spec has more than 3 user stories, it is likely
too broad and SHOULD be split into separate specs.

**Rules**:
- Specs with more than 3 user stories MUST justify why they belong
  together (shared data model, atomic user flow, etc.).
- Functional requirements MUST directly trace to a user story. Any
  FR without a parent story is a scope leak.
- "While we're at it" additions MUST be deferred to a separate
  spec unless they are < 1 hour of work AND on the critical path.
- Plan reviews MUST check for scope creep before task generation.

**Rationale**: Narrow scope produces faster delivery, clearer PRs,
easier rollbacks, and more predictable timelines.

---

### P5: Mobile-First UX

All UI MUST be designed for mobile viewports first. Desktop is an
enhancement, not the baseline.

**Rules**:
- Components MUST render correctly at 320px viewport width.
- Touch targets MUST be at least 44x44px.
- Layout MUST use responsive patterns (flex/grid) that adapt up,
  not fixed layouts that adapt down.
- Visual QA MUST start with mobile viewport before checking
  desktop.

**Rationale**: Bicara's primary audience (children and parents)
will predominantly use mobile devices. Mobile-first ensures the
core experience is never compromised.

---

### P6: Accessibility Matters

Interactive elements MUST be keyboard-navigable and screen-reader
friendly. Use semantic HTML over div soup.

**Rules**:
- All interactive elements MUST be focusable and operable via
  keyboard.
- Images and icons MUST have appropriate alt text or aria-labels.
- Color MUST NOT be the sole means of conveying information.
- Heading hierarchy MUST be logical (no skipping levels).
- Use native HTML elements (button, a, input) before reaching for
  ARIA roles.

**Rationale**: Language learning apps serve diverse users including
those with disabilities. Accessibility is not optional — it's a
quality baseline.

---

### P7: Conventional Commits

All commits MUST follow the Conventional Commits format.

**Rules**:
- Format: `type(scope): description` — e.g., `feat(books): add
  vocabulary quiz page`.
- Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`,
  `test`, `chore`, `ci`, `perf`.
- Scope is optional but encouraged for multi-module changes.
- Breaking changes MUST include `BREAKING CHANGE:` in the commit
  body or use `!` after the type.

**Rationale**: Consistent commit messages enable automated
changelogs, clearer git history, and easier bisecting.

---

### P8: Seed Data for E2E Testing

Every feature that introduces or modifies a data model MUST include
seed data that bootstraps environments for end-to-end testing.

**Rules**:
- Database migrations MUST include seed data scripts that populate
  the schema with representative test data.
- Seed data MUST be sufficient to exercise all user stories in the
  feature spec without manual data entry.
- Seed data scripts MUST be idempotent (safe to run multiple times).
- E2E tests MUST NOT depend on production data — only on seed data.

**Rationale**: Reproducible test environments catch regressions early
and eliminate "works on my machine" issues. Seed data ensures every
developer and CI pipeline starts from a known state.

---

## Governance

### Amendment Procedure

1. Propose a change by describing the principle to add, modify, or
   remove, with rationale.
2. Update this document via `/specledger.constitution`.
3. Increment the version per semantic versioning:
   - **MAJOR**: Removing or redefining a principle.
   - **MINOR**: Adding a new principle or expanding guidance.
   - **PATCH**: Clarifications, typos, wording.

### Compliance Review

- Every `/specledger.plan` run MUST validate against this
  constitution before proceeding.
- The Constitution Check in the plan template MUST reference the
  principles defined here.
- Non-compliance MUST be documented in the Complexity Tracking
  table with justification.
