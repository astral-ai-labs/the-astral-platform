/* ==========================================================================*/
// yc.tsx — Y Combinator Logo Component
/* ==========================================================================*/
// Purpose: Reusable Y Combinator logo with customizable fill and hover states
// Sections: Imports, Props, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React from "react";

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface YcProps {
  className?: string;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * Yc
 *
 * Y Combinator logo component with customizable fill color.
 * Uses currentColor for background and contrasting color for Y symbol.
 */
function Yc({ className }: YcProps) {
  return (
    <svg 
      role="img" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 32 32" 
      width="64" 
      height="64"
      aria-label="Y Combinator Logo"
      className={className}
    >
      <path d="M0 0h32v32H0z" fill="currentColor" />
      <path
        d="M14.933 18.133L9.387 7.787h2.56l3.2 6.507c0 .107.107.213.213.32s.107.213.213.427l.107.107v.107c.107.213.107.32.213.533.107.107.107.32.213.427.107-.32.32-.533.427-.96.107-.32.32-.64.533-.96l3.2-6.507h2.347L17.067 18.24v6.613h-2.133z"
        className="fill-background"
      />
    </svg>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { Yc }; 