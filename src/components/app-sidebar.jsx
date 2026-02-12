"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import ProfileMenu from "@/components/profile-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Users,
  Box,
  BarChart,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { title: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { title: "Customers", href: "/dashboard/customers", icon: Users },
  { title: "Products", href: "/dashboard/products", icon: Box },
  { title: "Reports", href: "/dashboard/reports", icon: BarChart },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <Sidebar
      collapsible="icon"
      className="
        bg-white/10
        backdrop-blur-xl
        border-r border-white/15
        shadow-[0_0_60px_rgba(255,255,255,0.08)]
      "
    >
      {/* Header */}
      <SidebarHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="font-semibold text-white">
              Acme Inc
              <ChevronDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>Workspace 1</DropdownMenuItem>
            <DropdownMenuItem>Workspace 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");

              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="
                      relative overflow-hidden
                      transition-all duration-300

                      data-[active=true]:bg-white/20
                      data-[active=true]:backdrop-blur-xl
                      data-[active=true]:border
                      data-[active=true]:border-white/25
                      data-[active=true]:shadow-[0_8px_30px_rgba(255,255,255,0.25)]
                      data-[active=true]:text-white

                      hover:bg-white/10
                      hover:text-white
                    "
                  >
                    <Link
                      href={item.href}
                      className="relative z-10 flex items-center gap-3 px-2 py-1"
                    >
                      {/* Glass reflection layer */}
                      <span
                        className="
                          pointer-events-none
                          absolute inset-0 rounded-lg
                          bg-linear-to-b
                          from-white/30
                          to-transparent
                          opacity-0
                          data-[active=true]:opacity-100
                        "
                      />

                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-white/10 p-2">
        <ProfileMenu user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
