import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { DataTable } from '../DataTable';

interface Row {
  id: string;
  name: string;
  status: string;
}

const mockData: Row[] = [
  { id: '1', name: 'Alpha', status: 'active' },
  { id: '2', name: 'Beta', status: 'inactive' },
  { id: '3', name: 'Gamma', status: 'active' },
];

const columns = [
  { accessorKey: 'name' as const, header: 'Name' },
  { accessorKey: 'status' as const, header: 'Status' },
];

describe('DataTable', () => {
  it('renders rows and column headers', () => {
    render(<DataTable columns={columns} data={mockData} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
  });

  it('filters rows via search input', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={mockData} searchPlaceholder="Filter..." />);

    await user.type(screen.getByLabelText('Filter...'), 'Beta');

    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });

  it('shows empty message when no data', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });
});
