/* ==========================================================================*/
// page.tsx — Get started page with contact form
/* ==========================================================================*/
// Purpose: Contact form page for potential clients to reach out
// Sections: Imports, Animation Variants, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React from "react";

// External Packages ---
import { motion, useReducedMotion, easeInOut } from "motion/react";

// Local Components ---
import { TextEffect } from "@workspace/ui/components/text-effect";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import { ArrowRightIcon } from "lucide-react";

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const ENTRY_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

const ANIMATION_TRANSITIONS = {
  form: {
    duration: 0.5,
    delay: 0.4,
    ease: easeInOut,
  },
  content: {
    duration: 0.5,
    delay: 0.6,
    ease: easeInOut,
  },
  hover: {
    duration: 0.15,
    ease: easeInOut,
  },
};

const TEXT_EFFECT_CONFIG = {
  title: {
    preset: "fade-in-blur" as const,
    speedReveal: 3,
    segmentTransition: { duration: 0.4, ease: easeInOut },
  },
};

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * GetStartedPage
 *
 * Professional contact form page with animated header and form fields.
 * Features clean typography and refined layout.
 */
export default function GetStartedPage() {
  const shouldReduceMotion = useReducedMotion();

  // Hover animation props for submit button
  const submitHoverProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: ANIMATION_TRANSITIONS.hover,
      };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add form submission logic
    console.log("Form submitted");
  };

  return (
    <div className="isolate px-6 py-16 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Header Section - Left Side --- */}
          <div className="lg:pr-8">
            <div className="space-y-8">
              <TextEffect className="text-4xl sm:text-5xl md:text-[49px] lg:text-[50px] xl:text-[56px] text-balance lg:text-wrap tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight" preset={TEXT_EFFECT_CONFIG.title.preset} as="h1" per="char" speedReveal={TEXT_EFFECT_CONFIG.title.speedReveal} segmentTransition={TEXT_EFFECT_CONFIG.title.segmentTransition}>
                Let's engineer your competitive advantage.
              </TextEffect>

              <motion.div className="space-y-10 text-lg leading-normal" variants={ENTRY_VARIANTS} initial="hidden" animate="visible" transition={ANIMATION_TRANSITIONS.content}>
                <p className="text-foreground/80">
                  We're deploying AI infrastructure that systematically eliminates operational limitations. 
                  We partner with a select group of companies ready to pioneer the future of work.
                </p>
                <p className="font-semibold text-foreground/80">
                  We're looking for strong pilot partners who want to lead their industries <ArrowRightIcon className="size-3.5 inline-block ml-2" />
                </p>
              </motion.div>
            </div>
          </div>

          {/* Form Section - Right Side --- */}
          <div className="mt-4">
            <motion.form className="space-y-7" variants={ENTRY_VARIANTS} initial="hidden" animate="visible" transition={ANIMATION_TRANSITIONS.form} onSubmit={handleSubmit}>
              {/* Name Fields Row --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-zinc-900 dark:text-zinc-100 font-medium">
                    First Name
                  </Label>
                  <Input id="firstName" name="firstName" type="text" placeholder="Chris" className="h-12" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-zinc-900 dark:text-zinc-100 font-medium">
                    Last Name
                  </Label>
                  <Input id="lastName" name="lastName" type="text" placeholder="Maresca" className="h-12" required />
                </div>
              </div>

              {/* Email and LinkedIn Fields Row --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-900 dark:text-zinc-100 font-medium">
                    Work Email
                  </Label>
                  <Input id="email" name="email" type="email" placeholder="chris@usearstal.dev" className="h-12" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-zinc-900 dark:text-zinc-100 font-medium">
                    LinkedIn Profile
                  </Label>
                  <Input id="linkedin" name="linkedin" type="url" placeholder="LinkedIn Profile URL" className="h-12" />
                </div>
              </div>

              {/* Message Field --- */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-zinc-900 dark:text-zinc-100 font-medium">
                  Message
                </Label>
                <Textarea className="min-h-28" id="message" name="message" placeholder="Tell us about your operational challenges and transformation goals..." rows={5} required />
              </div>

              {/* Submit Button --- */}
              <div className="pt-4">
                <motion.div {...submitHoverProps}>
                  <Button type="submit" className="w-full h-12 bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-medium cursor-pointer" size="lg">
                  Apply for Partnership
                  </Button>
                </motion.div>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/
