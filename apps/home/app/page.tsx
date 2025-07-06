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
import { EnterpriseLogos } from "@/components/home/logos";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { HowItWorks } from "@/components/home/how-it-works";
import { Faqs } from "@/components/home/faqs";

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
    <div className="w-full">

      {/* Hero Section --- */}
      <Hero />

      {/* Enterprise Logos --- */}
      <EnterpriseLogos />

      {/* Features Section --- */}
      <Features />

      {/* How It Works Section --- */}
      <HowItWorks />

      {/* FAQ Section --- */}
      <Faqs />

      {/* TODO: Other Sections --- */}
    </div>
  );
}
