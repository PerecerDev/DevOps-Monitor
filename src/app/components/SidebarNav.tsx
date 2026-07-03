import { Link, useLocation } from 'react-router-dom';

import { mainNavItems, secondaryNavItems } from '@/app/config/navigation';
import { useLayoutStore } from '@/shared/stores/layoutStore';
import { cn } from '@/shared/utils';

export function SidebarNav() {
  const location = useLocation();
  const collapsed = useLayoutStore((s) => s.sidebarCollapsed);

  return (
    <nav className="flex flex-1 flex-col gap-1 px-2 py-4" aria-label="Main navigation">
      <NavGroup items={mainNavItems} pathname={location.pathname} collapsed={collapsed} />
      <div className="my-2 border-t border-sidebar-border" />
      <NavGroup items={secondaryNavItems} pathname={location.pathname} collapsed={collapsed} />
    </nav>
  );
}

function NavGroup({
  items,
  pathname,
  collapsed,
}: {
  items: typeof mainNavItems;
  pathname: string;
  collapsed: boolean;
}) {
  return (
    <ul className="flex flex-col gap-0.5">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <li key={item.href}>
            <Link
              to={item.href}
              aria-current={isActive ? 'page' : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground',
                collapsed && 'justify-center px-2',
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge !== undefined && (
                <span className="ml-auto rounded-full bg-destructive px-1.5 py-0.5 text-xs text-destructive-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
