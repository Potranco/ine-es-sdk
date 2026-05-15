//#region src/createUrl.ts
var e = "https://servicios.ine.es/wstempus/js/", t = (t, n, r, i) => {
	let a = `${e}${t}/${n}`;
	return r && (a = `${a}/${r}`), i && (a = `${a}?${i}`), a;
}, n = async (e = "ES", n, r, i) => {
	try {
		let a = await fetch(t(e, n, r, i));
		if (!a.ok) throw Error(`HTTP ${a.status}: ${a.statusText}`);
		return await a.json();
	} catch (e) {
		throw e instanceof Error ? e : Error(String(e));
	}
}, r = "OPERACIONES_DISPONIBLES", i = "OPERACION", a = async (e = "ES") => n(e, r), o = async (e, t = "ES") => await n(t, i, e), s = async (e, t = "ES") => await n(t, r).then((t) => t.filter((t) => t.Nombre.toLowerCase().includes(e.toLowerCase()))), c = "TABLAS_OPERACION", l = async (e, t = "ES") => n(t, c, e), u = async (e, t, r = "ES") => await n(r, c, e).then((e) => e.filter((e) => e.Nombre.toLowerCase().includes(t.toLowerCase()))), d = "DATOS_TABLA", f = async (e, t = "ES") => n(t, d, e);
//#endregion
export { a as getAllOperations, n as getData, f as getDataTables, o as getOperationById, s as getOperationByKeyword, l as getTables, u as getTablesByKeyword };

//# sourceMappingURL=ine-es-sdk.es.js.map