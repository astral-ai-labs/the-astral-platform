/* ==========================================================================*/
// billing-header.tsx — Billing section header
/* ==========================================================================*/
// Purpose: Renders simple billing header with title
// Sections: Imports, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React from "react";

/* ==========================================================================*/
// Component
/* ==========================================================================*/

function BillingHeader() {
  return (
    <header className="bg-background sticky top-0 flex shrink-0 items-center border-b p-6">
      <h1 className="text-2xl font-semibold">Billing</h1>
    </header>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { BillingHeader }; 