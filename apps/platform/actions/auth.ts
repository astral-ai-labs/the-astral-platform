/* ==========================================================================*/
// auth.ts — Next.js server actions for authentication
/* ==========================================================================*/
// Purpose: Handle login and signup operations using Supabase
// Sections: Imports, Functions, Exports

"use server";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// Next.js Core ---
import { revalidatePath } from "next/cache";

// Local Files ---
import { createClient } from "@/db/supabase/server";
import { getProfileByEmail, createProfile } from "@/db/dal";

/* ==========================================================================*/
// Authentication Functions
/* ==========================================================================*/

/**
 * sendOtpCode
 *
 * Send OTP code to user's email address.
 *
 * @param formData - Form data containing email
 */
async function sendOtpCode(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.error("Failed to send OTP:", error, error.message);

    // Check for rate limiting error
    if (error.code === "over_email_send_rate_limit") {
      return { success: false, error: "Try again in 60 seconds" };
    }

    return { success: false, error: error.message };
  }

  // Success - user should check their email
  return { success: true, data };
}

/**
 * verifyOtpCode
 *
 * Verify OTP code and create user session.
 *
 * @param formData - Form data containing email and OTP token
 * @returns Object with success status and error message if any
 */
async function verifyOtpCode(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const token = formData.get("token") as string;

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Create profile if user doesn't exist in database
  if (session?.user) {
    const existingProfile = await getProfileByEmail(email);

    if (!existingProfile) {
      await createProfile({
        id: session.user.id,
        email: session.user.email!,
        first_name: session.user.user_metadata?.first_name || null,
        last_name: session.user.user_metadata?.last_name || null,
        avatar_url: session.user.user_metadata?.avatar_url || null,
        is_verified: true,
        last_login_at: new Date(session.user.last_sign_in_at || new Date()),
      });
    }
  }

  revalidatePath("/", "layout");
  return { success: true };
}

/* ==========================================================================*/
// Public API Exports
/* ==========================================================================*/

export { sendOtpCode, verifyOtpCode };
