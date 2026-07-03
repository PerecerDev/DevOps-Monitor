import { BuildStatusBadge } from '@/shared/components/ui';
import type { PipelineStage } from '@/shared/types';
import { cn } from '@/shared/utils';

interface PipelineStagesProps {
  stages: PipelineStage[];
  className?: string;
}

export function PipelineStages({ stages, className }: PipelineStagesProps) {
  const sorted = [...stages].sort((a, b) => a.order - b.order);

  return (
    <div className={cn('flex flex-col gap-0 sm:flex-row sm:items-start', className)} role="list">
      {sorted.map((stage, index) => {
        const isLast = index === sorted.length - 1;
        const isActive = stage.status === 'running';
        const isFailed = stage.status === 'failed';

        return (
          <div key={stage.id} className="flex flex-1 flex-col sm:flex-row sm:items-center" role="listitem">
            <div
              className={cn(
                'flex flex-1 flex-col rounded-lg border p-3 transition-colors',
                isActive && 'border-info bg-info/5',
                isFailed && 'border-destructive/50 bg-destructive/5',
                !isActive && !isFailed && 'border-border bg-surface-elevated',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium">{stage.name}</span>
                <span className="text-xs text-muted">#{String(stage.order)}</span>
              </div>
              <div className="mt-2">
                <BuildStatusBadge status={stage.status} />
              </div>
            </div>
            {!isLast && (
              <div
                className="mx-2 hidden h-px flex-1 bg-border sm:block"
                aria-hidden="true"
              />
            )}
            {!isLast && (
              <div className="my-1 ml-4 h-4 w-px bg-border sm:hidden" aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
}
