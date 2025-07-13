/* ==========================================================================*/
// billing.client.tsx — Main billing client component with tabbed interface
/* ==========================================================================*/
// Purpose: Renders billing tabs with overview and billing history
// Sections: Imports, Animation Variants, Types, Sample Data, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React, { useState } from "react";

// External Packages ---
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { motion, easeInOut } from "motion/react";

// Local Modules ---
import { OrganizationPaymentMethodsContent } from "@/components/billing/payment-methods";
import { OrganizationOverviewContent } from "@/components/billing/overview";
import { OrganizationBillingHistoryContent } from "@/components/billing/history";
import { cn } from "@/lib/utils";

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const HOVER_ANIMATION_PROPS = {
  whileHover: { scale: 1.015 },
  whileTap: { scale: 0.985 },
  transition: { duration: 0.1, ease: easeInOut },
};

const CONTENT_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const CONTENT_ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easeInOut,
    },
  },
};

const TAB_TRIGGER_VARIANTS = {
  hidden: {
    opacity: 0,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: easeInOut,
    },
  },
};

/* ==========================================================================*/
// Types and Interfaces
/* ==========================================================================*/

interface OrganizationBillingClientProps {
  creditBalance: number;
  autoRechargeMessage: string;
}

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  isDefault?: boolean;
}

interface BillingHistoryItem {
  id: string;
  status: string;
  amount: number;
  currency: string;
  createdAt: string;
}

/* ==========================================================================*/
// Sample Data
/* ==========================================================================*/

const EXAMPLE_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "1",
    brand: "Visa",
    last4: "1234",
    exp_month: 1,
    exp_year: 2025,
    isDefault: true,
  },
  {
    id: "2",
    brand: "Mastercard",
    last4: "5678",
    exp_month: 12,
    exp_year: 2026,
  },
  {
    id: "3",
    brand: "American Express",
    last4: "9012",
    exp_month: 3,
    exp_year: 2027,
  },
  {
    id: "4",
    brand: "Discover",
    last4: "3456",
    exp_month: 4,
    exp_year: 2028,
  },
  {
    id: "5",
    brand: "JCB",
    last4: "7890",
    exp_month: 5,
    exp_year: 2029,
  },
];

const EXAMPLE_BILLING_HISTORY: BillingHistoryItem[] = [
  {
    id: "BEED223E-0001",
    status: "Paid",
    amount: 10.81,
    currency: "USD",
    createdAt: "Mar 26, 2025, 8:21 PM",
  },
  {
    id: "BEED223E-0002",
    status: "Paid",
    amount: 25.00,
    currency: "USD",
    createdAt: "Feb 15, 2025, 3:45 PM",
  },
  {
    id: "BEED223E-0003",
    status: "Processing",
    amount: 15.50,
    currency: "USD",
    createdAt: "Jan 05, 2025, 11:30 AM",
  },
];

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * OrganizationBillingClient
 *
 * Main billing interface with tabbed navigation for overview and billing history.
 * Features animated tab transitions and hover effects.
 *
 * @param creditBalance - Current credit balance to display
 * @param autoRechargeMessage - Message about auto-recharge status
 */
function OrganizationBillingClient({ creditBalance, autoRechargeMessage }: OrganizationBillingClientProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "billing-history", label: "Billing history" },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full h-full overflow-hidden">
      {/* Start of Tab Navigation --- */}
      <div className="w-full border-b border-border">
        <div className="px-2">
          <motion.div
            variants={CONTENT_CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <TabsList className="rounded-none justify-start p-0 bg-transparent w-fit min-h-10 !text-xs">
              {/* Tab Triggers */}
              {tabs.map((tab, index) => (
                <motion.div
                  key={tab.value}
                  variants={TAB_TRIGGER_VARIANTS}
                  {...HOVER_ANIMATION_PROPS}
                  className="relative z-10"
                >
                  <TabsTrigger 
                    value={tab.value}
                    className={cn(
                      "relative text-[13px] !data-[state=inactive]:text-muted-foreground !data-[state=active]:text-foreground",
                      "cursor-pointer rounded-none border-none !bg-transparent shadow-none px-4 py-2 h-10",
                      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px]",
                      "data-[state=active]:after:bg-white data-[state=inactive]:after:bg-transparent",
                      "data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground"
                    )}
                  >
                    {tab.label}
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </motion.div>
        </div>
      </div>
      {/* End of Tab Navigation ---- */}

      {/* Start of Tab Content --- */}
      <div className="w-full h-full overflow-y-auto">
        <TabsContent value="overview" className="py-12">
          <motion.div
            variants={CONTENT_CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={CONTENT_ITEM_VARIANTS}>
              <OrganizationOverviewContent 
                creditBalance={creditBalance} 
                autoRechargeMessage={autoRechargeMessage} 
              />
            </motion.div>
            <motion.div variants={CONTENT_ITEM_VARIANTS}>
              <OrganizationPaymentMethodsContent paymentMethods={EXAMPLE_PAYMENT_METHODS} />
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="billing-history" className="pt-12 pb-12 space-y-6">
          <motion.div
            variants={CONTENT_CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={CONTENT_ITEM_VARIANTS}>
              <OrganizationBillingHistoryContent billingHistory={EXAMPLE_BILLING_HISTORY} />
            </motion.div>
          </motion.div>
        </TabsContent>

        <motion.div
          variants={CONTENT_CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
        >

        </motion.div>
      </div>
      {/* End of Tab Content ---- */}
    </Tabs>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export default OrganizationBillingClient;
