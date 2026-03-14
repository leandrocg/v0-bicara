# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bicara is an interactive children's platform for learning Indonesian through stories. It's a Next.js app bootstrapped with [v0](https://v0.app). The app presents a library of bilingual (Indonesian/English) storybooks with swipe-based page navigation and tap-to-reveal translations.

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build (TypeScript errors are ignored via next.config.mjs)
pnpm lint         # ESLint
```

No test framework is configured.

## Architecture

**Single-page client app** — all rendering happens client-side via `"use client"` components. The only server component is `app/page.tsx`, which renders `<BicaraApp />`.

### Component flow

`app/page.tsx` → `BicaraApp` → `HomeScreen` (book grid) | `InteractiveBook` (reader)

- **`BicaraApp`** — top-level state machine toggling between library and reader views using `AnimatePresence`
- **`HomeScreen`** — displays book cards; receives `books` array as prop
- **`InteractiveBook`** — swipe/keyboard page navigation with `framer-motion` drag gestures
- **`BookPage`** — split-screen layout: Indonesian text on top, English translation on bottom with blur-reveal interaction. Vocabulary pages render as card grids instead.
- **`ProgressDots`** — page position indicator

### Data model

Book content is stored in **Supabase (Postgres)** across two tables: `books` and `pages` (with a FK from `pages.book_id` → `books.id`). Schema is in `supabase/migrations/`, seed data in `supabase/seed.sql`.

- **`BicaraApp`** fetches books + pages in a single joined query on mount via the Supabase JS client (`lib/supabase.ts`)
- DB columns use `snake_case`; the fetch maps them to `camelCase` app interfaces defined in `lib/types.ts`
- Generated DB types live in `lib/database.types.ts` (generated via Supabase CLI / MCP)
- RLS policies allow public read access; no write access via anon key
- `validateBooks()` in `bicara-app.tsx` filters out books with missing/invalid pages before rendering

## Tech Stack

- **Next.js 16** with App Router (client-side data fetching via Supabase; no API routes)
- **pnpm** package manager
- **Tailwind CSS v4** with `tw-animate-css`
- **shadcn/ui** (new-york style, RSC mode) — components in `components/ui/`
- **framer-motion** for animations and gesture handling
- **@supabase/supabase-js** for database queries
- **lucide-react** for icons
- **Fonts**: Nunito + Quicksand (Google Fonts via `next/font`)

## External Services

- **Supabase** — Postgres database backend (project ref: `jmszvzpoxbrchlibagyj`). MCP configured in `.mcp.json`. Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars (see `.env.example`)
- **Vercel Analytics** included in layout
- **SpecLedger** tooling for spec-driven development (`specledger/` directory, `.specledger/` config)

## Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`).
