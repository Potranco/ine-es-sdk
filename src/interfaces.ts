/**
 * Interfaz que representa una operación disponible en la API del INE
 * Estructura obtenida de: https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES
 */
export type lang = 'ES' | 'EN'

export interface Operation {
  /** Identificador único de la operación */
  Id: number;

  /** Código IOE (Orden de las Cuentas Oficiales de Estadística) */
  Cod_IOE: string;

  /** Nombre descriptivo de la operación */
  Nombre: string;

  /** Código abreviado de la operación */
  Codigo: string;

  /** URL opcional que apunta a la página de la operación en la web del INE */
  Url?: string;
}

/**
 * Error de tipo NetworkError
 * Representa un fallo en la conexión o en la petición HTTP
 */
export interface NetworkError {
  /** Descripción del error */
  message: string;

  /** El error original (Response | Error) */
  error: Error | Response;
}

/**
 * Error genérico de operación
 */
export interface OperationError {
  /** Descripción del error */
  message: string;

  /** Detalle del error */
  details?: unknown;
}

/**
 * Tipo de error para la API del INE
 */
export type INEError = NetworkError | OperationError;

/**
 * Resultado genérico de una operación
 */
export type Result<T> = T | INEError;

/**
 * Resultado de obtener todas las operaciones
 */
export type GetAllOperationsResult = Operation[] | INEError;

/**
 * Resultado de obtener una operación por ID
 */
export type GetOperationByIdResult = Operation | null | INEError;

/**
 * Resultado de buscar operaciones por palabra clave
 */
export type GetOperationByKeywordResult = Operation[] | INEError;
