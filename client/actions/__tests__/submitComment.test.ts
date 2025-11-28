import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitComment } from '../../actions/asset';
import * as updateCommentsModule from '@/lib/updateComments';

// Mock fetch
vi.stubGlobal("fetch", vi.fn());
vi.stubEnv('NEXT_PUBLIC_API_URL', 'http://localhost:3000');
vi.mock('@/lib/updateComments', () => ({
  updateComments: vi.fn(),
}));

describe('submitComment action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should submit valid comment successfully', async () => {
    const mockComment = {
      id: 1,
      assetId: 1,
      name: 'Test User',
      comment: 'Test comment',
      timestamp: new Date().toISOString()
    };

    vi.mocked(updateCommentsModule.updateComments).mockResolvedValueOnce(mockComment);


    const formData = new FormData();
    formData.append('message', 'Test comment');
    formData.append('isInternal', 'off');
    formData.append('time', '00:00');
    formData.append('includeTime', 'off');

    const result = await submitComment(
      {
        data: { assetId: 1, message: '', isInternal: false, time: '00:00', includeTime: false },
        success: false,
        errors: {},
        newComment: {},
      },
      formData
    );

    expect(result.success).toBe(true);
    expect(result.newComment).toEqual(mockComment);
    expect(updateCommentsModule.updateComments).toHaveBeenCalledWith(1, 'Test comment');
  });

  it('should return validation errors for empty message', async () => {
    const formData = new FormData();
    formData.append('message', '');

    const result = await submitComment(
      {
        data: { assetId: 1, message: '', isInternal: false, time: '00:00', includeTime: false },
        success: false,
        errors: {},
        newComment: {},
      },
      formData
    );

    expect(result.success).toBe(false);
    expect(result.errors).toHaveProperty('message');

    if("message" in result.errors) {
      expect(result.errors.message).toBeDefined();
    }
  });

  it('should handle fetch errors', async () => {
    vi.mocked(updateCommentsModule.updateComments).mockRejectedValueOnce(
      new Error('Failed to submit comment')
    );

    const formData = new FormData();
    formData.append('message', 'Test comment');
    formData.append('isInternal', 'off');
    formData.append('time', '00:00');
    formData.append('includeTime', 'off');

    const result = await submitComment(
      {
        data: { assetId: 1, message: '', isInternal: false, time: '00:00', includeTime: false },
        success: false,
        errors: {},
        newComment: {},
      },
      formData
    );

    expect(result.success).toBe(false);
    expect(result.errors).toHaveProperty('message');
    if ('message' in result.errors) {
      expect(result.errors.message).toEqual(['Failed to submit comment']);
    }
  });
});