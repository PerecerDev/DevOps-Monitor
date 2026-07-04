import { Badge } from '@/shared/components/ui/Badge';
import type { LogLevel } from '@/shared/types';
import { cn } from '@/shared/utils';

const levelConfig: Record<
  LogLevel,
  { label: string; variant: 'default' | 'info' | 'warning' | 'destructive' | 'outline' }
> = {
  debug: { label: 'DEBUG', variant: 'outline' },
  info: { label: 'INFO', variant: 'info' },
  warn: { label: 'WARN', variant: 'warning' },
  error: { label: 'ERROR', variant: 'destructive' },
  fatal: { label: 'FATAL', variant: 'destructive' },
};

interface LogLevelBadgeProps {
  level: LogLevel;
  className?: string;
}

export function LogLevelBadge({ level, className }: LogLevelBadgeProps) {
  const config = levelConfig[level];
  return (
    <Badge
      variant={config.variant}
      className={cn('min-w-[52px] justify-center font-mono text-[10px]', className)}
      aria-label={`Log level: ${config.label}`}
    >
      {config.label}
    </Badge>
  );
}

export const LOG_LEVELS: LogLevel[] = ['debug', 'info', 'warn', 'error', 'fatal'];

export const levelTextColors: Record<LogLevel, string> = {
  debug: 'text-muted',
  info: 'text-foreground',
  warn: 'text-warning-foreground',
  error: 'text-destructive',
  fatal: 'text-destructive font-semibold',
};
