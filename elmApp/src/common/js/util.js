/**
 * 解析url参数
 * @example ?id=12&a=b
 * @return Object {id: 12, a: b}
*/
export function urlParse() {
	var str = window.location.search;
	var obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = str.match(reg);
	// ['?id=12', '&a=b']
	if (arr) {
		arr.forEach((item) => {
			let tempArr = item.substring(1).split('=');
			obj[tempArr[0]] = decodeURIComponent([tempArr[1]]);
		});
	}
	console.log('url参数', obj);
	return obj;
}