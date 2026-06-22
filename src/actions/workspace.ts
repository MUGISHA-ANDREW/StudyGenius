"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createSemester(name: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const semester = await db.semester.create({
    data: {
      name,
      userId: session.user.id
    }
  })

  revalidatePath("/workspace")
  return semester
}

export async function createCourse(name: string, semesterId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const course = await db.course.create({
    data: {
      name,
      semesterId
    }
  })

  revalidatePath("/workspace")
  return course
}

export async function createSubject(name: string, courseId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const subject = await db.subject.create({
    data: {
      name,
      courseId
    }
  })

  revalidatePath("/workspace")
  return subject
}
