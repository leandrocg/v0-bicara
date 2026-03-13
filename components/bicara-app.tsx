"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HomeScreen } from "./home-screen"
import { InteractiveBook } from "./interactive-book"
import { BOOKS } from "@/lib/books-data"

export function BicaraApp() {
  const [currentBookId, setCurrentBookId] = useState<string | null>(null)

  const selectedBook = currentBookId 
    ? BOOKS.find(book => book.id === currentBookId) 
    : null

  const handleSelectBook = (bookId: string) => {
    setCurrentBookId(bookId)
  }

  const handleBackToLibrary = () => {
    setCurrentBookId(null)
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
          <HomeScreen onSelectBook={handleSelectBook} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
