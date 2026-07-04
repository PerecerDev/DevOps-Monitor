import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/lib/queryClient';
import {
  alertService,
  buildService,
  dashboardService,
  deploymentService,
  logService,
  metricsService,
  pipelineService,
  projectService,
} from '@/shared/services/mockServices';
import { searchService } from '@/shared/services/searchService';

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats,
    queryFn: dashboardService.getStats,
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: queryKeys.dashboard.activity,
    queryFn: dashboardService.getRecentActivity,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: projectService.getAll,
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => projectService.getById(id),
    enabled: Boolean(id),
  });
}

export function useDeployments() {
  return useQuery({
    queryKey: queryKeys.deployments.all,
    queryFn: deploymentService.getAll,
  });
}

export function useProjectDeployments(projectId: string) {
  return useQuery({
    queryKey: queryKeys.deployments.byProject(projectId),
    queryFn: () => deploymentService.getByProject(projectId),
    enabled: Boolean(projectId),
  });
}

export function useDeployment(id: string) {
  return useQuery({
    queryKey: queryKeys.deployments.detail(id),
    queryFn: () => deploymentService.getById(id),
    enabled: Boolean(id),
  });
}

export function useDeploymentTimeline(id: string) {
  return useQuery({
    queryKey: queryKeys.deployments.timeline(id),
    queryFn: () => deploymentService.getTimeline(id),
    enabled: Boolean(id),
  });
}

export function useBuilds() {
  return useQuery({
    queryKey: queryKeys.builds.all,
    queryFn: buildService.getAll,
  });
}

export function usePipelines() {
  return useQuery({
    queryKey: queryKeys.pipelines.all,
    queryFn: pipelineService.getAll,
  });
}

export function useAlerts() {
  return useQuery({
    queryKey: queryKeys.alerts.all,
    queryFn: alertService.getAll,
  });
}

export function useOpenAlerts() {
  return useQuery({
    queryKey: queryKeys.alerts.open,
    queryFn: alertService.getOpen,
  });
}

export function useProjectMetrics(projectId: string) {
  return useQuery({
    queryKey: queryKeys.metrics.byProject(projectId),
    queryFn: () => metricsService.getByProject(projectId),
    enabled: Boolean(projectId),
  });
}

export function useLogs() {
  return useQuery({
    queryKey: queryKeys.logs.all,
    queryFn: logService.getAll,
  });
}

export function useProjectLogs(projectId: string) {
  return useQuery({
    queryKey: queryKeys.logs.byProject(projectId),
    queryFn: () => logService.getByProject(projectId),
    enabled: Boolean(projectId),
  });
}

export function useGlobalSearch(query: string) {
  return useQuery({
    queryKey: queryKeys.search.query(query),
    queryFn: () => searchService.search(query),
    enabled: query.length >= 0,
    staleTime: 1000 * 30,
  });
}
