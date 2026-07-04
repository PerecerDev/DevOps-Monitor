import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef, useState } from 'react';

import { Input, Skeleton } from '@/shared/components/ui';
import type { LogEntry, LogLevel } from '@/shared/types';
import { cn } from '@/shared/utils';

import { LOG_LEVELS, levelTextColors, LogLevelBadge } from './LogLevelBadge';

const ROW_HEIGHT = 28;
const OVERSCAN = 10;

interface LogViewerProps {
  logs: LogEntry[];
  isLoading?: boolean;
  className?: string;
  height?: number;
  highlightId?: string;
}

export function LogViewer({
  logs,
  isLoading = false,
  className,
  height = 560,
  highlightId,
}: LogViewerProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [activeLevels, setActiveLevels] = useState<Set<LogLevel>>(
    () => new Set(LOG_LEVELS),
  );

  const filteredLogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return logs.filter((log) => {
      if (!activeLevels.has(log.level)) return false;
      if (!q) return true;
      return (
        log.message.toLowerCase().includes(q) ||
        log.source.toLowerCase().includes(q) ||
        log.level.toLowerCase().includes(q)
      );
    });
  }, [logs, search, activeLevels]);

  const virtualizer = useVirtualizer({
    count: filteredLogs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
  });

  const toggleLevel = (level: LogLevel) => {
    setActiveLevels((prev) => {
      const next = new Set(prev);
      if (next.has(level)) {
        if (next.size > 1) next.delete(level);
      } else {
        next.add(level);
      }
      return next;
    });
  };

  if (isLoading) {
    return (
      <div className={cn('space-y-3', className)}>
        <Skeleton className="h-9 w-full max-w-sm" />
        <Skeleton className="w-full rounded-lg" style={{ height: `${String(height)}px` }} />
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by log level">
          {LOG_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => {
                toggleLevel(level);
              }}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
                activeLevels.has(level)
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-surface text-muted hover:bg-surface-elevated',
              )}
              aria-pressed={activeLevels.has(level)}
            >
              {level}
            </button>
          ))}
        </div>
        <Input
          placeholder="Search logs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="max-w-xs font-mono text-xs"
          aria-label="Search logs"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          {String(filteredLogs.length)} of {String(logs.length)} entries
        </span>
        {search && <span>Filtered by &quot;{search}&quot;</span>}
      </div>

      <div
        ref={parentRef}
        className="overflow-auto rounded-lg border border-border bg-surface-elevated font-mono text-xs dark:bg-[oklch(0.11_0.014_247)]"
        style={{ height: `${String(height)}px` }}
        role="log"
        aria-label="Application logs"
        aria-live="polite"
      >
        {filteredLogs.length === 0 ? (
          <div className="flex h-full items-center justify-center text-muted">
            No logs match the current filters
          </div>
        ) : (
          <div
            style={{
              height: `${String(virtualizer.getTotalSize())}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const log = filteredLogs[virtualRow.index];
              const isHighlighted = log.id === highlightId;

              return (
                <div
                  key={log.id}
                  data-index={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${String(virtualRow.start)}px)`,
                  }}
                  className={cn(
                    'flex items-center gap-3 border-b border-border/30 px-3',
                    isHighlighted && 'bg-accent/20',
                    'hover:bg-white/5',
                  )}
                >
                  <time
                    className="w-16 shrink-0 text-muted"
                    dateTime={log.timestamp}
                  >
                    {new Date(log.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </time>
                  <LogLevelBadge level={log.level} />
                  <span className="w-24 shrink-0 truncate text-muted">{log.source}</span>
                  <span className={cn('min-w-0 flex-1 truncate', levelTextColors[log.level])}>
                    {log.message}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
