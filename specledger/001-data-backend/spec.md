# Feature Specification: Backend Data Migration

**Feature Branch**: `001-data-backend`
**Created**: 2026-03-14
**Status**: Draft
**Input**: User description: "The data needs to be in a backend"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Book Library from Backend (Priority: P1)

A learner opens the Bicara app and sees the full library of Indonesian language books. The book catalog (titles, descriptions, cover colors) is loaded from the backend rather than from a hardcoded file. The experience is identical to today — the learner sees book cards and can select one.

**Why this priority**: This is the foundational story — if the catalog doesn't load from the backend, nothing else works. It also proves the end-to-end data flow.

**Independent Test**: Can be fully tested by opening the home screen and verifying that all 5 books appear with correct titles and descriptions, sourced from the backend.

**Acceptance Scenarios**:

1. **Given** the app loads, **When** the home screen renders, **Then** all books from the backend are displayed with title, description, and cover color
2. **Given** the backend is available, **When** the learner views the library, **Then** books load within a reasonable time without visible delay
3. **Given** the backend is temporarily unavailable, **When** the learner opens the app, **Then** the learner sees a clear loading or error state rather than a blank screen

---

### User Story 2 - Read Book Pages from Backend (Priority: P1)

A learner selects a book and reads through its pages. Each page displays bilingual content (Indonesian and English text). The page content is loaded from the backend. Navigation (swipe, buttons, keyboard) continues to work as before.

**Why this priority**: Reading pages is the core learning experience. Without page content from the backend, the migration is incomplete.

**Independent Test**: Can be tested by selecting any book and navigating through all pages, verifying bilingual text displays correctly.

**Acceptance Scenarios**:

1. **Given** a learner selects a book, **When** the book viewer opens, **Then** all pages are available with correct Indonesian and English text
2. **Given** a learner navigates to the last page, **When** the page is a vocabulary page, **Then** vocabulary items display with Indonesian words and English translations
3. **Given** a learner is reading a book, **When** they navigate between pages, **Then** page transitions are smooth without re-fetching delays

---

### User Story 3 - Content Management (Priority: P2)

A content author can add, update, or remove books and pages in the backend without requiring a code change or app redeployment. New books appear in the library immediately for learners.

**Why this priority**: This is the primary business reason for moving data to a backend — enabling content updates without developer involvement.

**Independent Test**: Can be tested by adding a new book record in the backend and confirming it appears in the app without any code changes.

**Acceptance Scenarios**:

1. **Given** a new book is added to the backend, **When** a learner refreshes the app, **Then** the new book appears in the library
2. **Given** a book's content is updated in the backend, **When** a learner opens that book, **Then** they see the updated content
3. **Given** a book is removed from the backend, **When** a learner refreshes the library, **Then** the removed book no longer appears

---

### Edge Cases

- What happens when a book has zero pages?
- How does the system handle a page with missing Indonesian or English text?
- What happens if the backend returns malformed or incomplete data?
- How does the app behave on slow network connections?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST store all book catalog data (title, description, cover color, ID) in the backend
- **FR-002**: System MUST store all page content (Indonesian text, English text, vocabulary flag, vocabulary items) in the backend
- **FR-003**: System MUST serve the book catalog to the app so the home screen can render the library
- **FR-004**: System MUST serve page content for a selected book so the book viewer can render all pages
- **FR-005**: System MUST preserve the existing data structure: books contain ordered pages, some pages contain vocabulary items
- **FR-006**: System MUST support content updates in the backend without requiring app redeployment
- **FR-007**: System MUST maintain the current 5 books and their ~30 pages as seed data in the backend

### Key Entities

- **Book**: A bilingual Indonesian learning book with a unique ID, title, description, cover color, and an ordered collection of pages
- **Page**: A single page within a book containing Indonesian text, English translation, a vocabulary flag, and an optional list of vocabulary items. Pages have a defined order within their book
- **Vocabulary Item**: An Indonesian word paired with its English translation, belonging to a vocabulary page

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 5 existing books with their complete page content are available from the backend
- **SC-002**: The learner experience (browsing, reading, navigating) is indistinguishable from the current hardcoded version
- **SC-003**: A new book can be added to the backend and appear in the app without any code changes
- **SC-004**: The home screen loads the book library within 2 seconds on a standard connection
- **SC-005**: Page content loads without perceptible delay when navigating within a book

### Previous work

No previous related features or tasks found.

## Dependencies & Assumptions

### Assumptions

- The existing Supabase project will be used as the backend
- The current data model (Book → Pages → Vocabulary) is stable and does not need schema changes beyond what exists in `books-data.ts`
- The app will fetch data on load rather than using offline-first or caching strategies (can be added later)
- Authentication is not required for reading book content — all content is publicly accessible
- The 5 existing books serve as seed data and will be migrated as part of this feature
