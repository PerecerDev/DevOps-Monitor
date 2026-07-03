import {
  AlertTriangle,
  GitCommit,
  Rocket,
  RotateCcw,
  Settings,
  Wrench,
} from 'lucide-react';

import { ErrorState, Skeleton } from '@/shared/components/ui';
import { useRecentActivity } from '@/shared/hooks/useQueries';
import { mockProjects, mockUsers } from '@/shared/mocks/data';
import type { ActivityType } from '@/shared/types';
import { formatRelativeTime } from '@/shared/utils';

const activityIcons: Record<ActivityType, typeof Rocket> = {
  deploy: Rocket,
  build: Wrench,
  commit: GitCommit,
  alert: AlertTriangle,
  rollback: RotateCcw,
  config_change: Settings,
};

export function ActivityPage() {
  const { data: activity, isLoading, isError, refetch } = useRecentActivity();

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Activity</h1>
        <p className="mt-1 text-muted">Chronological feed of team and system events</p>
      </div>

      <div className="rounded-lg border border-border bg-surface">
        {isLoading ? (
          <div className="space-y-0 divide-y divide-border p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="my-4 h-12 w-full" />
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {activity?.map((event) => {
              const Icon = activityIcons[event.type];
              const actor = mockUsers.find((u) => u.id === event.actorId);
              const project = mockProjects.find((p) => p.id === event.projectId);

              return (
                <li key={event.id} className="flex gap-4 px-5 py-4 hover:bg-surface-elevated/50">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-elevated">
                    <Icon className="size-4 text-muted" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {actor?.name ?? 'System'}
                      {project && ` · ${project.name}`}
                      {' · '}
                      {formatRelativeTime(event.createdAt)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
