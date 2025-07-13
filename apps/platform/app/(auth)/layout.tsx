/* ==========================================================================*/
// layout.tsx — Auth layout with Motion animations
/* ==========================================================================*/
// Purpose: Renders auth layout with animated logo
// Sections: Animation Constants, Imports, Component, Exports

/* ==========================================================================*/
// Animation Constants
/* ==========================================================================*/

const logoVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.8,
      type: "spring" as const,
      damping: 25,
      stiffness: 120,
    },
  },
};

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

import { AstralFull } from "@/components/astral-logos/astral-full";
import * as motion from "motion/react-client";

/* ==========================================================================*/
// Component
/* ==========================================================================*/

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh">
      {/* Mobile/Tablet Layout - Right Side Only */}
      <div className="lg:hidden min-h-svh bg-background flex flex-col gap-4 p-6 md:p-10">
        {/* Start of Form Content --- */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {children}
          </div>
        </div>
        {/* End of Form Content ---- */}
      </div>

      {/* Large Screen Layout - Both Sides with Wrapper */}
      <div className="hidden lg:flex min-h-screen bg-black p-2">
        <div className="grid w-full lg:grid-cols-2 rounded-xl overflow-hidden shadow-2xl">
          {/* Start of Left Side --- */}
          <div className="bg-secondary relative">
            {/* Start of Logo --- */}
            <motion.div 
              className="absolute top-6 left-6 md:top-10 md:left-10"
              initial="initial"
              animate="animate"
              variants={logoVariants}
            >
              <a href="#" className="flex items-center gap-2 font-medium">
                <AstralFull className="h-[16px] xl:h-[17px] w-auto" />
              </a>
            </motion.div>
            {/* End of Logo ---- */}
          </div>
          {/* End of Left Side ---- */}

          {/* Start of Right Side --- */}
          <div className="bg-background flex flex-col gap-4 p-6 md:p-10">
            {/* Start of Form Content --- */}
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-full md:max-w-sm">
                {children}
              </div>
            </div>
            {/* End of Form Content ---- */}
          </div>
          {/* End of Right Side ---- */}
        </div>
      </div>
    </div>
  );
}
