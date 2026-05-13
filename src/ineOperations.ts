const INE_URL_OPERATIONS = 'https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES'

const getAllOperations = async() => {
    try {
        const res = await fetch(INE_URL_OPERATIONS)
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

const getOperationById = async(id:number) => {
    try {
        const res = await fetch(INE_URL_OPERATIONS)
        const data = await res.json()
        const result = data.find((op:any) => op.Id === id)
        return result
    } catch (err) {
        return err
    }
}

const getOperationByKeyword = async(keyword:string) => {
    const res = await fetch(INE_URL_OPERATIONS)
    const data = await res.json()
    const result = data.filter((op:any) =>
        op.Nombre.toLowerCase().includes(keyword.toLowerCase())
    )
    return result
}

export {
    getAllOperations,
    getOperationById,
    getOperationByKeyword
}