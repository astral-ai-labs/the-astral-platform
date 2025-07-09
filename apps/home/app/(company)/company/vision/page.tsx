/* ==========================================================================*/
// page.tsx — Dynamic blog post page with MDX imports and metadata
/* ==========================================================================*/
// Purpose: Renders blog posts using dynamic MDX imports with metadata-driven layout
// Sections: Imports, Types, Animation Variants, Helpers, Components, Static Generation, Metadata, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ----
import React from "react";

// Next.js Core ----
import { notFound } from "next/navigation";
import { Metadata } from "next";

// External Packages ---
import * as motion from "motion/react-client";
import { easeInOut } from "motion/react";

// Local Utils ----
import { PostMetadata } from "@/lib/mdx-utils";

// Local Components ----
import { Breadcrumbs } from "@/components/resources/breadcrumbs";
import { ContentHeader } from "@/components/resources/content-header";
import { PostMetadataDisplay } from "@/components/resources/metadata";
import { PostFooter } from "@/components/resources/footer";

// Local Constants ---
import { companyConstants } from "@/constants";

/* ==========================================================================*/
// Types
/* ==========================================================================*/

interface MDXModule {
  default: React.ComponentType;
  metadata: PostMetadata;
}

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const ARTICLE_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 2.5,
      ease: easeInOut,
    },
  },
};

/* ==========================================================================*/
// Metadata
/* ==========================================================================*/

export const metadata: Metadata = {
  title: companyConstants.vision.title,
  description: companyConstants.vision.subtitle,
  openGraph: {
    title: companyConstants.vision.title,
    description: companyConstants.vision.subtitle,
    type: "article",
    url: `/company/vision`,
    images: [
      {
        url: "/resources/vision.png",
        width: 1200,
        height: 630,
        alt: companyConstants.vision.title,
      },
    ],
    authors: ["Chris Maresca"],
    publishedTime: "2025-07-03",
    section: "Company",
  },
  twitter: {
    card: "summary_large_image",
    title: companyConstants.vision.title,
    description: companyConstants.vision.subtitle,
    images: ["/resources/vision.png"],
  },
};

/* ==========================================================================*/
// Main Component
/* ==========================================================================*/

/**
 * Vision
 *
 * Dynamic resource page that loads MDX files as React components
 * with metadata-driven layout and smooth article entrance animation.
 */
async function Vision() {
  const mdxModule = (await import(`@/content/company/vision.mdx`)) as MDXModule;

  if (!mdxModule) {
    notFound();
  }

  const { default: ResourceContent, metadata } = mdxModule;

  return (
    <div className="relative isolate px-6 pt-0 lg:px-8">
      <main className="pt-18">
        <div className="max-w-5xl mx-auto md:px-4">
          {/* Hero Header --- */}
          <div>
            <ContentHeader 
              title={companyConstants.vision.title} 
              subtitle={companyConstants.vision.subtitle} 
            />
          </div>

          {/* Post Metadata --- */}
          <PostMetadataDisplay metadata={metadata} />

          {/* Article Content --- */}
          <motion.article className="max-w-2xl mx-auto overflow-x-hidden pt-8 md:pt-16 lg:pt-20 pl-5" variants={ARTICLE_VARIANTS} initial="hidden" animate="visible">
            <div className="prose prose-md mx-auto leading-tight prose-gray dark:prose-invert">
              <ResourceContent />
            </div>
          </motion.article>

          {/* Post Footer --- */}
          {/* <div>
            <PostFooter metadata={metadata} />
          </div> */}

          {/* Bottom Spacer --- */}
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
