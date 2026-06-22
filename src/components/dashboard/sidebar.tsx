"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  BrainCircuit, 
  Search, 
  Calendar, 
  Settings,
  GraduationCap,
  History,
  CreditCard,
} from "lucide-react"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Workspace",
    icon: GraduationCap,
    href: "/workspace",
  },
  {
    label: "Documents",
    icon: FileText,
    href: "/documents",
  },
  {
    label: "AI Chat",
    icon: MessageSquare,
    href: "/chat",
  },
  {
    label: "Summaries",
    icon: History,
    href: "/summaries",
  },
  {
    label: "Flashcards",
    icon: BrainCircuit,
    href: "/flashcards",
  },
  {
    label: "Quizzes",
    icon: Search,
    href: "/quizzes",
  },
  {
    label: "Study Planner",
    icon: Calendar,
    href: "/planner",
  },
  {
    label: "Billing",
    icon: CreditCard,
    href: "/billing",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-neutral-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-10">
          <GraduationCap className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-xl font-bold">StudyGenius</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", pathname === route.href ? "text-primary" : "text-zinc-400")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
