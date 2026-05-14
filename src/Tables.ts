import { getData } from "./getData";
import type { lang } from "./interfaces";

const INE_URL_TABLAS = 'TABLAS_OPERACION'

const getTables = async(id:number, lang:lang = 'ES') => {
    return getData(lang, INE_URL_TABLAS, id)
}

const getTablesByKeyword = async(id:number, keyword:string, lang:lang = 'ES') => {
    return await getData(lang, INE_URL_TABLAS, id)
        .then(data => data.filter((op:any) =>
            op.Nombre.toLowerCase().includes(keyword.toLowerCase()))
        )
}

export {
    getTables,
    getTablesByKeyword,
}