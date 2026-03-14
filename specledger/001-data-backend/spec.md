# Feature Specification: Backend Data Migration

**Feature Branch**: `001-data-backend`
**Created**: 2026-03-14
**Status**: Draft
**Input**: User description: "The data needs to be in a backend"

## Clarifications

### Session 2026-03-14

- Q: What replaces the static data file? → A: Backend database (not static files). Cache layer is out of scope for this sprint.
- Q: Is content editing UI in scope? → A: No. Content editing is out of scope for this spec — we only want a database schema and data migration.
- Q: How to handle books with zero pages? → A: Don't show in UI, client should log error in console. Books should always have at least 1 page.
- Q: How to handle pages with missing Indonesian or English text? → A: Treat as invalid data — handle the same as zero pages (exclude from UI, log error).
- Q: How to handle slow network connections? → A: Out of scope for the MVP.
- Q: What is the role of seed data? → A: Seed data should bootstrap environments for e2e testing (to be added as a core principle in CONSTITUTION.md).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Book Library from Backend (Priority: P1)

A learner opens the Bicara app and sees the full library of Indonesian language books. The book catalog (titles, descriptions, cover colors) is loaded from the backend database instead of a static file. The experience is identical to today — the learner sees book cards and can select one.

**Why this priority**: This is the foundational story — if the catalog doesn't load from the backend, nothing else works. It also proves the end-to-end data flow.

**Independent Test**: Can be fully tested by opening the home screen and verifying that all 5 books appear with correct titles and descriptions, sourced from the backend.

**Acceptance Scenarios**:

1. **Given** the app loads, **When** the home screen renders, **Then** all books from the backend are displayed with title, description, and cover color
2. **Given** the backend is available, **When** the learner views the library, **Then** books load within a reasonable time without visible delay
3. **Given** the backend is temporarily unavailable, **When** the learner opens the app, **Then** the learner sees a clear loading or error state rather than a blank screen
4. **Given** a book exists in the backend with zero pages, **When** the home screen renders, **Then** the book is excluded from the library and an error is logged to the console

---

### User Story 2 - Read Book Pages from Backend (Priority: P1)

A learner selects a book and reads through its pages. Each page displays bilingual content (Indonesian and English text). The page content is loaded from the backend database instead of a static file. Navigation (swipe, buttons, keyboard) continues to work as before.

**Why this priority**: Reading pages is the core learning experience. Without page content from the backend, the migration is incomplete.

**Independent Test**: Can be tested by selecting any book and navigating through all pages, verifying bilingual text displays correctly.

**Acceptance Scenarios**:

1. **Given** a learner selects a book, **When** the book viewer opens, **Then** all pages are available with correct Indonesian and English text
2. **Given** a learner navigates to the last page, **When** the page is a vocabulary page, **Then** vocabulary items display with Indonesian words and English translations
3. **Given** a learner is reading a book, **When** they navigate between pages, **Then** page transitions are smooth without re-fetching delays

---

### Edge Cases

- A book with zero pages MUST NOT appear in the library; the client logs an error to the console
- A page with missing Indonesian or English text is treated as invalid data — the book containing it MUST NOT appear in the library; the client logs an error to the console
- Malformed or incomplete backend data MUST be handled gracefully: invalid books are filtered out client-side with console errors, valid books still display normally

### Out of Scope

- Content editing UI or admin interface (only database schema and data migration)
- Cache layer or offline-first strategies
- Slow network connection handling (loading spinners, progressive loading, etc.)
- Authentication or access control for content

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST store all book catalog data (title, description, cover color, ID) in the backend database
- **FR-002**: System MUST store all page content (Indonesian text, English text, vocabulary flag, vocabulary items) in the backend database
- **FR-003**: System MUST serve the book catalog to the app so the home screen can render the library
- **FR-004**: System MUST serve page content for a selected book so the book viewer can render all pages
- **FR-005**: System MUST preserve the existing data structure: books contain ordered pages, some pages contain vocabulary items
- **FR-006**: System MUST include seed data (current 5 books and ~30 pages) to bootstrap environments for e2e testing
- **FR-007**: Client MUST validate data from the backend: books with zero pages or pages with missing text are excluded from the UI and errors are logged to the console

### Key Entities

- **Book**: A bilingual Indonesian learning book with a unique ID, title, description, cover color, and an ordered collection of pages. Must have at least 1 page to be valid.
- **Page**: A single page within a book containing Indonesian text, English translation, a vocabulary flag, and an optional list of vocabulary items. Pages have a defined order within their book. Both Indonesian and English text are required for a page to be valid.
- **Vocabulary Item**: An Indonesian word paired with its English translation, belonging to a vocabulary page

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 5 existing books with their complete page content are available from the backend
- **SC-002**: The learner experience (browsing, reading, navigating) is indistinguishable from the current hardcoded version
- **SC-003**: The home screen loads the book library within 2 seconds on a standard connection
- **SC-004**: Page content loads without perceptible delay when navigating within a book
- **SC-005**: Seed data can bootstrap a fresh environment, enabling e2e test execution without manual data setup

### Previous work

No previous related features or tasks found.

## Dependencies & Assumptions

### Assumptions

- The existing Supabase project will be used as the backend database
- The current data model (Book → Pages → Vocabulary) is stable and does not need schema changes beyond what exists in `books-data.ts`
- The app will fetch data directly from the backend on load (no caching layer)
- Authentication is not required for reading book content — all content is publicly accessible
- The 5 existing books serve as seed data to bootstrap environments for e2e testing
