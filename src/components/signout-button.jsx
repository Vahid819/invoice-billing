"use client"

import { signOut } from "next-auth/react"
import { FiLogOut } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      variant="destructive"
      size="sm"
      className="group relative transition-all duration-200 hover:scale-105 active:scale-95"
    >
      <FiLogOut className="size-4 transition-transform duration-300 group-hover:rotate-12 group-hover:-translate-x-0.5" />
      <span className="transition-all duration-300 group-hover:tracking-wide">Logout</span>
    </Button>
  )
}
