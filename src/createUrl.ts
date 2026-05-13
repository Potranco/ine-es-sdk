import type { lang } from './interfaces'
const INE_URL = 'https://servicios.ine.es/wstempus/js/'

const createUrl = (language:lang, func:string, id?:number | string, params?:string) => {
    let result = `${INE_URL}${language}/${func}`
    if (id) result = `${result}/${id}`
    if (params) result = `${result}?${params}`
    return result
}

export default createUrl