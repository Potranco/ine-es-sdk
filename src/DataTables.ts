import createUrl from "./createUrl";
import type { lang } from "./interfaces";
const INE_URL_DATATABLE = 'DATOS_TABLA'

const getDataTables = async (id:number, lang:lang = 'ES') => {
    try {
        const res = await fetch(createUrl(lang, INE_URL_DATATABLE, id))
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json()
        return data
    } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        throw error;
    }
}

export {
    getDataTables
}