import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { FlashcardsClient } from "./flashcards-client"

export default async function FlashcardsPage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/login")

  const flashcards = await db.flashcard.findMany({
    where: { 
        userId: session.user.id,
        nextReview: {
            lte: new Date()
        }
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flashcard Review</h1>
          <p className="text-muted-foreground">Study your flashcards using Spaced Repetition.</p>
        </div>
      </div>
      
      <FlashcardsClient initialCards={flashcards} />
    </div>
  )
}
