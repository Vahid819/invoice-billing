import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import authOptions from "@/lib/auth"
import { ThemeProvider } from "@/components/theme-provider"


export const metadata = {
  title: "Dashboard",
  description: "Dashboard layout for the application",
};

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
