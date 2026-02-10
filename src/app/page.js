"use client"
import React from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"


function page() {
  
    const { status } = useSession()
    const router = useRouter()

    // 🔐 Redirect logged-in users
    useEffect(() => {
      if (status === "authenticated") {
        router.replace("/dashboard")
      }
    }, [status, router])

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to the Invoice SaaS App</h1>
      <p className="mt-4 text-lg">Please log in to access your dashboard.</p>
      <Link href="/login" className="mt-6 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Login</Link>
    </div>
  )
}

export default page