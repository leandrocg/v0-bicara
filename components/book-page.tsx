"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface BookPageProps {
  indonesian: string
  english: string
  isVocabPage?: boolean
  vocabulary?: { id: string; en: string }[]
}

export function BookPage({ indonesian, english, isVocabPage, vocabulary }: BookPageProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  if (isVocabPage && vocabulary) {
    return (
      <div className="h-full w-full flex flex-col relative">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
        
        {/* Top section - Title */}
        <motion.div 
          className="flex-1 bg-primary flex items-center justify-center p-6 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold text-primary-foreground text-center leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {indonesian}
          </motion.h2>
          
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-white/10" />
        </motion.div>

        {/* Bottom section - Vocabulary cards */}
        <motion.div 
          className="flex-1 bg-secondary flex flex-col items-center justify-center p-4 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm font-semibold text-secondary-foreground/70 mb-3">
            (Vocabulary)
          </p>
          <div className="grid gap-2 w-full max-w-xs">
            {vocabulary.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-card rounded-xl p-3 shadow-md flex items-center justify-between"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
              >
                <span className="font-bold text-primary text-lg">{item.id}</span>
                <span className="text-accent font-semibold">—</span>
                <span className="font-semibold text-secondary-foreground">{item.en}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col relative">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      
      {/* Top half - Indonesian */}
      <motion.div 
        className="flex-1 bg-primary flex items-center justify-center p-6 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p 
          className="text-2xl md:text-4xl font-extrabold text-primary-foreground text-center leading-relaxed px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {indonesian}
        </motion.p>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-white/10" />
        <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-white/20" />
        <div className="absolute bottom-8 right-8 w-4 h-4 rounded-full bg-white/15" />
      </motion.div>

      {/* Bottom half - English (blurred until tapped) */}
      <motion.button
        className="flex-1 bg-secondary flex flex-col items-center justify-center p-6 relative overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-accent"
        onClick={() => setIsRevealed(!isRevealed)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        aria-label={isRevealed ? "Hide English translation" : "Reveal English translation"}
      >
        <AnimatePresence mode="wait">
          {!isRevealed && (
            <motion.div
              key="hint"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <svg 
                    className="w-5 h-5 text-accent" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                    />
                  </svg>
                </motion.div>
                <span className="text-sm font-semibold text-secondary-foreground/60">
                  Tap to reveal
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p 
          className="text-xl md:text-3xl font-bold text-secondary-foreground text-center leading-relaxed px-4 relative z-10"
          animate={{ 
            filter: isRevealed ? "blur(0px)" : "blur(12px)",
            opacity: isRevealed ? 1 : 0.4
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {english}
        </motion.p>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-accent/10" />
        <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-accent/10" />
      </motion.button>
    </div>
  )
}
