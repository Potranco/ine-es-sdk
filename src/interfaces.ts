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

export interface TablasOperacion {
  Id: number;
  Nombre: string;
  // suele venir tipo "N", "A", etc
  Codigo?: string;
  // periodicidad
  Periodicidad?: InePeriodicidad;
  // publicación asociada
  Publicacion?: InePublicacion;
  // periodo inicial
  PeriodoInicio?: InePeriodo;
  // año inicio
  AnyoInicio?: number;
  // fecha última actualización/publicación
  PubFechaAct?: string;
  // fecha referencia final
  FechaRef_fin?: string | null;
  // última modificación
  Ultima_Modificacion?: string;
  // algunos endpoints añaden más campos
  [key: string]: unknown;
}

interface InePeriodicidad {
  Id: number;
  Nombre: string;
}

interface InePublicacion {
  Id: number;
  Nombre: string;
}

interface InePeriodo {
  Id: number;
  Nombre: string;
}

// =========================
// DATOS_TABLA
// =========================

export interface DatosTabla {
  Id: number;
  // nombre serie
  Nombre: string;
  // código serie
  COD?: string;
  // unidad
  FK_Unidad?: number;
  Unidad?: string;
  // escala
  FK_Escala?: number;
  Escala?: string;
  // fecha y periodo
  Fecha?: string;
  FK_Periodo?: number;
  Periodo?: string;
  // año
  Anyo?: number;
  // valor dato
  Valor?: number | string | null;
  // tipo dato
  FK_TipoDato?: number;
  TipoDato?: string;
  // flags posibles
  Secreto?: boolean;
  // metadatos extra
  [key: string]: unknown;
}