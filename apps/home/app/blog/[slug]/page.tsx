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
import Image from "next/image";

// Local Utils ----
import { getPostSlugs, PostMetadata } from "@/lib/mdx-utils";

// Local Components ----
import { PostFooter } from "@/components/resources/footer";
import { ContentHeader } from "@/components/resources/content-header";

/* ==========================================================================*/
// Types
/* ==========================================================================*/

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface MDXModule {
  default: React.ComponentType;
  metadata: PostMetadata;
}

/* ==========================================================================*/
// Helper Functions
/* ==========================================================================*/

/**
 * loadMDXPost
 *
 * Safely loads an MDX post with error handling.
 *
 * @param slug - The post slug to load
 * @returns Promise resolving to MDX module or null if not found
 */
async function loadMDXPost(slug: string): Promise<MDXModule | null> {
  try {
    const mdxModule = (await import(`@/content/resources/${slug}.mdx`)) as MDXModule;

    if (!mdxModule.default) {
      return null;
    }

    return mdxModule;
  } catch (error) {
    console.log(`Error loading MDX file: ${slug}`, error);
    return null;
  }
}

/**
 * createMetadataFromPost
 *
 * Creates Next.js metadata object from post metadata.
 *
 * @param metadata - Post metadata object
 * @param slug - Post slug for URL construction
 * @returns Metadata object for Next.js
 */
function createMetadataFromPost(metadata: PostMetadata, slug: string): Metadata {
  const title = metadata.title || "Untitled";
  const description = metadata.excerpt || "A blog post";
  const url = `/resources/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: metadata.heroImage
        ? [
            {
              url: metadata.heroImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
      authors: [metadata.author],
      publishedTime: metadata.date,
      section: metadata.category,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: metadata.heroImage ? [metadata.heroImage] : [],
    },
    alternates: {
      canonical: url,
    },
  };
}

/* ==========================================================================*/
// Metadata Generation
/* ==========================================================================*/

/**
 * generateMetadata
 *
 * Generates page metadata from MDX post frontmatter with OpenGraph support.
 */
async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const mdxModule = await loadMDXPost(slug);

  if (!mdxModule) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return createMetadataFromPost(mdxModule.metadata, slug);
}


/* ==========================================================================*/
// Static Generation
/* ==========================================================================*/

/**
 * generateStaticParams
 *
 * Pre-generates static params for all available blog posts.
 */
async function generateStaticParams() {
    const slugs = await getPostSlugs();
    
    return slugs.map((slug) => ({
      slug,
    }));
  }

/* ==========================================================================*/
// Configuration
/* ==========================================================================*/

// Disable dynamic params to return 404 for unknown routes
export const dynamicParams = false;


/* ==========================================================================*/
// Main Component
/* ==========================================================================*/

/**
 * Resource
 *
 * Dynamic resource page that loads MDX files as React components
 * with metadata-driven layout and styling.
 */
async function Resource({ params }: PageProps) {
    const { slug } = await params;
    
    const mdxModule = await loadMDXPost(slug);
    
    if (!mdxModule) {
      notFound();
    }
    
    const { default: ResourceContent, metadata } = mdxModule;
  
    return (
      <main className="relative isolate px-6 lg:px-8">
        <div className="max-w-5xl mx-auto md:px-4">
          {/* Spacer */}
          <div className="hidden md:block h-8 lg:h-16" />
  
          {/* Breadcrumbs
        //   <Breadcrumbs firstCrumb="Blog" secondCrumb={metadata.category || "Article"} />
  
          {/* Post Header */}
          <ContentHeader title={metadata.title} subtitle={metadata.excerpt} />
  
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
    );
  }


export { generateMetadata, generateStaticParams };
export default Resource;