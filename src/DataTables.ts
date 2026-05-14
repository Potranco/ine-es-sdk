import { getData } from "./getData";
import type { lang } from "./interfaces";
const INE_URL_DATATABLE = 'DATOS_TABLA'

const getDataTables = async (id:number, lang:lang = 'ES') => {
    return getData(lang, INE_URL_DATATABLE, id)
}

export {
    getDataTables
}