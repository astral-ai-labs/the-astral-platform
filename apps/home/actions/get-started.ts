/* ==========================================================================*/
// get-started.ts — Server action for get-started form submission
/* ==========================================================================*/
// Purpose: Handle form submission with validation and third-party integration
// Sections: Imports, Server Action

"use server";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// External Packages ---
import { z } from "zod";

// Local Files ---
import { FormState, getStartedSchema } from "../lib/get-started-schema";

/* ==========================================================================*/
// Server Action
/* ==========================================================================*/

/**
 * submitGetStartedForm
 *
 * Validates and submits the get-started form to Formspree.
 * Returns success/error states for form handling.
 *
 * @param prevState - Previous form state
 * @param formData - Form data from the submission
 * @returns Promise<FormState> - Success/error state with messages
 */
export async function submitGetStartedForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Extract form data
    const rawFormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      linkedin: formData.get("linkedin") as string,
      message: formData.get("message") as string,
    };

    // Validate form data
    const validatedData = getStartedSchema.parse(rawFormData);

    // Submit to Formspree
    const response = await fetch("https://formspree.io/f/mzzglkab", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        linkedin: validatedData.linkedin || "",
        message: validatedData.message,
        _subject: `New Partnership Inquiry from ${validatedData.firstName} ${validatedData.lastName}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Formspree submission failed: ${response.status}`);
    }

    // Return success state
    return {
      success: true,
      message: "Thank you for your interest! We'll be in touch soon.",
    };
  } catch (error: unknown) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const errors: FormState["errors"] = {};
      const zodError = error as z.ZodError;
      
      zodError.errors.forEach((err: z.ZodIssue) => {
        if (err.path[0]) {
          const field = err.path[0] as keyof NonNullable<FormState["errors"]>;
          if (!errors[field]) {
            errors[field] = [];
          }
          errors[field]?.push(err.message);
        }
      });

      return {
        success: false,
        errors,
      };
    }

    // Handle submission errors
    console.error("Form submission error:", error);
    return {
      success: false,
      errors: {
        _form: ["Something went wrong. Please try again."],
      },
    };
  }
}
