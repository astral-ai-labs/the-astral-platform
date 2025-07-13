/* ==========================================================================*/
// wf-task-item.tsx — Workflow/Task item component for sidebar
/* ==========================================================================*/
// Purpose: Renders individual workflow or task items with status indicators
// Sections: Imports, Props, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React, { useState } from "react";
// Next.js ---
import Link from "next/link";

// External Packages ----
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { MoreVertical, ChevronRight, ArrowRight, ChevronDown } from "lucide-react";
import { useReducedMotion } from "motion/react";

// Local Modules ---
import { WorkflowOrTask } from "../../types";
import { formatShortRelativeTime, cn } from "../../lib/utils";

/* ==========================================================================*/
// Actions Dropdown Component
/* ==========================================================================*/

function WfTaskActionsDropdown({ isVisible }: { isVisible: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  // Show icon if item is hovered OR dropdown is open
  const showIcon = isVisible || isOpen;
  // Choose icon based on dropdown state
  const IconComponent = isOpen ? ChevronDown : MoreVertical;

  const handleArchiveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement archive functionality
    console.log('Archive clicked');
  };

  const handleDuplicateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement duplicate functionality
    console.log('Duplicate clicked');
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className="hover:bg-transparent">
        {!shouldReduceMotion ? (
          <div className={cn("origin-left transition-all duration-100 ease-in-out", showIcon ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0")}>
            <IconComponent className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
          </div>
        ) : (
          <IconComponent className={cn("h-3.5 w-3.5 text-muted-foreground hover:text-foreground", showIcon ? "opacity-100" : "opacity-0")} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuLabel className="text-sm sr-only">Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-xs group cursor-pointer" onClick={handleArchiveClick}>
            Archive
            {!shouldReduceMotion && (
              <div className="ml-auto origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-100 ease-in-out">
                <ArrowRight className="size-3 text-muted-foreground group-hover:text-foreground" />
              </div>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs group cursor-pointer" onClick={handleDuplicateClick}>
            Duplicate
            {!shouldReduceMotion && (
              <div className="ml-auto origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-100 ease-in-out">
                <ArrowRight className="size-3 text-muted-foreground group-hover:text-foreground" />
              </div>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface WfTaskItemProps {
  item: WorkflowOrTask;
  onClick?: () => void;
  isHovered?: boolean;
  itemRef?: (el: HTMLDivElement | null) => void;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

function WfTaskItem({ item, onClick, isHovered = false, itemRef }: WfTaskItemProps) {
  const isAwaitingYou = item.status.awaitingYou;

  const href = `/ai/${item.id}`;

  return (
    <div ref={itemRef} className="border-b border-border/40">
      <Link 
        className={cn("group relative flex flex-col cursor-pointer transition-all duration-200 ease-in-out")} 
        onClick={onClick}
        href={href}
      >
        <div className="py-4 px-4 relative z-10">
          {/* Main Content */}
          <div className="flex items-start gap-3">
            {/* Status Indicator */}
            <div className="flex items-center justify-center mt-0.5">
              {isAwaitingYou ? (
                <div className="relative">
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                </div>
              ) : (
                <div className="h-2 w-2 rounded-full bg-muted-foreground/20"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-1">
              {/* Title */}
              <h3 className={cn("text-sm font-semibold leading-tight truncate transition-colors", isAwaitingYou ? "text-foreground" : "text-foreground/90", "group-hover:text-foreground")}>{item.name}</h3>

              {/* Description */}
              <p className={cn("text-xs leading-relaxed truncate transition-colors", "text-muted-foreground group-hover:text-muted-foreground/80")}>{item.description}</p>
            </div>

            {/* Actions Dropdown - Uses external hover state */}
            <div className="flex items-center justify-center">
              <WfTaskActionsDropdown isVisible={isHovered} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { WfTaskItem };
