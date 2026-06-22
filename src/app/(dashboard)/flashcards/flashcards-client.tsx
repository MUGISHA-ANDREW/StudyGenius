"use client"

import { useState } from "react"
import { Flashcard } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { BrainCircuit, Trophy, RotateCcw } from "lucide-react"
import { reviewFlashcard } from "@/actions/flashcard"
import { cn } from "@/lib/utils"

interface FlashcardsClientProps {
  initialCards: Flashcard[]
}

export function FlashcardsClient({ initialCards }: FlashcardsClientProps) {
  const [cards, setCards] = useState(initialCards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [finished, setFinished] = useState(false)

  const currentCard = cards[currentIndex]

  const onReview = async (quality: number) => {
    try {
        await reviewFlashcard(currentCard.id, quality)
        
        if (currentIndex < cards.length - 1) {
          setIsFlipped(false)
          setTimeout(() => {
            setCurrentIndex(currentIndex + 1)
          }, 300)
        } else {
          setFinished(true)
        }
    } catch (error) {
        console.error("Failed to review card:", error)
    }
  }

  if (cards.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-20 text-center">
        <Trophy className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-bold">Review Complete!</h2>
        <p className="text-muted-foreground mt-2">You&apos;ve finished all your scheduled reviews for today.</p>
      </Card>
    )
  }

  if (finished) {
    return (
      <Card className="flex flex-col items-center justify-center p-20 text-center">
        <Trophy className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-bold">Great Job!</h2>
        <p className="text-muted-foreground mt-2">You&apos;ve completed {cards.length} flashcards.</p>
        <Button className="mt-6" onClick={() => window.location.reload()}>
          <RotateCcw className="h-4 w-4 mr-2" /> Start Again
        </Button>
      </Card>
    )
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Card {currentIndex + 1} of {cards.length}
        </p>
      </div>

      <div className="relative h-80 w-full perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? "-back" : "-front")}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <Card className="h-full w-full flex items-center justify-center p-8 text-center text-xl shadow-xl border-2 border-primary/20">
              <CardContent>
                {isFlipped ? currentCard.back : currentCard.front}
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  Click to flip
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {isFlipped && (
        <div className="grid grid-cols-5 gap-2 animate-in fade-in slide-in-from-bottom-4">
          {[1, 2, 3, 4, 5].map((q) => (
            <Button 
                key={q} 
                variant="outline" 
                onClick={() => onReview(q)}
                className={cn(
                    "h-12",
                    q <= 2 ? "hover:bg-destructive hover:text-white" : 
                    q === 3 ? "hover:bg-yellow-500 hover:text-white" : 
                    "hover:bg-emerald-500 hover:text-white"
                )}
            >
              {q}
            </Button>
          ))}
        </div>
      )}
      {!isFlipped && (
        <Button className="w-full h-12" onClick={() => setIsFlipped(true)}>
          Show Answer
        </Button>
      )}
    </div>
  )
}

