import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const queryKeys = {
  dashboard: {
    stats: ['dashboard', 'stats'] as const,
    activity: ['dashboard', 'activity'] as const,
  },
  projects: {
    all: ['projects'] as const,
    detail: (id: string) => ['projects', id] as const,
  },
  deployments: {
    all: ['deployments'] as const,
    byProject: (projectId: string) => ['deployments', 'project', projectId] as const,
    detail: (id: string) => ['deployments', id] as const,
  },
  builds: {
    all: ['builds'] as const,
    byProject: (projectId: string) => ['builds', 'project', projectId] as const,
  },
  pipelines: {
    all: ['pipelines'] as const,
    byProject: (projectId: string) => ['pipelines', 'project', projectId] as const,
  },
  alerts: {
    all: ['alerts'] as const,
    open: ['alerts', 'open'] as const,
  },
  metrics: {
    byProject: (projectId: string) => ['metrics', 'project', projectId] as const,
  },
  auth: {
    session: ['auth', 'session'] as const,
  },
} as const;
