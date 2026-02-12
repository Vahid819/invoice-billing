import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import authOptions from "@/lib/auth"

import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/login")

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="flex min-h-screen w-full overflow-hidden">
          <AppSidebar />

          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
