import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DeploymentStatusBadge,
  ErrorState,
  Skeleton,
  Timeline,
} from '@/shared/components/ui';
import {
  useDeployment,
  useDeploymentTimeline,
  useProject,
} from '@/shared/hooks/useQueries';
import { mockUsers } from '@/shared/mocks/data';
import { formatCommitSha, formatDuration, formatRelativeTime } from '@/shared/utils';

export function DeploymentDetailPage() {
  const { deploymentId = '' } = useParams();
  const deploymentQuery = useDeployment(deploymentId);
  const timelineQuery = useDeploymentTimeline(deploymentId);
  const projectQuery = useProject(deploymentQuery.data?.projectId ?? '');

  if (deploymentQuery.isError) {
    return <ErrorState onRetry={() => void deploymentQuery.refetch()} />;
  }

  if (deploymentQuery.isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  const deployment = deploymentQuery.data;
  if (!deployment) {
    return (
      <ErrorState title="Deployment not found" message="The requested deployment does not exist." />
    );
  }

  const deployer = mockUsers.find((u) => u.id === deployment.deployedById);

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/deployments"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to deployments
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{deployment.version}</h1>
            <p className="mt-1 text-muted">
              {projectQuery.data?.name ?? 'Unknown project'} ·{' '}
              <span className="capitalize">{deployment.environment}</span>
            </p>
          </div>
          <DeploymentStatusBadge status={deployment.status} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetaItem label="Commit" value={formatCommitSha(deployment.commitSha)} mono />
        <MetaItem label="Started" value={formatRelativeTime(deployment.startedAt)} />
        <MetaItem
          label="Duration"
          value={deployment.durationMs ? formatDuration(deployment.durationMs) : 'In progress'}
        />
        <MetaItem label="Deployed by" value={deployer?.name ?? 'Unknown'} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Commit message</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-mono text-sm">{deployment.commitMessage}</p>
          {deployment.url && (
            <a
              href={deployment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              <ExternalLink className="size-3.5" aria-hidden="true" />
              View deployment
            </a>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Deployment timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {timelineQuery.isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <Timeline events={timelineQuery.data ?? []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function MetaItem({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className={mono ? 'mt-1 font-mono text-sm' : 'mt-1 text-sm font-medium'}>{value}</p>
    </div>
  );
}
