/* ==========================================================================*/
// footer.tsx — Footer component with social links and infinite slider
/* ==========================================================================*/
// Purpose: Site footer with social media links and animated background text
// Sections: Imports, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React from "react";

// Next.js ---
import Link from "next/link";

// External Packages ---
import { Linkedin, Twitter } from "lucide-react";

// Local Components ---
import { InfiniteSlider } from "./motion-primitives/infinite-slider";

// Local Constants ---
import { footerConstants } from "@/constants2";

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * Footer
 *
 * Site footer with social media links and animated background text.
 * Features responsive layout and smooth hover animations.
 */
function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-7xl flex-col justify-center px-6 py-12 md:flex-row md:justify-between md:px-8">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} {footerConstants.copyright}
        </p>
        <div className="order-first mb-4 flex items-center gap-x-6 md:order-none md:mb-0">
          <Link
            href="#"
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            <Twitter className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,white_20%,transparent)] dark:[mask-image:linear-gradient(to_bottom,black_20%,transparent)]">
        <InfiniteSlider
          className="-mb-14 whitespace-nowrap text-9xl leading-[100%] text-transparent [text-shadow:1px_1px_1px_rgba(255,255,255,.1),-1px_-1px_1px_rgba(0,0,0,.5),-40px_-40px_0px_rgba(0,0,0,0)] dark:[text-shadow:1px_1px_1px_rgba(0,0,0,.1),-1px_-1px_1px_rgba(255,255,255,.3),-40px_-40px_0px_rgba(0,0,0,0)] sm:text-[12rem]"
          gap={80}
          speed={50}
        >
          <div>{footerConstants.infiniteSlider}</div>
        </InfiniteSlider>
      </div>
    </footer>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { Footer };
