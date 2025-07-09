/* ==========================================================================*/
// hero.tsx — Hero section component with animated text and CTAs
/* ==========================================================================*/
// Purpose: Main hero section with animated text effects and call-to-action buttons
// Sections: Imports, Animation Variants, Props, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React from "react";

// External Packages ---
import { motion, useReducedMotion, easeInOut, cubicBezier } from "motion/react";
import { ArrowRight } from "lucide-react";

// Local Components ---
import { TextEffect } from "@workspace/ui/components/text-effect";

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

const FLIP_VARIANTS = {
  initial: {
    rotateX: 45,
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    rotateX: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    rotateX: -45,
    opacity: 0,
    scale: 0.95,
  },
};

const HOVER_VARIANTS = {
  secondary: {
    initial: { scale: 1 },
    hover: { scale: 1.035 },
    tap: { scale: 0.95 },
  },
  arrow: {
    initial: { x: 0 },
    hover: { x: 2 },
  },
};

const ANIMATION_TRANSITIONS = {
  primaryCta: {
    duration: 0.5,
    delay: 0.1,
    ease: easeInOut,
  },
  secondaryCta: {
    duration: 0.5,
    delay: 0.6,
    ease: easeInOut,
  },
  flip: {
    duration: 0.6,
    ease: cubicBezier(0.4, 0.0, 0.2, 1),
  },
  hover: {
    duration: 0.1,
    ease: easeInOut,
  },
  arrow: {
    duration: 0.1,
    ease: easeInOut,
  },
};

const TEXT_EFFECT_CONFIG = {
  title: {
    preset: "fade-in-blur" as const,
    speedReveal: 4,
    segmentTransition: { duration: 0.5, ease: easeInOut },
  },
  subtitle: {
    preset: "fade" as const,
    delay: 0.85,
    speedReveal: 1.7,
    speedSegment: 0.2,
    segmentTransition: { duration: 0.5, ease: easeInOut },
  },
};

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface HeroProps {
  className?: string;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * Hero
 *
 * Main hero section with animated text effects and call-to-action buttons.
 * Features fade-in animations and blur effects for enhanced visual appeal.
 */
function Hero({ className }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const constants = homeConstants;

  // Hover animation props for secondary button
  const secondaryHoverProps = shouldReduceMotion
    ? {}
    : {
        whileHover: HOVER_VARIANTS.secondary.hover,
        whileTap: HOVER_VARIANTS.secondary.tap,
        transition: ANIMATION_TRANSITIONS.hover,
      };

  // Hover animation props for primary button (matching navbar)
  const primaryHoverProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.035 },
        whileTap: { scale: 0.95 },
        transition: { duration: 0.1, ease: easeInOut },
      };

  return (
    <div className={`relative home-section-spacing ${className || ""}`}>
      <div className="relative isolate px-6 pt-6 sm:pt-30 md:pt-32 lg:px-8">
        <div className="mx-auto max-w-full lg:max-w-4xl xl:max-w-5xl md:px-6">
          {/* Main Content --- */}
          <div className="text-left">
            {/* Title with TextEffect --- */}
            <TextEffect 
              className="max-w-2xl lg:max-w-3xl xl:max-w-6xl text-[51px] md:text-6xl tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight min-[400px]:mr-5 md:mr-0" 
              preset={TEXT_EFFECT_CONFIG.title.preset} 
              as="h1" 
              per="char" 
              speedReveal={TEXT_EFFECT_CONFIG.title.speedReveal} 
              segmentTransition={TEXT_EFFECT_CONFIG.title.segmentTransition}
            >
              {constants.hero.titleDesktop}
            </TextEffect>

            <TextEffect 
              className="mt-6 sm:mt-8 text-pretty text-xl md:text-2xl max-w-[430px] sm:max-w-none text-zinc-500 dark:text-zinc-300 leading-relaxed" 
              preset={TEXT_EFFECT_CONFIG.subtitle.preset} 
              as="p" 
              per="char" 
              delay={TEXT_EFFECT_CONFIG.subtitle.delay} 
              speedReveal={TEXT_EFFECT_CONFIG.subtitle.speedReveal} 
              segmentTransition={TEXT_EFFECT_CONFIG.subtitle.segmentTransition}
            >
              {constants.hero.subtitle}
            </TextEffect>

            {/* Call to Action Buttons --- */}
            <motion.div 
              className="mt-10 flex items-center justify-start gap-x-6"
              variants={ENTRY_VARIANTS} 
              initial="hidden" 
              animate="visible" 
              transition={ANIMATION_TRANSITIONS.secondaryCta}
            >
              <motion.a 
                href={constants.hero.primary.href} 
                className="rounded-md bg-zinc-900 px-4 py-2 md:px-5 md:py-2 text-base font-medium text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 dark:shadow-lg"
                {...primaryHoverProps}
              >
                <motion.span    
                  variants={FLIP_VARIANTS}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={ANIMATION_TRANSITIONS.flip}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  {constants.hero.primary.text}
                </motion.span>
              </motion.a>
              <motion.a 
                href={constants.hero.secondary.href} 
                className="inline-flex items-center gap-1 text-sm/6 font-semibold text-zinc-900 dark:text-zinc-200" 
                {...secondaryHoverProps}
                whileHover="hover"
              >
                <motion.span
                  variants={FLIP_VARIANTS}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={ANIMATION_TRANSITIONS.flip}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  {constants.hero.secondary.text}
                </motion.span>
                <motion.div
                  variants={HOVER_VARIANTS.arrow}
                  transition={ANIMATION_TRANSITIONS.arrow}
                >
                  <ArrowRight className="h-4 w-4 ml-2" />
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { Hero };
