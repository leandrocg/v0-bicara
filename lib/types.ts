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
