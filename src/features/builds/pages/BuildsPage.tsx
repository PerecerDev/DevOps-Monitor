import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

import { DataTable } from '@/shared/components/tables/DataTable';
import { BuildStatusBadge, ErrorState } from '@/shared/components/ui';
import { useBuilds, useProjects } from '@/shared/hooks/useQueries';
import type { Build } from '@/shared/types';
import { formatCommitSha, formatDuration, formatRelativeTime } from '@/shared/utils';

const columnHelper = createColumnHelper<Build>();

export function BuildsPage() {
  const { data: builds = [], isLoading, isError, refetch } = useBuilds();
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
      columnHelper.accessor('branch', {
        header: 'Branch',
        cell: (info) => <span className="font-mono text-xs">{info.getValue()}</span>,
      }),
      columnHelper.accessor('commitSha', {
        header: 'Commit',
        cell: (info) => (
          <span className="font-mono text-xs">{formatCommitSha(info.getValue())}</span>
        ),
      }),
      columnHelper.accessor('commitMessage', {
        header: 'Message',
        cell: (info) => <span className="max-w-xs truncate block">{info.getValue()}</span>,
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
        cell: (info) => <BuildStatusBadge status={info.getValue()} />,
      }),
    ],
    [projectMap],
  ) as ColumnDef<Build>[];

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Builds</h1>
        <p className="mt-1 text-muted">Build history, status, and duration across all projects</p>
      </div>

      <DataTable
        columns={columns}
        data={builds}
        isLoading={isLoading}
        searchPlaceholder="Search builds..."
        searchColumn="branch"
        emptyMessage="No builds found"
      />
    </div>
  );
}
