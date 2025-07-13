/* ==========================================================================*/
// history.tsx — Billing history component with invoice table
/* ==========================================================================*/
// Purpose: Displays billing history with invoice table and empty state
// Sections: Imports, Animation Variants, Types, Helpers, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React from "react";

// External Packages ---
import { History } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const HISTORY_ANIMATION_VARIANTS = {
  tableRow: {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 350,
        damping: 25,
      },
    },
    exit: { opacity: 0, y: -10 },
  },
};

/* ==========================================================================*/
// Types and Interfaces
/* ==========================================================================*/

interface BillingHistoryItem {
  id: string;
  status: string;
  amount: number;
  currency: string;
  createdAt: string;
}

interface OrganizationBillingHistoryContentProps {
  billingHistory?: BillingHistoryItem[];
}

/* ==========================================================================*/
// Helpers
/* ==========================================================================*/

/**
 * formatCurrency
 *
 * Formats currency amount with proper locale and currency symbol.
 *
 * @param amount - The amount to format
 * @param currency - The currency code (e.g., 'USD')
 * @returns Formatted currency string
 */
function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  }).format(amount);
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * OrganizationBillingHistoryContent
 *
 * Displays billing history with invoice table or empty state.
 *
 * @param billingHistory - Array of billing history items to display
 */
function OrganizationBillingHistoryContent({ billingHistory = [] }: OrganizationBillingHistoryContentProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-medium">Billing history</h2>
          <p className="text-muted-foreground">View your past and current invoices.</p>
          
          <div className="mt-6">
            {billingHistory.length > 0 ? (
              /* Start of Invoice Table --- */
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="px-6 py-4 text-sm text-muted-foreground bg-muted/30">
                  <p>Showing invoices within the past 12 months</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-background">
                        <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground">
                          INVOICE
                        </th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground">
                          STATUS
                        </th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground">
                          AMOUNT
                        </th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground">
                          CREATED
                        </th>
                        <th className="text-right py-3 px-6"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {billingHistory.map((invoice, index) => (
                          <motion.tr
                            key={invoice.id}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={HISTORY_ANIMATION_VARIANTS.tableRow}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-border"
                          >
                            <td className="py-4 px-6 font-mono text-sm">{invoice.id}</td>
                            <td className="py-4 px-6">
                              <Badge 
                                variant={invoice.status.toLowerCase() === 'paid' ? 'secondary' : 'outline'}
                                className={cn(
                                  "text-xs px-2.5 py-0.5 font-mono",
                                  invoice.status.toLowerCase() === 'paid' 
                                    ? 'bg-green-500/20 hover:bg-green-500/20 text-green-400 border-green-700/30' 
                                    : ''
                                )}
                              >
                                {invoice.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-6 font-mono text-sm">
                              {formatCurrency(invoice.amount, invoice.currency)}
                            </td>
                            <td className="py-4 px-6 text-sm">{invoice.createdAt}</td>
                            <td className="py-4 px-6 text-right">
                              <Button variant="link" className="h-8 text-sm text-white font-mono">
                                View
                              </Button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
              /* End of Invoice Table ---- */
            ) : (
              /* Start of Empty State --- */
              <div className="border border-border rounded-lg p-12 flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <History className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No billing history</h3>
                <p className="text-sm text-muted-foreground max-w-md mt-2">
                  Your billing history will appear here once you&apos;ve made your first payment or recharged your credits.
                </p>
              </div>
              /* End of Empty State ---- */
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { OrganizationBillingHistoryContent }; 