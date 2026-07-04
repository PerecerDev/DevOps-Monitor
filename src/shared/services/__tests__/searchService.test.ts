import { describe, expect, it } from 'vitest';

import { searchService } from '@/shared/services/searchService';

describe('searchService', () => {
  it('returns navigation items when query is empty', async () => {
    const results = await searchService.search('');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.type === 'navigation')).toBe(true);
  });

  it('finds projects by name', async () => {
    const results = await searchService.search('Platform API');
    expect(results.some((r) => r.type === 'project' && r.title === 'Platform API')).toBe(true);
  });

  it('finds deployments by version', async () => {
    const results = await searchService.search('v2.14.3');
    expect(results.some((r) => r.type === 'deployment')).toBe(true);
  });

  it('finds logs by message content', async () => {
    const results = await searchService.search('database');
    expect(results.some((r) => r.type === 'log')).toBe(true);
  });

  it('limits results to 25 items', async () => {
    const results = await searchService.search('a');
    expect(results.length).toBeLessThanOrEqual(25);
  });
});
