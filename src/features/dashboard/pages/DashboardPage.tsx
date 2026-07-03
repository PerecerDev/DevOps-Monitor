import {
  AlertTriangle,
  Box,
  CheckCircle2,
  Clock,
  Rocket,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  AlertSeverityBadge,
  BuildStatusBadge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DeploymentStatusBadge,
  ErrorState,
  Skeleton,
} from '@/shared/components/ui';
import {
  useAlerts,
  useBuilds,
  useDashboardStats,
  useDeployments,
  useRecentActivity,
} from '@/shared/hooks/useQueries';
import { mockUsers } from '@/shared/mocks/data';
import type { Build, Deployment } from '@/shared/types';
import { formatDuration, formatRelativeTime } from '@/shared/utils';

export function DashboardPage() {
  const statsQuery = useDashboardStats();
  const activityQuery = useRecentActivity();
  const deploymentsQuery = useDeployments();
  const buildsQuery = useBuilds();
  const alertsQuery = useAlerts();

  if (statsQuery.isError) {
    return <ErrorState onRetry={() => void statsQuery.refetch()} />;
  }

  const stats = statsQuery.data;
  const recentDeployments = deploymentsQuery.data?.slice(0, 5) ?? [];
  const recentBuilds = buildsQuery.data?.slice(0, 5) ?? [];
  const openAlerts = alertsQuery.data?.filter((a) => a.status === 'open').slice(0, 4) ?? [];

  const chartData = Array.from({ length: 12 }, (_, i) => ({
    hour: `${String(i * 2)}h`,
    requests: Math.round(800 + Math.random() * 600),
    errors: Math.round(Math.random() * 15),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your projects, deployments, and system health"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Projects"
          value={stats?.totalProjects}
          subtitle={`${String(stats?.healthyProjects ?? 0)} healthy`}
          icon={Box}
          loading={statsQuery.isLoading}
        />
        <MetricCard
          title="Active Deployments"
          value={stats?.activeDeployments}
          subtitle="In progress now"
          icon={Rocket}
          loading={statsQuery.isLoading}
        />
        <MetricCard
          title="Failed Builds (24h)"
          value={stats?.failedBuilds24h}
          subtitle="Requires attention"
          icon={AlertTriangle}
          loading={statsQuery.isLoading}
          variant="warning"
        />
        <MetricCard
          title="Open Alerts"
          value={stats?.openAlerts}
          subtitle={`Avg deploy ${stats ? formatDuration(stats.avgDeployDurationMs) : '—'}`}
          icon={Clock}
          loading={statsQuery.isLoading}
          variant={stats?.openAlerts ? 'destructive' : 'default'}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-4" aria-hidden="true" />
              Request throughput (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64" aria-label="Request throughput chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="reqGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="var(--color-muted)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted)" />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stroke="var(--color-accent)"
                    fill="url(#reqGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activityQuery.isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {activityQuery.data?.map((event) => {
                  const actor = mockUsers.find((u) => u.id === event.actorId);
                  return (
                    <li key={event.id} className="flex flex-col gap-0.5 border-b border-border pb-3 last:border-0 last:pb-0">
                      <p className="text-sm font-medium leading-snug">{event.title}</p>
                      <p className="text-xs text-muted">
                        {actor?.name ?? 'System'} · {formatRelativeTime(event.createdAt)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Deployments</CardTitle>
            <Link to="/deployments" className="text-sm text-accent hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <DeploymentList deployments={recentDeployments} loading={deploymentsQuery.isLoading} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Open Alerts</CardTitle>
            <Link to="/alerts" className="text-sm text-accent hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {alertsQuery.isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : openAlerts.length === 0 ? (
              <div className="flex items-center gap-2 py-4 text-sm text-muted">
                <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
                No open alerts
              </div>
            ) : (
              <ul className="space-y-3">
                {openAlerts.map((alert) => (
                  <li key={alert.id} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted">{formatRelativeTime(alert.triggeredAt)}</p>
                    </div>
                    <AlertSeverityBadge severity={alert.severity} />
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Builds</CardTitle>
          <Link to="/builds" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </CardHeader>
        <CardContent>
          <BuildList builds={recentBuilds} loading={buildsQuery.isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}

function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1 text-muted">{description}</p>
    </div>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  loading,
  variant = 'default',
}: {
  title: string;
  value?: number;
  subtitle: string;
  icon: typeof Box;
  loading?: boolean;
  variant?: 'default' | 'warning' | 'destructive';
}) {
  const iconColor =
    variant === 'destructive'
      ? 'text-destructive'
      : variant === 'warning'
        ? 'text-warning'
        : 'text-accent';

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted">{title}</p>
          <Icon className={`size-4 ${iconColor}`} aria-hidden="true" />
        </div>
        {loading ? (
          <Skeleton className="mt-2 h-8 w-16" />
        ) : (
          <p className="mt-2 text-3xl font-semibold tabular-nums">{value ?? '—'}</p>
        )}
        <p className="mt-1 text-xs text-muted">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function DeploymentList({
  deployments,
  loading,
}: {
  deployments: Deployment[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (deployments.length === 0) {
    return <p className="text-sm text-muted">No recent deployments</p>;
  }

  return (
    <ul className="divide-y divide-border">
      {deployments.map((d) => (
        <li key={d.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
          <div>
            <p className="text-sm font-medium">{d.version}</p>
            <p className="text-xs text-muted">{formatRelativeTime(d.startedAt)}</p>
          </div>
          <DeploymentStatusBadge status={d.status} />
        </li>
      ))}
    </ul>
  );
}

function BuildList({
  builds,
  loading,
}: {
  builds: Build[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted">
            <th className="pb-3 font-medium">Branch</th>
            <th className="pb-3 font-medium">Commit</th>
            <th className="pb-3 font-medium">Started</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {builds.map((b) => (
            <tr key={b.id}>
              <td className="py-3 font-mono text-xs">{b.branch}</td>
              <td className="max-w-xs truncate py-3">{b.commitMessage}</td>
              <td className="py-3 text-muted">{formatRelativeTime(b.startedAt)}</td>
              <td className="py-3">
                <BuildStatusBadge status={b.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
