"use client";

/* ==========================================================================*/
// loading.tsx — Animated loading skeleton component
/* ==========================================================================*/
// Purpose: Renders animated loading bars with shimmer glimmer effect
// Sections: Imports, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React from "react";

// External Packages -----
import { motion, easeInOut } from "motion/react";

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const CONTAINER_VARIANTS = {
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

const BAR_VARIANTS = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easeInOut,
    },
  },
};

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface LoadingSkeletonProps {
  barCount?: number;
  className?: string;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

function LoadingSkeleton({ barCount = 12, className }: LoadingSkeletonProps) {
  return (
    <motion.div
      className={`flex flex-1 flex-col gap-4 p-4 ${className || ""}`}
      initial="hidden"
      animate="visible"
      variants={CONTAINER_VARIANTS}
    >
      {Array.from({ length: barCount }).map((_, index) => (
        <motion.div
          key={index}
          variants={BAR_VARIANTS}
          className="relative overflow-hidden bg-muted/30 aspect-video h-12 w-full rounded-lg"
        >
          {/* Shimmer overlay */}
          <motion.div
            initial={{ backgroundPosition: "-200% 0" }}
            animate={{ backgroundPosition: "200% 0" }}
            transition={{
              duration: 2,
              ease: easeInOut,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              backgroundSize: "200% 100%",
            }}
          />
          
          {/* Additional subtle pulse for depth */}
          <motion.div
            className="absolute inset-0 bg-muted/20 rounded-lg"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5,
              ease: easeInOut,
              repeat: Infinity,
              delay: index * 0.1,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { LoadingSkeleton };
