import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

import { DataTable } from '@/shared/components/tables/DataTable';
import {
  AlertSeverityBadge,
  AlertStatusBadge,
  ErrorState,
} from '@/shared/components/ui';
import { useAlerts, useProjects } from '@/shared/hooks/useQueries';
import type { Alert } from '@/shared/types';
import { formatRelativeTime } from '@/shared/utils';

const columnHelper = createColumnHelper<Alert>();

export function AlertsPage() {
  const { data: alerts = [], isLoading, isError, refetch } = useAlerts();
  const { data: projects } = useProjects();

  const projectMap = useMemo(
    () => new Map(projects?.map((p) => [p.id, p.name]) ?? []),
    [projects],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Title',
        cell: (info) => {
          const row = info.row.original;
          return (
            <div>
              <p className="font-medium">{info.getValue()}</p>
              {row.description && (
                <p className="mt-0.5 max-w-md truncate text-xs text-muted">{row.description}</p>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor('projectId', {
        header: 'Project',
        cell: (info) => projectMap.get(info.getValue()) ?? info.getValue(),
      }),
      columnHelper.accessor('source', {
        header: 'Source',
        cell: (info) => <span className="font-mono text-xs">{info.getValue()}</span>,
      }),
      columnHelper.accessor('severity', {
        header: 'Severity',
        cell: (info) => <AlertSeverityBadge severity={info.getValue()} />,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => <AlertStatusBadge status={info.getValue()} />,
      }),
      columnHelper.accessor('triggeredAt', {
        header: 'Triggered',
        cell: (info) => (
          <span className="text-muted">{formatRelativeTime(info.getValue())}</span>
        ),
        sortingFn: 'datetime',
      }),
    ],
    [projectMap],
  ) as ColumnDef<Alert>[];

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Alerts</h1>
        <p className="mt-1 text-muted">Monitor and manage system alerts across projects</p>
      </div>

      <DataTable
        columns={columns}
        data={alerts}
        isLoading={isLoading}
        searchPlaceholder="Search alerts..."
        searchColumn="title"
        emptyMessage="No alerts found"
      />
    </div>
  );
}
