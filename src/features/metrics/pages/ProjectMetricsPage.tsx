import { ArrowLeft, BarChart3 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { MetricChart } from '@/shared/components/charts/MetricChart';
import { ErrorState, Skeleton } from '@/shared/components/ui';
import { useProject, useProjectMetrics } from '@/shared/hooks/useQueries';

const CHART_COLORS = [
  'var(--color-accent)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-info)',
];

export function ProjectMetricsPage() {
  const { projectId = '' } = useParams();
  const projectQuery = useProject(projectId);
  const metricsQuery = useProjectMetrics(projectId);

  if (projectQuery.isError || metricsQuery.isError) {
    return (
      <ErrorState
        onRetry={() => {
          void projectQuery.refetch();
          void metricsQuery.refetch();
        }}
      />
    );
  }

  if (projectQuery.isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
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
          to={`/projects/${projectId}`}
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to {project.name}
        </Link>
        <div className="flex items-center gap-3">
          <BarChart3 className="size-6 text-accent" aria-hidden="true" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Metrics</h1>
            <p className="text-muted">{project.name}</p>
          </div>
        </div>
      </div>

      {metricsQuery.isLoading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      ) : metricsQuery.data?.length === 0 ? (
        <p className="text-sm text-muted">No metrics available for this project.</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {metricsQuery.data?.map((series, index) => (
            <MetricChart
              key={series.id}
              title={series.name}
              data={series.data}
              unit={series.unit}
              variant={index % 2 === 0 ? 'area' : 'line'}
              color={CHART_COLORS[index % CHART_COLORS.length]}
              chartId={series.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
