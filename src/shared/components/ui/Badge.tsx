import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface-elevated text-foreground',
        success:
          'border-success/30 bg-success/10 text-success dark:text-success-foreground',
        warning:
          'border-warning/30 bg-warning/10 text-warning-foreground',
        destructive:
          'border-destructive/30 bg-destructive/10 text-destructive',
        info: 'border-info/30 bg-info/10 text-info',
        outline: 'border-border text-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
