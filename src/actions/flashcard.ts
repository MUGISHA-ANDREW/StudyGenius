"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { calculateNextReview } from "@/lib/spaced-repetition"
import { revalidatePath } from "next/cache"

export async function reviewFlashcard(cardId: string, quality: number) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const card = await db.flashcard.findUnique({
    where: { id: cardId, userId: session.user.id }
  })

  if (!card) throw new Error("Flashcard not found")

  const { nextReviewDate, interval, repetition, easeFactor } = calculateNextReview(
    quality,
    card.interval,
    card.repetition,
    card.easeFactor
  )

  const updatedCard = await db.flashcard.update({
    where: { id: card.id },
    data: {
      nextReview: nextReviewDate,
      interval,
      repetition,
      easeFactor
    }
  })

  revalidatePath("/flashcards")
  return updatedCard
}
