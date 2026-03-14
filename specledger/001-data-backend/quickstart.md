# Quickstart: Backend Data Migration

**Date**: 2026-03-14
**Feature**: 001-data-backend

## Prerequisites

- Node.js 18+
- pnpm 10+
- Access to Supabase project `jmszvzpoxbrchlibagyj`

## Setup Steps

### 1. Install Supabase client

```bash
pnpm add @supabase/supabase-js
```

### 2. Configure environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://jmszvzpoxbrchlibagyj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key-from-supabase-dashboard>
```

### 3. Apply database migration

The migration is applied via Supabase MCP `apply_migration` tool or manually via the SQL editor in the Supabase dashboard. See `data-model.md` for the full schema.

### 4. Seed data

Seed data is applied via Supabase MCP `execute_sql` or via `supabase/seed.sql`. The seed script transforms the existing 5 books from `lib/books-data.ts` into SQL INSERT statements.

### 5. Generate TypeScript types

```bash
# Via Supabase MCP tool, or:
npx supabase gen types typescript --project-id jmszvzpoxbrchlibagyj --schema public > lib/database.types.ts
```

### 6. Create Supabase client utility

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### 7. Replace static data imports

Update `bicara-app.tsx` and `home-screen.tsx` to fetch from Supabase instead of importing `BOOKS` from `lib/books-data.ts`.

## Verification

- Open the app and confirm all 5 books appear on the home screen
- Select a book and navigate through all pages
- Check vocabulary pages display correctly
- Verify page transitions are smooth
