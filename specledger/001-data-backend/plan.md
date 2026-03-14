# Implementation Plan: Backend Data Migration

**Branch**: `001-data-backend` | **Date**: 2026-03-14 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specledger/001-data-backend/spec.md`

## Summary

Migrate the hardcoded book content from `lib/books-data.ts` to a Supabase PostgreSQL backend. Create a `books` and `pages` schema with JSONB vocabulary, seed the existing 5 books, and update the Next.js client to fetch data via the Supabase JS client. All content is public read-only with RLS policies.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 16.1.6, React 19.2.4
**Primary Dependencies**: `@supabase/supabase-js` (to be added)
**Storage**: Supabase PostgreSQL (project: `jmszvzpoxbrchlibagyj`)
**Testing**: Manual verification + seed data for e2e bootstrap
**Target Platform**: Web (mobile-first), deployed on Vercel
**Project Type**: Web application (Next.js with Supabase backend)
**Performance Goals**: Home screen loads in <2s, page navigation without perceptible delay
**Constraints**: No caching, no auth, no content editing UI
**Scale/Scope**: 5 books, ~30 pages, single-digit concurrent users (MVP)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **P1 YAGNI**: No speculative features — only DB schema, seed data, and client queries. No caching, no admin UI, no auth.
- [x] **P2 MVP-First**: Both user stories are P1 (MVP). No P2+ work blocks delivery.
- [x] **P3 Short-Lived Branches**: Feature is scoped to ~6 tasks — well within 1-3 day merge target.
- [x] **P4 Narrow Scope**: 2 user stories sharing a single data model migration. Justified as atomic.
- [x] **P5 Mobile-First UX**: No UI changes — existing mobile-first components preserved.
- [x] **P6 Accessibility**: No UI changes — existing accessibility preserved.
- [x] **P7 Conventional Commits**: Will follow `feat(db):`, `feat(books):` format.
- [x] **P8 Seed Data**: Seed data included as core deliverable (FR-006, SC-005).

**Complexity Violations**: None identified.

## Project Structure

### Documentation (this feature)

```text
specledger/001-data-backend/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0: technology decisions
├── data-model.md        # Phase 1: schema design
├── quickstart.md        # Phase 1: setup guide
├── contracts/
│   └── supabase-queries.md  # Phase 1: query patterns
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
lib/
├── supabase.ts          # NEW: Supabase client singleton
├── database.types.ts    # NEW: Generated TypeScript types from schema
├── books-data.ts        # REMOVE: Replaced by Supabase queries
└── utils.ts             # UNCHANGED

components/
├── bicara-app.tsx       # MODIFY: Fetch books from Supabase instead of static import
├── home-screen.tsx      # MODIFY: Accept books as prop instead of importing BOOKS
├── interactive-book.tsx # UNCHANGED: Already receives book as prop
├── book-page.tsx        # UNCHANGED
└── progress-dots.tsx    # UNCHANGED

supabase/
├── migrations/
│   └── 001_create_books_schema.sql  # NEW: Schema DDL (version-controlled copy)
└── seed.sql             # NEW: Seed data INSERT statements
```

**Structure Decision**: Minimal changes to existing Next.js structure. Add `lib/supabase.ts` for client, `lib/database.types.ts` for types. Keep migration SQL in `supabase/` for version control alongside MCP-applied migrations.

## Complexity Tracking

No violations identified — no entries needed.
