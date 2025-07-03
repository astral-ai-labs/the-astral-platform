/* ==========================================================================*/
// page.tsx — Dynamic blog post page with MDX imports and metadata
/* ==========================================================================*/
// Purpose: Renders blog posts using dynamic MDX imports with metadata-driven layout
// Sections: Imports, Types, Helpers, Components, Static Generation, Metadata, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ----
import React from "react";

// Next.js Core ----
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Local Utils ----
import { PostMetadata } from "@/lib/mdx-utils";

// Local Components ----
import { Breadcrumbs } from "@/components/resources/breadcrumbs";
import { PostHeader } from "@/components/resources/header";
import { PostFooter } from "@/components/resources/footer";

/* ==========================================================================*/
// Types
/* ==========================================================================*/

interface MDXModule {
  default: React.ComponentType;
  metadata: PostMetadata;
}

/* ==========================================================================*/
// Metadata
/* ==========================================================================*/

export const metadata: Metadata = {
  title: "The Future We're Building",
  description: "Astral is your firm's operating system for the age of artificial intelligence.",
  openGraph: {
    title: "The Future We're Building",
    description: "Astral is your firm's operating system for the age of artificial intelligence.",
    type: "article",
    url: `/company/vision`,
    images: [
      {
        url: "/resources/vision.png",
        width: 1200,
        height: 630,
        alt: "The Future We're Building",
      },
    ],
    authors: ["Chris Maresca"],
    publishedTime: "2025-07-03",
    section: "Company",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Future We're Building",
    description: "Astral is your firm's operating system for the age of artificial intelligence.",
    images: ["/resources/vision.png"],
  },
};

/* ==========================================================================*/
// Main Component
/* ==========================================================================*/

/**
 * Resource
 *
 * Dynamic resource page that loads MDX files as React components
 * with metadata-driven layout and styling.
 */
async function Vision() {
  const mdxModule = (await import(`@/content/company/vision.mdx`)) as MDXModule;

  if (!mdxModule) {
    notFound();
  }

  const { default: ResourceContent, metadata } = mdxModule;

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <main className="pt-16 ">
        <div className="max-w-3xl mx-auto md:px-4">
          {/* Spacer */}
          <div className="hidden md:block h-8 lg:h-16" />

          {/* Breadcrumbs */}
          <Breadcrumbs firstCrumb="Company" secondCrumb="Vision" />

          {/* Post Header */}
          <PostHeader metadata={metadata} />

          {/* Article Content */}
          <article className="max-w-xl mx-auto overflow-x-hidden">
            <div className="prose prose-lg mx-auto leading-tight prose-gray dark:prose-invert">
              <ResourceContent />
            </div>
          </article>

          {/* Post Footer */}
          <PostFooter metadata={metadata} />

          {/* Bottom Spacer */}
          <div className="h-32" />
        </div>
      </main>
    </div>
  );
}

/* ==========================================================================*/
// Public API Exports
/* ==========================================================================*/

export default Vision;
