import { lang, TablasOperacion } from './interfaces';
declare const getTables: (id: number, lang?: lang) => Promise<TablasOperacion[] | Error>;
declare const getTablesByKeyword: (id: number, keyword: string, lang?: lang) => Promise<TablasOperacion[] | Error>;
export { getTables, getTablesByKeyword, };
