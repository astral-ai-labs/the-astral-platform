/* ==========================================================================*/
// utils.ts — Date formatting utilities for the platform
/* ==========================================================================*/
// Purpose: Handle date formatting with relative time for recent dates, absolute for older ones
// Sections: Imports, Helpers, Public API Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// External Packages ----
import { cn } from "@workspace/ui/lib/utils";

/* ==========================================================================*/
// Date Formatting Helpers
/* ==========================================================================*/

/**
 * formatRelativeTime - Format date as relative time or absolute date
 * 
 * Shows relative time (e.g., "2 days ago") for recent dates,
 * and absolute dates (e.g., "Dec 15, 2023") for dates older than 1 week.
 * 
 * @param dateString - ISO date string from database
 * @returns Formatted date string
 * 
 * @example
 * formatRelativeTime("2024-01-15T10:30:00Z") // "2 days ago"
 * formatRelativeTime("2023-12-01T10:30:00Z") // "Dec 1, 2023"
 */
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  // Convert to different time units
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  
  // If older than 1 week, show absolute date
  if (diffInWeeks > 1) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  
  // Show relative time for recent dates
  if (diffInWeeks === 1) {
    return "1 week ago";
  }
  
  if (diffInDays >= 1) {
    return diffInDays === 1 ? "Yesterday" : `${diffInDays} days ago`;
  }
  
  if (diffInHours >= 1) {
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  }
  
  if (diffInMinutes >= 1) {
    return diffInMinutes === 1 ? "1 minute ago" : `${diffInMinutes} minutes ago`;
  }
  
  return "Just now";
}

/**
 * formatShortRelativeTime - Format date as short relative time
 * 
 * Compact version for space-constrained UI elements.
 * 
 * @param dateString - ISO date string from database
 * @returns Short formatted date string
 * 
 * @example
 * formatShortRelativeTime("2024-01-15T10:30:00Z") // "2d"
 * formatShortRelativeTime("2023-12-01T10:30:00Z") // "Dec 1"
 */
function formatShortRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  
  // If older than 1 week, show short absolute date
  if (diffInWeeks > 1) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
  
  // Show short relative time for recent dates
  if (diffInWeeks === 1) {
    return "1w";
  }
  
  if (diffInDays >= 1) {
    return `${diffInDays}d`;
  }
  
  if (diffInHours >= 1) {
    return `${diffInHours}h`;
  }
  
  if (diffInMinutes >= 1) {
    return `${diffInMinutes}m`;
  }
  
  return "now";
}

/**
 * formatFullDateTime - Format full date and time
 *
 * @param dateString - ISO date string from database
 * @returns Full formatted date and time
 *
 * @example
 * formatFullDateTime("2024-01-15T10:30:00Z") // "January 15, 2024 at 10:30 AM"
 */
function formatFullDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/* ==========================================================================*/
// Public API Exports
/* ==========================================================================*/

export { cn, formatRelativeTime, formatShortRelativeTime, formatFullDateTime };
