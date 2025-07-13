/* ==========================================================================*/
// index.ts — Database connection and Drizzle ORM setup
/* ==========================================================================*/
// Purpose: Initialize PostgreSQL connection and Drizzle ORM client
// Sections: Imports, Configuration, Database Setup, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// External Packages ---
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

/* ==========================================================================*/
// Configuration
/* ==========================================================================*/

config({ path: ".env.local" }); // or .env.local

/* ==========================================================================*/
// Database Setup
/* ==========================================================================*/

const client = postgres(process.env.DATABASE_URL!);

/**
 * db
 *
 * Drizzle ORM database client instance.
 */
const db = drizzle({ client });

/* ==========================================================================*/
// Public API Exports
/* ==========================================================================*/

export { db };
