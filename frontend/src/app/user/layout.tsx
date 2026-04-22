"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/userComponents/layouts/app-sidebar";
import { UserHeader } from "@/components/userComponents/layouts/UserHeader";
import { useState } from "react";


function UserLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return(
    <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <div className="w-full flex ">

            <div>  
                <AppSidebar />
            </div>
            <div className="flex-1 ">
                <header><UserHeader /></header>
                <main>
                    {children}
                </main>
            </div>
        </div>

    </SidebarProvider> 
  )
}

export default UserLayout;