import { getDataTables } from '../DataTables';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { DatosTabla } from '../interfaces';

describe('DataTables', () => {
  const mockFetch = vi.fn();
  
  beforeEach(() => {
    global.fetch = mockFetch as any;
  });

  describe('getDataTables', () => {
    it('should return data table for ES language', async () => {
      const mockData: DatosTabla[] = [
        {
          Id: 1,
          Nombre: 'Data Table 1',
          Descripcion: 'Description 1',
          FechaActualizacion: '2024-01-01'
        }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      const result = await getDataTables(123, 'ES');
      
      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/123'
      );
    });

    it('should return data table for EN language', async () => {
      const mockData: DatosTabla[] = [
        {
          Id: 1,
          Nombre: 'Data Table 1',
          Descripcion: 'Description 1',
          FechaActualizacion: '2024-01-01'
        }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      const result = await getDataTables(456, 'EN');
      
      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://servicios.ine.es/wstempus/js/EN/DATOS_TABLA/456'
      );
    });

    it('should use ES as default language', async () => {
      const mockData: DatosTabla[] = [
        {
          Id: 1,
          Nombre: 'Data Table 1',
          Descripcion: 'Description 1',
          FechaActualizacion: '2024-01-01'
        }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      await getDataTables(789);
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/789'
      );
    });

    it('should throw error when HTTP request fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      } as Response);

      await expect(getDataTables(123, 'ES')).rejects.toThrow('HTTP 500: Internal Server Error');
    });

    it('should throw error when JSON parsing fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new Error('Parse error'))
      } as Response);

      await expect(getDataTables(123, 'ES')).rejects.toThrow('Parse error');
    });

    it('should throw error when fetch throws network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network timeout'));

      await expect(getDataTables(123, 'ES')).rejects.toThrow('Network timeout');
    });
  });
});
