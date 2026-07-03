import type {
  AlertSeverity,
  AlertStatus,
  BuildStatus,
  DeploymentStatus,
  PipelineStatus,
  ProjectHealthStatus,
} from '@/shared/types';

import { Badge, type BadgeProps } from './Badge';

type StatusVariant = NonNullable<BadgeProps['variant']>;

const deploymentStatusMap: Record<DeploymentStatus, { label: string; variant: StatusVariant }> = {
  pending: { label: 'Pending', variant: 'outline' },
  in_progress: { label: 'In Progress', variant: 'info' },
  success: { label: 'Success', variant: 'success' },
  failed: { label: 'Failed', variant: 'destructive' },
  rolled_back: { label: 'Rolled Back', variant: 'warning' },
  cancelled: { label: 'Cancelled', variant: 'outline' },
};

const buildStatusMap: Record<BuildStatus, { label: string; variant: StatusVariant }> = {
  queued: { label: 'Queued', variant: 'outline' },
  running: { label: 'Running', variant: 'info' },
  success: { label: 'Success', variant: 'success' },
  failed: { label: 'Failed', variant: 'destructive' },
  cancelled: { label: 'Cancelled', variant: 'outline' },
};

const healthStatusMap: Record<ProjectHealthStatus, { label: string; variant: StatusVariant }> = {
  healthy: { label: 'Healthy', variant: 'success' },
  degraded: { label: 'Degraded', variant: 'warning' },
  down: { label: 'Down', variant: 'destructive' },
  unknown: { label: 'Unknown', variant: 'outline' },
};

const alertSeverityMap: Record<AlertSeverity, { label: string; variant: StatusVariant }> = {
  info: { label: 'Info', variant: 'info' },
  warning: { label: 'Warning', variant: 'warning' },
  critical: { label: 'Critical', variant: 'destructive' },
};

const alertStatusMap: Record<AlertStatus, { label: string; variant: StatusVariant }> = {
  open: { label: 'Open', variant: 'destructive' },
  acknowledged: { label: 'Acknowledged', variant: 'warning' },
  resolved: { label: 'Resolved', variant: 'success' },
};

const pipelineStatusMap: Record<PipelineStatus, { label: string; variant: StatusVariant }> = {
  idle: { label: 'Idle', variant: 'outline' },
  running: { label: 'Running', variant: 'info' },
  success: { label: 'Success', variant: 'success' },
  failed: { label: 'Failed', variant: 'destructive' },
};

interface StatusBadgeProps {
  className?: string;
}

export function DeploymentStatusBadge({
  status,
  className,
}: StatusBadgeProps & { status: DeploymentStatus }) {
  const config = deploymentStatusMap[status];
  return (
    <Badge variant={config.variant} className={className} aria-label={`Status: ${config.label}`}>
      <StatusDot variant={config.variant} />
      {config.label}
    </Badge>
  );
}

export function BuildStatusBadge({ status, className }: StatusBadgeProps & { status: BuildStatus }) {
  const config = buildStatusMap[status];
  return (
    <Badge variant={config.variant} className={className} aria-label={`Status: ${config.label}`}>
      <StatusDot variant={config.variant} />
      {config.label}
    </Badge>
  );
}

export function HealthStatusBadge({
  status,
  className,
}: StatusBadgeProps & { status: ProjectHealthStatus }) {
  const config = healthStatusMap[status];
  return (
    <Badge variant={config.variant} className={className} aria-label={`Health: ${config.label}`}>
      <StatusDot variant={config.variant} />
      {config.label}
    </Badge>
  );
}

export function AlertSeverityBadge({
  severity,
  className,
}: StatusBadgeProps & { severity: AlertSeverity }) {
  const config = alertSeverityMap[severity];
  return (
    <Badge variant={config.variant} className={className} aria-label={`Severity: ${config.label}`}>
      {config.label}
    </Badge>
  );
}

export function AlertStatusBadge({
  status,
  className,
}: StatusBadgeProps & { status: AlertStatus }) {
  const config = alertStatusMap[status];
  return (
    <Badge variant={config.variant} className={className} aria-label={`Status: ${config.label}`}>
      {config.label}
    </Badge>
  );
}

export function PipelineStatusBadge({
  status,
  className,
}: StatusBadgeProps & { status: PipelineStatus }) {
  const config = pipelineStatusMap[status];
  return (
    <Badge variant={config.variant} className={className} aria-label={`Status: ${config.label}`}>
      <StatusDot variant={config.variant} />
      {config.label}
    </Badge>
  );
}

function StatusDot({ variant }: { variant: StatusVariant }) {
  const colorClass = {
    default: 'bg-muted',
    success: 'bg-success',
    warning: 'bg-warning',
    destructive: 'bg-destructive',
    info: 'bg-info',
    outline: 'bg-muted',
  }[variant];

  return (
    <span
      className={`size-1.5 rounded-full ${colorClass}`}
      aria-hidden="true"
    />
  );
}
