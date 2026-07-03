# DevOps Monitor — Data Model

Version: 1.0  
Status: Active

---

# Purpose

Defines domain entities, TypeScript types, DTOs, relationships, and mock-data conventions.

This replaces a traditional database schema document: the app is **frontend-first** with mock persistence until a real API is approved.

Precedence: `CONSTITUTION.md` > `PRODUCT_REQUIREMENTS.md` > this document.

---

# Conventions

- All IDs: `string` (UUID format in mocks)
- Timestamps: ISO 8601 strings (`createdAt`, `updatedAt`, `startedAt`, `finishedAt`)
- Enums: string unions in TypeScript, not numeric enums
- Status fields: string unions with semantic mapping to UI badges
- API DTOs mirror domain types unless mapping is required
- Single source of types per entity in feature or `shared/types/domain/`

---

# Core Entities

## User

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'admin' | 'member' | 'viewer';
  createdAt: string;
}
```

## Project

```typescript
interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  repositoryUrl?: string;
  environment: 'production' | 'staging' | 'development';
  healthStatus: 'healthy' | 'degraded' | 'down' | 'unknown';
  ownerId: string;
  memberIds: string[];
  createdAt: string;
  updatedAt: string;
}
```

## Deployment

```typescript
type DeploymentStatus = 'pending' | 'in_progress' | 'success' | 'failed' | 'rolled_back' | 'cancelled';

interface Deployment {
  id: string;
  projectId: string;
  environment: string;
  status: DeploymentStatus;
  version: string;
  commitSha: string;
  commitMessage: string;
  deployedById: string;
  buildId?: string;
  startedAt: string;
  finishedAt?: string;
  durationMs?: number;
  url?: string;
}
```

## Build

```typescript
type BuildStatus = 'queued' | 'running' | 'success' | 'failed' | 'cancelled';

interface Build {
  id: string;
  projectId: string;
  pipelineId: string;
  status: BuildStatus;
  branch: string;
  commitSha: string;
  commitMessage: string;
  triggeredById: string;
  startedAt: string;
  finishedAt?: string;
  durationMs?: number;
}
```

## Pipeline

```typescript
type PipelineStatus = 'idle' | 'running' | 'success' | 'failed';

interface PipelineStage {
  id: string;
  name: string;
  status: BuildStatus;
  durationMs?: number;
  order: number;
}

interface Pipeline {
  id: string;
  projectId: string;
  name: string;
  status: PipelineStatus;
  stages: PipelineStage[];
  lastRunAt?: string;
  createdAt: string;
}
```

## Metric

```typescript
interface MetricPoint {
  timestamp: string;
  value: number;
}

interface MetricSeries {
  id: string;
  projectId: string;
  name: string;
  unit: string;
  data: MetricPoint[];
}
```

## LogEntry

```typescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

interface LogEntry {
  id: string;
  projectId: string;
  deploymentId?: string;
  level: LogLevel;
  message: string;
  source: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}
```

## Alert

```typescript
type AlertSeverity = 'info' | 'warning' | 'critical';
type AlertStatus = 'open' | 'acknowledged' | 'resolved';

interface Alert {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  triggeredAt: string;
  resolvedAt?: string;
  acknowledgedById?: string;
}
```

## ActivityEvent

```typescript
type ActivityType = 'deploy' | 'build' | 'commit' | 'alert' | 'rollback' | 'config_change';

interface ActivityEvent {
  id: string;
  projectId: string;
  type: ActivityType;
  actorId: string;
  title: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}
```

## Notification (future)

```typescript
interface Notification {
  id: string;
  userId: string;
  type: 'alert' | 'deploy' | 'build_failed' | 'system';
  title: string;
  read: boolean;
  createdAt: string;
  metadata?: Record<string, unknown>;
}
```

---

# Relationships

```
User 1 ── * Project (owner)
User * ── * Project (members)
Project 1 ── * Deployment
Project 1 ── * Build
Project 1 ── * Pipeline
Project 1 ── * MetricSeries
Project 1 ── * LogEntry
Project 1 ── * Alert
Project 1 ── * ActivityEvent
Deployment * ── 0..1 Build
Deployment 1 ── * LogEntry
Pipeline 1 ── * Build
```

---

# Dashboard View Model

```typescript
interface DashboardSummary {
  projectId: string;
  healthStatus: Project['healthStatus'];
  activeDeployments: number;
  failedBuilds24h: number;
  openAlerts: number;
  recentActivity: ActivityEvent[];
}
```

---

# Timeline View Model

```typescript
interface TimelineEvent {
  id: string;
  type: ActivityType | 'deployment' | 'alert';
  title: string;
  timestamp: string;
  severity?: AlertSeverity;
  status?: DeploymentStatus | BuildStatus;
  projectId: string;
}
```

---

# API DTO Conventions (Future)

| Operation          | Request                                      | Response       |
| ------------------ | -------------------------------------------- | -------------- |
| List deployments   | `GET /projects/:id/deployments?status=`      | `Deployment[]` |
| List builds        | `GET /projects/:id/builds?branch=`           | `Build[]`      |
| Get metrics        | `GET /projects/:id/metrics?range=`           | `MetricSeries[]` |
| Search logs        | `GET /projects/:id/logs?q=&level=`           | `LogEntry[]`   |

Mock services implement the same method signatures as future HTTP clients.

---

# Mock Persistence

- Initial: in-memory + `localStorage` for demo persistence
- Keys namespaced: `dm_<entity>_<id>`
- Seed data in `shared/mocks/seed.ts`
- Reset utility for development

---

# Indexing / Query Patterns (Logical)

When querying mock collections:

- Deployments by `projectId`, `status`, `environment`
- Builds by `projectId`, `status`, `branch`
- Logs by `projectId`, `level`, `deploymentId`, time range
- Alerts by `projectId`, `severity`, `status`
- Full-text search on logs, commit messages, alert titles

---

# Validation (Zod)

Colocate schemas with features:

- `createProjectSchema`, `acknowledgeAlertSchema`
- Shared primitives in `shared/lib/validation/`

Schemas must stay aligned with types (use `z.infer` or satisfy checks).

---

# Migration Path

When backend is approved:

1. Replace mock service implementations
2. Keep types and DTOs stable
3. Add mapping layer only if API shape differs
4. Document breaking changes in ADR
