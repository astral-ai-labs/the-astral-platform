/* ==========================================================================*/
// page.tsx — Home page with hero section
/* ==========================================================================*/
// Purpose: Main landing page with hero section and additional components
// Sections: Imports, Component, Exports
/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// External Packages ---

// Local Components ---
import { Hero } from "@/components/home/hero";

/* ==========================================================================*/
// Home Page Component
/* ==========================================================================*/

/**
 * Page
 *
 * Main home page with hero section and supporting components.
 */
export default function Page() {
  return (
    <div className="w-full fixed top-0 left-0">

      {/* Hero Section --- */}
      <Hero />

      {/* TODO: Other Sections --- */}
    </div>
  );
}
