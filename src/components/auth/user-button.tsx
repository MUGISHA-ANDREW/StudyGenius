"use client"

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession, signOut } from "next-auth/react"
import { LogOut, User, Settings, CreditCard } from "lucide-react"
import Link from "next/link"

export function UserButton() {
  const { data: session } = useSession()

  if (!session?.user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <Avatar className="h-8 w-8 rounded-full border">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs flex items-center justify-center h-full w-full rounded-full">
              {session.user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-2 p-1 bg-white border rounded-lg shadow-lg z-50">
        <div className="px-2 py-1.5 text-sm font-medium border-b mb-1">
          {session.user.email}
        </div>
        <DropdownMenuItem asChild className="outline-none">
          <Link href="/settings" className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-zinc-100 rounded-md">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="outline-none">
          <Link href="/billing" className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-zinc-100 rounded-md">
            <CreditCard className="h-4 w-4" />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="outline-none">
          <Link href="/settings" className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-zinc-100 rounded-md">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => signOut()}
          className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-red-50 text-red-600 rounded-md outline-none"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
