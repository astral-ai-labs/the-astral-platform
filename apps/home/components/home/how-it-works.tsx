/* ==========================================================================*/
// how-it-works.tsx — How Does It Work section component
/* ==========================================================================*/
// Purpose: Showcase the three-step process with horizontally styled cards
// Sections: Imports, Data, Props, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React from "react";

// External Packages ---
import { easeInOut, easeOut } from "motion/react";
import { PlusIcon } from "lucide-react";

// Local Components ---
import { Tilt } from "../motion-primitives/tilt";
import { BorderTrail } from "../motion-primitives/border-trail";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from "../motion-primitives/morphing-dialog";

// Local Constants ---
import { homeConstants } from "@/constants2";

/* ==========================================================================*/
// Data
/* ==========================================================================*/

const STEPS_DATA = [
    {
      number: "01",
      title: "Identify High-Impact Opportunities",
      morphTitle: "Identify High-Impact Opportunities",
      shortDescription: "Access the astral platform and describe your most critical operational bottlenecks.",
      fullDescription: "Access the astral platform (currently working with select teams in alpha) and describe your highest-impact operational challenges. Which processes consume the most resources? Where are your teams spending time on repetitive work? What operational inefficiencies are costing you the most? No technical requirements, no lengthy vendor evaluations, no implementation roadmaps.",
    },
    {
      number: "02", 
      title: "Astral AI Builds Your AI",
      morphTitle: "Astral Agents Build Your Solution",
      shortDescription: "Our AI agents build 75% of your custom solution autonomously as you describe your challenges.",
      fullDescription: "Our proprietary agents build roughly 75% of your custom enterprise solution autonomously as you describe your operational challenges. This is AI building AI, the astral breakthrough that changed everything. Complex business logic and integrations constructed automatically while you define requirements.",
    },
    {
      number: "03",
      title: "Deploy & Scale",
      morphTitle: "Deploy & Scale",
      shortDescription: "Our team finalizes and deploys solutions across your operations. Enterprise transformation in days.",
      fullDescription: "The astral team finalizes your solutions and deploys them across your operations. What traditionally requires months of development, testing, and rollout happens in days. Immediate ROI with systematic competitive advantages that compound across your organization.",
    },
  ];
/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface HowItWorksProps {
  className?: string;
}

interface StepCardProps {
  number: string;
  title: string;
  morphTitle: string;
  shortDescription: string;
  fullDescription: string;
  className?: string;
  borderTrailProps?: {
    size?: number;
    duration?: number;
    ease?: any;
    opacity?: string;
  };
}

/* ==========================================================================*/
// Step Card Component
/* ==========================================================================*/

/**
 * StepCard
 *
 * Individual step card with horizontal layout and morphing dialog for full content.
 */
function StepCard({ number, title, morphTitle, shortDescription, fullDescription, className, borderTrailProps }: StepCardProps) {
  const {
    size = 40,
    duration = 18,
    ease = 'linear',
    opacity = 'bg-muted-foreground/20 dark:bg-muted-foreground/10'
  } = borderTrailProps || {};

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <Tilt rotationFactor={2.5}>
        <MorphingDialogTrigger
          style={{
            borderRadius: '12px',
          }}
          className={`relative w-full bg-gradient-to-br from-muted/80 dark:from-muted/20 via-card/90 dark:via-card/10 to-muted/70 dark:to-muted/30 border border-border p-6 ${className || ""}`}
        >
          <BorderTrail
            className={opacity}
            size={size}
            transition={{
              repeat: Infinity,
              duration: duration,
              ease: ease,
            }}
          />
          <div className="flex items-start gap-6">
            {/* Number */}
            <div className="flex-shrink-0">
              <span className="text-3xl font-mono text-muted-foreground/80 font-medium">
                {number}
              </span>
            </div>
            
            {/* Title and Description */}
            <div className="flex-1 min-w-0">
              <MorphingDialogTitle className="text-lg font-medium text-foreground mb-2 text-left text-balance">
                {title}
              </MorphingDialogTitle>
              <MorphingDialogSubtitle className="text-sm text-muted-foreground leading-relaxed text-left">
                {shortDescription}
              </MorphingDialogSubtitle>
            </div>

            {/* Plus Icon */}
            <div className="flex-shrink-0">
              <div className="flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 active:scale-[0.98]">
                <PlusIcon size={12} />
              </div>
            </div>
          </div>
        </MorphingDialogTrigger>
      </Tilt>

      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{
            borderRadius: '24px',
          }}
          className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-border bg-background dark:bg-background sm:w-[600px]"
        >
          <div className="p-6">
            <MorphingDialogTitle className="text-2xl text-foreground font-medium mb-2 text-balance">
              {morphTitle}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className="text-sm text-muted-foreground/80 mb-4">
              Step {number}
            </MorphingDialogSubtitle>
            <MorphingDialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <p className="text-muted-foreground leading-relaxed">
                {fullDescription}
              </p>
            </MorphingDialogDescription>
          </div>
          <MorphingDialogClose className="text-muted-foreground hover:text-foreground" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * HowItWorks
 *
 * How Does It Work section with shortened steps and expandable dialogs.
 */
function HowItWorks({ className }: HowItWorksProps) {
  return (
    <div className={`relative home-section-spacing ${className || ""}`}>
      <div className="relative px-6 lg:px-8 pt-16 lg:pt-20">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          {/* Section Header - Left aligned like features.tsx */}
          <div className="text-left lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center max-w-4xl mx-auto mb-16 lg:mb-20">
            <h2 className="text-4xl md:text-5xl tracking-tight text-foreground font-medium leading-tight text-balance">
              {homeConstants.howItWorks.title}
            </h2>
            <p className="mt-6 lg:mt-0 text-base text-balance text-muted-foreground leading-relaxed">
              {homeConstants.howItWorks.subtitle}
            </p>
          </div>

          {/* Steps - Stacked on all screens */}
          <div className="space-y-6">
            {homeConstants.howItWorks.steps.map((step, index) => (
              <StepCard
                key={index}
                number={step.number}
                title={step.title}
                morphTitle={step.morphTitle}
                shortDescription={step.shortDescription}
                fullDescription={step.fullDescription}
                className="h-auto"
                borderTrailProps={{
                  size: index === 0 ? 35 : index === 1 ? 45 : 38,
                  duration: index === 0 ? 22 : index === 1 ? 16 : 19,
                  ease: index === 0 ? easeInOut : index === 1 ? 'linear' : easeOut,
                  opacity: index === 0 ? 'bg-muted-foreground/15 dark:bg-muted-foreground/8' : 
                           index === 1 ? 'bg-muted-foreground/25 dark:bg-muted-foreground/12' : 
                           'bg-muted-foreground/18 dark:bg-muted-foreground/9'
                }}
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

export { HowItWorks };