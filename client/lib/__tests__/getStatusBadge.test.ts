import { describe, it, expect } from 'vitest';
import { getStatusBadge } from '../getStatusBadge';

describe('getStatusBadge', () => {
  it('should return correct badge for APPROVED status', () => {
    const badge = getStatusBadge('APPROVED');
    
    expect(badge?.label).toBe('Final Approved');
    expect(badge?.variant).toBe('approved');
  });

  it('should return correct badge for REJECTED status', () => {
    const badge = getStatusBadge('REJECTED');
    
    expect(badge?.label).toBe('Rejected');
    expect(badge?.variant).toBe('red');
  });

  it('should return undefined for invalid status', () => {
    const badge = getStatusBadge('INVALID_STATUS' as any);
    
    expect(badge).toBeUndefined();
  });
});