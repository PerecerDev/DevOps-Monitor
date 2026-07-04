import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { LogEntry } from '@/shared/types';

import { LogViewer } from '../LogViewer';

const mockLogs: LogEntry[] = [
  {
    id: 'log_1',
    projectId: 'prj_01',
    level: 'info',
    message: 'Request processed successfully',
    source: 'api-gateway',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'log_2',
    projectId: 'prj_01',
    level: 'error',
    message: 'Database connection timeout',
    source: 'database',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'log_3',
    projectId: 'prj_02',
    level: 'warn',
    message: 'Memory usage elevated',
    source: 'worker',
    timestamp: new Date().toISOString(),
  },
];

describe('LogViewer', () => {
  it('shows total entry count', () => {
    render(<LogViewer logs={mockLogs} height={200} />);
    expect(screen.getByText('3 of 3 entries')).toBeInTheDocument();
  });

  it('filters logs by search query', async () => {
    const user = userEvent.setup();
    render(<LogViewer logs={mockLogs} height={200} />);

    await user.type(screen.getByLabelText('Search logs'), 'database');

    expect(screen.getByText('1 of 3 entries')).toBeInTheDocument();
    expect(screen.getByText(/Filtered by/)).toBeInTheDocument();
  });

  it('toggles log level filters', async () => {
    const user = userEvent.setup();
    render(<LogViewer logs={mockLogs} height={200} />);

    const errorButton = screen.getByRole('button', { name: 'error' });
    expect(errorButton).toHaveAttribute('aria-pressed', 'true');

    await user.click(errorButton);

    expect(errorButton).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('2 of 3 entries')).toBeInTheDocument();
  });

  it('renders level filter controls', () => {
    render(<LogViewer logs={mockLogs} height={200} />);
    expect(screen.getByRole('group', { name: 'Filter by log level' })).toBeInTheDocument();
    expect(screen.getByLabelText('Application logs')).toBeInTheDocument();
  });
});
