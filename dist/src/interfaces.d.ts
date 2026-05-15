/**
 * Interfaz que representa una operación disponible en la API del INE
 * Estructura obtenida de: https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES
 */
export type lang = 'ES' | 'EN';
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
    Codigo?: string;
    Periodicidad?: InePeriodicidad;
    Publicacion?: InePublicacion;
    PeriodoInicio?: InePeriodo;
    AnyoInicio?: number;
    PubFechaAct?: string;
    FechaRef_fin?: string | null;
    Ultima_Modificacion?: string;
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
export interface DatosTabla {
    Id: number;
    Nombre: string;
    COD?: string;
    FK_Unidad?: number;
    Unidad?: string;
    FK_Escala?: number;
    Escala?: string;
    Fecha?: string;
    FK_Periodo?: number;
    Periodo?: string;
    Anyo?: number;
    Valor?: number | string | null;
    FK_TipoDato?: number;
    TipoDato?: string;
    Secreto?: boolean;
    [key: string]: unknown;
}
export {};
