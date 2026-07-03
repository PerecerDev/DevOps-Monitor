import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/app/layouts/AppLayout';
import { GuestRoute, ProtectedRoute } from '@/app/router/ProtectedRoute';
import { Spinner } from '@/shared/components/ui';

const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const DashboardPage = lazy(() =>
  import('@/features/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const ProjectsPage = lazy(() =>
  import('@/features/projects/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })),
);
const ProjectDetailPage = lazy(() =>
  import('@/features/projects/pages/ProjectDetailPage').then((m) => ({
    default: m.ProjectDetailPage,
  })),
);
const DeploymentsPage = lazy(() =>
  import('@/features/deployments/pages/DeploymentsPage').then((m) => ({
    default: m.DeploymentsPage,
  })),
);
const BuildsPage = lazy(() =>
  import('@/features/builds/pages/BuildsPage').then((m) => ({ default: m.BuildsPage })),
);
const PipelinesPage = lazy(() =>
  import('@/features/pipelines/pages/PipelinesPage').then((m) => ({ default: m.PipelinesPage })),
);
const AlertsPage = lazy(() =>
  import('@/features/alerts/pages/AlertsPage').then((m) => ({ default: m.AlertsPage })),
);
const ActivityPage = lazy(() =>
  import('@/features/activity/pages/ActivityPage').then((m) => ({ default: m.ActivityPage })),
);
const SettingsPage = lazy(() =>
  import('@/features/settings/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })),
);

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <GuestRoute />,
    children: [
      {
        path: '/login',
        element: withSuspense(LoginPage),
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/dashboard', element: withSuspense(DashboardPage) },
          { path: '/projects', element: withSuspense(ProjectsPage) },
          { path: '/projects/:projectId', element: withSuspense(ProjectDetailPage) },
          { path: '/deployments', element: withSuspense(DeploymentsPage) },
          { path: '/builds', element: withSuspense(BuildsPage) },
          { path: '/pipelines', element: withSuspense(PipelinesPage) },
          { path: '/alerts', element: withSuspense(AlertsPage) },
          { path: '/activity', element: withSuspense(ActivityPage) },
          { path: '/settings', element: withSuspense(SettingsPage) },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
