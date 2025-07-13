/* ==========================================================================*/
// large-screens-only.tsx — Desktop-only notice component
/* ==========================================================================*/
// Purpose: Displays notice on mobile/tablet that Astral only supports desktop
// Sections: Imports, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React from "react";

/* ==========================================================================*/
// Component
/* ==========================================================================*/

function LargeScreensOnly() {
  return (
    <div className="lg:hidden min-h-screen flex items-center justify-center bg-background p-6">
      <div className="text-center max-w-sm">
        <h1 className="text-2xl font-semibold text-foreground mb-4">
          Desktop Only
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Sorry, Astral only supports desktop right now. Please visit us on a larger screen.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { LargeScreensOnly };
