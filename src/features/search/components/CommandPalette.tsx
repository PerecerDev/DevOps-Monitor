import { Command } from 'cmdk';
import {
  AlertTriangle,
  Box,
  FileText,
  LayoutDashboard,
  Rocket,
  Search,
  Wrench,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog, DialogContent } from '@/shared/components/ui/Dialog';
import { useGlobalSearch } from '@/shared/hooks/useQueries';
import type { SearchResult, SearchResultType } from '@/shared/types';
import { cn } from '@/shared/utils';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TYPE_ICONS: Record<SearchResultType, typeof Search> = {
  navigation: LayoutDashboard,
  project: Box,
  deployment: Rocket,
  build: Wrench,
  alert: AlertTriangle,
  log: FileText,
};

const TYPE_LABELS: Record<SearchResultType, string> = {
  navigation: 'Navigation',
  project: 'Projects',
  deployment: 'Deployments',
  build: 'Builds',
  alert: 'Alerts',
  log: 'Logs',
};

const GROUP_ORDER: SearchResultType[] = [
  'navigation',
  'project',
  'deployment',
  'build',
  'alert',
  'log',
];

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { data: results = [], isLoading } = useGlobalSearch(query);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const handleSelect = (href: string) => {
    onOpenChange(false);
    void navigate(href);
  };

  const grouped = GROUP_ORDER.map((type) => ({
    type,
    items: results.filter((r) => r.type === type),
  })).filter((g) => g.items.length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-xl">
        <Command
          className="flex flex-col"
          shouldFilter={false}
          loop
        >
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 size-4 shrink-0 text-muted" aria-hidden="true" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search projects, deployments, logs..."
              className="flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted"
              aria-label="Global search"
            />
            <kbd className="hidden rounded border border-border bg-surface px-1.5 py-0.5 text-xs font-mono text-muted sm:inline">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2">
            {isLoading && (
              <Command.Loading className="py-6 text-center text-sm text-muted">
                Searching...
              </Command.Loading>
            )}

            {!isLoading && grouped.length === 0 && (
              <Command.Empty className="py-6 text-center text-sm text-muted">
                No results found.
              </Command.Empty>
            )}

            {grouped.map(({ type, items }) => (
              <Command.Group
                key={type}
                heading={TYPE_LABELS[type]}
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted"
              >
                {items.map((result) => (
                  <SearchResultItem
                    key={result.id}
                    result={result}
                    onSelect={handleSelect}
                  />
                ))}
              </Command.Group>
            ))}
          </Command.List>

          <div className="flex items-center justify-between border-t border-border px-3 py-2 text-xs text-muted">
            <span>Navigate with ↑↓ · Enter to open</span>
            <span className="hidden sm:inline">⌘K to toggle</span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function SearchResultItem({
  result,
  onSelect,
}: {
  result: SearchResult;
  onSelect: (href: string) => void;
}) {
  const Icon = TYPE_ICONS[result.type];

  return (
    <Command.Item
      value={`${result.id}-${result.title}`}
      onSelect={() => {
        onSelect(result.href);
      }}
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 text-sm',
        'aria-selected:bg-accent aria-selected:text-accent-foreground',
        'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
      )}
    >
      <Icon className="size-4 shrink-0 opacity-70" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{result.title}</p>
        {result.subtitle && (
          <p className="truncate text-xs opacity-70">{result.subtitle}</p>
        )}
      </div>
    </Command.Item>
  );
}
