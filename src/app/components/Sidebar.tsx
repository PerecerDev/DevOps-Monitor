import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

import { SidebarNav } from '@/app/components/SidebarNav';
import { useLayoutStore } from '@/shared/stores/layoutStore';
import { cn } from '@/shared/utils';

export function Sidebar() {
  const collapsed = useLayoutStore((s) => s.sidebarCollapsed);

  return (
    <aside
      className={cn(
        'hidden h-full flex-col border-r border-sidebar-border bg-sidebar md:flex',
        collapsed ? 'w-16' : 'w-60',
        'transition-[width] duration-200',
      )}
      aria-label="Sidebar"
    >
      <div className={cn('flex h-14 items-center border-b border-sidebar-border px-4', collapsed && 'justify-center px-2')}>
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-sidebar-accent-foreground">
          <div className="flex size-8 items-center justify-center rounded-lg bg-accent">
            <Activity className="size-4 text-accent-foreground" aria-hidden="true" />
          </div>
          {!collapsed && <span className="text-sm">DevOps Monitor</span>}
        </Link>
      </div>
      <SidebarNav />
    </aside>
  );
}

export function MobileSidebar() {
  const open = useLayoutStore((s) => s.mobileSidebarOpen);
  const setOpen = useLayoutStore((s) => s.setMobileSidebarOpen);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
        onClick={() => {
          setOpen(false);
        }}
        aria-hidden="true"
      />
      <aside
        className="fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-sidebar-border bg-sidebar md:hidden"
        aria-label="Mobile sidebar"
      >
        <div className="flex h-14 items-center border-b border-sidebar-border px-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 font-semibold"
            onClick={() => {
              setOpen(false);
            }}
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-accent">
              <Activity className="size-4 text-accent-foreground" aria-hidden="true" />
            </div>
            <span className="text-sm">DevOps Monitor</span>
          </Link>
        </div>
        <div
          onClick={() => {
            setOpen(false);
          }}
        >
          <SidebarNav />
        </div>
      </aside>
    </>
  );
}
