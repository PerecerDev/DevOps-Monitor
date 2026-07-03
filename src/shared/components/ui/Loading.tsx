import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-border/60', className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export function Spinner({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'size-5 animate-spin rounded-full border-2 border-border border-t-accent',
        className,
      )}
      {...props}
    />
  );
}
