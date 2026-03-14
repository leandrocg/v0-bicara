"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HomeScreen } from "./home-screen"
import { InteractiveBook } from "./interactive-book"
import { supabase } from "@/lib/supabase"
import type { Book } from "@/lib/types"

function validateBooks(rawBooks: Book[]): Book[] {
  return rawBooks.filter((book) => {
    if (!book.pages || book.pages.length === 0) {
      console.error(`Book "${book.id}" excluded: has zero pages`)
      return false
    }
    const hasInvalidPage = book.pages.some(
      (page) => !page.indonesian || (!page.english && !page.isVocabPage)
    )
    if (hasInvalidPage) {
      console.error(
        `Book "${book.id}" excluded: has pages with missing Indonesian or English text`
      )
      return false
    }
    return true
  })
}

export function BicaraApp() {
  const [currentBookId, setCurrentBookId] = useState<string | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBooks() {
      const { data, error: fetchError } = await supabase
        .from("books")
        .select(
          `
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
        `
        )
        .order("title")
        .order("page_number", { referencedTable: "pages" })

      if (fetchError) {
        console.error("Failed to fetch books:", fetchError)
        setError("Failed to load books. Please try again.")
        setLoading(false)
        return
      }

      // Map snake_case DB response to camelCase app interfaces
      const mapped: Book[] = (data ?? []).map((book) => ({
        id: book.id,
        title: book.title,
        description: book.description ?? "",
        coverColor: book.cover_color ?? "",
        pages: (book.pages ?? []).map((page) => ({
          indonesian: page.indonesian,
          english: page.english ?? "",
          isVocabPage: page.is_vocab_page ?? false,
          vocabulary: page.vocabulary as
            | { id: string; en: string }[]
            | undefined,
        })),
      }))

      setBooks(validateBooks(mapped))
      setLoading(false)
    }

    fetchBooks()
  }, [])

  const selectedBook = currentBookId
    ? books.find((book) => book.id === currentBookId)
    : null

  const handleSelectBook = (bookId: string) => {
    setCurrentBookId(bookId)
  }

  const handleBackToLibrary = () => {
    setCurrentBookId(null)
  }

  if (loading) {
    return (
      <div className="min-h-dvh bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Loading books...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-dvh bg-background flex items-center justify-center">
        <p className="text-destructive text-lg">{error}</p>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {selectedBook ? (
        <motion.div
          key="book-viewer"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <InteractiveBook book={selectedBook} onBack={handleBackToLibrary} />
        </motion.div>
      ) : (
        <motion.div
          key="home-screen"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <HomeScreen books={books} onSelectBook={handleSelectBook} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
