import { mainNavItems, secondaryNavItems } from '@/app/config/navigation';
import { simulateNetworkDelay } from '@/shared/lib/mockDelay';
import {
  mockAlerts,
  mockBuilds,
  mockDeployments,
  mockProjects,
} from '@/shared/mocks/data';
import { mockLogs } from '@/shared/mocks/logs';
import type { SearchResult } from '@/shared/types';

const NAVIGATION_RESULTS: SearchResult[] = [...mainNavItems, ...secondaryNavItems].map(
  (item) => ({
    id: `nav_${item.href}`,
    type: 'navigation' as const,
    title: item.label,
    subtitle: 'Navigate',
    href: item.href,
    keywords: [item.label.toLowerCase(), item.href.replace('/', '')],
  }),
);

function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

export const searchService = {
  async search(query: string): Promise<SearchResult[]> {
    await simulateNetworkDelay(null, 150);

    const trimmed = query.trim();
    if (!trimmed) {
      return NAVIGATION_RESULTS;
    }

    const q = trimmed.toLowerCase();
    const results: SearchResult[] = [];

    for (const project of mockProjects) {
      if (
        matchesQuery(project.name, q) ||
        matchesQuery(project.slug, q) ||
        matchesQuery(project.description ?? '', q)
      ) {
        results.push({
          id: `proj_${project.id}`,
          type: 'project',
          title: project.name,
          subtitle: project.description,
          href: `/projects/${project.id}`,
          keywords: [project.slug, project.environment],
        });
      }
    }

    for (const deployment of mockDeployments) {
      if (
        matchesQuery(deployment.version, q) ||
        matchesQuery(deployment.commitMessage, q) ||
        matchesQuery(deployment.environment, q)
      ) {
        const project = mockProjects.find((p) => p.id === deployment.projectId);
        results.push({
          id: `dpl_${deployment.id}`,
          type: 'deployment',
          title: `${deployment.version} — ${deployment.environment}`,
          subtitle: project?.name ?? deployment.commitMessage,
          href: `/deployments/${deployment.id}`,
          keywords: [deployment.commitSha, deployment.status],
        });
      }
    }

    for (const build of mockBuilds) {
      if (
        matchesQuery(build.branch, q) ||
        matchesQuery(build.commitMessage, q) ||
        matchesQuery(build.status, q)
      ) {
        const project = mockProjects.find((p) => p.id === build.projectId);
        results.push({
          id: `bld_${build.id}`,
          type: 'build',
          title: `${build.branch} — ${build.status}`,
          subtitle: project?.name ?? build.commitMessage,
          href: '/builds',
          keywords: [build.commitSha],
        });
      }
    }

    for (const alert of mockAlerts) {
      if (
        matchesQuery(alert.title, q) ||
        matchesQuery(alert.description ?? '', q) ||
        matchesQuery(alert.severity, q)
      ) {
        results.push({
          id: `alt_${alert.id}`,
          type: 'alert',
          title: alert.title,
          subtitle: `${alert.severity} · ${alert.status}`,
          href: '/alerts',
          keywords: [alert.source],
        });
      }
    }

    for (const log of mockLogs) {
      if (
        matchesQuery(log.message, q) ||
        matchesQuery(log.source, q) ||
        matchesQuery(log.level, q)
      ) {
        results.push({
          id: `log_${log.id}`,
          type: 'log',
          title: log.message.slice(0, 80),
          subtitle: `${log.level} · ${log.source}`,
          href: `/logs?highlight=${log.id}`,
          keywords: [log.level, log.source],
        });
        if (results.filter((r) => r.type === 'log').length >= 10) break;
      }
    }

    const navMatches = NAVIGATION_RESULTS.filter(
      (n) =>
        matchesQuery(n.title, q) ||
        n.keywords?.some((k) => matchesQuery(k, q)),
    );

    return [...navMatches, ...results].slice(0, 25);
  },
};
