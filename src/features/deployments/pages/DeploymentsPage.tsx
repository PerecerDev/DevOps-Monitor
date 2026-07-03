import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataTable } from '@/shared/components/tables/DataTable';
import { DeploymentStatusBadge, ErrorState } from '@/shared/components/ui';
import { useDeployments, useProjects } from '@/shared/hooks/useQueries';
import type { Deployment } from '@/shared/types';
import { formatCommitSha, formatDuration, formatRelativeTime } from '@/shared/utils';

const columnHelper = createColumnHelper<Deployment>();

export function DeploymentsPage() {
  const navigate = useNavigate();
  const { data: deployments = [], isLoading, isError, refetch } = useDeployments();
  const { data: projects } = useProjects();

  const projectMap = useMemo(
    () => new Map(projects?.map((p) => [p.id, p.name]) ?? []),
    [projects],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('projectId', {
        header: 'Project',
        cell: (info) => projectMap.get(info.getValue()) ?? info.getValue(),
      }),
      columnHelper.accessor('version', { header: 'Version' }),
      columnHelper.accessor('environment', {
        header: 'Environment',
        cell: (info) => <span className="capitalize">{info.getValue()}</span>,
      }),
      columnHelper.accessor('commitSha', {
        header: 'Commit',
        cell: (info) => (
          <span className="font-mono text-xs">{formatCommitSha(info.getValue())}</span>
        ),
      }),
      columnHelper.accessor('startedAt', {
        header: 'Started',
        cell: (info) => (
          <span className="text-muted">{formatRelativeTime(info.getValue())}</span>
        ),
        sortingFn: 'datetime',
      }),
      columnHelper.accessor('durationMs', {
        header: 'Duration',
        cell: (info) => {
          const ms = info.getValue();
          return <span className="text-muted">{ms ? formatDuration(ms) : '—'}</span>;
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => <DeploymentStatusBadge status={info.getValue()} />,
      }),
    ],
    [projectMap],
  ) as ColumnDef<Deployment>[];

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Deployments</h1>
        <p className="mt-1 text-muted">Track deployment history and status across all projects</p>
      </div>

      <DataTable
        columns={columns}
        data={deployments}
        isLoading={isLoading}
        searchPlaceholder="Search deployments..."
        emptyMessage="No deployments found"
        onRowClick={(row) => {
          void navigate(`/deployments/${row.id}`);
        }}
      />
    </div>
  );
}
