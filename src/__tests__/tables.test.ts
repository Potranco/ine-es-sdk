import { getTables, getTablesByKeyword } from '../Tables';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { TablasOperacion } from '../interfaces';

describe('Tables', () => {
  const mockFetch = vi.fn();
  
  beforeEach(() => {
    global.fetch = mockFetch as any;
  });

  describe('getTables', () => {
    it('should return tables for operation ID', async () => {
      const mockData: TablasOperacion[] = [
        { Id: 1, Nombre: 'Table 1', Codigo: 'T1', Descripcion: 'First table' },
        { Id: 2, Nombre: 'Table 2', Codigo: 'T2', Descripcion: 'Second table' }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      const result = await getTables(123, 'ES');
      
      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://servicios.ine.es/wstempus/js/ES/TABLAS_OPERACION/123'
      );
    });

    it('should use ES as default language', async () => {
      const mockData: TablasOperacion[] = [
        { Id: 1, Nombre: 'Table 1', Codigo: 'T1', Descripcion: 'First table' }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      await getTables(456);
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://servicios.ine.es/wstempus/js/ES/TABLAS_OPERACION/456'
      );
    });

    it('should throw error when HTTP request fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      } as Response);

      await expect(getTables(123, 'ES')).rejects.toThrow('HTTP 404: Not Found');
    });

    it('should throw error when JSON parsing fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON'))
      } as Response);

      await expect(getTables(123, 'ES')).rejects.toThrow('Invalid JSON');
    });

    it('should throw error when fetch throws network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Connection refused'));

      await expect(getTables(123, 'ES')).rejects.toThrow('Connection refused');
    });
  });

  describe('getTablesByKeyword', () => {
    it('should return tables filtered by keyword', async () => {
      const mockData: TablasOperacion[] = [
        { Id: 1, Nombre: 'Table economy', Codigo: 'T1', Descripcion: 'Economic data' },
        { Id: 2, Nombre: 'Table finance', Codigo: 'T2', Descripcion: 'Financial data' }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      const result = await getTablesByKeyword(123, 'economy', 'ES');
      
      expect(result).toEqual([mockData[0]]);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://servicios.ine.es/wstempus/js/ES/TABLAS_OPERACION/123'
      );
    });

    it('should filter tables by keyword', async () => {
      const mockData: TablasOperacion[] = [
        { Id: 1, Nombre: 'Table economy', Codigo: 'T1', Descripcion: 'Economic data' },
        { Id: 2, Nombre: 'Table finance', Codigo: 'T2', Descripcion: 'Financial data' }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      const result = await getTablesByKeyword(123, 'conomy', 'ES');
      
      expect(result).toEqual([mockData[0]]); // Only first table contains 'conomy'
    });

    it('should use ES as default language', async () => {
      const mockData: TablasOperacion[] = [
        { Id: 1, Nombre: 'Table 1', Codigo: 'T1', Descripcion: 'First table' }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      await getTablesByKeyword(456, 'test');
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://servicios.ine.es/wstempus/js/ES/TABLAS_OPERACION/456'
      );
    });

    it('should return empty array when no tables match keyword', async () => {
      const mockData: TablasOperacion[] = [
        { Id: 1, Nombre: 'Table finance', Codigo: 'T1', Descripcion: 'Financial data' }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      const result = await getTablesByKeyword(123, 'economy', 'ES');
      
      expect(result).toEqual([]); // No tables contain 'economy'
    });

    it('should handle errors during fetch', async () => {
      mockFetch.mockRejectedValueOnce(new Error('API error'));

      await expect(getTablesByKeyword(123, 'test', 'ES')).rejects.toThrow('API error');
    });
  });
});
