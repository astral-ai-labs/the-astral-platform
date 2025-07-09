/* ==========================================================================*/
// features.tsx — Features section component
/* ==========================================================================*/
// Purpose: Showcase product features with responsive design and dotted dividers
// Sections: Imports, Props, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React, { useState } from "react";

// External Packages ---
import { Zap, Settings, Handshake, LucideIcon, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence, easeInOut } from "motion/react";

// Local Components ---
import { Tilt } from "../motion-primitives/tilt";

// Local Constants ---
import { homeConstants } from "@/constants";

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const ENTRY_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

/* ==========================================================================*/
// Data
/* ==========================================================================*/



/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface FeaturesProps {
  className?: string;
}

interface FeatureCardProps {
  icon: LucideIcon;
  text: string;
  description: string;
  className?: string;
}

/* ==========================================================================*/
// Feature Card Component
/* ==========================================================================*/

/**
 * FeatureCard
 *
 * Individual feature card with icon and text that shows description on hover (desktop) or click (mobile).
 */
function FeatureCard({ icon: Icon, text, description, className }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Tilt rotationFactor={2.5}>
      <div 
        className={`bg-gradient-to-br from-muted/80 dark:from-muted/20 via-card/90 dark:via-card/10 to-muted/70 dark:to-muted/30 border border-border rounded-lg p-6 relative cursor-pointer transition-all duration-200 ${className || ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsClicked(!isClicked)}
      >
        <div className="absolute top-4 left-4">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
        
        {/* Mobile - Click to toggle with icon */}
        <div className="md:hidden">
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {text}
            </span>
            {isClicked ? (
              <ChevronUp className="w-3 h-3 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            )}
          </div>
          
          <AnimatePresence>
            {isClicked && (
              <motion.div
                className="absolute bottom-12 right-4 max-w-64"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: easeInOut }}
              >
                <p className="text-xs text-muted-foreground text-right text-balance leading-relaxed">
                  {description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop - Hover to show description */}
        <div className="hidden md:block">
          <div className="absolute bottom-4 right-4 max-w-64">
            <AnimatePresence mode="wait">
              {!isHovered ? (
                <motion.span
                  key="normal-text"
                  className="text-xs text-muted-foreground text-right block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: easeInOut }}
                >
                  {text}
                </motion.span>
              ) : (
                <motion.p
                  key="description"
                  className="text-xs text-muted-foreground text-right text-balance leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: easeInOut }}
                >
                  {description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * Features
 *
 * Features section with responsive layout and dotted dividers.
 * Stacked layout on all screen sizes with smaller font sizes.
 */
function Features({ className }: FeaturesProps) {
  return (
    <div className={`relative home-section-spacing ${className || ""}`}>
      <div className="relative px-6 lg:px-8 pt-16 lg:pt-20">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          {/* Content - Stacked on most screens, side-by-side on lg */}
          <div className="text-left lg:grid lg:grid-cols-2 lg:gap-x-4 lg:items-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl tracking-tight text-foreground font-medium leading-tight text-balance">
              {homeConstants.features.title}
            </h2>
            <p className="mt-6 lg:mt-0 text-base text-muted-foreground leading-relaxed">
              {homeConstants.features.subtitle}
            </p>
          </div>

          {/* 3 Cards - Always horizontal scroll */}
          <div className="mt-16 lg:mt-20">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide">
              {homeConstants.features.items.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  text={feature.text}
                  description={feature.description}
                  className="flex-shrink-0 w-80 h-64"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { Features }; 