/* ==========================================================================*/
// breadcrumbs.tsx — Navigation breadcrumbs component
/* ==========================================================================*/
// Purpose: Renders navigation breadcrumbs with customizable text
// Sections: Imports, Props, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React from 'react';

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/
interface BreadcrumbsProps {
  firstCrumb?: string;
  secondCrumb?: string;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * Breadcrumbs
 * 
 * Navigation breadcrumbs component with customizable text.
 * 
 * @param props - Component props
 * @param props.firstCrumb - First breadcrumb text (defaults to "Resources")
 * @param props.secondCrumb - Second breadcrumb text (defaults to "Company")
 */
function Breadcrumbs({ 
  firstCrumb = "Resources",
  secondCrumb = "Company" 
}: BreadcrumbsProps) {
  return (
    <div className="flex justify-center mb-6">
      <nav className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
        <span className="cursor-default">{firstCrumb}</span>
        <span>·</span>
        <span className="cursor-default">{secondCrumb}</span>
      </nav>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/
export { Breadcrumbs };
