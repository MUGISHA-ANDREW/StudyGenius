import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { DocumentsClient } from "./documents-client"

export default async function DocumentsPage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/login")

  const documents = await db.document.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Documents</h1>
          <p className="text-muted-foreground">Upload and manage your study materials (PDF, Text).</p>
        </div>
      </div>
      
      <DocumentsClient initialData={documents} />
    </div>
  )
}
