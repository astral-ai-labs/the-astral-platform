/* ==========================================================================*/
// integration.tsx — Individual integration component
/* ==========================================================================*/
// Purpose: Renders a single integration card with connection status and expandable details
// Sections: Imports, Types, Components, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React Core ---
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Icons ---
import { Check, X, PlusIcon, ArrowRight } from "lucide-react";

// External Packages ---
import { useReducedMotion } from "motion/react";

// Local Components ---
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { MorphingDialog, MorphingDialogTrigger, MorphingDialogContent, MorphingDialogTitle, MorphingDialogClose, MorphingDialogContainer } from "@/components/motion-primitives/morphing-dialog";
import { TooltipActionIcon } from "@/components/ui/tooltip-icon";
import { cn } from "@/lib/utils";

// Actions ---
import { startGmailOAuth } from "@/actions/klavis";

// Types ---
import type { McpServiceInfo } from "@/types";
import { Button } from "@workspace/ui/components/button";

/* ==========================================================================*/
// Types and Interfaces
/* ==========================================================================*/

interface IntegrationProps {
  serviceInfo: McpServiceInfo;
}

interface IntegrationWorkflowsProps {
  workflows: Array<{ title: string; description: string }>;
  isAuthenticated: boolean;
}

interface IntegrationStatusIconProps {
  isAuthenticated: boolean;
}

interface IntegrationIconProps {
  icon: string | React.ReactNode;
  name: string;
}

interface IntegrationWorkflowsDialogProps {
  name: string;
  workflows: Array<{ title: string; description: string }>;
  isAuthenticated: boolean;
}

interface IntegrationAuthSectionProps {
  isAuthenticated: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  workflows: Array<{ title: string; description: string }>;
  serviceName: string;
}

/* ==========================================================================*/
// Integration Status Icon Component
/* ==========================================================================*/

/**
 * IntegrationStatusIcon
 *
 * Displays connection status with tooltip in top right corner.
 */
function IntegrationStatusIcon({ isAuthenticated }: IntegrationStatusIconProps) {
  return <div className="absolute top-3 right-3">{isAuthenticated ? <TooltipActionIcon sideOffset={2} tooltipContent="Connected" icon={<Check className="h-3 w-3 text-green-500" />} /> : <TooltipActionIcon tooltipContent="Not Connected" icon={<X className="h-3 w-3 text-red-500" />} />}</div>;
}

/* ==========================================================================*/
// Integration Icon Component
/* ==========================================================================*/

/**
 * IntegrationIcon
 *
 * Renders the service icon with proper styling and fallback.
 */
function IntegrationIcon({ icon, name }: IntegrationIconProps) {
  return <>{typeof icon === "string" ? <img src={icon} alt={`${name} icon`} className="h-8 w-8 rounded-md border border-border bg-white dark:bg-gray-100 object-contain p-1" /> : <div className="h-8 w-8 rounded-md border border-border bg-white dark:bg-gray-100 flex items-center justify-center p-1">{icon}</div>}</>;
}

/* ==========================================================================*/
// Integration Workflows Component
/* ==========================================================================*/

/**
 * IntegrationWorkflows
 *
 * Simple workflows section showing available actions.
 */
function IntegrationWorkflows({ workflows }: IntegrationWorkflowsProps) {
  if (workflows.length === 0) return null;

  return (
    <div>
      <div className="space-y-2">
        {workflows.map((workflow, index) => (
          <div key={index} className={cn("flex items-center justify-between p-3 rounded-md transition-colors cursor-pointer hover:bg-background")}>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">{workflow.title}</div>
              <div className="text-xs text-muted-foreground line-clamp-1">{workflow.description}</div>
            </div>
            <ArrowRight className={cn("h-3 w-3 ml-2 flex-shrink-0 transition-colors text-muted-foreground")} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Integration Workflows Dialog Component
/* ==========================================================================*/

/**
 * IntegrationWorkflowsDialog
 *
 * Modal dialog showing available workflows for the integration.
 */
function IntegrationWorkflowsDialog({ name, workflows, isAuthenticated }: IntegrationWorkflowsDialogProps) {
  return (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <MorphingDialogTrigger>
        <TooltipActionIcon tooltipContent="See Example Workflows" icon={<PlusIcon size={12} />} className="flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 active:scale-[0.98]" />
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-border bg-muted sm:w-[500px] rounded-lg">
          <div className="p-6">
            <MorphingDialogTitle className="text-xl font-medium text-foreground mb-4">{name} Example Workflows</MorphingDialogTitle>

            {/* Workflows Section --- */}
            <IntegrationWorkflows workflows={workflows} isAuthenticated={isAuthenticated} />
          </div>
          <MorphingDialogClose className="text-muted-foreground hover:text-foreground" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

/* ==========================================================================*/
// Main Integration Component
/* ==========================================================================*/

/**
 * Integration
 *
 * Renders an individual integration card with connection status and expandable workflows.
 * Shows authentication controls on the main card and workflows in a dialog.
 *
 * @param serviceInfo - Service information including icon, name, description, and auth status
 */
function Integration({ serviceInfo }: IntegrationProps) {
  const { icon, name, description, authenticationInfo, quickActions } = serviceInfo;
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  // Internal authentication state ---
  const [authState, setAuthState] = useState({
    isAuthenticated: authenticationInfo.isAuthenticated,
    accountEmail: authenticationInfo.accountEmail,
  });

  // Convert quickActions to example workflows format ---
  const exampleWorkflows = quickActions
    ? Object.entries(quickActions).map(([key, value]) => ({
        title: key,
        description: value,
      }))
    : [];

  // Handle connection ---
  const handleConnect = async () => {
    try {
      const oauthUrl = await startGmailOAuth("chris123");
      console.log("oauthUrl", oauthUrl);
        router.push(oauthUrl);
    //   window.open(oauthUrl, "_blank");
    } catch (error) {
      console.error("Integration failed:", error);
      // Fallback to local state update if server action fails
      setAuthState({
        isAuthenticated: true,
        accountEmail: "user@example.com",
      });
    }
  };

  // Handle disconnection ---
  const handleDisconnect = () => {
    setAuthState({
      isAuthenticated: false,
      accountEmail: undefined,
    });
  };

  return (
    <div className="relative">
      <div className="relative flex flex-col gap-3 rounded-lg bg-card dark:bg-secondary hover:bg-accent dark:hover:bg-secondary/70 border border-border px-2 pt-3 pb-0 backdrop-blur-sm transition-colors duration-200 dark:shadow-sm h-[160px]">
        {/* Border Trail Animation --- */}
        <BorderTrail
          className="bg-muted-foreground/15 dark:bg-muted-foreground/8"
          size={45}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        />

        {/* Status Icon --- */}
        <IntegrationStatusIcon isAuthenticated={authState.isAuthenticated} />

        {/* Icon and Title Row --- */}
        <div className="flex items-center gap-3">
          <IntegrationIcon icon={icon} name={name} />
          <div className="text-sm font-medium text-foreground line-clamp-1">{name}</div>
        </div>

        {/* Description --- */}
        <div className="text-[13px] pt-1.5 text-muted-foreground line-clamp-2 overflow-hidden flex-1 min-h-0">{description}</div>

        {/* Spacer --- */}

        {/* Authentication Section --- */}
        <div className="flex items-center justify-between pb-1">
          <Button variant="link" onClick={authState.isAuthenticated ? handleDisconnect : handleConnect} className={cn("group pl-0 py-1 text-xs rounded-md font-medium transition-colors flex items-center gap-1 text-muted-foreground hover:text-foreground")}>
            {authState.isAuthenticated ? "Disconnect" : "Connect"}
            {!shouldReduceMotion && (
              <div className="ml-auto origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-100 ease-in-out">
                <ArrowRight className={cn("size-3 transition-colors text-muted-foreground group-hover:text-foreground")} />
              </div>
            )}
          </Button>
          <div className="flex items-center gap-2">
            {/* Dialog Trigger --- */}
            <IntegrationWorkflowsDialog name={name} workflows={exampleWorkflows} isAuthenticated={authState.isAuthenticated} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { Integration };
