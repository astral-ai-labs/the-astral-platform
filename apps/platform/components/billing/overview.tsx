/* ==========================================================================*/
// overview.tsx — Billing overview component with credit balance and auto-recharge
/* ==========================================================================*/
// Purpose: Displays credit balance, auto-recharge settings, and billing overview
// Sections: Imports, Animation Variants, Constants, Types, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import React from "react";

// External Packages ---
import { InfoIcon } from "lucide-react";
import { motion } from "motion/react";

// Local Modules ---
import OrganizationBillingAddMoneyDialog from "@/components/billing/add-money";
import OrganizationEnableRecharge from "@/components/billing/recharge";

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const OVERVIEW_ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  leftSection: {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        delay: 0.1,
      },
    },
  },
  rightSection: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        delay: 0.35,
      },
    },
  },
  title: {
    hidden: { opacity: 0, x: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { delay: 0.15 },
    },
  },
  balanceSection: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.25 },
    },
  },
  balanceAmount: {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 20,
        delay: 0.3,
      },
    },
  },
  addButton: {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.4 },
    },
  },
  autoRechargeTitle: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.4 },
    },
  },
  autoRechargeMessage: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.45 },
    },
  },
  autoRechargeButton: {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.5 },
    },
  },
};

/* ==========================================================================*/
// Constants
/* ==========================================================================*/

const ORGANIZATION_OVERVIEW_CONTENT_CONSTANTS = {
  sectionTitle: "Automate your work",
  creditBalance: "Credit balance",
  autoRechargeMessage: "Auto recharge is off. You can enable it in the payment methods section.",
  addCreditBalanceButton: "Add credit",
  enableAutoRechargeButton: "Enable auto recharge",
  autoRechargeSettings: "Auto recharge settings",
  autoRechargeQuestion: "Would you like to set up automatic recharge?",
  autoRechargeYes: "Yes, automatically recharge my card when my credit balance falls below a threshold",
};

/* ==========================================================================*/
// Types and Interfaces
/* ==========================================================================*/

interface OrganizationOverviewContentProps {
  creditBalance: number;
  autoRechargeMessage: string;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * OrganizationOverviewContent
 *
 * Billing overview component displaying credit balance and auto-recharge options.
 *
 * @param creditBalance - Current credit balance to display
 * @param autoRechargeMessage - Message about auto-recharge status
 */
function OrganizationOverviewContent({ creditBalance, autoRechargeMessage }: OrganizationOverviewContentProps) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={OVERVIEW_ANIMATION_VARIANTS.container}
      transition={{ duration: 0.2 }}
      className="space-y-4 max-w-4xl mx-auto"
    >
      <div className="flex p-5 bg-transparent !font-mono">
        {/* Start of Left Section --- */}
        <motion.div
          variants={OVERVIEW_ANIMATION_VARIANTS.leftSection}
          className="flex flex-col justify-center space-x-16 space-y-4 mx-auto"
        >
          <motion.h2 
            variants={OVERVIEW_ANIMATION_VARIANTS.title}
            className="font-medium w-fit"
          >
            {ORGANIZATION_OVERVIEW_CONTENT_CONSTANTS.sectionTitle}
          </motion.h2>

          <motion.div 
            variants={OVERVIEW_ANIMATION_VARIANTS.balanceSection}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {ORGANIZATION_OVERVIEW_CONTENT_CONSTANTS.creditBalance}
              </span>
              {/* <InfoIcon className="h-4 w-4 text-muted-foreground" /> */}
            </div>
            <motion.h3
              variants={OVERVIEW_ANIMATION_VARIANTS.balanceAmount}
              className="text-4xl font-medium"
            >
              ${creditBalance.toFixed(2)}
            </motion.h3>
          </motion.div>

          <motion.div 
            variants={OVERVIEW_ANIMATION_VARIANTS.addButton}
            className="flex pt-0.5"
          >
            <OrganizationBillingAddMoneyDialog 
              addCreditBalanceButton={ORGANIZATION_OVERVIEW_CONTENT_CONSTANTS.addCreditBalanceButton} 
            />
          </motion.div>
        </motion.div>
        {/* End of Left Section ---- */}

        {/* Start of Right Section --- */}
        <motion.div
          variants={OVERVIEW_ANIMATION_VARIANTS.rightSection}
          className="flex-1 pl-6 border border-border/60 rounded-sm px-12 py-6"
        >
          <div className="flex items-start gap-3">
            <div className="p-1 mt-0.5">
              <InfoIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <motion.h3 
                variants={OVERVIEW_ANIMATION_VARIANTS.autoRechargeTitle}
                className="font-medium tracking-tighter"
              >
                {ORGANIZATION_OVERVIEW_CONTENT_CONSTANTS.autoRechargeMessage}
              </motion.h3>
              <motion.p 
                variants={OVERVIEW_ANIMATION_VARIANTS.autoRechargeMessage}
                className="text-[11px] md:text-[13px] tracking-tight text-muted-foreground"
              >
                {autoRechargeMessage}
              </motion.p>

              <motion.div 
                variants={OVERVIEW_ANIMATION_VARIANTS.autoRechargeButton}
              >
                <OrganizationEnableRecharge />
              </motion.div>
            </div>
          </div>
        </motion.div>
        {/* End of Right Section ---- */}
      </div>
    </motion.div>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { OrganizationOverviewContent };
