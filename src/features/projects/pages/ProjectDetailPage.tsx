import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import {
  DeploymentStatusBadge,
  ErrorState,
  HealthStatusBadge,
  Skeleton,
} from '@/shared/components/ui';
import {
  useProject,
  useProjectDeployments,
  useProjectMetrics,
} from '@/shared/hooks/useQueries';
import { formatRelativeTime } from '@/shared/utils';

export function ProjectDetailPage() {
  const { projectId = '' } = useParams();
  const projectQuery = useProject(projectId);
  const deploymentsQuery = useProjectDeployments(projectId);
  const metricsQuery = useProjectMetrics(projectId);

  if (projectQuery.isError) {
    return <ErrorState onRetry={() => void projectQuery.refetch()} />;
  }

  if (projectQuery.isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const project = projectQuery.data;
  if (!project) {
    return <ErrorState title="Project not found" message="The requested project does not exist." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/projects"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to projects
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
            <p className="mt-1 text-muted">{project.description}</p>
          </div>
          <HealthStatusBadge status={project.healthStatus} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Environment" value={project.environment} />
        <Stat label="Created" value={formatRelativeTime(project.createdAt)} />
        <Stat label="Metrics" value={`${String(metricsQuery.data?.length ?? 0)} series`} />
      </div>

      <section>
        <h2 className="mb-4 text-lg font-medium">Recent Deployments</h2>
        {deploymentsQuery.isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : deploymentsQuery.data?.length === 0 ? (
          <p className="text-sm text-muted">No deployments for this project</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-elevated text-left text-xs text-muted">
                  <th className="px-4 py-3 font-medium">Version</th>
                  <th className="px-4 py-3 font-medium">Environment</th>
                  <th className="px-4 py-3 font-medium">Started</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {deploymentsQuery.data?.map((d) => (
                  <tr key={d.id} className="hover:bg-surface-elevated/50">
                    <td className="px-4 py-3 font-medium">{d.version}</td>
                    <td className="px-4 py-3 capitalize">{d.environment}</td>
                    <td className="px-4 py-3 text-muted">{formatRelativeTime(d.startedAt)}</td>
                    <td className="px-4 py-3">
                      <DeploymentStatusBadge status={d.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold capitalize">{value}</p>
    </div>
  );
}
