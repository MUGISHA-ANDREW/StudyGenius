import { openai } from "./openai"
import { getIndex } from "./pinecone"
import { db } from "./db"

export async function processDocument(userId: string, name: string, text: string) {
  // 1. Create document entry in Prisma
  const document = await db.document.create({
    data: {
      userId,
      name,
      content: text, // Storing raw text for reference
      status: "PROCESSING"
    }
  })

  try {
    // 2. Simple chunking (e.g., by 1000 characters)
    const chunks = chunkText(text, 1000)

    // 3. Generate embeddings and upsert to Pinecone
    const index = getIndex()
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk
      })

      const vector = embeddingResponse.data[0].embedding

      await index.upsert([{
        id: `${document.id}_${i}`,
        values: vector,
        metadata: {
          userId,
          documentId: document.id,
          text: chunk,
          pageNumber: i + 1
        }
      }])
    }

    // 4. Update status
    await db.document.update({
      where: { id: document.id },
      data: { status: "COMPLETED" }
    })

    return document
  } catch (error) {
    console.error("Error processing document:", error)
    await db.document.update({
      where: { id: document.id },
      data: { status: "FAILED" }
    })
    throw error
  }
}

function chunkText(text: string, size: number): string[] {
  const chunks = []
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size))
  }
  return chunks
}

export async function queryDocument(userId: string, query: string, documentId?: string) {
  // 1. Generate embedding for query
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query
  })
  const vector = embeddingResponse.data[0].embedding

  // 2. Query Pinecone
  const index = getIndex()
  const queryResponse = await index.query({
    vector,
    topK: 5,
    filter: {
      userId: { "$eq": userId },
      ...(documentId ? { documentId: { "$eq": documentId } } : {})
    },
    includeMetadata: true
  })

  // 3. Extract relevant context
  const context = queryResponse.matches
    .map(match => match.metadata?.text as string)
    .join("\n\n---\n\n")

  return context
}
