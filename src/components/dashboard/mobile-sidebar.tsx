"use client"

import { Menu } from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { Sidebar } from "./sidebar"
import { useState, useEffect } from "react"

export function MobileSidebar() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="md:hidden hover:opacity-75 transition">
          <Menu />
        </button>
      </DialogTrigger>
      <DialogContent side="left" className="p-0 border-none w-72">
        <DialogHeader className="sr-only">
            <DialogTitle>Navigation Sidebar</DialogTitle>
            <DialogDescription>Access all study tools and settings.</DialogDescription>
        </DialogHeader>
        <Sidebar />
      </DialogContent>
    </Dialog>
  )
}
