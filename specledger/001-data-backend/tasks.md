# Tasks Index: Backend Data Migration

Issue Graph Index into the tasks and phases for this feature implementation.
This index does **not contain tasks directly**—those are fully managed through `sl issue` CLI.

## Feature Tracking

* **Epic ID**: `SL-868c5f`
* **User Stories Source**: `specledger/001-data-backend/spec.md`
* **Research Inputs**: `specledger/001-data-backend/research.md`
* **Planning Details**: `specledger/001-data-backend/plan.md`
* **Data Model**: `specledger/001-data-backend/data-model.md`
* **Contract Definitions**: `specledger/001-data-backend/contracts/`

## Issue Query Hints

```bash
# Find all open tasks for this feature
sl issue list --label spec:001-data-backend --status open

# See all issues across specs
sl issue list --all --status open

# View issue details
sl issue show SL-868c5f

# Link dependencies
sl issue link [from-id] blocks [to-id]
```

## Tasks and Phases Structure

```
SL-868c5f (Epic: Backend Data Migration)
├── SL-67a357 (Setup: Install Supabase client and configure environment)
│   └── SL-33048b Install @supabase/supabase-js and create client utility
├── SL-4e1188 (Foundational: Database schema, RLS, seed data, and types)
│   ├── SL-a5d923 Create books and pages tables with RLS policies
│   ├── SL-276abc Seed existing 5 books and pages into Supabase
│   └── SL-1e55f0 Generate TypeScript types from Supabase schema
├── SL-7725f0 (US1: Browse Book Library from Backend) 🎯 MVP
│   ├── SL-c979a9 Fetch books with pages from Supabase in bicara-app.tsx
│   ├── SL-275b24 Update home-screen.tsx to accept books as prop
│   └── SL-579d52 Add client-side data validation for books and pages
├── SL-e9dd6e (US2: Read Book Pages from Backend)
│   ├── SL-592ce4 Verify page ordering and vocabulary rendering from backend
│   └── SL-de23c0 Remove lib/books-data.ts and clean up imports
└── SL-365a16 (Polish: Verify end-to-end and run quickstart validation)
```

## Dependency Graph

```
Setup (SL-67a357)
  └──► Foundational (SL-4e1188)
         ├── Schema (SL-a5d923) ──► Seed (SL-276abc)
         │                     └──► Types (SL-1e55f0)
         ├──► US1 (SL-7725f0)
         │     ├── Fetch (SL-c979a9) ──► HomeScreen (SL-275b24)
         │     │                    └──► Validation (SL-579d52)
         │     └──► Remove static data (SL-de23c0) [also needs US2]
         └──► US2 (SL-e9dd6e)
               ├── Verify pages (SL-592ce4)
               └──► Remove static data (SL-de23c0)
                         └──► Polish (SL-365a16)
```

## Convention Summary

| Type    | Description                  | Labels                                 |
| ------- | ---------------------------- | -------------------------------------- |
| epic    | Full feature epic            | `spec:001-data-backend`                |
| feature | Implementation phase / story | `phase:<name>`, `story:<US#>`          |
| task    | Implementation task          | `component:<x>`, `requirement:<fr-id>` |

## Implementation Strategy

### MVP Scope (US1 only)

After completing Setup + Foundational + US1, the app will:
- Load book catalog from Supabase
- Display all books on the home screen
- Validate and filter invalid data

This is a **shippable increment** — the book viewer still works because the full book data (including pages) is fetched in the same query.

### Incremental Delivery

1. **Setup** → install deps, configure env (1 task)
2. **Foundational** → schema, seed, types (3 tasks, schema first)
3. **US1** → fetch + display + validate (3 tasks, fetch first)
4. **US2** → verify pages + remove old file (2 tasks)
5. **Polish** → end-to-end verification

### Parallel Opportunities

- Within Foundational: Seed and Types can run in parallel (both depend on Schema)
- Within US1: HomeScreen update and Validation can run in parallel (both depend on Fetch)
- US1 and US2 page verification can overlap (US2 verify doesn't depend on US1)

## Definition of Done Summary

| Issue ID   | DoD Items |
|------------|-----------|
| SL-33048b  | - pnpm add @supabase/supabase-js<br>- .env.local created<br>- .env.example created<br>- .env.local in .gitignore<br>- lib/supabase.ts exports typed client |
| SL-a5d923  | - books table created<br>- pages table with FK and unique constraint<br>- RLS enabled<br>- Public read policies<br>- Migration SQL saved |
| SL-276abc  | - 5 books inserted<br>- ~30 pages inserted<br>- Vocabulary JSONB correct<br>- Seed SQL saved<br>- Idempotent script |
| SL-1e55f0  | - database.types.ts generated<br>- Database type includes both tables<br>- supabase.ts uses Database type |
| SL-c979a9  | - BOOKS import removed<br>- Supabase query fetches all books+pages<br>- snake_case→camelCase mapping<br>- Loading state<br>- Error state |
| SL-275b24  | - BOOKS import removed from home-screen<br>- books prop added<br>- Book cards render from prop |
| SL-579d52  | - Validation filter after fetch<br>- Zero-page books excluded<br>- Missing-text books excluded<br>- console.error logged |
| SL-592ce4  | - Pages ordered by page_number<br>- Vocabulary JSONB renders<br>- Navigation works |
| SL-de23c0  | - books-data.ts deleted<br>- Imports updated<br>- App compiles<br>- App functions with backend data |

---

> This file is intentionally light and index-only. Implementation data lives in the issue store. Update this file only to point humans and agents to canonical query paths and feature references.
