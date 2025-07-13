/* ==========================================================================*/
// types.ts — Global type definitions for the platform
/* ==========================================================================*/
// Purpose: Centralized type definitions for workflows, tasks, sidebar, and user interfaces
// Sections: Core Types, Union Types, Exports

/* ==========================================================================*/
// Core Types
/* ==========================================================================*/

type WorkflowTaskStatusEnum = "draft" | "archived" | "completed" | "failed" | "cancelled" | "running";

interface Status {
  status: WorkflowTaskStatusEnum;
  awaitingYou: boolean;
  awaitingTeammate: boolean;
}

interface WorkflowMetadata {
  id: string;
  name: string;
  type: "workflow";
  description: string;
  dateCreated: string;
  dateUpdated: string;
  status: Status;
}

interface TaskMetadata {
  id: string;
  name: string;
  type: "task";
  description: string;
  dateCreated: string;
  dateUpdated: string;
  status: Status;
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

/* ==========================================================================*/
// MCP Types
/* ==========================================================================*/

/** MCP operation types for service interactions */
type MCP_OPERATION = "fetch-one" | "fetch-multiple"; // TODO: Add more operations as needed

type MCPService = "gmail" | "notion" | "salesforce" | "stripe" | "google-docs" | "google-sheets" | "google-drive";

interface McpAuthenticationInfo {
  isAuthenticated: boolean;
  accountEmail?: string;
}

interface McpServiceInfo {
  /** Service provider for the integration. Also serves as unique identifier for the service. */
  serviceId: MCPService;
  /** Icon for the service. Can be a React node or a string. */
  icon: React.ReactNode | string;
  /** Name of the service. */
  name: string;
  /** Description of the service. */
  description: string;
  /** Authentication information for the service. */
  authenticationInfo: McpAuthenticationInfo;
  /** Quick actions for the service. */
  quickActions?: Record<string, string>; // TODO: Add more quick actions as needed
  /** Metadata for the service. */
  metadata?: Record<string, string>; // TODO: Add more metadata as needed
}

/* ==========================================================================*/
// Union Types
/* ==========================================================================*/

type WorkflowOrTask = WorkflowMetadata | TaskMetadata;

type SidebarView = "workflows" | "tasks";

/* ==========================================================================*/
// Public Type Exports
/* ==========================================================================*/

export type { WorkflowMetadata, TaskMetadata, WorkflowOrTask, SidebarView, User, McpAuthenticationInfo, McpServiceInfo, MCPService, MCP_OPERATION };
