/* ==========================================================================*/
// metadata.ts — Astral application metadata constants
/* ==========================================================================*/
// Purpose: Defines SEO and metadata constants for the Astral application
// Sections: Imports, Constants, Metadata Object, Exports

// import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

/* ==========================================================================*/
// Constants
/* ==========================================================================*/
const TITLE = "astral";
const DESCRIPTION = "astral is your company's operating system for the AI era.";
const BASE_URL = "https://useastral.dev";
const SITE_NAME = "astral";

// const OPEN_GRAPH_IMAGES = [
//   {
//     url: "open-graph-image.png",
//     width: 1200,
//     height: 630,
//     alt: "Astral AI",
//   },
// ];

// Twitter
// const TWITTER_METADATA: Twitter = {
//   card: "summary_large_image",
//   title: TITLE,
//   description: DESCRIPTION,
//   images: OPEN_GRAPH_IMAGES,
//   site: "@astralai",
//   creator: "@astralai",
// };

/* ==========================================================================*/
// Metadata Object
/* ==========================================================================*/
/**
 * Application metadata configuration for Astral
 */
const AstralMetadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: "Chris Maresca" }],
  applicationName: SITE_NAME,
  keywords: ["artificial intelligence", "open source", "ai", "llm", "llm framework", "llm providers", "llm provider", "llm provider framework", "llm provider framework open source", "llm provider framework open source ai", "open ai", "gemini", "anthropic", "hugging face", "ai framework", "ai providers", "ai provider framework", "open source ai", "open source ai framework", "open source llm", "open source llm framework", "open source llm providers", "open source llm provider framework"],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    countryName: "United States",
  },
  // twitter: TWITTER_METADATA,
};

/* ==========================================================================*/
// Exports
/* ==========================================================================*/
export { AstralMetadata };
