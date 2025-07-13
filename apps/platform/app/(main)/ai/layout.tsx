/* ==========================================================================*/
// layout.tsx — AI section layout with header and content area
/* ==========================================================================*/
// Purpose: Provides layout structure for AI section with header and children
// Sections: Imports, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React from "react";

// Local Modules ---
import { AiHeaderClient } from "@/components/layout/ai-header-client";

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface AiLayoutProps {
  children: React.ReactNode;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

function AiLayout({ children }: AiLayoutProps) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      <AiHeaderClient />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export default AiLayout; 