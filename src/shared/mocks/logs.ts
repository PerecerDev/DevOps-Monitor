import type { LogEntry, LogLevel } from '@/shared/types';

import { mockDeployments, mockProjects } from './data';

const now = Date.now();
const minutesAgo = (m: number) => new Date(now - m * 60000).toISOString();

const LOG_MESSAGES: Record<LogLevel, string[]> = {
  debug: [
    'Cache hit for key user:session:abc123',
    'Executing query: SELECT * FROM deployments WHERE status = $1',
    'Health check probe sent to /healthz',
    'Garbage collection completed in 12ms',
    'Rate limiter: 847 requests in current window',
  ],
  info: [
    'Request processed successfully',
    'Deployment v2.14.3 rolled out to 3 instances',
    'User session authenticated via JWT',
    'Webhook delivered to https://hooks.acme.io/deploy',
    'Scheduled job completed: daily-backup',
    'Connection pool: 10 active, 2 idle connections',
    'Metrics exported to Prometheus endpoint',
  ],
  warn: [
    'Response time exceeded threshold: 2.4s (limit: 2s)',
    'Memory usage at 82% on instance api-prod-2',
    'Retry attempt 2/3 for upstream service',
    'Deprecated API endpoint called: /v1/status',
    'Certificate expires in 14 days',
  ],
  error: [
    'Failed to connect to database: connection timeout after 30s',
    'HTTP 500 Internal Server Error on POST /api/deployments',
    'Build stage "test" failed with exit code 1',
    'Unhandled exception: TypeError in MetricsWidget.render',
    'Failed to push image to registry: authentication denied',
  ],
  fatal: [
    'Service crashed: SIGSEGV in worker process pid 4821',
    'Out of memory: heap limit exceeded, process terminated',
    'Critical: all health checks failing, initiating shutdown',
  ],
};

const SOURCES = [
  'api-gateway',
  'auth-service',
  'worker',
  'scheduler',
  'database',
  'nginx',
  'sidecar',
];

const LEVEL_WEIGHTS: LogLevel[] = [
  ...Array<LogLevel>(40).fill('debug'),
  ...Array<LogLevel>(35).fill('info'),
  ...Array<LogLevel>(15).fill('warn'),
  ...Array<LogLevel>(8).fill('error'),
  ...Array<LogLevel>(2).fill('fatal'),
];

function pickLevel(index: number): LogLevel {
  return LEVEL_WEIGHTS[index % LEVEL_WEIGHTS.length] ?? 'info';
}

function generateMockLogs(count: number): LogEntry[] {
  const logs: LogEntry[] = [];

  for (let i = 0; i < count; i++) {
    const project = mockProjects[i % mockProjects.length];
    const projectDeployments = mockDeployments.filter((d) => d.projectId === project.id);
    const deploymentIndex =
      projectDeployments.length > 0 ? i % projectDeployments.length : -1;
    const deployment =
      deploymentIndex >= 0 ? projectDeployments[deploymentIndex] : undefined;
    const level = pickLevel(i);
    const messages = LOG_MESSAGES[level];
    const message = messages[i % messages.length] ?? 'Log event recorded';

    logs.push({
      id: `log_${String(i + 1).padStart(4, '0')}`,
      projectId: project.id,
      deploymentId: deployment?.id,
      level,
      message,
      source: SOURCES[i % SOURCES.length] ?? 'api-gateway',
      timestamp: minutesAgo(count - i),
      metadata:
        level === 'error' || level === 'fatal'
          ? { traceId: `tr_${String(i).padStart(6, '0')}`, statusCode: 500 }
          : undefined,
    });
  }

  return logs.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

export const mockLogs: LogEntry[] = generateMockLogs(800);
