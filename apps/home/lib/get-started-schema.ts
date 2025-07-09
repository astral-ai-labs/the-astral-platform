/* ==========================================================================*/
// get-started-schema.ts — Form validation schema and types
/* ==========================================================================*/
// Purpose: Shared types and validation schema for get-started form
// Sections: Imports, Types, Validation, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// External Packages ---
import { z } from "zod";

/* ==========================================================================*/
// Types
/* ==========================================================================*/

export interface FormState {
  success: boolean;
  message?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    linkedin?: string[];
    message?: string[];
    _form?: string[];
  };
}

/* ==========================================================================*/
// Validation Schema
/* ==========================================================================*/

export const getStartedSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .refine((email: string) => email.includes("@"), "Please enter a valid work email"),
  linkedin: z
    .string()
    .optional()
    .refine(
      (url: string | undefined) => !url || url.includes("linkedin.com") || url.startsWith("https://"),
      "Please enter a valid LinkedIn URL"
    ),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
}); 