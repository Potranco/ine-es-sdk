import createUrl from "./createUrl";
import type { lang } from "./interfaces";

const getData = async (lang:lang = 'ES', func:string, id?:number, params?:string ) => {
    try {
        const res = await fetch(createUrl(lang, func, id, params))
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json()
        return data
    } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        throw error;
    }
}

export {
    getData
}