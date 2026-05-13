import createUrl from "./createUrl";
import type { lang } from "./interfaces";
const INE_URL_OPERATIONS = 'TABLAS_OPERACION'

const getTables = async(id:number, lang:lang = 'ES') => {
    try {
        const res = await fetch(createUrl(lang, INE_URL_OPERATIONS, id))
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json()
        return data
    } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        throw error;
    }
}

const getTablesByKeyword = async(id:number, keyword:string, lang:lang = 'ES') => {
    try {
        const res = await fetch(createUrl(lang, INE_URL_OPERATIONS, id))
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json()

        return await data.filter((op:any) =>
            op.Nombre.toLowerCase().includes(keyword.toLowerCase())
        )
    } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        throw error;
    }
}

export {
    getTables,
    getTablesByKeyword,
}