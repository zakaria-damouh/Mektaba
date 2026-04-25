"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { FiHome, FiBox, FiSettings } from "react-icons/fi";
import { ROUTES } from "@/lib/routes";
import { BiCategory } from "react-icons/bi";
import { PlusIcon } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  const items = [
    { label: "Dashboard", href: ROUTES.USER.DASHBOARD, icon: FiHome },
    { label: "Add Product", href: ROUTES.USER.ADD_PRODUCT, icon: PlusIcon },
    { label: "Products", href: ROUTES.USER.PRODUCTS, icon: FiBox },
    { label: "Categories", href: ROUTES.USER.CATEGORIES, icon: BiCategory },
    { label: "Settings", href: "/settings", icon: FiSettings },
  ];

  return (
    <Sidebar >
      <SidebarHeader className="px-4 py-3">
        <h1 className="text-lg font-bold">My App</h1>
        <p className="text-xs text-muted-foreground">
          Admin Dashboard
        </p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <div className="flex flex-col gap-1 px-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition
                      ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:bg-muted"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t">
        <div className="text-sm">
          <p className="font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground">
            john@example.com
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}