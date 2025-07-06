/* ==========================================================================*/
// page.tsx — Blog Page
/* ==========================================================================*/
// Purpose: Blog page with animated hero header and articles section
// Sections: Imports, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React from "react";

// Local Components ---
import { ContentHeader } from "@/components/resources/content-header";
import { ArticlesSection } from "@/components/blog/articles-section";

// Local Utils ---
import { getPosts } from "@/lib/mdx-utils";

// Local Constants ---
import { blogConstants } from "@/constants2";

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * BlogPage
 *
 * Blog page featuring the animated Astral hero header and articles section.
 */
async function BlogPage() {
  // Fetch posts server-side
  const posts = await getPosts();
  
  // Split posts into featured (first 3) and more articles (rest)
  const featuredPosts = posts.slice(0, 3);
  const morePosts = posts.slice(3);

  return (
    <main>
      <ContentHeader 
        title={blogConstants.page.title} 
        subtitle={blogConstants.page.subtitle} 
      />
      
      <div className="max-w-5xl mx-auto px-6 py-16 pb-32">
        <ArticlesSection 
          featuredPosts={featuredPosts}
          morePosts={morePosts}
        />
      </div>
    </main>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export default BlogPage;
