/* ==========================================================================*/
// articles-section.tsx — Articles display section with featured cards and list
/* ==========================================================================*/
// Purpose: Display featured articles in cards and additional articles in a list
// Sections: Imports, Animation Variants, Types, Components, Main Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React, { useState, useRef, useEffect } from "react";

// External Packages ---
import { ArrowRight } from "lucide-react";
import { motion, easeInOut, useReducedMotion } from "motion/react";
import Link from "next/link";

// Local Components ---
import { TextScramble } from "../motion-primitives/text-scramble";

/* ==========================================================================*/
// Types
/* ==========================================================================*/

interface Post {
  uid: string;
  title: string;
  description: string;
  link: string;
}

interface ArticleWithDate {
  uid: string;
  title: string;
  date: string;
  link: string;
}

interface ArticlesSectionProps {
  featuredPosts: Post[];
  morePosts: Post[];
  className?: string;
}

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const FEATURED_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const FEATURED_CARD_VARIANTS = {
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
      duration: 0.6,
      ease: easeInOut,
    },
  },
};

const WRITINGS_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const WRITING_ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: easeInOut,
    },
  },
};

/* ==========================================================================*/
// Helper Functions
/* ==========================================================================*/

// Generate a sample date (you can customize this)
function generateDate(index: number): string {
  const dates = [
    "November 15, 2024",
    "November 11, 2024", 
    "May 23, 2024",
    "March 28, 2024",
    "March 27, 2024",
    "February 28, 2024"
  ];
  return dates[index % dates.length] || "January 1, 2024";
}

/* ==========================================================================*/
// Dummy Data
/* ==========================================================================*/

const DUMMY_ARTICLES: ArticleWithDate[] = [
  {
    uid: "scale-linear-migration",
    title: "Why and how Scale migrated to Linear",
    date: "November 15, 2024",
    link: "/blog/scale-linear-migration"
  },
  {
    uid: "pleo-linear-asks", 
    title: "Simplifying support at scale: How Pleo uses Linear Asks",
    date: "November 11, 2024",
    link: "/blog/pleo-linear-asks"
  },
  {
    uid: "multi-region-support",
    title: "How we built multi-region support for Linear",
    date: "May 23, 2024",
    link: "/blog/multi-region-support"
  },
  {
    uid: "linear-ui-redesign-part-2",
    title: "How we redesigned the Linear UI (part II)",
    date: "March 28, 2024",
    link: "/blog/linear-ui-redesign-part-2"
  },
  {
    uid: "design-reset-part-1",
    title: "A design reset (part I)",
    date: "March 27, 2024",
    link: "/blog/design-reset-part-1"
  },
  {
    uid: "startup-mvp-competitive-product",
    title: "Rethinking the startup MVP: Building a competitive product",
    date: "February 28, 2024",
    link: "/blog/startup-mvp-competitive-product"
  }
];

/* ==========================================================================*/
// Components
/* ==========================================================================*/

/**
 * FeaturedArticleCard
 *
 * Individual featured article card with text scramble effect and navbar-style arrow animation.
 */
function FeaturedArticleCard({ 
  title, 
  link
}: {
  title: string;
  link: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div variants={FEATURED_CARD_VARIANTS}>
      <Link href={link} className="block">
        <div 
          className="group relative flex-shrink-0 w-80 h-64 bg-background hover:bg-accent border border-border rounded-lg p-6 cursor-pointer overflow-hidden transition-all duration-200"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Title - Top Left with Text Scramble */}
          <div className="absolute top-4 left-4 max-w-56">
            <TextScramble
              className="text-base font-medium text-foreground leading-tight"
              trigger={isHovered}
              duration={0.6}
              speed={0.03}
            >
              {title}
            </TextScramble>
          </div>

          {/* Read More - Bottom Right with navbar-style arrow */}
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center gap-1 text-sm leading-none font-medium group-hover:scale-[1.01] transition-transform duration-100 ease-in-out origin-right">
              <span className="text-xs text-muted-foreground group-hover:underline transition-all duration-150">
                Read more
              </span>
              {!shouldReduceMotion && (
                <div className="w-4 flex justify-center">
                  <div className="origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-100 ease-in-out">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * ArticleListItem
 *
 * Individual article item in the "Our other writings" section.
 */
function ArticleListItem({ 
  title, 
  date, 
  link,
  itemRef
}: {
  title: string;
  date: string;
  link: string;
  itemRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.div
      variants={WRITING_ITEM_VARIANTS}
      ref={itemRef}
      className="py-4 px-4 rounded-lg cursor-pointer relative z-10 transition-all duration-200"
    >
      <Link href={link} className="block">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-sm font-medium text-foreground line-clamp-1">{title}</h3>
          <span className="text-xs text-muted-foreground mt-1 md:mt-0 md:ml-4 md:flex-shrink-0">{date}</span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ==========================================================================*/
// Main Component
/* ==========================================================================*/

/**
 * ArticlesSection
 *
 * Complete articles section with featured cards and additional articles list.
 */
function ArticlesSection({ featuredPosts, morePosts, className }: ArticlesSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Convert morePosts to include generated dates
  const morePostsWithDates: ArticleWithDate[] = morePosts.map((post, index) => ({
    uid: post.uid,
    title: post.title,
    date: generateDate(index),
    link: post.link
  }));

  // Combine actual posts with dummy articles for testing
  const allArticles = [...morePostsWithDates, ...DUMMY_ARTICLES];

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = itemRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetTop, offsetHeight } = hoveredElement;
        setHoverStyle({
          top: `${offsetTop}px`,
          height: `${offsetHeight}px`,
        });
      }
    }
  }, [hoveredIndex]);

  return (
    <div className={`relative ${className || ""}`}>
      {/* Featured Articles - Horizontal Scroll with Entrance Animation */}
      <motion.div 
        className="mb-16"
        variants={FEATURED_CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
      >
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {featuredPosts.map((post) => (
            <FeaturedArticleCard
              key={post.uid}
              title={post.title}
              link={post.link}
            />
          ))}
        </div>
      </motion.div>

      {/* Our Other Writings Section with Scroll-triggered Staggered Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={WRITINGS_CONTAINER_VARIANTS}
      >
        <motion.div 
          className="mb-6"
          variants={WRITING_ITEM_VARIANTS}
        >
          <h2 className="text-sm text-muted-foreground mb-2">
            Our other writings
          </h2>
          <div className="w-full border-b-2 border-muted-foreground"></div>
        </motion.div>
        
        {/* Articles List with Hover Effect */}
        <div className="relative">
          {/* Hover Highlight Background */}
          <div
            className="absolute left-0 right-0 transition-all duration-300 ease-out bg-muted/30 dark:bg-muted/20 rounded-lg"
            style={{
              ...hoverStyle,
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          />
          
          {/* Articles */}
          <div className="relative">
            {allArticles.map((article, index) => (
              <div
                key={article.uid || index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <ArticleListItem
                  title={article.title}
                  date={article.date}
                  link={article.link}
                  itemRef={(el) => (itemRefs.current[index] = el)}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/

export { ArticlesSection }; 