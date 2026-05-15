import { lang } from './interfaces';
declare const createUrl: (language: lang, func: string, id?: number | string, params?: string) => string;
export default createUrl;
