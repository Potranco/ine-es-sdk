import { lang } from './interfaces';
declare const getData: (lang: lang | undefined, func: string, id?: number, params?: string) => Promise<any | Error>;
export { getData };
