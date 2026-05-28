import { getData } from '../index';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const mockFetch = vi.fn();
describe('getData', () => {
  
  beforeEach(() => {
    global.fetch = mockFetch as any;
  });

  it('should return data when response is OK', async () => {
    const mockData = { Id: 1, Nombre: 'Test Operation' };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const result = await getData('ES', 'OPERACIONES_DISPONIBLES');
    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalled();
  });

  it('should throw error when response is not OK', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    await expect(getData('ES', 'OPERACIONES_DISPONIBLES'))
      .rejects
      .toThrow('HTTP 404: Not Found');
  });

  it('should throw error when fetch fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    await expect(getData('ES', 'OPERACIONES_DISPONIBLES'))
      .rejects
      .toThrow('Network error');
  });
});