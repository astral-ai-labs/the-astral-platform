/* ==========================================================================*/
// ai-header-client.tsx — AI section header with dynamic breadcrumbs
/* ==========================================================================*/
// Purpose: Renders header with sidebar trigger, separator, and dynamic breadcrumbs
// Sections: Imports, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React from "react";

// Next.js ---
import { usePathname } from "next/navigation";

// External Packages ----
import { Breadcrumb, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage, BreadcrumbItem, BreadcrumbList } from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";

/* ==========================================================================*/
// Component
/* ==========================================================================*/

function AiHeaderClient() {
  const pathname = usePathname();
  
  // Extract path segments, ignoring the first segment (/ai)
  const pathSegments = pathname.split('/').filter(Boolean);
  const aiSubSegments = pathSegments.slice(1); // Skip first segment (/ai)
  
  // Capitalize first letter for display
  const capitalizeSegment = (segment: string) => segment.charAt(0).toUpperCase() + segment.slice(1);

  return (
    <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/ai">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          
          {aiSubSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                {index === aiSubSegments.length - 1 ? (
                  <BreadcrumbPage>{capitalizeSegment(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={`/ai/${aiSubSegments.slice(0, index + 1).join('/')}`}>
                    {capitalizeSegment(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { AiHeaderClient };
