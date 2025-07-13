/* ==========================================================================*/
// schema.ts — Database schema definitions using Drizzle ORM
/* ==========================================================================*/
// Purpose: Define PostgreSQL table schemas, enums, and constraints
// Sections: Imports, Enums, Tables, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// External Packages ---
import { sql } from "drizzle-orm";
import { pgEnum, pgTable, uuid, varchar, text, timestamp, boolean, integer, decimal, jsonb, check, uniqueIndex, index } from "drizzle-orm/pg-core";

/* ==========================================================================*/
// Enums
/* ==========================================================================*/

const planTierEnum = pgEnum("plan_tier", ["free", "professional", "startup", "enterprise"]);
const mcpAuthStatusEnum = pgEnum("mcp_auth_status", ["ok", "needs_reauth", "error"]);

/* ==========================================================================*/
// Tables
/* ==========================================================================*/

/**
 * profiles 
 *
 * Main user table - one row per person with identity, plan, and status information.
 */
const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    /* identity --------------- */
    email: varchar("email", { length: 255 }).notNull(),
    first_name: text("first_name"),
    last_name: text("last_name"),
    avatar_url: text("avatar_url"),

    /* plan + credits --------- */
    plan_tier: planTierEnum("plan_tier").notNull().default("free"),
    credit_balance: decimal("credit_balance", { precision: 12, scale: 2 }).notNull().default("0"),
    credit_balance_updated_at: timestamp("credit_balance_updated_at", { withTimezone: true }).notNull().defaultNow(),
    credit_auto_refill_enabled: boolean("credit_auto_refill_enabled").notNull().default(false),
    credit_auto_refill_amount: integer("credit_auto_refill_amount").notNull().default(0),

    /* user status ------------ */
    is_verified: boolean("is_verified").notNull().default(false),
    is_active: boolean("is_active").notNull().default(true),
    deleted_at: timestamp("deleted_at", { withTimezone: true }),
    last_login_at: timestamp("last_login_at", { withTimezone: true }),

    /* timestamps ------------- */
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("ux_profiles_email").on(t.email),
    index("idx_profiles_tier").on(t.plan_tier),
    index("idx_profiles_active").on(t.is_active),
    index("idx_profiles_deleted").on(t.deleted_at),

    // Constraints
    check("chk_credit_balance_positive", sql`credit_balance >= 0`),
  ]
);

/**
 * mcpServers
 *
 * MCP server catalog with stable human-readable primary keys.
 */
const mcpServers = pgTable(
  "mcp_servers",
  {
    id: varchar("id", { length: 60 }).primaryKey(), // e.g. "gmail", "google_calendar"
    description: text("description"),
    tools: jsonb("tools").notNull().default("[]"), // structured list of available tools
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // Constraints
    check("chk_mcp_server_id_format", sql`id ~ '^[a-z0-9_]+$'`),
  ]
);

/**
 * userMcpConnections
 *
 * Junction table linking profiles to MCP server connections.
 */
const userMcpConnections = pgTable(
  "user_mcp_connections",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    /* owner & target ---------- */
    profile_id: uuid("profile_id").references(() => profiles.id, { onDelete: "cascade" }).notNull(),
    mcp_server_id: varchar("mcp_server_id", { length: 60 })
      .references(() => mcpServers.id, { onDelete: "cascade" })
      .notNull(),

    /* connection vs auth ------ */
    is_connected: boolean("is_connected").notNull().default(true),          // user's intent
    auth_status: mcpAuthStatusEnum("auth_status").notNull().default("ok"),  // token health

    instance_id: varchar("instance_id", { length: 255 }),                  // nullable
    authenticated_email: varchar("authenticated_email", { length: 255 }),  // nullable
    last_synced_at: timestamp("last_synced_at", { withTimezone: true }),

    /* timestamps -------------- */
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("ux_profile_conn_unique").on(t.profile_id, t.mcp_server_id),
    index("idx_profile_conn_server").on(t.mcp_server_id),
    index("idx_profile_conn_auth_status").on(t.auth_status),
  ]
);

/**
 * workflows
 *
 * Workflow table - light stub with heavy DAG stored in MongoDB.
 */
const workflows = pgTable(
  "workflows",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    /* ownership (user) -------- */
    profile_id: uuid("profile_id").references(() => profiles.id, { onDelete: "set null" }),

    name: varchar("name", { length: 100 }).notNull(),

    /* optional: targeted MCP server */
    mcp_server_id: varchar("mcp_server_id", { length: 60 })
      .references(() => mcpServers.id, { onDelete: "set null" }),

    metadata: jsonb("metadata").notNull().default("{}"),

    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("ux_workflow_profile_name").on(t.profile_id, t.name),
    index("idx_workflows_server").on(t.mcp_server_id),
  ]
);

/* ==========================================================================*/
// Inferred Types
/* ==========================================================================*/

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

export type McpServer = typeof mcpServers.$inferSelect;
export type NewMcpServer = typeof mcpServers.$inferInsert;

export type UserMcpConnection = typeof userMcpConnections.$inferSelect;
export type NewUserMcpConnection = typeof userMcpConnections.$inferInsert;

export type Workflow = typeof workflows.$inferSelect;
export type NewWorkflow = typeof workflows.$inferInsert;

/* Enum helper types */
export type PlanTier = (typeof planTierEnum.enumValues)[number];
export type McpAuthStatus = (typeof mcpAuthStatusEnum.enumValues)[number];

/* ==========================================================================*/
// Public API Exports
/* ==========================================================================*/

export { 
  planTierEnum, 
  mcpAuthStatusEnum, 
  profiles, 
  mcpServers, 
  userMcpConnections, 
  workflows 
};