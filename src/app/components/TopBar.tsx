import {
  Bell,
  LogOut,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sun,
  Monitor,
} from 'lucide-react';

import { useLogout } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/features/auth/stores/authStore';
import { Button } from '@/shared/components/ui';
import { useOpenAlerts } from '@/shared/hooks/useQueries';
import { useLayoutStore } from '@/shared/stores/layoutStore';
import { useThemeStore, type Theme } from '@/shared/stores/themeStore';

interface TopBarProps {
  onOpenCommandPalette?: () => void;
}

export function TopBar({ onOpenCommandPalette }: TopBarProps) {
  const user = useAuthStore((s) => s.user);
  const toggleSidebar = useLayoutStore((s) => s.toggleSidebar);
  const collapsed = useLayoutStore((s) => s.sidebarCollapsed);
  const setMobileOpen = useLayoutStore((s) => s.setMobileSidebarOpen);
  const { theme, setTheme } = useThemeStore();
  const logout = useLogout();
  const { data: openAlerts } = useOpenAlerts();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-surface/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => {
          setMobileOpen(true);
        }}
        aria-label="Open navigation menu"
      >
        <Menu className="size-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="hidden md:inline-flex"
        onClick={toggleSidebar}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-5" />}
      </Button>

      <button
        type="button"
        onClick={onOpenCommandPalette}
        className="flex h-9 flex-1 max-w-md items-center gap-2 rounded-md border border-border bg-surface-elevated px-3 text-sm text-muted transition-colors hover:bg-border/30"
        aria-label="Open command palette"
      >
        <Search className="size-4 shrink-0" aria-hidden="true" />
        <span>Search...</span>
        <kbd className="ml-auto hidden rounded border border-border bg-surface px-1.5 py-0.5 text-xs font-mono sm:inline">
          ⌘K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle theme={theme} onChange={setTheme} />

        <Button variant="ghost" size="icon" className="relative" aria-label={`${String(openAlerts?.length ?? 0)} open alerts`}>
          <Bell className="size-5" />
          {(openAlerts?.length ?? 0) > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
              {openAlerts?.length}
            </span>
          )}
        </Button>

        <div className="relative ml-2 flex items-center gap-2">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="mt-0.5 text-xs text-muted">{user?.email}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              logout.mutate();
            }}
            aria-label="Sign out"
            disabled={logout.isPending}
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function ThemeToggle({ theme, onChange }: { theme: Theme; onChange: (t: Theme) => void }) {
  const cycleTheme = () => {
    const order: Theme[] = ['light', 'dark', 'system'];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    onChange(next);
  };

  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;
  const label = theme === 'dark' ? 'Dark mode' : theme === 'light' ? 'Light mode' : 'System theme';

  return (
    <Button variant="ghost" size="icon" onClick={cycleTheme} aria-label={`Theme: ${label}. Click to change.`}>
      <Icon className="size-5" />
    </Button>
  );
}
