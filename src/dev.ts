import {
    getAllOperations,
    getOperationById,
    getOperationByKeyword
} from './index'

console.info('Operations:')
console.log('1. All operations:', await getAllOperations())
console.log('2. Operation by id 336:', await getOperationById(336))
console.log('3. Operation by id -> not found:', await getOperationById(10000000))
console.log('4. Operations by keyword "condenado":', await getOperationByKeyword('condenado'))
console.log('4. Operations by keyword "Hello" 0 results:', await getOperationByKeyword('Hello'))

