"use client"

import { UserButton } from "../auth/user-button"
import { MobileSidebar } from "./mobile-sidebar"

export function Navbar() {
  return (
    <div className="flex items-center p-4 border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <MobileSidebar />
      <div className="flex w-full justify-end gap-4 items-center">
        <UserButton />
      </div>
    </div>
  )
}
