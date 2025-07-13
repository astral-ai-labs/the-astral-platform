/* ==========================================================================*/
// page.tsx — Billing page for organization subscription management
/* ==========================================================================*/
// Purpose: Renders the billing interface with credit balance and auto-recharge settings
// Sections: Imports, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React from "react";

// Local Components ---
import OrganizationBillingClient from "@/components/billing/billing.client";
import { BillingHeader } from "@/components/billing/billing-header";

/* ==========================================================================*/
// Page Component
/* ==========================================================================*/

/**
 * BillingPage
 *
 * Renders the organization billing management interface with header and billing client.
 * Displays credit balance, auto-recharge settings, and billing controls.
 */
function BillingPage() {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      <BillingHeader />
      <div className="flex-1 overflow-auto">
        <OrganizationBillingClient 
          creditBalance={25.50} 
          autoRechargeMessage="Auto-recharge is enabled when balance falls below $10.00" 
        />
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export default BillingPage;
