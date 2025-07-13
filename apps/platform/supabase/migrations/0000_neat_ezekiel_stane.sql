CREATE TYPE "public"."mcp_auth_status" AS ENUM('ok', 'needs_reauth', 'error');--> statement-breakpoint
CREATE TYPE "public"."plan_tier" AS ENUM('free', 'professional', 'startup', 'enterprise');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" text,
	"last_name" text,
	"avatar_url" text,
	"is_verified" boolean DEFAULT false NOT NULL,
	"plan_tier" "plan_tier" DEFAULT 'free' NOT NULL,
	"credit_balance" numeric(12, 2) DEFAULT '0' NOT NULL,
	"credit_balance_updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"credit_auto_refill_enabled" boolean DEFAULT false NOT NULL,
	"credit_auto_refill_amount" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"deleted_at" timestamp with time zone,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chk_credit_balance_positive" CHECK (credit_balance >= 0),
	CONSTRAINT "chk_soft_delete_consistency" CHECK (
        CASE 
          WHEN deleted_at IS NOT NULL 
          THEN is_active = false 
          ELSE true 
        END
      )
);
--> statement-breakpoint
CREATE UNIQUE INDEX "ux_users_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_users_tier" ON "users" USING btree ("plan_tier");--> statement-breakpoint
CREATE INDEX "idx_users_active" ON "users" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_users_deleted" ON "users" USING btree ("deleted_at");