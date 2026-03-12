"use client"

import { motion } from "framer-motion"

interface ProgressDotsProps {
  total: number
  current: number
  onDotClick: (index: number) => void
}

export function ProgressDots({ total, current, onDotClick }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: total }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onDotClick(index)}
          className={`rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            index === current 
              ? "bg-accent" 
              : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
          }`}
          animate={{
            width: index === current ? 24 : 8,
            height: 8,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30 
          }}
          aria-label={`Go to page ${index + 1}`}
          aria-current={index === current ? "page" : undefined}
        />
      ))}
    </div>
  )
}
