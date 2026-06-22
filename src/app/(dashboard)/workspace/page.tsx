import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { WorkspaceClient } from "./workspace-client"

export default async function WorkspacePage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/login")

  const semesters = await db.semester.findMany({
    where: { userId: session.user.id },
    include: {
      courses: {
        include: {
          subjects: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academic Workspace</h1>
          <p className="text-muted-foreground">Manage your semesters, courses, and subjects.</p>
        </div>
      </div>
      
      <WorkspaceClient initialData={semesters} />
    </div>
  )
}
