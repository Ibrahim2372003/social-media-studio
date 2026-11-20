import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchHealth } from './api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchHealth', () => {
  it('returns the parsed body on success', async () => {
    const body = { status: 'ok', uptimeSeconds: 1, timestamp: '2026-01-01T00:00:00.000Z' };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => body }));
    await expect(fetchHealth()).resolves.toEqual(body);
  });

  it('throws on a non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    await expect(fetchHealth()).rejects.toThrow(/503/);
  });
});
