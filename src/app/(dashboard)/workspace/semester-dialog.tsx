"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createSemester } from "@/actions/workspace"
import { Semester } from "@prisma/client"

interface SemesterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (semester: Semester) => void
}


export function SemesterDialog({ open, onOpenChange, onSuccess }: SemesterDialogProps) {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setLoading(true)
      const semester = await createSemester(name)
      onSuccess?.(semester)
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
          <DialogTitle>Add Semester</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Semester Name</label>
            <Input 
              placeholder="e.g. Fall 2024" 
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
            {loading ? "Creating..." : "Create Semester"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
