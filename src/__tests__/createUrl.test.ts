import createUrl from '../createUrl';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('createUrl', () => {
  it('should create a valid URL with language and function', () => {
    const result = createUrl('ES', 'OPERACIONES_DISPONIBLES');
    expect(result).toBe('https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES');
  });

  it('should create a URL with language, function, and ID', () => {
    const result = createUrl('EN', 'OPERACION', 123);
    expect(result).toBe('https://servicios.ine.es/wstempus/js/EN/OPERACION/123');
  });

  it('should create a URL with language, function, ID, and query parameters', () => {
    const result = createUrl('ES', 'DATOS_TABLA', 456, 'param=value&other=test');
    expect(result).toBe('https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/456?param=value&other=test');
  });

  it('should handle ID as string', () => {
    const result = createUrl('EN', 'OPERACION', 'abc123');
    expect(result).toBe('https://servicios.ine.es/wstempus/js/EN/OPERACION/abc123');
  });

  it('should not append undefined parts', () => {
    const result = createUrl('ES', 'OPERACIONES_DISPONIBLES', undefined, undefined);
    expect(result).toBe('https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES');
  });

  it('should construct URL with only ID (no params)', () => {
    const result = createUrl('ES', 'OPERACION', 789, undefined);
    expect(result).toBe('https://servicios.ine.es/wstempus/js/ES/OPERACION/789');
  });

  it('should construct URL with only params (no ID)', () => {
    const result = createUrl('ES', 'FUNCION', undefined, 'sort=asc');
    expect(result).toBe('https://servicios.ine.es/wstempus/js/ES/FUNCION?sort=asc');
  });
});