# Data Model: Backend Data Migration

**Date**: 2026-03-14
**Feature**: 001-data-backend

## Entity Relationship

```
books (1) ──── (N) pages
                    └── vocabulary: jsonb[]
```

## Tables

### books

| Column      | Type   | Constraints           | Notes                                    |
|-------------|--------|-----------------------|------------------------------------------|
| id          | text   | PRIMARY KEY           | Slug-style ID (e.g., "mengapa-langit-biru") |
| title       | text   | NOT NULL              | Display title (e.g., "Why is the Sky Blue?") |
| description | text   |                       | Short description for library card       |
| cover_color | text   |                       | Tailwind gradient class (e.g., "from-sky-400 to-blue-600") |

### pages

| Column       | Type    | Constraints                                      | Notes                                    |
|--------------|---------|--------------------------------------------------|------------------------------------------|
| id           | bigint  | PRIMARY KEY, GENERATED ALWAYS AS IDENTITY        | Auto-increment                           |
| book_id      | text    | NOT NULL, FK → books(id) ON DELETE CASCADE       | Parent book                              |
| page_number  | int     | NOT NULL                                         | 1-based ordering within book             |
| indonesian   | text    | NOT NULL                                         | Indonesian language text                 |
| english      | text    |                                                  | English translation                      |
| is_vocab_page| boolean | DEFAULT false                                    | True for vocabulary summary pages        |
| vocabulary   | jsonb   |                                                  | Array of `{id: string, en: string}`, null for non-vocab pages |

**Unique constraint**: `(book_id, page_number)` — ensures page ordering integrity.

## Validation Rules

From spec FR-007 and edge cases:

- A book is **valid** if it has at least 1 page (client-side filter)
- A page is **valid** if both `indonesian` and `english` text are present (client-side filter)
- Invalid books are excluded from the UI; errors are logged to the console
- Database allows nullable `english` and empty `vocabulary` to support future content authoring workflows; validation is enforced at the client

## Row Level Security

```sql
-- Enable RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Public read access (anon key)
CREATE POLICY "Public read access" ON books FOR SELECT USING (true);
CREATE POLICY "Public read access" ON pages FOR SELECT USING (true);
```

No insert/update/delete policies — content management is out of scope.

## Mapping from Existing TypeScript Types

| TypeScript (books-data.ts)  | PostgreSQL              | Notes                          |
|-----------------------------|-------------------------|--------------------------------|
| `Book.id`                   | `books.id`              | Direct mapping                 |
| `Book.title`                | `books.title`           | Direct mapping                 |
| `Book.description`          | `books.description`     | Direct mapping                 |
| `Book.coverColor`           | `books.cover_color`     | camelCase → snake_case         |
| `BookPage.indonesian`       | `pages.indonesian`      | Direct mapping                 |
| `BookPage.english`          | `pages.english`         | Direct mapping                 |
| `BookPage.isVocabPage`      | `pages.is_vocab_page`   | camelCase → snake_case         |
| `BookPage.vocabulary`       | `pages.vocabulary`      | TS object[] → JSONB array      |
| (implicit array index)      | `pages.page_number`     | New field for explicit ordering |
