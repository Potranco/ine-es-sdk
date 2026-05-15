import { lang, DatosTabla } from './interfaces';
declare const getDataTables: (id: number, lang?: lang) => Promise<DatosTabla | Error>;
export { getDataTables };
