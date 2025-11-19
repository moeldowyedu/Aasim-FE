# Aasim AI - Frontend Pages Documentation

> **Last Updated:** 2025-11-19
> **Version:** 2.0 (Post-Legacy Cleanup)

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Public Pages](#public-pages)
3. [Core User Pages](#core-user-pages)
4. [AgentX Hub](#agentx-hub)
5. [Job Flows](#job-flows)
6. [Orchestration & Scheduling](#orchestration--scheduling)
7. [HITL Framework](#hitl-framework)
8. [Precision AI Engines](#precision-ai-engines)
9. [Organization Management](#organization-management)
10. [Team & Users](#team--users)
11. [Integrations](#integrations)
12. [Billing & Usage](#billing--usage)
13. [Settings](#settings)
14. [Admin & System Admin](#admin--system-admin)
15. [Legacy Pages (Removed)](#legacy-pages-removed)

---

## Architecture Overview

### User Types
- **Personal User**: Individual users who don't need organization structure
- **Organization User**: Users within an organization with branches, departments, teams
- **Tenant Admin**: Organization administrators
- **System Admin**: Platform administrators (super admin)

### Core Workflow
```
User Registration → Projects → AgentX Hub → Deploy Agents → Create Jobs → HITL Oversight → Monetize
```

### Access Levels
- 🌐 **Public**: No authentication required
- 🔒 **Protected**: Requires authentication
- 👥 **Organization Only**: Requires organization membership
- 🔑 **Admin**: Requires tenant admin role
- ⚡ **System Admin**: Requires system admin role

---

## Public Pages

### Authentication Pages
**Location:** `src/pages/Auth/`

| Page | Route | Purpose | File |
|------|-------|---------|------|
| Home/Landing | `/` | Marketing landing page | `src/pages/Home/HomePage.jsx` |
| Login | `/login` | User authentication | `src/pages/Auth/LoginPage.jsx` |
| Register | `/register` | New user registration | `src/pages/Auth/RegisterPage.jsx` |
| Forgot Password | `/forgot-password` | Password reset request | `src/pages/Auth/ForgotPasswordPage.jsx` |
| Reset Password | `/reset-password/:token` | Password reset with token | `src/pages/Auth/ResetPasswordPage.jsx` |

**Access:** 🌐 Public

---

## Core User Pages

### Dashboard & Profile
**Location:** `src/pages/Dashboard/`, `src/pages/Profile/`

| Page | Route | Purpose | File | Access |
|------|-------|---------|------|--------|
| Dashboard | `/dashboard` | Main user dashboard | `src/pages/Dashboard/DashboardPage.jsx` | 🔒 |
| Profile | `/profile` | User profile management | `src/pages/Profile/ProfilePage.jsx` | 🔒 |
| Notifications | `/notifications` | User notifications | `src/pages/Profile/NotificationsPage.jsx` | 🔒 |

---

## AgentX Hub
**Formerly:** Marketplace, Agent Management, Agent Builder
**Location:** `src/pages/AgentX/`

### Purpose
Central hub for discovering, deploying, creating, and monetizing Precision AI Agents.

| Page | Route | Purpose | File | Former Name |
|------|-------|---------|------|-------------|
| **Marketplace** | `/agentx/marketplace` | Browse & discover agents | `src/pages/AgentX/MarketplacePage.jsx` | "Agent Marketplace" |
| **My Agents** | `/agentx/my-agents` | View deployed & created agents | `src/pages/AgentX/MyAgentsPage.jsx` | "All Agents", "Agents List" |
| **Agent Builder** | `/agentx/builder` | Create custom agents for monetization | `src/pages/AgentX/AgentBuilderPage.jsx` | "Agent Builder", "Create Agent" |
| **Private Agents** | `/agentx/private` | Organization private agents | `src/pages/AgentX/PrivateAgentsPage.jsx` | - |
| **Developer Portal** | `/agentx/developer` | Developer resources & docs | `src/pages/AgentX/DeveloperPortalPage.jsx` | "Developer Docs" |
| **Deploy Agent** | `/agents/deploy` | Agent deployment wizard | `src/components/agent-deployment/AgentDeploymentWizard.jsx` | - |

**Access:** 🔒 Protected
**Backward Compatibility:**
- `/agents/my-agents` → Redirects to `/agentx/my-agents`
- `/marketplace` → Should redirect to `/agentx/marketplace`

### Key Features
- ✅ Browse agents by category/industry
- ✅ Deploy agents to projects with premade rubrics
- ✅ Create and publish agents to monetize (70% revenue share)
- ✅ Private organization agents
- ✅ Developer documentation

---

## Job Flows
**Formerly:** Submissions, Evaluation Requests
**Location:** `src/pages/JobFlows/`

### Purpose
Create and manage jobs for running deployed agents (one-time, scheduled, or orchestrated).

| Page | Route | Purpose | File | Former Name |
|------|-------|---------|------|-------------|
| **All Job Flows** | `/job-flows/all` | List all job flows | `src/pages/JobFlows/JobFlowsListPage.jsx` | "Submissions List" |
| **Job Calendar** | `/job-flows/calendar` | Calendar view of jobs | `src/pages/JobFlows/JobCalendarPage.jsx` | - |
| **Execution History** | `/job-flows/history` | View execution history | `src/pages/JobFlows/ExecutionHistoryPage.jsx` | "Evaluation Results" |

**Access:** 🔒 Protected

### Job Types
1. **One-time**: Run one agent once
2. **Scheduled**: Run one agent on schedule
3. **Orchestrated One-time**: Run multiple agents once
4. **Orchestrated Scheduled**: Run multiple agents on schedule

**Removed Pages:**
- ❌ AgentSelectionPage → Use AgentX Hub to deploy first
- ❌ CreateSubmissionForm → Use Job Flows
- ❌ SubmissionDetailsPage → Use Execution History

---

## Orchestration & Scheduling

### Orchestration (Multi-Agent Workflows)
**Formerly:** Workflows, Multi-Agent Orchestrator
**Location:** `src/pages/Orchestration/`

| Page | Route | Purpose | File | Former Name |
|------|-------|---------|------|-------------|
| **Workflows** | `/orchestration/workflows` | List all workflows | `src/pages/Orchestration/WorkflowsPage.jsx` | "Workflow List" |
| **Workflow Builder** | `/orchestration/builder` | Visual workflow builder | `src/pages/Orchestration/WorkflowBuilderPage.jsx` | "Multi-Agent Orchestrator" |
| **Execution History** | `/orchestration/history` | Workflow execution history | `src/pages/Orchestration/ExecutionHistoryPage.jsx` | "Workflow Execution" |

**Access:** 🔒 Protected

### Scheduling (Time-based Jobs)
**Formerly:** Scheduler, Cron Jobs
**Location:** `src/pages/Scheduling/`

| Page | Route | Purpose | File | Former Name |
|------|-------|---------|------|-------------|
| **Scheduled Jobs** | `/scheduling/jobs` | Manage scheduled jobs | `src/pages/Scheduling/ScheduledJobsPage.jsx` | "Agent Scheduler" |
| **Calendar View** | `/scheduling/calendar` | Calendar view | `src/pages/Scheduling/CalendarViewPage.jsx` | - |
| **Upcoming Runs** | `/scheduling/upcoming` | View upcoming runs | `src/pages/Scheduling/UpcomingRunsPage.jsx` | - |

**Access:** 🔒 Protected

---

## HITL Framework
**Formerly:** Evaluations, Human Review, Oversight
**Location:** `src/pages/HITL/`

### Purpose
Human-in-the-Loop framework for oversight and approval workflows.

| Page | Route | Purpose | File | Former Name |
|------|-------|---------|------|-------------|
| **Oversight Modes** | `/hitl/modes` | Configure HITL modes | `src/pages/HITL/OversightModesPage.jsx` | - |
| **Approval Queue** | `/hitl/approval-queue` | Pending approvals | `src/pages/HITL/ApprovalQueuePage.jsx` | "HITL Queue" |
| **My Approvals** | `/hitl/my-approvals` | User's approval tasks | `src/pages/HITL/MyApprovalsPage.jsx` | - |
| **Approval Workflows** | `/hitl/approvals` | Workflow configurations | `src/pages/HITL/ApprovalWorkflowsPage.jsx` | - |
| **Activity Logs** | `/hitl/activity-logs` | HITL activity history | `src/pages/HITL/ActivityLogsPage.jsx` | "HITL Activity" |
| **Configuration** | `/hitl/configuration` | HITL settings | `src/pages/HITL/HITLConfigurationPage.jsx` | - |

**Access:** 🔒 Protected

### HITL Modes
1. **Fully AI-Driven**: Autonomous operation
2. **Human-in-the-Loop (HITL)**: Approval required before execution
3. **Human-on-Standby**: AI executes, human monitors
4. **Human-in-Charge**: Human controls each step
5. **Hybrid Oversight**: Mix of automated and manual

**Removed Pages:**
- ❌ EvaluationResultsPage → Use Activity Logs
- ❌ ReportViewerPage → Use Activity Logs
- ❌ CriteriaManagementPage → Use Settings/Rubrics
- ❌ HITLQueuePage → Duplicate of ApprovalQueuePage
- ❌ HITLActivityPage → Duplicate of ActivityLogsPage

---

## Precision AI Engines
**Location:** `src/pages/Engines/`

### Purpose
7 specialized AI engines for different data types and use cases.

| Engine | Route | Purpose | File |
|--------|-------|---------|------|
| **Overview** | `/engines` | All engines overview | `src/pages/Engines/EnginesOverviewPage.jsx` |
| **Vision Engine** | `/engines/vision` | Image analysis, OCR, object detection | `src/pages/Engines/VisionEnginePage.jsx` |
| **Audio Engine** | `/engines/audio` | Speech-to-text, transcription | `src/pages/Engines/AudioEnginePage.jsx` |
| **Text Engine** | `/engines/text` | NLP, sentiment, entity extraction | `src/pages/Engines/TextEnginePage.jsx` |
| **Code Engine** | `/engines/code` | Code analysis, bug detection | `src/pages/Engines/CodeEnginePage.jsx` |
| **Document Engine** | `/engines/document` | PDF/DOCX processing | `src/pages/Engines/DocumentEnginePage.jsx` |
| **Data Engine** | `/engines/data` | CSV/Excel analysis | `src/pages/Engines/DataEnginePage.jsx` |
| **Web Engine** | `/engines/web` | Web scraping, monitoring | `src/pages/Engines/WebEnginePage.jsx` |

**Access:** 🔒 Protected

---

## Organization Management
**Location:** `src/pages/Organization/`

### Purpose
Organization structure for enterprise users (not needed for personal users).

| Page | Route | Purpose | File | Access |
|------|-------|---------|------|--------|
| **Branches** | `/organization/branches` | Manage branches | `src/pages/Organization/BranchesPage.jsx` | 👥 Org |
| **Branch Details** | `/organization/branches/:id` | Branch details | `src/pages/Organization/BranchDetailsPage.jsx` | 👥 Org |
| **Departments** | `/organization/departments` | Manage departments | `src/pages/Organization/DepartmentsPage.jsx` | 👥 Org |
| **Projects** | `/organization/projects` | Manage projects | `src/pages/Organization/ProjectsPage.jsx` | 🔒 All |
| **Teams** | `/organization/teams` | Manage teams | `src/pages/Organization/TeamsPage.jsx` | 👥 Org |

**Access:**
- Projects: 🔒 All users (personal & organization)
- Others: 👥 Organization users only

### Key Points
- **Personal Users**: Only see Projects (no branches/departments/teams)
- **Organization Users**: Full organization hierarchy

---

## Team & Users
**Formerly:** User Management
**Location:** `src/pages/Team/`

### Purpose
User management for organizations (not needed for personal users).

| Page | Route | Purpose | File |
|------|-------|---------|------|
| **All Users** | `/team-users/all` | List all users | `src/pages/Team/AllUsersPage.jsx` |
| **Invite Users** | `/team-users/invite` | Invite new users | `src/pages/Team/InviteUserPage.jsx` |
| **Roles & Permissions** | `/team-users/roles` | Manage roles | `src/pages/Team/RolesPermissionsPage.jsx` |
| **User Activity** | `/team-users/activity` | User activity logs | `src/pages/Team/UserActivityPage.jsx` |

**Access:** 👥 Organization users only

**Removed Pages:**
- ❌ Settings/UsersRolesPage → Use Team/RolesPermissionsPage

---

## Integrations
**Formerly:** Developer Tools, Connected Apps
**Location:** `src/pages/Integrations/`

### Purpose
API integrations, webhooks, and third-party connections.

| Page | Route | Purpose | File | Former Location |
|------|-------|---------|------|-----------------|
| **Connected Apps** | `/integrations/connected` | Connected applications | `src/pages/Integrations/ConnectedAppsPage.jsx` | - |
| **API Keys** | `/integrations/api-keys` | Manage API keys | `src/pages/Integrations/APIKeysPage.jsx` | `Developer/APIKeysPage` |
| **Webhooks** | `/integrations/webhooks` | Webhook management | `src/pages/Integrations/WebhooksPage.jsx` | `Developer/WebhooksPage` |
| **Browse Integrations** | `/integrations/browse` | Available integrations | `src/pages/Integrations/BrowseIntegrationsPage.jsx` | `Developer/IntegrationsPage` |

**Access:** 🔒 Protected

**Removed Folders:**
- ❌ `Developer/` folder → Merged into Integrations
- ❌ `Integration/` (singular) folder → Merged into Integrations

---

## Billing & Usage
**Location:** `src/pages/Billing/`

### Purpose
Subscription management, usage tracking, and invoicing.

| Page | Route | Purpose | File | Former Name |
|------|-------|---------|------|-------------|
| **Overview** | `/billing/overview` | Billing dashboard | `src/pages/Billing/BillingOverviewPage.jsx` | "Billing Page" |
| **Subscription** | `/billing/subscription` | Subscription management | `src/pages/Billing/SubscriptionPage.jsx` | - |
| **Usage Reports** | `/billing/usage` | Usage analytics | `src/pages/Billing/UsageReportsPage.jsx` | - |
| **Invoices** | `/billing/invoices` | Invoice history | `src/pages/Billing/InvoicesPage.jsx` | - |

**Access:** 🔒 Protected
**Alias:** `/billing` → `/billing/overview`

**Removed Pages:**
- ❌ BillingPage → Replaced by BillingOverviewPage

---

## Settings
**Location:** `src/pages/Settings/`

### Purpose
Tenant and user settings configuration.

| Page | Route | Purpose | File | Former Name |
|------|-------|---------|------|-------------|
| **Tenant Settings** | `/settings/tenant` | Organization settings | `src/pages/Settings/TenantSettingsPage.jsx` | - |
| **Rubrics** | `/settings/rubrics` | Premade rubrics for agent deployment | `src/pages/Settings/RubricsPage.jsx` | "Criteria Management" |
| **Security** | `/settings/security` | Security settings | `src/pages/Settings/SecurityPage.jsx` | - |
| **Notifications** | `/settings/notifications` | Notification preferences | `src/pages/Settings/NotificationsPage.jsx` | - |

**Access:** 🔒 Protected
**Alias:** `/settings` → `/settings/tenant`

**Removed Pages:**
- ❌ Settings/IntegrationsPage → Use Integrations folder
- ❌ Settings/UsersRolesPage → Use Team/RolesPermissionsPage

---

## Admin & System Admin

### Tenant Admin (Organization Admin)
**Location:** `src/pages/Admin/`

| Page | Route | Purpose | File | Access |
|------|-------|---------|------|--------|
| **Admin Dashboard** | `/admin` | Tenant admin dashboard | `src/pages/Admin/AdminDashboardPage.jsx` | 🔑 Admin |
| **User Management** | `/admin/users` | Manage tenant users | `src/pages/Admin/UserManagementPage.jsx` | 🔑 Admin |
| **Analytics** | `/admin/analytics` | Tenant analytics | `src/pages/Admin/AnalyticsPage.jsx` | 🔑 Admin |
| **Webhooks** | `/admin/webhooks` | N8n webhook management | `src/pages/Admin/N8nWebhookManagementPage.jsx` | 🔑 Admin |

**Access:** 🔑 Tenant Admin only

### System Admin (Platform Management)
**Location:** `src/pages/Admin/` (System Admin pages)

| Page | Route | Purpose | File | Access |
|------|-------|---------|------|--------|
| **System Dashboard** | `/system-admin/dashboard` | Platform dashboard | `src/pages/Admin/AdminDashboardPage.jsx` | ⚡ System Admin |
| **Tenants Management** | `/system-admin/tenants` | Manage all tenants | `src/pages/Admin/TenantsManagementPage.jsx` | ⚡ System Admin |
| **Engine Management** | `/system-admin/engines` | Manage AI engines | `src/pages/Admin/EngineManagementPage.jsx` | ⚡ System Admin |
| **Agents Management** | `/system-admin/agents` | Platform-wide agents | `src/pages/Admin/AgentsManagementPage.jsx` | ⚡ System Admin |
| **Active Agents Monitor** | `/system-admin/active-agents` | Monitor running agents | `src/pages/Admin/ActiveAgentsMonitorPage.jsx` | ⚡ System Admin |
| **Integration Management** | `/system-admin/integrations` | Platform integrations | `src/pages/Admin/IntegrationManagementPage.jsx` | ⚡ System Admin |
| **Settings** | `/system-admin/settings` | Platform settings | `src/pages/Settings/TenantSettingsPage.jsx` | ⚡ System Admin |

**Access:** ⚡ System Admin only
**Alias:** `/system-admin` → `/system-admin/dashboard`

### Admin Layout
System admin pages use a special layout:
- **Component:** `src/components/layout/AdminLayout.jsx`
- **Navigation:** Sidebar with system admin menu
- **Header:** Shows "System Admin" badge in user menu

---

## Legacy Pages (Removed)

### Removed Folders (10 folders, 31 files)

#### 1. Submissions Folder (5 files)
**Reason:** Replaced by Job Flows

| Removed File | Replacement |
|--------------|-------------|
| `AgentSelectionPage.jsx` | Use AgentX Hub to deploy agents |
| `CreateSubmissionForm.jsx` | Use Job Flows to create jobs |
| `CreateSubmissionPage.jsx` | Use Job Flows |
| `SubmissionDetailsPage.jsx` | Use Job Flows History |
| `SubmissionsListPage.jsx` | Use Job Flows List |

#### 2. Evaluations Folder (3 files)
**Reason:** Replaced by HITL Framework + Rubrics

| Removed File | Replacement |
|--------------|-------------|
| `CriteriaManagementPage.jsx` | `/settings/rubrics` |
| `EvaluationResultsPage.jsx` | HITL Activity Logs |
| `ReportViewerPage.jsx` | HITL Activity Logs |

#### 3. Agent Folder (5 files)
**Reason:** Replaced by AgentX Hub

| Removed File | Replacement |
|--------------|-------------|
| `AgentBuilderPage.jsx` | `/agentx/builder` |
| `AgentConfigurationPage.jsx` | Configure in AgentX Hub |
| `AgentDetailPage.jsx` | `/agentx/my-agents` |
| `AgentExecutionDetailPage.jsx` | Job Flows History |
| `AgentsListPage.jsx` | `/agentx/my-agents` |

#### 4. Agents Folder (2 files)
**Reason:** Duplicate of AgentX

| Removed File | Replacement |
|--------------|-------------|
| `AllAgentsPage.jsx` | `/agentx/my-agents` |
| `AgentPerformancePage.jsx` | Analytics in AgentX Hub |

#### 5. Marketplace Folder (2 files)
**Reason:** Replaced by AgentX Hub

| Removed File | Replacement |
|--------------|-------------|
| `AgentMarketplacePage.jsx` | `/agentx/marketplace` |
| `AgentDetailPage.jsx` | `/agentx/marketplace` |

#### 6. Orchestrator Folder (1 file)
**Reason:** Replaced by Orchestration

| Removed File | Replacement |
|--------------|-------------|
| `MultiAgentOrchestratorPage.jsx` | `/orchestration/builder` |

#### 7. Scheduler Folder (1 file)
**Reason:** Replaced by Scheduling

| Removed File | Replacement |
|--------------|-------------|
| `AgentSchedulerPage.jsx` | `/scheduling/jobs` |

#### 8. Integration Folder (1 file, singular)
**Reason:** Merged into Integrations

| Removed File | Replacement |
|--------------|-------------|
| `AgentIntegrationPage.jsx` | `/integrations/browse` |

#### 9. Workflow Folder (3 files)
**Reason:** Duplicate of Orchestration

| Removed File | Replacement |
|--------------|-------------|
| `WorkflowListPage.jsx` | `/orchestration/workflows` |
| `WorkflowBuilderPage.jsx` | `/orchestration/builder` |
| `WorkflowExecutionPage.jsx` | `/orchestration/history` |

#### 10. Developer Folder (4 files)
**Reason:** Merged into Integrations + AgentX

| Removed File | Replacement |
|--------------|-------------|
| `APIKeysPage.jsx` | `/integrations/api-keys` |
| `WebhooksPage.jsx` | `/integrations/webhooks` |
| `IntegrationsPage.jsx` | `/integrations/browse` |
| `DeveloperDocsPage.jsx` | `/agentx/developer` |

#### Other Duplicates (5 files)

| Removed File | Replacement |
|--------------|-------------|
| `HITL/HITLActivityPage.jsx` | `/hitl/activity-logs` |
| `HITL/HITLQueuePage.jsx` | `/hitl/approval-queue` |
| `Settings/IntegrationsPage.jsx` | `/integrations/browse` |
| `Settings/UsersRolesPage.jsx` | `/team-users/roles` |
| `Billing/BillingPage.jsx` | `/billing/overview` |

### Legacy Routes Removed

```jsx
// Old routes no longer available:
/agent-select           → Use /agentx/marketplace
/submissions/*          → Use /job-flows/*
/evaluations/*          → Use /hitl/activity-logs
/criteria               → Use /settings/rubrics
/marketplace            → Use /agentx/marketplace
/agent/configure/*      → Use /agentx/builder
/orchestrator           → Use /orchestration/builder
/scheduler              → Use /scheduling/jobs
/integration            → Use /integrations/browse
/workflows/*            → Use /orchestration/*
/developer/*            → Use /integrations/*
/agents/all             → Use /agentx/my-agents
/agents/performance     → Use analytics in AgentX
```

---

## Route Hierarchy

### Navigation Structure (Sidebar)

```
Dashboard
│
├── Organization (👥 Org Only)
│   ├── Branches
│   ├── Departments
│   ├── Projects (🔒 All)
│   └── Teams
│
├── AgentX Hub
│   ├── Marketplace
│   ├── My Agents
│   ├── Agent Builder
│   ├── Deploy Agent
│   └── Developer Portal
│
├── Job Flows
│   ├── All Job Flows
│   ├── Job Calendar
│   └── Execution History
│
├── Orchestration
│   ├── Workflows
│   ├── Workflow Builder
│   └── Execution History
│
├── Scheduling
│   ├── Scheduled Jobs
│   ├── Calendar View
│   └── Upcoming Runs
│
├── HITL Framework
│   ├── Approval Queue
│   ├── My Approvals
│   ├── Activity Logs
│   └── Configuration
│
├── Precision AI Engines
│   ├── Overview
│   ├── Vision Engine
│   ├── Audio Engine
│   ├── Text Engine
│   ├── Code Engine
│   ├── Document Engine
│   ├── Data Engine
│   └── Web Engine
│
├── Integrations
│   ├── Connected Apps
│   ├── API Keys
│   ├── Webhooks
│   └── Browse Integrations
│
├── Team & Users (👥 Org Only)
│   ├── All Users
│   ├── Invite Users
│   ├── Roles & Permissions
│   └── User Activity
│
├── Billing & Usage
│   ├── Overview
│   ├── Subscription
│   ├── Usage Reports
│   └── Invoices
│
└── Settings
    ├── Tenant Settings
    ├── Rubrics
    ├── Security
    └── Notifications
```

---

## File Structure

```
src/pages/
├── Admin/                      # Tenant & System Admin
│   ├── AdminDashboardPage.jsx
│   ├── UserManagementPage.jsx
│   ├── AnalyticsPage.jsx
│   ├── N8nWebhookManagementPage.jsx
│   ├── TenantsManagementPage.jsx
│   ├── EngineManagementPage.jsx
│   ├── AgentsManagementPage.jsx
│   ├── ActiveAgentsMonitorPage.jsx
│   └── IntegrationManagementPage.jsx
│
├── AgentX/                     # Agent Hub (NEW)
│   ├── MarketplacePage.jsx
│   ├── MyAgentsPage.jsx
│   ├── AgentBuilderPage.jsx
│   ├── PrivateAgentsPage.jsx
│   └── DeveloperPortalPage.jsx
│
├── Auth/                       # Authentication
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── ForgotPasswordPage.jsx
│   └── ResetPasswordPage.jsx
│
├── Billing/                    # Billing & Subscriptions
│   ├── BillingOverviewPage.jsx
│   ├── SubscriptionPage.jsx
│   ├── UsageReportsPage.jsx
│   └── InvoicesPage.jsx
│
├── Dashboard/                  # Main Dashboard
│   └── DashboardPage.jsx
│
├── Engines/                    # Precision AI Engines
│   ├── EnginesOverviewPage.jsx
│   ├── VisionEnginePage.jsx
│   ├── AudioEnginePage.jsx
│   ├── TextEnginePage.jsx
│   ├── CodeEnginePage.jsx
│   ├── DocumentEnginePage.jsx
│   ├── DataEnginePage.jsx
│   └── WebEnginePage.jsx
│
├── HITL/                       # Human-in-the-Loop
│   ├── OversightModesPage.jsx
│   ├── ApprovalQueuePage.jsx
│   ├── MyApprovalsPage.jsx
│   ├── ApprovalWorkflowsPage.jsx
│   ├── ActivityLogsPage.jsx
│   └── HITLConfigurationPage.jsx
│
├── Home/                       # Landing Page
│   └── HomePage.jsx
│
├── Integrations/               # API & Integrations
│   ├── ConnectedAppsPage.jsx
│   ├── APIKeysPage.jsx
│   ├── WebhooksPage.jsx
│   └── BrowseIntegrationsPage.jsx
│
├── JobFlows/                   # Job Management (NEW)
│   ├── JobFlowsListPage.jsx
│   ├── JobCalendarPage.jsx
│   └── ExecutionHistoryPage.jsx
│
├── Orchestration/              # Multi-Agent Workflows
│   ├── WorkflowsPage.jsx
│   ├── WorkflowBuilderPage.jsx
│   └── ExecutionHistoryPage.jsx
│
├── Organization/               # Organization Structure
│   ├── BranchesPage.jsx
│   ├── BranchDetailsPage.jsx
│   ├── DepartmentsPage.jsx
│   ├── ProjectsPage.jsx
│   └── TeamsPage.jsx
│
├── Profile/                    # User Profile
│   ├── ProfilePage.jsx
│   └── NotificationsPage.jsx
│
├── Scheduling/                 # Scheduled Jobs
│   ├── ScheduledJobsPage.jsx
│   ├── CalendarViewPage.jsx
│   └── UpcomingRunsPage.jsx
│
├── Settings/                   # Settings
│   ├── TenantSettingsPage.jsx
│   ├── RubricsPage.jsx
│   ├── SecurityPage.jsx
│   └── NotificationsPage.jsx
│
├── Team/                       # Team & Users
│   ├── AllUsersPage.jsx
│   ├── InviteUserPage.jsx
│   ├── RolesPermissionsPage.jsx
│   └── UserActivityPage.jsx
│
├── NotFoundPage.jsx            # 404 Page
└── APITestPage.jsx             # API Testing (Dev only)
```

---

## Key Changes Summary

### What Changed (v1.0 → v2.0)

1. **"Marketplace" → "AgentX Hub"**
   - Clearer branding
   - Emphasizes monetization opportunity
   - Consolidated agent management

2. **"Submissions" → "Job Flows"**
   - Better describes functionality
   - Aligns with industry terminology
   - Clear distinction from evaluations

3. **"Evaluations" → "HITL Framework"**
   - Emphasizes human oversight
   - Clearer purpose
   - Modern terminology

4. **Consolidated Folders**
   - Developer → Integrations
   - Workflow → Orchestration
   - Multiple Agent folders → AgentX

5. **Removed 31 Duplicate/Legacy Pages**
   - Reduced codebase by ~12,700 lines
   - Bundle size reduced by 388 KB
   - Clearer architecture

---

## Development Notes

### Adding New Pages

1. **Create page file** in appropriate folder
2. **Add route** in `src/router/routes.jsx`
3. **Add to App.jsx** if using App.jsx routing
4. **Update Sidebar** navigation in `src/components/layout/Sidebar/Sidebar.jsx`
5. **Update this documentation**

### Protected Route Wrapper

```jsx
<Route
  path="/your-page"
  element={
    <ProtectedRoute requireAdmin> {/* Optional: requireAdmin */}
      <YourPage />
    </ProtectedRoute>
  }
/>
```

### Redirect Examples

```jsx
// Backward compatibility redirect
<Route
  path="/old-route"
  element={<Navigate to="/new-route" replace />}
/>
```

---

## Common Patterns

### User Type Detection
```jsx
const { user, isAuthenticated } = useAuthStore();

// Check if organization user
const isOrganization = user?.accountType === 'organization';

// Check if personal user
const isPersonal = user?.accountType === 'personal';

// Check if admin
const isAdmin = user?.role === 'tenant_admin';

// Check if system admin
const isSystemAdmin = user?.role === 'system_admin';
```

### Conditional Sidebar Items
```jsx
// Show only for organization users
{isOrganization && (
  <SidebarSection>...</SidebarSection>
)}

// Show for all authenticated users
{isAuthenticated && (
  <SidebarSection>...</SidebarSection>
)}
```

---

## Maintenance Checklist

When modifying pages:

- [ ] Update this documentation
- [ ] Check for broken links in other components
- [ ] Update navigation/sidebar if needed
- [ ] Add redirects for backward compatibility
- [ ] Update TypeScript types if applicable
- [ ] Test with different user types (personal, org, admin)
- [ ] Run build to check for errors
- [ ] Update any related tests

---

## Support & Contact

For questions about this architecture:
- Check the codebase documentation
- Review git commit history
- Consult the team lead

**Last Major Refactor:** 2025-11-19 (Legacy cleanup)
