import { lang, Operation } from './interfaces';
/**
 * Obtiene todas las operaciones disponibles del INE
 * @param lang - Identificador único de lenguage ES por defecto
 */
export declare const getAllOperations: (language?: lang) => Promise<Operation[] | Error>;
/**
 * Obtiene una operación por su ID
 * @param id - Identificador único de la operación
 * @param lang - Identificador único de lenguage ES por defecto
 */
export declare const getOperationById: (id: number, language?: lang) => Promise<Operation | Error>;
/**
 * Obtiene operaciones cuya descripción contiene la palabra clave
 * @param keyword - Palabra clave para buscar en el nombre de la operación
 * @param lang - Identificador único de lenguage ES por defecto
 */
export declare const getOperationByKeyword: (keyword: string, language?: lang) => Promise<Operation[] | Error>;
