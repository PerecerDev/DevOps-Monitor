import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge, Button, DeploymentStatusBadge } from '@/shared/components/ui';

describe('Button', () => {
  it('renders with text content', () => {
    render(<Button>Deploy</Button>);
    expect(screen.getByRole('button', { name: 'Deploy' })).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Button disabled>Deploy</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('Badge', () => {
  it('renders badge text', () => {
    render(<Badge>Production</Badge>);
    expect(screen.getByText('Production')).toBeInTheDocument();
  });
});

describe('DeploymentStatusBadge', () => {
  it('renders status label with accessible name', () => {
    render(<DeploymentStatusBadge status="success" />);
    expect(screen.getByLabelText('Status: Success')).toBeInTheDocument();
  });
});
