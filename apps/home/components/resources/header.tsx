/* ==========================================================================*/
// header.tsx — Blog post header component
/* ==========================================================================*/
// Purpose: Renders a blog post header with title, hero image, and metadata
// Sections: Imports, Types, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React from 'react';

// Next.js Core ---
import Image from 'next/image';

// Local Components ---
import { ResourceButton } from '@/components/ui/resource-button';
import { PostMetadata } from '@/lib/mdx-utils';

/* ==========================================================================*/
// Types
/* ==========================================================================*/


interface PostHeaderProps {
  metadata: PostMetadata;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * PostHeader
 * 
 * Blog post header component that displays title, hero image, and metadata.
 * 
 * @param props - Component props
 * @param props.metadata - Post metadata including title, author, date, and hero image
 */
function PostHeader({ metadata }: PostHeaderProps) {
  return (
    <>
      <h1 className="text-2xl md:text-4xl xl:text-5xl font-normal text-center mb-6 md:mb-12 max-w-4xl mx-auto leading-tight tracking-tight text-foreground">
        {metadata.title}
      </h1>

      {metadata.heroImage ? (
        <>
          <div className="flex justify-center mb-6 md:mb-12">
            <div className="w-full max-w-4xl">
              <Image 
                src={metadata.heroImage} 
                alt={`Hero image for ${metadata.title}`} 
                className="w-full h-auto rounded-2xl" 
                width={1200} 
                height={630} 
                priority={true} 
              />
            </div>
          </div>

          <div className="flex justify-center mb-10 md:mb-12">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground h-5">
              <span>{metadata.author}</span>
              <span>·</span>
              <time dateTime={metadata.date} className="hidden md:inline">
                {metadata.date}
              </time>
              <span className="hidden md:inline">·</span>
              <div className="w-20 flex justify-center">
                <ResourceButton text="Copy Link" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mb-24" />
      )}
    </>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { PostHeader };
export type { PostHeaderProps };
  