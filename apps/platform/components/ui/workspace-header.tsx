/* ==========================================================================*/
// workspace-header.tsx — Reusable workspace section header
/* ==========================================================================*/
// Purpose: Renders customizable header for workspace pages with title and optional subtitle
// Sections: Imports, Props, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React from "react";

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface WorkspaceHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * WorkspaceHeader
 *
 * Renders a sticky header for workspace pages with customizable title and subtitle.
 * Provides consistent styling across different workspace sections.
 *
 * @param title - Main header title text
 * @param subtitle - Optional subtitle text below the title
 * @param className - Optional additional CSS classes
 */
function WorkspaceHeader({ title, subtitle, className = "" }: WorkspaceHeaderProps) {
  return (
    <header className={`bg-background sticky top-0 flex shrink-0 flex-col border-b p-6 ${className}`}>
      <h1 className="text-2xl font-semibold">{title}</h1>
      {subtitle && (
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      )}
    </header>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { WorkspaceHeader };
export type { WorkspaceHeaderProps }; 