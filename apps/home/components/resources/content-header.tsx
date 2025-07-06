/* ==========================================================================*/
// header2.tsx — Astral Hero Header Component
/* ==========================================================================*/
// Purpose: Hero header section with animated grid background and text effects
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
import { AstralIcon } from "@/components/astral-logos/astral-icon";
import { TextEffect } from "@workspace/ui/components/text-effect";

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const GRID_VARIANTS = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const LOGO_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(12px)",
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
  },
};

const ANIMATION_TRANSITIONS = {
  grid: {
    duration: 1.2,
    ease: easeInOut,
  },
  logo: {
    duration: 0.8,
    delay: 0.2,
    ease: easeInOut,
  },
};

const TEXT_EFFECT_CONFIG = {
  title: {
    preset: "fade-in-blur" as const,
    speedReveal: 3,
    delay: 0.6,
    segmentTransition: { duration: 0.6, ease: easeInOut },
  },
  subtitle: {
    preset: "fade" as const,
    delay: 1.2,
    speedReveal: 1.5,
    speedSegment: 0.25,
    segmentTransition: { duration: 0.5, ease: easeInOut },
  },
};

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface AstralHeroProps {
  className?: string;
  title: string;
  subtitle: string;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * AstralHero
 *
 * Hero header section with animated grid background, logo blur-in effect,
 * and text effects for enhanced visual appeal.
 */
function ContentHeader({ className, title, subtitle }: AstralHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative bg-background h-64 lg:h-72 text-foreground overflow-hidden flex flex-col items-center justify-center px-6 py-12 ${className || ""}`}>
      {/* Animated Dotted Grid Background --- */}
      <motion.div 
        className="absolute inset-0"
        variants={GRID_VARIANTS}
        initial="hidden"
        animate="visible"
        transition={shouldReduceMotion ? { duration: 0 } : ANIMATION_TRANSITIONS.grid}
      >
        <div className="absolute inset-0 bg-grid-dots" />
      </motion.div>

      {/* Logo Container - White Rounded Square --- */}
      <motion.div 
        className="relative z-10 mb-6"
        variants={LOGO_VARIANTS}
        initial="hidden"
        animate="visible"
        transition={shouldReduceMotion ? { duration: 0 } : ANIMATION_TRANSITIONS.logo}
      >
        <div className="w-20 h-20 bg-card rounded-lg flex items-center justify-center shadow-lg border">
          <AstralIcon className="w-10 h-10 text-card-foreground" />
        </div>
      </motion.div>

      {/* Main Heading --- */}
      <TextEffect 
        className="relative z-10 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-center mb-4 max-w-5xl leading-tight text-foreground" 
        preset={TEXT_EFFECT_CONFIG.title.preset} 
        as="h1" 
        per="char" 
        delay={TEXT_EFFECT_CONFIG.title.delay}
        speedReveal={TEXT_EFFECT_CONFIG.title.speedReveal} 
        segmentTransition={TEXT_EFFECT_CONFIG.title.segmentTransition}
      >
        {title}
      </TextEffect>

      {/* Subtext --- */}
      <TextEffect 
        className="relative z-10 text-muted-foreground text-sm md:text-base text-center max-w-2xl leading-relaxed" 
        preset={TEXT_EFFECT_CONFIG.subtitle.preset} 
        as="p" 
        per="char" 
        delay={TEXT_EFFECT_CONFIG.subtitle.delay} 
        speedReveal={TEXT_EFFECT_CONFIG.subtitle.speedReveal} 
        segmentTransition={TEXT_EFFECT_CONFIG.subtitle.segmentTransition}
      >
        {subtitle}
      </TextEffect>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { ContentHeader };
