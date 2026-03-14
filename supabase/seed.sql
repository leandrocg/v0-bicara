-- Seed books
INSERT INTO books (id, title, description, cover_color) VALUES
  ('mengapa-langit-biru', 'Why is the Sky Blue?', 'Learn why the sky is blue!', 'from-sky-400 to-blue-600'),
  ('makan-pagi', 'Breakfast', 'A story about a delicious breakfast!', 'from-amber-400 to-orange-500'),
  ('warna-warni', 'Colorful', 'Learn about beautiful colors!', 'from-pink-400 to-rose-500'),
  ('keluarga-saya', 'My Family', 'A story about my beloved family!', 'from-emerald-400 to-teal-500'),
  ('di-taman', 'At the Park', 'A fun adventure at the playground!', 'from-violet-400 to-purple-500')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  cover_color = EXCLUDED.cover_color;

-- Seed pages: mengapa-langit-biru
INSERT INTO pages (book_id, page_number, indonesian, english, is_vocab_page, vocabulary) VALUES
  ('mengapa-langit-biru', 1, 'Mengapa Langit Biru?', 'Why is the sky blue?', false, NULL),
  ('mengapa-langit-biru', 2, 'Langit terlihat biru.', 'The sky appears blue.', false, NULL),
  ('mengapa-langit-biru', 3, 'Matahari mengirim cahaya ke Bumi.', 'The sun sends light to Earth.', false, NULL),
  ('mengapa-langit-biru', 4, 'Cahaya melewati udara.', 'Light passes through the air.', false, NULL),
  ('mengapa-langit-biru', 5, 'Udara menyebarkan cahaya biru lebih banyak.', 'The air scatters more blue light.', false, NULL),
  ('mengapa-langit-biru', 6, 'Kosakata (Vocabulary)', '', true, '[{"id":"langit","en":"sky"},{"id":"cahaya","en":"light"},{"id":"udara","en":"air"},{"id":"menyebarkan","en":"scatter"}]')
ON CONFLICT (book_id, page_number) DO UPDATE SET
  indonesian = EXCLUDED.indonesian,
  english = EXCLUDED.english,
  is_vocab_page = EXCLUDED.is_vocab_page,
  vocabulary = EXCLUDED.vocabulary;

-- Seed pages: makan-pagi
INSERT INTO pages (book_id, page_number, indonesian, english, is_vocab_page, vocabulary) VALUES
  ('makan-pagi', 1, 'Makan Pagi', 'Breakfast', false, NULL),
  ('makan-pagi', 2, 'Setiap pagi, saya bangun tidur.', 'Every morning, I wake up.', false, NULL),
  ('makan-pagi', 3, 'Saya pergi ke dapur.', 'I go to the kitchen.', false, NULL),
  ('makan-pagi', 4, 'Ibu membuat roti dan telur.', 'Mom makes bread and eggs.', false, NULL),
  ('makan-pagi', 5, 'Saya minum susu hangat.', 'I drink warm milk.', false, NULL),
  ('makan-pagi', 6, 'Kosakata (Vocabulary)', '', true, '[{"id":"pagi","en":"morning"},{"id":"dapur","en":"kitchen"},{"id":"roti","en":"bread"},{"id":"susu","en":"milk"}]')
ON CONFLICT (book_id, page_number) DO UPDATE SET
  indonesian = EXCLUDED.indonesian,
  english = EXCLUDED.english,
  is_vocab_page = EXCLUDED.is_vocab_page,
  vocabulary = EXCLUDED.vocabulary;

-- Seed pages: warna-warni
INSERT INTO pages (book_id, page_number, indonesian, english, is_vocab_page, vocabulary) VALUES
  ('warna-warni', 1, 'Warna-Warni', 'Colorful', false, NULL),
  ('warna-warni', 2, 'Dunia ini penuh warna.', 'The world is full of colors.', false, NULL),
  ('warna-warni', 3, 'Langit berwarna biru.', 'The sky is blue.', false, NULL),
  ('warna-warni', 4, 'Rumput berwarna hijau.', 'The grass is green.', false, NULL),
  ('warna-warni', 5, 'Matahari berwarna kuning.', 'The sun is yellow.', false, NULL),
  ('warna-warni', 6, 'Kosakata (Vocabulary)', '', true, '[{"id":"warna","en":"color"},{"id":"biru","en":"blue"},{"id":"hijau","en":"green"},{"id":"kuning","en":"yellow"}]')
ON CONFLICT (book_id, page_number) DO UPDATE SET
  indonesian = EXCLUDED.indonesian,
  english = EXCLUDED.english,
  is_vocab_page = EXCLUDED.is_vocab_page,
  vocabulary = EXCLUDED.vocabulary;

-- Seed pages: keluarga-saya
INSERT INTO pages (book_id, page_number, indonesian, english, is_vocab_page, vocabulary) VALUES
  ('keluarga-saya', 1, 'Keluarga Saya', 'My Family', false, NULL),
  ('keluarga-saya', 2, 'Ini adalah keluarga saya.', 'This is my family.', false, NULL),
  ('keluarga-saya', 3, 'Ayah bekerja di kantor.', 'Dad works at the office.', false, NULL),
  ('keluarga-saya', 4, 'Ibu memasak di rumah.', 'Mom cooks at home.', false, NULL),
  ('keluarga-saya', 5, 'Kami bermain bersama.', 'We play together.', false, NULL),
  ('keluarga-saya', 6, 'Kosakata (Vocabulary)', '', true, '[{"id":"keluarga","en":"family"},{"id":"ayah","en":"father"},{"id":"ibu","en":"mother"},{"id":"rumah","en":"home"}]')
ON CONFLICT (book_id, page_number) DO UPDATE SET
  indonesian = EXCLUDED.indonesian,
  english = EXCLUDED.english,
  is_vocab_page = EXCLUDED.is_vocab_page,
  vocabulary = EXCLUDED.vocabulary;

-- Seed pages: di-taman
INSERT INTO pages (book_id, page_number, indonesian, english, is_vocab_page, vocabulary) VALUES
  ('di-taman', 1, 'Di Taman', 'At the Park', false, NULL),
  ('di-taman', 2, 'Hari ini cerah sekali.', 'Today is very sunny.', false, NULL),
  ('di-taman', 3, 'Saya pergi ke taman.', 'I go to the park.', false, NULL),
  ('di-taman', 4, 'Ada banyak bunga cantik.', 'There are many beautiful flowers.', false, NULL),
  ('di-taman', 5, 'Burung-burung bernyanyi.', 'The birds are singing.', false, NULL),
  ('di-taman', 6, 'Kosakata (Vocabulary)', '', true, '[{"id":"taman","en":"park"},{"id":"bunga","en":"flower"},{"id":"burung","en":"bird"},{"id":"cerah","en":"sunny"}]')
ON CONFLICT (book_id, page_number) DO UPDATE SET
  indonesian = EXCLUDED.indonesian,
  english = EXCLUDED.english,
  is_vocab_page = EXCLUDED.is_vocab_page,
  vocabulary = EXCLUDED.vocabulary;
