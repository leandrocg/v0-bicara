"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { BookPage } from "./book-page"
import { ProgressDots } from "./progress-dots"
import { ChevronLeft, ChevronRight, ArrowLeft, BookOpen } from "lucide-react"
import type { Book } from "@/lib/books-data"

interface InteractiveBookProps {
  book: Book
  onBack: () => void
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
}

export function InteractiveBook({ book, onBack }: InteractiveBookProps) {
  const [[currentPage, direction], setPage] = useState([0, 0])

  const paginate = useCallback((newDirection: number) => {
    const nextPage = currentPage + newDirection
    if (nextPage >= 0 && nextPage < book.pages.length) {
      setPage([nextPage, newDirection])
    }
  }, [currentPage, book.pages.length])

  const goToPage = (index: number) => {
    const newDirection = index > currentPage ? 1 : -1
    setPage([index, newDirection])
  }

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    const swipe = swipePower(offset.x, velocity.x)

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1)
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        paginate(1)
      } else if (e.key === "ArrowLeft") {
        paginate(-1)
      } else if (e.key === "Escape") {
        onBack()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [paginate, onBack])

  // Reset page when book changes
  useEffect(() => {
    setPage([0, 0])
  }, [book.id])

  const page = book.pages[currentPage]

  return (
    <motion.div 
      className="h-dvh w-full flex flex-col bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Book header */}
      <header className="flex items-center justify-between px-3 py-2 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent text-muted-foreground hover:text-foreground"
            aria-label="Back to library"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-medium hidden sm:inline">Perpustakaan</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2 flex-1 justify-center">
          <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-3 h-3 text-primary-foreground" />
          </div>
          <h1 className="font-bold text-foreground text-sm md:text-base truncate max-w-[180px] sm:max-w-none">
            {book.title}
          </h1>
        </div>

        <span className="text-xs font-semibold text-muted-foreground min-w-[50px] text-right">
          {currentPage + 1} / {book.pages.length}
        </span>
      </header>

      {/* Book content area with swipe */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={`${book.id}-${currentPage}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <BookPage
              indonesian={page.indonesian}
              english={page.english}
              isVocabPage={page.isVocabPage}
              vocabulary={page.vocabulary}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - visible on larger screens */}
        <button
          onClick={() => paginate(-1)}
          disabled={currentPage === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm shadow-lg items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-card transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent hidden md:flex"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === book.pages.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm shadow-lg items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-card transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent hidden md:flex"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Bottom navigation */}
      <div className="bg-card border-t border-border">
        {/* Mobile navigation buttons */}
        <div className="flex items-center justify-between px-4 py-2 md:hidden">
          <button
            onClick={() => paginate(-1)}
            disabled={currentPage === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-muted disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium text-foreground"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>
          
          <ProgressDots
            total={book.pages.length}
            current={currentPage}
            onDotClick={goToPage}
          />

          <button
            onClick={() => paginate(1)}
            disabled={currentPage === book.pages.length - 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-muted disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium text-foreground"
            aria-label="Next page"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop progress indicator */}
        <div className="hidden md:block">
          <ProgressDots
            total={book.pages.length}
            current={currentPage}
            onDotClick={goToPage}
          />
        </div>
        
        {/* Swipe hint for mobile */}
        <p className="text-center text-xs text-muted-foreground pb-2 md:pb-3 md:hidden">
          Swipe or use buttons to navigate
        </p>
      </div>
    </motion.div>
  )
}
