import type { lang, Operation } from './interfaces'
import { getData } from './getData';

const INE_URL_OPERATIONS = 'OPERACIONES_DISPONIBLES';
const INE_URL_OPERATION ='OPERACION'

/**
 * Obtiene todas las operaciones disponibles del INE
 * @param lang - Identificador único de lenguage ES por defecto
 */
export const getAllOperations = async (language:lang = 'ES'): Promise<Operation[] | Error> => {
  return getData(language, INE_URL_OPERATIONS);
};

/**
 * Obtiene una operación por su ID
 * @param id - Identificador único de la operación
 * @param lang - Identificador único de lenguage ES por defecto
 */
export const getOperationById = async (id: number, language:lang = 'ES'): Promise<Operation | Error> => {
  return await getData(language, INE_URL_OPERATION, id);
};

/**
 * Obtiene operaciones cuya descripción contiene la palabra clave
 * @param keyword - Palabra clave para buscar en el nombre de la operación
 * @param lang - Identificador único de lenguage ES por defecto
 */
export const getOperationByKeyword = async (keyword: string, language:lang = 'ES'): Promise<Operation[] | Error> => {
  return await getData(language, INE_URL_OPERATIONS)
      .then(res => {
          const result: any[] = res.filter((op:{Nombre:string}) =>
            op.Nombre.toLowerCase().includes(keyword.toLowerCase())
          );
          return result
      })
};
