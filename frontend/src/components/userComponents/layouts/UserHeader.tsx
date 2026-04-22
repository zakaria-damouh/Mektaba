"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";


export function UserHeader() {
  return (
    <header className="h-16 border-b px-4 flex items-center justify-between">
      
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-3">
          <SidebarTrigger />

      </div>

      {/* Right: Actions */}
    <div className="flex items-center gap-3">

 

    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer rounded-full ">
            <Avatar className="w-8 h-8">
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl p-2 shadow-lg"
        >
            {/* User info header */}
            <div className="px-2 py-2">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">
                john@example.com
            </p>
            </div>

            <DropdownMenuSeparator />

            {/* Profile */}
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2">
            <FiUser className="w-4 h-4" />
            Profile
            </DropdownMenuItem>

            {/* Settings */}
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2">
            <FiSettings className="w-4 h-4" />
            Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 text-red-500 focus:text-red-500">
            <FiLogOut className="w-4 h-4" />
            Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>

    </div>

    </header>
  );
}