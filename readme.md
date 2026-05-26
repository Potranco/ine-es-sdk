# INE ES SDK

Kit de desarrollo en JavaScript/TypeScript para interactuar con la API de **Servicios Web de la Estadística** del [Instituto Nacional de Estadística](https://www.ine.es) (INE) de España.

---

## 📚 Descripción

Esta librería facilita el consumo de la API **WS-TempUS** del INE para obtener:

- Operaciones estadísticas disponibles
- Listados de tablas operacionales
- Datos de tablas con series temporales
- Búsqueda por palabras clave
- Multilingüe (Español/Inglés). Español por defecto.

---

## 🛠️ Instalación

- **PNPM**
```bash
pnpm add github:Potranco/ine-es-sdk
```

---

## ⚙️ Configuración

Asegúrate de tener instalado:

- **Node.js** v24 o superior
```bash
node --version
```

---

## 📖 Funciones

### `getAllOperations(lang?: 'ES' | 'EN')`

Obtiene **todas las operaciones disponibles** en la API del INE.

**Parámetros:**
| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `lang`    | `"ES"`\|`"EN"` | No | Idioma de la respuesta (Español/Inglés) |

**Retorno:** `Promise<Operation[] \| Error>`

**Ejemplo:**
```typescript
const operations = await getAllOperations('ES');
console.log(operations[0]);
// {
//   Id: 1,
//   Cod_IOE: "I.ORG",
//   Nombre: "Indicadores económicos, sociales y medioambientales.",
//   Codigo: "IOE",
//   Url: "https://www.ine.es/en/esbam/diccionario/indice_operativo_98754.htm"
// }
```

---

### `getOperationById(id: number, lang?: 'ES' | 'EN')`

Obtiene **una operación específica** por su ID.

**Parámetros:**
| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `id`      | `number` | Sí | Identificador único de la operación |
| `lang`    | `"ES"`\|`"EN"` | No | Idioma de la respuesta |

**Retorno:** `Promise<Operation \| Error>`

**Ejemplo:**
```typescript
const operation = await getOperationById(123);
console.log(operation);
// {
//   Id: 123,
//   Cod_IOE: "XXX",
//   Nombre: "Descripción de la operación",
//   Codigo: "XXX",
//   Url: "https://..."
// }
```

---

### `getOperationByKeyword(keyword: string, lang?: 'ES' | 'EN')`

Busca **operaciones por palabra clave** en el nombre.

**Parámetros:**
| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `keyword` | `string` | Sí | Palabra clave para buscar |
| `lang`    | `"ES"`\|`"EN"` | No | Idioma de la respuesta |

**Retorno:** `Promise<Operation[] \| Error>`

**Ejemplo:**
```typescript
const populationOps = await getOperationByKeyword("población");
console.log(populationOps);
// [
//   { Id: 1, Nombre: "Indicadores de Población", ... },
//   { Id: 2, Nombre: "Estadísticas Demográficas", ... }
// ]
```

---

### `getTables(id: number, lang?: 'ES' | 'EN')`

Obtiene las **tablas** asociadas a una operación (por su ID de operación).

**Parámetros:**
| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `id`      | `number` | Sí | ID de la operación |
| `lang`    | `"ES"`\|`"EN"` | No | Idioma de la respuesta |

**Retorno:** `Promise<TablasOperacion[] \| Error>`

**Ejemplo:**
```typescript
const idOperation = 123;
const tables = await getTables(idOperation, 'ES');
console.log(tables.map(t => t.Nombre));
// [
//   "Evolución de la Producción Industrial",
//   "Ingresos desde la Unión Europea",
//   ...
// ]
```

---

### `getTablesByKeyword(id: number, keyword: string, lang?: 'ES' | 'EN')`

Busca **tablas por palabra clave** dentro de una operación específica.

**Parámetros:**
| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `id`      | `number` | Sí | ID de la operación |
| `keyword` | `string` | Sí | Palabra clave para filtrar |
| `lang`    | `"ES"`\|`"EN"` | No | Idioma de la respuesta |

**Retorno:** `Promise<TablasOperacion[] \| Error>`

**Ejemplo:**
```typescript
const keyword = "consumo";
const tables = await getTablesByKeyword(456, keyword, 'ES');
console.log(tables.map(t => t.Nombre));
// ["Consumo Privado", "Consumo Público"]
```

---

### `getDataTables(tableId: number, lang?: 'ES' | 'EN')`

Obtiene los **datos de la tabla** serie temporal específica.

**Parámetros:**
| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `tableId` | `number` | Sí | ID de la tabla (de `getTables`) |
| `lang`    | `"ES"`\|`"EN"` | No | Idioma de la respuesta |

**Retorno:** `Promise<DatosTabla | Error>`

**Ejemplo:**
```typescript
const tablaId = 789;
const data = await getDataTables(tablaId, 'ES');
console.log(data);
// {
//   Id: 789,
//   Nombre: "Indice Precio Consumo Agregado",
//   Fecha: "2024-12-31",
//   Periodo: "T-13",
//   Anyo: 2024,
//   Valor: 95.3,
//   TipoDato: "Número",
//   ...
// }
```

---

## 📊 Estructura de Datos

### `Operation`

```typescript
interface Operation {
  Id: number;                 // Identificador único
  Cod_IOE: string;            // Código IOE (Ord. Cuentas Oficiales)
  Nombre: string;             // Nombre descriptivo
  Codigo: string;             // Código abreviado
  Url?: string;               // URL a la operación en ine.es
}
```

### `TablasOperacion`

```typescript
interface TablasOperacion {
  Id: number;
  Nombre: string;
  Codigo?: string;            // Código serie
  Periodicidad?: InePeriodicidad;
  Publicacion?: InePublicacion;
  PeriodoInicio?: InePeriodo;
  AnyoInicio?: number;
  PubFechaAct?: string;
  FechaRef_fin?: string | null;
  Ultima_Modificacion?: string;
}
```

### `DatosTabla`

```typescript
interface DatosTabla {
  Id: number;
  Nombre: string;
  COD?: string;
  Unidad?: string;
  Escala?: string;
  Fecha: string;              // Fecha del dato (YYYY-MM-DD)
  Periodo: string;            // Periodo (Año/Mes, Trimestre, etc.)
  Anyo?: number;
  Valor: number | string | null;
  TipoDato?: string;
  Secreto?: boolean;
}
```

---

## 🔗 Base URL API

Todas las llamadas se hacen al endpoint:

```
https://servicios.ine.es/wstempus/js/{IDIOMA}/{FUNCION}/{ID}?{PARAMS}
```

---

## ✅ Ejemplo Completo

```typescript
import {
  getAllOperations,
  getTablesByKeyword,
  getDataTables
} from './ine-es-sdk/index';

async function main() {
  try {
    // 1. Obtener todas las operaciones
    const operations:any = await getAllOperations('ES');
    console.log(`Total operaciones: ${operations.length}`);
    const idOp = operations[0].Id;
    const keyword = "Efectos";
    // 2. Buscar tablas por palabra clave
    const tables:any = await getTablesByKeyword(idOp, keyword, 'ES');
    // 3. Obtener datos de la primera tabla
    if (tables.length > 0) {
      const firstTableId = tables[0].Id;
      const data:any = await getDataTables(firstTableId, 'ES');
      console.log(`Año: ${data[0].Data[0].Anyo}`);
      console.log(`Fecha: ${data[0].Data[0].Fecha} - ${data[0].Data[0].FK_Periodo}`);
      console.log(`Valor: ${data[0].Data[0].Valor}`);
    }

  } catch (error:any) {
    console.error('Error:', error.message);
  }
}

main();
```

---

## ⚠️ Errores

Se lanzan errores `Error` cuando:

- La respuesta HTTP tiene estado no `2xx`
- El JSON de respuesta no es válido
- Faltan parámetros requeridos

```typescript
try {
  const res = await getDataTables(123);
} catch (error) {
  console.error(error.message); 
  // "HTTP 404: Not Found" o "JSON parse error"
}
```

---

## 📝 Notas

- Soporta ambos idiomas: **ES** (Español) y **EN** (Inglés)
- La API oficial del INE: [Servicios Web INE](https://servicios.ine.es/)


---

## 📄 Licencia

[MIT](LICENSE) - Uso libre y comercial.

---

## 🤝 Contribuciones

Al ser una API para mi uso, te recomiendo crear tu propia API a partir de este repositorio.


---

## 🔗 Enlaces

- [INE - Servicios Web](https://servicios.ine.es/)
- [INE - Diccionario Operativo](https://www.ine.es/diccionarios.html)
- [INE - Estadísticas](https://www.ine.es/start_dgenio.do)

