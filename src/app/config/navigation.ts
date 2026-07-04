import { Activity, AlertTriangle, Box, FileText, GitBranch, LayoutDashboard, Rocket, Settings, Wrench } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: number;
}

export const mainNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: Box },
  { label: 'Deployments', href: '/deployments', icon: Rocket },
  { label: 'Builds', href: '/builds', icon: Wrench },
  { label: 'Pipelines', href: '/pipelines', icon: GitBranch },
  { label: 'Logs', href: '/logs', icon: FileText },
  { label: 'Alerts', href: '/alerts', icon: AlertTriangle },
  { label: 'Activity', href: '/activity', icon: Activity },
];

export const secondaryNavItems: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: Settings },
];
