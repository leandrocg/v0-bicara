"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useAnimation, PanInfo } from "framer-motion"
import { BookPage } from "./book-page"
import { ProgressDots } from "./progress-dots"
import { ChevronLeft, ChevronRight } from "lucide-react"

const bookContent = [
  {
    id: 1,
    indonesian: "Mengapa Langit Biru?",
    english: "Why is the sky blue?",
    isVocabPage: false,
  },
  {
    id: 2,
    indonesian: "Langit terlihat biru.",
    english: "The sky appears blue.",
    isVocabPage: false,
  },
  {
    id: 3,
    indonesian: "Matahari mengirim cahaya ke Bumi.",
    english: "The sun sends light to Earth.",
    isVocabPage: false,
  },
  {
    id: 4,
    indonesian: "Cahaya melewati udara.",
    english: "Light passes through the air.",
    isVocabPage: false,
  },
  {
    id: 5,
    indonesian: "Udara menyebarkan cahaya biru lebih banyak.",
    english: "The air scatters more blue light.",
    isVocabPage: false,
  },
  {
    id: 6,
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
]

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

export function InteractiveBook() {
  const [[currentPage, direction], setPage] = useState([0, 0])
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const paginate = useCallback((newDirection: number) => {
    const nextPage = currentPage + newDirection
    if (nextPage >= 0 && nextPage < bookContent.length) {
      setPage([nextPage, newDirection])
    }
  }, [currentPage])

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
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [paginate])

  const page = bookContent[currentPage]

  return (
    <div className="h-dvh w-full flex flex-col bg-background overflow-hidden">
      {/* Book header */}
      <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">📚</span>
          </div>
          <h1 className="font-bold text-foreground text-sm md:text-base">
            Mengapa Langit Biru?
          </h1>
        </div>
        <span className="text-sm font-semibold text-muted-foreground">
          {currentPage + 1} / {bookContent.length}
        </span>
      </header>

      {/* Book content area with swipe */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden"
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentPage}
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
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm shadow-lg flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-card transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent hidden md:flex"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === bookContent.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm shadow-lg flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-card transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent hidden md:flex"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Progress indicator */}
      <div className="bg-card border-t border-border">
        <ProgressDots
          total={bookContent.length}
          current={currentPage}
          onDotClick={goToPage}
        />
        
        {/* Swipe hint for mobile */}
        <p className="text-center text-xs text-muted-foreground pb-3 md:hidden">
          Swipe left or right to navigate
        </p>
      </div>
    </div>
  )
}
