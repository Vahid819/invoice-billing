"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, User } from "lucide-react"
import { signOut } from "next-auth/react"

export default function ProfileMenu({ user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 w-full rounded-lg p-2 hover:bg-slate-800 transition">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-left leading-tight">
            <span className="text-sm font-medium text-slate-200">
              {user?.name || "User"}
            </span>
            <span className="text-xs text-slate-400">
              {user?.email}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60 mb-4 bg-slate-900 border-slate-800">
        <DropdownMenuItem className="gap-2 w-full">
          <User size={16} /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 w-full">
          <Settings size={16} /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="gap-2 text-red-400 focus:text-red-400 w-full"
        >
          <LogOut size={16} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
