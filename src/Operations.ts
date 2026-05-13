import type { Operation } from './interfaces';
import createUrl from './createUrl';
import type { lang } from './interfaces'

const INE_URL_OPERATIONS = 'OPERACIONES_DISPONIBLES';

/**
 * Obtiene todas las operaciones disponibles del INE
 */
export const getAllOperations = async (language:lang = 'ES'): Promise<Operation[]> => {
  try {
    const res = await fetch(createUrl(language, INE_URL_OPERATIONS));
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data: Operation[] = await res.json();
    return data;
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    throw error;
  }
};

/**
 * Obtiene una operación por su ID
 * @param id - Identificador único de la operación
 */
export const getOperationById = async (id: number, language:lang = 'ES'): Promise<Operation | null> => {
  try {
    const res = await fetch(createUrl(language, INE_URL_OPERATIONS));
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data: Operation[] = await res.json();
    const result = data.find((op) => op.Id === id) ?? null;
    return result;
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    throw error;
  }
};

/**
 * Obtiene operaciones cuya descripción contiene la palabra clave
 * @param keyword - Palabra clave para buscar en el nombre de la operación
 */
export const getOperationByKeyword = async (keyword: string, language:lang = 'ES'): Promise<Operation[]> => {
  try {
    const res = await fetch(createUrl(language, INE_URL_OPERATIONS));
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data: Operation[] = await res.json();
    const result: Operation[] = data.filter((op) =>
      op.Nombre.toLowerCase().includes(keyword.toLowerCase())
    );
    return result;
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    throw error;
  }
};
