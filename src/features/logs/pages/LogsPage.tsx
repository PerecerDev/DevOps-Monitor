import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LogViewer } from '@/shared/components/logs';
import { ErrorState } from '@/shared/components/ui';
import { useLogs, useProjects } from '@/shared/hooks/useQueries';

export function LogsPage() {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight') ?? undefined;
  const projectFilter = searchParams.get('project') ?? undefined;

  const { data: logs = [], isLoading, isError, refetch } = useLogs();
  const { data: projects } = useProjects();

  const filteredLogs = useMemo(() => {
    if (!projectFilter) return logs;
    return logs.filter((l) => l.projectId === projectFilter);
  }, [logs, projectFilter]);

  const projectName = projects?.find((p) => p.id === projectFilter)?.name;

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Logs</h1>
        <p className="mt-1 text-muted">
          {projectName
            ? `Log stream for ${projectName}`
            : 'Application logs across all projects and services'}
        </p>
      </div>

      <LogViewer
        logs={filteredLogs}
        isLoading={isLoading}
        highlightId={highlightId}
        height={600}
      />
    </div>
  );
}
