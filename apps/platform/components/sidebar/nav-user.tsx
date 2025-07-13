/* ==========================================================================*/
// nav-user.tsx — User navigation dropdown component
/* ==========================================================================*/
// Purpose: Renders user avatar with dropdown menu for help and logout actions
// Sections: Imports, Types, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
"use client";

import * as React from "react";

// External Packages -----
import { ChevronsUpDown, HelpCircle, LogOut } from "lucide-react";

// Local Modules ---
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@workspace/ui/components/sidebar";

// Types ---
import { User } from "@/types";

/* ==========================================================================*/
// Types
/* ==========================================================================*/

interface NavUserProps {
  /** User object containing name, email, and avatar */
  user: User;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * NavUser
 *
 * Renders user avatar with dropdown menu containing help and logout options.
 *
 * @param user - User object with name, email, and avatar
 */
function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();

  const handleHelpClick = () => {
    // TODO: Add help navigation logic
    console.log("Help clicked");
  };

  const handleLogoutClick = () => {
    // TODO: Add logout logic
    console.log("Logout clicked");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs max-w-[120px]">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
            {/* Start of User Info --- */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            {/* End of User Info ---- */}

            <DropdownMenuSeparator />

            {/* Start of Menu Actions --- */}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleHelpClick}>
                <HelpCircle />
                Help
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogoutClick}>
              <LogOut />
              Log out
            </DropdownMenuItem>
            {/* End of Menu Actions ---- */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { NavUser };
export type { NavUserProps };
