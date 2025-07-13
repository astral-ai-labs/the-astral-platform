/* ==========================================================================*/
// sidebar-container.tsx — Main sidebar container with workflows and tasks
/* ==========================================================================*/
// Purpose: Renders the complete sidebar layout with main navigation, workflows, and tasks
// Sections: Imports, Data, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
"use client";

import * as React from "react";

// Next.js ---
import { usePathname } from "next/navigation";

// Local Modules ---
import { MainSidebar } from "./main-sidebar";
import { WorkflowSidebar } from "./workflow-sidebar";
import { Sidebar, useSidebar } from "@workspace/ui/components/sidebar";

// Types ---
import { WorkflowMetadata, TaskMetadata, WorkflowOrTask, SidebarView } from "@/types";

/* ==========================================================================*/
// Data
/* ==========================================================================*/

const data = {
  workflows: [
    {
      id: "wf-001",
      name: "User Onboarding Flow",
      type: "workflow" as const,
      description: "A workflow for onboarding new users",
      dateCreated: "2024-01-10T14:30:00.000Z",
      dateUpdated: "2024-01-17T09:15:00.000Z",
      status: {
        status: "running" as const,
        awaitingYou: true,
        awaitingTeammate: false,
      },
    },
    {
      id: "wf-002",
      name: "Payment Processing",
      type: "workflow" as const,
      description: "A workflow for processing payments",
      dateCreated: "2024-01-15T16:45:00.000Z",
      dateUpdated: "2024-01-16T11:20:00.000Z",
      status: {
        status: "completed" as const,
        awaitingYou: false,
        awaitingTeammate: false,
      },
    },
    {
      id: "wf-003",
      name: "Email Campaign Manager",
      type: "workflow" as const,
      description: "A workflow for managing email campaigns",
      dateCreated: "2024-01-12T08:00:00.000Z",
      dateUpdated: "2024-01-17T15:30:00.000Z",
      status: {
        status: "running" as const,
        awaitingYou: false,
        awaitingTeammate: true,
      },
    },
    {
      id: "wf-004",
      name: "Data Migration Script",
      type: "workflow" as const,
      description: "A workflow for migrating data",
      dateCreated: "2023-12-15T10:20:00.000Z",
      dateUpdated: "2024-01-05T13:45:00.000Z",
      status: {
        status: "archived" as const,
        awaitingYou: false,
        awaitingTeammate: false,
      },
    },
    {
      id: "wf-005",
      name: "Customer Support Bot",
      type: "workflow" as const,
      description: "A workflow for customer support",
      dateCreated: "2024-01-08T12:15:00.000Z",
      dateUpdated: "2024-01-17T17:22:00.000Z",
      status: {
        status: "draft" as const,
        awaitingYou: true,
        awaitingTeammate: false,
      },
    },
    {
      id: "wf-006",
      name: "Inventory Management System",
      type: "workflow" as const,
      description: "A workflow for tracking inventory levels",
      dateCreated: "2024-01-14T11:30:00.000Z",
      dateUpdated: "2024-01-17T12:45:00.000Z",
      status: {
        status: "failed" as const,
        awaitingYou: false,
        awaitingTeammate: false,
      },
    },
    {
      id: "wf-007",
      name: "Content Moderation Pipeline",
      type: "workflow" as const,
      description: "A workflow for moderating user-generated content",
      dateCreated: "2024-01-13T09:20:00.000Z",
      dateUpdated: "2024-01-17T16:30:00.000Z",
      status: {
        status: "running" as const,
        awaitingYou: true,
        awaitingTeammate: true,
      },
    },
    {
      id: "wf-008",
      name: "API Rate Limiting Service",
      type: "workflow" as const,
      description: "A workflow for managing API rate limits",
      dateCreated: "2024-01-11T14:15:00.000Z",
      dateUpdated: "2024-01-17T10:20:00.000Z",
      status: {
        status: "cancelled" as const,
        awaitingYou: false,
        awaitingTeammate: false,
      },
    },
  ],
  tasks: [
    {
      id: "task-001",
      name: "Send Welcome Email",
      type: "task" as const,
      description: "A task for sending welcome emails",
      dateCreated: "2024-01-16T10:30:00.000Z",
      dateUpdated: "2024-01-17T14:45:00.000Z",
      status: {
        status: "running" as const,
        awaitingYou: true,
        awaitingTeammate: false,
      },
    },
    {
      id: "task-002",
      name: "Validate Payment Info",
      type: "task" as const,
      description: "A task for validating payment information",
      dateCreated: "2024-01-14T09:20:00.000Z",
      dateUpdated: "2024-01-17T16:10:00.000Z",
      status: {
        status: "completed" as const,
        awaitingYou: false,
        awaitingTeammate: false,
      },
    },
    {
      id: "task-003",
      name: "Generate Invoice",
      type: "task" as const,
      description: "A task for generating invoices",
      dateCreated: "2024-01-11T15:45:00.000Z",
      dateUpdated: "2024-01-17T13:30:00.000Z",
      status: {
        status: "draft" as const,
        awaitingYou: false,
        awaitingTeammate: true,
      },
    },
    {
      id: "task-004",
      name: "Update User Profile",
      type: "task" as const,
      description: "A task for updating user profiles",
      dateCreated: "2023-12-20T11:15:00.000Z",
      dateUpdated: "2024-01-03T14:22:00.000Z",
      status: {
        status: "archived" as const,
        awaitingYou: false,
        awaitingTeammate: false,
      },
    },
    {
      id: "task-005",
      name: "Send Notification",
      type: "task" as const,
      description: "A task for sending notifications",
      dateCreated: "2024-01-09T13:40:00.000Z",
      dateUpdated: "2024-01-17T18:05:00.000Z",
      status: {
        status: "failed" as const,
        awaitingYou: true,
        awaitingTeammate: false,
      },
    },
    {
      id: "task-006",
      name: "Process Refund Request",
      type: "task" as const,
      description: "A task for processing customer refunds",
      dateCreated: "2024-01-15T08:45:00.000Z",
      dateUpdated: "2024-01-17T11:30:00.000Z",
      status: {
        status: "running" as const,
        awaitingYou: false,
        awaitingTeammate: true,
      },
    },
    {
      id: "task-007",
      name: "Backup Database",
      type: "task" as const,
      description: "A task for creating database backups",
      dateCreated: "2024-01-12T19:00:00.000Z",
      dateUpdated: "2024-01-17T20:15:00.000Z",
      status: {
        status: "cancelled" as const,
        awaitingYou: false,
        awaitingTeammate: false,
      },
    },
    {
      id: "task-008",
      name: "Update Security Certificates",
      type: "task" as const,
      description: "A task for renewing SSL certificates",
      dateCreated: "2024-01-10T16:20:00.000Z",
      dateUpdated: "2024-01-17T14:10:00.000Z",
      status: {
        status: "draft" as const,
        awaitingYou: true,
        awaitingTeammate: true,
      },
    },
    {
      id: "task-009",
      name: "Clean Temporary Files",
      type: "task" as const,
      description: "A task for cleaning up temporary files",
      dateCreated: "2024-01-16T22:30:00.000Z",
      dateUpdated: "2024-01-17T07:45:00.000Z",
      status: {
        status: "completed" as const,
        awaitingYou: false,
        awaitingTeammate: false,
      },
    },
  ],
};

/* ==========================================================================*/
// Component
/* ==========================================================================*/

function SidebarContainer({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [activeView, setActiveView] = React.useState<SidebarView>("workflows");
  const [showWorkflowSidebar, setShowWorkflowSidebar] = React.useState(false);
  const { setOpen } = useSidebar();

  // Monitor pathname changes to show/hide second sidebar
  React.useEffect(() => {
    const shouldShowWorkflowSidebar = pathname.toLowerCase().includes("ai");
    setShowWorkflowSidebar(shouldShowWorkflowSidebar);

    // Collapse sidebar if it shouldn't be shown
    if (!shouldShowWorkflowSidebar) {
      setOpen(false);
    }
  }, [pathname, setOpen]);

  const handleViewChange = (view: SidebarView) => {
    setActiveView(view);
  };

  const handleSidebarOpen = () => {
    setOpen(true);
  };

  const handleItemSelect = (item: WorkflowOrTask) => {
    console.log("Selected item:", item);
    // TODO: Add navigation logic or other item selection handling
  };

  // Memoize current data to avoid recalculation on every render
  const currentData = React.useMemo(() => {
    return activeView === "workflows" ? data.workflows : data.tasks;
  }, [activeView]);

  return (
    <Sidebar collapsible="icon" className="overflow-hidden *:data-[sidebar=sidebar]:flex-row" {...props}>
      {/* Start of Main Sidebar --- */}
      <MainSidebar onViewChange={handleViewChange} onSidebarOpen={handleSidebarOpen} />
      {/* End of Main Sidebar ---- */}

      {/* Start of Workflow Sidebar --- */}
      {showWorkflowSidebar && <WorkflowSidebar activeView={activeView} items={currentData} onItemSelect={handleItemSelect} />}
      {/* End of Workflow Sidebar ---- */}
    </Sidebar>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { SidebarContainer };
