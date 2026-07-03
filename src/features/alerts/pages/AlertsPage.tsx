import {
  AlertSeverityBadge,
  AlertStatusBadge,
  ErrorState,
  Skeleton,
} from '@/shared/components/ui';
import { useAlerts, useProjects } from '@/shared/hooks/useQueries';
import { formatRelativeTime } from '@/shared/utils';

export function AlertsPage() {
  const { data: alerts, isLoading, isError, refetch } = useAlerts();
  const { data: projects } = useProjects();

  const getProjectName = (projectId: string) =>
    projects?.find((p) => p.id === projectId)?.name ?? projectId;

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Alerts</h1>
        <p className="mt-1 text-muted">Monitor and manage system alerts across projects</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-elevated text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Severity</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Triggered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="px-4 py-3">
                      <Skeleton className="h-6 w-full" />
                    </td>
                  </tr>
                ))
              : alerts?.map((alert) => (
                  <tr key={alert.id} className="hover:bg-surface-elevated/50">
                    <td className="px-4 py-3">
                      <p className="font-medium">{alert.title}</p>
                      {alert.description && (
                        <p className="mt-0.5 max-w-md truncate text-xs text-muted">
                          {alert.description}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">{getProjectName(alert.projectId)}</td>
                    <td className="px-4 py-3 font-mono text-xs">{alert.source}</td>
                    <td className="px-4 py-3">
                      <AlertSeverityBadge severity={alert.severity} />
                    </td>
                    <td className="px-4 py-3">
                      <AlertStatusBadge status={alert.status} />
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {formatRelativeTime(alert.triggeredAt)}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
