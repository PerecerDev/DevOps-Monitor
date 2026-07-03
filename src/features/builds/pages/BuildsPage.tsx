import { BuildStatusBadge, ErrorState, Skeleton } from '@/shared/components/ui';
import { useBuilds, useProjects } from '@/shared/hooks/useQueries';
import { formatCommitSha, formatDuration, formatRelativeTime } from '@/shared/utils';

export function BuildsPage() {
  const { data: builds, isLoading, isError, refetch } = useBuilds();
  const { data: projects } = useProjects();

  const getProjectName = (projectId: string) =>
    projects?.find((p) => p.id === projectId)?.name ?? projectId;

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Builds</h1>
        <p className="mt-1 text-muted">Build history, status, and duration across all projects</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-elevated text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Branch</th>
              <th className="px-4 py-3 font-medium">Commit</th>
              <th className="px-4 py-3 font-medium">Message</th>
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
              : builds?.map((b) => (
                  <tr key={b.id} className="hover:bg-surface-elevated/50">
                    <td className="px-4 py-3 font-medium">{getProjectName(b.projectId)}</td>
                    <td className="px-4 py-3 font-mono text-xs">{b.branch}</td>
                    <td className="px-4 py-3 font-mono text-xs">{formatCommitSha(b.commitSha)}</td>
                    <td className="max-w-xs truncate px-4 py-3">{b.commitMessage}</td>
                    <td className="px-4 py-3 text-muted">{formatRelativeTime(b.startedAt)}</td>
                    <td className="px-4 py-3 text-muted">
                      {b.durationMs ? formatDuration(b.durationMs) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <BuildStatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
