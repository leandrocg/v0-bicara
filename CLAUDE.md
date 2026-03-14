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
- **`HomeScreen`** — displays book cards from `BOOKS` array; purely presentational
- **`InteractiveBook`** — swipe/keyboard page navigation with `framer-motion` drag gestures
- **`BookPage`** — split-screen layout: Indonesian text on top, English translation on bottom with blur-reveal interaction. Vocabulary pages render as card grids instead.
- **`ProgressDots`** — page position indicator

### Data model

All book content lives in `lib/books-data.ts` as a static `BOOKS` array. Each `Book` has an `id`, metadata, and `pages[]` where each `BookPage` has `indonesian`/`english` text and an optional `vocabulary` list for vocab pages.

## Tech Stack

- **Next.js 16** with App Router (but no server-side data fetching or API routes)
- **pnpm** package manager
- **Tailwind CSS v4** with `tw-animate-css`
- **shadcn/ui** (new-york style, RSC mode) — components in `components/ui/`
- **framer-motion** for animations and gesture handling
- **lucide-react** for icons
- **Fonts**: Nunito + Quicksand (Google Fonts via `next/font`)

## External Services

- **Supabase MCP** configured in `.mcp.json` (project ref: `jmszvzpoxbrchlibagyj`)
- **Vercel Analytics** included in layout
- **SpecLedger** tooling for spec-driven development (`specledger/` directory, `.specledger/` config)

## Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`).
