import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import authOptions from "@/lib/auth"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/login")

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1 min-h-screen bg-muted/40">
        <SidebarTrigger className="fixed top-4 left-4 z-50 md:hidden" />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="p-6">{children}</div>
        </ThemeProvider>
      </main>
    </SidebarProvider>
  )
}
