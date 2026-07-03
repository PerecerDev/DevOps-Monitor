import { Box, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  EmptyState,
  ErrorState,
  HealthStatusBadge,
  Skeleton,
} from '@/shared/components/ui';
import { useProjects } from '@/shared/hooks/useQueries';
import { formatRelativeTime } from '@/shared/utils';

export function ProjectsPage() {
  const { data: projects, isLoading, isError, refetch } = useProjects();

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Projects" description="Manage and monitor your software projects" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!projects?.length) {
    return (
      <EmptyState
        icon={Box}
        title="No projects yet"
        description="Create your first project to start monitoring deployments and builds."
        action={{ label: 'Create project', onClick: () => undefined }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Projects" description="Manage and monitor your software projects" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="group rounded-lg border border-border bg-surface p-5 shadow-sm transition-all hover:border-accent/50 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold group-hover:text-accent">{project.name}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{project.description}</p>
              </div>
              <HealthStatusBadge status={project.healthStatus} />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted">
              <span className="capitalize">{project.environment}</span>
              <span>Updated {formatRelativeTime(project.updatedAt)}</span>
            </div>
            {project.repositoryUrl && (
              <div className="mt-3 flex items-center gap-1 text-xs text-accent">
                <ExternalLink className="size-3" aria-hidden="true" />
                <span className="truncate">{project.slug}</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1 text-muted">{description}</p>
    </div>
  );
}
