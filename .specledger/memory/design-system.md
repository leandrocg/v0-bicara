---
version: 1
framework: nextjs
last_scanned: 2026-03-14T10:14:22.272389+08:00
style:
    css_framework: PostCSS
    styling_approach: utility-first
    theme_colors:
        --accent: oklch(0.269 0 0)
        --accent-foreground: oklch(0.985 0 0)
        --background: oklch(0.145 0 0)
        --border: oklch(0.269 0 0)
        --card: oklch(0.145 0 0)
        --card-foreground: oklch(0.985 0 0)
        --color-accent: var(--accent)
        --color-accent-foreground: var(--accent-foreground)
        --color-background: var(--background)
        --color-border: var(--border)
        --color-card: var(--card)
        --color-card-foreground: var(--card-foreground)
        --color-destructive: var(--destructive)
        --color-destructive-foreground: var(--destructive-foreground)
        --color-foreground: var(--foreground)
        --color-input: var(--input)
        --color-muted: var(--muted)
        --color-muted-foreground: var(--muted-foreground)
        --color-popover: var(--popover)
        --color-popover-foreground: var(--popover-foreground)
        --color-primary: var(--primary)
        --color-primary-foreground: var(--primary-foreground)
        --color-ring: var(--ring)
        --color-secondary: var(--secondary)
        --color-secondary-foreground: var(--secondary-foreground)
        --color-sidebar: var(--sidebar)
        --color-sidebar-accent: var(--sidebar-accent)
        --color-sidebar-accent-foreground: var(--sidebar-accent-foreground)
        --color-sidebar-border: var(--sidebar-border)
        --color-sidebar-foreground: var(--sidebar-foreground)
        --color-sidebar-primary: var(--sidebar-primary)
        --color-sidebar-primary-foreground: var(--sidebar-primary-foreground)
        --color-sidebar-ring: var(--sidebar-ring)
        --destructive: oklch(0.396 0.141 25.723)
        --destructive-foreground: oklch(0.637 0.237 25.331)
        --foreground: oklch(0.985 0 0)
        --muted: oklch(0.269 0 0)
        --muted-foreground: oklch(0.708 0 0)
        --popover: oklch(0.145 0 0)
        --popover-foreground: oklch(0.985 0 0)
        --primary: oklch(0.985 0 0)
        --primary-foreground: oklch(0.205 0 0)
        --ring: oklch(0.439 0 0)
        --secondary: oklch(0.269 0 0)
        --secondary-foreground: oklch(0.985 0 0)
        --sidebar-accent: oklch(0.269 0 0)
        --sidebar-accent-foreground: oklch(0.985 0 0)
        --sidebar-border: oklch(0.269 0 0)
        --sidebar-foreground: oklch(0.985 0 0)
        --sidebar-primary: oklch(0.488 0.243 264.376)
        --sidebar-primary-foreground: oklch(0.985 0 0)
        --sidebar-ring: oklch(0.439 0 0)
    css_variables:
        - --background
        - --foreground
        - --primary
        - --primary-foreground
        - --secondary
        - --secondary-foreground
        - --accent
        - --accent-foreground
        - --card
        - --card-foreground
        - --popover
        - --popover-foreground
        - --muted
        - --muted-foreground
        - --destructive
        - --destructive-foreground
        - --border
        - --input
        - --ring
        - --chart-1
        - --chart-2
        - --chart-3
        - --chart-4
        - --chart-5
        - --radius
        - --sidebar
        - --sidebar-foreground
        - --sidebar-primary
        - --sidebar-primary-foreground
        - --sidebar-accent
        - --sidebar-accent-foreground
        - --sidebar-border
        - --sidebar-ring
        - --background
        - --foreground
        - --card
        - --card-foreground
        - --popover
        - --popover-foreground
        - --primary
        - --primary-foreground
        - --secondary
        - --secondary-foreground
        - --muted
        - --muted-foreground
        - --accent
        - --accent-foreground
        - --destructive
        - --destructive-foreground
        - --border
        - --background
        - --foreground
        - --card
        - --card-foreground
        - --popover
        - --popover-foreground
        - --primary
        - --primary-foreground
        - --secondary
        - --secondary-foreground
        - --muted
        - --muted-foreground
        - --accent
        - --accent-foreground
        - --destructive
        - --destructive-foreground
        - --border
        - --input
        - --ring
        - --chart-1
        - --chart-2
        - --chart-3
        - --chart-4
        - --chart-5
        - --radius
        - --sidebar
        - --sidebar-foreground
        - --sidebar-primary
        - --sidebar-primary-foreground
        - --sidebar-accent
        - --sidebar-accent-foreground
        - --sidebar-border
        - --sidebar-ring
        - --background
        - --foreground
        - --card
        - --card-foreground
        - --popover
        - --popover-foreground
        - --primary
        - --primary-foreground
        - --secondary
        - --secondary-foreground
        - --muted
        - --muted-foreground
        - --accent
        - --accent-foreground
        - --destructive
        - --destructive-foreground
        - --border
    component_libs:
        - Radix UI
        - Lucide Icons
        - shadcn/ui
app_structure:
    router: app-router
    layouts:
        - app/layout.tsx
    components:
        - components/bicara-app.tsx
        - components/book-page.tsx
        - components/home-screen.tsx
        - components/interactive-book.tsx
        - components/progress-dots.tsx
        - components/theme-provider.tsx
        - components/ui/
    global_styles:
        - app/globals.css
        - styles/globals.css
---

# Design System

> All design tokens are stored in the YAML frontmatter above.
> The AI agent reads the frontmatter directly — this summary is for humans.

## Overview

| Field | Value |
| ----- | ----- |
| Framework | Next.js |
| CSS | PostCSS (utility-first) |
| Theme Colors | 52 tokens |
| CSS Variables | 100 |
| Component Libs | Radix UI, Lucide Icons, shadcn/ui |
| Router | app-router |
| Layouts | 1 |
| Components | 7 |
| Global Styles | 2 |

## App Structure

```
├── app
│   ├── globals.css
│   └── layout.tsx
├── components
│   ├── bicara-app.tsx
│   ├── book-page.tsx
│   ├── home-screen.tsx
│   ├── interactive-book.tsx
│   ├── progress-dots.tsx
│   ├── theme-provider.tsx
│   └── ui
└── styles
    └── globals.css
```

## Color Palette

- `--accent` → `oklch(0.269 0 0)`
- `--accent-foreground` → `oklch(0.985 0 0)`
- `--background` → `oklch(0.145 0 0)`
- `--border` → `oklch(0.269 0 0)`
- `--card` → `oklch(0.145 0 0)`
- `--card-foreground` → `oklch(0.985 0 0)`
- `--color-accent` → `var(--accent)`
- `--color-accent-foreground` → `var(--accent-foreground)`
- `--color-background` → `var(--background)`
- `--color-border` → `var(--border)`
- `--color-card` → `var(--card)`
- `--color-card-foreground` → `var(--card-foreground)`
- `--color-destructive` → `var(--destructive)`
- `--color-destructive-foreground` → `var(--destructive-foreground)`
- `--color-foreground` → `var(--foreground)`
- `--color-input` → `var(--input)`
- `--color-muted` → `var(--muted)`
- `--color-muted-foreground` → `var(--muted-foreground)`
- `--color-popover` → `var(--popover)`
- `--color-popover-foreground` → `var(--popover-foreground)`
- `--color-primary` → `var(--primary)`
- `--color-primary-foreground` → `var(--primary-foreground)`
- `--color-ring` → `var(--ring)`
- `--color-secondary` → `var(--secondary)`
- `--color-secondary-foreground` → `var(--secondary-foreground)`
- `--color-sidebar` → `var(--sidebar)`
- `--color-sidebar-accent` → `var(--sidebar-accent)`
- `--color-sidebar-accent-foreground` → `var(--sidebar-accent-foreground)`
- `--color-sidebar-border` → `var(--sidebar-border)`
- `--color-sidebar-foreground` → `var(--sidebar-foreground)`
- `--color-sidebar-primary` → `var(--sidebar-primary)`
- `--color-sidebar-primary-foreground` → `var(--sidebar-primary-foreground)`
- `--color-sidebar-ring` → `var(--sidebar-ring)`
- `--destructive` → `oklch(0.396 0.141 25.723)`
- `--destructive-foreground` → `oklch(0.637 0.237 25.331)`
- `--foreground` → `oklch(0.985 0 0)`
- `--muted` → `oklch(0.269 0 0)`
- `--muted-foreground` → `oklch(0.708 0 0)`
- `--popover` → `oklch(0.145 0 0)`
- `--popover-foreground` → `oklch(0.985 0 0)`
- `--primary` → `oklch(0.985 0 0)`
- `--primary-foreground` → `oklch(0.205 0 0)`
- `--ring` → `oklch(0.439 0 0)`
- `--secondary` → `oklch(0.269 0 0)`
- `--secondary-foreground` → `oklch(0.985 0 0)`
- `--sidebar-accent` → `oklch(0.269 0 0)`
- `--sidebar-accent-foreground` → `oklch(0.985 0 0)`
- `--sidebar-border` → `oklch(0.269 0 0)`
- `--sidebar-foreground` → `oklch(0.985 0 0)`
- `--sidebar-primary` → `oklch(0.488 0.243 264.376)`
- `--sidebar-primary-foreground` → `oklch(0.985 0 0)`
- `--sidebar-ring` → `oklch(0.439 0 0)`

