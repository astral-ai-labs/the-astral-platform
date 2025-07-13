/* ==========================================================================*/
// page.tsx — AI section main page content
/* ==========================================================================*/
// Purpose: Renders the main content area for AI section with responsive layout
// Sections: Imports, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React from "react";

// UI Components ---
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@workspace/ui/components/resizable";
import { LargeScreensOnly } from "@/components/layout/large-screens-only";

/* ==========================================================================*/
// Component
/* ==========================================================================*/

function AiPage() {
  return (
    <>
      {/* Mobile/Tablet Notice */}
      <LargeScreensOnly />

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1 h-full">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Left Panel */}
          <ResizablePanel
            defaultSize={60}
            minSize={40}
            maxSize={70}
            className="flex flex-col"
          >
            <div className="flex flex-1 flex-col gap-4 p-4">
              <h2 className="text-lg font-semibold">Left Panel</h2>
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="bg-muted/50 aspect-video h-12 w-full rounded-lg" />
              ))}
            </div>
          </ResizablePanel>

          {/* Resize Handle */}
          <ResizableHandle className="w-[2px] bg-border/30 hover:bg-border/60 transition-colors" />

          {/* Right Panel */}
          <ResizablePanel
            defaultSize={40}
            minSize={30}
            maxSize={60}
            className="flex flex-col"
          >
            <div className="flex flex-1 flex-col gap-4 p-4">
              <h2 className="text-lg font-semibold">Right Panel</h2>
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="bg-muted/50 aspect-video h-12 w-full rounded-lg" />
              ))}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export default AiPage;
