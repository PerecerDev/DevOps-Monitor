export type UserRole = 'admin' | 'member' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export type ProjectHealthStatus = 'healthy' | 'degraded' | 'down' | 'unknown';
export type ProjectEnvironment = 'production' | 'staging' | 'development';

export interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  repositoryUrl?: string;
  environment: ProjectEnvironment;
  healthStatus: ProjectHealthStatus;
  ownerId: string;
  memberIds: string[];
  createdAt: string;
  updatedAt: string;
}

export type DeploymentStatus =
  | 'pending'
  | 'in_progress'
  | 'success'
  | 'failed'
  | 'rolled_back'
  | 'cancelled';

export interface Deployment {
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

export type BuildStatus = 'queued' | 'running' | 'success' | 'failed' | 'cancelled';

export interface Build {
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

export type PipelineStatus = 'idle' | 'running' | 'success' | 'failed';

export interface PipelineStage {
  id: string;
  name: string;
  status: BuildStatus;
  durationMs?: number;
  order: number;
}

export interface Pipeline {
  id: string;
  projectId: string;
  name: string;
  status: PipelineStatus;
  stages: PipelineStage[];
  lastRunAt?: string;
  createdAt: string;
}

export type AlertSeverity = 'info' | 'warning' | 'critical';
export type AlertStatus = 'open' | 'acknowledged' | 'resolved';

export interface Alert {
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

export type ActivityType = 'deploy' | 'build' | 'commit' | 'alert' | 'rollback' | 'config_change';

export interface ActivityEvent {
  id: string;
  projectId: string;
  type: ActivityType;
  actorId: string;
  title: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface MetricPoint {
  timestamp: string;
  value: number;
}

export interface MetricSeries {
  id: string;
  projectId: string;
  name: string;
  unit: string;
  data: MetricPoint[];
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogEntry {
  id: string;
  projectId: string;
  deploymentId?: string;
  level: LogLevel;
  message: string;
  source: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface DashboardStats {
  totalProjects: number;
  healthyProjects: number;
  activeDeployments: number;
  failedBuilds24h: number;
  openAlerts: number;
  avgDeployDurationMs: number;
}
