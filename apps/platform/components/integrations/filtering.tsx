/* ==========================================================================*/
// filtering.tsx — Integration filtering and search controls
/* ==========================================================================*/
// Purpose: Renders search bar and filter toggles for integration management
// Sections: Imports, Props, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React, { useState, useId, useRef } from "react";

// Icons ---
import { Search, Lock, Unlock, Star, ArrowLeftIcon, Plus } from "lucide-react";

// Local Components ---
import { TooltipActionIcon } from "@/components/ui/tooltip-icon";
import { MorphingPopover, MorphingPopoverTrigger, MorphingPopoverContent } from "@/components/motion-primitives/morphing-popover";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface IntegrationFilteringProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showAuthenticatedOnly: boolean;
  onToggleAuthenticated: () => void;
  showUnauthenticatedOnly: boolean;
  onToggleUnauthenticated: () => void;
  showNewOnly: boolean;
  onToggleNew: () => void;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * IntegrationFiltering
 *
 * Renders filtering controls for integrations including search and toggle filters.
 * Provides search functionality and filters for authentication status and new items.
 *
 * @param searchQuery - Current search query string
 * @param onSearchChange - Callback when search query changes
 * @param showAuthenticatedOnly - Whether authenticated filter is active
 * @param onToggleAuthenticated - Callback to toggle authenticated filter
 * @param showUnauthenticatedOnly - Whether unauthenticated filter is active
 * @param onToggleUnauthenticated - Callback to toggle unauthenticated filter
 * @param showNewOnly - Whether new items filter is active
 * @param onToggleNew - Callback to toggle new items filter
 */
function IntegrationFiltering({ searchQuery, onSearchChange, showAuthenticatedOnly, onToggleAuthenticated, showUnauthenticatedOnly, onToggleUnauthenticated, showNewOnly, onToggleNew }: IntegrationFilteringProps) {
  const uniqueId = useId();
  const [requestNote, setRequestNote] = useState("");
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const closeRequestMenu = () => {
    setRequestNote("");
    setIsRequestOpen(false);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle integration request submission here
    console.log("Integration request:", requestNote);
    closeRequestMenu();
  };

  return (
    <div className="border-b bg-background px-6 py-4">
      <div className="flex items-center gap-4">
        {/* Search Bar --- */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search integrations..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className={cn("w-full rounded-sm border border-border/50 !bg-secondary pl-8 pr-3 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus-visible:ring-0")} />
        </div>

        {/* All Control Icons --- */}
        <div className="flex items-center gap-2">
          {/* Filter Controls --- */}
          <TooltipActionIcon tooltipContent="Show authenticated integrations only" icon={<Lock className="h-4 w-4" />} onClick={onToggleAuthenticated} className={`!bg-secondary hover:!bg-secondary/80 border border-border/50 rounded-sm p-1.5 transition-colors ${showAuthenticatedOnly ? "text-foreground bg-foreground/10 border-border/20" : "text-muted-foreground hover:text-foreground"}`} />

          <TooltipActionIcon tooltipContent="Show unauthenticated integrations only" icon={<Unlock className="h-4 w-4" />} onClick={onToggleUnauthenticated} className={`!bg-secondary hover:!bg-secondary/80 border border-border/50 rounded-sm p-1.5 transition-colors ${showUnauthenticatedOnly ? "text-foreground bg-foreground/10 border-border/20" : "text-muted-foreground hover:text-foreground"}`} />

          <TooltipActionIcon tooltipContent="Show new integrations only" icon={<Star className="h-4 w-4" />} onClick={onToggleNew} className={`!bg-secondary hover:bg-secondary/80 border border-border/50 rounded-sm p-1.5 transition-colors ${showNewOnly ? "text-foreground bg-foreground/10 border-border/20" : "text-muted-foreground hover:text-foreground"}`} />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { IntegrationFiltering };
export type { IntegrationFilteringProps };
