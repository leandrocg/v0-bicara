-- Books table
CREATE TABLE books (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  cover_color text
);

-- Pages table
CREATE TABLE pages (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  book_id text NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  page_number int NOT NULL,
  indonesian text NOT NULL,
  english text,
  is_vocab_page boolean DEFAULT false,
  vocabulary jsonb,
  UNIQUE(book_id, page_number)
);

-- Enable RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public read access" ON books FOR SELECT USING (true);
CREATE POLICY "Public read access" ON pages FOR SELECT USING (true);
