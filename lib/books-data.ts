export interface BookPage {
  indonesian: string
  english: string
  isVocabPage: boolean
  vocabulary?: { id: string; en: string }[]
}

export interface Book {
  id: string
  title: string
  description: string
  coverColor: string
  pages: BookPage[]
}

export const BOOKS: Book[] = [
  {
    id: "mengapa-langit-biru",
    title: "Why is the Sky Blue?",
    description: "Learn why the sky is blue!",
    coverColor: "from-sky-400 to-blue-600",
    pages: [
      { indonesian: "Mengapa Langit Biru?", english: "Why is the sky blue?", isVocabPage: false },
      { indonesian: "Langit terlihat biru.", english: "The sky appears blue.", isVocabPage: false },
      { indonesian: "Matahari mengirim cahaya ke Bumi.", english: "The sun sends light to Earth.", isVocabPage: false },
      { indonesian: "Cahaya melewati udara.", english: "Light passes through the air.", isVocabPage: false },
      { indonesian: "Udara menyebarkan cahaya biru lebih banyak.", english: "The air scatters more blue light.", isVocabPage: false },
      {
        indonesian: "Kosakata (Vocabulary)",
        english: "",
        isVocabPage: true,
        vocabulary: [
          { id: "langit", en: "sky" },
          { id: "cahaya", en: "light" },
          { id: "udara", en: "air" },
          { id: "menyebarkan", en: "scatter" },
        ],
      },
    ],
  },
  {
    id: "makan-pagi",
    title: "Breakfast",
    description: "A story about a delicious breakfast!",
    coverColor: "from-amber-400 to-orange-500",
    pages: [
      { indonesian: "Makan Pagi", english: "Breakfast", isVocabPage: false },
      { indonesian: "Setiap pagi, saya bangun tidur.", english: "Every morning, I wake up.", isVocabPage: false },
      { indonesian: "Saya pergi ke dapur.", english: "I go to the kitchen.", isVocabPage: false },
      { indonesian: "Ibu membuat roti dan telur.", english: "Mom makes bread and eggs.", isVocabPage: false },
      { indonesian: "Saya minum susu hangat.", english: "I drink warm milk.", isVocabPage: false },
      {
        indonesian: "Kosakata (Vocabulary)",
        english: "",
        isVocabPage: true,
        vocabulary: [
          { id: "pagi", en: "morning" },
          { id: "dapur", en: "kitchen" },
          { id: "roti", en: "bread" },
          { id: "susu", en: "milk" },
        ],
      },
    ],
  },
  {
    id: "warna-warni",
    title: "Colorful",
    description: "Learn about beautiful colors!",
    coverColor: "from-pink-400 to-rose-500",
    pages: [
      { indonesian: "Warna-Warni", english: "Colorful", isVocabPage: false },
      { indonesian: "Dunia ini penuh warna.", english: "The world is full of colors.", isVocabPage: false },
      { indonesian: "Langit berwarna biru.", english: "The sky is blue.", isVocabPage: false },
      { indonesian: "Rumput berwarna hijau.", english: "The grass is green.", isVocabPage: false },
      { indonesian: "Matahari berwarna kuning.", english: "The sun is yellow.", isVocabPage: false },
      {
        indonesian: "Kosakata (Vocabulary)",
        english: "",
        isVocabPage: true,
        vocabulary: [
          { id: "warna", en: "color" },
          { id: "biru", en: "blue" },
          { id: "hijau", en: "green" },
          { id: "kuning", en: "yellow" },
        ],
      },
    ],
  },
  {
    id: "keluarga-saya",
    title: "My Family",
    description: "A story about my beloved family!",
    coverColor: "from-emerald-400 to-teal-500",
    pages: [
      { indonesian: "Keluarga Saya", english: "My Family", isVocabPage: false },
      { indonesian: "Ini adalah keluarga saya.", english: "This is my family.", isVocabPage: false },
      { indonesian: "Ayah bekerja di kantor.", english: "Dad works at the office.", isVocabPage: false },
      { indonesian: "Ibu memasak di rumah.", english: "Mom cooks at home.", isVocabPage: false },
      { indonesian: "Kami bermain bersama.", english: "We play together.", isVocabPage: false },
      {
        indonesian: "Kosakata (Vocabulary)",
        english: "",
        isVocabPage: true,
        vocabulary: [
          { id: "keluarga", en: "family" },
          { id: "ayah", en: "father" },
          { id: "ibu", en: "mother" },
          { id: "rumah", en: "home" },
        ],
      },
    ],
  },
  {
    id: "di-taman",
    title: "At the Park",
    description: "A fun adventure at the playground!",
    coverColor: "from-violet-400 to-purple-500",
    pages: [
      { indonesian: "Di Taman", english: "At the Park", isVocabPage: false },
      { indonesian: "Hari ini cerah sekali.", english: "Today is very sunny.", isVocabPage: false },
      { indonesian: "Saya pergi ke taman.", english: "I go to the park.", isVocabPage: false },
      { indonesian: "Ada banyak bunga cantik.", english: "There are many beautiful flowers.", isVocabPage: false },
      { indonesian: "Burung-burung bernyanyi.", english: "The birds are singing.", isVocabPage: false },
      {
        indonesian: "Kosakata (Vocabulary)",
        english: "",
        isVocabPage: true,
        vocabulary: [
          { id: "taman", en: "park" },
          { id: "bunga", en: "flower" },
          { id: "burung", en: "bird" },
          { id: "cerah", en: "sunny" },
        ],
      },
    ],
  },
]
