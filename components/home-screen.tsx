"use client"

import { motion } from "framer-motion"
import { BookOpen, Sparkles } from "lucide-react"
import { BOOKS, type Book } from "@/lib/books-data"

interface HomeScreenProps {
  onSelectBook: (bookId: string) => void
}

function BookCard({ book, index, onSelect }: { book: Book; index: number; onSelect: () => void }) {
  return (
    <motion.button
      onClick={onSelect}
      className="relative w-full bg-card rounded-2xl shadow-lg overflow-hidden text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-accent group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Cover color band */}
      <div className={`h-24 bg-gradient-to-br ${book.coverColor} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-white/30" />
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10" />
        <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-white/10" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground leading-tight mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {book.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {book.pages.length} halaman
          </span>
          <span className="text-sm font-semibold text-accent group-hover:underline">
            Baca Sekarang
          </span>
        </div>
      </div>
    </motion.button>
  )
}

export function HomeScreen({ onSelectBook }: HomeScreenProps) {
  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Bicara
            </h1>
          </div>
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        className="px-4 py-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-center overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute top-4 left-6 w-3 h-3 rounded-full bg-white/20" />
          <div className="absolute bottom-6 right-8 w-4 h-4 rounded-full bg-white/15" />
          
          <motion.p 
            className="relative z-10 text-lg md:text-xl font-bold text-primary-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Belajar Bahasa Indonesia,
            <br />
            <span className="text-accent-foreground/90">Satu Cerita Sekali Waktu</span>
          </motion.p>
          <motion.p
            className="relative z-10 text-sm text-primary-foreground/80 mt-2 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Learn Indonesian, one story at a time
          </motion.p>
        </div>
      </motion.section>

      {/* Book Grid */}
      <section className="px-4 pb-8 max-w-2xl mx-auto">
        <motion.h2 
          className="text-lg font-bold text-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Perpustakaan
          <span className="text-muted-foreground font-normal ml-2 text-sm">(Library)</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BOOKS.map((book, index) => (
            <BookCard 
              key={book.id} 
              book={book} 
              index={index}
              onSelect={() => onSelectBook(book.id)} 
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 text-center border-t border-border">
        <p className="text-xs text-muted-foreground">
          Made with care for young learners
        </p>
      </footer>
    </div>
  )
}
