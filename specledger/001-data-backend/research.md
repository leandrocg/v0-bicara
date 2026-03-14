# Research: Backend Data Migration

**Date**: 2026-03-14
**Feature**: 001-data-backend

## Prior Work

No related features or tasks found in issue tracker.

## R1: Supabase as Backend

**Decision**: Use the existing Supabase project (`jmszvzpoxbrchlibagyj`) with PostgreSQL as the backend database.

**Rationale**: Supabase is already connected to the project via MCP. It provides managed PostgreSQL, auto-generated REST APIs, TypeScript type generation, and migration tooling — all directly usable without additional infrastructure.

**Alternatives considered**:
- Custom API server (Express/Fastify): Unnecessary overhead for read-only content serving. YAGNI (P1).
- Firebase: Would require a new project and different tooling.
- Prisma + standalone PostgreSQL: Extra ORM layer not needed for simple reads.

## R2: Schema Design — Vocabulary Storage

**Decision**: Store vocabulary items as a JSONB array column on the `pages` table.

**Rationale**: Vocabulary is always fetched as part of a page, never queried independently. Each page has ~4 items with a simple `{id, en}` shape. A separate table would add complexity (joins, N+1 queries) for zero benefit.

**Alternatives considered**:
- Separate `vocabulary_items` table with FK to `pages`: More normalized but unnecessary given the access pattern. Revisit only if vocabulary needs independent querying (e.g., flashcard mode, spaced repetition).

## R3: Supabase Client Pattern

**Decision**: Use `@supabase/supabase-js` with a singleton client. No `@supabase/ssr` needed.

**Rationale**: The app has no authentication — all content is public read-only. `@supabase/ssr` is specifically for server-side auth cookie management, which doesn't apply here. A simple `createClient()` works in both server and client components.

**Alternatives considered**:
- `@supabase/ssr`: Only needed when auth is added (out of scope).
- Direct REST `fetch()`: Loses type safety and query builder convenience.

## R4: RLS (Row Level Security)

**Decision**: Enable RLS on all tables with a permissive `SELECT` policy (`using (true)`) for the `anon` role. No insert/update/delete policies.

**Rationale**: All book content is publicly accessible per spec. RLS must be enabled (Supabase best practice) but the policy allows anonymous reads via the publishable anon key.

**Alternatives considered**:
- Disable RLS entirely: Against Supabase best practices; risks accidental exposure if auth is added later.

## R5: Migration & Seed Strategy

**Decision**: Use Supabase MCP `apply_migration` for schema DDL. Seed data applied via `execute_sql` (transformed from existing `books-data.ts`). Keep migration SQL in `supabase/migrations/` for version control.

**Rationale**: MCP tools allow direct schema application without local Supabase CLI setup. Seed data is derived from the existing TypeScript data file to ensure exact parity.

**Alternatives considered**:
- Local Supabase CLI with `supabase db push`: Requires local Docker setup; MCP is simpler for this scope.
- Manual data entry via Supabase dashboard: Not reproducible; violates P8 (Seed Data for E2E Testing).

## R6: Data Fetching Pattern

**Decision**: Fetch all books with pages in a single query using Supabase's embedded relations (foreign key joins). The current app loads all data at once — maintain this pattern.

**Rationale**: With 5 books and ~30 pages total, the data set is small enough to fetch entirely. The existing app already loads everything at startup via the static import. Pagination or lazy loading would be premature optimization (YAGNI).

**Alternatives considered**:
- Fetch books first, then pages on book selection: Adds loading states and complexity for negligible data savings.
- Server-side rendering: The app is currently pure client-side; converting to SSR is out of scope.

## R7: Type Generation

**Decision**: Use Supabase MCP `generate_typescript_types` to create `lib/database.types.ts` from the schema. The existing `Book` and `BookPage` interfaces in `books-data.ts` will be replaced or adapted.

**Rationale**: Generated types ensure the client code stays in sync with the database schema automatically.

## Current Project State

- **Supabase project**: Empty (no tables, no migrations)
- **Next.js app**: v16.1.6, React 19, pure client-side, no API routes
- **Package manager**: pnpm
- **No Supabase packages installed** yet
- **No .env files** exist yet
- **Data consumers**: `bicara-app.tsx`, `home-screen.tsx`, `interactive-book.tsx` all import from `lib/books-data.ts`
