import { GraduationCap } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-neutral-900 text-white">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-10 w-10 text-primary" />
          <span className="text-2xl font-bold">StudyGenius AI</span>
        </Link>
        
        <div>
          <h2 className="text-4xl font-semibold mb-6">Revolutionize the way you study.</h2>
          <p className="text-xl text-neutral-400">
            Join thousands of students who are already using AI to master their subjects, generate summaries, and ace their exams.
          </p>
        </div>

        <div className="text-sm text-neutral-500">
          © 2026 StudyGenius AI. All rights reserved.
        </div>
      </div>
      
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[400px]">
          {children}
        </div>
      </div>
    </div>
  )
}
