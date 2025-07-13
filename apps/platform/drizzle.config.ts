/* ==========================================================================*/
// drizzle.config.ts — Drizzle Kit configuration for database migrations
/* ==========================================================================*/
// Purpose: Configure Drizzle Kit for PostgreSQL schema and migrations
// Sections: Imports, Configuration, Database Config, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// External Packages ---
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

/* ==========================================================================*/
// Configuration
/* ==========================================================================*/

config({ path: ".env.local" });

/* ==========================================================================*/
// Database Configuration
/* ==========================================================================*/

/**
 * drizzleConfig
 *
 * Drizzle Kit configuration object for database schema and migrations.
 */
const drizzleConfig = defineConfig({
  schema: "./db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

/* ==========================================================================*/
// Public API Exports
/* ==========================================================================*/

export default drizzleConfig;
