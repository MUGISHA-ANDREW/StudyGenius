"use server"

import { auth } from "@/lib/auth"
import { openai } from "@/lib/openai"
import { db } from "@/lib/db"
import { queryDocument } from "@/lib/rag"

export async function generateSummary(documentId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const document = await db.document.findUnique({
    where: { id: documentId, userId: session.user.id }
  })

  if (!document) throw new Error("Document not found")

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "You are an expert academic summarizer. Create a structured, easy-to-read summary of the provided text. Include key concepts, definitions, and a table of contents."
      },
      {
        role: "user",
        content: document.content || ""
      }
    ]
  })

  const summaryContent = response.choices[0].message.content || ""

  const summary = await db.summary.create({
    data: {
      userId: session.user.id,
      documentId: document.id,
      title: `Summary: ${document.name}`,
      content: summaryContent
    }
  })

  return summary
}

export async function askQuestion(documentId: string, question: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  // Use RAG to get context
  const context = await queryDocument(session.user.id, question, documentId)

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `You are StudyGenius AI. use the following context from the user's study materials to answer their question. If the answer is not in the context, say you don't know based on the provided material but offer a general academic perspective.
        
        CONTEXT:
        ${context}`
      },
      {
        role: "user",
        content: question
      }
    ]
  })

  return response.choices[0].message.content
}

export async function generateFlashcards(documentId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const document = await db.document.findUnique({
    where: { id: documentId, userId: session.user.id }
  })

  if (!document) throw new Error("Document not found")

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "Create a list of high-quality flashcards (Front/Back) from the provided text. Return the result in a JSON array format like this: [{\"front\": \"Question\", \"back\": \"Answer\"}]"
      },
      {
        role: "user",
        content: document.content || ""
      }
    ],
    response_format: { type: "json_object" }
  })

  const content = JSON.parse(response.choices[0].message.content || '{"flashcards": []}')
  const flashcardsData = (content.flashcards || []) as Array<{ front: string; back: string }>

  const createdFlashcards = await Promise.all(
    flashcardsData.map((card) => 
      db.flashcard.create({
        data: {
          userId: session.user.id,
          documentId: document.id,
          front: card.front,
          back: card.back,
        }
      })
    )
  )

  return createdFlashcards
}
