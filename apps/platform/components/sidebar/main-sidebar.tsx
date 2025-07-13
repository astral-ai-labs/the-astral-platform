/* ==========================================================================*/
// main-sidebar.tsx — Main navigation sidebar component
/* ==========================================================================*/
// Purpose: Renders the main navigation sidebar with workflow and task views
// Sections: Imports, Data, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
"use client";

import * as React from "react";

// Next.js ---
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// External Packages -----
import { CreditCard, FileText, Hammer, Zap } from "lucide-react";
import { motion, easeInOut } from "motion/react";

// Astral Icons ---
import { AstralIcon } from "@/components/astral-logos/astral-icon";

// Local Modules ---
import { NavUser } from "./nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";

// Types ---
import { SidebarView } from "@/types";

/* ==========================================================================*/
// Animation Props
/* ==========================================================================*/

const LOGO_HOVER_ANIMATION_PROPS = {
  whileHover: { scale: 1.035 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.1, delay: 0, ease: easeInOut },
};

const SIDEBAR_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const SIDEBAR_CONTAINER_VARIANTS_REVERSE = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
    },
  },
};

const SIDEBAR_ITEM_VARIANTS_DELAY_1 = {
  hidden: {
    opacity: 0,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      delay: 0,
      ease: easeInOut,
    },
  },
};

const SIDEBAR_ITEM_VARIANTS_DELAY_2 = {
  hidden: {
    opacity: 0,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      delay: 0.2,
      ease: easeInOut,
    },
  },
};

const SIDEBAR_ITEM_VARIANTS_DELAY_3 = {
  hidden: {
    opacity: 0,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      delay: 0.4,
      ease: easeInOut,
    },
  },
};

/* ==========================================================================*/
// Data
/* ==========================================================================*/

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface MainSidebarProps {
  className?: string;
  onViewChange?: (view: SidebarView) => void;
  onSidebarOpen?: () => void;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

function MainSidebar({ className, onViewChange, onSidebarOpen }: MainSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeView, setActiveView] = React.useState<SidebarView>("workflows");

  const handleNavigate = (view: SidebarView) => {
    setActiveView(view);

    // Call the callback to update parent state
    onViewChange?.(view);

    // Navigate to /ai route only if not already on an AI route
    if (!pathname.includes("/ai")) {
      router.push("/ai");
    }

    // Auto-open the sidebar after a brief delay to ensure navigation completes
    setTimeout(() => {
      onSidebarOpen?.();
    }, 100);
  };

  const handleLogoClick = () => {
    // Navigate to /ai route
    router.push("/ai");

    // Auto-open the sidebar after a brief delay to ensure navigation completes
    setTimeout(() => {
      onSidebarOpen?.();
    }, 100);
  };

  return (
    <Sidebar collapsible="none" className={cn("w-[calc(var(--sidebar-width-icon)+1px)]! border-r", className)}>
      {/* Start of Header --- */}
      <SidebarHeader>
        <SidebarMenu>
          <motion.div initial="hidden" animate="visible" variants={SIDEBAR_CONTAINER_VARIANTS}>
            <motion.div variants={SIDEBAR_ITEM_VARIANTS_DELAY_1}>
              <SidebarMenuItem>
                <motion.div {...LOGO_HOVER_ANIMATION_PROPS}>
                  <SidebarMenuButton size="lg" className="md:h-8 md:p-0 cursor-pointer" onClick={handleLogoClick}>
                    <div className="bg-secondary dark:bg-white text-secondary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <AstralIcon className="w-4 h-4 text-secondary-foreground dark:text-secondary" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">astral</span>
                      <span className="truncate text-xs">Enterprise</span>
                    </div>
                  </SidebarMenuButton>
                </motion.div>
              </SidebarMenuItem>
            </motion.div>
          </motion.div>
        </SidebarMenu>
      </SidebarHeader>
      {/* End of Header ---- */}

      {/* Start of Content --- */}
      <SidebarContent className="justify-between">
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              <motion.div initial="hidden" animate="visible" variants={SIDEBAR_CONTAINER_VARIANTS}>
                {/* Workflows */}
                <motion.div variants={SIDEBAR_ITEM_VARIANTS_DELAY_2}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={{
                        children: "Workflows",
                        hidden: false,
                      }}
                      onClick={() => handleNavigate("workflows")}
                      isActive={activeView === "workflows"}
                      className="px-2.5 md:px-2"
                    >
                      <Hammer />
                      <span>Workflows</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>

                {/* Tasks */}
                <motion.div variants={SIDEBAR_ITEM_VARIANTS_DELAY_3}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={{
                        children: "Tasks",
                        hidden: false,
                      }}
                      onClick={() => handleNavigate("tasks")}
                      isActive={activeView === "tasks"}
                      className="px-2.5 md:px-2"
                    >
                      <FileText />
                      <span>Tasks</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              </motion.div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Action Buttons */}
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              <motion.div initial="hidden" animate="visible" variants={SIDEBAR_CONTAINER_VARIANTS_REVERSE}>
                {/* Integrations - appears last (top of bottom group) */}
                <motion.div variants={SIDEBAR_ITEM_VARIANTS_DELAY_3}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={{
                        children: "Integrations",
                        hidden: false,
                      }}
                      className="px-2.5 md:px-2"
                    >
                      <Link href="/integrations">
                        <Zap />
                        <span>Integrations</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>

                {/* Billing - appears second */}
                <motion.div variants={SIDEBAR_ITEM_VARIANTS_DELAY_2}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={{
                        children: "Billing",
                        hidden: false,
                      }}
                      className="px-2.5 md:px-2"
                    >
                      <Link href="/billing">
                        <CreditCard />
                        <span>Billing</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              </motion.div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* End of Content ---- */}

      {/* Start of Footer --- */}
      <SidebarFooter>
        {/* User Navigation - appears first from bottom */}
        <motion.div initial="hidden" animate="visible" variants={SIDEBAR_CONTAINER_VARIANTS_REVERSE}>
          <motion.div variants={SIDEBAR_ITEM_VARIANTS_DELAY_1}>
            <NavUser user={data.user} />
          </motion.div>
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { MainSidebar };
