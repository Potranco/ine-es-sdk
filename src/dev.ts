/** DEV OPERACIONES */
/*
import { getAllOperations, getOperationById, getOperationByKeyword } from './ineOperations';

console.info('Operations:');
console.log('1. All operations:', await getAllOperations());
console.log('2. Operation by id 336:', await getOperationById(336));
console.log('3. Operation by id -> not found:', await getOperationById(10000000));
console.log('4. Operations by keyword "condenado":', await getOperationByKeyword('condenado'));
console.log('5. Operations by keyword "Hello" (0 results):', await getOperationByKeyword('Hello'));

*/

/** DEV TABLAS */
/*
import { getTables, getTablesByKeyword } from './index'

console.info('Tables:')
console.log('1. Tables of operation 236', await getTables(236))
await getTables(0)
    .then()
    .catch(err => {
        console.log('2. Tables of operation 0 error ->', err)
    })
await getTablesByKeyword(236, '6 meses')
    .then(res => console.log('3. Table 236 filter by "6 meses"', res))
await getTablesByKeyword(0, '6 meses')
    .catch(err => console.log('4. Error: Table 0 filter by "6 meses" ->', err))
*/

/** DEV DATOS TABLA */
/*
import { getDataTables } from "./DataTables"
console.log('Datos:')
await getDataTables(69385)
    .then(res => console.log('1. Datos tabla id 69385', res))
*/

/** DEV GENERIC SERVICE */
/*
import { getData } from "./getData";
console.log('Servicio general:')
await getData('ES', 'OPERACIONES_DISPONIBLES')
    .then(res => console.log('Operariones', res))
await getData('ES', 'TABLAS_OPERACION', 236)
    .then(res => console.log('tablas de operacion', res))
await getData('ES', 'DATOS_TABLA', 69385)
    .then(res => console.log(res))
await getData('ES', 'DATOS_TABLA', 69385, 'det=0')
    .then(res => console.log(res))
await getData('ES', 'DATOS_TABLA', 69385, 'det=0')
    .then(res => console.log(res))
await getData('ES', 'DATOS_TABLA', 69385, 'det=0')
    .then(res => console.log(res))
*/