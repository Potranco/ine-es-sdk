import { getAllOperations, getOperationById, getOperationByKeyword } from '../Operations';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { Operation } from '../interfaces';

// Mock de fetch global para operaciones
const mockFetch = vi.fn();

describe('Operations', () => {
  beforeEach(() => {
    global.fetch = mockFetch as any;
  });

  describe('getAllOperations', () => {
    it('should return array of operations for ES language', async () => {
      const mockData: Operation[] = [
        { Id: 1, Cod_IOE: '123', Nombre: 'Operation 1', Codigo: 'OP1' },
        { Id: 2, Cod_IOE: '456', Nombre: 'Operation 2', Codigo: 'OP2' }
      ];
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      const result = await getAllOperations('ES');
      
      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES'
      );
    });

    it('should return array of operations for EN language', async () => {
      const mockData: Operation[] = [
        { Id: 1, Cod_IOE: '123', Nombre: 'Operation 1', Codigo: 'OP1' }
      ];
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      const result = await getAllOperations('EN');
      
      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://servicios.ine.es/wstempus/js/EN/OPERACIONES_DISPONIBLES'
      );
    });

    it('should use ES as default language', async () => {
      const mockData: Operation[] = [
        { Id: 1, Cod_IOE: '123', Nombre: 'Operation 1', Codigo: 'OP1' }
      ];
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      await getAllOperations();
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES'
      );
    });

    it('should throw error when HTTP request fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      } as Response);

      await expect(getAllOperations('ES')).rejects.toThrow('HTTP 404: Not Found');
    });

    it('should throw error when JSON parsing fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON'))
      } as Response);

      await expect(getAllOperations('ES')).rejects.toThrow('Invalid JSON');
    });

    it('should return error instance when fetch throws', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getAllOperations('ES')).rejects.toThrow('Network error');
    });
  });

  describe('getOperationById', () => {
    it('should return operation by id', async () => {
      const mockData: Operation = { Id: 1, Cod_IOE: '123', Nombre: 'Operation 1', Codigo: 'OP1' }
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      const result = await getOperationById(1);
      
      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledTimes(7);
    });
  });
  
  describe('getOperationByKeyword', () => {
    it('should return array of operations for ES language', async () => {
      const mockData: Operation[] = [
        { Id: 1, Cod_IOE: '123', Nombre: 'Operation 1', Codigo: 'OP1' },
        { Id: 2, Cod_IOE: '456', Nombre: 'Operation 2', Codigo: 'OP2' }
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response);

      const result = await getOperationByKeyword('Operation');
      
      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledTimes(8);
    });
  });
});
