/* ==========================================================================*/
// footer.tsx — Blog post footer component
/* ==========================================================================*/
// Purpose: Renders a blog post footer with author information and sharing options
// Sections: Imports, Types, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React from 'react';

// Local Components ---
import { ResourceButton } from '@/components/ui/resource-button';
import { PostMetadata } from '@/lib/mdx-utils';

/* ==========================================================================*/
// Types
/* ==========================================================================*/

interface PostFooterProps {
  metadata: PostMetadata;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * PostFooter
 * 
 * Blog post footer component that displays author information and sharing options.
 * 
 * @param props - Component props
 * @param props.metadata - Post metadata including author and date
 */
function PostFooter({ metadata }: PostFooterProps) {
  return (
    <div className="max-w-2xl mx-auto mt-4 md:mt-16 lg:mt-24">
      <div className="border-t border-border mb-6 md:hidden" />
      <div className="flex items-baseline justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-3 mx-auto h-5">
          <span>{metadata.author}</span>
          <span>·</span>
          <time dateTime={metadata.date}>{metadata.date}</time>
          <span>·</span>
          <div className="w-20 flex justify-center">
            <ResourceButton text="Copy Link" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { PostFooter };
export type { PostFooterProps };
