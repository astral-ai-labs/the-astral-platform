/* ==========================================================================*/
// faqs.tsx — FAQ section component with accordion functionality
/* ==========================================================================*/
// Purpose: Frequently asked questions section with collapsible accordion interface
// Sections: Imports, Data, Props, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React from "react";

// External Packages ---
import { PlusIcon } from "lucide-react";

// Local Components ---
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../motion-primitives/accordion";

// Local Constants ---
import { homeConstants } from "@/constants";

/* ==========================================================================*/
// Data
/* ==========================================================================*/

// Removed FAQS_DATA - now using homeConstants.faqs.items

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface FaqsProps {
  className?: string;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * Faqs
 *
 * FAQ section with accordion functionality and responsive layout.
 * Features expandable questions with smooth animations.
 */
function Faqs({ className }: FaqsProps) {
  return (
    <div className={`relative home-section-spacing ${className || ""}`}>
      <div className="relative px-6 lg:px-8 pt-16 lg:pt-20">
        <div className="mx-auto max-w-4xl xl:max-w-5xl">
          {/* Content - Stacked on mobile, side-by-side on lg */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-24">
            {/* Header Section */}
            <div className="text-left lg:py-4 lg:col-span-2">
              <h2 className="text-4xl md:text-5xl tracking-tight text-foreground font-medium leading-tight text-balance mb-4">
                {homeConstants.faqs.title}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {homeConstants.faqs.subtitle}
              </p>
            </div>

            {/* Accordion Section */}
            <div className="col-span-3 border-t border-border px-3 sm:px-0 lg:border-none">
              <Accordion
                className="flex w-full flex-col divide-y divide-border"
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {homeConstants.faqs.items.map((item) => (
                  <AccordionItem
                    value={item.value}
                    className="py-4"
                    key={item.value}
                  >
                    <AccordionTrigger className="w-full text-left text-foreground">
                      <div className="flex items-center space-x-3">
                        <PlusIcon className="h-4 w-4 text-foreground transition-transform duration-200 group-data-[expanded]:rotate-45" />
                        <div className="text-base font-medium">{item.title}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4 text-muted-foreground leading-relaxed space-y-4">
                        {Array.isArray(item.content) ? (
                          item.content.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))
                        ) : (
                          <p>{item.content}</p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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

export { Faqs };
