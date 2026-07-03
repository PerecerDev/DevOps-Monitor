import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react';

import { cn } from '@/shared/utils';

export type TimelineEventStatus = 'success' | 'failed' | 'in_progress' | 'pending';

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status: TimelineEventStatus;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const statusConfig: Record<
  TimelineEventStatus,
  { icon: typeof CheckCircle2; className: string; label: string }
> = {
  success: { icon: CheckCircle2, className: 'text-success', label: 'Success' },
  failed: { icon: XCircle, className: 'text-destructive', label: 'Failed' },
  in_progress: { icon: Loader2, className: 'text-info animate-spin', label: 'In progress' },
  pending: { icon: Circle, className: 'text-muted', label: 'Pending' },
};

export function Timeline({ events, className }: TimelineProps) {
  const sorted = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  return (
    <ol className={cn('relative space-y-0', className)} aria-label="Event timeline">
      {sorted.map((event, index) => {
        const config = statusConfig[event.status];
        const Icon = config.icon;
        const isLast = index === sorted.length - 1;

        return (
          <li key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <div
                className="absolute top-8 left-[15px] h-[calc(100%-16px)] w-px bg-border"
                aria-hidden="true"
              />
            )}
            <div
              className={cn(
                'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-elevated ring-2 ring-border',
              )}
            >
              <Icon className={cn('size-4', config.className)} aria-hidden="true" />
              <span className="sr-only">{config.label}</span>
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium">{event.title}</p>
              {event.description && (
                <p className="mt-0.5 text-xs text-muted">{event.description}</p>
              )}
              <time
                className="mt-1 block text-xs text-muted"
                dateTime={event.timestamp}
              >
                {new Date(event.timestamp).toLocaleString()}
              </time>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
