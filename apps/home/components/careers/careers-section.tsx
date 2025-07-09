/* ==========================================================================*/
// careers-section.tsx — Careers section with quality text and open roles
/* ==========================================================================*/
// Purpose: Display company mission text and open roles with apply buttons
// Sections: Imports, Animation Variants, Types, Components, Main Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React, { useState, useRef, useEffect } from "react";

// External Packages ---
import { motion, easeInOut, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Local Constants ---
import { careersConstants } from "@/constants";

/* ==========================================================================*/
// Types
/* ==========================================================================*/

interface Role {
  id: string;
  title: string;
  department: string;
  location: string;
  applyLink: string;
}

interface CareersSectionProps {
  roles: Role[];
  className?: string;
}

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const CONTENT_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const CONTENT_ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easeInOut,
    },
  },
};

const ROLES_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const ROLE_ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: easeInOut,
    },
  },
};

/* ==========================================================================*/
// Components
/* ==========================================================================*/

/**
 * RoleListItem
 *
 * Individual role item in the "Open Roles" section with apply button.
 */
function RoleListItem({ title, department, location, applyLink, itemRef }: { title: string; department: string; location: string; applyLink: string; itemRef: (el: HTMLDivElement | null) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div variants={ROLE_ITEM_VARIANTS} ref={itemRef} className="py-4 px-4 rounded-lg cursor-pointer relative z-10 transition-all duration-200" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href={applyLink} target="_blank" className="block">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground line-clamp-1">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {department} • {location}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="flex items-center gap-1 text-sm leading-none font-medium transition-transform duration-100 ease-in-out origin-right">
              <span className={`text-xs text-muted-foreground transition-all duration-150 ${isHovered ? "underline" : ""}`}>Apply</span>
              {!shouldReduceMotion && (
                <div className="w-4 flex justify-center">
                  <div className={`transition-all duration-100 ease-in-out ${isHovered ? "translate-x-0.5" : "translate-x-0"}`}>
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ==========================================================================*/
// Main Component
/* ==========================================================================*/

/**
 * CareersSection
 *
 * Complete careers section with quality mission text and open roles list.
 */
function CareersSection({ roles, className }: CareersSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Combine actual roles with dummy roles for testing
  const allRoles = [...roles, ...careersConstants.dummyRoles];

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = itemRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetTop, offsetHeight } = hoveredElement;
        setHoverStyle({
          top: `${offsetTop}px`,
          height: `${offsetHeight}px`,
        });
      }
    }
  }, [hoveredIndex]);

  return (
    <div className={`relative ${className || ""}`}>
      {/* Quality Mission Text Section - Hidden on mobile/tablet */}
      <motion.div className="hidden md:block mb-16 max-w-6xl mx-auto" variants={CONTENT_CONTAINER_VARIANTS} initial="hidden" animate="visible">
        <motion.div className="grid md:grid-cols-2 lg:gap-24 gap-12" variants={CONTENT_ITEM_VARIANTS}>
          {/* Left Column */}
          <div className="space-y-6">
            <div className="hidden md:block space-y-6">
              {careersConstants.mission.paragraphs.slice(0, 3).map((paragraph, index) => (
                <motion.p key={index} className="text-muted-foreground leading-relaxed" variants={CONTENT_ITEM_VARIANTS}>
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right Column - Hidden on mobile/tablet */}
          <div className="hidden md:block space-y-4">
            {careersConstants.mission.paragraphs.slice(3).map((paragraph, index) => (
              <motion.p key={index + 3} className="text-muted-foreground leading-relaxed" variants={CONTENT_ITEM_VARIANTS}>
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Open Roles Section */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={ROLES_CONTAINER_VARIANTS}>
        <motion.div className="mb-6" variants={ROLE_ITEM_VARIANTS}>
          <h2 className="text-sm text-muted-foreground mb-2">{careersConstants.openRoles.header}</h2>
          <div className="w-full border-b-2 border-muted-foreground"></div>
        </motion.div>

        {/* Roles List with Hover Effect */}
        <div className="relative">
          {/* Hover Highlight Background */}
          <div
            className="absolute left-0 right-0 transition-all duration-300 ease-out bg-muted/30 dark:bg-muted/20 rounded-lg"
            style={{
              ...hoverStyle,
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          />

          {/* Roles */}
          <div className="relative">
            {allRoles.map((role, index) => (
              <div key={role.id || index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                <RoleListItem title={role.title} department={role.department} location={role.location} applyLink={role.applyLink} itemRef={(el) => (itemRefs.current[index] = el)} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { CareersSection };
