import createUrl from "./createUrl";
import type { lang } from "./interfaces";

const getData = async (lang:lang = 'ES', func:string, id?:number, params?:string ): Promise<any | Error> => {
    try {
        const res = await fetch(createUrl(lang, func, id, params))
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

        return await res.json()
    } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        throw error;
    }
}

export {
    getData
}