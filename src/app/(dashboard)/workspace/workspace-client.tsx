"use client"

import { useState } from "react"
import { Semester, Course, Subject } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Plus, GraduationCap, BookOpen, Bookmark } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SemesterDialog } from "./semester-dialog"
import { CourseDialog } from "./course-dialog"
import { SubjectDialog } from "./subject-dialog"

type ExtendedSemester = Semester & {
  courses: (Course & {
    subjects: Subject[]
  })[]
}

interface WorkspaceClientProps {
  initialData: ExtendedSemester[]
}

export function WorkspaceClient({ initialData }: WorkspaceClientProps) {
  const [semesters, setSemesters] = useState(initialData)
  const [isSemesterDialogOpen, setIsSemesterDialogOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button onClick={() => setIsSemesterDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Semester
        </Button>
      </div>

      <div className="grid gap-6">
        {semesters.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-12 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle>No Semesters Yet</CardTitle>
            <p className="text-muted-foreground mb-6">Start by adding your current semester.</p>
            <Button onClick={() => setIsSemesterDialogOpen(true)}>
              Add Semester
            </Button>
          </Card>
        ) : (
          semesters.map((semester) => (
            <SemesterCard key={semester.id} semester={semester} />
          ))
        )}
      </div>

      <SemesterDialog 
        open={isSemesterDialogOpen} 
        onOpenChange={setIsSemesterDialogOpen} 
        onSuccess={(newSemester) => setSemesters([newSemester as ExtendedSemester, ...semesters])}
      />
    </div>
  )
}

function SemesterCard({ semester }: { semester: ExtendedSemester }) {
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false)

  return (
    <Card className="overflow-hidden border-2 border-primary/10">
      <CardHeader className="bg-primary/5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">{semester.name}</CardTitle>
        </div>
        <Button size="sm" variant="outline" onClick={() => setIsCourseDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Course
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {semester.courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
          {semester.courses.length === 0 && (
            <p className="text-sm text-muted-foreground col-span-full">No courses added to this semester.</p>
          )}
        </div>
      </CardContent>

      <CourseDialog 
        open={isCourseDialogOpen} 
        onOpenChange={setIsCourseDialogOpen}
        semesterId={semester.id}
        onSuccess={() => {}} // In a real app, refresh or state update
      />
    </Card>
  )
}

function CourseCard({ course }: { course: Course & { subjects: Subject[] } }) {
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false)

  return (
    <div className="border rounded-lg p-4 space-y-4 hover:border-primary/50 transition-colors bg-card">
      <div className="flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-blue-500" />
          <span>{course.name}</span>
        </div>
        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setIsSubjectDialogOpen(true)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {course.subjects.map((subject) => (
          <div key={subject.id} className="flex items-center gap-2 text-sm text-muted-foreground pl-2">
            <Bookmark className="h-3 w-3 text-emerald-500" />
            <span>{subject.name}</span>
          </div>
        ))}
        {course.subjects.length === 0 && (
          <p className="text-xs text-muted-foreground pl-2">No subjects.</p>
        )}
      </div>

      <SubjectDialog 
        open={isSubjectDialogOpen} 
        onOpenChange={setIsSubjectDialogOpen}
        courseId={course.id}
        onSuccess={() => {}}
      />
    </div>
  )
}
