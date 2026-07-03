import { simulateNetworkDelay } from '@/shared/lib/mockDelay';
import {
  mockActivity,
  mockAlerts,
  mockBuilds,
  mockDashboardStats,
  mockDeployments,
  mockMetrics,
  mockPipelines,
  mockProjects,
} from '@/shared/mocks/data';
import type {
  ActivityEvent,
  Alert,
  Build,
  DashboardStats,
  Deployment,
  MetricSeries,
  Pipeline,
  Project,
} from '@/shared/types';

export const dashboardService = {
  getStats: (): Promise<DashboardStats> => simulateNetworkDelay(mockDashboardStats),
  getRecentActivity: (): Promise<ActivityEvent[]> =>
    simulateNetworkDelay(mockActivity.slice(0, 8)),
};

export const projectService = {
  getAll: (): Promise<Project[]> => simulateNetworkDelay(mockProjects),
  getById: (id: string): Promise<Project | undefined> =>
    simulateNetworkDelay(mockProjects.find((p) => p.id === id)),
};

export const deploymentService = {
  getAll: (): Promise<Deployment[]> => simulateNetworkDelay(mockDeployments),
  getByProject: (projectId: string): Promise<Deployment[]> =>
    simulateNetworkDelay(mockDeployments.filter((d) => d.projectId === projectId)),
  getById: (id: string): Promise<Deployment | undefined> =>
    simulateNetworkDelay(mockDeployments.find((d) => d.id === id)),
};

export const buildService = {
  getAll: (): Promise<Build[]> => simulateNetworkDelay(mockBuilds),
  getByProject: (projectId: string): Promise<Build[]> =>
    simulateNetworkDelay(mockBuilds.filter((b) => b.projectId === projectId)),
};

export const pipelineService = {
  getAll: (): Promise<Pipeline[]> => simulateNetworkDelay(mockPipelines),
  getByProject: (projectId: string): Promise<Pipeline[]> =>
    simulateNetworkDelay(mockPipelines.filter((p) => p.projectId === projectId)),
};

export const alertService = {
  getAll: (): Promise<Alert[]> => simulateNetworkDelay(mockAlerts),
  getOpen: (): Promise<Alert[]> =>
    simulateNetworkDelay(mockAlerts.filter((a) => a.status === 'open')),
};

export const metricsService = {
  getByProject: (projectId: string): Promise<MetricSeries[]> =>
    simulateNetworkDelay(mockMetrics.filter((m) => m.projectId === projectId)),
};
