/* ==========================================================================*/
// page.tsx — Careers page with header and job listings
/* ==========================================================================*/
// Purpose: Display careers page with company mission and open roles
// Sections: Imports, Component, Exports

import React from "react";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// Local Components ---
import { ContentHeader } from "@/components/resources/content-header";
import { CareersSection } from "@/components/careers/careers-section";

// Local Constants ---
import { careersConstants } from "@/constants";

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * CareersPage
 *
 * Complete careers page with header and job listings.
 */
function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <ContentHeader
        title={careersConstants.page.title}
        subtitle={careersConstants.page.subtitle}
      />
      
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-32 md:px-8">
        <CareersSection roles={[]} />
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export default CareersPage;
