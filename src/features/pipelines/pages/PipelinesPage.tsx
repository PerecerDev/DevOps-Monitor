import { BuildStatusBadge, ErrorState, PipelineStatusBadge, Skeleton } from '@/shared/components/ui';
import { usePipelines, useProjects } from '@/shared/hooks/useQueries';
import { formatDuration, formatRelativeTime } from '@/shared/utils';

export function PipelinesPage() {
  const { data: pipelines, isLoading, isError, refetch } = usePipelines();
  const { data: projects } = useProjects();

  const getProjectName = (projectId: string) =>
    projects?.find((p) => p.id === projectId)?.name ?? projectId;

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Pipelines</h1>
        <p className="mt-1 text-muted">CI/CD pipeline status and stage progress</p>
      </div>

      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))
          : pipelines?.map((pipeline) => (
              <div
                key={pipeline.id}
                className="rounded-lg border border-border bg-surface p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">{pipeline.name}</h2>
                    <p className="text-sm text-muted">{getProjectName(pipeline.projectId)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {pipeline.lastRunAt && (
                      <span className="text-xs text-muted">
                        Last run {formatRelativeTime(pipeline.lastRunAt)}
                      </span>
                    )}
                    <PipelineStatusBadge status={pipeline.status} />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {pipeline.stages
                    .sort((a, b) => a.order - b.order)
                    .map((stage, index) => (
                      <div key={stage.id} className="flex items-center gap-2">
                        {index > 0 && (
                          <div className="hidden h-px w-4 bg-border sm:block" aria-hidden="true" />
                        )}
                        <div className="rounded-md border border-border bg-surface-elevated px-3 py-2">
                          <p className="text-xs font-medium">{stage.name}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <BuildStatusBadge status={stage.status} />
                            {stage.durationMs && (
                              <span className="text-xs text-muted">
                                {formatDuration(stage.durationMs)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
