/* ==========================================================================*/
// dal.ts — Data Access Layer for user profile operations
/* ==========================================================================*/
// Purpose: Simple database operations for user profiles
// Sections: Imports, Types, Profile Operations, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// Core Modules ---
import { eq } from "drizzle-orm";

// Local Files ---
import { db } from "./index";
import { profiles, type Profile, type NewProfile } from "./schema";

/* ==========================================================================*/
// Profile Operations
/* ==========================================================================*/

/**
 * createProfile
 *
 * Creates a new user profile.
 */
async function createProfile(input: NewProfile): Promise<Profile | null> {
  const profile = await db
    .insert(profiles)
    .values({
      ...(input.id && { id: input.id }),
      email: input.email,
      first_name: input.first_name || null,
      last_name: input.last_name || null,
      avatar_url: input.avatar_url || null,
      last_login_at: input.last_login_at || null,
      is_verified: input.is_verified || false,
    })
    .returning();

  return profile[0] ?? null;
}

/**
 * getProfileById
 *
 * Gets a user profile by ID.
 */
async function getProfileById(id: string): Promise<Profile | null> {
  const result = await db.select().from(profiles).where(eq(profiles.id, id)).limit(1);

  return result[0] ?? null;
}

/**
 * getProfileByEmail
 *
 * Gets a user profile by email.
 */
async function getProfileByEmail(email: string): Promise<Profile | null> {
  const result = await db.select().from(profiles).where(eq(profiles.email, email)).limit(1);

  return result[0] ?? null;
}

/* ==========================================================================*/
// Public API Exports
/* ==========================================================================*/

export { createProfile, getProfileById, getProfileByEmail };
