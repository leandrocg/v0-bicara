# API Contracts: Supabase Queries

**Date**: 2026-03-14
**Feature**: 001-data-backend

Since this app uses the Supabase JS client directly (no custom API routes), the "contracts" are the Supabase query patterns the app will use.

## Q1: Fetch All Books with Pages

**Maps to**: FR-003 (serve book catalog), FR-004 (serve page content)
**Used by**: `bicara-app.tsx`, `home-screen.tsx`

```typescript
const { data: books, error } = await supabase
  .from('books')
  .select(`
    id,
    title,
    description,
    cover_color,
    pages (
      id,
      page_number,
      indonesian,
      english,
      is_vocab_page,
      vocabulary
    )
  `)
  .order('title')
  .order('page_number', { referencedTable: 'pages' })
```

**Response shape** (maps to existing `Book[]` interface):
```typescript
type BooksResponse = {
  id: string
  title: string
  description: string | null
  cover_color: string | null
  pages: {
    id: number
    page_number: number
    indonesian: string
    english: string | null
    is_vocab_page: boolean
    vocabulary: { id: string; en: string }[] | null
  }[]
}[]
```

**Client-side validation** (FR-007):
- Filter out books where `pages.length === 0`
- Filter out books where any page has missing `indonesian` or `english`
- Log `console.error()` for each filtered book with reason

## Q2: Fetch Single Book with Pages

**Maps to**: FR-004 (serve page content for selected book)
**Used by**: `interactive-book.tsx` (if lazy loading is added later)

```typescript
const { data: book, error } = await supabase
  .from('books')
  .select(`
    id,
    title,
    description,
    cover_color,
    pages (
      id,
      page_number,
      indonesian,
      english,
      is_vocab_page,
      vocabulary
    )
  `)
  .eq('id', bookId)
  .order('page_number', { referencedTable: 'pages' })
  .single()
```

**Note**: For the MVP, Q1 (fetch all) is sufficient since the dataset is small. Q2 is documented for reference but may not be needed in the initial implementation.
