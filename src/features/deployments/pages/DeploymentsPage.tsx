import { ErrorState, DeploymentStatusBadge, Skeleton } from '@/shared/components/ui';
import { useDeployments, useProjects } from '@/shared/hooks/useQueries';
import { formatCommitSha, formatDuration, formatRelativeTime } from '@/shared/utils';

export function DeploymentsPage() {
  const { data: deployments, isLoading, isError, refetch } = useDeployments();
  const { data: projects } = useProjects();

  const getProjectName = (projectId: string) =>
    projects?.find((p) => p.id === projectId)?.name ?? projectId;

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Deployments</h1>
        <p className="mt-1 text-muted">Track deployment history and status across all projects</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-elevated text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Version</th>
              <th className="px-4 py-3 font-medium">Environment</th>
              <th className="px-4 py-3 font-medium">Commit</th>
              <th className="px-4 py-3 font-medium">Started</th>
              <th className="px-4 py-3 font-medium">Duration</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-4 py-3">
                      <Skeleton className="h-6 w-full" />
                    </td>
                  </tr>
                ))
              : deployments?.map((d) => (
                  <tr key={d.id} className="hover:bg-surface-elevated/50">
                    <td className="px-4 py-3 font-medium">{getProjectName(d.projectId)}</td>
                    <td className="px-4 py-3">{d.version}</td>
                    <td className="px-4 py-3 capitalize">{d.environment}</td>
                    <td className="px-4 py-3 font-mono text-xs">{formatCommitSha(d.commitSha)}</td>
                    <td className="px-4 py-3 text-muted">{formatRelativeTime(d.startedAt)}</td>
                    <td className="px-4 py-3 text-muted">
                      {d.durationMs ? formatDuration(d.durationMs) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <DeploymentStatusBadge status={d.status} />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
