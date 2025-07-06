/* ==========================================================================*/
// enterprise-logos.tsx — Enterprise Logos Section
/* ==========================================================================*/
// Purpose: Showcase enterprise clients with infinite sliding logos
// Sections: Imports, Data, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React from "react";

// Motion primitives ---
import { InfiniteSlider } from "../motion-primitives/infinite-slider";

// Experience logos ---
import { Blackrock, Cornell, Ibm, Tesla, Yc } from "../experience-logos/index"

// Local Constants ---
import { homeConstants } from "@/constants2";

/* ==========================================================================*/
// Data
/* ==========================================================================*/

const ENTERPRISE_LOGOS_MOBILE = [
  { Component: Blackrock, name: "BlackRock" },
  { Component: Ibm, name: "IBM" },
  { Component: Tesla, name: "Tesla" },
  { Component: Yc, name: "Y Combinator" },
];

const ENTERPRISE_LOGOS_DESKTOP = [
  { Component: Blackrock, name: "BlackRock" },
  { Component: Ibm, name: "IBM" },
  { Component: Tesla, name: "Tesla" },
  { Component: Yc, name: "Y Combinator" },
];

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * EnterpriseLogos
 *
 * Enterprise logos section with responsive design:
 * - Centered grid layout on large screens (lg+)
 * - Infinite slider on smaller screens
 */
function EnterpriseLogos({ className }: { className?: string }) {
  return (
    <div className={`relative home-section-spacing ${className || ""}`}>
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          {/* Divider with Header Text - All screen sizes */}
          <div className="relative flex items-center justify-center py-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-border"></div>
            </div>
            <div className="relative bg-background px-6 text-center">
              <h2 className="text-base text-balance font-medium text-muted-foreground/80 max-w-[280px] sm:max-w-xs">
                {homeConstants.logos.header}
              </h2>
            </div>
          </div>

          {/* Mobile Slider */}
          <div
            className="flex w-full overflow-x-hidden [mask-image:linear-gradient(to_right,transparent_0,#000_150px,#000_calc(100%_-_150px),transparent)] pt-6 md:hidden"
          >
            <InfiniteSlider gap={80} speed={50}>
              {ENTERPRISE_LOGOS_MOBILE.map((logo) => (
                <logo.Component
                  className="h-8 sm:h-10 w-auto max-w-[100px] opacity-60 hover:opacity-100 transition-opacity"
                  key={logo.name}
                />
              ))}
            </InfiniteSlider>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:flex items-center justify-center gap-x-20 pt-12">
            {ENTERPRISE_LOGOS_DESKTOP.map((logo) => (
              <logo.Component
                className="h-8 w-auto max-w-[100px] opacity-60 hover:opacity-100 transition-opacity"
                key={logo.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { EnterpriseLogos }; 