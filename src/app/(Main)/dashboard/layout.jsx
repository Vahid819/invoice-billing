import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import AuthGuard from "@/components/auth-guard"

export default function DashboardLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthGuard>
        <SidebarProvider>
          <div className="flex min-h-screen w-full overflow-hidden">
            <AppSidebar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 min-h-screen bg-linear-to-br from-[#061b24] via-[#0b2a36] to-[#061b24]">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </AuthGuard>
    </ThemeProvider>
  )
}
