import { describe, it, expect } from 'vitest';
import { commentSchema } from '../asset';

describe('commentSchema', () => {
  it('should validate a valid comment', () => {
    const result = commentSchema.safeParse({
      assetId: 1,
      message: 'Test comment',
      isInternal: false,
      includeTime: false,
    });
    
    expect(result.success).toBe(true);
  });

  it('should reject empty message', () => {
    const result = commentSchema.safeParse({
      assetId: 1,
      message: '',
      isInternal: false,
    });
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Message cannot be empty');
    }
  });

  it('should require time when includeTime is true', () => {
    const result = commentSchema.safeParse({
      assetId: 1,
      message: 'Test',
      includeTime: true,
      time: '00:00',
    });
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('time');
    }
  });

  it('should accept valid time when includeTime is true', () => {
    const result = commentSchema.safeParse({
      assetId: 1,
      message: 'Test',
      includeTime: true,
      time: '14:30',
    });
    
    expect(result.success).toBe(true);
  });
});