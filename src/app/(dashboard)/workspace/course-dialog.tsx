"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createCourse } from "@/actions/workspace"

interface CourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  semesterId: string
  onSuccess?: () => void
}

export function CourseDialog({ open, onOpenChange, semesterId, onSuccess }: CourseDialogProps) {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setLoading(true)
      await createCourse(name, semesterId)
      onSuccess?.()
      onOpenChange(false)
      setName("")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Course</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Course Name</label>
            <Input 
              placeholder="e.g. Computer Science" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={loading || !name}>
            Create Course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
