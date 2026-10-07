import { fetchJson } from '../client';

describe('Shared Universal API Client', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('handles successful API response', async () => {
    const mockData = { id: 1, name: 'Falda SuperApp' };
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const response = await fetchJson<typeof mockData>('https://api.example.com/data');
    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockData);
    expect(response.error).toBeNull();
  });

  it('handles HTTP error responses', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: jest.fn(),
    });

    const response = await fetchJson('https://api.example.com/not-found');
    expect(response.status).toBe(404);
    expect(response.data).toBeNull();
    expect(response.error).toContain('404');
  });

  it('handles network failure', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('Network offline'));

    const response = await fetchJson('https://api.example.com/fail');
    expect(response.status).toBe(0);
    expect(response.data).toBeNull();
    expect(response.error).toBe('Network offline');
  });
});
