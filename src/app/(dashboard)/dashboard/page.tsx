import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, FileText, BrainCircuit, Clock, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/login")

  const stats = [
    {
      label: "Total Semesters",
      value: await db.semester.count({ where: { userId: session.user.id } }),
      icon: GraduationCap,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      link: "/workspace"
    },
    {
      label: "Active Courses",
      value: await db.course.count({ 
        where: { 
            semester: { userId: session.user.id } 
        } 
      }),
      icon: BookOpen,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      link: "/workspace"
    },
    {
      label: "Documents",
      value: await db.document.count({ where: { userId: session.user.id } }),
      icon: FileText,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      link: "/documents"
    },
    {
      label: "Flashcards Due",
      value: await db.flashcard.count({ 
        where: { 
            userId: session.user.id,
            nextReview: { lte: new Date() }
        } 
      }),
      icon: BrainCircuit,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      link: "/flashcards"
    }
  ]

  const recentDocs = await db.document.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 5
  })

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome back, {session.user.name?.split(" ")[0]}! 👋</h1>
          <p className="text-muted-foreground mt-1 text-lg">Ready to crush your study goals today?</p>
        </div>
        <div className="flex gap-3">
          <Link href="/documents">
            <Button className="rounded-full px-6 shadow-glow">
              Upload Notes
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="outline" className="rounded-full px-6">
              AI Tutor
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.link}>
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-transparent hover:border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</CardTitle>
                <div className={`${stat.bg} p-2.5 rounded-xl transition-transform group-hover:scale-110`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-2">View details & analytics</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold">Recent Documents</CardTitle>
            <Link href="/documents">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentDocs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed rounded-xl bg-muted/20">
                    <FileText className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">Your study vault is empty.</p>
                </div>
              ) : (
                recentDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group cursor-pointer">
                    <div className="h-11 w-11 rounded-xl bg-primary/5 flex items-center justify-center border group-hover:bg-primary/10 transition-colors">
                      <FileText className="h-6 w-6 text-primary/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center mt-0.5">
                        {new Date(doc.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 shadow-sm border-primary/10 bg-gradient-to-br from-background to-primary/5">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Daily Study Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="relative mb-6">
                 <div className="h-28 w-28 rounded-full border-[6px] border-primary/10 flex items-center justify-center">
                    <div className="h-28 w-28 rounded-full border-[6px] border-primary border-t-transparent absolute animate-spin-slow" />
                    <span className="text-2xl font-black">75%</span>
                 </div>
              </div>
              <h3 className="text-lg font-bold">Almost there!</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-[200px]">
                You've completed 3 out of 4 study sessions today.
              </p>
              <Button className="mt-8 w-full rounded-full" variant="outline">
                Resume Study
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
