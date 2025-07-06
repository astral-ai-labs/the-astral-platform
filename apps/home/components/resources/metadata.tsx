/* ==========================================================================*/
// metadata.tsx — Post metadata component with author, date, and copy link
/* ==========================================================================*/
// Purpose: Displays post metadata with smooth entrance animation
// Sections: Imports, Animation Variants, Props, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React from "react";

// External Packages ---
import { motion, useReducedMotion, easeInOut } from "motion/react";

// Local Components ---
import { ResourceButton } from "@/components/ui/resource-button";
import { PostMetadata } from "@/lib/mdx-utils";

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const METADATA_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: 2.8,
      ease: easeInOut,
    },
  },
};

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface PostMetadataProps {
  metadata: PostMetadata;
  className?: string;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * PostMetadataDisplay
 *
 * Displays post metadata including author, date, and copy link
 * with smooth entrance animation.
 */
function PostMetadataDisplay({ metadata, className }: PostMetadataProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div 
      className={`flex justify-center ${className || ""}`}
      variants={METADATA_VARIANTS}
      initial="hidden"
      animate="visible"
      transition={shouldReduceMotion ? { duration: 0 } : undefined}
    >
      <div className="flex items-center space-x-3 text-sm text-muted-foreground h-5">
        <span>{metadata.author}</span>
        <span>·</span>
        <time dateTime={metadata.date} className="hidden md:inline">
          {metadata.date}
        </time>
        <span className="hidden md:inline">·</span>
        <div className="w-20 flex justify-center">
          <ResourceButton text="Copy Link" />
        </div>
      </div>
    </motion.div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { PostMetadataDisplay }; 