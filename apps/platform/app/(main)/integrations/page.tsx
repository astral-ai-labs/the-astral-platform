/* ==========================================================================*/
// page.tsx — Integrations page for managing third-party connections
/* ==========================================================================*/
// Purpose: Renders the integrations interface for connecting external services
// Sections: Imports, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React, { useState } from "react";

// External Packages ---
import { motion, easeInOut } from "motion/react";

// Local Components ---
import { WorkspaceHeader } from "@/components/ui/workspace-header";
import { IntegrationFiltering } from "@/components/integrations/filtering";
import { Integration } from "@/components/integrations/integration";

// Types ---
import type { McpServiceInfo } from "@/types";

/* ==========================================================================*/
// Dummy Data
/* ==========================================================================*/

const mockIntegrations: McpServiceInfo[] = [
  {
    serviceId: "salesforce" as any,
    icon: "/integrations/salesforce.svg",
    name: "Salesforce",
    description: "Customer relationship management and sales automation platform",
    authenticationInfo: {
      isAuthenticated: true,
      accountEmail: "user@company.com",
    },
    quickActions: {
      "Create Lead": "Generate new sales leads from conversations",
      "Update Contact": "Sync contact information automatically",
      "Create Opportunity": "Track new business opportunities",
      "View Pipeline": "Review sales pipeline and forecasts",
    },
    metadata: {
      category: "CRM",
      popularity: "high",
    },
  },
  {
    serviceId: "stripe" as any,
    icon: "/integrations/stripe.svg",
    name: "Stripe",
    description: "Online payment processing and financial infrastructure",
    authenticationInfo: {
      isAuthenticated: false,
    },
    quickActions: {
      "Process Payment": "Handle customer payments securely",
      "Create Invoice": "Generate and send invoices",
      "Track Subscriptions": "Manage recurring billing",
      "View Analytics": "Monitor payment performance",
    },
    metadata: {
      category: "Payments",
      popularity: "high",
    },
  },
  {
    serviceId: "gmail" as any,
    icon: "/integrations/gmail.svg",
    name: "Gmail",
    description: "Google's email service for communication and collaboration",
    authenticationInfo: {
      isAuthenticated: true,
      accountEmail: "user@gmail.com",
    },
    quickActions: {
      "Send Email": "Compose and send emails automatically",
      "Read Inbox": "Check and process incoming messages",
      "Create Draft": "Prepare email drafts for review",
      "Schedule Send": "Send emails at optimal times",
    },
    metadata: {
      category: "Communication",
      popularity: "high",
    },
  },
  {
    serviceId: "google-docs" as any,
    icon: "/integrations/google-docs.svg",
    name: "Google Docs",
    description: "Collaborative document editing and real-time writing platform",
    authenticationInfo: {
      isAuthenticated: true,
      accountEmail: "user@gmail.com",
    },
    quickActions: {
      "Create Document": "Generate new documents from templates",
      "Edit Content": "Modify and format document content",
      "Share Document": "Collaborate with team members",
      "Export PDF": "Convert documents to PDF format",
    },
    metadata: {
      category: "Productivity",
      popularity: "high",
    },
  },
  {
    serviceId: "notion" as any,
    icon: "/integrations/notion.svg",
    name: "Notion",
    description: "All-in-one workspace for notes, docs, and collaboration",
    authenticationInfo: {
      isAuthenticated: false,
    },
    quickActions: {
      "Create Page": "Generate new pages and documents",
      "Update Database": "Sync data with Notion databases",
      "Search Content": "Find information across workspaces",
      "Create Template": "Build reusable page templates",
    },
    metadata: {
      category: "Productivity",
      popularity: "medium",
    },
  },
];

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const INTEGRATIONS_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const INTEGRATION_ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    x: -20,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: easeInOut,
    },
  },
};

/* ==========================================================================*/
// Page Component
/* ==========================================================================*/

/**
 * IntegrationsPage
 *
 * Renders the integrations management interface for connecting external services.
 * Displays available integrations and connection status with search and filtering.
 */
function IntegrationsPage() {
  // Search and filter state ---
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthenticatedOnly, setShowAuthenticatedOnly] = useState(false);
  const [showUnauthenticatedOnly, setShowUnauthenticatedOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Filter toggle handlers ---
  const handleToggleAuthenticated = () => {
    setShowAuthenticatedOnly(!showAuthenticatedOnly);
    // Clear conflicting filter
    if (!showAuthenticatedOnly) {
      setShowUnauthenticatedOnly(false);
    }
    // Trigger re-animation when filters change
    setAnimationKey(prev => prev + 1);
  };

  const handleToggleUnauthenticated = () => {
    setShowUnauthenticatedOnly(!showUnauthenticatedOnly);
    // Clear conflicting filter
    if (!showUnauthenticatedOnly) {
      setShowAuthenticatedOnly(false);
    }
    // Trigger re-animation when filters change
    setAnimationKey(prev => prev + 1);
  };

  const handleToggleNew = () => {
    setShowNewOnly(!showNewOnly);
    // Trigger re-animation when filters change
    setAnimationKey(prev => prev + 1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Trigger re-animation when search changes
    setAnimationKey(prev => prev + 1);
  };

  // Filter integrations based on search and filters
  const filteredIntegrations = mockIntegrations.filter((integration) => {
    // Search filter
    const matchesSearch = !searchQuery || integration.name.toLowerCase().includes(searchQuery.toLowerCase()) || integration.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Authentication filters
    const matchesAuth = (!showAuthenticatedOnly && !showUnauthenticatedOnly) || (showAuthenticatedOnly && integration.authenticationInfo.isAuthenticated) || (showUnauthenticatedOnly && !integration.authenticationInfo.isAuthenticated);

    // New filter (for demo, consider items not authenticated as "new")
    const matchesNew = !showNewOnly || !integration.authenticationInfo.isAuthenticated;

    return matchesSearch && matchesAuth && matchesNew;
  });

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      {/* Start of Header --- */}
      <WorkspaceHeader title="Integrations" subtitle="Connect external services to enhance your astral workflows." />
      {/* End of Header --- */}

      {/* Start of Filtering --- */}
      <IntegrationFiltering searchQuery={searchQuery} onSearchChange={handleSearchChange} showAuthenticatedOnly={showAuthenticatedOnly} onToggleAuthenticated={handleToggleAuthenticated} showUnauthenticatedOnly={showUnauthenticatedOnly} onToggleUnauthenticated={handleToggleUnauthenticated} showNewOnly={showNewOnly} onToggleNew={handleToggleNew} />
      {/* End of Filtering --- */}
      {/* Start of Integrations --- */}
      <div className="flex-1 overflow-auto p-6">
        <div className="">
          {filteredIntegrations.length > 0 ? (
            <motion.div 
              key={animationKey}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              initial="hidden"
              animate="visible"
              variants={INTEGRATIONS_CONTAINER_VARIANTS}
            >
              {filteredIntegrations.map((integration) => (
                <motion.div
                  key={integration.serviceId}
                  variants={INTEGRATION_ITEM_VARIANTS}
                >
                  <Integration serviceInfo={integration} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeInOut }}
            >
              <p className="text-muted-foreground">No integrations match your current filters.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export default IntegrationsPage;
